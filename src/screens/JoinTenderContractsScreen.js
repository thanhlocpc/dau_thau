import React, { } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
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
import { withWalletConnect } from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const snapValue = 24;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_TITLE: {
      return { ...state, title: { ...state.title, value: payload } };
    }
    case SET_PRICE: {
      return { ...state, minimumAmount: { ...state.minimumAmount, value: payload } };
    }
    case SET_FILES: {
      return { ...state, files: payload };
    }
    case SET_PRICE_VALIDATION: {
      return { ...state, minimumAmount: { ...state.minimumAmount, isValid: payload } };
    }
    default:
      return state;
  }
};
const JoinTenderContractsScreen = (props) => {


  const initialFormState = {
    title: { value: product?.title, isValid: product ? true : false },
    minimumAmount: { value: product?.price, isValid: product ? true : false },
    files: [],
    hash: ""
  };

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



  const formSubmitHandler = async () => {
    try {
      setIsSubmitting(true)
    } catch (e) {

    }
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


              <TouchableOpacity onPress={pickFile} style={{ borderRadius: 5, borderColor: `rgb(${Colors.primary})`, borderWidth: 1, height: 50, marginTop: 10, paddingLeft: 5, justifyContent: 'center' }}>
                <Text style={{ color: `rgb(${Colors.text.primary})` }}>Chọn tệp {fileFile[0]?.name}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={pickImage} style={{ borderRadius: 5, borderColor: `rgb(${Colors.primary})`, borderWidth: 1, height: 50, marginTop: 10, paddingLeft: 5, justifyContent: 'center' }}>
                <Text style={{ color: `rgb(${Colors.text.primary})` }}>Chọn hình ảnh {fileImage[0]?.name}</Text>
              </TouchableOpacity>

              <FormSubmitButton
                // shallowAppearance={!formIsValid}
                // disabled={!formIsValid || actionDisabled}
                title={""}
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
    marginVertical: 10
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
  infoContainer: {
    borderTopWidth: 5,
    borderTopColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  item: {
    flexDirection: 'row',
    paddingBottom: 10,
    // marginTop: margin.small
  },
  titleDebtInfo: {
    marginLeft: 8,
    fontSize: 18,
    color: '#686868'
  },

  text: {
    fontSize: 15,
    color: 'black'
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  rightCollectMoneyInfo: {
    flex: 1,
    alignItems: 'flex-end'
  },
});