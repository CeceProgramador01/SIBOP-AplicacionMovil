import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from './styles';
import RootStackParamList from "./RootStackParamList";
import firestore from '@react-native-firebase/firestore';

interface Arquitecto {
    id: string;
    nombre_arqui: string;
    clave: string;
    telefono_arqui: string;
    direccion_arqui: string;
    profesion: string;
    de_obra: string;
    de_patrimonio: string;
    de_proyecto: string;
    de_urbanizacion: string;
    dro: string;
    drp: string;
    drpt: string;
    dru: string;
    // Agrega otros campos si son necesarios
}

type InicioSesionNavegacionProp = StackNavigationProp<RootStackParamList, 'InicioSesion'>;

interface InicioSesionPantallaProps {
    navigation: InicioSesionNavegacionProp
};

const InicioSesionPantalla: React.FC<InicioSesionPantallaProps> = ({ navigation }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const verificacion = async () => {
        setLoading(true);
        try {
            const arquitectosRef = firestore().collection('Arquitecto');
            const snapshot = await arquitectosRef.where('nombre_arqui', '==', nombreUsuario).get();

            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                const arquitecto = {
                    id: doc.id,
                    ...doc.data(),
                } as Arquitecto;

                if (arquitecto.clave === password) {
                    navigation.navigate('Principal', { arquitecto });
                } else {
                    setError('Usuario o contraseña incorrectos');
                }
            } else {
                setError('Usuario no encontrado');
            }
        } catch (error) {
            setError('Error al leer datos de la base de datos');
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.labellogo}>SIBOP</Text>
            <Text style={styles.welcome}>Bienvenido, por favor inicia sesión</Text>
            <Text style={styles.label}>Nombre de Usuario:</Text>
            <TextInput
                style={styles.input}
                value={nombreUsuario}
                onChangeText={text => setNombreUsuario(text)}
            />
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            {loading ? (
                <ActivityIndicator size="large" color="#229500" />
            ) : (
                <TouchableOpacity onPress={verificacion} style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            )}
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

export default InicioSesionPantalla;