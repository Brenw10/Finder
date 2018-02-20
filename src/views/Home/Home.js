import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import CloserUsersList from 'Finder/src/components/CloserUsersList';
import styles from 'Finder/src/styles/Home';
import geolocation from 'Finder/src/services/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Home',
            headerLeft: null,
            gesturesEnabled: false,
            headerRight: params && params.isLoading && <ActivityIndicator size="small" color="#000" style={styles.loader} />,
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home-outline' size={25} color={tintColor} />
        };
    }
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
        return components.find(address => address.types.includes('sublocality_level_1'));
    }
    async setCurrentPosition(position) {
        this.props.navigation.setParams({ isLoading: true });
        const uid = firebase.auth().currentUser.uid;
        const addresses = await geolocation.getAddressesByLatLong(position.coords.latitude, position.coords.longitude);
        const { long_name } = this.getDistrictFromAddress(addresses);
        position.district = long_name;
        await firebase.database().ref(`users/${uid}/position`).set(position);
        this.props.navigation.setParams({ isLoading: false });
    }
    render() {
        return (
            <View style={styles.container}>
                <CloserUsersList />
            </View>
        );
    }
}