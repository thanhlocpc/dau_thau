import React, {} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Colors } from '../constants/Colors';
import LeftIcon from '../components/icons/LeftIcon';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import { connect, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack } from '../uitls/naviation'

const snapValue = 24;

const ProductDetailScreen = (props) => {
  const { cart, auth, favorite, route, navigation } = props
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        {/* <Text style={styles.titleHeader}></Text> */}
      </View>
      <View style={styles.containerFull}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => goBack()}
          >
            <LeftIcon
              height={42}
              width={42}
              weight={1.3}
              color={textPrimaryColor}
            />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Chi tiết đấu thầu</Text>

        </View>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.screen}>

              <View style={styles.infoContainer}>
                <View style={{ flexDirection: 'row', marginBottom: 8, }}>
                  <View style={{ width: 15, backgroundColor: "#00C1FF", height: 30 }}></View>
                  {/* <Text style={styles.titleDebtInfo}>Chi tiết</Text> */}
                </View>
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Mô tả: </Text>
                  <Text style={{ ...styles.text }}>Nguyễn Văn A</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Bên mời thầu: </Text>
                  <Text style={{ ...styles.text }}>Vietcombank</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Thông số kĩ thuật: </Text>
                  <Text style={{ ...styles.text }}>Nguyễn Văn B</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Yêu cầu: </Text>
                  <Text style={{ ...styles.text }}>5.000.000 đ</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Thời gian bắt đầu: </Text>
                  <Text style={{ ...styles.text }}>12/12/1111</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Thời gian kết thúc: </Text>
                  <Text style={{ ...styles.text }}>12/12/1111</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Giá khởi điểm: </Text>
                  <Text style={{ ...styles.text }}>12/12/1111</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Loại hình: </Text>
                  <Text style={{ ...styles.text }}>Chuyển khoản</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Trạng thái: </Text>
                  <Text style={{ ...styles.text }}>Chuyển khoản</Text>
                </View >
              </View>

              <View style={styles.infoContainer}>
                <Text style={{ ...styles.text }}>Tài liệu </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView >
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart,
    favorite: state.favorite
  };
};
export default connect(mapStateToProps)(ProductDetailScreen);



const styles = StyleSheet.create({
  header: {
    marginHorizontal: 22,
    marginTop: 0,
    marginVertical: 10
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10
  },
  containerFull: {
    flex: 1
  },
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  rightIcon: {
    marginRight: 30,
  },
  leftIcon: {
    marginLeft: 20,
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginLeft: 10
  },
  container: {
    backgroundColor: `rgb(${Colors.background})`,
    marginTop: 15,
    flex: 1,
  },
  infoContainer: {
    borderTopWidth: 5,
    borderTopColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  item: {
    flexDirection: 'row',
    paddingBottom: 10,
    // marginTop: margin.small
  },
  titleDebtInfo: {
    marginLeft: 8,
    fontSize: 18,
    color: '#686868'
  },

  text: {
    fontSize: 18,
    color: 'black'
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rightCollectMoneyInfo: {
    flex: 1,
    alignItems: 'flex-end'
  },



});