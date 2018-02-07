import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import firebase from 'react-native-firebase';

export default class CloserUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.fillCloserUsers();
    }
    fillCloserUsers() {
        this.getCloserUsers().then(users => {
            const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({ users: dataSource.cloneWithRows(users.val()) });
        });
    }
    getCloserUsers() {
        return firebase
            .database()
            .ref('users')
            .once('value');
    }
    render() {
        return (
            <View>
                {this.renderUserList()}
            </View>
        );
    }
    renderUserList() {
        if (!this.state.users) return;
        return (
            <ListView
                dataSource={this.state.users}
                renderRow={(row) => <Text>{row.profile.name}</Text>}
            />
        );
    }
}