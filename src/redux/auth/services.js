import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getUser = (id) =>
    firestore().collection('customer').doc(id).get();

export const createUser = (id, data) =>
    firestore().collection('customer').doc(id).set(data);

export const updateAddress = (id, address) =>
    firestore()
        .collection('customer')
        .doc(id)
        .update({
            address
        })

export const updateName = (id, name) =>
    firestore()
        .collection('customer')
        .doc(id)
        .update({
            name
        })

export const updatePhone = (id, phone) =>
    firestore()
        .collection('customer')
        .doc(id)
        .update({
            phone
        })

export const updateGender = (id, gender) =>
    firestore()
        .collection('customer')
        .doc(id)
        .update({
            gender
        })

export const updateBirthday = (id, birthday) =>
    firestore()
        .collection('customer')
        .doc(id)
        .update({
            birthday
        })

export const updateAvatar = (id, urlAvt) =>
    firestore()
        .collection('customer')
        .doc(id)
        .update({
            urlAvt
        })

const currentPass = ''
export const changePassword = () => {
    const emailCred = auth.EmailAuthProvider.credential(
        auth().currentUser, currentPass);

    auth().currentUser.reauthenticateWithCredential(emailCred)
        .then(() => {
            // User successfully reauthenticated.
            const newPass = '123456'
            return firebase.auth().currentUser.updatePassword(newPass);
        })
        .catch(error => {
            // Handle error.
        });
}


