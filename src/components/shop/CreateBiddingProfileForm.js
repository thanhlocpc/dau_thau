import React, { useReducer, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker'

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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { baseUrl } from '../../uitls/domain';
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

  const [fileFile, setFileFile] = useState([])
  const [fileImage, setFileImage] = useState([])
  const [text, setText] = useState("fdf")

  const pickFile = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    console.log(res);
    setFileFile(res)
  }
  const pickImage = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    console.log(res);
    setFileImage(res)
  }

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

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZUBnbWFpbC5jb20iLCJpYXQiOjE2ODU4OTI3MzksImV4cCI6MTY4NzEwMjMzOX0.LV0AubXroJgDPncTHuCznGIF9hYblM4sohrlxHmdt1E9yhMO9fiVYJFqn6LtAhaPU5S28t-6qAjvbtr7xC9kAg");
    myHeaders.append("Content-Type", "multipart/form-data")
    var formdata = new FormData();
    formdata.append("documents", fileFile[0]);
    formdata.append("images", fileImage[0]);
    formdata.append("type", "1");

    console.log(formdata);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    setText("")
    fetch("http://14.225.211.87:8080/api/files", requestOptions)
      .then(response => response.text())
      .then(result => { setText(result); console.log(result) })
      .catch(error => console.log('error', error));
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZUBnbWFpbC5jb20iLCJpYXQiOjE2ODU4OTI3MzksImV4cCI6MTY4NzEwMjMzOX0.LV0AubXroJgDPncTHuCznGIF9hYblM4sohrlxHmdt1E9yhMO9fiVYJFqn6LtAhaPU5S28t-6qAjvbtr7xC9kAg");
    // const data = new FormData();
    // // data.append('documents', fileFile);
    // // data.append('images', fileFile);
    // data.append('type', 1);


    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: data,
    //   redirect: 'follow'
    // };
    // await fetch(`${baseUrl}/files`, requestOptions).then(res => {
    //   console.log(res);

    //   console.log(res.json());
    //   return res.json()
    // })
    //   .catch(e => console.log(e))
    //   .finally(() => setLoading(false))
    // if (formIsValid) {
    //   setIsSubmitting(true);
    //   setActionDisabled(true);

    //   try {
    //     await onSubmit(prodData);
    //     navigation.goBack();
    //   } catch (err) {
    //     if (!err.response) {
    //       toggleAlert();
    //     }
    //     setActionDisabled(false);
    //   }

    //   setIsSubmitting(false);
    // }

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

      <TouchableOpacity onPress={pickFile} style={{ borderRadius:5, borderColor: `rgb(${Colors.primary})`, borderWidth: 1, height: 50, marginTop: 10, paddingLeft: 5, justifyContent: 'center' }}>
        <Text style={{ color: `rgb(${Colors.text.primary})` }}>Chọn tệp {fileFile[0]?.name} {fileFile[0]?.uri}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage} style={{  borderRadius:5, borderColor: `rgb(${Colors.primary})`, borderWidth: 1, height: 50, marginTop: 10, paddingLeft: 5, justifyContent: 'center' }}>
        <Text style={{ color: `rgb(${Colors.text.primary})` }}>Chọn hình ảnh {fileImage[0]?.name} {fileImage[0]?.uri}</Text>
      </TouchableOpacity>
      <Text style={{ color: `rgb(${Colors.text.primary})` }}>{text}</Text>

      <FormSubmitButton
        // shallowAppearance={!formIsValid}
        // disabled={!formIsValid || actionDisabled}
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
