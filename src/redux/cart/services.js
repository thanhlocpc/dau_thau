import firestore from '@react-native-firebase/firestore';

export const getCarts = (id) =>
    firestore().collection('carts').doc(id).get();

export const updateCart = (id, data = {}) => {
    firestore()
        .collection('carts')
        .doc(id)
        .set({
            items: data,
            id
        })
}

export const clearCart = (id) => {
    firestore()
        .collection('carts')
        .doc(id)
        .update({
            items: [],
        })
}

export const getProductById = (id) => 
    firestore()
        .collection('products')
        .doc(id)
        .get()


export const getProductIdIn = (arrId) =>
    firestore()
        .collection('products')
        .where("id", 'in', arrId)
        .get()




