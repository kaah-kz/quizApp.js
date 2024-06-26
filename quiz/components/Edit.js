// Importando os módulos necessários do React e React Native
import React, { useState, useEffect } from "react";
import { Image, Button, TextInput, View, Alert } from "react-native";
import * as SQLite from 'expo-sqlite';
import { styles } from '../components/styles';

// Abrindo o banco de dados SQLite
const db = SQLite.openDatabase('quiz.db');

// Definindo o componente principal da aplicação
export default function Edit() {
    // Definindo o estado inicial para cada campo do formulário
    const [id, setId] = useState(null);
    const [pergunta, setPergunta] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [respostaCorreta, setRespostaCorreta] = useState('');

    // Carregando a primeira pergunta quando o componente é montado
    useEffect(() => {
        carregarPergunta();
    }, []);

    // Função para carregar a primeira pergunta do banco de dados
    const carregarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas ORDER BY id LIMIT 1;', [], (_, { rows }) => {
                let pergunta = rows._array[0];
                setId(pergunta.id);
                setPergunta(pergunta.pergunta);
                setAlternativaA(pergunta.alternativaA);
                setAlternativaB(pergunta.alternativaB);
                setAlternativaC(pergunta.alternativaC);
                setAlternativaD(pergunta.alternativaD);
                setRespostaCorreta(pergunta.resposta_correta);
            });
        });
    };

    // Função para atualizar a pergunta atual no banco de dados
    const atualizarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('UPDATE perguntas SET pergunta = ?, alternativaA = ?, alternativaB = ?, alternativaC = ?, alternativaD = ?, resposta_correta = ? WHERE id = ?;', [pergunta, alternativaA, alternativaB, alternativaC, alternativaD, respostaCorreta, id], () => {
                Alert.alert('Sucesso!', 'Pergunta atualizada com sucesso!');
            });
        });
    };

    const deletarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM perguntas WHERE id = ?;', [id], () => {
                Alert.alert('Sucesso!', 'Pergunta deletada com sucesso!');
                carregarPergunta();
            });
        });
    };

    // Função para carregar a próxima pergunta do banco de dados
    const proximaPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas WHERE id > ? ORDER BY id LIMIT 1;', [id], (_, { rows}) => {
                if(rows.length > 0) {
                    let pergunta = rows._array[0];
                    setId(pergunta.id);
                    setPergunta(pergunta.pergunta);
                    setAlternativaA(pergunta.alternativaA);
                    setAlternativaB(pergunta.alternativaB);
                    setAlternativaC(pergunta.alternativaC);
                    setAlternativaD(pergunta.alternativaD);
                    setRespostaCorreta(pergunta.resposta_correta);
                } else {
                    Alert.alert('Informação', 'Esta é a última pergunta.');
                }
            });
        });
    };

    // Função para carregar a pergunta anterior do banco de dados
    const perguntaAnterior = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas WHERE id < ? ORDER BY id DESC LIMIT 1;', [id], (_, { rows }) => {
                if (rows.length > 0) {
                    let pergunta = rows._array[0];
                    setId(pergunta.id);
                    setPergunta(pergunta.pergunta);
                    setAlternativaA(pergunta.alternativaA);
                    setAlternativaB(pergunta.alternativaB);
                    setAlternativaC(pergunta.alternativaC);
                    setAlternativaD(pergunta.alternativaD);
                    setRespostaCorreta(pergunta.resposta_correta);
                } else {
                    Alert.alert('Informação', 'Esta é a primeira pergunta.');
                }
            });
        });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo2.jpg')} style={styles.logo} />
            <TextInput placeholder="Digite a pergunta" value={pergunta} multiline={true} onChangeText={setPergunta} style={styles.textInput} />
            <TextInput placeholder="Digite a alternativa A" value={alternativaA} onChangeText={setAlternativaA} style={styles.textInput} />
            <TextInput placeholder="Digite a alternativa B" value={alternativaB} onChangeText={setAlternativaB} style={styles.textInput} />
            <TextInput placeholder="Digite a alternativa C" value={alternativaC} onChangeText={setAlternativaC} style={styles.textInput} />
            <TextInput placeholder="Digite a alternativa D" value={alternativaD} onChangeText={setAlternativaD} style={styles.textInput} />
            <TextInput placeholder="Digite a letra da resposta correta" value={respostaCorreta} onChangeText={setRespostaCorreta} style={styles.textInput} />
            <Button title="Atualizar Pergunta" onPress={atualizarPergunta} style={styles.button} />
            <Button title="Deletar Pergunta" onPress={deletarPergunta} color={'red'} style={styles.button} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                <Button style={styles.button} title="Voltar" onPress={perguntaAnterior} />
                <Button style={styles.button} title="Avançar" onPress={proximaPergunta} />
            </View>
        </View>
    );
}
