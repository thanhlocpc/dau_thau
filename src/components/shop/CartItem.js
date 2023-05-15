import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// import { removeCart, updateCart } from '../../api/cart'

import { Colors } from '../../constants/Colors';
import QuantityButton from './QuantityButton';
import { updateCart } from '../../redux/cart/action'
import { connect, useDispatch } from 'react-redux'
import { firebase } from '@react-native-firebase/firestore';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { auth, cart, cartItem } = props
  let { id, title, imageUrl, quantity, price, index } = cartItem
  const [avaliable, setAvaliable] = useState(true)

  useEffect(() => {
    // goi api kiểm tra còn sp hay không
    firebase.firestore()
      .collection('product')
      .doc(id).get()
      .then(res => res.data)
      .catch(e=>console.log(e))
  }, []);

  const onIncrease = () => {
    if (quantity > 9) {
    } else {
      quantity += 1;
      const newCart = cart.cart.map((value) => { return value.id == id ? { ...value, quantity } : value })
      dispatch(updateCart({ newCart, id: auth.user.id }))
    }
  }

  const onDecrease = () => {
    if (quantity == 1) {
      // xóa khỏi giỏ hàng
      removeCart()
    } else {
      quantity -= 1;
      const newCart = cart.cart.map((value) => { return value.id == id ? { ...value, quantity } : value })
      dispatch(updateCart({ newCart, id: auth.user.id }))
    }
  }

  const removeCart = () => {
    const newCart = cart.cart.filter((value) => value.id != id)
    dispatch(updateCart({ newCart, id: auth.user.id }))
  }

  const opacity = useSharedValue(0);
  const itemIsLoaded = useSharedValue(false);

  // const positionAnimStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: opacity.value,
  //     top: withDelay(
  //       (index - deletedIndex.value) * 80,
  //       withSpring(index * 115, { stiffness: 150, damping: 16 }),
  //     ),
  //     transform: !itemIsLoaded.value
  //       ? [{ translateY: interpolate(opacity.value, [0, 1], [50, 0]) }]
  //       : [{ scale: interpolate(opacity.value, [1, 0], [1, 0]) }],
  //   };
  // });

  useEffect(() => {
    opacity.value = withDelay(
      index * 150,
      withSpring(
        1,
        { stiffness: 150, damping: 14 },
        () => (itemIsLoaded.value = true),
      ),
    );
  }, []);

  return (
    // <Animated.View style={[styles.container, positionAnimStyle]}>
    <View style={styles.container}>
      {/* <FastImage style={styles.image} source={{ uri: imageUrl }} /> */}
      <Image style={[styles.image]} source={{ uri: imageUrl }} resizeMode='cover' />

      {/* <View> */}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.total}>{price.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</Text>

      </View>
      {/* </View> */}

      <View style={styles.actionSection}>
        <View style={styles.actionContainer}>
          <QuantityButton
            decrease
            onPress={onDecrease}
          />
          <Text style={styles.quantity}>x{quantity}</Text>
          <QuantityButton increase onPress={onIncrease} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.delete}
        onPress={() => {
          removeCart(id)
        }}>
        <Ionicons name="close" size={18} color="white" />
      </TouchableOpacity>
    </View>
    // {/* </Animated.View> */ }

  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart
  };
};
export default connect(mapStateToProps)(CartItem);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    // flex: 1,
    height: 100,
    borderRadius: 16,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    // position: 'absolute',
    // top: 0,
  },
  image: {
    height: '100%',
    width: '20%',
    borderRadius: 8,
  },
  details: {
    paddingLeft: 10,
    paddingRight: 40,
    width: '90%',
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
  },
  total: {
    fontFamily: 'Lato-Black',
    fontSize: 18,
    color: `rgb(${Colors.text.primary})`,
    marginTop: 10,
  },
  actionSection: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 5
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 5,
  },
  quantity: {
    fontFamily: 'Lato-Black',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
    paddingHorizontal: 5
  },
  delete: {
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(${Colors.primaryDark}, 0.15)`,
    borderRadius: 50,
    position: 'absolute',
    right: 5,
    top: 5
  },
});
