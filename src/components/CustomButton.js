import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import styles from 'Finder/src/styles/CustomButton';

export default class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight style={[styles.button, this.props.buttonStyle]}
                onPress={this.props.onPress}>
                <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}