import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button,
  Icon, Title, CardItem, Card, Item, Input, Form, Picker, ListItem, CheckBox, Thumbnail, Toast} from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import MapView, { Marker } from 'react-native-maps';
import { getData, removeData } from './storage';
import { connect } from 'react-redux';
import { getTypes, savePokemon } from '../redux/actions/pokemons';
class InputPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeMaps: {
                latitude: -6.298619197375721,
                longitude: 106.7357749119401,
                latitudeDelta: 0.0100,
                longitudeDelta: 0.0100
                },
      category: "1",
      selectedItems: [],
      name_poke: 'Ekans',
      image_poke: 'https://cdn.bulbagarden.net/upload/f/fa/023Ekans.png',
      latitude: '-6.298619197375721',
      longitude: '106.7357749119401',
    }
  }

  onValueChange(value: string) {
    this.setState({
      category: value
    });
  }

  onSelectedItemsChange = selectedItems => {

          alert(JSON.stringify(selectedItems));
    this.setState({ selectedItems });
  };

  onMarkerPress(mkr) {
    Alert.alert(`Coordinate`,`${JSON.stringify(mkr.nativeEvent.coordinate)}`);
    this.setState({
        latitude: mkr.nativeEvent.coordinate.latitude,
        longitude: mkr.nativeEvent.coordinate.longitude,
    })
  }
  componentDidMount() {
    this.props.getTypesDispatch();
  }

  savePokemon = () => {
    this.props.savePokemonDispatch(this.state.category, this.state.selectedItems, this.state.name_poke, this.state.image_poke, this.state.latitude, this.state.longitude)
      Toast.show({
        text: 'New Pokemon added',
        duration: 1500
      })
      this.props.navigation.navigate('Profile')
  }

  render() {

    return (
      <Container>
      <Content>
        <Card>
          <CardItem header bordered>
            <Text style={styles.txtsubtitle}>Add Pokemon</Text>
          </CardItem>
          <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16, marginTop:12}}>Name</Text>
          <CardItem>
            <Item rounded style={{height:40, width:318, backgroundColor:'#c5d3e8'}}>
              <Input placeholder='Pokemon Name' onChangeText={(name_poke) => this.setState({name_poke})}
                value={this.state.name_poke}/>
            </Item>
          </CardItem>
          <CardItem>
            <Item rounded style={{height:40, width:318, backgroundColor:'#c5d3e8'}}>
              <Input placeholder='Pokemon Url Foto' onChangeText={(image_poke) => this.setState({image_poke})}
                value={this.state.image_poke}/>
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
                selectedValue={this.state.category}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Dragon" value="1" />
                <Picker.Item label="Seed" value="2" />
                <Picker.Item label="Duck" value="3" />
              </Picker>
          </Form>
          </CardItem>
            <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16}}>Tipe</Text>
            <CardItem>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'stretch' }}>
            <MultiSelect
              hideTags
              items={this.props.types}
              uniqueKey="id"
              ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={ (text)=> console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name_type"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
            </View>
            </CardItem>
        </Card>
        <Card>
          <Text style={styles.txtLocation}>Location</Text>
          <MapView
            style={{ width: '100%', height: 300 }}
            region={this.state.pokeMaps}
          >
            <MapView.Marker
              draggable
              coordinate={this.state.pokeMaps}
              onDragEnd={this.onMarkerPress.bind(this)}
            />
          </MapView>
        </Card>

        <Card>
          <CardItem>
            <Button active style={styles.btnCart}
            onPress={() => this.savePokemon()}>
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
  },
  txtLocation: {
    marginLeft:18,
    fontWeight:'bold',
    color:'#3a81f7',
    fontSize:16,
    marginBottom:12,
    marginTop:12
  }

});

const mapStateToProps = state => ({
  pending: state.pokemons.pending,
  types: state.pokemons.types
})

const mapDispatchToProps = dispatch => {
  return {
    getTypesDispatch: () => {
      dispatch(getTypes())
    },
    savePokemonDispatch: (category, selectedItems, name_poke, image_poke, latitude, longitude) => {
      dispatch(savePokemon(category, selectedItems, name_poke, image_poke, latitude, longitude))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputPokemon);
