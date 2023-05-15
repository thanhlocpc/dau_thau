import firestore from '@react-native-firebase/firestore';

export const getRecentProductsService = (id) =>
    firestore()
        .collection('recentProducts')
        .doc(id)
        .collection('items')
        .orderBy('createdAt','desc')
        .get()

export const addRecentProductService = (uid, product) =>
    firestore()
        .collection('recentProducts')
        .doc(uid)
        .collection("items")
        .doc(product.id)
        .set({
            ...product, createdAt: firestore.Timestamp.now()
        })

export const removeRecentProductService = (uid, pid) =>
    firestore()
        .collection('recentProducts')
        .doc(uid)
        .collection("items")
        .doc(pid)
        .delete()







