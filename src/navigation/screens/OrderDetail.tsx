import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useFocusEffect } from "@react-navigation/native";

const BASE_URL =
  "https://voucher-overbill-aftermost.ngrok-free.dev";

export default function OrderDetail({
  route,
  navigation,
}: any) {
  // SAFE PARAMS
  const orderId = route?.params?.orderId;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // NO ORDER ID
  if (!orderId) {
    return (
      <View style={styles.center}>
        <Ionicons
          name="alert-circle-outline"
          size={80}
          color="#ccc"
        />

        <Text style={styles.emptyText}>
          Không tìm thấy đơn hàng
        </Text>
      </View>
    );
  }

  // LOAD ORDER
  const loadOrder = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/api/order/${orderId}`,
        {
          headers: {
            "ngrok-skip-browser-warning":
              "true",
          },
        }
      );

      // NOT FOUND
      if (res.status === 404) {
        setOrder("notfound");
        return;
      }

      const data = await res.json();

      console.log(data);

      setOrder(data);
    } catch (err) {
      console.log(
        "ORDER DETAIL ERROR:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  // AUTO RELOAD WHEN SCREEN FOCUS
  useFocusEffect(
    useCallback(() => {
      loadOrder();
    }, [orderId])
  );

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

  // NOT FOUND
  if (order === "notfound") {
    return (
      <View style={styles.center}>
        <Ionicons
          name="alert-circle-outline"
          size={80}
          color="#ccc"
        />

        <Text style={styles.emptyText}>
          Không tìm thấy đơn hàng
        </Text>

        <Pressable
          style={styles.backBtn}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Text style={styles.backBtnText}>
            Quay lại
          </Text>
        </Pressable>
      </View>
    );
  }

  // STATUS COLOR
  const getStatusColor = () => {
    if (order.status === "PAID")
      return "#2ecc71";

    if (order.status === "PENDING")
      return "#f39c12";

    return "#e74c3c";
  };

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
          Chi tiết đơn hàng
        </Text>
      </View>

      {/* STATUS CARD */}
      <View style={styles.card}>
        <Text style={styles.orderId}>
          Order #{order.id}
        </Text>

        <Text
          style={[
            styles.status,
            {
              color: getStatusColor(),
            },
          ]}
        >
          {order.status}
        </Text>

        <Text style={styles.date}>
          {new Date(
            order.createdAt
          ).toLocaleString()}
        </Text>
      </View>

      {/* PRODUCTS */}
      <FlatList
        data={order.items}
        keyExtractor={(
          item: any,
          index
        ) => index.toString()}
        showsVerticalScrollIndicator={
          false
        }
        renderItem={({ item }: any) => (
          <View style={styles.item}>
            <Image
              source={{
                uri: `${BASE_URL}/images/${item.image}`,
              }}
              style={styles.img}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.price}>
                {Number(
                  item.price
                ).toLocaleString()}{" "}
                đ
              </Text>

              <Text style={styles.qty}>
                x{item.quantity}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Text
              style={{
                color: "#999",
              }}
            >
              Không có sản phẩm
            </Text>
          </View>
        }
      />

      {/* TOTAL */}
      <View style={styles.bottom}>
        <Text style={styles.total}>
          Tổng tiền:{" "}
          {Number(
            order.totalAmount
          ).toLocaleString()}{" "}
          đ
        </Text>

        <Pressable
          style={styles.btn}
          onPress={() =>
            navigation.navigate("Main")
          }
        >
          <Text style={styles.btnText}>
            Mua lại
          </Text>
        </Pressable>
      </View>
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
    padding: 20,
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
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },

  orderId: {
    fontSize: 18,
    fontWeight: "bold",
  },

  status: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
  },

  date: {
    marginTop: 6,
    color: "#777",
  },

  item: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },

  img: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#eee",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  price: {
    marginTop: 6,
    color: "#27ae60",
    fontWeight: "bold",
  },

  qty: {
    marginTop: 4,
    color: "#777",
  },

  bottom: {
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 16,
    marginTop: 10,
  },

  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },

  btn: {
    backgroundColor: "#2ecc71",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: "#777",
    textAlign: "center",
  },

  backBtn: {
    marginTop: 20,
    backgroundColor: "#2ecc71",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },

  backBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});