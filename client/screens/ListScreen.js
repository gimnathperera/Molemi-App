import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import { cropDiseases } from '../data/data';

const ListScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxConatiner}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Diseases included</Text>
          <Image
            source={require('../assets/pests.png')}
            resizeMode='contain'
            style={styles.avatar}
          />
        </View>
      </View>
      <ScrollView style={styles.listContainer}>
        {cropDiseases &&
          cropDiseases.map((disease, index) => {
            return (
              <View style={styles.subConatiner} key={index}>
                <View>
                  <Image
                    source={disease?.image}
                    resizeMode='contain'
                    style={styles.avatar2}
                  />
                </View>
                <View style={{ paddingLeft: 25 }}>
                  <Text style={{ fontSize: 18, maxWidth:220 }}>{disease.name}</Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 55,
    marginHorizontal: 15,
  },
  subConatiner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    borderRadius: 12,
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
    borderRadius: 12,
  },
  avatar2: {
    width: 64,
    alignSelf: 'center',
    height: 64,
    borderRadius: 12,
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
  listContainer: {
    display: 'flex',
    height: '50%',
    marginTop: 15,
    padding: 10,
  },
});

export default ListScreen;
