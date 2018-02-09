import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import firebase from 'react-native-firebase';
import styles from 'Finder/src/styles/CloserUsersList'

export default class CloserUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.fillCloserUsers();
    }
    async fillCloserUsers() {
        const users = await this.getUserByDisctrict();
        const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dataSourceValues = dataSource.cloneWithRows(users.val());
        this.setState({ users: dataSourceValues });
    }
    getUserByDisctrict() {
        return firebase.database().ref('users').once('value');
    }
    render() {
        return (
            <View>
                {this.renderList()}
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