import React, { useContext, useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, StatusBar, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import ActionComponent from '../components/shop/ActionComponent';
import CartItem from '../components/shop/CartItem';
import { Colors } from '../constants/Colors';
import ErrorModal from '../components/shop/ErrorModal';
import { useSharedValue } from 'react-native-reanimated';
import Icon from '../components/icons/LightIcons';
import { connect, useDispatch } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GET_CART } from '../redux/cart/constants';
import { createOrder } from '../redux/order/action';
import { showMessage } from 'react-native-flash-message';
const primaryColor = `rgb(${Colors.primary})`;


const planeIcon = () => <Icon name="plane-o" color="white" size={20} />;

const CartScreen = (props) => {
  const { auth, navigation, cart } = props
  const [alert, setAlert] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()

  const toggleAlert = () => {
    setAlert(value => !value);
  };

  const handleOrderPress = () => {
    if (auth.user.name && auth.user.phone && auth.user.address) {
      const data = {
        items: cart.cart,
        totalAmount: cart.totalAmount,
        user:{
          name:auth.user.name,
          phone:auth.user.phone,
          address:auth.user.address
        }
      }
      dispatch(createOrder(auth.user.id, data))
      return;
    }
    showMessage({
      message: 'Vui lòng cập nhật thông tin cá nhân trước khi đặt hàng',
      type: 'warning',
      position: { top: StatusBar.currentHeight, left: 0 },
      duration:2000
    })
   

  }


  const scrollHeight = useRef(data.length * 115);
  const deletedIndex = useSharedValue(0);

  useEffect(() => {
    if (cart.cart.length == 0) dispatch({ type: GET_CART, payload: auth.user.id })
    if (!(auth.user.name && auth.user.phone && auth.user.address)) {
      showMessage({
        message: 'Vui lòng cập nhật thông tin cá nhân trước khi đặt hàng',
        type: 'warning',
        position: { top: StatusBar.currentHeight, left: 0 },
      })
    }
  }, []);

  if (cart.isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    )

  if (cart.cart.length == 0)
    return (
      <View style={styles.centered}>
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          size={26}
          color={`rgba(${Colors.text.secondary}, 0.6)`}
        />
        <Text style={styles.errorMessage}>Giỏ hàng của bạn đang trống</Text>
        <ActionComponent
          withSpinner
          actionTitle="Đặt hàng"
          label="Tổng tiền"
          amount={total}
          Icon={planeIcon}
          onActionPress={handleOrderPress}
          actionEnabled={cart.cart.length}

        />
      </View>
    )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollContainer}>
        {/* <View style={{ height: scrollHeight.current }}> */}
        {cart.cart.map((cartItem, index) => (
          <CartItem
            idCart={auth.user.id}
            key={cartItem.id}
            cartItem={cartItem}
            index={index}
            cart={cart.cart}
            setCart={setData}
            setTotalAmount={setTotal}
            // onAdd={onAdd}
            // onDecrease={onDecrease}
            // onRemove={onRemove}
            deletedIndex={deletedIndex}
          />
          // <View key={index} style={{backgroundColor:'red', marginBottom:10, height:100}}></View>
        ))}
        {/* </View> */}
      </ScrollView>
      <ActionComponent
        withSpinner
        actionTitle="Đặt hàng"
        label="Tổng tiền"
        amount={cart.totalAmount}
        Icon={planeIcon}
        onActionPress={handleOrderPress}
        actionEnabled={cart.cart.length}

      />
      {/* {alert && (
        <ErrorModal
          isVisible={alert}
          title="Oops"
          message="Please check your internet connection"
          buttonTitle="Try Again"
          onCancel={() => toggleAlert()}
          Icon={() => (
            <Icon
              name="wifi-off"
              size={32}
              color={`rgba(${Colors.primary}, 0.8)`}
            />
          )}
        />
      )} */}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(CartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 30,
    marginBottom: 150
    // flex:1
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 100,
  },
  errorMessage: {
    color: `rgba(${Colors.text.secondary},1)`,
    marginBottom: 150
  }
});
