import React, { useCallback, useState,useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function FavoriteScreen({
  navigation,
}: any) {

  const [favorites, setFavorites] =
    useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  // LOAD FAVORITES
  const loadFavorites = async () => {
    try {
      const data =
        await AsyncStorage.getItem(
          "favorites"
        );

      if (data) {
        setFavorites(JSON.parse(data));
      } else {
        setFavorites([]);
      }

    } catch (error) {
      console.log(error);
    }
  };
  const [user, setUser] = useState<any>(null);

useEffect(() => {
  getUser();
}, []);

const getUser = async () => {
  const data =
    await AsyncStorage.getItem("user");

  if (data) {
    setUser(JSON.parse(data));
  }
};
const addToCart = async (
  productId: number
) => {
  try {
    await fetch(
      "https://voucher-overbill-aftermost.ngrok-free.dev/api/cart/add",
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

    Alert.alert(
      "Success",
      "Đã thêm vào giỏ hàng"
    );

  } catch (err) {
    console.log(err);

    Alert.alert(
      "Error",
      "Không thể thêm giỏ hàng"
    );
  }
};
  // REMOVE FAVORITE
  const removeFavorite = async (
    productId: number
  ) => {
    try {
      const updated = favorites.filter(
        (x) => x.id !== productId
      );

      setFavorites(updated);

      await AsyncStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#222"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Favorites
        </Text>

        <Ionicons
          name="heart-outline"
          size={24}
      
        />
      </View>

      {/* LIST */}
      <FlatList
        data={favorites}
        keyExtractor={(item) =>
          item.id.toString()
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="heart-dislike-outline"
              size={80}
              color="#ccc"
            />

            <Text style={styles.emptyText}>
              No favorite products
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate(
                "Detail",
                {
                  id: item.id,
                }
              )
            }
          >
            {/* IMAGE */}
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            {/* INFO */}
            <View style={styles.info}>

              <Text
                numberOfLines={1}
                style={styles.name}
              >
                {item.name}
              </Text>

              <Text
                numberOfLines={2}
                style={styles.subtitle}
              >
                {item.subTitle}
              </Text>

              <Text style={styles.price}>
                {item.price?.toLocaleString()} đ
              </Text>

              {/* ACTIONS */}
              <View style={styles.actionRow}>

                {/* ADD TO CART */}
                <TouchableOpacity
  style={styles.addBtn}
  onPress={() =>
    addToCart(item.id)
  }
>
  <Ionicons
    name="cart"
    size={18}
    color="#fff"
  />

  <Text style={styles.addText}>
    Add to Cart
  </Text>
</TouchableOpacity>

                {/* REMOVE */}
                <TouchableOpacity
                  style={styles.heartBtn}
                  onPress={() =>
                    removeFavorite(item.id)
                  }
                >
                  <Ionicons
                    name="heart"
                    size={22}
                    color="#e53935"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FBF6",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 14,
    marginBottom: 18,
    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 20,
    marginRight: 16,
  },

  info: {
    flex: 1,
    justifyContent: "space-between",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    marginTop: 6,
    color: "#777",
    fontSize: 13,
    lineHeight: 18,
  },

  price: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E7D32",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    flex: 1,
    justifyContent: "center",
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },

  heartBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#fff0f0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },

  empty: {
    marginTop: 120,
    alignItems: "center",
  },

  emptyText: {
    marginTop: 14,
    fontSize: 16,
    color: "#999",
  },
});