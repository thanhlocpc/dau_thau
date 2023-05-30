import React, { useState } from 'react';
import { Text, View, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileItem from '../components/shop/ProfileItem';
import { LOGOUT } from '../redux/auth/constants';
import { Colors } from '../constants/Colors';
const primaryColor = `rgb(${Colors.primary})`;
import { connect, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';


const width = Dimensions.get('window').width
const ListItem = ({ icon, name }) => (
  <TouchableOpacity style={styles.listItem}>
    <MaterialCommunityIcons name={icon} size={23} color={primaryColor} />
    <Text style={styles.itemName}>{name}</Text>
  </TouchableOpacity>
);
export const Profile = (props) => {
  const { navigation, auth } = props;
  const { firstName, lastName, email } = auth.user
  const [isUploading, setUploading] = useState(false)
  const dispatch = useDispatch();

 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/*Cá nhân */}
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity activeOpacity={0.6} style={{marginRight:10}}>
                <Image style={styles.avatar}
                  source={{ uri: 'https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png' }} />
              </TouchableOpacity>
              <View style={styles.txtname}>
                <Text style={styles.name}>{lastName} {firstName}</Text>
                <Text style={styles.userInfo}>{email}</Text>
                <Text style={styles.userInfo}>Thành Viên</Text>
              </View>
            </View>
          </View>
          <View style={{ height: 0.2, borderWidth: 0.2, borderColor: `rgb(${Colors.text.secondary})` }}></View>
          
          <View style={{ height: 0.2, borderWidth: 0.2, borderColor: `rgb(${Colors.text.secondary})` }}></View>

          {/*list thông tin */}
          <View style={styles.divider} />
          {/* onPress={() => navigation.navigate("Purchased")} */}
          {/* <ProfileItem icon="format-list-bulleted" name="Sản phẩm đã mua"  /> */}
          <ProfileItem icon="cart-outline" name="Đã xem gần đây" />
          <ProfileItem icon="star-outline" name="Đánh giá của tôi" />
          <ProfileItem icon="share-all-outline" name="Chia sẻ" />
          <ProfileItem icon="help-rhombus-outline" name="Hỗ trợ" />
          <ProfileItem icon="map-marker-outline" name="Địa chỉ"  />
          <ProfileItem icon="account-box-outline" name="Cài đặt"  />
          <ProfileItem icon="exit-to-app" name="Log Out" onPress={() => dispatch({ type: LOGOUT })} />
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};


const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Profile);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.background,
  },
  headerContent: {
    flexDirection: 'row',
    paddingVertical: 30,
    paddingHorizontal: 15
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
    // marginRight: 20,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
  },
  body: {
    backgroundColor: "#778899",
    height: 500,
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 0.5,
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: 13
    // backgroundColor: 'white',
    // flex: 1,
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
  },
  divider: {
    // height: 10,
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    // width: '100%',
    paddingHorizontal: 2,
    backgroundColor: 'white',
    // paddingVertical:5
  },
  itemName: {
    fontSize: 16,
    color: '#484848',
    textAlign: 'center',
    marginTop: 5
  },
  icon_1: {
    width: 26,
    height: 26,

  },
  componentItem: {
    width: width / 4,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
    flex: 1,
  },

});

