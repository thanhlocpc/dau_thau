import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Colors} from '../../constants/Colors';

const ActionButton = ({title, onPress, Icon, prodId, product}) => {


  // const isInCart = prodId && items.hasOwnProperty(`${prodId}`);
  const isInCart = false

  return (
    <TouchableOpacity
      style={[
        styles.action,
        {
          backgroundColor: isInCart
            ? `rgba(${Colors.primary}, 0.3)`
            : `rgb(${Colors.primary})`,
        },
      ]}
      disabled={isInCart}
      activeOpacity={0.9}
      onPress={async()=>await onPress(product)}>
      <Icon />
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(ActionButton);

const styles = StyleSheet.create({
  action: {
    height: 50,
    // borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: `rgb(${Colors.primary})`,
  },
  actionTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
  },
});
