import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, Modal } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Signature from 'react-native-signature-canvas';
import RootStackParamList from "./RootStackParamList";
import { styles } from './styles';

type AgregarBitacoraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AgregarBitacora'>;
type AgregarBitacoraScreenRouteProp = RouteProp<RootStackParamList, 'AgregarBitacora'>;

interface AgregarBitacoraScreenProps {
    navigation: AgregarBitacoraScreenNavigationProp;
    route: AgregarBitacoraScreenRouteProp;
}

const AgregarBitacoraScreen: React.FC<AgregarBitacoraScreenProps> = ({ navigation, route }) => {
    const { proyecto, arquitecto } = route.params;
    const [fecha, setFecha] = useState(new Date().toLocaleDateString());
    const [observaciones, setObservaciones] = useState("");
    const [imagenes, setImagenes] = useState<string[]>([]);
    const [signatureImage, setSignatureImage] = useState<string | null>(null);
    const [isSignatureModalVisible, setSignatureModalVisible] = useState(false);
    const [isSignatureConfirmed, setIsSignatureConfirmed] = useState(false);

    useEffect(() => {
        setFecha(new Date().toLocaleDateString());
    }, []);

    const uploadImageToStorage = async (uri: string, path: string) => {
        const reference = storage().ref(path);
        await reference.putFile(uri);
        const downloadURL = await reference.getDownloadURL();
        return downloadURL;
    };

    const handleAgregarFoto = () => {
        launchCamera({ mediaType: 'photo', saveToPhotos: true }, async response => {
            if (response.assets) {
                const uris = response.assets.map(asset => asset.uri!).filter(uri => uri);
                const uploadedUrls = await Promise.all(
                    uris.map(uri => uploadImageToStorage(uri, `imagenes/${new Date().getTime()}_${uri.split('/').pop()}`))
                );
                setImagenes(prevImagenes => [...prevImagenes, ...uploadedUrls]);
            }
        });
    };

    const handleAgregarFotoDeGaleria = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, async response => {
            if (response.assets) {
                const uris = response.assets.map(asset => asset.uri!).filter(uri => uri);
                const uploadedUrls = await Promise.all(
                    uris.map(uri => uploadImageToStorage(uri, `imagenes/${new Date().getTime()}_${uri.split('/').pop()}`))
                );
                setImagenes(prevImagenes => [...prevImagenes, ...uploadedUrls]);
            }
        });
    };

    const handleEliminarFoto = (index: number) => {
        setImagenes(prevImagenes => prevImagenes.filter((_, i) => i !== index));
    };

    const handleGuardarBitacora = async () => {
        try {
            await firestore()
                .collection('Arquitecto')
                .doc(arquitecto.id)
                .collection('Proyectos')
                .doc(proyecto.id)
                .collection('Bitacoras')
                .add({
                    fecha,
                    observaciones,
                    imagenes,
                    dibujo: signatureImage,
                    timestamp: firestore.FieldValue.serverTimestamp()
                });
            Alert.alert("Éxito", "Bitácora guardada exitosamente");
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Error al guardar la bitácora");
        }
    };

    const handleSignature = (signature: string) => {
        setSignatureImage(signature);
        setIsSignatureConfirmed(true);
    };

    return (
        <View style={styles.containerAG}>
            <View style={styles.tituloab}>
                <Text style={styles.tituloTxAG}>Agregar Bitácora</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.infoArquiSmall}>
                    <Text style={styles.detalleTituloAG}>ID Proyecto: {proyecto.id}</Text>
                    <Text style={styles.detalleTituloAG}>Nombre Proyecto: {proyecto.nombre_razon_social}</Text>
                    <Text style={styles.detalleTextoAG}>Descripción: {proyecto.descripcion_obra}</Text>
                    <Text style={styles.detalleTituloAG}>ID DR: {arquitecto.id}</Text>
                    <Text style={styles.detalleTituloAG}>Nombre DR: {arquitecto.nombre_arqui}</Text>
                </View>
                <View style={styles.inputContainerAG}>
                    <Text style={styles.labelAG}>Fecha</Text>
                    <TextInput
                        style={styles.inputAG}
                        placeholder="Fecha"
                        value={fecha}
                        editable={false}
                    />
                    <Text style={styles.labelAG}>Observaciones</Text>
                    <TextInput
                        style={[styles.inputAG, { height: 100 }]}
                        placeholder="Observaciones"
                        value={observaciones}
                        onChangeText={setObservaciones}
                        multiline={true}
                    />
                </View>
                <View style={styles.inputContainerAG}>
                    <TouchableOpacity style={styles.buttonAG} onPress={handleAgregarFoto}>
                        <Text style={styles.buttonTextAG}>Tomar Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonAG} onPress={handleAgregarFotoDeGaleria}>
                        <Text style={styles.buttonTextAG}>Agregar Foto de Galería</Text>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                        {imagenes.map((uri, index) => (
                            <View key={index} style={styles.imageWrapper}>
                                <Image source={{ uri }} style={styles.imageAG} />
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleEliminarFoto(index)}>
                                    <Text style={styles.deleteButtonText}>X</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.inputContainerAG}>
                    <TouchableOpacity style={styles.buttonAG} onPress={() => setSignatureModalVisible(true)}>
                        <Text style={styles.buttonTextAG}>Agregar Dibujo</Text>
                    </TouchableOpacity>
                    {signatureImage && (
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: signatureImage }} style={styles.imageAG} />
                        </View>
                    )}
                    <Modal visible={isSignatureModalVisible && !isSignatureConfirmed} animationType="slide">
                        <View style={styles.signatureModal}>
                            <Text style={styles.tituloTxAG}>Dibuja Aquí</Text>
                            <View style={styles.signaturePadContainer}>
                                <Signature
                                    onOK={handleSignature}
                                    descriptionText="Dibuja aquí"
                                    clearText="Borrar"
                                    confirmText="Confirmar"
                                    webStyle={`
                                        .m-signature-pad {
                                            border: 1px solid #229500;
                                            width: 100%;
                                            height: 100%;
                                        }
                                        .m-signature-pad--body {
                                            width: 100%;
                                            height: 100%;
                                        }
                                        .m-signature-pad--footer {
                                            display: flex;
                                            justify-content: space-between;
                                            margin-top: 15px;
                                        }
                                        .m-signature-pad--footer .button {
                                            background-color: #229500;
                                            color: #FFF;
                                            border-radius: 5px;
                                        }
                                        .m-signature-pad--footer .button.clear {
                                            margin-right: 10px;
                                        }
                                    `}
                                />
                            </View>
                            <View style={styles.signatureButtons}>
                                <TouchableOpacity style={styles.buttonAG} onPress={() => setSignatureModalVisible(false)}>
                                    <Text style={styles.buttonTextAG}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                <TouchableOpacity style={styles.buttonAG} onPress={handleGuardarBitacora}>
                    <Text style={styles.buttonTextAG}>Guardar Bitácora</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default AgregarBitacoraScreen;