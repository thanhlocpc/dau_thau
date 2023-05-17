import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { BoxShadow } from 'react-native-shadow';

import { Colors } from '../../constants/Colors';
import ActionButton from '../shop/ActionButton';
// const width = Dimensions.get('window').width / 2 - 15
const widthScreen = Dimensions.get('window').width

const width = (widthScreen - 15 * 3) / 2 > 170 ? 170 : (widthScreen - 15 * 3) / 2
import firestore from '@react-native-firebase/firestore';
import { connect, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cart/action'


const CARD_HEIGHT = 290;

const shadowOpts = {
  // width: 320,
  // width: '40%',
  height: CARD_HEIGHT,
  color: '#0f0521',
  border: 33,
  radius: 20,
  opacity: 0.03,
  style: {
    height: CARD_HEIGHT,
    width: 310,
    marginTop: 20
  },
};

const ProductItem = ({
  product,
  // onActionPress,
  navigationRoute,
  ActionIcon,
  actionTitle,
  params,
  hideActionButton,
  auth,
  cart
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onItemPress = useCallback(() => {
    navigation.navigate(navigationRoute, {
      product,
    });
  }, [product]);

  const onActionPress = () => {
    // dispatch(addToCart({product, oldCart:cart.cart, id:auth.user.id}))
  }

  return (
    // <BoxShadow setting={shadowOpts}>
    <TouchableOpacity activeOpacity={0.6} onPress={onItemPress}>
      <View style={{ ...styles.contentContainer }}>
        <Image style={[styles.image]} source={{ uri: "https://static.vecteezy.com/system/resources/previews/006/213/242/original/design-3d-megaphone-purple-announcement-paper-art-style-pastel-free-vector.jpg" }} resizeMode='cover' />
        <Text style={{ position: 'absolute', top: 5, left: 11, fontSize: 11, paddingHorizontal:5, backgroundColor: 'green', color: "white" }}>Đang mở</Text>

        <View style={styles.infoSection}>
          <View style={styles.details}>


            <View style={{ paddingBottom: 0, top: 0}}>
              <Text style={{ fontSize: 11 }}>Bắt đầu:  12/12/2023 12:00</Text>
              <Text style={{ fontSize: 11 }}>Kết thúc: 12/12/2023 12:00</Text>
              <View style={{height:5, width:5}}/>

              <Text style={{ position: 'absolute', top: -30, right: 5, fontSize: 11, paddingHorizontal:5, backgroundColor: `rgba(${Colors.primary},0.6)`, color: "white" }}>
                Loại hình 1
              </Text>
              <Text style={styles.title}>Tên đấu thầu</Text>
              <Text style={styles.title}>Tên bên mời thầu</Text>
            </View>


          </View>
          {/* {!hideActionButton && (
            <ActionButton
              title={actionTitle}
              Icon={ActionIcon}
              onPress={onActionPress}
              prodId={product?.id}
              product={product}
            />
          )} */}
        </View>
      </View>
    </TouchableOpacity>
    // </BoxShadow>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart
  };
};

// console.log(width);
export default connect(mapStateToProps)(ProductItem);

const styles = StyleSheet.create({
  contentContainer: {
    // height: CARD_HEIGHT,
    width: width,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: (widthScreen - width * 2) / 3,
    marginTop: 10,
    marginBottom: 3,
    borderColor: `rgb(${Colors.text.secondary})`,
    // borderWidth: 0.2,
    elevation:1
  },
  image: {
    borderRadius: 20,
    width: width,
    height: width - 30,
  },
  infoSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    // marginTop: 5,
    // flex: 1
  },
  details: {
    // alignItems: 'center'
    padding: 8
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: `rgb(${Colors.text.primary})`,
    marginBottom: 8,
    marginTop: 0,
    textAlign: 'center',
  },
  price: {
    marginBottom: 8,
    fontFamily: 'Lato-Black',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
    marginLeft: 10,
    marginRight: 10,
  },
});
