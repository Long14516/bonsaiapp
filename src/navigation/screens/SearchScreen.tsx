import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function SearchScreen({ navigation }: any) {
  const BASE_URL =
    "https://voucher-overbill-aftermost.ngrok-free.dev";

  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const categoryImages = [
    require("../../assets/mini.jpg"),
    require("../../assets/indoor.jpg"),
    require("../../assets/bonsai.png"),
    require("../../assets/outdoor.jpg"),
    require("../../assets/pot.jpg"),
    require("../../assets/decor.jpg"),
  ];

  const categoryColors = [
    "#EEF7EE",
    "#F5F1E8",
    "#EDF5E1",
    "#E8F1E7",
    "#F4ECE2",
    "#F0F5EF",
  ];

  const categoryBorders = [
    "#7BAE7F",
    "#B7A07A",
    "#8AA870",
    "#5F8B62",
    "#A1866F",
    "#6F8F72",
  ];

  // LOAD CATEGORY
  const loadCategories = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/Category`,
        {
          headers: {
            "ngrok-skip-browser-warning":
              "true",
          },
        }
      );

      const data = await res.json();

      const list = data.$values || data;

      const formatted = list.map(
        (item: any, index: number) => ({
          ...item,
          image:
            categoryImages[index %
              categoryImages.length],

          color:
            categoryColors[index %
              categoryColors.length],

          border:
            categoryBorders[index %
              categoryBorders.length],
        })
      );

      setCategories(formatted);

    } catch (err) {
      console.log("CATEGORY ERROR:", err);
    }
  };

  // LOAD PRODUCT
  const loadProducts = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/Product`,
        {
          headers: {
            "ngrok-skip-browser-warning":
              "true",
          },
        }
      );

      const data = await res.json();

      const list = data.$values || data;

      setProducts(list);

    } catch (err) {
      console.log("PRODUCT ERROR:", err);
    }
  };

  // LOAD ALL
  const loadData = async () => {
    await Promise.all([
      loadProducts(),
      loadCategories(),
    ]);
  };

  // FIRST LOAD
  useEffect(() => {
    loadData();
  }, []);

  // SEARCH
  useEffect(() => {
    if (keyword.trim() === "") {
      setSuggestions([]);
      return;
    }

   const filtered = products.filter(
  (item: any) => {
    const key =
      keyword.toLowerCase();

    return (
      item.name
        ?.toLowerCase()
        .includes(key) ||

      item.subtitle
        ?.toLowerCase()
        .includes(key) ||

      item.category?.name
        ?.toLowerCase()
        .includes(key)
    );
  }
);

    setSuggestions(filtered);

  }, [keyword, products]);

  // REFRESH
  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await loadData();

    setRefreshing(false);
  }, []);

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
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Tìm Kiếm
        </Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
        />

        <TextInput
          placeholder="Search bonsai..."
          value={keyword}
          onChangeText={setKeyword}
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      {/* SEARCH RESULT */}
      {keyword.trim() !== "" ? (
        <FlatList
          data={suggestions}
          keyExtractor={(item) =>
            item.id.toString()
          }

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }

          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() =>
                navigation.navigate(
                  "Details",
                  {
                    id: item.id,
                  }
                )
              }
            >
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.resultImage}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.resultName}>
                  {item.name}
                </Text>

                <Text style={styles.resultPrice}>
                  {Number(
                    item.price
                  ).toLocaleString()} đ
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {/* CATEGORY */}
          <View style={styles.grid}>
            {categories.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      item.color,

                    borderColor:
                      item.border,
                  },
                ]}
                onPress={() =>
                  setKeyword(item.name)
                }
              >
                <Image
                  source={item.image}
                  style={styles.cardImage}
                />

                <Text style={styles.cardTitle}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 55,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    marginHorizontal: 20,
    borderRadius: 18,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 25,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  card: {
    width: "48%",
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: "center",
    paddingVertical: 25,
    marginBottom: 18,
  },

  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 10,
  },

  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  resultImage: {
    width: 70,
    height: 70,
    borderRadius: 18,
    marginRight: 15,
  },

  resultName: {
    fontSize: 16,
    fontWeight: "600",
  },

  resultPrice: {
    marginTop: 8,
    color: "#2E7D32",
    fontWeight: "700",
  },
});

