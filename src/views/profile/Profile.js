import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from 'Finder/src/styles/Profile';
import { Avatar, Icon } from 'react-native-elements';
import anonymous from 'Finder/src/images/anonymous.png';
import auth from 'Finder/src/services/auth';

export default class Profile extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-images-outline' size={25} color={tintColor} />
    }
    constructor(props) {
        super(props);
        this.state = {};
        auth.getCurrentUser().then(user => this.setState({ user }));
    }
    selectImage() {
        ImagePicker
            .openPicker({})
            .then(console.log);
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <View style={styles.bodyContainer}>
                </View>
            </View>
        );
    }
    renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.profileImage}>
                    <Avatar xlarge rounded source={anonymous} containerStyle={styles.avatar} />
                    <Icon raised name='create' type='ionicons' containerStyle={styles.editAvatar} />
                </View>
                {this.renderUser()}
            </View>
        );
    }
    renderUser() {
        if (!this.state.user) return;
        return (
            <View style={styles.userContainer}>
                <Text style={styles.userNameText}>{this.state.user.profile.name}</Text>
                <View style={styles.locationContainer}>
                    <Icon name='map-marker' type='font-awesome' color='white' size={15} />
                    <Text style={styles.districtText}> {this.state.user.position.district}</Text>
                </View>
            </View>
        );
    }
}