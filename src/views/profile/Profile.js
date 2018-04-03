import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from 'Finder/src/styles/Profile';
import anonymous from 'Finder/src/images/anonymous.png';
import user from 'Finder/src/services/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileImage from 'Finder/src/components/ProfileImage';

export default class Profile extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
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
            return user.getCurrentUser().then(currentUser => this.setState({ currentUser, isEditable: true }));
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name='angle-left' color='white' size={35} />
                </TouchableOpacity>
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
        const imageSource = currentUser && currentUser.photo_url ? { uri: currentUser.photo_url } : anonymous;
        return <Image source={imageSource} style={styles.avatar} />;
    }
    renderUser() {
        if (!this.state.currentUser) return;
        return (
            <View style={styles.userContainer}>
                <Text style={styles.userNameText}>{this.state.currentUser.name}</Text>
                <View style={styles.locationContainer}>
                    <FontAwesome name='map-marker' color='white' size={22} />
                    <Text style={styles.districtText}> {this.state.currentUser.district}</Text>
                </View>
            </View>
        );
    }
    renderEditImage() {
        if (!this.state.isEditable) return;
        return <ProfileImage containerStyle={styles.editAvatar} success={() => this.loadUser()} />;
    }
}