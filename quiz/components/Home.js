import React from "react";
import { Image, Button, View } from 'react-native';

import { styles } from '../components/styles';

export default function Home({ navigation }) {
    return (
        <View style={styles}>
            <Image source={require('../assets/logo2.jpg')} style={styles.logo} />
            <View style={styles.Button}>
                <Button title='Adicionar Pergunta' onPress={() => navigation.navigate('Add')} />
            </View>
            <View style={styles.Button}>
                <Button title='Iniciar Quiz' onPress={() => navigation.navigate('Quiz')}/>
            </View>
            <View style={styles.Button}>
                <Button title='Editar Perguntas' onPress={() => navigation.navigate('Edit')}/>
            </View>
        </View>
    );
};
