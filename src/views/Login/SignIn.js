import React, { Component } from 'react';
import styles from 'Finder/src/styles/SignIn';
import CustomTextInput from 'Finder/src/components/CustomTextInput';
import CustomButton from 'Finder/src/components/CustomButton';
import { Text, View } from 'react-native-animatable';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';

export default class SignIn extends Component {
    static propTypes = {
        loadRegister: PropTypes.func.isRequired,
        success: PropTypes.func.isRequired,
        toggleAlert: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            email: __DEV__ ? 'app@app.com' : null,
            password: __DEV__ ? '123456' : null,
            isLoading: false
        };
    }
    login(email, password) {
        this.setState({ isLoading: true });
        firebase
            .auth()
            .signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(() => { this.setState({ isLoading: false }); this.props.success(); })
            .catch(() => { this.setState({ isLoading: false }); this.props.toggleAlert(true); });
    }
    async loadRegister() {
        await this.submitRef.zoomOut(200);
        await this.containerRef.fadeOut(300);
        this.props.loadRegister();
    }
    render() {
        return (
            <View ref={ref => this.containerRef = ref}>
                <View style={styles.form}>
                    <View style={styles.margin}>
                        <CustomTextInput placeholder='E-mail' value={this.state.email}
                            onChangeText={email => this.setState({ email })} />
                    </View>
                    <View style={styles.margin}>
                        <CustomTextInput placeholder='Password' secureTextEntry={true} value={this.state.password}
                            onChangeText={password => this.setState({ password })} />
                    </View>
                    <View style={styles.margin} ref={ref => this.submitRef = ref} animation='bounceIn' duration={600} delay={400}>
                        <CustomButton text='Log In'
                            onPress={() => this.login(this.state.email, this.state.password)}
                            buttonStyle={styles.loginButton}
                            textStyle={styles.loginButtonText}
                        />
                    </View>
                    <Text style={styles.loginLink} onPress={() => this.loadRegister()}
                        animation='fadeIn' duration={600} delay={400}>Not registered yet?</Text>
                </View>
                <Spinner visible={this.state.isLoading} />
            </View>
        );
    }
}