import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import firebase from 'react-native-firebase';
import styles from 'Finder/src/styles/CloserUsersList';
import Spinner from 'react-native-loading-spinner-overlay';
import auth from 'Finder/src/services/auth';

export default class CloserUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }
    componentDidMount() {
        this.fillCloserUsers();
    }
    async fillCloserUsers() {
        this.setState({ isLoading: true });
        const currentUser = await auth.getCurrentUser();
        const users = await this.getUserByDisctrict(currentUser.position.district);
        const dataSource = new ListView.DataSource({ rowHasChanged: (a, b) => a !== b });
        const dataSourceValues = dataSource.cloneWithRows(users);
        this.setState({ users: dataSourceValues, isLoading: false });
    }
    getUserByDisctrict(district) {
        const usersRef = firebase.database().ref('users');
        const query = usersRef.orderByChild('position/district').equalTo(district);
        return query.once('value').then(result => result.val());
    }
    render() {
        return (
            <View>
                {this.renderList()}
                <Spinner visible={this.state.isLoading} />
            </View>
        );
    }
    renderList() {
        if (!this.state.users) return;
        return (
            <ListView style={styles.list}
                dataSource={this.state.users}
                renderRow={row => this.renderListItem(row)}
                renderSeparator={row => <View style={styles.separator} />}
            />
        );
    }
    renderListItem(props) {
        return (
            <Text style={styles.text}>{props.profile.name}</Text>
        );
    }
}