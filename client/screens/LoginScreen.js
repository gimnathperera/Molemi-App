import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
} from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_URL } from '../constants';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    getAsyncData();
  }, []);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@user_data', JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };
  const getAsyncData = async () => {
    try {
      const data = await AsyncStorage.getItem('@user_data');

      if (JSON.parse(data).email) {
        navigation.navigate('HomeScreen');
      }
    } catch (e) {
      // saving error
    }
  };

  const onLoginSubmit = async () => {
    try {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

      if (email == '' || email == null) {
        return setEmailError('*Required');
      } else if (reg.test(email) === false) {
        return setEmailError('enter valid email address');
      }
      if (password == '' || password == null) {
        return setPasswordError('*Required');
      }

      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });

      if (_.isArray(response.data)) {
        await storeData(response.data[0]);
        navigation.navigate('HomeScreen');
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (err) {
      setLoginError('Invalid credentials');
    }
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const resetEmailErrors = () => {
    setEmailError(null);
    setLoginError(null);
  };

  const resetPasswordErrors = () => {
    setPasswordError(null);
    setLoginError(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        resizeMode='contain'
        style={styles.logo}
      />
      <View style={styles.boxConatiner}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>LOGIN</Text>
          <Image
            source={require('../assets/profilepic.png')}
            resizeMode='contain'
            style={styles.avatar}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.input}
            placeholder='E-mail'
            placeholderTextColor='#9B9B9B'
            onChangeText={(text) => handleEmailChange(text)}
            onFocus={resetEmailErrors}
          />
          {emailError ? (
            <Text style={styles.errorMsg}>{emailError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='#9B9B9B'
            secureTextEntry
            onChangeText={(value) => handlePasswordChange(value)}
            onFocus={resetPasswordErrors}
          />
          {passwordError ? (
            <Text style={styles.errorMsg}>{passwordError}</Text>
          ) : null}
          {loginError ? (
            <Text style={styles.errorMsg}>{loginError}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={onLoginSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.linkContainer}>
            <Text style={styles.loginText}>Not a Member ? </Text>
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              REGISTER
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 25,
  },
  socialButtonConatiner: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  socialButton: {
    width: '10%',
    elevation: 8,
    backgroundColor: '#29b4cb',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 5,
  },
  boxConatiner: {
    backgroundColor: '#414143',
    padding: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    paddingTop: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    elevation: 8,
    backgroundColor: '#71b79c',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '50%',
    marginBottom: 15,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  headerContainer: {
    textAlign: 'center',
  },
  header: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 26,
    color: '#71b79c',
  },
  avatar: {
    width: 64,
    alignSelf: 'center',
    height: 64,
    marginTop: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    borderColor: '#71b79c',
    borderRadius: 10,
    backgroundColor: '#001220',
    color: '#fff',
  },
  loginText: {
    color: '#fff',
  },
  subHeaderText: {
    color: '#EBEDF0',
    fontSize: 12,
    alignSelf: 'center',
  },
  registerText: {
    color: '#fff',
    alignSelf: 'center',
    marginTop: 15,
  },
  linkText: {
    color: '#71b79c',
  },
  linkContainer: {
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: '70%',
    alignSelf: 'center',
    height: 150,
    marginTop: 15,
  },
  errorMsg: {
    color: 'red',
    textAlign: 'left',
  },
});

export default LoginScreen;
