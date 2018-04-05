import firebase from 'react-native-firebase';

export default {
    getCurrentUser() {
        const uid = firebase.auth().currentUser.uid;
        return firebase.database().ref(`users/${uid}`)
            .once('value').then(user => user.val());
    },
    getUserById(uid) {
        return firebase.database().ref(`users/${uid}`)
            .once('value').then(user => user.val());
    },
    getUsersByDistance(latitude, longitude, range) {
        const place = latitude + longitude;
        const usersRef = firebase.database().ref('users');
        const query = usersRef.orderByChild('place').startAt(place - range).endAt(place + range);
        return query.once('value').then(data => Object.values(data.val()));;
    }
}