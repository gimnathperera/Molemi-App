import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import axios from 'axios';

import Camera from '../components/Camera';
import { BASE_URL } from '../constants';

const { width, height } = Dimensions.get('screen');

const Home = () => {
  const [prediction, setPrediction] = useState({});
  const [selectedImage, setselectedImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onUpload = async (image) => {
    setselectedImage(image.uri);
    const data = new FormData();
    data.append('file', image);

    try {
      const response = await axios.post(`${BASE_URL}/api/predict`, data);
      if (response) {
        setPrediction(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const PositivePrediction = () => (
    <>
      <Text style={{ padding: 10, fontSize: 18 }}>Here is your prdiction</Text>
      <Ionicons name='md-close-circle-sharp' size={72} color='#e24d4d' />
      <Text style={{ padding: 10, fontSize: 16 }}>
        Your Plant May Be At Risk!
      </Text>
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text>Check prediction report</Text>
      </TouchableOpacity>
    </>
  );

  const PredictionImage = () => (
    <Image
      source={{
        uri: selectedImage || 'https://i.ibb.co/qF8qRnK/upload-1.png',
      }}
      resizeMode='cover'
      style={styles.thumb}
    />
  );

  const PredictionScreen = () => {
    const predictionStatus = prediction?.prediction;
    if (predictionStatus) {
      return <PositivePrediction />;
    } else {
      return <PredictionImage />;
    }
  };

  const ModalScreen = () => (
    <View style={styles.centeredView}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Condition: {prediction?.prediction}
            </Text>
            <Text style={styles.modalText}>
              Accuracy: {prediction?.probability}
            </Text>
            <PredictionImage />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <SafeAreaView style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <View>
          <View style={styles.card}>
            <Text
              style={{
                padding: 10,
                fontSize: 23,
                alignSelf: 'center',
                fontWeight: 'bold',
                color: '#71b79c',
              }}
            >
              Hi! Welcome to Plant Safe
            </Text>
            <View style={styles.innerCard}>
              <Text style={{ padding: 10, fontSize: 18 }}>
                What is Plant Safe?
              </Text>
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ padding: 8, fontSize: 16 }}>
                  <Entypo name='tree' size={18} color='#4c5a55' />
                  {'    '}
                  Lorem ipsum dolor sit amet, consec adipiscing elit.
                </Text>
                <Text style={{ padding: 8, fontSize: 16 }}>
                  <Entypo name='tree' size={18} color='#4c5a55' />
                  {'    '}
                  Lorem ipsum dolor sit amet, consec adipiscing elit.
                </Text>
                <Text style={{ padding: 8, fontSize: 16 }}>
                  <Entypo name='tree' size={18} color='#4c5a55' />
                  {'    '}
                  Lorem ipsum dolor sit amet, consec adipiscing elit.
                </Text>
              </View>
            </View>
            <View>
              <Camera handleUpload={onUpload} />
            </View>
            <View style={styles.innerCard}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <PredictionScreen />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <ModalScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  articles: {
    // width: width - theme.SIZES.BASE * 2,
    // paddingVertical: theme.SIZES.BASE,
  },
  card: {
    backgroundColor: '#fff',
    marginTop: 100,
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  innerCard: {
    borderWidth: 1,
    width: '90%',
    padding: 5,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 5,
  },

  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: 165,
    height: 165,
  },
  button: {
    // marginBottom: theme.SIZES.BASE,
    width: '70%',
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    // backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 2,
    height: 24,
    elevation: 0,
    padding: 15,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  checkButton: {
    backgroundColor: '#f2f2',
    elevation: 8,
    borderRadius: 18,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: 5,
    marginTop: 5,
  },
  divider: {
    borderRightWidth: 0.3,
    // borderRightColor: theme.COLORS.ICON,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    // color: argonTheme.COLORS.HEADER,
  },
  profileBackground: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    padding: 3,
    elevation: 2,
    margin: 0,
    position: 'absolute',
    top: -10,
    right: -10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#E42B4E',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default Home;
