import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import {Colors} from '../constants/Colors';
import LeftIcon from '../components/icons/LeftIcon';
import {abs} from 'react-native-reanimated';
import BackButton from '../components/shop/BackButton';
import StartScreen from '../screens/StartScreen';
const Stack = createStackNavigator();
const textColor = `rgb(${Colors.text.primary})`;
import SplashScreen from 'react-native-splash-screen'

const AuthNavigator = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Started"
        component={StartScreen}
        options={({navigation}) => ({
          header: () => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  ...styles.headerStyle,
                  justifyContent: 'space-around',
                }}>
                <View style={styles.topHearder}>
                  <Image
                    style={{...styles.topImageSvg, left: -10, top: -20}}
                    source={require('../assets/images/auth/main_top.png')}
                  />
                  <Text style={{...styles.textHeaderStart, left: -10}}>
                    WELCOME TO STORE
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ),
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({navigation}) => ({
          header: () => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  ...styles.headerStyle,
                  justifyContent: 'space-around',
                }}>
                <View style={styles.topHearder}>
                  <Image
                    style={{...styles.topImageSvg, left: -10, top: -20}}
                    source={require('../assets/images/auth/main_top.png')}
                  />
                  <Text style={styles.textTop}>LOGIN</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ),
        })}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          header: () => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  ...styles.headerStyle,
                  justifyContent: 'space-between',
                }}>
                <View style={styles.topHearder}>
                  <Image
                    style={styles.topImageSvg}
                    source={require('../assets/images/auth/signup_top.png')}
                  />
                  <Text style={styles.textTop}>SIGNUP</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ),
        }}
      />
      {/* <Stack.Screen
        name="Forgot"
        component={ForgotScreen}
        options={{
          headerShown:false
        }}
      /> */}
    </Stack.Navigator>
  );
};
export default AuthNavigator;

const styles = StyleSheet.create({
  headerStyle: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  textHeaderStart: {
    width: '70%',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    paddingTop: 30,
    color:'black'
  },
  backButton: {
    height: 42,
    width: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: textColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontFamily: 'Lato-Black',
    fontSize: 40,
    color: 'black',
    lineHeight: 60,
  },
  topHearder: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  topImageSvg: {
    width: '30%',
    height: 120,
    resizeMode: 'contain',
  },
  textTop: {
    width: '70%',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    paddingTop: 30,
    left: 46,
    color:'black'
  },
});
