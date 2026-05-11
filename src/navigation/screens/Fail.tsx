import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function FailScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Ionicons name="close-circle" size={100} color="#e74c3c" />

      <Text style={styles.title}>Thanh toán thất bại</Text>

      <Text style={styles.sub}>
        Có lỗi xảy ra trong quá trình thanh toán 😢
      </Text>

      <Pressable
        style={styles.btnPrimary}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnText}>Thử lại</Text>
      </Pressable>

      <Pressable
        style={styles.btnOutline}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.outlineText}>Về trang chủ</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },

  sub: {
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
    textAlign: "center",
  },

  btnPrimary: {
    marginTop: 20,
    backgroundColor: "#ee4d2d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  btnOutline: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ee4d2d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },

  outlineText: {
    color: "#ee4d2d",
    fontWeight: "bold",
  },
});