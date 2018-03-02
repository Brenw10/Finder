import React, { Component } from 'react';
import { Text, View, LayoutAnimation, KeyboardAvoidingView } from 'react-native';
import styles from 'Finder/src/styles/Login';
import LoginOptions from 'Finder/src/views/login/LoginOptions';
import SignIn from 'Finder/src/views/login/SignIn';
import SignUp from 'Finder/src/views/login/SignUp';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Image } from 'react-native-animatable';
import firebase from 'react-native-firebase';
import logo from 'Finder/src/images/logo.png';

export default class Login extends Component {
    static navigationOptions = {
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
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Home');
            }
        });
    }
    loadRegister() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ selectedView: this.state.views.SIGN_UP });
    }
    loadLogin() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ selectedView: this.state.views.SIGN_IN });
    }
    toggleAlert(bool) {
        this.setState({ isAlertEnabled: bool });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={logo}
                        animation='bounceIn' duration={1200} />
                </View>
                {this.renderLoginOptions()}
                <KeyboardAvoidingView behavior='padding' style={styles.bottomContainer}>
                    {this.renderSignIn()}
                    {this.renderSignUp()}
                </KeyboardAvoidingView>
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
                loadRegister={() => this.loadRegister()}
                toggleAlert={bool => this.toggleAlert(bool)} />
        );
    }
    renderSignUp() {
        if (this.state.selectedView !== this.state.views.SIGN_UP) return;
        return (
            <SignUp
                loadLogin={() => this.loadLogin()}
                toggleAlert={bool => this.toggleAlert(bool)} />
        );
    }
    renderAlert() {
        return (
            <AwesomeAlert title="An error has occurred"
                message="Some information is not correct. Please rewrite and try again."
                show={this.state.isAlertEnabled}
                showConfirmButton={true}
                closeOnHardwareBackPress={true}
                confirmText="Ok"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => this.toggleAlert(false)} />
        );
    }
}