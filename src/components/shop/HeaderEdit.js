import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import BackButton from './BackButton';
const width = Dimensions.get('window').width;
const HeaderEdit = ({title, navigation,textButton}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...styles.headerStyle,
          justifyContent: 'space-between',
        }}>
        <View style={styles.topHearder}>
          <BackButton goBack={navigation.goBack} />
          <View
            style={{
              width: width * (43 / 100),
              alignItems: 'center',
              left: width * (1 / 100),
            }}>
            <Text style={styles.textTop}>{title}</Text>
          </View>

          <TouchableOpacity>
            <Text style={{...styles.textTop, left: width * (19 / 100)}}>
              {textButton}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HeaderEdit;

const styles = StyleSheet.create({
  headerStyle: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
  },
  topHearder: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  textTop: {
    fontSize: 18,
    paddingTop: 35,
  },
});
