import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 20
    },
    headerContainer: {
        padding: 30,
        paddingTop: 40,
        alignItems: 'center'
    },
    avatar: {
        borderWidth: 2,
        borderColor: 'white'
    },
    editAvatar: {
        marginTop: -50,
        marginRight: -90
    },
    userNameText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    userContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    districtText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    }
})