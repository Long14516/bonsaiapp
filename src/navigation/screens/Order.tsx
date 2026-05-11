import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const BASE_URL =
  "https://voucher-overbill-aftermost.ngrok-free.dev";

export default function Order({
  navigation,
}: any) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // TEST USER ID

  // LOAD ORDERS
const loadOrders = async () => {
  try {

    setLoading(true);

    const userString =
      await AsyncStorage.getItem("user");

    // chưa login
    if (!userString) {

      setOrders([]);
      setLoading(false);

      return;
    }
// AUTO RELOAD WHEN SCREEN FOCUS

    const user =
      JSON.parse(userString);

    const res = await fetch(
      `${BASE_URL}/api/order/user/${user.id}`,
      {
        headers: {
          "ngrok-skip-browser-warning":
            "true",
        },
      }
    );
console.log("USER:", user);
console.log("URL:", `${BASE_URL}/api/order/user/${user.id}`);
    const data =
      await res.json();

    console.log("ORDERS:", data);
console.log("FETCH STATUS:", res.status);
console.log("FETCH DATA:", data);
    setOrders(
      Array.isArray(data)
        ? data
        : []
    );

  } catch (err) {

    console.log(
      "LOAD ORDERS ERROR:",
      err
    );

    setOrders([]);

  } finally {

    setLoading(false);
  }
};
useFocusEffect(
  useCallback(() => {
    loadOrders();
  }, [])
);
  // STATUS COLOR
  const getStatusColor = (
    status: string
  ) => {
    if (status === "PAID")
      return "#2ecc71";

    if (status === "PENDING")
      return "#f39c12";

    return "#e74c3c";
  };

  // LOADING
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={{ marginTop: 10 }}>
          Loading...
        </Text>
      </View>
    );
  }

  // EMPTY
  if (orders.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons
          name="receipt-outline"
          size={90}
          color="#ccc"
        />

        <Text style={styles.emptyText}>
          Chưa có đơn hàng
        </Text>

        <Pressable
          style={styles.shopBtn}
          onPress={() =>
            navigation.navigate("Home")
          }
        >
          <Text style={styles.shopBtnText}>
            Mua ngay
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="arrow-back"
            size={24}
          />
        </Pressable>

        <Text style={styles.title}>
          Đơn mua
        </Text>
      </View>

      {/* LIST */}
      <FlatList
        data={orders}
        keyExtractor={(item: any) =>
          item.id.toString()
        }
        showsVerticalScrollIndicator={
          false
        }
        renderItem={({ item }: any) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate(
                "OrderDetail",
                {
                  orderId: item.id,
                }
              )
            }
          >
            {/* TOP */}
            <View style={styles.topRow}>
              <Text style={styles.orderId}>
                Đơn #{item.id}
              </Text>

              <Text
                style={[
                  styles.status,
                  {
                    color:
                      getStatusColor(
                        item.status
                      ),
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>

            {/* PRODUCTS */}
            {item.items &&
            item.items.length > 0 ? (
              item.items
                .slice(0, 2)
                .map(
                  (
                    product: any,
                    index: number
                  ) => (
                    <View
                      key={index}
                      style={
                        styles.productRow
                      }
                    >
                      <Text
                        numberOfLines={1}
                        style={
                          styles.productName
                        }
                      >
                        {product.name}
                      </Text>

                      <Text>
                        x
                        {
                          product.quantity
                        }
                      </Text>
                    </View>
                  )
                )
            ) : (
              <Text
                style={
                  styles.emptyOrder
                }
              >
                Không có sản phẩm
              </Text>
            )}

            {/* TOTAL */}
            <View
              style={styles.bottomRow}
            >
              <Text
                style={
                  styles.totalLabel
                }
              >
                Tổng tiền:
              </Text>

              <Text style={styles.total}>
                {Number(
                  item.totalAmount
                ).toLocaleString()}{" "}
                đ
              </Text>
            </View>

            {/* DETAIL BUTTON */}
            <Pressable
              style={styles.detailBtn}
              onPress={() =>
                navigation.navigate(
                  "OrderDetail",
                  {
                    orderId: item.id,
                  }
                )
              }
            >
              <Text
                style={
                  styles.detailBtnText
                }
              >
                Xem chi tiết
              </Text>
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FBF6",
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    paddingTop: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },

  status: {
    fontWeight: "bold",
  },

  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  productName: {
    flex: 1,
    marginRight: 10,
    color: "#333",
  },

  emptyOrder: {
    color: "#999",
    fontStyle: "italic",
    marginBottom: 10,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    alignItems: "center",
  },

  totalLabel: {
    marginRight: 6,
    color: "#666",
  },

  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2ecc71",
  },

  detailBtn: {
    marginTop: 14,
    backgroundColor: "#2ecc71",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  detailBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: "#777",
  },

  shopBtn: {
    marginTop: 24,
    backgroundColor: "#2ecc71",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },

  shopBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});