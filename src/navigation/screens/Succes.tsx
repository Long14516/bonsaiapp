import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function SuccessScreen({
  navigation,
  route,
}: any) {

  // GET ORDER ID FROM CHECKOUT
  const orderId =
    route?.params?.orderId;

  return (
    <View style={styles.container}>
      <Ionicons
        name="checkmark-circle"
        size={100}
        color="#2ecc71"
      />

      <Text style={styles.title}>
        Thanh toán thành công
      </Text>

      <Text style={styles.sub}>
        Đơn hàng của bạn đã được xác
        nhận 🎉
      </Text>

      {/* HOME */}
      <Pressable
        style={styles.btnPrimary}
        onPress={() =>
          navigation.replace("Main")
        }
      >
        <Text style={styles.btnText}>
          Về trang chủ
        </Text>
      </Pressable>

      {/* ORDER DETAIL */}
      <Pressable
        style={styles.btnOutline}
        onPress={() => {
          if (orderId) {
            navigation.replace(
              "OrderDetail",
              {
                orderId: orderId,
              }
            );
          }
        }}
      >
        <Text style={styles.outlineText}>
          Xem đơn hàng
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },

  sub: {
    fontSize: 16,
    color: "#777",
    marginTop: 10,
    textAlign: "center",
    marginBottom: 40,
  },

  btnPrimary: {
    width: "100%",
    backgroundColor: "#2ecc71",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  btnOutline: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#2ecc71",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  outlineText: {
    color: "#2ecc71",
    fontWeight: "bold",
    fontSize: 16,
  },
});