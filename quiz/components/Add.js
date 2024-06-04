// Importando os módulos necessários
import React, { useState } from "react";
import { Image, Button, TextInput, View, Alert } from "react-native";
import * as SQLite from 'expo-sqlite';

import { styles } from '../components/styles';

// Abrindo o banco de dados SQLite
    const db = SQLite.openDatabase('quiz.db');

export default function Add() {

// Definindo o estado inicial para cada campo do formulário
    const [pergunta, setPergunta] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [respostaCorreta, setRespostaCorreta] = useState('');


// Criando a tabela 'perguntas' se ela não existir no banco de dados
db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS perguntas (id INTEGER PRIMARY KEY AUTOINCREMENT, pergunta TEXT, alternativaA TEXT, alternativaB TEXT, alternativaC TEXT, alternativaD TEXT, resposta_correta TEXT);'
    );
});


// Função para adicionar uma pergunta de banco de dados
const adicionarPergunta = () => {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO perguntas (pergunta, alternativaA, alternativaB, alternativaC, alternativaD, resposta_correta) VALUES (?, ?, ?, ?, ?, ?);',
        [pergunta, alternativaA, alternativaB, alternativaC, alternativaD, respostaCorreta], (_, { insertId }) => {
            // Resetando o estado para cada campo do formulário
            setPergunta('');
            setAlternativaA('');
            setAlternativaB('');
            setAlternativaC('');
            setAlternativaD('');
            setRespostaCorreta('');
            // Exibindo um alerta de sucesso
            Alert.alert('Sucesso!', 'Pergunta adiciona com sucesso!');
        });
    });
};

    // Renderizando o componente
    return(
        <View style={styles.container}>
            {/* Renderizando o logo */}
            <Image style={styles.Image}source={require('../assets/logo2.jpg')}/>
            {/* Renderizando os campos de texto com a borda e o espaçamento especificados */}
            <TextInput style={styles.textInput} placeholder="Digite a pergunta" value={pergunta} multiline={true} onChangeText={setPergunta} numberOfLines={4}/>
            <TextInput style={styles.textInput} placeholder="Digite a alternativa A" value={alternativaA} onChangeText={setAlternativaA} numberOfLines={4}/>
            <TextInput style={styles.textInput} placeholder="Digite a alternativa B" value={alternativaB} onChangeText={setAlternativaB} numberOfLines={4}/>
            <TextInput style={styles.textInput} placeholder="Digite a alternativa C" value={alternativaC} onChangeText={setAlternativaC} numberOfLines={4}/>
            <TextInput style={styles.textInput} placeholder="Digite a alternativa D" value={alternativaD} onChangeText={setAlternativaD} numberOfLines={4}/>
            <TextInput style={styles.textInput} placeholder="Digite a letra da resposta correta" value={respostaCorreta} onChangeText={setRespostaCorreta} numberOfLines={4}/>
            {/* Renderizando o botão para adicionar uma pergunta */}
            <Button style={styles.Button} title="Adicionar pergunta" onPress={adicionarPergunta}/>
        </View>
    );
}