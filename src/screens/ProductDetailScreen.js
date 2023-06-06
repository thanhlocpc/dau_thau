import React, { useCallback } from 'react';
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
import { formatDateFull } from '../uitls/dateUtils';
import { useNavigation } from '@react-navigation/native';

const snapValue = 24;

const ProductDetailScreen = (props) => {
  const { route } = props
  const { product } = route.params
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const joinPress = useCallback(() => {
    navigation.navigate("JoinTenderContracts", {
      product,
    });
  }, [product]);

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
                  <TouchableOpacity onPress={joinPress} style={{backgroundColor:`rgba(${Colors.primary},0.6)`, justifyContent:'center', paddingHorizontal:8,}}>
                    <Text style={{color:"white"}}>Tham gia</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Tên: </Text>
                  <Text style={{ ...styles.text }}>{product?.title}</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Mô tả: </Text>
                  <Text style={{ ...styles.text }}>{product?.description}</Text>
                </View >
                {/* <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Bên mời thầu: </Text>
                  <Text style={{ ...styles.text }}>Vietcombank</Text>
                </View > */}
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Thông số kĩ thuật: </Text>
                  <Text style={{ ...styles.text }}>{product?.technicalInfo}</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Yêu cầu: </Text>
                  <Text style={{ ...styles.text }}>{product?.requirements}</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Thời gian bắt đầu: </Text>
                  <Text style={{ ...styles.text }}>{formatDateFull(new Date(product?.startDateTime))}</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Thời gian kết thúc: </Text>
                  <Text style={{ ...styles.text }}>{formatDateFull(new Date(product?.endDateTime))}</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Giá khởi điểm: </Text>
                  <Text style={{ ...styles.text }}>{product?.minimumAmount?.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Loại hình: </Text>
                  <Text style={{ ...styles.text }}>{product?.category}</Text>
                </View >
                <View style={styles.rowItem}>
                  <Text style={{ ...styles.text }}>Trạng thái: </Text>
                  <Text style={{ ...styles.text }}>{product?.tenderContractStatus}</Text>
                </View >
              </View>

              <View style={styles.infoContainer}>
                <Text style={{ ...styles.text, fontWeight:"bold" }}>Tài liệu </Text>
                <Text style={{ ...styles.text }}>{product.files[0]?.title} </Text>
                <Text style={{ ...styles.text }}>{product.files[1]?.title} </Text>


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
    fontSize: 15,
    color: 'black'
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  rightCollectMoneyInfo: {
    flex: 1,
    alignItems: 'flex-end'
  },



});