import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCart } from "../Shopcontext";

const BASE_URL =
  "https://voucher-overbill-aftermost.ngrok-free.dev";

export default function ShopScreen({ navigation }: any) {
  const {
    cart,
    increase,
    decrease,
    removeItem,
    loadCart,
  } = useCart();
  const [selected, setSelected] = useState<number[]>([]);

  // 🔥 FIX: reset selected khi cart thay đổi
  useEffect(() => {
    setSelected((prev) =>
      prev.filter((id) =>
        cart.some((item: any) => item.productId === id)
      )
    );
  }, [cart]);
useFocusEffect(
  useCallback(() => {
    loadCart(); // reload mỗi lần vào giỏ hàng
  }, [])
);
  // ================= TOTAL =================
  const total = cart
    .filter((item: any) =>
      selected.includes(item.productId)
    )
    .reduce(
      (sum: number, item: any) =>
        sum +
        Number(item.product.price) *
          item.quantity,
      0
    );

  // ================= RENDER ITEM =================
  const renderItem = ({ item }: any) => (
    <Pressable
      style={styles.item}
      onPress={() =>
        navigation.navigate("Details", {
          id: item.productId,
        })
      }
    >
      {/* CHECKBOX */}
      <Pressable
        style={[
          styles.checkbox,
          selected.includes(item.productId) &&
            styles.checkboxActive,
        ]}
        onPress={(e) => {
          e.stopPropagation();

          setSelected((prev) =>
            prev.includes(item.productId)
              ? prev.filter((id) => id !== item.productId)
              : [...prev, item.productId]
          );
        }}
      >
        {selected.includes(item.productId) && (
          <Ionicons name="checkmark" size={16} color="#fff" />
        )}
      </Pressable>

      {/* IMAGE */}
      <Image
        source={{
          uri: `${BASE_URL}/images/${item.product.image}`,
        }}
        style={styles.img}
      />

      {/* INFO */}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.product.name}</Text>

        <Text style={styles.price}>
          {Number(item.product.price).toLocaleString()} đ
        </Text>

        {/* QUANTITY */}
        <View style={styles.qtyBox}>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => decrease(item.id)}
          >
            <Text style={styles.qtyText}>-</Text>
          </Pressable>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <Pressable
            style={styles.qtyBtn}
            onPress={() => increase(item.id)}
          >
            <Text style={styles.qtyText}>+</Text>
          </Pressable>
        </View>

        {/* REMOVE */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            removeItem(item.id);
          }}
        >
          <Text style={{ color: "red", marginTop: 8 }}>
            Xoá
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </Pressable>

        <Text style={styles.headerTitle}>Giỏ hàng</Text>

        <Pressable
          onPress={() => {
            setSelected(
              selected.length === cart.length
                ? []
                : cart.map((item: any) => item.productId)
            );
          }}
        >
          <Text style={styles.selectAll}>
            {selected.length === cart.length ? "Bỏ chọn" : "Tất cả"}
          </Text>
        </Pressable>
      </View>

      {/* LIST */}
     <FlatList
  data={cart}
  keyExtractor={(item: any) => item.id.toString()}
  renderItem={renderItem}
  extraData={cart}
  contentContainerStyle={{
    paddingBottom: 140,
    flexGrow: 1,
  }}
  ListEmptyComponent={
    <View style={styles.emptyBox}>
      <Ionicons
        name="cart-outline"
        size={90}
        color="#ccc"
      />

      <Text style={styles.emptyText}>
        Giỏ hàng trống
      </Text>

      <Text style={styles.emptySub}>
        Hãy thêm sản phẩm vào giỏ hàng 🌱
      </Text>

      <Pressable
        style={styles.shopBtn}
        onPress={() =>
          navigation.navigate("Main")
        }
      >
        <Text style={styles.shopBtnText}>
          Mua ngay
        </Text>
      </Pressable>
    </View>
  }
/>

      {/* BOTTOM */}
      <View style={styles.bottom}>
        <View>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
          <Text style={styles.totalPrice}>
            {total.toLocaleString()} đ
          </Text>
        </View>

        <Pressable
          style={[
            styles.checkout,
            selected.length === 0 && { opacity: 0.5 },
          ]}
          disabled={selected.length === 0}
          onPress={() =>
            navigation.navigate("Checkout", {
              items: JSON.stringify(
                cart.filter((item) =>
                  selected.includes(item.productId)
                )
              ),
            })
          }
        >
          <Text style={styles.checkoutText}>
            Mua hàng ({selected.length})
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  selectAll: {
    color: "#2f7d32",
    fontWeight: "600",
  },

  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  checkboxActive: {
    backgroundColor: "#2f7d32",
    borderColor: "#2f7d32",
  },

  img: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#eee",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  price: {
    fontSize: 16,
    color: "#2f7d32",
    marginTop: 6,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  btn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  totalLabel: {
    color: "#777",
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2f7d32",
    marginTop: 4,
  },

  checkout: {
    backgroundColor: "#2f7d32",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },

  checkoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  qtyBox: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 10,
},

qtyBtn: {
  width: 28,
  height: 28,
  borderRadius: 6,
  backgroundColor:"#2f7d32",
  justifyContent: "center",
  alignItems: "center",
},

qtyText: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
},

quantity: {
  marginHorizontal: 14,
  fontSize: 16,
  fontWeight: "600",
},
emptyBox: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 30,
},

emptyText: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#333",
  marginTop: 16,
},

emptySub: {
  fontSize: 14,
  color: "#777",
  marginTop: 8,
  textAlign: "center",
},

shopBtn: {
  marginTop: 24,
  backgroundColor: "#2E7D32",
  paddingHorizontal: 28,
  paddingVertical: 14,
  borderRadius: 14,
},

shopBtnText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 15,
},
});