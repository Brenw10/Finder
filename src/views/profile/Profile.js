import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from 'Finder/src/styles/Profile';
import anonymous from 'Finder/src/images/anonymous.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileImage from 'Finder/src/components/ProfileImage';
import geolocation from 'Finder/src/services/geolocation';
import user from 'Finder/src/services/user';

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
    async loadUser() {
        const { params = {} } = this.props.navigation.state;
        const currentUser = params.user ? params.user : await user.getCurrentUser();
        const addresses = await geolocation.getAddressesByLatLong(currentUser.latitude, currentUser.longitude);
        const { long_name } = geolocation.getDistrictFromAddress(addresses);
        const userWithDistrict = Object.assign(currentUser, { district: long_name });
        this.setState({ user: userWithDistrict, isEditable: !params.user });
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
        const user = this.state.user;
        const imageSource = user && user.photo_url ? { uri: user.photo_url } : anonymous;
        return <Image source={imageSource} style={styles.avatar} />;
    }
    renderUser() {
        if (!this.state.user) return;
        return (
            <View style={styles.userContainer}>
                <Text style={styles.userNameText}>{this.state.user.name}</Text>
                <View style={styles.locationContainer}>
                    <FontAwesome name='map-marker' color='white' size={22} />
                    <Text style={styles.districtText}> {this.state.user.district}</Text>
                </View>
            </View>
        );
    }
    renderEditImage() {
        if (!this.state.isEditable) return;
        return <ProfileImage containerStyle={styles.editAvatar} success={() => this.loadUser()} />;
    }
}