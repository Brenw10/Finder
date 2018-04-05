import React, { Component } from 'react';
import styles from 'Finder/src/styles/signUp';
import CustomTextInput from 'Finder/src/components/CustomTextInput';
import CustomButton from 'Finder/src/components/CustomButton';
import { Text, View } from 'react-native-animatable';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';

export default class SignUp extends Component {
    static propTypes = {
        loadLogin: PropTypes.func.isRequired,
        toggleErrorAlert: PropTypes.func.isRequired
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
            .then(data => this.success(data.user.uid, name, email, password))
            .catch(error => this.error(error));
    }
    async success(uid, name, email, password) {
        await firebase.database().ref(`users/${uid}`).set({ name, uid });
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(() => this.setState({ isLoading: false }))
            .catch(error => this.error(error));
    }
    error(error) {
        this.setState({ isLoading: false });
        this.props.toggleErrorAlert(true, error.message);
    }
    async loadLogin() {
        await this.submitRef.zoomOut(200);
        await this.containerRef.fadeOut(300);
        this.props.loadLogin();
    }
    render() {
        return (
            <View ref={ref => this.containerRef = ref}>
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
                    <View style={styles.margin} ref={ref => this.submitRef = ref} animation='bounceIn' duration={600} delay={400}>
                        <CustomButton text='Sign Up' disabled={!this.isValidUser()}
                            onPress={() => this.register(this.state.name, this.state.email, this.state.password)}
                            buttonStyle={styles.registerButton}
                            textStyle={styles.registerButtonText}
                        />
                    </View>
                    <Text style={styles.loginLink} onPress={() => this.loadLogin()}
                        animation='fadeIn' duration={600} delay={400}>Already have an account?</Text>
                    <Spinner visible={this.state.isLoading} />
                </View>
            </View>
        );
    }
}