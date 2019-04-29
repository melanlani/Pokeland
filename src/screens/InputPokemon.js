import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button,
  Icon, Title, CardItem, Card, Item, Input, Form, Picker, ListItem, CheckBox, Thumbnail, Toast} from 'native-base';
import { getData, removeData } from './storage';
import { connect } from 'react-redux';
import { getUserData, dropUser } from '../redux/actions/accounts';

class InputPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "3",
      checked: false
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  componentDidMount() {

    this.props.navigation.addListener('didFocus', () => {
      if (this.props.loggedIn === false) {
          this.props.navigation.navigate('Login')
      }
      else {
          this.checkToken();
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
      'Apakah yakin ingin keluar?',
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

  render() {
    const { id, username, email, foto} = this.props.user

    return (
      <Container>
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
            <Text style={styles.txtsubtitle}>Add Pokemon</Text>
          </CardItem>
          <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16, marginTop:12}}>Name</Text>
          <CardItem>
            <Item rounded style={{height:40, width:318, backgroundColor:'#c5d3e8'}}>
              <Input placeholder='Pokemon Name'/>
            </Item>
          </CardItem>
          <CardItem>
            <Item rounded style={{height:40, width:318, backgroundColor:'#c5d3e8'}}>
              <Input placeholder='Pokemon Url Foto'/>
            </Item>
          </CardItem>
            <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16}}>Category</Text>
          <CardItem>
            <Form style={{width:320, backgroundColor:'#c5d3e8'}}>
              <Picker
                mode="dropdown"
                iosHeader="Select your Category"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Dragon" value="1" />
                <Picker.Item label="Seed" value="2" />
                <Picker.Item label="Duck" value="3" />
              </Picker>
          </Form>
          </CardItem>
            <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16}}>Tipe</Text>
            <ListItem>
              <CheckBox checked={true} />
              <Body>
                <Text>Normal</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} />
              <Body>
                <Text>Fighting</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} color="green"/>
              <Body>
                <Text>Flying</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} color="green"/>
              <Body>
                <Text>Poison</Text>
              </Body>
            </ListItem>
          <CardItem>

          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Button active style={styles.btnCart}
            onPress={() => {this.props.navigation.navigate("Home")}}>
              <Text style={styles.txtBtnCart}>Save</Text>
            </Button>
          </CardItem>
        </Card>

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
  header: {
    backgroundColor: '#f76710',
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
  pending: state.accounts.pending
})

const mapDispatchToProps = dispatch => {
  return {
    getUserDataDispatch: (token) => {
      dispatch(getUserData(token))
    },
    dropUserDispatch: () => {
      dispatch(dropUser())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputPokemon);
