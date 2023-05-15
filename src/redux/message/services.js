import firestore from '@react-native-firebase/firestore';

export const sendMessage = (partnerKey, message) =>
    firestore()
        .collection('messages')
        .doc(partnerKey)
        .collection('messages')
        .add({
            ...message,
            createdAt: firestore.Timestamp.now()
        })






