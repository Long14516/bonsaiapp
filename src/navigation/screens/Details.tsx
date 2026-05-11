import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  "https://voucher-overbill-aftermost.ngrok-free.dev";

export default function DetailScreen({
  navigation,
  route,
}: any) {

  const { id } = route.params;

  const [favorite, setFavorite] =
    useState(false);

  const [product, setProduct] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // TOGGLE FAVORITE
  const toggleFavorite = async () => {
    try {
      const existing =
        await AsyncStorage.getItem(
          "favorites"
        );

      let favorites = existing
        ? JSON.parse(existing)
        : [];

      const isExist = favorites.find(
        (x: any) => x.id === product.id
      );

      if (isExist) {
        favorites = favorites.filter(
          (x: any) => x.id !== product.id
        );

        setFavorite(false);

      } else {
        favorites.push(product);

        setFavorite(true);
      }

      await AsyncStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

    } catch (error) {
      console.log(error);
    }
  };

  // CHECK FAVORITE
  const checkFavorite = async () => {
    try {
      const existing =
        await AsyncStorage.getItem(
          "favorites"
        );

      const favorites = existing
        ? JSON.parse(existing)
        : [];

      const isExist = favorites.find(
        (x: any) => x.id === id
      );

      setFavorite(!!isExist);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH PRODUCT
  useEffect(() => {
    fetch(`${BASE_URL}/api/Product/${id}`, {
      headers: {
        "ngrok-skip-browser-warning":
          "true",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);

        setLoading(false);

        checkFavorite();
      })
      .catch((err) => {
        console.log("ERROR:", err);

        setLoading(false);
      });
  }, []);

  // LOADING
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#2E7D32"
        />

        <Text>
          Loading product...
        </Text>
      </View>
    );
  }

  // NO PRODUCT
  if (!product) {
    return (
      <View style={styles.loading}>
        <Text>
          Không tìm thấy sản phẩm
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="chevron-back"
              size={26}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Detail
          </Text>

          {/* FAVORITE */}
          <TouchableOpacity
            onPress={toggleFavorite}
          >
            <Ionicons
              name={
                favorite
                  ? "heart"
                  : "heart-outline"
              }
              size={24}
              color={
                favorite
                  ? "#e53935"
                  : "#000"
              }
            />
          </TouchableOpacity>
        </View>

        {/* IMAGE */}
        <Image
          source={{ uri: product.image }}
          style={styles.image}
        />

        {/* INFO */}
        <View style={styles.info}>

          {/* TITLE */}
          <Text style={styles.title}>
            {product.name}
          </Text>

          {/* RATING */}
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map(
              (i) => (
                <Ionicons
                  key={i}
                  name={
                    i <=
                    Math.round(
                      product?.rating || 0
                    )
                      ? "star"
                      : "star-outline"
                  }
                  size={18}
                  color="#fbbf24"
                />
              )
            )}

            <Text
              style={styles.ratingText}
            >
              {product?.rating || 0} (
              {product?.totalReview || 0}{" "}
              reviews)
            </Text>
          </View>

          <Text style={styles.subtitle}>
            {product.subTitle}
          </Text>

          {/* DESCRIPTION */}
          <Text style={styles.section}>
            🌿 Description
          </Text>

          <Text style={styles.desc}>
            {product.description}
          </Text>

          {/* DETAILS */}
          <Text style={styles.section}>
            Product Details
          </Text>

          <View style={styles.infoCard}>
            <Text>
              🌍 Origin:{" "}
              {product.detail?.origin}
            </Text>

            <Text>
              📏 Height:{" "}
              {product.detail?.height}
            </Text>

            <Text>
              🌳 Age:{" "}
              {product.detail?.age} years
            </Text>

            <Text>
              🎋 Style:{" "}
              {product.detail?.style}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM */}
      <View style={styles.bottom}>
        <View>
          <Text style={styles.priceLabel}>
            Price
          </Text>

          <Text style={styles.price}>
            {product?.price?.toLocaleString()}{" "}
            đ
          </Text>
        </View>

        <TouchableOpacity
          style={styles.buyBtn}
        >
          <Text style={styles.buyText}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6FBF6" },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: 280,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  info: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#173827",
  },

  subtitle: {
    color: "#7D8B7D",
    marginTop: 5,
    marginBottom: 10,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  ratingText: {
    marginLeft: 6,
    color: "#555",
  },

  section: {
    marginTop: 18,
    fontWeight: "bold",
    fontSize: 16,
  },

  desc: {
    color: "#555",
    marginTop: 5,
    lineHeight: 20,
  },

  infoCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  icon: {
    fontSize: 16,
    marginRight: 8,
  },

  infoText: {
    color: "#333",
  },

  reviewCard: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  priceLabel: {
    color: "#888",
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  buyBtn: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 30,
    justifyContent: "center",
    borderRadius: 20,
  },

  buyText: {
    color: "#fff",
    fontWeight: "bold",
  },
});