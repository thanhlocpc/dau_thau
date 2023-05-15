import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';
import authFirebase from '@react-native-firebase/auth';

import { connect, useDispatch } from 'react-redux'
import { TRY_LOGIN_LOCAL } from '../redux/auth/constants';

// import {tryLocalLogin} from ''


const RootNavigator = (props) => {
  const {colors} = useTheme();

  const {auth} = props

  const dispatch = useDispatch()

  // const isLoggedIn = Boolean(token);

  // const tryLocalLoginHandler = async () => {
  //   await tryLocalLogin();
  //   setTriedLocalLogin(true);
  // };

  useEffect(() => {
    if (authFirebase().currentUser) {
      dispatch({ type: TRY_LOGIN_LOCAL })
    }
  }, []);

  if (auth.tryLoginLocal) return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar translucent backgroundColor="transparent" />
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar translucent backgroundColor="transparent" />
      {auth.isLogin ? <DrawerNavigator /> : <AuthNavigator />}
      {/* <AuthNavigator /> */}
      {/* <DrawerNavigator /> */}
      <FlashMessage position="top"/>
    </View>
  );
};
const mapStateToProps = state => {
  return {
      auth : state.auth
  };
};

export default connect(mapStateToProps)(RootNavigator);

const styles = StyleSheet.create({});
