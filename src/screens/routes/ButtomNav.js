import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Icon } from 'native-base';

import Home from '../Home'
import InputRecipes from '../InputRecipes'
import Profile from '../Profile'

export const ButtomNav = createBottomTabNavigator({

  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: <Icon name="home" style={{ color: "#f76710"}}/>
    }
  },

  InputRecipes: {
    screen: InputRecipes,
    navigationOptions: {
      tabBarIcon: <Icon name="plus-circle" type="FontAwesome" style={{ color: "#f76710"}}/>
    }
  },

  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: <Icon name="person" style={{ color: "#f76710"}}/>
    }
  }

});

export default createAppContainer(ButtomNav);
