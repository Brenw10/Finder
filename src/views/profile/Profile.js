import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from 'Finder/src/styles/Profile';
import { Avatar, Icon } from 'react-native-elements';
import anonymous from 'Finder/src/images/anonymous.png';
import auth from 'Finder/src/services/auth';
import profileBackground from 'Finder/src/images/profile-background.png';
import Spinner from 'react-native-loading-spinner-overlay';
import upload from 'Finder/src/services/upload';
import firebase from 'react-native-firebase';

export default class Profile extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let options = {
            gesturesEnabled: params.user ? true : false,
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-images-outline' size={25} color={tintColor} />
        };
        if (!params.user) options.header = null;
        return options;
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }
    componentDidMount() {
        this.loadUser();
    }
    loadUser() {
        const { params = {} } = this.props.navigation.state;
        this.props.navigation.setParams({ user: params.user });
        return params.user
            ? this.setState({ currentUser: params.user })
            : auth.getCurrentUser().then(currentUser => this.setState({ currentUser }));
    }
    selectImage() {
        ImagePicker.openPicker({ width: 1000, height: 1200, cropping: true })
            .then(image => this.setUserImage(image));
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
                <Spinner visible={this.state.isLoading} />
            </View>
        );
    }
    renderHeader() {
        return (
            <ImageBackground style={styles.headerContainer} source={profileBackground}>
                {this.renderAvatar()}
                <Icon raised name='create' type='ionicons' containerStyle={styles.editAvatar} onPress={() => this.selectImage()} />
                {this.renderUser()}
            </ImageBackground>
        );
    }
    renderAvatar() {
        const currentUser = this.state.currentUser;
        const imageSource = currentUser && currentUser.profile.photo_url ? { uri: currentUser.profile.photo_url } : anonymous;
        return <Avatar xlarge rounded source={imageSource} avatarStyle={styles.avatar} />;
    }
    renderUser() {
        if (!this.state.currentUser) return;
        return (
            <View style={styles.userContainer}>
                <Text style={styles.userNameText}>{this.state.currentUser.profile.name}</Text>
                <View style={styles.locationContainer}>
                    <Icon name='map-marker' type='font-awesome' color='white' size={15} />
                    <Text style={styles.districtText}> {this.state.currentUser.position.district}</Text>
                </View>
            </View>
        );
    }
}