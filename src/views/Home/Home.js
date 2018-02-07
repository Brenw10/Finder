import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'react-native-firebase';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.watchPosition();
    }
    watchPosition() {
        navigator
            .geolocation
            .watchPosition(currentPosition => this.setCurrentPosition(currentPosition));
    }
    setCurrentPosition(currentPosition) {
        const uid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref(`users/${uid}/position`)
            .set(currentPosition);
    }
    render() {
        return (
            <View>
                <Text>Home</Text>
            </View>
        );
    }
}