import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  StatusBar,
  ActivityIndicator,
  Text,
  useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect, useDispatch } from 'react-redux'

import { Colors } from '../constants/Colors';


const primaryColor = `rgb(${Colors.primary})`;
const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;
import { TouchableOpacity } from 'react-native-gesture-handler';

const textPrimaryColor = `rgb(${Colors.text.primary})`;
// const width = Dimensions.get('window').width

const MyBiddingScreen = ({ navigation, auth }) => {

  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowSearch, setShowSearch] = useState(false);
  const [data, setData] = useState([1, 2, 3])
  const [search, setSearch] = useState('')
  const widthScreen = useWindowDimensions().width
  const [width, setWidth] = useState(widthScreen)


  const onSearch = () => {
  }

  const loadData = async () => {
    setLoading(true);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    setWidth(widthScreen)
    return () => {
    }
  }, [widthScreen]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ ...styles.header, }}>
          <Text style={styles.titleHeader}>Hồ sơ đã tạo</Text>
        </View>

        <View style={{ padding: 10 }}>
          <TouchableOpacity>
            <View style={{ backgroundColor: `rgba(${Colors.primary},0.3)`, padding: 10, borderRadius: 5, marginBottom: 10 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Tên hồ sơ</Text>
                <Text>10/10/2022 11:05:30</Text>
              </View>
              <Text>Mới tạo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
          <View style={{ backgroundColor: `rgba(${Colors.primary},0.3)`, padding: 10, borderRadius: 5, marginBottom: 10 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Tên hồ sơ</Text>
                <Text>10/10/2022 11:05:30</Text>
              </View>
              <Text>Mới tạo</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>

  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(MyBiddingScreen);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: StatusBar.length,
    height: '100%'
  },
  header: {
    marginHorizontal: 22,
    marginTop: 20,
    marginVertical: 5,
    // borderLeftWidth: 0,
    paddingLeft: 10,
    // borderLeftColor: primaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  inputSearch: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingVertical: 0,
    paddingTop: 5,
    color: 'black',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 100,
  },
  errorMessage: {
    fontFamily: 'Lato-Bold',
    color: textSecondaryColor,
    fontSize: 16,
    marginTop: 10,
  },
  list: {
    // backgroundColor:'red',


    // // alignItems: 'center',
    // alignSelf:'center',
    // alignContent:'space-around',
    // justifyContent:"space-around",


  },
});
