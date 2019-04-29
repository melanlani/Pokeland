import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Item, Input, Thumbnail} from 'native-base';

class Register extends Component {


  render() {

    return (

      <Container>
        <Content>

          <Item style={styles.sizeItem}>
            <Input placeholder="Email"/>
          </Item>
          <Item style={styles.sizeItem}>
            <Input placeholder="Username"/>
          </Item>
          <Item style={styles.sizeItem}>
            <Input placeholder="Password" secureTextEntry={true}/>
          </Item>
          <CardItem>
          <Item style={styles.sizeItemm}>
            <Left>
              <Text style={styles.txtlabel}>Foto</Text>
            </Left>
            <Button style={styles.btnUpload} >
              <Text style={styles.txtUpload}>Upload</Text>
            </Button>
          </Item >
          </CardItem>
          <Button style={styles.btnLogin} onPress={() => {this.props.navigation.navigate('ButtomNav')}}>
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

export default Register;
