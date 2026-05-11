import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";

export default function LoginScreen() {

  const navigation = useNavigation<any>();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= LOGIN =================
  const handleLogin =
    async () => {

      if (!username.trim() || !password.trim()) {
        Alert.alert(
          "Lỗi",
          "Vui lòng nhập đầy đủ thông tin"
        );
        return;
      }

      try {

        setLoading(true);

        console.log("CALL LOGIN API");

        const res = await fetch(
          "https://voucher-overbill-aftermost.ngrok-free.dev/api/User/Login",
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
            }),
          }
        );

        console.log(
          "STATUS:",
          res.status
        );

        const text =
          await res.text();

        console.log(
          "RAW:",
          text
        );

        let data: any;

        try {
          data = JSON.parse(text);
        } catch {
          data = {
            message: text,
          };
        }
console.log("LOGIN RESPONSE:", data);

        if (!res.ok) {
          Alert.alert(
            "Lỗi",
            data.message ||
              "Đăng nhập thất bại"
          );
          return;
        }
await AsyncStorage.setItem(
  "user",
  JSON.stringify({
    id: data.id,
    username: data.username,
    role: data.role,
    token: data.token,
  })
);
        navigation.replace("Main");

      } catch (err) {

        console.log(
          "ERROR:",
          err
        );

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
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
    >
      <ScrollView
        contentContainerStyle={
          styles.scrollContainer
        }
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
          Welcome Back
        </Text>

        <Text style={styles.subtitle}>
          Nurture your space with nature 🌱
        </Text>

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
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
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
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading
              ? "LOADING..."
              : "LOG IN"}
          </Text>
        </TouchableOpacity>

        {/* REGISTER */}
        <TouchableOpacity
          style={styles.registerWrap}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Register")
          }
        >
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text style={styles.link}>
              Create account
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);
}
const styles = StyleSheet.create({

  flex: {
    flex: 1,
    backgroundColor: "#F4F8F4",
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 120,
    justifyContent: "center",
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 34,
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
  registerWrap: {
    marginTop: 22,
    alignItems: "center",
  },
  registerText: {
    color: "#666",
    fontSize: 14,
  },
  link: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
});