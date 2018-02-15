import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from 'Finder/src/styles/Login';
import LoginOptions from 'Finder/src/views/login/LoginOptions';
import SignIn from 'Finder/src/views/login/SignIn';
import SignUp from 'Finder/src/views/login/SignUp';
import AwesomeAlert from 'react-native-awesome-alerts';
import logo from 'Finder/src/images/logo.png';

export default class Login extends Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            isAlertEnabled: false,
            views: {
                LOGIN_OPTIONS: 'LoginOptions',
                SIGN_IN: 'SignIn',
                SIGN_UP: 'SignUp'
            }
        };
        this.state.selectedView = this.state.views.LOGIN_OPTIONS;
    }
    loadRegister() {
        this.setState({ selectedView: this.state.views.SIGN_UP });
    }
    loadLogin() {
        this.setState({ selectedView: this.state.views.SIGN_IN });
    }
    toggleAlert(bool) {
        this.setState({ isAlertEnabled: bool });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}
                    animation='bounceIn' duration={1200} delay={200}>
                    <Image style={styles.logo} source={logo} />
                </View>
                {this.renderLoginOptions()}
                {this.renderSignIn()}
                {this.renderSignUp()}
                {this.renderAlert()}
            </View>
        );
    }
    renderLoginOptions() {
        if (this.state.selectedView !== this.state.views.LOGIN_OPTIONS) return;
        return (
            <LoginOptions
                register={() => this.loadRegister()}
                login={() => this.loadLogin()}
            />
        );
    }
    renderSignIn() {
        if (this.state.selectedView !== this.state.views.SIGN_IN) return;
        return (
            <SignIn
                success={() => this.props.navigation.navigate('Home')}
                toggleAlert={bool => this.toggleAlert(bool)} />
        );
    }
    renderSignUp() {
        if (this.state.selectedView !== this.state.views.SIGN_UP) return;
        return (
            <SignUp
                success={() => this.props.navigation.navigate('Home')}
                toggleAlert={bool => this.toggleAlert(bool)} />
        );
    }
    renderAlert() {
        return (
            <AwesomeAlert title="Error"
                message="Something is wrong"
                show={this.state.isAlertEnabled}
                showConfirmButton={true}
                closeOnHardwareBackPress={true}
                confirmText="Ok"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => this.toggleAlert(false)} />
        );
    }
}