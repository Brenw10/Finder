import React, { Component } from 'react';
import { View, ListView, Text, RefreshControl } from 'react-native';
import firebase from 'react-native-firebase';
import styles from 'Finder/src/styles/CloserUsersList';
import Spinner from 'react-native-loading-spinner-overlay';
import auth from 'Finder/src/services/auth';

export default class CloserUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isRefreshing: false
        };
    }
    componentDidMount() {
        this.fillCloserUsers();
    }
    refresh() {
        this.fillCloserUsers();
    }
    async fillCloserUsers() {
        this.setState({ isLoading: true, isRefreshing: true });
        const currentUser = await auth.getCurrentUser();

        const dataSource = new ListView.DataSource({ rowHasChanged: (a, b) => a !== b });

        const users = await this.getUserByDisctrict(currentUser.position.district);
        const view = this.sortUsersByDistance(this.setUsersDistance(currentUser, users));
        const dataSourceValues = dataSource.cloneWithRows(view);

        this.setState({ users: dataSourceValues, isLoading: false, isRefreshing: false });
    }
    getUserByDisctrict(district) {
        const usersRef = firebase.database().ref('users');
        const query = usersRef.orderByChild('position/district').equalTo(district);
        return query.once('value').then(data => Object.values(data.val()));
    }
    setUsersDistance(currentUser, users) {
        const currentUserLat = currentUser.position.coords.latitude;
        const currentUserLong = currentUser.position.coords.longitude;
        return users.map(user => Object.assign(user,
            {
                distanceKm:
                    this.getDistanceFromLatLonInKm(currentUserLat, currentUserLong, user.position.coords.latitude, user.position.coords.longitude)
            }
        ));
    }
    sortUsersByDistance(users) {
        return users.sort((a, b) => a.distanceKm - b.distanceKm);
    }
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }
    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderList()}
                <Spinner visible={this.state.isLoading} />
            </View>
        );
    }
    renderList() {
        if (!this.state.users) return;
        return (
            <ListView style={styles.list}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this.refresh()}
                    />
                }
                dataSource={this.state.users}
                renderRow={row => this.renderListItem(row)}
                renderSeparator={row => <View style={styles.separator} />}
            />
        );
    }
    renderListItem(props) {
        return (
            <Text style={styles.text}>{props.profile.name} - {(props.distanceKm * 1000).toFixed(2)}M</Text>
        );
    }
}