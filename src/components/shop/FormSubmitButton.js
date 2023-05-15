import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Colors } from '../../constants/Colors';

const activeColor = `rgb(${Colors.primary})`;
const inactiveColor = `rgba(${Colors.primary}, 0.3)`;

const FormSubmitButton = ({
  disabled,
  shallowAppearance,
  isSubmitting,
  submitHandler,
  title,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...styles.submit,
        backgroundColor: shallowAppearance ? inactiveColor : activeColor,
      }}
      activeOpacity={0.8}
      onPress={submitHandler}>
      {isSubmitting ? <ActivityIndicator
        animating={isSubmitting}
        style={styles.spinner}
        color="white"
        size="small"
      /> : <Text style={styles.buttonTitle}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
  submit: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 140,
    flexDirection: 'row',
    marginTop: 25,
  },
  buttonTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: 'white',
  },
  spinner: {
    // left: 15,
  },
});
