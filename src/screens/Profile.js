import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button,
  Icon, Title, CardItem, Card, Footer, FooterTab, Thumbnail, Toast} from 'native-base';
import { getData, removeData } from './storage';
import { connect } from 'react-redux';
import { getUserData, dropUser} from '../redux/actions/accounts';
import { getAllPokemon, deleteItem} from '../redux/actions/pokemons';

class Profile extends Component {

  componentDidMount() {

    this.props.navigation.addListener('didFocus', () => {
      if (this.props.loggedIn === false) {
        this.props.navigation.navigate('Login')
      }
      else {
          this.checkToken();
          this.props.getAllPokemonDispatch();
      }
    })
  }

  checkToken = async () => {
    const token = await getData('token')
    if (token) {
        this.props.getUserDataDispatch(token);
    }
  }

  logout() {
    Alert.alert(
      'Are you sure you want to logout?',
      '',
      [
        {
            text: 'Batal',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        { text: 'Ok', onPress: () =>
          {
            this.props.dropUserDispatch()
            removeData('token')
            this.props.navigation.navigate('Home')
            Toast.show({
              text: "See you...",
              buttonText: "Okay",
              duration: 1500,
              type: "dark"
            })
          }
        },
      ],
      { cancelable: false },
    );
  }

  deleteItem(id) {
    Alert.alert(
      'Are you sure to delete item?','',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () =>
          {
            this.props.deleteItemDispatch(id);
            this.props.getAllPokemonDispatch();
          }
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    const { id, username, email, foto} = this.props.user
    const { pokemons } = this.props
    if (this.props.pending) {
      return(
        <View style={styles.viewPending}>
          <ActivityIndicator color="#E91E63" size="large"  />
        </View>
      )
    }
    else {
      return (
      <Container>
      <Header style={styles.header}>
        <Left>
        </Left>
        <Body>
          <Title style={styles.txtheader}>Pokeland</Title>
        </Body>
        <Right>
        </Right>
      </Header>
      <Content>
        <Card style={{flex: 0}}>
          <CardItem header bordered>
            <Text style={styles.txttitle}>Profile</Text>
          </CardItem>
          <CardItem >
            <Left>
              <Thumbnail circle large source={{ uri: foto }} />
            </Left>
            <Body>
              <Text style={styles.txtname}>{username}</Text>
              <Text style={styles.txtemail}>{email}</Text>
            </Body>
            <Right>
              <Button style={styles.btnLogout} onPress={() => this.logout()}>
                <Text style={styles.txtlogout}>Logout</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text style={styles.txtsubtitle}>Pokemon List</Text>
          </CardItem>

              <FlatList
                data={pokemons}
                renderItem={({item}) =>(
                  <CardItem >
                    <Left>
                      <Thumbnail source={{uri: item.image_poke}} />
                      <Body>
                        <Text style={styles.txtresep}>{item.name_poke}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Button transparent small style={styles.btnDelete} onPress={() => this.deleteItem(item.id)} >
                        <Icon name="close" style={{color:'#3a81f7'}}/>
                      </Button>
                    </Right>
                  </CardItem>
                )}
              keyExtractor={(item, index) => index.toString()}
              />
        </Card>

      </Content>
      <Footer>
        <FooterTab>
          <Button style={{backgroundColor:'#3a81f7'}} onPress={() => {this.props.navigation.navigate("Home")}}>
            <Icon name="home" type="FontAwesome"/>
          </Button>
          <Button style={{backgroundColor:'#3a81f7'}} onPress={() => {this.props.navigation.navigate("InputPokemon")}}>
            <Icon name="plus" type="FontAwesome"/>
          </Button>
        </FooterTab>
      </Footer>
      </Container>
    );
    }
  }
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  header: {
    backgroundColor: '#3a81f7',
  },
  txtheader: {
    fontSize: 22,
    marginLeft:57
  },
  iconPosition: {
    marginLeft:150,
    marginTop:13,
    color: "#3a81f7"
  },
  txtBtnCart: {
    left:150,
    color:'white'
  },
  btnCart: {
    width:321,
    backgroundColor:'#3a81f7'
  },
  txtname:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#062e56'
  },
  txtemail:{
    fontSize: 10
  },
  txttitle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3a81f7'
  },
  txtsubtitle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3a81f7',
    marginLeft:100
  },
  txtlogout: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
    marginLeft: 4
  },
  btnLogout: {
    backgroundColor: '#3a81f7',
    width:49,
    height:40,
    marginBottom: 35
  }

});

const mapStateToProps = state => ({
  loggedIn: state.accounts.loggedIn,
  user: state.accounts.user,
  token: state.accounts.access_token,
  pending: state.pokemons.pending,
  pokemons: state.pokemons.pokemons
})

const mapDispatchToProps = dispatch => {
  return {
    getUserDataDispatch: (token) => {
      dispatch(getUserData(token))
    },
    dropUserDispatch: () => {
      dispatch(dropUser())
    },
    getAllPokemonDispatch: () => {
      dispatch(getAllPokemon())
    },
    deleteItemDispatch: (id) => {
      dispatch(deleteItem(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
