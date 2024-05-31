import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InicioSesion from "./InicioSesion";
import PrincipalPantalla from "./Principal";
import ProyectosObrasPantalla from "./ProyectosObras";
import EscanearQRScreen from "./EscanearQR";
import DetallePO from "./DetallePO";
import GestionarBitacoraScreen from "./GestionarBitacora";
import AgregarBitacoraScreen from "./AgregarBitacora";
import ConsultarBitacoraScreen from "./ConsultarBitacora";

const Stack = createStackNavigator();

const App: React.FC = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InicioSesion">
        <Stack.Screen name="InicioSesion" component={InicioSesion} options={{ headerShown: false }}/>
        <Stack.Screen name="Principal" component={PrincipalPantalla} options={{ headerShown: false }}/>
        <Stack.Screen name="ProyectosObras" component={ProyectosObrasPantalla} options={{ headerShown: false }}/>
        <Stack.Screen name="DetallePO" component={DetallePO} options={{ headerShown: false }}/>
        <Stack.Screen name="EscanearQR" component={EscanearQRScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="GestionarBitacora" component={GestionarBitacoraScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AgregarBitacora" component={AgregarBitacoraScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="ConsultarBitacora" component={ConsultarBitacoraScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;