import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        padding: 30,
        paddingTop: 40,
        alignItems: 'center',
        backgroundColor: '#2e3e4f'
    },
    avatar: {
        borderWidth: 2,
        borderColor: 'white',
        width: 150,
        height: 150,
        borderRadius: 75
    },
    editAvatar: {
        marginTop: -50,
        marginRight: -100
    },
    userNameText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'Rubik-Regular'
    },
    userContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    locationContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5
    },
    districtText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Rubik-Regular',
    },
    backButton: {
        position: 'absolute',
        marginTop: 35,
        marginLeft: 20
    }
})