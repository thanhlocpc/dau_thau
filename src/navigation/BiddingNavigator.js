import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from '../constants/Colors';
// import CartIcon from '../components/shop/CartIconComponent';
import ProfileScreen from '../screens/ProfileScreen';
import MyBiddingScreen from '../screens/MyBiddingScreen';

const Stack = createStackNavigator();

const textPrimaryColor = `rgb(${Colors.text.primary})`;

const screenOptions = {
  headerTitleStyle: {
    fontFamily: 'Lato-Black',
    fontSize: 28,
    marginLeft: 20,
  },
  headerStyle: {
    // height: 120,
  },
};

const ProfileNavigator = () => {
  // const {clearCart} = useContext(CartContext);

  useEffect(() => {
    return () => {
      // clearCart();
    };
  }, []);
  
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="MyBiddingScreen"
        component={MyBiddingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
  rightIcon: {
    marginRight: 30,
  },
  leftIcon: {
    marginLeft: 20,
  },
  cart: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
