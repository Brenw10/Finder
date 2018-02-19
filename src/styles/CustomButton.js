import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    button: {
        height: 42,
        borderWidth: 1,
        borderRadius: 3,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    text: {
        textAlign: 'center',
        fontWeight: '400',
        color: 'white'
    },
    disabledButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    disabledText: {
        color: 'rgba(0, 0, 0, 0.3)'
    }
})