import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30
    },
    loginButton: {
        backgroundColor: '#1976D2'
    },
    registerButton: {
        backgroundColor: '#9B9FA4'
    },
    separatorLine: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        height: StyleSheet.hairlineWidth,
        borderColor: '#9B9FA4'
    },
    separatorOr: {
        color: '#9B9FA4',
        marginHorizontal: 8
    },
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20
    }
})