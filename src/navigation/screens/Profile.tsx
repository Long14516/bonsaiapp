import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  "https://voucher-overbill-aftermost.ngrok-free.dev";

export default function Profile({
  navigation,
}: any) {

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // ================= LOAD USER =================
  const loadUser = async () => {

    try {

      const userString =
        await AsyncStorage.getItem(
          "user"
        );

      if (!userString) {
        return;
      }

      const userData =
        JSON.parse(userString);

      const res = await fetch(
        `${BASE_URL}/api/user/Profile/${userData.id}`,
        {
          headers: {
            "ngrok-skip-browser-warning":
              "true",
          },
        }
      );

      const data =
        await res.json();

      console.log(
        "PROFILE:",
        data
      );

      setUser(data);

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
    loadUser();
  }, []);

  // ================= LOGOUT =================
  const logout = async () => {

    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc muốn đăng xuất?",
      [
        {
          text: "Huỷ",
          style: "cancel",
        },

        {
          text: "Đăng xuất",

          style: "destructive",

          onPress: async () => {

          await AsyncStorage.clear();

navigation.reset({
  index: 0,
  routes: [{ name: "Login" }],
});
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
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
      <View style={styles.header}>

        <View style={styles.avatarBox}>
           <Image
                       source={require('../../assets/user.jpg')} // icon của bạn
                       style={styles.avatar}
                     />
                
        </View>

        <Text style={styles.name}>
          {user?.fullName ||
            user?.username}
        </Text>

       
      </View>

      {/* INFO */}
      <View style={styles.body}>

      

        {/* MENU */}
        <View style={styles.menu}>

          <MenuButton
            icon="receipt-outline"
            title="Đơn hàng"
            onPress={() =>
              navigation.navigate(
                "Orders"
              )
            }
          />

          <MenuButton
            icon="create-outline"
            title="Chỉnh sửa hồ sơ"
            onPress={() =>
              navigation.navigate(
                "Edit"
              )
            }
          />
  <MenuButton
            icon="key-outline"
            title="Đổi mật khẩu"
            onPress={() =>
              navigation.navigate(
                "Change"
              )
            }
          />
          <MenuButton
            icon="heart-outline"
            title="Yêu thích"
            onPress={() =>navigation.navigate("Favorites")}
          />
  <MenuButton
            icon="notifications-outline"
            title="Thông Báo"
            onPress={() => navigation.navigate("Notifications")}
          />
      

        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={logout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#fff"
          />

          <Text
            style={
              styles.logoutText
            }
          >
            Đăng xuất
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

// ================= PROFILE ITEM =================
const ProfileItem = ({
  icon,
  title,
  value,
}: any) => (
  <View style={styles.infoItem}>

    <Ionicons
      name={icon}
      size={22}
      color="#2E7D32"
    />

    <View
      style={{ marginLeft: 14 }}
    >
      <Text style={styles.infoTitle}>
        {title}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>

  </View>
);

// ================= MENU BUTTON =================
const MenuButton = ({
  icon,
  title,
  onPress,
}: any) => (
  <TouchableOpacity
    style={styles.menuBtn}
    onPress={onPress}
  >
    <View style={styles.menuLeft}>

      <Ionicons
        name={icon}
        size={22}
        color="#2E7D32"
      />

      <Text style={styles.menuText}>
        {title}
      </Text>

    </View>

    <Ionicons
      name="chevron-forward"
      size={20}
      color="#999"
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F6FBF6",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // ================= HEADER =================
  header: {
    backgroundColor: "#2E7D32",

    paddingTop: 70,
    paddingBottom: 40,

    alignItems: "center",

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatarBox: {
    width: 120,
    height: 120,

    borderRadius: 60,

    backgroundColor: "#fff",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
  },

  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },


  // ================= BODY =================
  body: {
    padding: 18,
  },



  infoItem: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 22,
  },

  infoTitle: {
    fontSize: 13,
    color: "#888",
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#173827",
    marginTop: 2,
  },

  // ================= MENU =================
  menu: {
    backgroundColor: "#fff",

    borderRadius: 20,

    paddingVertical: 8,

    elevation: 2,
  },

  menuBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 18,
    paddingVertical: 18,

    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "600",
    color: "#173827",
  },

  // ================= LOGOUT =================
  logoutBtn: {
    marginTop: 30,

    backgroundColor: "#2E7D32",

    height: 56,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,

    marginLeft: 10,
  },
});