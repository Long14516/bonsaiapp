import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";


const BASE_URL =
  "https://voucher-overbill-aftermost.ngrok-free.dev";
export default function Updates({ navigation }: any) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

useFocusEffect(
  useCallback(() => {
    fetchNotifications();
  }, [])
);
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/notification`
      );

      const data = await response.json();

      setNotifications(data);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{
          uri:
            item.image ||
            "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.message}>
          {item.message}
        </Text>

        <Text style={styles.time}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Thông báo
        </Text>

        <Ionicons
          name="notifications"
          size={24}
         
        />
      </View>

      {/* LIST */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications-off"
              size={70}
              color="#ccc"
            />

            <Text style={styles.emptyText}>
              Chưa có thông báo
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FBF6",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 18,
    marginBottom: 14,
    elevation: 2,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 14,
    marginRight: 14,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  message: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
    lineHeight: 20,
  },

  time: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
  },

  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#999",
  },
});