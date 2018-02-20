import { StackNavigator } from 'react-navigation';
import Login from 'Finder/src/views/login/Login';
import HomeTabNavigator from 'Finder/src/navigator/HomeTabNavigator';

export default StackNavigator({
    Login: { screen: Login },
    HomeTabNavigator: { screen: HomeTabNavigator }
});