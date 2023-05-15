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


const ProductsScreen = ({ navigation, auth }) => {

  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowSearch, setShowSearch] = useState(false);
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const widthScreen = useWindowDimensions().width
  const [width, setWidth] = useState(widthScreen)


  const favoritesLoaded = useRef(false);
  const [limit, setLimit] = useState(100)

  const onSearch = () => {
    setLoading(true)
    firestore()
      .collection('products')
      .get()
      .then(res => {
        const temp = []
        res.forEach(doc => {
          if (doc.data().title.toUpperCase().indexOf(search.toUpperCase()) > -1) temp.push(doc.data())
        })
        setData(temp)
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        setData([])
      })
  }

  const loadData = async () => {
    setLoading(true);
    firestore()
      .collection('products')
      .limit(limit)
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        const temp = []
        for (const doc of querySnapshot._docs) {
          if (doc._data.available == 'true') temp.push(doc._data)
        }
        setData(temp)
        setLoading(false)
      })
      .catch(e => {
        setData([])
        setLoading(false)
      });
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

  if (false) {
    return (
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={() => { setShowSearch(false) }} accessible={false}>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={{ ...styles.header, }}>
              {isShowSearch ?
                <TextInput autoFocus={true} style={{ ...styles.inputSearch, width: width - 22 * 2 - 26 - 50, }} placeholder='Tìm kiếm' value={search} onChangeText={text => setSearch(text)} onSubmitEditing={onSearch} />
                : <Text style={styles.titleHeader}>Marketplace</Text>}
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                {isShowSearch ?
                  null
                  : <TouchableOpacity onPress={onPressIconSearch} style={{ marginRight: 10 }}>
                    <FontAwesome name="search" color="black" size={26} />
                  </TouchableOpacity>}

                <CartIcon
                  navigation={navigation}
                  color={textPrimaryColor}
                  style={styles.cart}
                />
              </View>
            </View>
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={primaryColor} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }

  const onPressIconSearch = () => {
    setShowSearch(true)
  }

  // if (data.length == 0) {
  //   console.log("fdfd");
  //   return (
  //     <SafeAreaView>
  //       <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss; setShowSearch(false) }} accessible={false}>
  //         <View style={styles.container}>
  //           <StatusBar barStyle="dark-content" />
  //           <View style={{ ...styles.header, }}>
  //             {isShowSearch ?
  //               <TextInput  returnKeyType='search' autoFocus={true} style={{...styles.inputSearch,width: width - 22 * 2 - 26 - 50,}} placeholder='Tìm kiếm' placeholderTextColor='gray' value={search} onChangeText={text => setSearch(text)} onSubmitEditing={onSearch} />
  //               : <Text style={styles.titleHeader}>Marketplace</Text>}
  //             <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

  //               {isShowSearch ?
  //                 null
  //                 : <TouchableOpacity onPress={onPressIconSearch} style={{ marginRight: 10 }}>
  //                   <FontAwesome name="search" color="black" size={26} />
  //                 </TouchableOpacity>}

  //               <CartIcon
  //                 navigation={navigation}
  //                 color={textPrimaryColor}
  //                 style={styles.cart}
  //               />
  //             </View>
  //           </View>
  //           <View style={styles.centered}>
  //             <MaterialCommunityIcons
  //               name="emoticon-sad-outline"
  //               size={26}
  //               color={`rgba(${Colors.text.secondary}, 0.6)`}
  //             />
  //             <Text style={styles.errorMessage}>Không có sản phẩm</Text>
  //             <TouchableOpacity style={{ width: 60, marginTop: 15 }} onPress={loadData}>
  //               <Text style={{ color: `rgba(${Colors.text.secondary}, 0.6)`, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Tải lại</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </TouchableWithoutFeedback>

  //     </SafeAreaView>
  //   );
  // }



  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss; setShowSearch(false) }} accessible={false}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={{ ...styles.header, }}>
            {isShowSearch ?
              <TextInput returnKeyType='search' autoFocus={true} style={{ ...styles.inputSearch, width: width - 22 * 2 - 26 - 50, }} placeholder='Tìm kiếm' placeholderTextColor='gray' value={search} onChangeText={text => setSearch(text)} onSubmitEditing={onSearch} />
              : <Text style={styles.titleHeader}>Danh sách đấu thầu</Text>}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

              {isShowSearch ?
                null
                : <TouchableOpacity onPress={onPressIconSearch} style={{ marginRight: 10 }}>
                  <FontAwesome name="search" color="black" size={26} />
                </TouchableOpacity>}

              {/* <CartIcon
                navigation={navigation}
                color={textPrimaryColor}
                style={styles.cart}
              /> */}
            </View>
          </View>
          <ProductItem
            product={undefined}
            navigationRoute="ProductDetail"
            ActionIcon={CartIcons}
            actionTitle="Thêm vào giỏ hàng"
          />


          {/* <FlatList
            numColumns={2}
            // centerContent = {true}
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
            refreshControl={refreshControl()}
            data={data}
            contentContainerStyle={styles.list}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          /> */}
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
