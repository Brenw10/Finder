import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class PhotoUpload extends Component {
    static navigationOptions = {
        title: 'Photo Upload',
        headerLeft: null,
        gesturesEnabled: false,
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-images-outline' size={25} color={tintColor} />
    }
    render() {
        return (
            <View>
                <Text>Photo Upload Page</Text>
            </View>
        );
    }
}