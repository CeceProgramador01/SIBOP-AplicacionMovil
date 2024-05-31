type RootStackParamList = {
    InicioSesion: undefined;
    Principal: { arquitecto: Arquitecto };
    ProyectosObras: { arquitecto: Arquitecto };
    DetallePO: { proyecto: Proyecto, arquitecto: Arquitecto };
    EscanearQR: { proyecto: Proyecto, arquitecto: Arquitecto };
    GestionarBitacora: {proyecto: Proyecto, arquitecto: Arquitecto};
    AgregarBitacora: { proyecto: Proyecto, arquitecto: Arquitecto };
    ConsultarBitacora: { proyecto: Proyecto, arquitecto: Arquitecto };
};

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

export default RootStackParamList;