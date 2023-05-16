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
import { TouchableOpacity } from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';
import { GET_CART } from '../redux/cart/constants';
import { GET_FAVORITE_PRODUCTS } from '../redux/favorite-product/constants';
import { LOGOUT } from '../redux/auth/constants';

const textPrimaryColor = `rgb(${Colors.text.primary})`;
// const width = Dimensions.get('window').width

import SelectDropdown from 'react-native-select-dropdown'
const countries = ["Egypt", "Canada", "Australia", "Ireland"]

const ProductsScreen = ({ navigation, auth }) => {

  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowSearch, setShowSearch] = useState(false);
  const [data, setData] = useState([1,2,3])
  const [search, setSearch] = useState('')
  const widthScreen = useWindowDimensions().width
  const [width, setWidth] = useState(widthScreen)


  const favoritesLoaded = useRef(false);
  const [limit, setLimit] = useState(100)

  const onSearch = () => {
  }

  const loadData = async () => {
    setLoading(true);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    SplashScreen.hide();
    // dispatch({type:LOGOUT})
    loadData();
    dispatch({ type: GET_CART, payload: auth.user.id })
    dispatch({ type: GET_FAVORITE_PRODUCTS, payload: auth.user.id })
    setWidth(widthScreen)
    return () => {

    }
  }, [widthScreen]);

  const renderItem = useCallback(
    ({ item }) => (
      <ProductItem
        product={item}
        navigationRoute="ProductDetail"
        ActionIcon={CartIcons}
        actionTitle="Thêm vào giỏ hàng"
      // onActionPress={addToCart}
      // onActionPress={() => { }}
      />
    ),
    [],
  );

  const refreshControl = useCallback(() => {
    return (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={async () => {
          setIsRefreshing(true);
          setLimit(v => v + 100)
          await loadData();
          setIsRefreshing(false);
        }}
        tintColor={primaryColor}
        colors={[primaryColor]}
      />
    );
  }, []);



  const onPressIconSearch = () => {
    setShowSearch(true)
  }

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss; setShowSearch(false) }} accessible={false}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={{ ...styles.header, }}>
            {isShowSearch ?
              <TextInput returnKeyType='search' autoFocus={true} style={{ ...styles.inputSearch, width: width - 22 * 2 - 26 - 50, }} placeholder='Tìm kiếm' placeholderTextColor='gray' value={search} onChangeText={text => setSearch(text)} onSubmitEditing={onSearch} />
              : <Text style={styles.titleHeader}>Đấu thầu</Text>}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

              {isShowSearch ?
                null
                : <TouchableOpacity onPress={onPressIconSearch} style={{ marginRight: 10 }}>
                  <FontAwesome name="search" color="black" size={26} />
                </TouchableOpacity>}

            </View>

          </View>
          <View style={{ padding: 10, justifyContent:"flex-end", flexDirection:'row' }}>
            <SelectDropdown
              data={countries}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              defaultButtonText="Loại hình"
              buttonStyle={{height:30, width:"40%", backgroundColor: `rgb(${Colors.background2})`, borderRadius:5}}
              buttonTextStyle={{ textAlign: "left", width: "100%", fontSize:14, }}
              rowTextStyle={{textAlign:"left", fontSize:14}}
              rowStyle={{height:40}}

              dropdownIconPosition="right"
              renderDropdownIcon={() => <FontAwesome name='angle-down' size={20} />}

              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />
          </View>

          <FlatList
            numColumns={2}
            // centerContent = {true}
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
            refreshControl={refreshControl()}
            data={data}
            contentContainerStyle={styles.list}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableWithoutFeedback>

    </SafeAreaView>

  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(ProductsScreen);

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
