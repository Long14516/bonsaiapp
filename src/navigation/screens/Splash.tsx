import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Splash() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
            <Image
              source={require('../../assets/icon1.png')} // icon của bạn
              style={styles.icon}
            />
       
      {/* title */}
      <Text style={styles.title}>Bonsai ABC</Text>

      {/* subtitle */}
      <View style={styles.subRow}>
        <View style={styles.line} />
        <Text style={styles.subTitle}>
          THE DIGITAL{'\n'}ARBORETUM
        </Text>
        <View style={styles.line} />
      </View>

      {/* button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.buttonText}>
          GET STARTED
        </Text>
      </TouchableOpacity>

      {/* bottom */}
      <Text style={styles.bottomText}>
        NURTURING YOUR SPACE
      </Text>

      {/* cây mờ */}
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FBF6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  icon: {
    width: 200,
    height: 200,

  },



  title: {
    marginTop: 38,
    fontSize: 42,
    fontWeight: '700',
    color: '#173827',
  },

  subRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  line: {
    width: 42,
    height: 1,
    backgroundColor: '#D9D2C9',
  },

  subTitle: {
    marginHorizontal: 12,
    textAlign: 'center',
    color: '#9B7E69',
    fontSize: 12,
    letterSpacing: 4,
    lineHeight: 20,
  },

  button: {
    marginTop: 65,
    width: 250,
    height: 56,
    borderRadius: 30,
    backgroundColor: '#103C26',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '600',
  },

  bottomText: {
    marginTop: 45,
    fontSize: 10,
    color: '#9FA59D',
    letterSpacing: 1,
  },


});