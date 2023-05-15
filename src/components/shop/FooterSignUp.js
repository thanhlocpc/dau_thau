import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../../constants/Colors';
const primaryLightColor = `rgba(${Colors.primary}, 0.8)`;
const primary = `rgb(${Colors.primary})`;
const widthWindow = Dimensions.get('window').width;
const FooterSignUp = () => {
  return (
    <View>
      <View style={styles.orBottom}>
        <View style={styles.lineBorder}></View>
        <View style={styles.textOrContainer}>
          <Text style={styles.textOr}>OR</Text>
        </View>
        <View style={styles.lineBorder}></View>
      </View>
      <View style={styles.listIcon}>
        <View style={styles.cricleIcon}>
          <FontAwsome style={styles.iconItem} size={20} name="facebook-f" />
        </View>
        <View style={styles.cricleIcon}>
          <FontAwsome style={styles.iconItem} size={20} name="google" />
        </View>
        <View style={styles.cricleIcon}>
          <FontAwsome style={styles.iconItem} size={20} name="twitter" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  cricleIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    borderColor: primaryLightColor,
  },
  iconItem: {
    color: primary,
  },
  bannerSignUp: {},
  orBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: widthWindow,
    justifyContent: 'center',
    height: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  lineBorder: {
    borderWidth: 0.5,
    height: 0.4,
    width: widthWindow * (35 / 100),
  },
  textOrContainer: {
    width: widthWindow * (8 / 100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOr: {
    fontSize: 16,
    color: primary,
  },
});
export default FooterSignUp;
