import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "./RootStackParamList";
import { styles } from './styles';

type GestionarBitacoraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GestionarBitacora'>;

interface GestionarBitacoraScreenProps {
    navigation: GestionarBitacoraScreenNavigationProp;
    route: { params: { proyecto: Proyecto, arquitecto: Arquitecto } };
}

interface Proyecto {
    id: string;
    calle_colonia_FA: string;
    cuenta_catastral_FA: string;
    descripcion_obra: string;
    domicilio: string;
    fecha_apertura: string;
    fecha_cierre: string;
    fecha_solicitud: string;
    folio_alineamiento: string;
    folio_licencias: string;
    codigo: string;
    lote_FA: string;
    manzana_FA: string;
    nombre_razon_social: string;
    superficie_1erPisoM2: string;
    superficie_1erPisoML: string;
    superficie_2doPisoM2: string;
    superficie_2doPisoML: string;
    superficie_3erPisoM2: string;
    superficie_3erPisoML: string;
    superficie_4toPisoM2: string;
    superficie_4toPisoML: string;
    superficie_5toPisoM2: string;
    superficie_5toPisoML: string;
    superficie_MezzanineM2: string;
    superficie_MezzanineML: string;
    superficie_PlantaBajaM2: string;
    superficie_PlantaBajaML: string;
    superficie_SotanoM2: string;
    superficie_SotanoML: string;
    latitude: number;
    longitude: number;
}

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
}

const GestionarBitacoraScreen: React.FC<GestionarBitacoraScreenProps> = ({ navigation, route }) => {
    const { proyecto, arquitecto } = route.params;

    const handleAgregarBitacora = () => {
        navigation.navigate('AgregarBitacora', { proyecto, arquitecto });
    };

    const handleConsultarBitacora = () => {
        navigation.navigate('ConsultarBitacora', { proyecto, arquitecto });
    };

    return (
        <View style={styles.containerGB}>
            <View style={styles.titulogb}>
                <Text style={styles.tituloTxgb}>Gestionar Bitácora</Text>
            </View>
            <ScrollView style={styles.infoContainerGB}>
                <View style={styles.infoArquigb}>
                    <Text style={styles.detalleTituloGB}>ID: {proyecto.id}</Text>
                    <Text style={styles.detalleTituloGB}>Nombre: {proyecto.nombre_razon_social}</Text>
                    <Text style={styles.detalleTextoGB}>Descripción de la Obra: {proyecto.descripcion_obra}</Text>
                    <Text style={styles.detalleTextoGB}>Domicilio: {proyecto.domicilio}</Text>
                    <Text style={styles.detalleTextoGB}>Fecha de Apertura: {proyecto.fecha_apertura}</Text>
                    <Text style={styles.detalleTextoGB}>Fecha de Cierre: {proyecto.fecha_cierre}</Text>
                    <Text style={styles.detalleTextoGB}>Fecha de Solicitud: {proyecto.fecha_solicitud}</Text>
                    <Text style={styles.detalleTextoGB}>Calle Colonia FA: {proyecto.calle_colonia_FA}</Text>
                    <Text style={styles.detalleTextoGB}>Cuenta Catastral FA: {proyecto.cuenta_catastral_FA}</Text>
                    <Text style={styles.detalleTextoGB}>Folio de Alineamiento: {proyecto.folio_alineamiento}</Text>
                    <Text style={styles.detalleTextoGB}>Folio de Licencia: {proyecto.folio_licencias}</Text>
                    <Text style={styles.detalleTextoGB}>Lote FA: {proyecto.lote_FA}</Text>
                    <Text style={styles.detalleTextoGB}>Manzana FA: {proyecto.manzana_FA}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie 1er Piso M2: {proyecto.superficie_1erPisoM2}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie 1er Piso ML: {proyecto.superficie_1erPisoML}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie 2do Piso M2: {proyecto.superficie_2doPisoM2}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie 2do Piso ML: {proyecto.superficie_2doPisoML}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie 3er Piso M2: {proyecto.superficie_3erPisoM2}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie 3er Piso ML: {proyecto.superficie_3erPisoML}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie 4to Piso M2: {proyecto.superficie_4toPisoM2}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie 4to Piso ML: {proyecto.superficie_4toPisoML}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie 5to Piso M2: {proyecto.superficie_5toPisoM2}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie 5to Piso ML: {proyecto.superficie_5toPisoML}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie Mezzanine M2: {proyecto.superficie_MezzanineM2}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie Mezzanine ML: {proyecto.superficie_MezzanineML}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie Planta Baja M2: {proyecto.superficie_PlantaBajaM2}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie Planta Baja ML: {proyecto.superficie_PlantaBajaML}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie Sótano M2: {proyecto.superficie_SotanoM2}</Text>
                    <Text style={styles.detalleTextoGB}>Superficie Sótano ML: {proyecto.superficie_SotanoML}</Text>
                    <View style={styles.buttonContainerGB}>
                        <TouchableOpacity style={styles.buttonGB} onPress={handleAgregarBitacora}>
                            <Text style={styles.buttonTextGB}>Agregar Bitácora</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonGB} onPress={handleConsultarBitacora}>
                            <Text style={styles.buttonTextGB}>Consultar Bitácora</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default GestionarBitacoraScreen;