import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
// import TouchableScale from 'react-native-touchable-scale';
// import {
//   IconHome,
//   IconHomeActive,
//   IconCart,
//   IconCartActive,
//   IconProfile,
//   IconProfileActive,
//   IconHomeRounded,
//   IconHomeRoundedActive,
//   IconSearchRounded,
//   IconSearchRoundedActive,
//   IconCartRounded,
//   IconCartRoundedActive,
//   IconProfileRounded,
//   IconProfileRoundedActive,
//   IconMenuRounded,
//   IconMenuRoundedActive,
// } from '../../../assets';
// import { IconContainer, SafeAreaViewCustom } from '../../atoms';

import Icon from '../icons/LightIcons';
const icon = ({ label, focus }) => {
//   switch (label) {
//     case 'Home':
//       return focus ? <IconHomeRoundedActive /> : <IconHomeRounded />;
//     case 'Menu':
//       return focus ? <IconMenuRoundedActive /> : <IconMenuRounded />;
//     case 'Cart':
//       return focus ? <IconCartRoundedActive /> : <IconCartRounded />;
//     case 'Profile':
//       return focus ? <IconProfileRoundedActive /> : <IconProfileRounded />;
//     default:
//       return <IconHomeRounded />;
//   }
    return  CartIcon = ({ color }) => <Icon name="cart-o" size={20} color={color} />;
};

const BottomNav = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

//   if (focusedOptions.tabBarVisible === false) {
//     return null;
//   }
return (
    <View style={{ flexDirection: 'row', backgroundColor:"red" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
   
};

export default BottomNav;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'CircularStd-Book',
    fontSize: 10,
  },
});
