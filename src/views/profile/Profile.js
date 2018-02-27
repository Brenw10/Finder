import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from 'Finder/src/styles/Profile';
import anonymous from 'Finder/src/images/anonymous.png';
import auth from 'Finder/src/services/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import upload from 'Finder/src/services/upload';
import firebase from 'react-native-firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Lightbox } from '@shoutem/ui';

export default class Profile extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isEditable: false
        };
    }
    componentDidMount() {
        this.loadUser();
    }
    loadUser() {
        const { params = {} } = this.props.navigation.state;
        if (params.user) {
            this.setState({ currentUser: params.user, isEditable: false });
            return Promise.resolve(params.user);
        } else {
            return auth.getCurrentUser().then(currentUser => this.setState({ currentUser, isEditable: true }));
        }
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
        await firebase.database().ref(`users/${currentUser.uid}/profile`).update({ photo_url });
        await this.loadUser();
        this.setState({ isLoading: false });
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name='angle-left' color='white' size={35} />
                </TouchableOpacity>
                <Spinner visible={this.state.isLoading} />
            </View>
        );
    }
    renderHeader() {
        return (
            <View style={styles.headerContainer}>
                {this.renderAvatar()}
                {this.renderEditImage()}
                {this.renderUser()}
            </View>
        );
    }
    renderAvatar() {
        const currentUser = this.state.currentUser;
        const imageSource = currentUser && currentUser.profile.photo_url ? { uri: currentUser.profile.photo_url } : anonymous;
        return (
            <Lightbox>
                <Image source={imageSource} style={styles.avatar} />
            </Lightbox>
        );
    }
    renderUser() {
        if (!this.state.currentUser || !this.state.currentUser.position) return;
        return (
            <View style={styles.userContainer}>
                <Text style={styles.userNameText}>{this.state.currentUser.profile.name}</Text>
                <View style={styles.locationContainer}>
                    <FontAwesome name='map-marker' color='white' size={22} />
                    <Text style={styles.districtText}> {this.state.currentUser.position.district}</Text>
                </View>
            </View>
        );
    }
    renderEditImage() {
        if (!this.state.isEditable) return;
        return (
            <TouchableOpacity style={styles.editAvatar} onPress={() => this.selectImage()}>
                <FontAwesome name='pencil' size={23} color='black' />
            </TouchableOpacity>
        );
    }
}