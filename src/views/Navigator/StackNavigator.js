import { StackNavigator } from 'react-navigation';
import Login from 'Finder/src/views/Login/Login';
import Home from 'Finder/src/views/Home/Home';

export default StackNavigator({
    Login: { screen: Login },
    Home: { screen: Home }
});