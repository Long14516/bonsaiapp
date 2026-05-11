import React, {
  useEffect,
} from "react";

import {
  View,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
console.log("");
export default function AuthLoadingScreen({
  navigation,
}: any) {

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin =
    async () => {

      const user =
        await AsyncStorage.getItem(
          "user"
        );

      if (user) {

        navigation.reset({
          index: 0,
          routes: [
            { name: "Main" },
          ],
        });

      } else {

        navigation.reset({
          index: 0,
          routes: [
            { name: "Loading" },
          ],
        });
      }
    };

  return (
    <View
      style={{
        flex: 1,
        justifyContent:
          "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size="large"
      />
    </View>
  );
}