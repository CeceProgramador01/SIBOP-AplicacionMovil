import React from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { styles } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import RootStackParamList from "./RootStackParamList";

type PrincipalNavegacionProp = StackNavigationProp<RootStackParamList, 'Principal'>;
type PrincipalRutaProp = RouteProp<RootStackParamList, 'Principal'>;

interface PrincipalPantallaProps {
    navigation: PrincipalNavegacionProp;
    route: PrincipalRutaProp;
}

const PrincipalPantalla: React.FC<PrincipalPantallaProps> = ({ navigation, route }) => {
    const { arquitecto } = route.params;

    const irSiguientePantalla = () => {
        navigation.navigate('ProyectosObras', { arquitecto });
    };

    const renderInfoField = (label: string, value: string) => (
        <Text style={styles.infoText}>
            {label}: {value ? `✔️` : '-'}
        </Text>
    );

    const renderGeneralField = (label: string, value: string) => (
        <Text style={styles.infoText}>{label}: {value || '-'}</Text>
    );

    return (
        <View style={styles.containerPrincipal}>
            <View style={styles.titulo}>
                <Text style={styles.tituloTx}>Información del DR</Text>
            </View>
            <ScrollView>
                <View style={styles.infoArqui}>
                    <Image 
                        source={require('./img/perfil.jpg')} 
                        style={styles.arquitectoImagen} 
                    />
                    {renderGeneralField('Nombre', arquitecto.nombre_arqui)}
                    {renderGeneralField('Dirección', arquitecto.direccion_arqui)}
                    {renderGeneralField('Teléfono', arquitecto.telefono_arqui)}
                    {renderGeneralField('Clave', arquitecto.clave)}
                    {renderGeneralField('Profesión', arquitecto.profesion)}
                    <View>
                        <Text style={styles.subtituloTx}>Tipo de DR:</Text>
                    </View>
                    {renderInfoField('De Obra', arquitecto.de_obra)}
                    {renderInfoField('De Patrimonio', arquitecto.de_patrimonio)}
                    {renderInfoField('De Proyecto', arquitecto.de_proyecto)}
                    {renderInfoField('De Urbanización', arquitecto.de_urbanizacion)}
                    {renderGeneralField('DRO', arquitecto.dro)}
                    {renderGeneralField('DRP', arquitecto.drp)}
                    {renderGeneralField('DRPT', arquitecto.drpt)}
                    {renderGeneralField('DRU', arquitecto.dru)}
                </View>
            <TouchableOpacity onPress={irSiguientePantalla} style={styles.buttonPrincipal}>
                <Text style={styles.buttonTextPrincipal}>Proyectos - Obras</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default PrincipalPantalla;