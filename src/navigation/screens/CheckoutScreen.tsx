import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../Shopcontext";

const BASE_URL =
  "https://voucher-overbill-aftermost.ngrok-free.dev";

export default function CheckoutScreen({
  route,
  navigation,
}: any) {

  const items = JSON.parse(
    route.params.items
  );

  const { clearCart } = useCart();

  const [loading, setLoading] =
    useState(false);
    const [user, setUser] =
  useState<any>(null);
  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  // TOTAL
  const total = items.reduce(
    (sum: number, item: any) =>
      sum +
      item.product.price *
        item.quantity,
    0
  );

  const shipping = 30000;

  const finalTotal =
    total + shipping;

  // ================= LOAD =================
  useEffect(() => {

    loadUser();

    const subscription =
      Linking.addEventListener(
        "url",
        handleDeepLink
      );

    const getInitialUrl =
      async () => {

        const url =
          await Linking.getInitialURL();

        if (url) {
          handleDeepLink({ url });
        }
      };

    getInitialUrl();

    return () => {
      subscription.remove();
    };

  }, []);
  const loadUser = async () => {
  try {

    const userString =
      await AsyncStorage.getItem("user");

    if (!userString) return;

    const userData =
      JSON.parse(userString);

    setUser(userData);

    console.log(
      "CHECKOUT USER:",
      userData
    );

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

    setCustomerName(
      data.fullName || ""
    );

    setPhone(
      data.phone || ""
    );

    setAddress(
      data.address || ""
    );

  } catch (err) {

    console.log(
      "LOAD USER ERROR:",
      err
    );
  }
};
const createOrder = async () => {
  try {

    const userString =
      await AsyncStorage.getItem("user");

    if (!userString) {
      return null;
    }

    const userData =
      JSON.parse(userString);

    console.log(
      "CREATE ORDER USER:",
      userData
    );

    const res = await fetch(
      `${BASE_URL}/api/order/create`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "ngrok-skip-browser-warning":
            "true",
        },

        body: JSON.stringify({
          userId: userData.id,
        }),
      }
    );

    const data =
      await res.json();

    console.log(
      "ORDER:",
      data
    );

    return data.orderId;

  } catch (err) {

    console.log(
      "CREATE ORDER ERROR:",
      err
    );

    return null;
  }
};

  // ================= HANDLE RETURN =================
  const handleDeepLink =
    async (event: any) => {

      const url = event.url;
      const responseCode =
        url.match(
          /vnp_ResponseCode=([^&]+)/
        )?.[1];

      // INVALID
      if (!responseCode) return;

      console.log(
        "RESPONSE CODE:",
        responseCode
      );

      // SUCCESS
      if (responseCode === "00") {

        // CREATE ORDER
        const orderId =
          await createOrder();

        if (!orderId) {

          navigation.replace(
            "Fail"
          );

          return;
        }

        // CLEAR CART
        clearCart();

        // SUCCESS
        navigation.replace(
          "Success",
          {
            orderId: orderId,
          }
        );

      } else {

        navigation.replace(
          "Fail"
        );
      }
    };

  // ================= IMAGE =================
  const getImage = (
    img: string
  ) => {

    if (!img) return "";

    if (
      img.startsWith("http")
    ) {
      return img;
    }

    return `${BASE_URL}/images/${img}`;
  };

  // ================= PAYMENT =================
  const handlePayment =
    async () => {

      if (loading) return;

      setLoading(true);

      try {

        const res = await fetch(
          `${BASE_URL}/api/payment/create`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              "ngrok-skip-browser-warning":
                "true",
            },

            body: JSON.stringify({
              amount:
                finalTotal,

              orderInfo:
                "Thanh toan don hang",

              customerName:
                customerName,
            }),
          }
        );

        const data =
          await res.json();

        console.log(
          "PAYMENT:",
          data
        );

        await Linking.openURL(
          data.paymentUrl
        );

      } catch (err) {

        console.log(err);

        Alert.alert(
          "Lỗi",
          "Không kết nối được server"
        );

      } finally {

        setLoading(false);
      }
    };

  // ================= CONFIRM =================
  const confirmPayment =
    () => {

      Alert.alert(
        "Xác nhận thanh toán",

        `Thanh toán ${finalTotal.toLocaleString()} đ ?`,

        [
          {
            text: "Hủy",
            style: "cancel",
          },

          {
            text: "OK",
            onPress:
              handlePayment,
          },
        ]
      );
    };

  // ================= ITEM =================
  const renderItem = ({
    item,
  }: any) => (

    <View style={styles.itemCard}>

      <Image
        source={{
          uri: getImage(
            item.product.image
          ),
        }}
        style={styles.img}
      />

      <View style={{ flex: 1 }}>

        <Text
          style={styles.name}
          numberOfLines={2}
        >
          {item.product.name}
        </Text>

        <View
          style={styles.rowBetween}
        >
          <Text style={styles.qty}>
            x{item.quantity}
          </Text>

          <Text style={styles.price}>
            {Number(
              item.product.price
            ).toLocaleString()} đ
          </Text>
        </View>

      </View>

    </View>
  );

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
            size={22}
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Thanh toán
        </Text>

      </View>

      <FlatList
        data={items}
        keyExtractor={(item) =>
          item.productId.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 140,
        }}

        ListHeaderComponent={
          <>
            {/* ADDRESS */}
            <View style={styles.card}>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Ionicons
                  name="location-outline"
                  size={18}
                  color="#ee4d2d"
                />

                <Text
                  style={
                    styles.sectionTitle
                  }
                >
                  Địa chỉ nhận hàng
                </Text>

              </View>

              {/* NAME */}
              <TextInput
                placeholder="Tên người nhận"
                value={customerName}
                editable={false}
                style={[
                  styles.input,
                  styles.disabledInput,
                ]}
              />

              {/* PHONE */}
              <TextInput
                placeholder="Số điện thoại"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={[
                  styles.input,
                  styles.disabledInput,
                ]}
              />

              {/* ADDRESS */}
              <TextInput
                placeholder="Địa chỉ nhận hàng"
                value={address}
                onChangeText={setAddress}
                multiline
                style={[
                  styles.input,
                  {
                    height: 80,
                    textAlignVertical:
                      "top",
                  },
                ]}
              />

            </View>

            {/* SHOP */}
            <View style={styles.card}>
              <Text style={styles.shop}>
                🛍️ Shop của bạn
              </Text>
            </View>
          </>
        }

        ListFooterComponent={
          <View style={styles.card}>

            <Row
              label="Tạm tính"
              value={total}
            />

            <Row
              label="Phí vận chuyển"
              value={shipping}
            />

            <View
              style={styles.divider}
            />

            <Row
              label="Tổng cộng"
              value={finalTotal}
              bold
            />

          </View>
        }
      />

      {/* BOTTOM */}
      <View style={styles.bottom}>

        <View>

          <Text
            style={
              styles.totalLabel
            }
          >
            Tổng thanh toán
          </Text>

          <Text style={styles.total}>
            {finalTotal.toLocaleString()} đ
          </Text>

        </View>

        <TouchableOpacity
          style={styles.orderBtn}
          onPress={confirmPayment}
        >
          <Text style={styles.orderText}>
            {loading
              ? "Đang xử lý..."
              : "Đặt hàng"}
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

// ================= ROW =================
const Row = ({
  label,
  value,
  bold,
}: any) => (

  <View style={styles.rowBetween}>

    <Text
      style={
        bold
          ? styles.bold
          : styles.normal
      }
    >
      {label}
    </Text>

    <Text
      style={
        bold
          ? styles.totalPrice
          : styles.normal
      }
    >
      {value.toLocaleString()} đ
    </Text>

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#fff",
    gap: 12,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    marginTop: 12,
    padding: 16,
  },

  sectionTitle: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "bold",
    color: "#2f7d32",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  disabledInput: {
    backgroundColor: "#f5f5f5",
  },

  itemCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 1,
  },

  img: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  qty: {
    color: "#666",
  },

  price: {
    color: "#2f7d32",
    fontWeight: "bold",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },

  normal: {
    color: "#555",
  },

  bold: {
    fontWeight: "bold",
    fontSize: 16,
  },

  totalPrice: {
    color: "#2f7d32",
    fontWeight: "bold",
    fontSize: 18,
  },

  shop: {
    fontSize: 16,
    fontWeight: "bold",
  },

  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    color: "#666",
  },

  total: {
    color: "#2f7d32",
    fontSize: 22,
    fontWeight: "bold",
  },

  orderBtn: {
    backgroundColor: "#2f7d32",
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 12,
  },

  orderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});