import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from 'Finder/src/styles/LoginOptions';
import CustomButton from 'Finder/src/components/CustomButton';
import { View } from 'react-native-animatable';
import PropTypes from 'prop-types';

export default class LoginOptions extends Component {
    static propTypes = {
        register: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired
    }
    render() {
        return (
            <View style={styles.container}>
                <View animation='zoomIn' delay={600} duration={400}>
                    <CustomButton buttonStyle={styles.registerButton}
                        text='Create an account' onPress={() => this.props.register()} />
                </View>
                <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorOr}>Or</Text>
                    <View style={styles.separatorLine} />
                </View>
                <View animation='zoomIn' delay={800} duration={400}>
                    <CustomButton buttonStyle={styles.loginButton}
                        text='Sign In' onPress={() => this.props.login()} />
                </View>
            </View>
        );
    }
}