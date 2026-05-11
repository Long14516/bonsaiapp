import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const DATA = [
  {
    id: "1",
    image: require("../../assets/bonsai.png"),
    title: "Trang trí không gian sống",
    desc: "Mang thiên nhiên vào ngôi nhà của bạn với những chậu cây đẹp mắt.",
  },
  {
    id: "2",
    image: require("../../assets/bonsai.png"),
    title: "Cây cảnh chất lượng",
    desc: "Chúng tôi cung cấp các loại cây bonsai, cây indoor, outdoor chất lượng cao.",
  },
  {
    id: "3",
    image: require("../../assets/bonsai.png"),
    title: "Dễ dàng chăm sóc",
    desc: "Hướng dẫn chi tiết giúp bạn chăm sóc cây đơn giản và hiệu quả.",
  },
];

export default function WelcomeSlider() {
  const navigation = useNavigation<any>();
  const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const indexRef = useRef(0);

  // 👉 detect slide (khi user vuốt)
  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems?.length > 0) {
      const index = viewableItems[0].index ?? 0;
      setCurrentIndex(index);
      indexRef.current = index;
    }
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

useEffect(() => {
  const interval = setInterval(() => {
    if (indexRef.current === DATA.length - 1) {
      // 👉 đang ở slide cuối → reset về đầu
      flatListRef.current?.scrollToIndex({
        index: 0,
        animated: false, // 🔥 QUAN TRỌNG
      });

      indexRef.current = 0;
      setCurrentIndex(0);
    } else {
      let next = indexRef.current + 1;

      flatListRef.current?.scrollToIndex({
        index: next,
        animated: true,
      });

      indexRef.current = next;
      setCurrentIndex(next);
    }
  }, 3000);

  return () => clearInterval(interval);
}, []);


  const handleStart = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>

      {/* SLIDER */}
      <View style={{ flex: 6 }}>
        <FlatList
          ref={flatListRef}
          data={DATA}
          horizontal
          pagingEnabled
          snapToInterval={width}          // fix web
          decelerationRate="fast"         // mượt hơn
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image source={item.image} style={styles.image} />

              <View style={styles.content}>
                <Text style={styles.smallText}>LIVING SANCTUARY</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
              </View>
            </View>
          )}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
      </View>

      {/* DOT */}
      <View style={styles.indicator}>
        {DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* BUTTON */}
      <View style={{ paddingBottom: 30 }}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FBF6',
    justifyContent: 'space-between',
  },

  slide: {
    width: width,
    alignItems: 'center',
  },

  image: {
    width: width,
    height: height * 0.4,
    resizeMode: 'contain',
    marginTop: height * 0.08,
  },

  content: {
    paddingHorizontal: 24,
    marginTop: 20,
  },

  smallText: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#9B7E69',
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#173827',
    marginBottom: 10,
  },

  desc: {
    fontSize: 14,
    color: '#6E6E6E',
    lineHeight: 22,
  },

  indicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D3D3D3',
    margin: 5,
    marginBottom: 30,
  },

  activeDot: {
    width: 18,
    backgroundColor: '#103C26',
  },

  button: {
    marginHorizontal: 40,
    backgroundColor: '#103C26',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 1,
  },
});