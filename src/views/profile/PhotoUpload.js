import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class PhotoUpload extends Component {
    static navigationOptions = {
        title: 'Photo Upload',
        headerLeft: null,
        gesturesEnabled: false,
    }
    render() {
        return (
            <View>
                <Text>Photo Upload Page</Text>
            </View>
        );
    }
}