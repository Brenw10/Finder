import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import styles from 'Finder/src/styles/SignUp';
import CustomTextInput from 'Finder/src/components/CustomTextInput';
import CustomButton from 'Finder/src/components/CustomButton';
import { View, Text } from 'react-native-animatable';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';

export default class SignUp extends Component {
    static propTypes = {
        back: PropTypes.func.isRequired,
        success: PropTypes.func.isRequired,
        toggleAlert: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            name: __DEV__ ? 'App' : null,
            email: __DEV__ ? 'app@app.com' : null,
            password: __DEV__ ? '123456' : null,
            confirmPassword: __DEV__ ? '123456' : null,
            isLoading: false
        };
    }
    isValidUser() {
        const isValidEmail = this.state.email;
        const isValidPassword = this.state.password && this.state.password === this.state.confirmPassword;
        const isValidName = this.state.name;
        return isValidEmail && isValidPassword && isValidName;
    }
    register(name, email, password) {
        this.setState({ isLoading: true });
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then(data => this.success(data.user, name, email, password))
            .catch(() => this.error());
    }
    async success(user, name, email, password) {
        await firebase.database().ref(`users/${user.uid}/profile`).set({ name });
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(() => { this.setState({ isLoading: false }); this.props.success(); })
            .catch(() => this.error());
    }
    error(error) {
        this.setState({ isLoading: false });
        this.props.toggleAlert(true);
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding'>
                <View style={styles.container} animation='slideInUp'>
                    <View style={styles.form}>
                        <View style={styles.margin}>
                            <CustomTextInput placeholder='Your Name' value={this.state.name}
                                onChangeText={name => this.setState({ name })} />
                        </View>
                        <View style={styles.margin}>
                            <CustomTextInput placeholder='E-mail' value={this.state.email}
                                onChangeText={email => this.setState({ email })} />
                        </View>
                        <View style={styles.margin}>
                            <CustomTextInput placeholder='Password' secureTextEntry={true} value={this.state.password}
                                onChangeText={password => this.setState({ password })} />
                        </View>
                        <View style={styles.margin}>
                            <CustomTextInput placeholder='Confirm Password' secureTextEntry={true} value={this.state.confirmPassword}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                        </View>
                        {this.renderSignUpButton()}
                        <Text style={styles.loginLink} onPress={() => this.props.back()}
                            animation='fadeIn' duration={600} delay={400}>Already have an account?</Text>
                    </View>
                    <Spinner visible={this.state.isLoading} />
                </View>
            </KeyboardAvoidingView>
        );
    }
    renderSignUpButton() {
        if (!this.isValidUser()) return;
        return (
            <View style={styles.margin} animation='bounceIn' duration={600} delay={400}>
                <CustomButton text='Sign Up'
                    onPress={() => this.register(this.state.name, this.state.email, this.state.password)}
                    buttonStyle={styles.registerButton}
                    textStyle={styles.registerButtonText}
                />
            </View>
        );
    }
}