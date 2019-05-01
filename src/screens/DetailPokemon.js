import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Spinner, Thumbnail } from 'native-base';

import { connect } from 'react-redux';
import { getPokemon, detailPoke, searchPokemon } from '../redux/actions/pokemons';

import MapView, { Marker } from 'react-native-maps';

class DetailPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeMaps: {
          latitude: -6.301882,
          longitude: 106.734981,
          latitudeDelta: 0.0123,
          longitudeDelta: 0.0123
      },
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
        const id = this.props.navigation.getParam('id', '');
        this.props.detailPokeDispatch(id);
    })
  }

  render() {
    const { pokemon, pending} = this.props;
    if (pending) {
      return(
        <View style={styles.viewPending}>
          <ActivityIndicator color="#E91E63" size="large"  />
        </View>
      )
    }
    else {
      return (

      <Container>
        <Content>
        <FlatList
          data={pokemon}
          renderItem={({item}) =>(
              <Card>
                <CardItem>
                  <Left>
                    <Body>
                      <Text style={styles.txttitle}>{item.name_poke}</Text>
                      <Text style={{fontWeight:'bold'}}>Category: {item.category.name_category}</Text>
                    </Body>
                  </Left>
                </CardItem>
              <CardItem cardBody>
                <Image source={{ uri: item.image_poke }} style={{height: 300, width: '100%',resizeMode: 'contain'}}/>
              </CardItem>
                <Card>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text style={{fontWeight:'bold'}}>Type:</Text>
                        <FlatList
                          numColumns={5}
                          data={item.types}
                          renderItem={({ item }) => (
                            <Text style={{color:'#3a81f7'}}>{item.name_type} </Text>
                          )}
                          keyExtractor={(item, index) => String(item.id)}
                        />
                      </Body>
                    </Left>
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
                        coordinate={{
                          latitude: parseFloat(item.latitude),
                          longitude: parseFloat(item.longitude)
                        }}
                        title={item.name_poke}
                    ><Image source={{ uri: item.image_poke }} style={{ width: 40, height: 40 }} /></MapView.Marker>
                  </MapView>
                </Card>
              </Card>
          )}
        keyExtractor={(item, index) => index.toString()}
        />
        </Content>
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
  txttitle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3a81f7'
  },
  txtbagan: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#3a81f7'
  },
  txtuser: {
    fontSize: 11
  },
  sizeImage: {
    height: 400,
    width: null,
    flex: 1
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
  pokemon : state.pokemons.pokemon,
  pending : state.pokemons.pending,
  categories : state.pokemons.categories
})

const mapDispatchToProps = dispatch => {
  return {
    detailPokeDispatch: (id) => {
      dispatch(detailPoke(id))
    },
    searchPokemonDispatch: (txtSearch) => {
      dispatch(searchPokemon(txtSearch))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPokemon);
