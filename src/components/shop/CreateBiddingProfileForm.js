import React, { useReducer, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker'
import {
  useWalletConnect,
  withWalletConnect,
} from "@walletconnect/react-native-dapp";
import DatePicker from 'react-native-date-picker'
import Web3 from 'web3';
import { Colors } from '../../constants/Colors';
import LabledInput from './LabledInput';
import {
  SET_TITLE,
  SET_IMAGE,
  SET_PRICE,
  SET_DESCRIPTION,
  SET_TECHNICAL_INFO,
  SET_REQUIREMENTS,
  SET_TITLE_VALIDATION,
  SET_IMAGE_VALIDATION,
  SET_PRICE_VALIDATION,
  SET_DESCRIPTION_VALIDATION,
  SET_TECHNICAL_INFO_VALIDATION,
  SET_REQUIREMENTS_VALIDATION,
  SET_FILES,
  SET_CATEGORY,
  SET_START_DATE,
  SET_END_DATE
} from './inputTypes';
import ErrorModal from './ErrorModal';
import FormSubmitButton from './FormSubmitButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { baseUrl } from '../../uitls/domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertTenderContract } from '../../redux/contracts/services';
import { formatDateFull } from '../../uitls/dateUtils';
import Global from '../../uitls/Global';
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
    case SET_TECHNICAL_INFO: {
      return { ...state, technicalInfo: { ...state.technicalInfo, value: payload } };
    }
    case SET_REQUIREMENTS: {
      return { ...state, requirements: { ...state.requirements, value: payload } };
    }
    case SET_PRICE: {
      return { ...state, minimumAmount: { ...state.minimumAmount, value: payload } };
    }
    case SET_DESCRIPTION: {
      return { ...state, description: { ...state.description, value: payload } };
    }
    case SET_FILES: {
      return { ...state, files: payload };
    }
    case SET_CATEGORY: {
      return { ...state, category: payload };
    }
    case SET_START_DATE: {
      return { ...state, startDateTime: payload };
    }
    case SET_END_DATE: {
      return { ...state, endDateTime: payload };
    }
    case SET_TITLE_VALIDATION: {
      return { ...state, title: { ...state.title, isValid: payload } };
    }
    case SET_TECHNICAL_INFO_VALIDATION: {
      return { ...state, technicalInfo: { ...state.technicalInfo, isValid: payload } };
    }
    case SET_REQUIREMENTS_VALIDATION: {
      return { ...state, requirements: { ...state.requirements, isValid: payload } };
    }
    case SET_PRICE_VALIDATION: {
      return { ...state, minimumAmount: { ...state.minimumAmount, isValid: payload } };
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
    minimumAmount: { value: product?.price, isValid: product ? true : false },
    description: { value: product?.description, isValid: product ? true : false },
    technicalInfo: { value: product?.technicalInfo, isValid: product ? true : false },
    requirements: { value: product?.requirements, isValid: product ? true : false },
    category: "",
    startDateTime: new Date(),
    endDateTime: new Date(),
    files: [],
    hash: ""
  };

  const [{ title, minimumAmount, description, technicalInfo, requirements, category, startDateTime, endDateTime, files, mhash }, dispatch] = useReducer(
    reducer,
    initialFormState,
  );
  const [formIsValid, setFormIsValid] = useState(false);
  const [actionDisabled, setActionDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(false);
  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)

  const navigation = useNavigation();

  // const [files, setFiles] = useState([])
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
  const [web3] = useState(new Web3())
  const [provider] = useState(new Web3.providers.HttpProvider("https://hhanime.live"))
  web3.setProvider(provider)
  const connector = useWalletConnect();
  useEffect(() => {
    load()
  }, [])

  const load = async()=>{
    if (connector) {
      console.log(connector);
      if (!connector.connected)
     await   connector.connect()
    }
  }


  useEffect(() => {
    if (
      title.value &&
      minimumAmount.value &&
      description.value &&
      technicalInfo.value &&
      requirements.value &&
      title.isValid &&
      minimumAmount.isValid &&
      description.isValid &&
      technicalInfo.isValid &&
      requirements.isValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    title.value,
    minimumAmount.value,
    description.value,
    technicalInfo.value,
    requirements.value,
    title.isValid,
    minimumAmount.isValid,
    description.isValid,
    technicalInfo.isValid,
    requirements.isValid,
  ]);



  
  const formSubmitHandler = async () => {
    try {
      setIsSubmitting(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${Global.getToken()}`);
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
      let filess = []
      await fetch("http://14.225.211.87:8080/api/files", requestOptions)
        .then(response => response.json())
        .then(result => {
          filess = result?.data;
          setText(JSON.stringify(result)); console.log(result)
        })
        .catch(error => console.log('error', error));


      if (!files) {
        Alert.alert("File không hợp lệ")
        return;
      }
      // if upload ok then payment
      const hash = await transaction()
      if (hash) {
        // create contract
        console.log(hash);

        console.log(title);
        const obj = {
          title: title.value,
          description: description.value,
          technicalInfo: technicalInfo.value,
          requirements: requirements.value,
          startDateTime: startDateTime,
          endDateTime: endDateTime,
          minimumAmount: minimumAmount.value,
          category: category,
          files: files,
          txHashCreate: hash
        }

        console.log(obj);

        const d = await insertTenderContract(obj)
        Alert.alert("Tạo thành công")
        console.log(d);
      } else {
        Alert.alert("Vui lòng thử lại")
      }

    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false)
  };

  const transaction = async () => {
    try {
      console.log("connected", connector.connected);
      if (!connector.connected) {
        await connector.connect()
        return await connector.sendTransaction({
          from: connector.accounts[0],
          gas: 21000, // add gas to the transaction
          to: "0xFF063e948230c81D77bCa270aa2d99286e142721",
          value: web3.utils.toWei("0.01", "ether"),
          // data: "0x",

        }).then((result) => {
          return result
        })
          .catch((error) => {
            console.error(error);
            return false
          });
      } else {
        return await connector.sendTransaction({
          from: connector.accounts[0],
          gas: 21000, // add gas to the transaction
          to: "0xFF063e948230c81D77bCa270aa2d99286e142721",
          value: web3.utils.toWei("0.01", "ether"),
          // data: "0x",

        }).then((result) => {
          return result
        })
          .catch((error) => {
            console.error(error);
            return false
          });
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }

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
        placeholder="Thống số kĩ thuật"
        required
        multiline
        large
        autoCapitalize="sentences"
        value={technicalInfo.value}
        borderRadius={5}
        label="Thông số kĩ thuật"
        onChangeText={newTxt =>
          dispatch({ type: SET_TECHNICAL_INFO, payload: newTxt })
        }
        isValid={technicalInfo.isValid}
        setIsValid={val =>
          dispatch({ type: SET_TECHNICAL_INFO_VALIDATION, payload: val })
        }
      />


      <LabledInput
        placeholder="Yêu cầu"
        required
        multiline
        large
        autoCapitalize="sentences"
        value={requirements.value}
        borderRadius={5}
        label="Yêu cầu"
        onChangeText={newTxt =>
          dispatch({ type: SET_REQUIREMENTS, payload: newTxt })
        }
        isValid={requirements.isValid}
        setIsValid={val =>
          dispatch({ type: SET_REQUIREMENTS_VALIDATION, payload: val })
        }
      />

      <LabledInput
        dropdown={true}
        borderRadius={5}
        placeholder="Loại hình"
        required
        // value={price.value?.toString()}
        label="Loại hình"
        onChangeText={newTxt => dispatch({ type: SET_CATEGORY, payload: newTxt })
        }
      />

      <LabledInput
        borderRadius={5}
        placeholder="Giá khởi điểm"
        required
        value={minimumAmount.value?.toString()}
        label="Giá"
        keyboardType="numeric"
        onChangeText={
          product?.minimumAmount
            ? null
            : newTxt => dispatch({ type: SET_PRICE, payload: newTxt })
        }
        validators={[priceValidator]}
        isValid={minimumAmount.isValid}
        setIsValid={val => dispatch({ type: SET_PRICE_VALIDATION, payload: val })}
      />
      <DatePicker
        modal
        open={openStart}
        date={startDateTime}
        onConfirm={(date) => {
          setOpenStart(false)
          dispatch({ type: SET_START_DATE, payload: date })
        }}
        onCancel={() => {
          setOpenStart(false)
        }}
      />

      <DatePicker
        modal
        open={openEnd}
        date={endDateTime}
        onConfirm={(date) => {
          setOpenEnd(false)
          dispatch({ type: SET_END_DATE, payload: date })
        }}
        onCancel={() => {
          setOpenEnd(false)
        }}
      />

      <TouchableOpacity onPress={() => setOpenStart(true)} style={{ borderRadius: 5, borderColor: `rgb(${Colors.primary})`, borderWidth: 1, height: 50, marginTop: 10, paddingLeft: 5, justifyContent: 'center' }}>
        <Text style={{ color: `rgb(${Colors.text.primary})` }}>Chọn thời gian bắt đầu {formatDateFull(startDateTime)}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setOpenEnd(true)} style={{ borderRadius: 5, borderColor: `rgb(${Colors.primary})`, borderWidth: 1, height: 50, marginTop: 10, paddingLeft: 5, justifyContent: 'center' }}>
        <Text style={{ color: `rgb(${Colors.text.primary})` }}>Chọn thời gian kết thúc {formatDateFull(endDateTime)}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickFile} style={{ borderRadius: 5, borderColor: `rgb(${Colors.primary})`, borderWidth: 1, height: 50, marginTop: 10, paddingLeft: 5, justifyContent: 'center' }}>
        <Text style={{ color: `rgb(${Colors.text.primary})` }}>Chọn tệp {fileFile[0]?.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage} style={{ borderRadius: 5, borderColor: `rgb(${Colors.primary})`, borderWidth: 1, height: 50, marginTop: 10, paddingLeft: 5, justifyContent: 'center' }}>
        <Text style={{ color: `rgb(${Colors.text.primary})` }}>Chọn hình ảnh {fileImage[0]?.name}</Text>
      </TouchableOpacity>

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

export default withWalletConnect(CreateBiddingProfileForm, {
  redirectUrl:
    Platform.OS === "web" ? window.location.origin : "https://hhanime.live",
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
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
