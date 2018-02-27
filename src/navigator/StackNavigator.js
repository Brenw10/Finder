import { StackNavigator } from 'react-navigation';
import Login from 'Finder/src/views/login/Login';
import Home from 'Finder/src/views/home/Home';
import Profile from 'Finder/src/views/profile/Profile';

export default StackNavigator({
    Login: { screen: Login },
    Home: { screen: Home },
    UserProfile: { screen: Profile }
});