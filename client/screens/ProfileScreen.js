import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    try {
      const data = await AsyncStorage.getItem('@user_data');

      if (JSON.parse(data).email) {
        setEmail(JSON.parse(data).email);
        setFullname(JSON.parse(data).fullname);
      }
    } catch (e) {
      // saving error
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@user_data');
      navigation.navigate('LoginScreen');
    } catch (err) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxConatiner}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <Image
            source={require('../assets/profilepic.png')}
            resizeMode='contain'
            style={styles.avatar}
          />
        </View>
        <Text style={styles.registerText}>{fullname || '-'}</Text>
        <Text style={styles.subHeaderText}>{email || '-'}</Text>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.articles}
        ></ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
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
    backgroundColor: '#fce043',
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
    backgroundColor: '#29b4cb',
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
  logo: {
    width: '70%',
    alignSelf: 'center',
    height: 150,
    marginTop: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    borderColor: '#29b4cb',
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
  innerCard: {
    borderWidth: 1,
    width: '90%',
    padding: 5,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 5,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: 165,
    height: 165,
  },
  articles: {
    maxHeight: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default ProfileScreen;
