import React, { useReducer, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import { Colors } from '../../constants/Colors';
import LabledInput from './LabledInput';
import {
  SET_TITLE,
  SET_IMAGE,
  SET_PRICE,
  SET_DESCRIPTION,
  SET_TITLE_VALIDATION,
  SET_IMAGE_VALIDATION,
  SET_PRICE_VALIDATION,
  SET_DESCRIPTION_VALIDATION,
} from './inputTypes';
import ErrorModal from './ErrorModal';
import FormSubmitButton from './FormSubmitButton';
const priceValidator = text => {
  if (isNaN(text) || parseFloat(text) < 0) {
    return { isValid: false, error: 'Please enter a valid positive price' };
  }
  return { isValid: true };
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_TITLE: {
      return { ...state, title: { ...state.title, value: payload } };
    }
    case SET_IMAGE: {
      return { ...state, imageUrl: { ...state.imageUrl, value: payload } };
    }
    case SET_PRICE: {
      return { ...state, price: { ...state.price, value: payload } };
    }
    case SET_DESCRIPTION: {
      return { ...state, description: { ...state.description, value: payload } };
    }
    case SET_TITLE_VALIDATION: {
      return { ...state, title: { ...state.title, isValid: payload } };
    }
    case SET_IMAGE_VALIDATION: {
      return { ...state, imageUrl: { ...state.imageUrl, isValid: payload } };
    }
    case SET_PRICE_VALIDATION: {
      return { ...state, price: { ...state.price, isValid: payload } };
    }
    case SET_DESCRIPTION_VALIDATION: {
      return { ...state, description: { ...state.description, isValid: payload } };
    }

    default:
      return state;
  }
};

const CreateBiddingProfileForm = ({ submitButtonTitle, product, onSubmit }) => {
  const initialFormState = {
    title: { value: product?.title, isValid: product ? true : false },
    imageUrl: { value: product?.imageUrl, isValid: product ? true : false },
    price: { value: product?.price, isValid: product ? true : false },
    description: { value: product?.description, isValid: product ? true : false },
  };

  const [{ title, imageUrl, price, description }, dispatch] = useReducer(
    reducer,
    initialFormState,
  );
  const [formIsValid, setFormIsValid] = useState(false);
  const [actionDisabled, setActionDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    if (
      title.value &&
      imageUrl.value &&
      price.value &&
      description.value &&
      title.isValid &&
      imageUrl.isValid &&
      price.isValid &&
      description.isValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    title.value,
    imageUrl.value,
    price.value,
    description.value,
    title.isValid,
    imageUrl.isValid,
    price.isValid,
    description.isValid,
    formIsValid,
  ]);

  const prodData = product
    ? {
      id: product.id,
      ownerId: product.ownerId,
      title: title.value,
      imageUrl: imageUrl.value,
      description: description.value,
      price: product.price,
    }
    : {
      ownerId: "userId",
      title: title.value,
      imageUrl: imageUrl.value,
      description: description.value,
      price: parseFloat(price.value),
    };

  const formSubmitHandler = async () => {
    if (formIsValid) {
      setIsSubmitting(true);
      setActionDisabled(true);

      try {
        await onSubmit(prodData);
        navigation.goBack();
      } catch (err) {
        if (!err.response) {
          toggleAlert();
        }
        setActionDisabled(false);
      }

      setIsSubmitting(false);
    }

  };

  const toggleAlert = () => {
    setAlert(value => !value);
  };

  return (
    <View style={styles.form}>
      <LabledInput
        borderRadius={5}
        placeholder="Tên đấu thầu"
        required
        autoCapitalize="sentences"
        value={title.value}
        label="Tên đấu thầu"
        onChangeText={newTxt => dispatch({ type: SET_TITLE, payload: newTxt })}
        isValid={title.isValid}
        setIsValid={val => dispatch({ type: SET_TITLE_VALIDATION, payload: val })}
      />
      <LabledInput
        placeholder="Mô tả"
        required
        multiline
        large
        autoCapitalize="sentences"
        value={description.value}
        borderRadius={5}
        label="Mô tả"
        onChangeText={newTxt =>
          dispatch({ type: SET_DESCRIPTION, payload: newTxt })
        }
        isValid={description.isValid}
        setIsValid={val =>
          dispatch({ type: SET_DESCRIPTION_VALIDATION, payload: val })
        }
      />
      <LabledInput
        placeholder="Mô tả"
        required
        multiline
        large
        autoCapitalize="sentences"
        value={description.value}
        borderRadius={5}
        label="Mô tả"
        onChangeText={newTxt =>
          dispatch({ type: SET_DESCRIPTION, payload: newTxt })
        }
        isValid={description.isValid}
        setIsValid={val =>
          dispatch({ type: SET_DESCRIPTION_VALIDATION, payload: val })
        }
      />


      <LabledInput
        placeholder="Mô tả"
        required
        multiline
        large
        autoCapitalize="sentences"
        value={description.value}
        borderRadius={5}
        label="Mô tả"
        onChangeText={newTxt =>
          dispatch({ type: SET_DESCRIPTION, payload: newTxt })
        }
        isValid={description.isValid}
        setIsValid={val =>
          dispatch({ type: SET_DESCRIPTION_VALIDATION, payload: val })
        }
      />

      <LabledInput
        dropdown={true}
        borderRadius={5}
        placeholder="Loại hình"
        required
        value={price.value?.toString()}
        label="Loại hình"
        keyboardType="numeric"
        onChangeText={
          product?.price
            ? null
            : newTxt => dispatch({ type: SET_PRICE, payload: newTxt })
        }
        validators={[priceValidator]}
        isValid={price.isValid}
        setIsValid={val => dispatch({ type: SET_PRICE_VALIDATION, payload: val })}
      />
       <LabledInput
        dropdown={true}
        borderRadius={5}
        placeholder="Trạng thái"
        required
        value={price.value?.toString()}
        label="Trạng thái"
        onChangeText={
          product?.price
            ? null
            : newTxt => dispatch({ type: SET_PRICE, payload: newTxt })
        }
      
      />

      <LabledInput
        borderRadius={5}
        placeholder="Giá khởi điểm"
        required
        value={price.value?.toString()}
        label="Giá"
        keyboardType="numeric"
        onChangeText={
          product?.price
            ? null
            : newTxt => dispatch({ type: SET_PRICE, payload: newTxt })
        }
        validators={[priceValidator]}
        isValid={price.isValid}
        setIsValid={val => dispatch({ type: SET_PRICE_VALIDATION, payload: val })}
      />

      <FormSubmitButton
        // shallowAppearance={!formIsValid}
        disabled={!formIsValid || actionDisabled}
        title={submitButtonTitle}
        isSubmitting={isSubmitting}
        submitHandler={formSubmitHandler}
      />
    </View>
  );
};

export default CreateBiddingProfileForm;

const styles = StyleSheet.create({
  form: {
    paddingTop: 10,
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    height: 18,
    textAlignVertical: 'center',
    // backgroundColor: `rgb(${Colors.background})`,
    alignSelf: 'flex-start',
    // marginStart: 20,
    // position: 'absolute',
    // top: -23,
    paddingHorizontal: 0,
    color: 'black',
  },
});
