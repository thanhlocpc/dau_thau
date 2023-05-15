import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/Colors';

export default HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View>
          <Text style={{ textAlign: 'center', fontSize:16, fontWeight:'bold', color:'white' }}>nguyenthanhlocpc@gmail.com</Text>
        </View>
        <View style={{width: '100%',color:'white', justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:'white'}}>Số dư: 5555.2$</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor:`rgba(${Colors.text.secondary}, 0.2)`
  },
  info: {
    alignItems: 'center',
    justifyContent:'space-around',
    backgroundColor: `rgb(${Colors.primary})`,
    height: 80,
    borderRadius:8,
    paddingHorizontal:8
  },
  text:{
    color: `rgb(${Colors.text.secondary})`,
  }
})