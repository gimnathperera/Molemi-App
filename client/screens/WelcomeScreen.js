import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';


const WelcomeScreen = ({ navigation }) => (
  //   <ImageBackground
  //     source={backgroundImage}
  //     resizeMode='cover'
  //     style={styles.image}
  //   >

  <SafeAreaView style={styles.container}>
    <Image
      source={require('../assets/logo.png')}
      resizeMode='contain'
      style={styles.logo}
    />

    <View style={styles.boxConatiner}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>ARE YOU?</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>An existing user</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <Text style={styles.buttonText}>A New User</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
  //   </ImageBackground>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 25,
  },
  boxConatiner: {
    backgroundColor:'#414143',
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
    width: '60%',
    marginBottom: 15,
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
});

export default WelcomeScreen;
