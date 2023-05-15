import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Colors} from '../../constants/Colors';

const validColor = `rgb(${Colors.accentTwo})`;
const invalidColor = `rgb(${Colors.danger})`;
const primaryColor = `rgb(${Colors.primary})`;
const borderDefaultColor = `rgba(${Colors.text.primary}, 0.08)`;
const labelDefaultColor = `rgb(${Colors.text.secondary})`;

const getColor = (isValid, finishedEditing, focused, defaultColor) => {
  if (focused) {
    return primaryColor;
  }

  if (!isValid && finishedEditing) {
    return invalidColor;
  }

  if (isValid && finishedEditing) {
    return validColor;
  }

  return defaultColor;
};

const LabledInput = ({
  label,
  value,
  keyboardType,
  onChangeText,
  validators,
  isValid,
  setIsValid,
  required,
  multiline,
  large,
  autoCapitalize,
  secure,
  placeholder,
  Icon,
  triggerValidation,
  error,
  borderRadius,
  backgroundColor,
}) => {
  const [focus, setFocus] = useState(false);
  const [finishedEditing, setFinishedEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const borderColor = getColor(
    isValid,
    finishedEditing,
    focus,
    borderDefaultColor,
  );
  const labelColor = getColor(
    isValid,
    finishedEditing,
    focus,
    labelDefaultColor,
  );

  const validateInput = text => {
    setFocus(false);
    setFinishedEditing(true);

    if (required && !text?.length) {
      setErrorMessage('Không được để trống!');
      setIsValid(false);
      return;
    }

    if (validators) {
      let foundError = false;
      validators.forEach(validator => {
        const {isValid, error} = validator(text);
        if (!isValid) {
          setIsValid(false);
          setErrorMessage(error);
          foundError = true;
          return;
        }
      });

      if (foundError) return;
    }

    setIsValid(true);
    setErrorMessage('');
  };

  useEffect(() => {
    if (triggerValidation) {
      validateInput(value);
    }

    if (error) {
      setErrorMessage(error);
    }
  }, [triggerValidation, error]);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.formControl,
          borderColor: borderColor,
          height: large ? null : 54,
          minHeight: large ? 180 : null,
          borderRadius: borderRadius ? borderRadius : 0,
          marginTop: label ? 25 : 8,
        }}>
        <Text
          style={{
            ...styles.label,
            color: labelColor,
          }}>
          {label}
        </Text>
        <View
          style={{
            ...styles.inputContainer,
            borderRadius: borderRadius ? borderRadius : 0,
          }}>
          {Icon && (
            <View
              style={{
                justifyContent: 'center',
                marginStart: 20,
              }}>
              <Icon color={focus ? primaryColor : labelDefaultColor} />
            </View>
          )}
          <TextInput
           selectionColor={'blue'}
            autoCorrect={false}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            secureTextEntry={secure}
            placeholder={placeholder}
            placeholderTextColor={`rgba(${Colors.text.primary}, 0.5)`}
            style={{
              ...styles.input,
              textAlignVertical: large ? 'top' : 'center',
              // borderRadius:borderRadius ? borderRadius : 40
            }}
            onFocus={() => {
              setFocus(true);
              if (isValid) setIsValid(false);
              setFinishedEditing(false);
            }}
            onBlur={() => {
              validateInput(value);
            }}
            value={value}
            keyboardType={keyboardType ? keyboardType : 'default'}
            onChangeText={(text)=>{onChangeText(text), validateInput(text)}}
            onChange={() => setErrorMessage('')}
            onSubmitEditing={() => validateInput(value)}
          />
          {isValid && finishedEditing && (
            <AntDesign
              style={styles.icon}
              name="checkcircle"
              size={20}
              color={validColor}
            />
          )}
          {!isValid && finishedEditing && (
            <AntDesign
              style={styles.icon}
              name="exclamationcircleo"
              size={20}
              color={invalidColor}
            />
          )}
        </View>
      </View>
      {errorMessage.length ? (
        <Text style={styles.erroMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default LabledInput;

const styles = StyleSheet.create({
  container: {marginTop: 5},

  formControl: {
    borderWidth: 1,
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    height: 18,
    textAlignVertical: 'center',
    // backgroundColor: `rgb(${Colors.background})`,
    alignSelf: 'flex-start',
    // marginStart: 20,
    position: 'absolute',
    top: -23,
    paddingHorizontal: 0,
    color: 'black',
  },
  inputContainer: {
    // borderRadius: 20,s
    flexDirection: 'row',
    flex: 1,
    paddingEnd: 10,
    backgroundColor: `rgba(${Colors.primary}, 0.3)`,
    // borderRadius: 140,
  },
  input: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
    fontWeight: 'normal',
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 15,
  },
  icon: {
    alignSelf: 'center',
  },
  erroMessage: {
    color: invalidColor,
    fontFamily: 'Lato-Regular',
    marginTop: 5,
    marginStart: 5,
  },
});
