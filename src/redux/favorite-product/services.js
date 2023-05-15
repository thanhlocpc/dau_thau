import firestore from '@react-native-firebase/firestore';

export const getFavoriteProductsService = (id) =>
    firestore()
        .collection('favoriteProducts')
        .doc(id)
        .collection('items')
        .orderBy('createdAt','desc')
        .get()

export const addFavoriteProductService = (uid, data) =>
    firestore()
        .collection('favoriteProducts')
        .doc(uid)
        .collection("items")
        .doc(data.id)
        .set({
            ...data, createdAt: firestore.Timestamp.now()
        })

export const removeFavoriteProductService = (uid, pid) =>
    firestore()
        .collection('favoriteProducts')
        .doc(uid)
        .collection("items")
        .doc(pid)
        .delete()







