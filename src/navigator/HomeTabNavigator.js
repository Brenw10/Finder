import { TabNavigator, TabBarBottom } from 'react-navigation';
import Home from 'Finder/src/views/home/Home';
import PhotoUpload from 'Finder/src/views/profile/PhotoUpload';

export default TabNavigator(
  {
    Home: { screen: Home },
    PhotoUpload: { screen: PhotoUpload },
  },
  {
    tabBarOptions: { inactiveTintColor: '#000', }
  }
);