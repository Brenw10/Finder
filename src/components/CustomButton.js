import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import styles from 'Finder/src/styles/customButton';

export default class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight underlayColor={this.props.disabled ? 'rgba(255, 255, 255, 0.3)' : null}
                style={[styles.button, this.props.buttonStyle, this.props.disabled ? styles.disabledButton : null]}
                onPress={() => this.props.disabled ? null : this.props.onPress()}>
                <Text
                    style={[styles.text, this.props.textStyle, this.props.disabled ? styles.disabledText : null]}>
                    {this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}