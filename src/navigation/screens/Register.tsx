import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { KeyboardAwareScrollView }
from "react-native-keyboard-aware-scroll-view";

import { useNavigation }
from "@react-navigation/native";

import Feather
from "@expo/vector-icons/Feather";

export default function RegisterScreen() {

  const navigation = useNavigation<any>();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= VALIDATE =================
  const validate = () => {

    if (!fullName.trim()) {
      Alert.alert(
        "Lỗi",
        "Vui lòng nhập họ tên"
      );
      return false;
    }

    if (!username.trim()) {
      Alert.alert(
        "Lỗi",
        "Vui lòng nhập username"
      );
      return false;
    }

    if (!email.trim()) {
      Alert.alert(
        "Lỗi",
        "Vui lòng nhập email"
      );
      return false;
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      Alert.alert(
        "Lỗi",
        "Email phải có đuôi @gmail.com"
      );
      return false;
    }

    if (!phone.trim()) {
      Alert.alert(
        "Lỗi",
        "Vui lòng nhập số điện thoại"
      );
      return false;
    }

    const phoneRegex = /^0[0-9]{8,9}$/;

    if (!phoneRegex.test(phone)) {
      Alert.alert(
        "Lỗi",
        "Số điện thoại phải từ 9-10 số và bắt đầu bằng 0"
      );
      return false;
    }

    if (!password.trim()) {
      Alert.alert(
        "Lỗi",
        "Vui lòng nhập mật khẩu"
      );
      return false;
    }

    if (password.length < 6) {
      Alert.alert(
        "Lỗi",
        "Mật khẩu phải ít nhất 6 ký tự"
      );
      return false;
    }

    return true;
  };

  // ================= REGISTER =================
  const handleRegister =
    async () => {

      if (!validate()) return;

      try {

        setLoading(true);

        const response =
          await fetch(
            "https://voucher-overbill-aftermost.ngrok-free.dev/api/User/Register",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                username:
                  username.trim(),

                password:
                  password.trim(),

                fullName:
                  fullName.trim(),

                email:
                  email.trim(),

                phone:
                  phone.trim(),
              }),
            }
          );

        const text =
          await response.text();

        let data: any = {};

        try {
          data = JSON.parse(text);
        } catch {
          data = {
            message: text,
          };
        }

        if (response.ok) {

          Alert.alert(
            "Thành công",
            "Đăng ký thành công"
          );

          navigation.goBack();

        } else {

          Alert.alert(
            "Lỗi",
            data.message ||
              "Đăng ký thất bại"
          );
        }

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Lỗi",
          "Không kết nối được server"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >

    <KeyboardAwareScrollView
  style={styles.wrapper}
  contentContainerStyle={styles.scrollContainer}
  enableOnAndroid={true}
  extraScrollHeight={120}
  keyboardShouldPersistTaps="handled"
  showsVerticalScrollIndicator={false}
>

        {/* LOGO */}
        <Image
          source={require("../../assets/icon1.png")}
          style={styles.logo}
        />

        {/* TITLE */}
        <Text style={styles.title}>
          Create Account
        </Text>

        <Text style={styles.subtitle}>
          Join your green sanctuary 🌱
        </Text>

        {/* FULLNAME */}
        <View style={styles.inputBox}>
          <Feather
            name="user"
            size={18}
            color="#6B8E6B"
          />

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* USERNAME */}
        <View style={styles.inputBox}>
          <Feather
            name="user"
            size={18}
            color="#6B8E6B"
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        {/* EMAIL */}
        <View style={styles.inputBox}>
          <Feather
            name="mail"
            size={18}
            color="#6B8E6B"
          />

          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        {/* PHONE */}
        <View style={styles.inputBox}>
          <Feather
            name="phone"
            size={18}
            color="#6B8E6B"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputBox}>
          <Feather
            name="lock"
            size={18}
            color="#6B8E6B"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading
              ? "LOADING..."
              : "REGISTER"}
          </Text>
        </TouchableOpacity>

        {/* LOGIN */}
        <TouchableOpacity
          style={styles.loginWrap}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Text style={styles.loginText}>
            Already have account?{" "}
            <Text style={styles.link}>
              Login
            </Text>
          </Text>
        </TouchableOpacity>

      </KeyboardAwareScrollView>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor: "#F4F8F4",
  },

  scrollContainer: {
  flexGrow: 1,
  paddingHorizontal: 24,
  paddingTop: 40,
  paddingBottom: 120,
},

 logo: {
  width: 100,
  height: 100,
  resizeMode: "contain",
  alignSelf: "center",
  marginBottom: 10,
},
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#173827",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B8E6B",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 35,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#DCE5DC",
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },

  button: {
    backgroundColor: "#2E7D32",
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },

  loginWrap: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 20,
  },

  loginText: {
    color: "#666",
    fontSize: 14,
  },

  link: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
});