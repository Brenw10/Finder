import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import styles from 'Finder/src/styles/CustomTextInput';

export default class CustomTextInput extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textInputWrapper}>
                    <TextInput style={styles.textInput}
                        placeholder={this.props.placeholder}
                        placeholderTextColor='rgba(255,255,255,0.4)'
                    />
                </View>
            </View>
        );
    }
}