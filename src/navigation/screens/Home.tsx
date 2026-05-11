import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  "https://voucher-overbill-aftermost.ngrok-free.dev";

const HomeScreen = ({ navigation }: any) => {
  const [products, setProducts] =
    useState<any[]>([]);

  const [selected, setSelected] =
    useState("All Plants");

  const [user, setUser] =
    useState<any>(null);

  const [categories, setCategories] =
    useState<string[]>(["All Plants"]);

  const [cartCount, setCartCount] =
    useState(0);

  // =========================
  // LOAD PRODUCTS
  // =========================
  const loadProducts = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/Product`,
        {
          headers: {
            "ngrok-skip-browser-warning":
              "true",
          },
        }
      );

      const data = await res.json();

      const list =
        data.$values || data;

      setProducts(list);

      // category từ DB
      const uniqueCategories = [
        "All Plants",
        ...new Set(
          list.map(
            (item: any) =>
              item.category?.name
          )
        ),
      ];

      setCategories(
        uniqueCategories as string[]
      );
    } catch (err) {
      console.log(
        "LOAD PRODUCT ERROR:",
        err
      );
    }
  };

  // =========================
  // LOAD USER
  // =========================
  const loadUser = async () => {
    try {
      const userString =
        await AsyncStorage.getItem(
          "user"
        );

      if (userString) {
        setUser(
          JSON.parse(userString)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // LOAD CART COUNT
  // =========================
  const loadCartCount =
    async () => {
      try {
        const userString =
          await AsyncStorage.getItem(
            "user"
          );

        if (!userString) {
          setCartCount(0);
          return;
        }

        const userData =
          JSON.parse(userString);

        const res = await fetch(
          `${BASE_URL}/api/cart/${userData.id}`,
          {
            headers: {
              "ngrok-skip-browser-warning":
                "true",
            },
          }
        );

        if (!res.ok) {
          console.log(
            "API ERROR:",
            res.status
          );
          return;
        }

        const data =
          await res.json();

        const cartItems =
          data.cartItems || [];

        let total = 0;

        cartItems.forEach(
          (item: any) => {
            total += item.quantity;
          }
        );

        setCartCount(total);
      } catch (err) {
        console.log(
          "LOAD CART ERROR:",
          err
        );
      }
    };

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async (
    productId: number
  ) => {
    try {
      await fetch(
        `${BASE_URL}/api/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            "ngrok-skip-browser-warning":
              "true",
          },
          body: JSON.stringify({
            userId: user.id,
            productId,
          }),
        }
      );

      loadCartCount();

      Alert.alert(
        "OK",
        "Đã thêm giỏ hàng"
      );
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FIRST LOAD
  // =========================
  useEffect(() => {
    loadProducts();
    loadUser();
    loadCartCount();
  }, []);

  // =========================
  // RELOAD KHI QUAY LẠI SCREEN
  // =========================
  useFocusEffect(
    useCallback(() => {
      loadProducts();
      loadCartCount();
    }, [])
  );

  // =========================
  // FILTER
  // =========================
  const filteredProducts =
    selected === "All Plants"
      ? products
      : products.filter(
          (p: any) =>
            p.category?.name ===
            selected
        );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text
              style={
                styles.locationLabel
              }
            >
              Welcome back 🌱
            </Text>

            <Text
              style={styles.location}
            >
              {user?.fullName ||
                user?.username}
            </Text>
          </View>

          {/* CART */}
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() =>
              navigation.navigate(
                "Shop"
              )
            }
          >
            <Ionicons
              name="cart-outline"
              size={24}
              color="#fff"
            />

            {cartCount > 0 && (
              <View
                style={styles.badge}
              >
                <Text
                  style={
                    styles.badgeText
                  }
                >
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View
          style={styles.searchRow}
        >
          <View
            style={styles.searchBox}
          >
            <Ionicons
              name="search"
              size={18}
              color="#888"
            />

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  "Search"
                )
              }
            >
              <TextInput
                placeholder="Search plants..."
                style={styles.input}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* BANNER */}
        <View style={styles.banner}>
          <Image
            source={require("../../assets/Banner.png")}
            style={styles.bannerImg}
          />
        </View>
      </View>

      {/* BODY */}
      <View style={styles.body}>
        {/* CATEGORY */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
        >
          {categories.map(
            (item) => (
              <TouchableOpacity
                key={item}
                onPress={() =>
                  setSelected(item)
                }
                style={[
                  styles.category,
                  selected === item &&
                    styles.categoryActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selected ===
                      item &&
                      styles.categoryTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        {/* PRODUCTS */}
        <View style={styles.grid}>
          {filteredProducts.map(
            (item: any) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate(
                    "Details",
                    {
                      id: item.id,
                    }
                  )
                }
              >
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={{
                    width: "100%",
                    height: 120,
                  }}
                />

                <Text
                  style={styles.title}
                >
                  {item.name}
                </Text>

                <Text
                  style={
                    styles.subtitle
                  }
                >
                  {item.subtitle}
                </Text>

                <View
                  style={
                    styles.priceRow
                  }
                >
                  <Text
                    style={
                      styles.price
                    }
                  >
                    {Number(
                      item.price
                    ).toLocaleString()}{" "}
                    đ
                  </Text>

                  <TouchableOpacity
                    style={
                      styles.addBtn
                    }
                    onPress={() =>
                      addToCart(
                        item.id
                      )
                    }
                  >
                    <Text
                      style={{
                        color:
                          "#fff",
                        fontSize: 18,
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

// =========================
// STYLES
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#2E7D32",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  locationLabel: {
    color: "#D8F3DC",
    fontSize: 14,
  },

  location: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  cartBtn: {
    width: 45,
    height: 45,
    backgroundColor: "#2E7D32",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  searchRow: {
    marginTop: 20,
  },

  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },

  input: {
    marginLeft: 10,
    width: 250,
  },

  banner: {
    marginTop: 20,
  },

  bannerImg: {
    width: "100%",
    height: 150,
    borderRadius: 20,
  },

  body: {
    padding: 20,
  },

  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },

  categoryActive: {
    backgroundColor: "#2E7D32",
  },

  categoryText: {
    color: "#333",
  },

  categoryTextActive: {
    color: "#fff",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    color: "#777",
    marginTop: 4,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  price: {
    fontWeight: "bold",
    color: "#2E7D32",
  },

  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
  },
});