import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Item, Input, Toast} from 'native-base';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/accounts';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "lani@gm.com",
      password: "123",
      showToast: false
    };
  }

  login = () => {
    this.props.loginUserDispatch(this.state.email, this.state.password)
    if (this.props.pending == false) {
      Toast.show({
        text: "Selamat Datang",
        buttonText: "Okay",
        duration: 1500,
        type: "dark"
      })
      this.props.navigation.navigate('InputPokemon')
    }
  }

  render() {
    
    return (

      <Container>
        <Content>
          <Image source={require('./assets/pokemon/logo.png')} style={styles.banner}/>
          <Item style={styles.sizeItem}>
            <Input placeholder="Email" onChangeText={(email) => this.setState({email})}
              value={this.state.email}/>
          </Item>
          <Item style={styles.sizeItem}>
            <Input placeholder="Password" secureTextEntry={true} onChangeText={(password) => this.setState({password})}
              value={this.state.password} />
          </Item>
          <Button style={styles.btnLogin} onPress={() => this.login()}>
            <Text style={styles.txtlogin}>Masuk</Text>
          </Button>
          <CardItem>
            <Left>
            </Left>
            <Right>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Register')}}>
                <Text style={styles.txtdaftar}>Buat Akun</Text>
              </TouchableOpacity >
            </Right>
          </CardItem>
        </Content>
      </Container>

    );

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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  banner: {
    height: 200,
    width: 205,
    marginTop: 90,
    marginLeft: 80
  },
  sizeItem: {
    marginTop: 20,
    marginLeft: 20,
    width:320
  },
  btnDaftar: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a81f7',
    marginLeft: 40,
    marginTop: 20
  },
  btnLogin: {
    width:321,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a81f7',
    marginTop: 20,
    marginLeft: 20
  },
  txtlogin: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginLeft: 4
  },
  txtdaftar: {
    fontSize: 14,
    color: '#3a81f7'
  }

});

const mapStateToProps = state => ({
    loggedIn: state.accounts.loggedIn,
    user: state.accounts.user,
    pending: state.accounts.pending,
})

const mapDispatchToProps = dispatch => {
  return {
    loginUserDispatch: (email, password) => {
    dispatch(loginUser(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
