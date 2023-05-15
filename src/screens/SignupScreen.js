import React, { useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  AppState,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthForm from '../components/shop/AuthForm';
// import {Context as AuthContext} from '../context/auth/AuthContext';
// import Banner from '../components/icons/SvgSignUpIcon';
import FooterSignUp from '../components/shop/FooterSignUp';
import {Colors} from '../constants/Colors';
const primaryLightColor = `rgba(${Colors.primary}, 0.8)`;
const textColor = `rgb(${Colors.text.primary})`;

import { useDispatch } from 'react-redux'
import { signup} from '../redux/auth/action'

const SignupScreen = ({navigation}) => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', () => {});
    return () => {
      subscription.remove();
    };
  }, []);

  const dispatch = useDispatch()
  const submit = (email,password,name)=>{
    dispatch(signup({email,password,name}))
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <View>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingTop: 10}}>
            {/* <Banner /> */}
            <Image source={require("../assets/images/banner/logo.png")} resizeMode='center' style={{width:"100%", height:200, marginTop:50}}/>

            <AuthForm
              isLogin = {false}
              buttonTitle="Đăng ký"
              onSubmit={submit}
            />
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Đã có tài khoản ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
            <FooterSignUp />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 40,
    flex: 1,
    // justifyContent: 'space-between',
  },
  linkContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop:10,
    marginBottom: 10,
  },
  linkText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: textColor,
  },
  link: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: primaryLightColor,
  },
});
