import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import CloserUsersList from 'Finder/src/components/CloserUsersList';
import styles from 'Finder/src/styles/Home';
import geolocation from 'Finder/src/services/geolocation';
import { NavigationBar, Icon, DropDownMenu } from '@shoutem/ui';

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
                firebase.auth().signOut()
                    .then(() => this.props.navigation.goBack());
        }
    }
    async setCurrentPosition(position) {
        const uid = firebase.auth().currentUser.uid;
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const place = latitude + longitude;
        firebase.database().ref(`users/${uid}`).update({ latitude, longitude, place });
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar styleName="inline" leftComponent={this.renderMenu()} rightComponent={this.renderMyProfile()} title="HOME" />
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