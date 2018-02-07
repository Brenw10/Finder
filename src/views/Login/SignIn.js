import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from 'Finder/src/styles/SignIn';
import CustomTextInput from 'Finder/src/components/CustomTextInput';
import CustomButton from 'Finder/src/components/CustomButton';
import { View } from 'react-native-animatable';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    render() {
        return (
            <View style={styles.container} animation='slideInUp'>
                <View style={styles.form}>
                    <View style={styles.margin}>
                        <CustomTextInput placeholder='E-mail' onChangeText={email => this.setState({ email })} />
                    </View>
                    <View style={styles.margin}>
                        <CustomTextInput placeholder='Password' secureTextEntry={true}
                            onChangeText={password => this.setState({ password })} />
                    </View>
                    <View style={styles.margin} animation='bounceIn' duration={600} delay={400}>
                        <CustomButton text='Log In'
                            onPress={() => this.login(this.state.email, this.state.password)}
                            buttonStyle={styles.loginButton}
                            textStyle={styles.loginButtonText}
                        />
                    </View>
                </View>
                <Spinner visible={this.state.isLoading} />
            </View>
        );
    }
}