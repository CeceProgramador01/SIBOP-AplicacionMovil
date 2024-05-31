import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "./RootStackParamList";
import { RouteProp } from "@react-navigation/native";

type DetallePONavigationProp = StackNavigationProp<RootStackParamList, 'DetallePO'>;
type DetallePORouteProp = RouteProp<RootStackParamList, 'DetallePO'>;

interface DetallePOProps {
    navigation: DetallePONavigationProp;
    route: DetallePORouteProp;
}

const DetallePO: React.FC<DetallePOProps> = ({ route, navigation }) => {
    const { proyecto, arquitecto } = route.params;

    const irEscanear = () => {
        navigation.navigate('EscanearQR', { proyecto, arquitecto });
    };

    const cerrarVentana = () => {
        navigation.goBack(); // Regresa a la ventana anterior
    };

    return (
        <View style={styles.containerDetallePO}>
            <View style={styles.tituloDetalle}>
                <Text style={styles.tituloTxDetalle}>Detalles del Proyecto-Obra</Text>
            </View>
            <ScrollView style={styles.infoContainerDPO}>
                <View style={styles.infoArquiDetalle}>
                    <Text style={styles.detalleTitulo}>{proyecto.nombre_razon_social}</Text>
                    <Text style={styles.detalleTexto}>Descripción de la Obra: {proyecto.descripcion_obra}</Text>
                    <Text style={styles.detalleTexto}>Domicilio: {proyecto.domicilio}</Text>
                    <Text style={styles.detalleTexto}>Fecha de Apertura: {proyecto.fecha_apertura}</Text>
                    <Text style={styles.detalleTexto}>Fecha de Cierre: {proyecto.fecha_cierre}</Text>
                    <Text style={styles.detalleTexto}>Fecha de Solicitud: {proyecto.fecha_solicitud}</Text>
                    <Text style={styles.detalleTexto}>Calle Colonia FA: {proyecto.calle_colonia_FA}</Text>
                    <Text style={styles.detalleTexto}>Cuenta Catastral FA: {proyecto.cuenta_catastral_FA}</Text>
                    <Text style={styles.detalleTexto}>Folio de Alineamiento: {proyecto.folio_alineamiento}</Text>
                    <Text style={styles.detalleTexto}>Folio de Licencia: {proyecto.folio_licencias}</Text>
                    <Text style={styles.detalleTexto}>Lote FA: {proyecto.lote_FA}</Text>
                    <Text style={styles.detalleTexto}>Manzana FA: {proyecto.manzana_FA}</Text>
                    <Text style={styles.detalleTexto}>Superficie 1er Piso M2: {proyecto.superficie_1erPisoM2}</Text>
                    <Text style={styles.detalleTexto}>Superficie 1er Piso ML: {proyecto.superficie_1erPisoML}</Text>
                    <Text style={styles.detalleTexto}>Superficie 2do Piso M2: {proyecto.superficie_2doPisoM2}</Text>
                    <Text style={styles.detalleTexto}>Superficie 2do Piso ML: {proyecto.superficie_2doPisoML}</Text>
                    <Text style={styles.detalleTexto}>Superficie 3er Piso M2: {proyecto.superficie_3erPisoM2}</Text>
                    <Text style={styles.detalleTexto}>Superficie 3er Piso ML: {proyecto.superficie_3erPisoML}</Text>
                    <Text style={styles.detalleTexto}>Superficie 4to Piso M2: {proyecto.superficie_4toPisoM2}</Text>
                    <Text style={styles.detalleTexto}>Superficie 4to Piso ML: {proyecto.superficie_4toPisoML}</Text>
                    <Text style={styles.detalleTexto}>Superficie 5to Piso M2: {proyecto.superficie_5toPisoM2}</Text>
                    <Text style={styles.detalleTexto}>Superficie 5to Piso ML: {proyecto.superficie_5toPisoML}</Text>
                    <Text style={styles.detalleTexto}>Superficie Mezzanine M2: {proyecto.superficie_MezzanineM2}</Text>
                    <Text style={styles.detalleTexto}>Superficie Mezzanine ML: {proyecto.superficie_MezzanineML}</Text>
                    <Text style={styles.detalleTexto}>Superficie Planta Baja M2: {proyecto.superficie_PlantaBajaM2}</Text>
                    <Text style={styles.detalleTexto}>Superficie Planta Baja ML: {proyecto.superficie_PlantaBajaML}</Text>
                    <Text style={styles.detalleTexto}>Superficie Sótano M2: {proyecto.superficie_SotanoM2}</Text>
                    <Text style={styles.detalleTexto}>Superficie Sótano ML: {proyecto.superficie_SotanoML}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.botonEscaneoQR} onPress={irEscanear}>
                            <Text style={styles.textoBotonDetalle}>Escanear QR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botonCerrar} onPress={cerrarVentana}>
                            <Text style={styles.textoBotonDetalle}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default DetallePO;