import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import CloserUsersList from 'Finder/src/components/CloserUsersList';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setCurrentPosition();
    }
    setCurrentPosition() {
        const uid = firebase.auth().currentUser.uid;
        navigator
            .geolocation
            .watchPosition(currentPosition =>
                firebase
                    .database()
                    .ref(`users/${uid}/position`)
                    .set(currentPosition)
            );
    }

    render() {
        return (
            <View>
                <CloserUsersList />
            </View>
        );
    }
}