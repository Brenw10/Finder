import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import styles from 'Finder/src/styles/CloserUsersList';
import auth from 'Finder/src/services/auth';
import geolocation from 'Finder/src/services/geolocation';
import Spinner from 'react-native-loading-spinner-overlay';
import anonymous from 'Finder/src/images/anonymous.png';
import util from 'Finder/src/services/util';
import { ListView, ImageBackground, Tile, Title, Subtitle, Divider, TouchableOpacity } from '@shoutem/ui';

export default class CloserUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            isLoading: false
        };
    }
    componentDidMount() {
        this.refresh();
    }
    refresh() {
        this.fillCloserUsers();
    }
    async fillCloserUsers() {
        this.setState({ isRefreshing: true, isLoading: true });

        const currentUser = await auth.getCurrentUser();
        const users = await this.getUserByDisctrict(currentUser.position.district);

        const usersWithDistance = this.setUsersDistance(currentUser, users);
        const sortedUsers = this.sortUsersByDistance(usersWithDistance);

        this.setState({ users: sortedUsers, isRefreshing: false, isLoading: false });
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
                data={this.state.users}
                loading={this.state.isRefreshing}
                onRefresh={() => this.refresh()}
                renderRow={(user, index) => this.renderListItem(user, index)}
            />
        );
    }
    renderListItem(user, index) {
        const distanceMeters = (user.distanceKm * 1000).toFixed(2);
        return (
            <TouchableOpacity onPress={() => this.props.openUser(user)}>
                <Divider styleName="line" />
                <ImageBackground styleName="large" source={user.profile.photo_url ? { uri: user.profile.photo_url } : null}>
                    <Tile>
                        <Title styleName="md-gutter-bottom">{user.profile.name}</Title>
                        <Subtitle styleName="sm-gutter-horizontal">{distanceMeters} meters distance</Subtitle>
                    </Tile>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}