import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import CloserUsersList from 'Finder/src/components/CloserUsersList';
import keys from 'Finder/src/config/keys';
import styles from 'Finder/src/styles/Home';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        headerLeft: null
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        navigator.geolocation.watchPosition(position => this.setCurrentPosition(position));
    }
    getAddressesByLatLong(latitude, longitude) {
        const { MAPS_API_KEY } = keys;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`;
        return fetch(url).then(data => data.json()).then(data => data.results);
    }
    getDistrictFromAddress(addresses) {
        return addresses.find(address =>
            address.types.includes('postal_code') &&
            address.types.includes('postal_code_prefix') &&
            address.types.length === 2
        );
    }
    async setCurrentPosition(position) {
        const uid = firebase.auth().currentUser.uid;
        const addresses = await this.getAddressesByLatLong(position.coords.latitude, position.coords.longitude);
        const { formatted_address } = this.getDistrictFromAddress(addresses);
        position.district = formatted_address;
        firebase.database().ref(`users/${uid}/position`).set(position);
    }
    render() {
        return (
            <View style={styles.container}>
                <CloserUsersList />
            </View>
        );
    }
}