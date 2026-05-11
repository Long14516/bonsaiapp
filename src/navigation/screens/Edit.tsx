import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  "https://voucher-overbill-aftermost.ngrok-free.dev";

export default function EditProfileScreen({
  navigation,
}: any) {

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [userId, setUserId] =
    useState<number | null>(null);

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  // ================= LOAD PROFILE =================
  const loadProfile = async () => {

    try {

      const userString =
        await AsyncStorage.getItem(
          "user"
        );

      if (!userString) {
        return;
      }

      const user =
        JSON.parse(userString);

      setUserId(user.id);

      const res = await fetch(
        `${BASE_URL}/api/user/Profile/${user.id}`,
        {
            
          headers: {
            "ngrok-skip-browser-warning":
              "true",
          },
        }
      );

      const data =
        await res.json();


      setFullName(
        data.fullName || ""
      );

      setEmail(
        data.email || ""
      );

      setPhone(
        data.phone || ""
      );

      setAddress(
        data.address || ""
      );

    } catch (err) {

      console.log(
        "LOAD PROFILE ERROR:",
        err
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // ================= SAVE =================
const handleSave = async () => {
  try {

    if (!userId) {
      Alert.alert("Lỗi", "Không tìm thấy user");
      return;
    }

    if (!fullName.trim()) {
      Alert.alert(
        "Lỗi",
        "Vui lòng nhập họ tên"
      );
      return;
    }

    setSaving(true);

    // 🔥 GET TOKEN
const userString =
  await AsyncStorage.getItem("user");

const user =
  userString
    ? JSON.parse(userString)
    : null;

const token = user?.token;

    // 🔥 API
    const res = await fetch(
      `${BASE_URL}/api/user/update/${userId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,

          "ngrok-skip-browser-warning":
            "true",
        },

        body: JSON.stringify({
          id: userId,

          // backend đang cần username
        username: user.username,
          // để trống nếu không đổi pass
          password: "",

          fullName,
          email,
          phone,
          address,
        }),
      }
    );

    // 🔥 DEBUG RESPONSE
    const text = await res.text();



    // FAIL
    if (!res.ok) {

      Alert.alert(
        "Lỗi",
        text || "Cập nhật thất bại"
      );

      return;
    }

    // 🔥 UPDATE LOCAL USER
    const oldUser =
      await AsyncStorage.getItem("user");

    if (oldUser) {

      const parsed =
        JSON.parse(oldUser);

      parsed.fullName = fullName;
      parsed.email = email;
      parsed.phone = phone;
      parsed.address = address;

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(parsed)
      );
    }

    Alert.alert(
      "Thành công",
      "Cập nhật hồ sơ thành công"
    );

    navigation.goBack();

  } catch (err) {

    console.log(
      "SAVE ERROR:",
      err
    );

    Alert.alert(
      "Lỗi",
      "Không thể cập nhật"
    );

  } finally {

    setSaving(false);
  }
};

  // ================= LOADING =================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#2E7D32"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* HEADER */}
   {/* HEADER */}
<View style={styles.headerRow}>

  <TouchableOpacity
    style={styles.backBtn}
    onPress={() => navigation.goBack()}
  >
    <Ionicons
      name="arrow-back"
      size={22}
      color="#fff"
    />
  </TouchableOpacity>

  <Text style={styles.headerTitle}>
    Chỉnh sửa hồ sơ
  </Text>

  {/* fake view để cân giữa */}
  <View style={{ width: 42 }} />

</View>

      {/* FORM */}
      <View style={styles.form}>

        {/* FULL NAME */}
        <View style={styles.inputGroup}>

          <Text style={styles.label}>
            Họ và tên
          </Text>

          <View style={styles.inputBox}>

            <Ionicons
              name="person-outline"
              size={20}
              color="#2E7D32"
            />

            <TextInput
              value={fullName}
              onChangeText={
                setFullName
              }
              placeholder="Nhập họ tên"
              style={styles.input}
            />

          </View>
        </View>

        {/* EMAIL */}
        <View style={styles.inputGroup}>

          <Text style={styles.label}>
            Email
          </Text>

          <View style={styles.inputBox}>

            <Ionicons
              name="mail-outline"
              size={20}
              color="#2E7D32"
            />

            <TextInput
              value={email}
              onChangeText={
                setEmail
              }
              placeholder="Nhập email"
              style={styles.input}
              keyboardType="email-address"
            />

          </View>
        </View>

        {/* PHONE */}
        <View style={styles.inputGroup}>

          <Text style={styles.label}>
            Số điện thoại
          </Text>

          <View style={styles.inputBox}>

            <Ionicons
              name="call-outline"
              size={20}
              color="#2E7D32"
            />

            <TextInput
              value={phone}
              onChangeText={
                setPhone
              }
              placeholder="Nhập số điện thoại"
              style={styles.input}
              keyboardType="phone-pad"
            />

          </View>
        </View>

        {/* ADDRESS */}
        <View style={styles.inputGroup}>

          <Text style={styles.label}>
            Địa chỉ
          </Text>

          <View
            style={[
              styles.inputBox,
              {
                height: 110,
                alignItems:
                  "flex-start",
              },
            ]}
          >

            <Ionicons
              name="location-outline"
              size={20}
              color="#2E7D32"
              style={{
                marginTop: 15,
              }}
            />

            <TextInput
              value={address}
              onChangeText={
                setAddress
              }
              placeholder="Nhập địa chỉ"
              style={[
                styles.input,
                {
                  height: 100,
                  textAlignVertical:
                    "top",
                },
              ]}
              multiline
            />

          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator
              color="#fff"
            />
          ) : (
            <Text
              style={
                styles.saveText
              }
            >
              Lưu thay đổi
            </Text>
          )}
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F8F4",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // ================= HEADER =================
// ================= HEADER =================
headerRow: {
  backgroundColor: "#2E7D32",

  paddingTop: 60,
  paddingBottom: 25,

  paddingHorizontal: 20,

  borderBottomLeftRadius: 28,
  borderBottomRightRadius: 28,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

backBtn: {
  width: 42,
  height: 42,

  borderRadius: 12,

  backgroundColor:
    "rgba(255,255,255,0.15)",

  justifyContent: "center",
  alignItems: "center",
},

headerTitle: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#fff",
},
  // ================= FORM =================
  form: {
    padding: 18,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#173827",
  },

  inputBox: {
    backgroundColor: "#fff",

    borderRadius: 16,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 14,

    minHeight: 56,

    elevation: 2,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#173827",
  },

  // ================= BUTTON =================
  saveBtn: {
    backgroundColor: "#2E7D32",

    height: 56,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
  },

  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});