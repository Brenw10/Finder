import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        marginTop: 2,
        marginBottom: 10
    },
    textInputWrapper: {
        height: 42,
        marginBottom: 2,
        borderBottomWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)'
    },
    textInput: {
        flex: 1,
        color: 'white',
        height: 42,
        padding: 7
    },
    textInputWrapperFocused: {
        borderColor: 'white'
    }
})