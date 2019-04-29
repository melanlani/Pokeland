import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Container, Thumbnail, Drawer, Content, Header, Left, Body, Icon, Right, Button, Fab, Title, CardItem, Card, Item, Input, Grid, Col} from 'native-base';
import SideBar from './SideBar';
import { connect } from 'react-redux';
import { getPokemon, getCategories, searchPokemon } from '../redux/actions/pokemons';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      page: 1,
      limit: 10,
      txtSearch: ""
    };
  }

  componentDidMount(){
    this.props.getPokemonDispatch(this.state.page, this.state.limit)
    this.props.getCategoriesDispatch()
  }

  nextPage()  {
      this.props.getPokemonDispatch(this.state.page+1, this.state.limit)
      this.props.getCategoriesDispatch()
  }

  prevPage()  {
      this.props.getPokemonDispatch(this.state.page-1, this.state.limit)
      this.props.getCategoriesDispatch()
  }

  searchPoke()  {
      this.props.searchPokemonDispatch(this.state.txtSearch)
      this.props.getCategoriesDispatch()
  }

  closeDrawer () {
    this._drawer._root.close()
  }
  openDrawer () {
    this._drawer._root.open()
  }

  render() {
    const { pokemons, pending, categories } = this.props;
    if (pending) {
      return(
        <View style={styles.viewPending}>
          <ActivityIndicator color="#E91E63" size="large"  />
        </View>
      )
    }
    else {
      return (

      <Drawer ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => this.closeDrawer()} >

        <Container>
          <Header style={styles.header}>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title style={styles.txtheader}>Pokeland</Title>
            </Body>
            <Right>
            </Right>
          </Header>

          <Content>
            <Card>
              <Item style={{backgroundColor:'#c5d3e8'}}>
                <Input placeholder="Search Pokemon's Name...." onChangeText={(txtSearch) => this.setState({txtSearch})}
                  value={this.state.txtSearch}/>
                <TouchableOpacity onPress={() => this.searchPoke()}>
                  <Icon name="ios-search" />
                </TouchableOpacity>
              </Item>
            </Card>
            <Card >
              <CardItem style={{backgroundColor:'#c5d3e8'}}>
              <Text style={{fontWeight: 'bold', color:'#3a81f7', marginLeft:130, fontSize:16}}>Category</Text>
              </CardItem>
            </Card>

            <Grid>
            <FlatList
              data={categories}
              numColumns={3}
              renderItem={({item}) =>(

                  <Col style={{ height: 75 }}>

                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('PokemonCategory', {
                      id: item.id
                    })}}>
                    <Card>
                    <Image source={require('./assets/pokemon/icon1.jpg')} style={styles.banner}/>
                    <Text style={{marginLeft:35, color: 'black'}}>{item.name_category}</Text>
                    </Card>
                    </TouchableOpacity>
                  </Col>
              )}
            keyExtractor={(item, index) => index.toString()}
            />

            </Grid>

            <Card>
              <CardItem style={{backgroundColor:'#c5d3e8'}}>
              <Text style={{fontWeight: 'bold', color:'#3a81f7', marginLeft:120, fontSize:16}}>All Pokemon</Text>
              </CardItem>
            </Card>
            <FlatList
              data={pokemons}
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
                  </Card>
                </TouchableOpacity>
              )}
            keyExtractor={(item, index) => index.toString()}
            />
            <Card>
              <CardItem style={{backgroundColor:'#c5d3e8'}}>
                <TouchableOpacity onPress={() => this.nextPage()}>
                <Text style={{fontWeight: 'bold', color:'#3a81f7', marginLeft:140, fontSize:16}}>More</Text>
                </TouchableOpacity>
              </CardItem>
            </Card>
            <Card>
              <CardItem style={{backgroundColor:'#c5d3e8'}}>
                <TouchableOpacity onPress={() => this.prevPage()}>
                <Text style={{fontWeight: 'bold', color:'#3a81f7', marginLeft:140, fontSize:16}}>Back</Text>
                </TouchableOpacity>
              </CardItem>
            </Card>
          </Content>

          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#3a81f7' }}
            position="bottomRight"
            onPress={() => {this.props.navigation.navigate('InputPokemon')}}>
              <Icon name="plus" type="FontAwesome" />
          </Fab>
        </Container>

      </Drawer>
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
  },
  prodImage: {
    height: 150,
    width: 175
  }

});

const mapStateToProps = state => ({
  pokemons : state.pokemons.pokemons,
  pending : state.pokemons.pending,
  categories : state.pokemons.categories
})

const mapDispatchToProps = dispatch => {
  return {
    getPokemonDispatch: (page, limit) => {
    dispatch(getPokemon(page, limit))
    },
    getCategoriesDispatch: () => {
      dispatch(getCategories())
    },
    searchPokemonDispatch: (txtSearch) => {
      dispatch(searchPokemon(txtSearch))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
