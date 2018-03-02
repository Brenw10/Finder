import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import AwesomeAlert from 'react-native-awesome-alerts';
import auth from 'Finder/src/services/auth';

export default class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlertEnabled: false
        };
    }
    componentDidMount() {
        this.handleMatch();
    }
    async handleMatch() {
        try {
            const result = await this.getFirstDetail();
            const match = await this.getMatch(result);
            const user = await auth.getUserById(match.uid);
            this.setMatch(user, match);
        } catch (ex) {
            setTimeout(() => this.handleMatch(), 5000);
        }
    }
    getFirstDetail() {
        const { uid } = firebase.auth().currentUser;
        const ref = firebase.database().ref(`stars/${uid}/details`);
        const query = ref.orderByChild('viewed').equalTo(false).limitToFirst(1);
        return query.once('value').then(data => Object.values(data.val() || [])[0]);
    }
    getMatch(match) {
        const { uid } = firebase.auth().currentUser;
        const query = firebase.database().ref(`stars/${uid}/received/${match.uid}`);
        return query.once('value').then(data => data.val());
    }
    setMatch(user, match) {
        this.setState({ match, user, isAlertEnabled: true });
    }
    setViewedMatch(user) {
        const { uid } = firebase.auth().currentUser;
        return firebase.database().ref(`stars/${uid}/details/${user.profile.uid}`).update({ viewed: true });
    }
    async confirmAlert() {
        await this.setViewedMatch(this.state.user);
        this.setState({ isAlertEnabled: false });
        this.handleMatch();
    }
    render() {
        if (this.state.isAlertEnabled)
            return (
                <AwesomeAlert title="It's a match"
                    message={`${this.state.user.profile.name} give you ${this.state.match.stars} stars`}
                    show={this.state.isAlertEnabled}
                    showConfirmButton={true}
                    closeOnHardwareBackPress={true}
                    confirmText="Ok"
                    confirmButtonColor="#DD6B55"
                    onConfirmPressed={() => this.confirmAlert()} />
            );
        else
            return <View></View>;
    }
}