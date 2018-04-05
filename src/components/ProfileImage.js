import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import upload from 'Finder/src/services/upload';
import ImagePicker from 'react-native-image-crop-picker';
import styles from 'Finder/src/styles/ProfileImage';

export default class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }
    selectImage() {
        ImagePicker.openPicker({ width: 1000, height: 1200, cropping: true })
            .then(image => this.setUserImage(image))
            .catch(console.log);
    }
    async setUserImage(image) {
        this.setState({ isLoading: true });
        const currentUser = firebase.auth().currentUser;
        const photo_url = await upload.uploadImage(`users/${currentUser.uid}`, 'profile', image);
        await firebase.database().ref(`users/${currentUser.uid}`).update({ photo_url });
        await this.props.success();
        this.setState({ isLoading: false });
    }
    render() {
        return (
            <View style={this.props.containerStyle}>
                <TouchableOpacity style={styles.button} onPress={() => this.selectImage()}>
                    <FontAwesome name='pencil' size={23} color='black' />
                </TouchableOpacity>
                <Spinner visible={this.state.isLoading} />
            </View>
        );
    }
}