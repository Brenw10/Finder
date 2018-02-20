import { StackNavigator } from 'react-navigation';
import Login from 'Finder/src/views/login/Login';
import Home from 'Finder/src/views/home/Home';

export default StackNavigator({
    Login: { screen: Login },
    Home: { screen: Home }
});