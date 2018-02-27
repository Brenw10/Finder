import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import CloserUsersList from 'Finder/src/components/CloserUsersList';
import styles from 'Finder/src/styles/Home';
import geolocation from 'Finder/src/services/geolocation';
import { NavigationBar, Title, Icon } from '@shoutem/ui';

export default class Home extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        navigator.geolocation.watchPosition(
            position => this.setCurrentPosition(position),
            console.log,
            { enableHighAccuracy: true, timeout: 0, maximumAge: 0, distanceFilter: 1 }
        );
    }
    getDistrictFromAddress(addresses) {
        const components = addresses[0].address_components;
        const district = components.find(address => address.types.includes('sublocality_level_1'));
        const city = components.find(address => address.types.includes('political'));
        return district || city;
    }
    async setCurrentPosition(position) {
        const uid = firebase.auth().currentUser.uid;
        const addresses = await geolocation.getAddressesByLatLong(position.coords.latitude, position.coords.longitude);
        const { long_name } = this.getDistrictFromAddress(addresses);
        position.district = long_name;
        await firebase.database().ref(`users/${uid}/position`).set(position);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 70, backgroundColor: '#1976D2' }}>
                    <NavigationBar styleName="clear" rightComponent={this.renderMyProfile()} centerComponent={<Title>HOME</Title>} />
                </View>
                <CloserUsersList openUser={user => this.props.navigation.navigate('UserProfile', { user })} />
            </View>
        );
    }
    renderMyProfile() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile')}>
                <Icon name="user-profile" />
            </TouchableOpacity>
        );
    }
}