import { Text, StatusBar, StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import Banner from '../components/icons/SvgChatIcon';
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.startContainer}>
          <Banner />
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
  },
  buttonNext: {
    paddingHorizontal: 20,
  },
});
