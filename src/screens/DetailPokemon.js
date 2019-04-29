import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Spinner, Thumbnail } from 'native-base';

import { connect } from 'react-redux';
import { getPokemon, detailPoke, searchPokemon } from '../redux/actions/pokemons';

class DetailPokemon extends Component {

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
        const id = this.props.navigation.getParam('id', '');
        this.props.detailPokeDispatch(id);
    })
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
        <Content>
        <FlatList
          data={pokemons}
          renderItem={({item}) =>(
              <Card>
                <CardItem>
                  <Left>
                    <Body>
                      <Text style={styles.txttitle}>{item.name_poke}</Text>
                      <Text note>Category: {item.category.name_category}</Text>
                    </Body>
                  </Left>
                </CardItem>
              <CardItem cardBody>
                <Image source={{ uri: item.image_poke }} style={{height: 300, width: null, flex: 1}}/>
              </CardItem>
                <Card>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text style={{fontWeight:'bold'}}>Type:</Text>
                        <FlatList
                          data={item.types}
                          renderItem={({ item }) => (
                              <Text note>{item.name_type}</Text>
                          )}
                          keyExtractor={(item, index) => String(item.id)}
                        />
                      </Body>
                    </Left>
                  </CardItem>
                </Card>

                <Card style={{height:250}}>
                  <CardItem header bordered >
                    <Left>
                      <Text style={styles.txtbagan}>Maps</Text>
                    </Left>
                  </CardItem>
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
    color: '#062e56'
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
    detailPokeDispatch: (id) => {
      dispatch(detailPoke(id))
    },
    searchPokemonDispatch: (txtSearch) => {
      dispatch(searchPokemon(txtSearch))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPokemon);
