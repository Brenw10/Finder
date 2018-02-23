import { StackNavigator } from 'react-navigation';
import Login from 'Finder/src/views/login/Login';
import HomeTabNavigator from 'Finder/src/navigator/HomeTabNavigator';
import Profile from 'Finder/src/views/profile/Profile';

export default StackNavigator({
    Login: { screen: Login },
    HomeTabNavigator: { screen: HomeTabNavigator },
    UserProfile: { screen: Profile }
});