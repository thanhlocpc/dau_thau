import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import OrderItem from '../components/shop/OrderItem';
import { Colors } from '../constants/Colors';
import ErrorScreen from '../components/shop/ErrorScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, useDispatch } from 'react-redux'
import { getOrders, getOrdersNoShowLoading } from '../redux/order/action';

const primaryColor = `rgb(${Colors.primary})`;
const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;

const OrdersScreen = (props) => {
  const { navigation, auth, order } = props

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    dispatch(getOrders(auth.user.id))
  }, []);

  if (order.isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.titleHeader}>Đơn hàng</Text>
        </View>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      </SafeAreaView>
    );
  }

  if (order.error) {
    return <ErrorScreen errorMessage={error} onRetry={() => dispatch(getOrders(auth.user.id))} />;
  }

  // const orderss = ['']

  if (order.orders.length == 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.titleHeader}>Đơn hàng</Text>
        </View>
        <View style={styles.centered}>
          <Icon
            name="emoticon-sad-outline"
            size={26}
            color={`rgba(${Colors.text.secondary}, 0.6)`}
          />
          <Text style={styles.errorMessage}>Bạn chưa có đơn hàng nào</Text>
          <Text style={styles.errorMessage}>Hãy mua sắm ngay bây giờ</Text>
        </View>
      </SafeAreaView >
    );
  }

  return (

    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Đơn hàng</Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              dispatch(getOrdersNoShowLoading(auth.user.id))
            }}
            tintColor={primaryColor}
            colors={[primaryColor]}
          />
        }
        keyExtractor={(item) => item.id}
        data={order.orders}
        contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: 80 }}
        renderItem={({ item }) => <OrderItem orderItem={item} />}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    order: state.order
  };
};

export default connect(mapStateToProps)(OrdersScreen);

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 22,
    marginTop: 25,
    marginVertical: 10
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontFamily: 'Lato-Bold',
    color: textSecondaryColor,
    fontSize: 16,
    marginTop: 3,
  },
});
