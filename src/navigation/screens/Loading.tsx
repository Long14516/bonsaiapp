import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 2500,
      useNativeDriver: false,
    }).start(() => {
      // chạy xong loading thì chuyển màn hình
      navigation.replace('Splash'); // đổi Home thành tên screen của bạn
    });
  }, []);

  const widthInterpolate = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.logoCircle}>
        <Image
          source={require('../../assets/icon.png')}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Living Sanctuary</Text>

      {/* Loading */}
      <Text style={styles.loading}>Loading...</Text>

      {/* Progress */}
      <View style={styles.progressBg}>
        <Animated.View
          style={[styles.progressFill, { width: widthInterpolate }]}
        />
      </View>

      {/* Bottom text */}
      <Text style={styles.bottomText}>
        CULTIVATING YOUR DIGITAL GARDEN
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FBF6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },


  title: {
    fontSize: 34,
    color: '#20362A',
    fontFamily: 'serif',
    fontStyle: 'italic',
    marginBottom: 12,
  },

  loading: {
    fontSize: 18,
    color: '#B08F7B',
    marginBottom: 14,
  },

  progressBg: {
    width: 140,
    height: 3,
    backgroundColor: '#E2DDD8',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: 3,
    backgroundColor: '#C7D9C5',
  },

  bottomText: {
    position: 'absolute',
    bottom: 45,
    fontSize: 10,
    color: '#B8B5AE',
    letterSpacing: 1,
  },
});