import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Toast, Item, Input, Thumbnail} from 'native-base';
import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/accounts';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'testes',
      email: 'tes@gmail.com',
      password:'123'
    }
  }

  register = () => {
    this.props.registerUserDispatch(this.state.username,this.state.email,this.state.password)
    if (this.props.pending == false) {
      Toast.show({
        text: "Selamat Datang",
        buttonText: "Okay",
        duration: 1500,
        type: "dark"
      })
      this.props.navigation.navigate('Home')
    }
  }

  render() {

    return (
      <Container>
        <Content>

          <Item style={styles.sizeItem}>
            <Input placeholder="Email" onChangeText={(email) => this.setState({email})}
              value={this.state.email} />
          </Item>
          <Item style={styles.sizeItem}>
            <Input placeholder="Username" onChangeText={(username) => this.setState({username})}
              value={this.state.username}/>
          </Item>
          <Item style={styles.sizeItem}>
            <Input placeholder="Password" secureTextEntry={true} onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>
          </Item>
          <Button style={styles.btnLogin} onPress={() => this.register()}>
            <Text style={styles.txtlogin}>Daftar</Text>
          </Button>
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
  sizeItem: {
    marginTop: 20,
    marginLeft: 20,
    width:320
  },
  sizeItemm: {
    marginTop: 20,
    marginLeft: 6,
    width:320
  },
  txtlabel: {
    fontSize:16,
    color: '#4c4646',
    marginBottom: 10
  },
  btnUpload: {
    width:100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    marginBottom: 20

  },
  txtUpload: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
    marginLeft: 4
  },
  txtFoto: {
    marginLeft: 20,
    marginTop: 20,
  }

});

const mapStateToProps = state => ({
    loggedIn: state.accounts.loggedIn,
    user: state.accounts.user,
    pending: state.accounts.pending,
})

const mapDispatchToProps = dispatch => {
  return {
    registerUserDispatch: (username,email,password) => {
    dispatch(registerUser(username,email,password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
