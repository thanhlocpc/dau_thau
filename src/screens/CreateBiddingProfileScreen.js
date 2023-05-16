import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  StatusBar,
  ActivityIndicator,
  Text,
  RefreshControl,
  TextInput, Dimensions, TouchableWithoutFeedback, Keyboard,
  useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/icons/LightIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect, useDispatch } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'


import ProductItem from '../components/shop/ProductItem';
import { Colors } from '../constants/Colors';


const primaryColor = `rgb(${Colors.primary})`;
const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;
const CartIcons = () => <Icon name="cart-o" color="white" size={16} />;
import CartIcon from '../components/shop/CartIconComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';
import { GET_CART } from '../redux/cart/constants';
import { GET_FAVORITE_PRODUCTS } from '../redux/favorite-product/constants';
import { LOGOUT } from '../redux/auth/constants';

const textPrimaryColor = `rgb(${Colors.text.primary})`;
// const width = Dimensions.get('window').width

import SelectDropdown from 'react-native-select-dropdown'
import CreateBiddingProfileForm from '../components/shop/CreateBiddingProfileForm';
const countries = ["Egypt", "Canada", "Australia", "Ireland"]

const CreateBiddingProfileScreen = ({ navigation, auth }) => {

  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowSearch, setShowSearch] = useState(false);
  const [data, setData] = useState([1, 2, 3])
  const [search, setSearch] = useState('')
  const widthScreen = useWindowDimensions().width
  const [width, setWidth] = useState(widthScreen)


  const onSearch = () => {
  }

  const loadData = async () => {
    setLoading(true);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    setWidth(widthScreen)
    return () => {
    }
  }, [widthScreen]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ ...styles.header, }}>
          <Text style={styles.titleHeader}>Tạo hồ sơ</Text>
        </View>

        <ScrollView>
        <View style={{ padding: 10 }}>
          <CreateBiddingProfileForm onSubmit={() => { }} submitButtonTitle="Tạo hồ sơ" />
        </View>
        </ScrollView>
      


      </View>

    </SafeAreaView>

  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(CreateBiddingProfileScreen);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: StatusBar.length,
    height: '100%'
  },
  header: {
    marginHorizontal: 22,
    marginTop: 20,
    marginVertical: 5,
    // borderLeftWidth: 0,
    paddingLeft: 10,
    // borderLeftColor: primaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  inputSearch: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingVertical: 0,
    paddingTop: 5,
    color: 'black',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 100,
  },
  errorMessage: {
    fontFamily: 'Lato-Bold',
    color: textSecondaryColor,
    fontSize: 16,
    marginTop: 10,
  },
  list: {
    // backgroundColor:'red',


    // // alignItems: 'center',
    // alignSelf:'center',
    // alignContent:'space-around',
    // justifyContent:"space-around",


  },
});
