import React, { useEffect, useReducer, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
  Alert,
} from 'react-native';
import { Colors } from '../constants/Colors';
import LeftIcon from '../components/icons/LeftIcon';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import { connect, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack } from '../uitls/naviation'
import { formatDateFull } from '../uitls/dateUtils';
import { SET_PRICE, SET_PRICE_VALIDATION, SET_TITLE, SET_TITLE_VALIDATION } from '../components/shop/inputTypes';
import DocumentPicker from 'react-native-document-picker'
import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LabledInput from '../components/shop/LabledInput';
import FormSubmitButton from '../components/shop/FormSubmitButton';
import Web3 from 'web3';
import { joinTenderContract } from '../redux/contracts/services';
import Global from '../uitls/Global';

const snapValue = 24;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_TITLE: {
      return { ...state, title: { ...state.title, value: payload } };
    }
    case SET_PRICE: {
      return { ...state, minimumAmount: { ...state.minimumAmount, value: payload } };
    }
    case SET_PRICE_VALIDATION: {
      return { ...state, minimumAmount: { ...state.minimumAmount, isValid: payload } };
    }
    case SET_TITLE_VALIDATION: {
      return { ...state, title: { ...state.title, isValid: payload } };
    }
    default:
      return state;
  }
};


const JoinTenderContractsScreen = (props) => {
  const [web3] = useState(new Web3())
  const [provider] = useState(new Web3.providers.HttpProvider("https://hhanime.live"))
  web3.setProvider(provider)
  const connector = useWalletConnect();

  const initialFormState = {
    title: { value: product?.title, isValid: product ? true : false },
    minimumAmount: { value: product?.price, isValid: product ? true : false },
    files: [],
    hash: ""
  };

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

  const [{ title, minimumAmount, files, hash }, dispatch] = useReducer(
    reducer,
    initialFormState,
  );


  const priceValidator = text => {
    if (isNaN(text) || parseFloat(text) < 0) {
      return { isValid: false, error: 'Please enter a valid positive price' };
    }
    return { isValid: true };
  };

  const [fileFile, setFileFile] = useState([])
  const [fileImage, setFileImage] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const { route } = props
  const { product } = route.params

  console.log(product);

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
      let files = []
      await fetch("http://14.225.211.87:8080/api/files", requestOptions)
        .then(response => response.json())
        .then(result => {
          files = result?.data;
        })
        .catch(error => console.log('error', error));


      // if upload ok then payment
      if (!files) {
        Alert.alert("File không hợp lệ")
        return;
      }
      const hash = await transaction()
      console.log(hash);

      if (hash) {
        // create contract

        console.log(title);
        const obj = {
          tenderContractId: product?.id,
          bids: {
            description: title.value,
            status: -1,
            proposedPrice: minimumAmount.value,
            files: files,
            txHashCreate: hash
          },
        }

        console.log(obj);

        const d = await joinTenderContract(obj)
        Alert.alert("Tạo thành công")
        setIsSubmitting(false)
        console.log(d);
      } else {
        Alert.alert("Lỗi giao dịch")
      }
    } catch (e) {

    }
  }

  const transaction = async () => {
    try {
      console.log("connected", connector.connected);

      return await connector.sendTransaction({
        from: connector.accounts[0],
        gas: 21000, // add gas to the transaction
        to: "0xFF063e948230c81D77bCa270aa2d99286e142721",
        value: web3.utils.toWei("0.01", "ether"),

      }).then((result) => {
        return result
      })
        .catch((error) => {
          console.error(error);
          return false
        });
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        {/* <Text style={styles.titleHeader}></Text> */}
      </View>
      <View style={styles.containerFull}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => goBack()}
          >
            <LeftIcon
              height={42}
              width={42}
              weight={1.3}
              color={textPrimaryColor}
            />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Tham gia đấu thầu</Text>

        </View>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.screen}>


              <LabledInput
                placeholder="Mô tả"
                required
                multiline
                large
                autoCapitalize="sentences"
                value={title.value}
                borderRadius={5}
                label="Mô tả"
                onChangeText={newTxt =>
                  dispatch({ type: SET_TITLE, payload: newTxt })
                }
                isValid={title.isValid}
                setIsValid={val =>
                  dispatch({ type: SET_TITLE_VALIDATION, payload: val })
                }
              />

              <LabledInput
                borderRadius={5}
                placeholder="Giá"
                required
                value={minimumAmount.value?.toString()}
                label="Giá"
                keyboardType="numeric"
                onChangeText={
                  newTxt => dispatch({ type: SET_PRICE, payload: newTxt })
                }
                validators={[priceValidator]}
                isValid={minimumAmount.isValid}
                setIsValid={val => dispatch({ type: SET_PRICE_VALIDATION, payload: val })}
              />


              <TouchableOpacity onPress={pickFile} style={{ borderRadius: 5, borderColor: `rgb(${Colors.primary})`, borderWidth: 1, height: 50, marginTop: 10, paddingLeft: 5, justifyContent: 'center' }}>
                <Text style={{ color: `rgb(${Colors.text.primary})` }}>Chọn tệp {fileFile[0]?.name}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={pickImage} style={{ borderRadius: 5, borderColor: `rgb(${Colors.primary})`, borderWidth: 1, height: 50, marginTop: 10, paddingLeft: 5, justifyContent: 'center' }}>
                <Text style={{ color: `rgb(${Colors.text.primary})` }}>Chọn hình ảnh {fileImage[0]?.name}</Text>
              </TouchableOpacity>

              <FormSubmitButton
                // shallowAppearance={!formIsValid}
                // disabled={!formIsValid || actionDisabled}
                title={"Tham gia"}
                isSubmitting={isSubmitting}
                submitHandler={formSubmitHandler}
              />

            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView >
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default withWalletConnect(connect(mapStateToProps)(JoinTenderContractsScreen), {
  redirectUrl:
    Platform.OS === "web" ? window.location.origin : "https://hhanime.live",
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});



const styles = StyleSheet.create({
  header: {
    marginHorizontal: 22,
    marginTop: 0,
    marginVertical: 10,
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10
  },
  containerFull: {
    flex: 1
  },
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  rightIcon: {
    marginRight: 30,
  },
  leftIcon: {
    marginLeft: 20,
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginLeft: 10
  },
  container: {
    backgroundColor: `rgb(${Colors.background})`,
    marginTop: 15,
    flex: 1,
  },
  screen: {
    paddingHorizontal: 15
  }
});