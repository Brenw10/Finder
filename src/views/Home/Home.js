import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import CloserUsersList from 'Finder/src/components/CloserUsersList';
import keys from 'Finder/src/config/keys';
import styles from 'Finder/src/styles/Home';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        headerLeft: null
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }
    componentDidMount() {
        navigator.geolocation.watchPosition(
            position => this.setCurrentPosition(position),
            console.log,
            { enableHighAccuracy: true, timeout: 0, maximumAge: 0, distanceFilter: 0 }
        );
    }
    getAddressesByLatLong(latitude, longitude) {
        const { MAPS_API_KEY } = keys;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`;
        return fetch(url).then(data => data.json()).then(data => data.results);
    }
    getDistrictFromAddress(addresses) {
        const components = addresses[0].address_components;
        return components.find(address => address.types.includes('sublocality_level_1'));
    }
    async setCurrentPosition(position) {
        this.setState({ isLoading: true });
        const uid = firebase.auth().currentUser.uid;
        const addresses = await this.getAddressesByLatLong(position.coords.latitude, position.coords.longitude);
        const { long_name } = this.getDistrictFromAddress(addresses);
        position.district = long_name;
        await firebase.database().ref(`users/${uid}/position`).set(position);
        this.setState({ isLoading: false });
    }
    render() {
        return (
            <View style={styles.container}>
                <CloserUsersList />
                <Text>{this.state.isLoading ? 'Loading' : 'Done'}</Text>
            </View>
        );
    }
}