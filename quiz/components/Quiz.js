// Importando os módulos necessários do React e React Native
import React, { useState, useEffect } from "react";
import { Image, Button, Text, View, Alert } from "react-native";
import * as SQLite from 'expo-sqlite';

import styles from '../components/styles';

// Abrindo o banco de dados SQLite
const db = SQLite.openDatabase('quiz.db');

// Definindo o componete Quiz
export default function Quiz() {
    // Definindo o estado inicial para a pergunta, as alternativas e a resposta correta
    const [pergunta, setPergunta] = useState('');
    const [alternativas, setAlternativas] = useState([]);
    const [respostaCorreta, setRespostaCorreta] = useState('');

    // Carregando uma pergunta aleatória quando o componente é montado
    useEffect(() => {
        carregarPergunta();
    }, []);

    // Função para carregar uma pergunta aleatória do banco de dados
    const carregarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas ORDER BY RANDOM() LIMIT 1;', [], (_, { rows }) => {
                let pergunta = rows._array[0];
                setPergunta(pergunta.pergunta);
                setRespostaCorreta(pergunta.resposta_correta);
                setAlternativas([pergunta.alternativaA, pergunta.alternativaB, pergunta.alternativaC, pergunta.alternativaD])
            });
        });
    };

    // Função para verificar se a resposta selecionada é a correta
    const verificarResposta = (resposta) => {
        if (resposta === respostaCorreta) {
            Alert.alert('Parabéns!', 'Você acertou a resposta!');
            carregarPergunta();
        } else {
            Alert.alert('Ops!', 'Resposta incorreta.');
        }
    };

    //Renderizando o componente
    return (
    // Criando uma View com alinhamento centralizado e ocupando 90% da tela
    <View style={{alignItems: 'center', width: '90%', marginStart: 'auto', marginEnd: 'auto'}}>
        {/* Renderizando o logo */}
        <Image source={require('../assets/logo.png')} style={{ width: '90%', height: 150, marginBottom: 45 }}/>
        {/* Renderizando a pergunta com estilo de multilinha e justificado */}
        <Text style={{fontSize: 16, marginBottom: 5, textAlign: 'justify', width: '90%'}} multiline={true}>{pergunta}</Text>
        {/* Renderizando as alternativas */}
        {alternativas.map((alternativa, index) => (
            // Cada botão ocupa 90% da tela e tem uma margem inferior de 15px
            <View style={{width: '90%', marginBottom: 15}}>
                <Button key={index} title={`${String.fromCharCode(65 + index)}. ${alternativa}`} onPress={() =>
                verificarResposta(String.fromCharCode(65 + index))}/>
            </View>
        ))}
        {/* Renderizando o botão para carregar a próxima pergunta */}
        <View style={{width:'90%', marginBottom: 15}}>
            <Button title="Próxima pergunta" onPress={carregarPergunta}/>
        </View>
    </View>
    );
};