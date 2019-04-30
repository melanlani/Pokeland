import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Icon, Root } from 'native-base';
import { Provider } from 'react-redux';
import store from './src/redux/store';

import Home from './src/screens//Home'
import InputPokemon from './src/screens/InputPokemon'
import Profile from './src/screens/Profile'
import Map from './src/screens/Map'
import DetailPokemon from './src/screens/DetailPokemon'
import PokemonCategory from './src/screens/PokemonCategory'
import Login from './src/screens/Login'
import Register from './src/screens/Register'

const MainNavigator = createStackNavigator(
  {

  Home: {
    screen: Home,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    }
  },

  DetailPokemon : {
    screen: DetailPokemon,
    headerMode: '',
    navigationOptions: {
      title: 'Detail Pokemon',
      headerStyle: {
        backgroundColor: '#3a81f7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },

  PokemonCategory : {
    screen: PokemonCategory,
    headerMode: '',
    navigationOptions: {
      title: 'Pokemon Category',
      headerStyle: {
        backgroundColor: '#3a81f7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },

  InputPokemon : {
    screen: InputPokemon,
    headerMode: '',
    navigationOptions: {
      title: 'Input Pokemon',
      headerStyle: {
        backgroundColor: '#3a81f7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },

  Profile: {
    screen: Profile,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    }
  },

  Login: {
    screen: Login,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    }
  },

  Map: {
    screen: Map,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    }
  },

  Register : {
    screen: Register,
    headerMode: '',
    navigationOptions: {
      title: 'Register Page',
      headerStyle: {
        backgroundColor: '#3a81f7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
},

  {
   initialRouteName: 'Home'
  }
)



const AppContainer  = createAppContainer(MainNavigator);


type Props = {};
export default class App extends Component<Props> {
  render(){
    return(

      <Provider store={store}>
        {/* {children} */}
        <Root>
       <AppContainer  />
       </Root>
      </Provider>

    );
  }

}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
