import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Spinner, Thumbnail, Footer, FooterTab } from 'native-base';

import { connect } from 'react-redux';
import { getAllPokemon } from '../redux/actions/pokemons';

import MapView, { Marker } from 'react-native-maps';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
                  pokeMaps: {
                      latitude: -6.301882,
                      longitude: 106.734981,
                      latitudeDelta: 0.0100,
                      longitudeDelta: 0.0100
                  },
                }
  }

  componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.props.getAllPokemonDispatch()
        })
    }

  renderMaps(){
    let result = []
    Object.keys(this.props.pokemons).forEach(val => {
      if (val < Object.keys(this.props.pokemons).length - 1) {
          result.push(this.props.pokemons[val])
      }
    })
    return result
  }

  render() {
    const { pokemons, pending} = this.props;
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
            <Header style={styles.header}>
              <Left>
              </Left>
                <Title style={styles.txtheader}>Pokeland</Title>
              <Right>
              </Right>
            </Header>
            <Content>
            <Card style={{flex: 0}}>
              <CardItem header bordered style={{backgroundColor:'#c5d3e8'}}>
                <Text style={styles.txttitle}>Pokeland Maps</Text>
              </CardItem>
            </Card>
            <View style={styles.container}>
              {this.props.pokemons &&
                <MapView
                style={{ width: '100%', height: 700 }}
                showsUserLocation={true}
                region={this.state.pokeMaps}
                >

                { this.renderMaps().map(item => (
                  <MapView.Marker
                    key={item.id}
                    coordinate={{ latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude) }}
                    title={item.name_poke}
                    onPress={() => this.props.navigation.navigate('DetailPokemon', {
                        id: item.id
                    })}
                  ><Image source={{ uri: item.image_poke }} style={{ width: 40, height: 40 }} />
                  </MapView.Marker>
                  ))
                }
                </MapView>
              }
            </View>
          </Content>

          <Footer>
            <FooterTab>
              <Button style={{backgroundColor:'#3a81f7'}} onPress={() => {this.props.navigation.navigate("Home")}}>
                <Icon name="home" type="FontAwesome"/>
              </Button>
            </FooterTab>
          </Footer>
          </Container>
        )
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
    marginLeft:75,
    marginTop:12
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
  }

});

const mapStateToProps = state => ({
  pokemons : state.pokemons.pokemons,
  pending : state.pokemons.pending,
  categories : state.pokemons.categories
})

const mapDispatchToProps = dispatch => {
  return {
    getAllPokemonDispatch: () => {
      dispatch(getAllPokemon())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
