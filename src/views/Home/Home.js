import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import CloserUsersList from 'Finder/src/components/CloserUsersList';
import config from 'Finder/src/config';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        headerLeft: null
    };
    constructor(props) {
        super(props);
        this.state = {};
        navigator.geolocation.watchPosition(position => this.setCurrentPosition(position));
    }
    getAddressByLatLong(latitude, longitude) {
        const { MAPS_API_KEY } = config;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`;
        return fetch(url).then(data => data.json());
    }
    getDistrictFromAddress(address) {
        const results = address.results;
        const length = results.length;
        return results[length - 4];
    }
    async setCurrentPosition(position) {
        const uid = firebase.auth().currentUser.uid;
        const address = await this.getAddressByLatLong(position.coords.latitude, position.coords.longitude);
        const { formatted_address } = this.getDistrictFromAddress(address);
        position.district = formatted_address;
        firebase
            .database()
            .ref(`users/${uid}/position`)
            .set(position);
    }
    render() {
        return (
            <View>
                <CloserUsersList />
            </View>
        );
    }
}