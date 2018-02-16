import React, { Component } from 'react';
import { View, ListView, Text, RefreshControl } from 'react-native';
import firebase from 'react-native-firebase';
import styles from 'Finder/src/styles/CloserUsersList';
import auth from 'Finder/src/services/auth';
import geolocation from 'Finder/src/services/geolocation';
import Spinner from 'react-native-loading-spinner-overlay';

export default class CloserUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            isLoading: false
        };
    }
    componentDidMount() {
        this.fillCloserUsers();
    }
    refresh() {
        this.fillCloserUsers();
    }
    async fillCloserUsers() {
        const dataSource = new ListView.DataSource({ rowHasChanged: (a, b) => a !== b });
        try {
            this.setState({ isRefreshing: true, isLoading: true });
            const currentUser = await auth.getCurrentUser();

            const users = await this.getUserByDisctrict(currentUser.position.district);
            const view = this.sortUsersByDistance(this.setUsersDistance(currentUser, users));
            const dataSourceValues = dataSource.cloneWithRows(view);

            this.setState({ users: dataSourceValues, isRefreshing: false, isLoading: false });
        } catch (ex) {
            const message = 'There is no closer users. Get out of the jungle :p';
            const dataSourceValues = dataSource.cloneWithRows([message]);
            this.setState({ users: dataSourceValues, isRefreshing: false, isLoading: false });
        }
    }
    getUserByDisctrict(district) {
        const usersRef = firebase.database().ref('users');
        const query = usersRef.orderByChild('position/district').equalTo(district);
        return query.once('value').then(data => Object.values(data.val()));
    }
    setUsersDistance(currentUser, users) {
        const currentUserLat = currentUser.position.coords.latitude;
        const currentUserLong = currentUser.position.coords.longitude;
        return users.map(user => {
            const userLatitude = user.position.coords.latitude;
            const userLongitude = user.position.coords.longitude;
            const distanceKm = geolocation.getDistanceFromLatLonInKm(currentUserLat, currentUserLong, userLatitude, userLongitude);
            return Object.assign(user, { distanceKm });
        });
    }
    sortUsersByDistance(users) {
        return users.sort((a, b) => a.distanceKm - b.distanceKm);
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
        if (typeof props === 'string')
            return <Text style={styles.text}>{props}</Text>;
        else
            return <Text style={styles.text}>{props.profile.name} - {(props.distanceKm * 1000).toFixed(2)}M</Text>;
    }
}