import React, { Component } from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import firebase from 'react-native-firebase';
import styles from 'Finder/src/styles/CloserUsersList';
import auth from 'Finder/src/services/auth';
import geolocation from 'Finder/src/services/geolocation';
import Spinner from 'react-native-loading-spinner-overlay';
import { ListItem } from 'react-native-elements';
import anonymous from 'Finder/src/images/anonymous.png';
import util from 'Finder/src/services/util';

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
        this.setState({ isRefreshing: true, isLoading: true });
        
        const dataSource = new ListView.DataSource({ rowHasChanged: (a, b) => a !== b });
        const currentUser = await auth.getCurrentUser();

        const users = await this.getUserByDisctrict(currentUser.position.district);
        const view = this.sortUsersByDistance(this.setUsersDistance(currentUser, users));
        const dataSourceValues = dataSource.cloneWithRows(view);

        this.setState({ users: dataSourceValues, isRefreshing: false, isLoading: false });
    }
    getUserByDisctrict(district) {
        const usersRef = firebase.database().ref('users');
        const query = usersRef.orderByChild('position/district').equalTo(district);
        return query.once('value').then(data => util.objectToArray(data.val(), 'uid'));
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
            <ListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this.refresh()}
                    />
                }
                renderRow={(user, index) => this.renderListItem(user, index)}
                dataSource={this.state.users}
            />
        );
    }
    renderListItem(user, index) {
        const distanceMeters = (user.distanceKm * 1000).toFixed(2);
        return (
            <ListItem key={index} title={user.profile.name} containerStyle={styles.listItem}
                onPress={() => this.props.openUser(user)} subtitle={`${distanceMeters} meters distance`}
                roundAvatar avatar={user.profile.photo_url ? { uri: user.profile.photo_url } : anonymous} />
        );
    }
}