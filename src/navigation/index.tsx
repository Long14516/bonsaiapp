import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './screens/Home';
import Profile from './screens/Profile';
import Order from './screens/Order';
import Updates from './screens/Updates';
import OrderDetail from './screens/OrderDetail';
import  Splash  from './screens/Splash';
import WelcomeSlider from './screens/Welcome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DetailScreen from './screens/Details';
import LoadingScreen from './screens/Loading';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import ShopScreen from './screens/Shop';
import React from 'react';
import CheckoutScreen from './screens/CheckoutScreen';
import FailScreen from './screens/Fail';
import SuccessScreen from './screens/Succes';
import EditProfileScreen from './screens/Edit';
import SearchScreen from './screens/SearchScreen';
import ChangePasswordScreen from './screens/Change';
import FavoriteScreen from './screens/Favorite';
import AuthLoadingScreen from './screens/Auth';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Splash: undefined;
  Loading: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Details: undefined;
  Shop: undefined;
  Checkout: undefined;
  Fail: undefined;
  Success: undefined;
  Search: undefined;
  Edit:undefined;
  Change:undefined
  OrderDetail: {
    orderId: number;
  };
};
function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-outline" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Updates}
        options={{
          tabBarIcon: ({ color, size }) => (
  <Ionicons name="notifications-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Order}
        options={{
          tabBarIcon: ({ color, size }) => (
<AntDesign name="shopping-cart" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
         <Feather name="user" size={24} color="black" />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (

    <NavigationContainer >
    

   <Stack.Navigator>
      <Stack.Screen
    name="AuthLoading"
    component={
      AuthLoadingScreen
    }
  />

  <Stack.Screen
    name="Loading"
    component={LoadingScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="Splash"
    component={Splash}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="Welcome"
    component={WelcomeSlider}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="Login"
    component={LoginScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="Register"
    component={RegisterScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="Main"
    component={HomeTabs}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="Details"
    component={DetailScreen}
    options={{ headerShown: false }}
  />
 <Stack.Screen
    name="Shop"
    component={ShopScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="Checkout"
    component={CheckoutScreen}
    options={{ headerShown: false }}
   />
  <Stack.Screen
    name="Fail"
    component={FailScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="Success"
    component={SuccessScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="Search"
    component={SearchScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="OrderDetail"
    component={OrderDetail}
    options={{ headerShown: false }}
   />
    <Stack.Screen
    name="Edit"
    component={EditProfileScreen}
    options={{ headerShown: false }}
   />
      <Stack.Screen
    name="Change"
    component={ChangePasswordScreen}
    options={{ headerShown: false }}
   />
</Stack.Navigator>
    </NavigationContainer>
    
  );
}