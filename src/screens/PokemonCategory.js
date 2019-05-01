import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Container, Thumbnail, Content, Header, Left, Body, Icon, Right, Button, Fab, Title, CardItem, Card, Item, Input, Grid, Col} from 'native-base';
import { connect } from 'react-redux';
import { detailPoke, getCategoriesPoke } from '../redux/actions/pokemons';
class PokemonCategory extends Component {

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
        const id = this.props.navigation.getParam('id', '');
        this.props.getCategoriesPokeDispatch(id);
    })
  }
  render() {
    const { pokemon, pending } = this.props;
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

                <TouchableOpacity onPress={() => {this.props.navigation.navigate('DetailPokemon', {
                  id: item.id
                })}}>
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
                              numColumns={5}
                              data={item.types}
                              renderItem={({ item }) => (
                                  <Text note>{item.name_type} </Text>
                              )}
                              keyExtractor={(item, index) => String(item.id)}
                            />
                          </Body>
                        </Left>
                      </CardItem>
                    </Card>
                  </Card>
                </TouchableOpacity>
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
  header: {
    backgroundColor: '#3a81f7',
  },
  banner: {
    height: 50,
    width: '100%',
    resizeMode: 'contain'
  },
  txttitle:{
    fontWeight: 'bold',
    fontSize: 19,
    color: '#062e56'
  },
  txtheader: {
    fontSize: 22,
    marginLeft:57
  }

});

const mapStateToProps = state => ({
  pokemon : state.pokemons.pokemon,
  pending : state.pokemons.pending,
})

const mapDispatchToProps = dispatch => {
  return {
    getCategoriesPokeDispatch: (id) => {
      dispatch(getCategoriesPoke(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCategory);
