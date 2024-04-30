// Importando os módulos necessários
import React, { useState } from "react";
import { Image, Button, TextInput, View, Alert } from "react-native";
import * as SQLite from 'expo-sqlite';

// Abrindo o banco de dados SQLite
const db = SQLite.openDatabase('quiz.db');

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
        'CREATE TABLE IN NOT EXISTS perguntas (id INTEGER PRIMARY KEY AUTOINCREMENT, pergunta TEXT, alternativaA TEXT, alternativaB TEXT, alternativaC TEXT, alternativaD TEXT, resposta_correta TEXT);'
    );
});



// Função para adicionar uma pergunta de banco de dados
const adicionarPergunta = () => {
    db.transaction(tx)
}