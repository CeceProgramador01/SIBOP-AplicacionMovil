import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import RootStackParamList from "./RootStackParamList";
import firestore from '@react-native-firebase/firestore';

type ProyectosObrasNavigationProp = StackNavigationProp<RootStackParamList, 'ProyectosObras'>;
type ProyectosObrasRouteProp = RouteProp<RootStackParamList, 'ProyectosObras'>;

interface ProyectosObrasPantallaProps {
    navigation: ProyectosObrasNavigationProp;
    route: ProyectosObrasRouteProp;
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

const ProyectosObrasPantalla: React.FC<ProyectosObrasPantallaProps> = ({ navigation, route }) => {
    const { arquitecto } = route.params;
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const proyectosSnapshot = await firestore()
                    .collection('Arquitecto')
                    .doc(arquitecto.id)
                    .collection('Proyectos')
                    .get();

                const proyectosFiltrados = proyectosSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Proyecto[];

                console.log("Proyectos obtenidos: ", proyectosFiltrados);
                setProyectos(proyectosFiltrados);
            } catch (error) {
                console.error("Error obteniendo proyectos: ", error);
            } finally {
                setCargando(false);
            }
        };

        obtenerProyectos();
    }, [arquitecto.id]);

    const VerDetalle = (item: Proyecto) => {
        navigation.navigate('DetallePO', { proyecto: item, arquitecto });
    };

    const renderItem = ({ item }: { item: Proyecto }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.nombre}>{item.nombre_razon_social}</Text>
            <Text style={styles.descripcion}>{item.descripcion_obra}</Text>
            <Text style={styles.descripcion}>Fecha de Apertura: {item.fecha_apertura}</Text>
            <Text style={styles.descripcion}>Fecha de Cierre: {item.fecha_cierre}</Text>
            <Text style={styles.descripcion}>Domicilio: {item.domicilio}</Text>
            <TouchableOpacity
                style={styles.botonR}
                onPress={() => VerDetalle(item)}
            >
                <Text style={styles.textoBoton}>Detalles</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.containerProyectosObras}>
            <View style={styles.tituloProyectos}>
                <Text style={styles.tituloTxProyectos}>Proyectos - Obras</Text>
            </View>
            {cargando ? (
                <View style={styles.cargandoContainer}>
                    <ActivityIndicator size="large" color="#229500" />
                    <Text style={styles.cargandoTexto}>Cargando proyectos...</Text>
                </View>
            ) : (
                <View style={styles.containerLista}>
                    <FlatList
                        data={proyectos}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            )}
        </View>
    );
};

export default ProyectosObrasPantalla;