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
        this.setCurrentPosition();
    }
    getAddressByLatLong(latitude, longitude) {
        const { MAPS_API_KEY } = config;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`;
        return fetch(url).then(data => data.json());
    }
    setCurrentPosition() {
        // const uid = firebase.auth().currentUser.uid;
        navigator
            .geolocation
            .watchPosition(currentPosition => {
                this.getAddressByLatLong(currentPosition.coords.latitude, currentPosition.coords.longitude)
                    .then(console.log);
                // firebase
                //     .database()
                //     .ref(`users/${uid}/position`)
                //     .set(currentPosition);
            });
    }
    render() {
        return (
            <View>
                <CloserUsersList />
            </View>
        );
    }
}