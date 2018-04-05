import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import styles from 'Finder/src/styles/CloserUsersList';
import user from 'Finder/src/services/user';
import geolocation from 'Finder/src/services/geolocation';
import Spinner from 'react-native-loading-spinner-overlay';
import anonymous from 'Finder/src/images/anonymous.png';
import { ListView, ImageBackground, Tile, Title, Subtitle, Divider, TouchableOpacity, Button, Icon, Text } from '@shoutem/ui';

export default class CloserUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            isLoading: false
        };
    }
    componentDidMount() {
        this.setUsers();
    }
    async setUsers() {
        this.setState({ isRefreshing: true, isLoading: true });
        const currentUser = await user.getCurrentUser();
        const users = await user.getUsersByDistance(currentUser.latitude, currentUser.longitude, 5);
        const usersWithDistance = this.setUsersDistance(currentUser.latitude, currentUser.longitude, users);
        const sortedUsers = usersWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);
        this.setState({ users: sortedUsers, isRefreshing: false, isLoading: false });
    }
    setUsersDistance(currentUserLat, currentUserLong, users) {
        return users.map(user => {
            const distanceKm = geolocation.getDistanceFromLatLonInKm(currentUserLat, currentUserLong, user.latitude, user.longitude);
            return Object.assign(user, { distanceKm });
        });
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
                onRefresh={() => this.setUsers()}
                renderRow={(user, index) => this.renderListItem(user, index)}
            />
        );
    }
    renderListItem(user, index) {
        const distanceMeters = (user.distanceKm * 1000).toFixed(2);
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.openUser(user)}>
                    <ImageBackground styleName="large" source={user.photo_url ? { uri: user.photo_url } : null}>
                        <Tile>
                            <Title styleName="md-gutter-bottom">{user.name}</Title>
                            <Subtitle styleName="sm-gutter-horizontal">{distanceMeters} meters distance</Subtitle>
                        </Tile>
                    </ImageBackground>
                    <Divider styleName="line" />
                </TouchableOpacity>
                <View style={styles.actionContainer}>
                    <Button styleName="full-width" onPress={() => this.props.openUser(user)}>
                        <Icon name="user-profile" />
                        <Text>VIEW</Text>
                    </Button>
                    <Button styleName="full-width">
                        <Icon name="add-to-favorites-on" />
                        <Text>STARS</Text>
                    </Button>
                </View>
            </View>
        );
    }
}