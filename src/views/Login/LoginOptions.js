import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from 'Finder/src/styles/loginOptions';
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
                <View animation='fadeInDownBig' delay={600} duration={400}>
                    <CustomButton buttonStyle={styles.registerButton}
                        text='Create an account' onPress={() => this.props.register()} />
                </View>
                <View style={styles.separatorContainer} animation={'fadeInDownBig'} delay={700} duration={400}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorOr}>Or</Text>
                    <View style={styles.separatorLine} />
                </View>
                <View animation='fadeInDownBig' delay={800} duration={400}>
                    <CustomButton buttonStyle={styles.loginButton}
                        text='Sign In' onPress={() => this.props.login()} />
                </View>
            </View>
        );
    }
}