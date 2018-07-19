/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View, Image, Dimensions, FlatList} from 'react-native';

const width = Dimensions.get('screen').width;

const fotos = [
  {id: "1", usuario: 'Edgar'},
  {id: "2", usuario: 'Xucrute'},
  {id: "3", usuario: 'Peidorrino'},
  {id: "4", usuario: 'Mestre Peidão'}
]

export default class App extends Component {
  render() {
    return (
      <FlatList 
        data={fotos}
        keyExtractor={ item => item.id }
        renderItem={({item}) =>
          <View>
            <Text>{item.usuario}</Text>
            <Image 
              source={require('./resources/img/foto.jpg')} 
              style={
                {
                  width: width, 
                  height: width
                }
              } />
          </View>
        }
        
      />
    );
  }
}
