import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { Colors } from '../../constants/Colors';
import ErrorModal from './ErrorModal';
import FormSubmitButton from './FormSubmitButton';
import LabledInput from './LabledInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
const primaryColor = `rgb(${Colors.primary})`;
const labelDefaultColor = `rgb(${Colors.text.secondary})`;



const emailValidator = text => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!regex.test(String(text).toLocaleLowerCase())) {
    return { isValid: false, error: 'Vui lòng nhập email hợp lệ' };
  }
  return { isValid: true };
};
const passValidator = text => {
  if (text.length < 6) {
    return {
      isValid: false,
      error: 'Mật khẩu phải lớn hơn 6 kí tự',
    };
  }
  return { isValid: true };
};
const phoneValidator = text => {
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  if (!regex.test(String(text).toLocaleLowerCase())) {
    return { isValid: false, error: 'Vui lòng nhập số điện thoại hợp lệ' };
  }
  return { isValid: true };
};

const nameValidator = text => {
  const regex = /^[a-z ,.'-]+$/i

  if (!regex.test(String(text).toLocaleLowerCase())) {
    return { isValid: false, error: 'Vui lòng nhập tên hợp lệ' };
  }
  return { isValid: true };
};

const AuthForm = (props) => {
  const { buttonTitle, onSubmit, auth, isLogin } = props

  const [email, setEmail] = useState("")
  const [passowrd, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhone] = useState("")



  const [emailIsValid, setEmailIsValid] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false)
  const [firserNameIsValid, setFirstNameIsValid] = useState(false)
  const [lastNameIsValid, setLastNameIsValid] = useState(false)
  const [addressIsValid, setAddressIsValid] = useState(false)
  const [phoneIsValid, setPhoneIsValid] = useState(false)




  const [alert, setAlert] = useState(false);
  const [actionDisabled, setActionDisabled] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);

  const toggleAlert = () => {
    setAlert(value => !value);
  };

  const formSubmitHandler = () => {
    if (isLogin)
      onSubmit(email, passowrd)
    else
      onSubmit(email, firstName, lastName, address, phoneNumber, passowrd )
  };

  useEffect(() => {
    if (triggerValidation) {
      setTriggerValidation(false);
    }
  }, [triggerValidation]);

  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', color: 'red' }}>{auth.login_error}</Text>
      </View>
      <LabledInput
        required
        placeholder="Email"
        Icon={({ color }) => (
          <MaterialCommunityIcons name="email" size={20} color={primaryColor} />
        )}
        borderRadius={140}
        autoCapitalize="none"
        value={email}
        isValid={emailIsValid}
        validators={[emailValidator]}
        triggerValidation={triggerValidation}
        // error={state.email.error}
        onChangeText={text => setEmail(text)}
        setIsValid={setEmailIsValid}
      />
      {isLogin ? null :
        <>
          <LabledInput
            required
            placeholder="Tên"
            Icon={({ color }) => (
              <FontAwesome name="user" size={22} color={primaryColor} />
            )}
            borderRadius={140}
            autoCapitalize="none"
            value={firstName}
            isValid={firserNameIsValid}
            validators={[nameValidator]}
            triggerValidation={triggerValidation}
            // error={state.email.error}
            onChangeText={text => setFirstName(text)}
            setIsValid={setFirstNameIsValid}
          />

          <LabledInput
            required
            placeholder="Họ"
            Icon={({ color }) => (
              <FontAwesome name="user" size={22} color={primaryColor} />
            )}
            borderRadius={140}
            autoCapitalize="none"
            value={lastName}
            isValid={lastNameIsValid}
            validators={[nameValidator]}
            triggerValidation={triggerValidation}
            // error={state.email.error}
            onChangeText={text => setLastName(text)}
            setIsValid={setLastNameIsValid}
          />

          <LabledInput
            required
            placeholder="Địa chỉ"
            Icon={({ color }) => (
              <FontAwesome name="location-arrow" size={22} color={primaryColor} />
            )}
            borderRadius={140}
            autoCapitalize="none"
            value={address}
            isValid={addressIsValid}
            validators={[nameValidator]}
            triggerValidation={triggerValidation}
            // error={state.email.error}
            onChangeText={text => setAddress(text)}
            setIsValid={setAddressIsValid}
          />

          {/* <LabledInput
            required
            placeholder="Mã số thuế"
            Icon={({ color }) => (
              <FontAwesome name="tags" size={22} color={primaryColor} />
            )}
            borderRadius={140}
            autoCapitalize="none"
            value={name}
            isValid={nameIsValid}
            validators={[nameValidator]}
            triggerValidation={triggerValidation}
            // error={state.email.error}
            onChangeText={text => setName(text)}
            setIsValid={setNameIsValid}
          /> */}

          <LabledInput
            required
            placeholder="Số điện thoại"
            Icon={({ color }) => (
              <FontAwesome name="phone" size={22} color={primaryColor} />
            )}
            borderRadius={140}
            autoCapitalize="none"
            value={phoneNumber}
            isValid={phoneIsValid}
            validators={[phoneValidator]}
            triggerValidation={triggerValidation}
            // error={state.email.error}
            onChangeText={text => setPhone(text)}
            setIsValid={setPhoneIsValid}
          />
        </>
      }

      <LabledInput
        required
        secure
        placeholder="Mật khẩu"
        Icon={({ color }) => (
          <FontAwesome name="lock" size={22} color={primaryColor} />
        )}
        borderRadius={140}
        autoCapitalize="none"
        value={passowrd}
        isValid={passwordIsValid}
        validators={[passValidator]}
        triggerValidation={triggerValidation}
        // error={state.password.error}
        setIsValid={setPasswordIsValid}
        onChangeText={text => setPassword(text)}
      />

      <FormSubmitButton
        disabled={actionDisabled}
        title={buttonTitle}
        isSubmitting={auth.isLoading}
        submitHandler={formSubmitHandler}
      />
      {/* <ErrorModal
        isVisible={alert}
        title="Oops"
        message="Please check your internet connection"
        buttonTitle="Try Again"
        onCancel={() => toggleAlert()}
        Icon={() => (
          <Icon
            name="wifi-off"
            size={32}
            color={`rgba(${Colors.primary}, 0.7)`}
          />
        )}
      /> */}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AuthForm);

const styles = StyleSheet.create({});
