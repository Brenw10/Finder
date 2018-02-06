import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from 'Finder/src/styles/Login';
import LoginOptions from 'Finder/src/views/Login/LoginOptions';
import SignIn from 'Finder/src/views/Login/SignIn';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.views = {
            'LOGIN_OPTIONS': 'LoginOptions',
            'SIGN_IN': 'SignIn',
            'SIGN_UP': 'SignUp'
        };
        this.state.selectedView = this.state.views.LOGIN_OPTIONS;
    }
    loadRegister() {
        this.setState({ selectedView: this.state.views.SIGN_UP });
    }
    loadLogin() {
        this.setState({ selectedView: this.state.views.SIGN_IN });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo}
                    animation='bounceIn' duration={1200} delay={200}>
                    <Text>Place a logo here</Text>
                </View>
                {this.renderLoginOptions()}
                {this.renderSignIn()}
            </View>
        );
    }
    renderLoginOptions() {
        if (this.state.selectedView !== this.state.views['LOGIN_OPTIONS']) return;
        return (
            <LoginOptions
                register={() => this.loadRegister()}
                login={() => this.loadLogin()}
            />
        );
    }
    renderSignIn() {
        if (this.state.selectedView !== this.state.views['SIGN_IN']) return;
        return (
            <SignIn />
        );
    }
}