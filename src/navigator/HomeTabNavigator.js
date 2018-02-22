import { TabNavigator, TabBarBottom } from 'react-navigation';
import Home from 'Finder/src/views/home/Home';
import Profile from 'Finder/src/views/profile/Profile';

export default TabNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Profile },
  },
  {
    tabBarOptions: { inactiveTintColor: '#000', }
  }
);