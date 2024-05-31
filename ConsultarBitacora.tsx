import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Modal, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RootStackParamList from "./RootStackParamList";
import { styles } from './styles';

type ConsultarBitacoraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ConsultarBitacora'>;

interface ConsultarBitacoraScreenProps {
    navigation: ConsultarBitacoraScreenNavigationProp;
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

interface Bitacora {
    fecha: string;
    observaciones: string;
    imagenes: string[];
    dibujo: string | null;
}

const ConsultarBitacoraScreen: React.FC<ConsultarBitacoraScreenProps> = ({ route }) => {
    const { proyecto, arquitecto } = route.params;
    const [bitacoras, setBitacoras] = useState<Bitacora[]>([]);
    const [selectedBitacora, setSelectedBitacora] = useState<Bitacora | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageModalVisible, setImageModalVisible] = useState(false);
    const [isBitacoraModalVisible, setBitacoraModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Arquitecto')
            .doc(arquitecto.id)
            .collection('Proyectos')
            .doc(proyecto.id)
            .collection('Bitacoras')
            .orderBy('timestamp', 'desc')
            .onSnapshot((querySnapshot) => {
                const bitacorasData: Bitacora[] = [];
                querySnapshot.forEach((doc) => {
                    bitacorasData.push(doc.data() as Bitacora);
                });
                setBitacoras(bitacorasData);
            });

        return () => unsubscribe();
    }, []);

    const handleBitacoraSelect = (bitacora: Bitacora) => {
        setSelectedBitacora(bitacora);
        setBitacoraModalVisible(true);
    };

    const handleImagePress = (uri: string) => {
        setSelectedImage(uri);
        setImageModalVisible(true);
    };

    return (
        <View style={styles.containerCB}>
            <View style={styles.titulocb}>
                <Text style={styles.tituloTxcb}>Consultar Bitácora</Text>
            </View>
            <View style={styles.infoArquicb}>
                {/* Mostrar información del arquitecto */}
                <Text style={styles.detalleTituloCB}>ID DR: {arquitecto.id}</Text>
                <Text style={styles.detalleTextocb}>Nombre DR: {arquitecto.nombre_arqui}</Text>
                {/* Mostrar información del proyecto */}
                <Text style={styles.detalleTituloCB}>ID Proyecto: {proyecto.id}</Text>
                <Text style={styles.detalleTextocb}>Nombre Proyecto: {proyecto.nombre_razon_social}</Text>
            </View>
            <View>
                <Text style={styles.subtituloTxcb}>Bitácoras</Text>
                <View style={styles.linea}></View>
            </View>
            <ScrollView style={styles.infoContainerCB}>
                {/* Mostrar la lista de bitácoras */}
                <View style={styles.infoContainerCB}>
                    {bitacoras.map((bitacora, index) => (
                    <TouchableOpacity key={index} onPress={() => handleBitacoraSelect(bitacora)} style={styles.bitacoraItem}>
                        <Text style={styles.detalleTituloCB}>Fecha: {bitacora.fecha}</Text>
                        <Text style={styles.detalleTexto}>Observaciones: {bitacora.observaciones}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            {/* Modal para mostrar la bitácora seleccionada */}
            <Modal visible={isBitacoraModalVisible} transparent={true} onRequestClose={() => setBitacoraModalVisible(false)}>
                <View style={styles.modalContainerCB}>
                    <TouchableOpacity style={styles.closeButtonCB} onPress={() => setBitacoraModalVisible(false)}>
                        <Text style={styles.closeButtonTextCB}>Cerrar</Text>
                    </TouchableOpacity>
                    <View style={styles.modalContentCB}>
                        {selectedBitacora && (
                            <View>
                                <Text style={styles.detalleTituloCB}>Fecha: {selectedBitacora.fecha}</Text>
                                <Text style={styles.detalleTexto}>Observaciones: {selectedBitacora.observaciones}</Text>
                                <ScrollView horizontal>
                                    {selectedBitacora.imagenes.map((uri, index) => (
                                        <TouchableOpacity key={index} onPress={() => handleImagePress(uri)}>
                                            <Image source={{ uri }} style={{ width: 200, height: 200, margin: 5 }} />
                                        </TouchableOpacity>
                                    ))}
                                    {selectedBitacora.dibujo && (
                                        <TouchableOpacity onPress={() => handleImagePress(selectedBitacora.dibujo!)}>
                                            <Image source={{ uri: selectedBitacora.dibujo }} style={{ width: 200, height: 200, margin: 5 }} />
                                        </TouchableOpacity>
                                    )}
                                </ScrollView>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
            {/* Modal para mostrar imagen en grande */}
            <Modal visible={isImageModalVisible} transparent={true} onRequestClose={() => setImageModalVisible(false)}>
                <View style={styles.modalContainerCB}>
                    <TouchableOpacity style={styles.closeButtonCB} onPress={() => setImageModalVisible(false)}>
                        <Text style={styles.closeButtonTextCB}>Cerrar</Text>
                    </TouchableOpacity>
                    <View style={styles.modalImageContainerCB}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ConsultarBitacoraScreen;