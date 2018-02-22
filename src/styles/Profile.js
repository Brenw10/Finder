import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        padding: 30,
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: '#21b798'
    },
    profileImage: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bodyContainer: {
        flex: 3
    },
    avatar: {
        marginRight: -15
    },
    editAvatar: {
        marginLeft: -40,
        marginBottom: -90
    },
    userNameText: {
        color: 'white',
        fontSize: 20,
        // fontWeight: 'bold'
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
        fontWeight: '600',
        textAlign: 'center'
    }
})