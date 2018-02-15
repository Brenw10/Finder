import firebase from 'react-native-firebase';

export default {
    getCurrentUser() {
        const uid = firebase.auth().currentUser.uid;
        return firebase.database().ref(`users/${uid}`)
            .once('value').then(user => user.val());
    }
}