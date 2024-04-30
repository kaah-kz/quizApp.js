// Importando os módulos necessários do React e React Native
import React from "react";
import { Image, Button, View } from 'react-native';

// Definindo o componente Home
export default function Home({ navigation }) {
    return (
        // Criando uma View com alinhamento centralizado
        <View style={{alignItems: 'center'}}>

            {/* Renderizando a imagem do logo */}
            <Image source={require('../assets/logo.png')} style={{width: '90%', height: 150, marginBottom: 45}}/>

            {/* Criando um botão para navegar para a tela de adicionar perguntas */}
            <View style={{marginBottom: 15}}>
                <Button title='Adicionar Pergunta' onPress={() => navigation.navigate('Add')}/>
            </View>

            {/* Criando um botão para navegar para a tela de iniciar quiz */}
            <View style={{marginBottom: 15}}>
                <Button title='Iniciar Quiz' onPress={() => navigation.navigate('Quiz')} color={'green'}/>
            </View>

            {/* Criando um botão para navegar para a tela de editar perguntas */}
            <Button title='Editar Perguntas' onPress={() => navigation.navigate('Edit')} color={'gold'}/>
        </View>
    );
};