import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  useWindowDimensions
} from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { Colors } from '../../constants/Colors';
import { connect, useDispatch } from 'react-redux'
import cartSaga from '../../redux/cart/saga';


const shadowOpts = {
  // width: Dimensions.get('window').width,
  height: 150,
  color: '#0f0521',
  border: 33,
  radius: 60,
  opacity: 0.12,
  x: 0,
  y: 25,
  style: {
    height: 150,
    // width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
  },
};

const ActionComponent = (props) => {
  const widthScreen = useWindowDimensions().width
  const { order,cart, amount, label, actionTitle, Icon, onActionPress, actionEnabled, withSpinner, isLoading } = props

  const [actionDisabled, setActionDisabled] = useState(false);
  const [width, setWidth] = useState(widthScreen) 


  const pressed = useSharedValue(false);
  const eventHandler = useAnimatedGestureHandler({
    onStart: () => (pressed.value = true),
    onFinish: () => (pressed.value = false),
  });

  useEffect(() => {
    setWidth(widthScreen)
  }, [widthScreen]);

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(pressed.value ? 0.85 : 1, {
            duration: 150,
            easing: Easing.bezier(0.25, 1, 0.5, 1),
          }),
        },
      ],
    };
  });

  return (
    <BoxShadow setting={{...shadowOpts,width,style:{height: 150,
      width,position: 'absolute',bottom: 0,}}}>
      <View style={styles.actionContainer}>
        <View style={styles.actionDetails}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.price}>{amount?.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</Text>
          {/* <Text style={styles.price}>{amount.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</Text> */}
        </View>
        {actionEnabled ? (
          <PanGestureHandler onGestureEvent={eventHandler}>
            <Animated.View
              style={[
                {
                  flex: 1,
                  height: 70,
                },
                animStyle,
              ]}>
              <TouchableOpacity
                style={styles.actionEnabled}
                disabled={actionDisabled}
                activeOpacity={1}
                onPress={onActionPress}>
                <Icon />
                <Text style={styles.actionTitle}>{actionTitle}</Text>
                {/* {withSpinner && ( */}
                <ActivityIndicator
                  style={{ left: 10 }}
                  animating={order.isLoadingOrder || cart.isLoading}
                  size="small"
                  color="white"
                />
                {/* )} */}
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        ) : (
          <TouchableOpacity style={styles.actionDisabled} activeOpacity={1}>
            <Icon />
            <Text style={styles.actionTitle}>{actionTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
    </BoxShadow>
  );
};

const mapStateToProps = state => {
  return {
    order: state.order,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(ActionComponent);


const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  actionEnabled: {
    height: '100%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: `rgb(${Colors.primary})`,
    // width:150
  },
  actionDisabled: {
    height: 70,
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: `rgba(${Colors.primary}, 0.2)`,
  },
  actionTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    color: 'white',
    marginLeft: 8,
  },
  actionDetails: {
    marginRight: 30,
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Lato-Regular',
    color: `rgb(${Colors.text.secondary})`,
    fontSize: 18,
    marginBottom: 8,
  },
  price: {
    fontFamily: 'Lato-Black',
    color: `rgb(${Colors.text.primary})`,
    fontSize: 20,
  },
});
