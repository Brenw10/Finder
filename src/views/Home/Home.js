import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import CloserUsersList from 'Finder/src/components/CloserUsersList';
import styles from 'Finder/src/styles/Home';
import geolocation from 'Finder/src/services/geolocation';
import { NavigationBar, Icon, DropDownMenu } from '@shoutem/ui';
import Match from 'Finder/src/components/Match';

export default class Home extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    };
    constructor(props) {
        super(props);
        this.state = {
            item: {
                MENU: '☰',
                SAIR: 'SAIR'
            }
        };
        this.state.menu = [
            { title: this.state.item.MENU },
            { title: this.state.item.SAIR }
        ];
    }
    componentDidMount() {
        navigator.geolocation.watchPosition(
            position => this.setCurrentPosition(position),
            console.log,
            { enableHighAccuracy: true, timeout: 0, maximumAge: 0, distanceFilter: 1 }
        );
    }
    menu(selectedMenu) {
        switch (selectedMenu.title) {
            case this.state.item.SAIR:
                this.props.navigation.goBack();
        }
    }
    getDistrictFromAddress(addresses) {
        const components = addresses[0].address_components;
        const district = components.find(address => address.types.includes('sublocality_level_1'));
        const city = components.find(address => address.types.includes('political'));
        return district || city || 'Unknown Place';
    }
    async setCurrentPosition(position) {
        const uid = firebase.auth().currentUser.uid;
        const addresses = await geolocation.getAddressesByLatLong(position.coords.latitude, position.coords.longitude);
        const { long_name } = this.getDistrictFromAddress(addresses);
        position.district = long_name;
        firebase.database().ref(`users/${uid}/position`).set(position);
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar styleName="inline" leftComponent={this.renderMenu()} rightComponent={this.renderMyProfile()} title="HOME" />
                <CloserUsersList openUser={user => this.props.navigation.navigate('UserProfile', { user })} />
                <Match />
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
    renderMenu() {
        return (
            <DropDownMenu
                options={this.state.menu}
                selectedOption={this.state.menu[0]}
                onOptionSelected={selectedMenu => this.menu(selectedMenu)}
                titleProperty="title"
                valueProperty="title"
            />
        );
    }
}