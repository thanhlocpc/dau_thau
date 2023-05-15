import firestore from '@react-native-firebase/firestore';

export const getOrders = (id) =>
    firestore().collection('orders').where("uid",'in',[id]).orderBy('createdAt', 'desc').get()

export const createOrder = (id, data) => {
    const ref = firestore().collection('orders')
    ref.add({
        ...data,
        id: firestore.Timestamp.now().seconds * 1000,
        uid:id
    })
}






