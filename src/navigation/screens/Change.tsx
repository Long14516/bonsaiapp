import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  "https://voucher-overbill-aftermost.ngrok-free.dev";

export default function ChangePasswordScreen({
  navigation,
}: any) {

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= SAVE =================
  const handleChangePassword =
    async () => {

      try {

        if (
          !currentPassword ||
          !newPassword ||
          !confirmPassword
        ) {
          Alert.alert(
            "Lỗi",
            "Vui lòng nhập đầy đủ thông tin"
          );

          return;
        }

        if (newPassword.length < 6) {
          Alert.alert(
            "Lỗi",
            "Mật khẩu mới tối thiểu 6 ký tự"
          );

          return;
        }

        if (
          newPassword !== confirmPassword
        ) {
          Alert.alert(
            "Lỗi",
            "Mật khẩu xác nhận không khớp"
          );

          return;
        }

        setLoading(true);

        // 🔥 USER
        const userString =
          await AsyncStorage.getItem(
            "user"
          );

        if (!userString) {
          Alert.alert(
            "Lỗi",
            "Bạn chưa đăng nhập"
          );

          return;
        }

        const user =
          JSON.parse(userString);

        // 🔥 TOKEN
        const token =
          user?.token;

        // 🔥 VERIFY LOGIN
        const loginRes =
          await fetch(
            `${BASE_URL}/api/user/login`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                "ngrok-skip-browser-warning":
                  "true",
              },

              body: JSON.stringify({
                username:
                  user.username,

                password:
                  currentPassword,
              }),
            }
          );

        if (!loginRes.ok) {
          Alert.alert(
            "Lỗi",
            "Mật khẩu hiện tại không đúng"
          );

          return;
        }

        // 🔥 UPDATE PASSWORD
        const res = await fetch(
          `${BASE_URL}/api/user/update/${user.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,

              "ngrok-skip-browser-warning":
                "true",
            },

            body: JSON.stringify({
              id: user.id,

              username:
                user.username,

              password:
                newPassword,
            }),
          }
        );

        const data =
          await res.json();

        console.log(
          "CHANGE PASSWORD:",
          data
        );

        if (!res.ok) {
          Alert.alert(
            "Lỗi",
            data.message ||
              "Không thể đổi mật khẩu"
          );

          return;
        }

        Alert.alert(
          "Thành công",
          "Đổi mật khẩu thành công"
        );

        navigation.goBack();

      } catch (err) {

        console.log(
          "CHANGE PASSWORD ERROR:",
          err
        );

        Alert.alert(
          "Lỗi",
          "Không thể đổi mật khẩu"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={{
      paddingBottom: 40,
    }}
    showsVerticalScrollIndicator={false}
  >
    {/* HEADER */}
    <View style={styles.headerRow}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color="#173827"
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        Đổi mật khẩu
      </Text>
    </View>

    <Text style={styles.sub}>
      Hãy nhập mật khẩu mới để bảo mật tài khoản
    </Text>

    {/* CURRENT */}
    <View style={styles.box}>
      <Text style={styles.label}>
        Mật khẩu hiện tại
      </Text>

      <TextInput
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Nhập mật khẩu hiện tại"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>

    {/* NEW */}
    <View style={styles.box}>
      <Text style={styles.label}>
        Mật khẩu mới
      </Text>

      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Nhập mật khẩu mới"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>

    {/* CONFIRM */}
    <View style={styles.box}>
      <Text style={styles.label}>
        Xác nhận mật khẩu
      </Text>

      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Nhập lại mật khẩu"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>

    {/* BUTTON */}
    <TouchableOpacity
      style={[
        styles.btn,
        loading && {
          opacity: 0.7,
        },
      ]}
      onPress={handleChangePassword}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.btnText}>
          Lưu thay đổi
        </Text>
      )}
    </TouchableOpacity>
  </ScrollView>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FBF6",
    paddingHorizontal: 20,
  },

  // ================= HEADER =================
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 55,
    marginBottom: 12,
  },

  backBtn: {
    width: 42,
    height: 42,

    borderRadius: 14,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#173827",
  },

  sub: {
    color: "#6B7B6B",
    marginBottom: 30,
    lineHeight: 22,
    fontSize: 14,
  },

  // ================= FORM =================
  box: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    color: "#173827",
    fontWeight: "600",
    fontSize: 14,
  },

  input: {
    backgroundColor: "#fff",

    borderRadius: 16,

    paddingHorizontal: 16,

    height: 58,

    borderWidth: 1,
    borderColor: "#E2E8E2",

    color: "#173827",

    fontSize: 15,

    elevation: 2,
  },

  // ================= BUTTON =================
  btn: {
    backgroundColor: "#2E7D32",

    height: 58,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 20,

    elevation: 3,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});