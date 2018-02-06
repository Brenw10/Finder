import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from 'Finder/src/styles/SignIn';
import CustomTextInput from 'Finder/src/components/CustomTextInput';
import CustomButton from 'Finder/src/components/CustomButton';
import { View } from 'react-native-animatable';

export default class SignIn extends Component {
    render() {
        return (
            <View style={styles.container} animation='slideInUp'>
                <View style={styles.form}>
                    <View style={styles.margin}>
                        <CustomTextInput placeholder='E-mail' />
                    </View>
                    <View style={styles.margin}>
                        <CustomTextInput placeholder='Password' />
                    </View>
                    <View style={styles.margin} animation='bounceIn' duration={600} delay={400}>
                        <CustomButton text='Log In'
                            buttonStyle={styles.loginButton}
                            textStyle={styles.loginButtonText}
                        />
                    </View>
                </View>
            </View>
        );
    }
}