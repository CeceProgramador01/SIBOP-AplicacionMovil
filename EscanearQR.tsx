import React, { useState, useEffect } from "react";
import { View, Text, Alert, PermissionsAndroid, Platform } from "react-native";
import { RNCamera } from 'react-native-camera';
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "./RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import Geolocation from 'react-native-geolocation-service';
import { styles } from './styles';

type EscanearQRScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EscanearQR'>;
type EscanearQRScreenRouteProp = RouteProp<RootStackParamList, 'EscanearQR'>;

interface EscanearQRScreenProps {
    navigation: EscanearQRScreenNavigationProp;
    route: EscanearQRScreenRouteProp;
}

const EscanearQRScreen: React.FC<EscanearQRScreenProps> = ({ navigation, route }) => {
    const { proyecto, arquitecto } = route.params;
    const [scanned, setScanned] = useState(false);
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestLocationPermission();
        } else {
            getCurrentLocation();
        }
    }, []);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission",
                    message: "We need your location to verify your presence at the project site",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getCurrentLocation();
            } else {
                console.log("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                console.log(error);
                Alert.alert("Error", "Could not get location. Please try again.");
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const isWithinDistance = (lat1: number, lon1: number, lat2: number, lon2: number, distance: number) => {

        const toRad = (value: number) => (value * Math.PI) / 180;
        const R = 6371e3;
        const φ1 = toRad(lat1);
        const φ2 = toRad(lat2);
        const Δφ = toRad(lat2 - lat1);
        const Δλ = toRad(lon2 - lon1);

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c;
        return d <= distance;
    };

    const handleBarcodeRead = (e: any) => {
        if (!scanned) {
            setScanned(true);
            if (e.data === proyecto.codigo) {
                if (location) {
                    const withinDistance = isWithinDistance(location.latitude, location.longitude, proyecto.latitude, proyecto.longitude, 30);
                    
                    console.log(`Current Location: Latitude ${location.latitude}, Longitude ${location.longitude}`);
                    console.log(`Project Location: Latitude ${proyecto.latitude}, Longitude ${proyecto.longitude}`);
                    console.log(`Within Distance: ${withinDistance}`);

                    if (withinDistance) {
                        navigation.navigate('GestionarBitacora', { proyecto, arquitecto });
                    } else {
                        Alert.alert(
                            "Error",
                            "No estás dentro del área permitida para este proyecto.",
                            [{ text: "OK", onPress: () => setScanned(false) }],
                            { cancelable: false }
                        );
                    }
                } else {
                    Alert.alert(
                        "Error",
                        "No se pudo obtener tu ubicación. Por favor, intenta nuevamente.",
                        [{ text: "OK", onPress: () => setScanned(false) }],
                        { cancelable: false }
                    );
                }
            } else {
                Alert.alert(
                    "Error",
                    "El código QR no coincide con el proyecto seleccionado.",
                    [{ text: "OK", onPress: () => setScanned(false) }],
                    { cancelable: false }
                );
            }
        }
    };

    return (
        <View style={styles.containerQR}>
            <RNCamera
                style={styles.scannerCamera}
                captureAudio={false}
                onBarCodeRead={handleBarcodeRead}
                barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            >
                <View style={styles.overlay}>
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle} />
                    </View>
                    {!scanned && (
                        <Text style={styles.scanText}>Escanea el código QR</Text>
                    )}
                </View>
            </RNCamera>
        </View>
    );
};

export default EscanearQRScreen;