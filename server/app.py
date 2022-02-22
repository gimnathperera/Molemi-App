from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from tensorflow.python.keras.models import load_model
import numpy as np
import json
import bcrypt
from flask_cors import CORS
import tensorflow as tf

APP_ROOT = os.path.abspath(os.path.dirname(__file__))

model = load_model('plant_safe.h5')


# Loading labels
with open('./labels.json', 'r') as f:
    category_names = json.load(f)
    img_classes = list(category_names.values())


# Pre-processing images
def config_image_file(_image_path):
    predict = tf.keras.preprocessing.image.load_img(_image_path, target_size=(224, 224))
    predict_modified = tf.keras.preprocessing.image.img_to_array(predict)
    predict_modified = predict_modified / 255
    predict_modified = np.expand_dims(predict_modified, axis=0)
    return predict_modified


# Predicting
def predict_image(image):
    result = model.predict(image)

    return np.array(result[0])


# Working as the toString method
def output_prediction(filename):
    _image_path = f"images/{filename}"
    img_file = config_image_file(_image_path)
    results = predict_image(img_file)
    probability = np.max(results)
    index_max = np.argmax(results)

    return {
            "prediction": str(img_classes[index_max]),
            "probability": str(probability)
        }


# Init app
app = Flask(__name__)
CORS(app)

# Database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/heart-safe'

# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)


# Model class User
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    fullname = db.Column(db.String(100))
    password = db.Column(db.String(100))

    def __init__(self, email, fullname, password):
        self.email = email
        self.fullname = fullname
        self.password = password


# User Schema
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'fullname', 'password')


# Init schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Create a user
@app.route('/api/users', methods=['POST'])
def add_user():
    email = request.json['email']
    fullname = request.json['fullname']
    password = request.json['password'].encode('utf-8')
    hash_password = bcrypt.hashpw(password, bcrypt.gensalt())

    new_user = User(email, fullname, hash_password)
    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user)


# Login user
@app.route('/api/users/login', methods=['POST'])
def login_user():
    email = request.json['email']
    password = request.json['password'].encode('utf-8')

    user = db.session.query(User).filter_by(email=email)
    _user = users_schema.dump(user)

    if len(_user) > 0:
        hashed_password = _user[0]['password'].encode('utf-8')
        if bcrypt.checkpw(password, hashed_password):
            return users_schema.jsonify(user)

    return jsonify({"message": "Invalid credentials"})


# Get All users
@app.route('/api/users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)

    return jsonify(result)


# Image prediction
@app.route('/api/predict', methods=['POST'])
def get_disease_prediction():
    target = os.path.join(APP_ROOT, 'images/')

    if not os.path.isdir(target):
        os.mkdir(target)

    file = request.files.get('file')

    filename = file.filename
    destination = '/'.join([target, filename])

    file.save(destination)

    result = output_prediction(filename)
    return jsonify(result)


# Run Server
if __name__ == '__main__':
    app.run(host="192.168.1.101", port=5000)  # Replace the IP address with your own local IP address
