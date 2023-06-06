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
import { RefreshControl, TouchableOpacity } from 'react-native-gesture-handler';
import { getBids } from '../redux/contracts/services';

const textPrimaryColor = `rgb(${Colors.text.primary})`;
// const width = Dimensions.get('window').width

const MyBiddingScreen = ({ navigation, auth }) => {

  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowSearch, setShowSearch] = useState(false);
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const widthScreen = useWindowDimensions().width
  const [width, setWidth] = useState(widthScreen)


  const onSearch = () => {
  }

  const loadData = async () => {
    setLoading(true);
    const d = await getBids(auth?.user?.email);
    setData(d?.data?.content)
    setLoading(false)
  };
  const dispatch = useDispatch()
  useEffect(() => {
    loadData()
  }, []);

  const refreshControl = useCallback(() => {
    return (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={async () => {
          setIsRefreshing(true);
          await loadData();
          setIsRefreshing(false);
        }}
        tintColor={primaryColor}
        colors={[primaryColor]}
      />
    );
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={{ ...styles.header, }}>
            <Text style={styles.titleHeader}>Hồ sơ đã tham gia</Text>
          </View>

          <View style={{ padding: 10 }}>
          <ActivityIndicator size='large' color={`rgba(${Colors.primary},0.5)`} />

          </View>

        </View>

      </SafeAreaView>

    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ ...styles.header, }}>
          <Text style={styles.titleHeader}>Hồ sơ đã tham gia</Text>
        </View>

        <View style={{ padding: 10 }}>
          <FlatList
            style={{ minHeight: 200 }}
            data={data}
            refreshControl={refreshControl()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View style={{ backgroundColor: `rgba(${Colors.primary},0.6)`, padding: 10, borderRadius: 5, marginBottom: 10 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>tenderContractId: {item?.tenderContractId}</Text>
                    <Text>Trạng thái: {item?.status}</Text>
                  </View>
                  <Text>Mô tả: {item?.description}</Text>
                  <Text>Giá đề xuất: {item?.proposedPrice}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
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
