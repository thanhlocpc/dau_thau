import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { BoxShadow } from 'react-native-shadow';

import { Colors } from '../../constants/Colors';
import ActionButton from './ActionButton';

const width = Dimensions.get('window').width / 2 - 15

const ProductItemFavarites = ({
  product,
  onActionPress,
  navigationRoute,
  ActionIcon,
  actionTitle,
  params,
  hideActionButton,
}) => {
  const navigation = useNavigation();

  const onItemPress = useCallback(() => {
    navigation.navigate(navigationRoute, {
      prodId: product.id,
      title: product.title,
    });
  }, [product]);

  const actionPressHandler = useCallback(() => {
    if (params) {
      onActionPress(product, params);
      return;
    }
    onActionPress(product);
  }, [product, params]);

  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={onItemPress}>

        <Image style={[styles.image]} source={{ uri: product.imageUrl }} resizeMode='cover' />
        <View style={styles.infoSection}>
          <View style={styles.details}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          {!hideActionButton && (
            <ActionButton
              title={actionTitle}
              Icon={ActionIcon}
              onPress={actionPressHandler}
              prodId={product.id}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(ProductItemFavarites);

const styles = StyleSheet.create({
  contentContainer: {
    height: 270,
    width: width,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 10,
    elevation:1.5,
    marginTop: 10,
    marginBottom: 3,
  },
  image: {
    borderRadius: 20,
    width: width,
    height: width,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10
  },
  details: {
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    color: `rgb(${Colors.text.primary})`,
    marginBottom: 8,
    marginTop: 0,
    textAlign: 'center',
  },
  price: {
    marginBottom: 8,
    fontFamily: 'Lato-Black',
    fontSize: 18,
    color: `rgb(${Colors.text.primary})`,
    marginLeft: 10,
    marginRight: 10,
  },
});
