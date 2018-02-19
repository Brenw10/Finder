import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import styles from 'Finder/src/styles/CustomTextInput';

export default class CustomTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const focused = this.state.isFocused ? styles.textInputWrapperFocused : null;
        return (
            <View style={styles.container}>
                <View style={[styles.textInputWrapper, focused]}>
                    <TextInput style={styles.textInput}
                        autoCapitalize='none' autoCorrect={false}
                        placeholder={this.props.placeholder}
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        onChangeText={this.props.onChangeText}
                        secureTextEntry={this.props.secureTextEntry}
                        value={this.props.value}
                        selectionColor='white'
                        onFocus={() => this.setState({ isFocused: true })}
                        onBlur={() => this.setState({ isFocused: false })}
                    />
                </View>
            </View>
        );
    }
}