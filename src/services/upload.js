import firebase from 'react-native-firebase';

export default {
    async uploadImage(ref, filename, file) {
        const storageRef = firebase.storage().ref(ref).child(filename);
        await storageRef.put(file.path, { contentType: file.mime });
        return storageRef.getDownloadURL();
    }
}