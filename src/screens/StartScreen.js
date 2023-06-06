import { Text, StatusBar, StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import FormSubmitButton from '../components/shop/FormSubmitButton';
const StartScreen = ({ navigation }) => {
  const nextLogin = () => {
    navigation.navigate('Login');
  };
  const nextSignUp = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.startContainer}>
          {/* <Banner /> */}
          <View style={{height:80, width:5}}/>
          <View style={styles.buttonNext}>
            <FormSubmitButton
              isSubmitting={false}
              title={'Đăng nhập'}
              submitHandler={nextLogin}
            />
            <FormSubmitButton
              isSubmitting={false}
              title={'Đăng ký'}
              submitHandler={nextSignUp}
              // shallowAppearance={true}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default StartScreen;

const styles = StyleSheet.create({
  screen: {
    // marginHorizontal: 20,
    flex: 1,
  },
  startContainer: {
    paddingVertical: 80,
    marginHorizontal: 20,
    justifyContent:"center",
    flex:1,
  },
  buttonNext: {
    paddingHorizontal: 20,
  },
});
