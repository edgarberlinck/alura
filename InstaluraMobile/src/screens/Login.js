import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Login extends Component {
    constructor () {
        super();
        this.state = {
            usuario: ''
            ,senha: ''
            ,mensagem: ''
            ,loading: false
        }
    }
    logar () {
        this.setState({loading: true, mensagem: ''});
        const uri = 'https://instalura-api.herokuapp.com/api/public/login';
        const requestInfo = {
            method: 'POST'
            ,body: JSON.stringify({
                login: this.state.usuario
                ,senha: this.state.senha
            })
            ,headers: new Headers({
                'Content-type': 'application/json'
            })
        }
        
        fetch(uri, requestInfo)
            .then(response => {
                this.setState({loading: false});
                if (response.ok)
                    return response.text();
                throw new Error('Não foi possível eferuar o login.');
            })
            .then(token => {
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('usuario', this.state.usuario)
            })
            .catch(e => {
                this.setState({
                    mensagem: e.message
                })
            })
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Instalura</Text>
                <ActivityIndicator hidesWhenStopped={true} animating={this.state.loading}  size="large" />
                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder="Usuário..." autoCapitalize='none' onChangeText={texto => this.setState({"usuario": texto})} />
                    <TextInput style={styles.input} placeholder="Senha..." secureTextEntry={true} onChangeText={texto => this.setState({"senha": texto})} />
                </View>
                <Button title="Login" onPress={this.logar.bind(this)}></Button>
                <Text style={styles.mensagemErro}>
                    {this.state.mensagem}
                </Text>
            </View>            
        )
    }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        ,alignItems: 'center'
        ,justifyContent: 'center'
    },
    form: {
        width: width * 0.8
    },
    input: {
        height: 40
        ,borderBottomWidth: 1
        ,borderBottomColor: '#ddd'
    },
    titulo: {
        fontWeight: 'bold'
        ,fontSize: 26
    },
    mensagemErro: {
        marginTop: 15
        ,color: '#e74c3c'
    }
});
