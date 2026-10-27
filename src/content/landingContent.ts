import {
  Bell,
  BookOpenText,
  Bot,
  Building2,
  CalendarClock,
  ChartColumn,
  FileText,
  HardHat,
  IdCard,
  QrCode,
  ReceiptText,
  ShieldCheck,
  UserX,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

// Datos tomados del documento "Grupo N°04 - Factibilidad y Diseño".

export const navSections = [
  { id: "que-es", label: "Qué es" },
  { id: "modulos", label: "Módulos" },
  { id: "numeros", label: "Números" },
  { id: "documentacion", label: "Documentación" },
  { id: "pantallas", label: "Pantallas" },
  { id: "obra", label: "En la obra" },
] as const;

export interface Pilar {
  numero: string;
  titulo: string;
  descripcion: string;
}

export const pilares: Pilar[] = [
  {
    numero: "01",
    titulo: "Asistencia desde el frente de obra",
    descripcion:
      "Ingreso y egreso con QR desde el celular. Las horas quedan registradas en tiempo real, sin planillas.",
  },
  {
    numero: "02",
    titulo: "Obras y cuadrillas organizadas",
    descripcion:
      "Cada operario asignado a su cuadrilla y a su obra, con fechas y estados. Los costos se imputan por obra.",
  },
  {
    numero: "03",
    titulo: "Recibos con conformidad digital",
    descripcion:
      "El trabajador ve, descarga y confirma la lectura de su recibo de sueldo sin pasar por la oficina.",
  },
  {
    numero: "04",
    titulo: "Asistente de IA para el personal",
    descripcion:
      "Explica términos legales, recibos y condiciones del convenio UOCRA en lenguaje simple.",
  },
];

export interface Modulo {
  icono: LucideIcon;
  titulo: string;
  descripcion: string;
}

export const modulos: Modulo[] = [
  {
    icono: IdCard,
    titulo: "Legajos digitales",
    descripcion: "Ficha única del trabajador con IERIC y categoría UOCRA.",
  },
  {
    icono: Building2,
    titulo: "Obras y cuadrillas",
    descripcion: "Estados de obra, cuadrillas, líderes y asignaciones.",
  },
  {
    icono: QrCode,
    titulo: "Control de asistencia",
    descripcion: "Fichado por QR o manual y parte diario por obra.",
  },
  {
    icono: CalendarClock,
    titulo: "Jornadas de trabajo",
    descripcion: "Planes de trabajo y asistencias esperadas por jornada.",
  },
  {
    icono: UserX,
    titulo: "Ausentismo",
    descripcion: "Solicitudes de justificación con aprobación de RR.HH.",
  },
  {
    icono: ReceiptText,
    titulo: "Recibos de sueldo",
    descripcion: "Liquidación, cuadro tarifario UOCRA y conformidad.",
  },
  {
    icono: HardHat,
    titulo: "Seguridad e higiene",
    descripcion: "Inventario, reposición y entrega firmada de EPP.",
  },
  {
    icono: FileText,
    titulo: "Documentación",
    descripcion: "Repositorio de documentos de la empresa y del personal.",
  },
  {
    icono: Bot,
    titulo: "Asistente IA (RAG)",
    descripcion: "Consultas en lenguaje natural sobre normativa y documentos.",
  },
  {
    icono: ChartColumn,
    titulo: "Reportes y tableros",
    descripcion: "Indicadores filtrables por fecha, obra y centro de costo.",
  },
  {
    icono: Bell,
    titulo: "Notificaciones",
    descripcion: "Alertas de vencimientos, solicitudes y novedades.",
  },
  {
    icono: UsersRound,
    titulo: "Usuarios y roles",
    descripcion: "Accesos por rol: Administrador, RR.HH. y Operario.",
  },
];

export const numeros = [
  { valor: "18", etiqueta: "Módulos" },
  { valor: "197", etiqueta: "Requerimientos funcionales" },
  { valor: "60", etiqueta: "Casos de uso" },
  { valor: "3", etiqueta: "Roles de usuario" },
];

// Imagen que se abre en el visor: diagramas de Documentación y capturas de Pantallas.
export interface ImagenAmpliable {
  id: string;
  // Nombre de la pestaña cuando el visor muestra más de una imagen.
  etiqueta: string;
  // Ruta dentro de /public sin extensión: se sirve .webp con .png de respaldo.
  imagen: string;
  ancho: number;
  alto: number;
  alt: string;
}

export interface RecursoDocumentacion {
  icono: LucideIcon;
  titulo: string;
  descripcion: string;
  accion: string;
  diagramas: ImagenAmpliable[];
}

// Pie del visor de diagramas.
export const pieDiagramas = "© 2026 · Proyecto final UTN FRM · Versión 1, octubre 2026";

export const documentacion: RecursoDocumentacion[] = [
  {
    icono: BookOpenText,
    titulo: "Diagrama de clases",
    descripcion:
      "Modelo de dominio reducido: 12 de las 44 clases, con sus atributos principales y relaciones.",
    accion: "Ver Diagrama de Clases Reducido",
    diagramas: [
      {
        id: "clases",
        etiqueta: "Diagrama de clases",
        imagen: "/diagramas/dc-reducido",
        ancho: 3300,
        alto: 2304,
        alt: "Diagrama de clases reducido de LaborTrack: 12 clases coloreadas por módulo del backend. Empleado está en el centro: se compone de los Documento de su legajo, puede tener una cuenta de Usuario, recibe EPP e integra Grupos. ReciboSueldo pertenece a un Empleado, emite un Documento y se liquida según una CategoriaUOCRA. Cuadrilla pertenece a un Grupo y ejecuta una Obra. Asistencia se registra sobre una JornadaTrabajo y se vincula al Empleado vía cuadrilla; JornadaTrabajo se relaciona con una Cuadrilla, y SolicitudAusencia afecta jornadas de un Empleado.",
      },
    ],
  },
  {
    icono: UsersRound,
    titulo: "Modelo de casos de uso",
    descripcion:
      "Actores y casos de uso principales, con módulo de origen. 7 de 9 actores.",
    accion: "Ver Casos de Uso Reducido",
    diagramas: [
      {
        id: "casos-de-uso",
        etiqueta: "Casos de uso",
        imagen: "/diagramas/mcu-reducido",
        ancho: 3300,
        alto: 2680,
        alt: "Modelo de casos de uso reducido de LaborTrack con 7 actores. Empleado inicia sesión, consulta a la IA y consulta notificaciones; Administrador de RRHH, Contador, Operario y Capataz de Obra lo especializan, y Líder de cuadrilla especializa a Operario. Administrador de RRHH gestiona empleados y sus documentos, entrega EPP, registra asistencias omitidas y acepta solicitudes de ausencia. Contador gestiona períodos de liquidación, recibos de sueldo y el cuadro tarifario UOCRA. Administrador de Proyecto gestiona obras y sus estados y asigna empleados a grupos. Capataz de Obra gestiona cuadrillas, planes de trabajo y jornadas extraordinarias. Operario registra ingreso y egreso con QR, solicita ausencias y consulta y confirma sus recibos. Líder de cuadrilla registra ingresos y egresos manuales y anula ingresos.",
      },
    ],
  },
  {
    icono: ShieldCheck,
    titulo: "Diagramas de transición de estados",
    descripcion: "Ciclo de vida de obras, empleados y recibos de sueldo.",
    accion: "Ver Diagramas de Estados",
    diagramas: [
      {
        id: "obra",
        etiqueta: "Obra",
        imagen: "/diagramas/dte-obra",
        ancho: 2000,
        alto: 1800,
        alt: "Diagrama de transición de estados de Obra. Alta Obra crea la obra en Planificada. Gestionar Obra la pasa a Estados Dinámicos, que admite Gestionar Obra sobre sí mismo y hacia el estado final. Dar de baja a Obra lleva a Archivada desde Planificada o desde Estados Dinámicos, y Archivada termina en el estado final.",
      },
      {
        id: "empleado",
        etiqueta: "Empleado",
        imagen: "/diagramas/dte-empleado",
        ancho: 2600,
        alto: 1560,
        alt: "Diagrama de transición de estados de Empleado. Registrar Alta Empleado lo deja Activo. Desde Activo, Asignar empleado a cuadrilla lo pasa a En obra; aceptar una solicitud de justificación de ausencia o sincronizar licencias vigentes, a Licencia (Enfermedad/Vacaciones); y Registrar Baja empleado, a Inactivo. En obra vuelve a Activo por gestión de estado de cuadrilla. Licencia vuelve a Activo al revocar la solicitud o al sincronizar licencias, o pasa a Inactivo con Registrar Baja empleado. Inactivo vuelve a Activo con Registrar Alta Empleado o termina en el estado final.",
      },
      {
        id: "recibo-sueldo",
        etiqueta: "Recibo de sueldo",
        imagen: "/diagramas/dte-recibo-sueldo",
        ancho: 1800,
        alto: 1880,
        alt: "Diagrama de transición de estados de Recibo de sueldo. Generar Recibos de Sueldo crea el recibo en Borrador, que admite Modificar recibo de sueldo sobre sí mismo. Desde Borrador, Modificar recibo de sueldo lo pasa a Generado y Cancelar recibo de sueldo, a Cancelado. Imprimir recibo de sueldo lleva de Generado a Pendiente de Lectura, y Confirmar lectura de recibo de sueldo, a Leído. Leído y Cancelado terminan en el estado final.",
      },
    ],
  },
  {
    icono: ChartColumn,
    titulo: "Mapa de módulos",
    descripcion:
      "Vista global de la arquitectura y las interacciones entre módulos.",
    accion: "Ver Mapa de Módulos",
    diagramas: [
      {
        id: "mapa-modulos",
        etiqueta: "Mapa de módulos",
        imagen: "/diagramas/mapa-modulos",
        ancho: 3000,
        alto: 2600,
        alt: "Mapa de módulos de LaborTrack organizado en tres capas. Arriba, Módulos Transversales: Autenticación y Control de Acceso; Gestión de Usuarios, Roles y Permisos; Auditoría y Trazabilidad, y Seguridad, con una flecha gruesa hacia la capa central. En el centro, Módulos Funcionales: Notificaciones y Alertas arriba y Búsqueda y Filtrado abajo, cada uno con una flecha hacia un grupo de diez módulos unidos entre sí por flechas que indican sus interacciones, algunas en ambos sentidos: Administración de Obras y Cuadrillas, Gestión de Legajos Digitales, Gestión de Seguridad e Higiene, Gestión y Control de Ausentismo, Gestión de Documentación, Gestión de Jornada de Trabajo, Control de Asistencia Descentralizado, Gestión de Recibo de Sueldo, Gestión Empresa y Asistente IA basado en RAG. Abajo, Módulos de Información y Control: Reportes e Informes; Tablero / Dashboard; Configuración y Parámetros, y Ayuda y Soporte al usuario, con una flecha gruesa hacia la capa central.",
      },
    ],
  },
];

export interface Pantalla {
  titulo: string;
  descripcion: string;
  formato: "escritorio" | "movil";
  // Sin captura se muestra un marcador.
  captura?: ImagenAmpliable;
}

// El orden arma las filas de la galería: una de escritorio junto a una de celular,
// o dos de escritorio juntas.
export const pantallas: Pantalla[] = [
  {
    titulo: "Tablero de control",
    descripcion:
      "Asistencia del día, empleados y obras activas, cuadrillas por estado y personal por obra.",
    formato: "escritorio",
    captura: {
      id: "tablero",
      etiqueta: "Tablero de control",
      imagen: "/capturas/dashboard",
      ancho: 1917,
      alto: 867,
      alt: "Pantalla Dashboard de LaborTrack en escritorio: menú lateral con los módulos del sistema; tarjeta de asistencia de hoy con la cantidad de empleados activos, obras activas y ausencias; gráfico de anillo de cuadrillas por estado (en espera, activa, suspendida y finalizada); barras de personal por obra para las cinco obras con más operarios, y el comienzo del gráfico de tendencia de asistencia.",
    },
  },
  {
    titulo: "Recibos",
    descripcion: "Recibos del período con totales y estado de lectura.",
    formato: "movil",
    captura: {
      id: "recibos",
      etiqueta: "Recibos",
      imagen: "/capturas/recibosMobile",
      ancho: 272,
      alto: 597,
      alt: "Pantalla de recibos en celular: selector de la quincena con el período marcado como cerrado; tarjetas con la cantidad de recibos, el total bruto y el total neto; pestañas para filtrar por todos, pendientes de lectura y leídos, y el comienzo de la lista de empleados con su categoría.",
    },
  },
  {
    titulo: "Asistente virtual",
    descripcion:
      "Tracky, el asistente virtual, para consultar normativas, protocolos y documentación institucional.",
    formato: "movil",
    captura: {
      id: "asistente",
      etiqueta: "Asistente virtual",
      imagen: "/capturas/trackyMobile",
      ancho: 346,
      alto: 751,
      alt: "Pantalla del asistente virtual Tracky en celular: el saludo «¡Hola! Soy Tracky», que ofrece ayuda con normativas, protocolos y documentación institucional de LaborTrack; una consulta de ejemplo sobre qué EPP es obligatorio en obra; el campo para escribir la consulta y el aviso de que Tracky puede equivocarse.",
    },
  },
  {
    titulo: "Fichado con QR",
    descripcion: "Código QR de la obra que se proyecta en pantalla para que el operario lo escanee.",
    formato: "escritorio",
    captura: {
      id: "fichado-qr",
      etiqueta: "Fichado con QR",
      imagen: "/capturas/fichadoQR",
      ancho: 1912,
      alto: 862,
      alt: "Pantalla de registro de asistencia en escritorio: el título «Escaneá el código para registrar tu ingreso o egreso», el nombre de la obra, dos tarjetas que explican que el código es seguro, temporal y se renueva solo, y un código QR grande con el tiempo que falta para su renovación y la indicación de abrir «Mis asistencias» en LaborTrack y apuntar la cámara al código.",
    },
  },
  {
    titulo: "Detalle de obra",
    descripcion:
      "Estado actual, identificación contractual, capataz responsable e historial de estados con su motivo.",
    formato: "escritorio",
    captura: {
      id: "detalle-obra",
      etiqueta: "Detalle de obra",
      imagen: "/capturas/detalleObra",
      ancho: 1917,
      alto: 867,
      alt: "Pantalla de detalle de una obra en escritorio: arriba, los botones Mostrar QR, Gestionar cuadrillas y Más acciones; el estado actual «En ejecución» con su fecha de vigencia y la ubicación; la tarjeta de identificación contractual con la nomenclatura, el nombre oficial y el identificador interno; la tarjeta del capataz responsable con su DNI y datos de contacto, y el historial de estados y auditoría con el período y el motivo de cada registro.",
    },
  },
  {
    titulo: "Legajos",
    descripcion: "Búsqueda de empleados por DNI, nombre, CUIL, categoría UOCRA y estado.",
    formato: "escritorio",
    captura: {
      id: "legajos",
      etiqueta: "Legajos",
      imagen: "/capturas/legajos",
      ancho: 1917,
      alto: 862,
      alt: "Pantalla de gestión de legajos digitales en escritorio: buscador por DNI, nombre, apellido o CUIL; filtros por categoría UOCRA y estado; y una tabla de empleados con DNI, nombre y apellido, categoría, estado (En obra o Activo), fecha de ingreso y acceso a la ficha 360°.",
    },
  },
];

export const stack = [
  { capa: "Backend", tecnologias: "Java 21 · Spring Boot · Spring Security" },
  { capa: "Frontend", tecnologias: "React · TypeScript · Vite · Tailwind CSS" },
  { capa: "Datos", tecnologias: "PostgreSQL · pgvector · Hibernate Envers" },
  { capa: "IA", tecnologias: "Spring AI · Google Gemini · RAG" },
];

export const enLaObra = [
  {
    titulo: "Sin instalar nada",
    descripcion:
      "El operario entra desde un enlace en el navegador del celular. No hay app para descargar.",
  },
  {
    titulo: "Fichado con QR",
    descripcion:
      "Escanea el código de la obra al llegar y al irse. El capataz ve el parte diario al instante.",
  },
  {
    titulo: "EPP con constancia",
    descripcion:
      "Cada entrega de elementos de protección queda registrada y visada digitalmente.",
  },
  {
    titulo: "Escritorio para la oficina",
    descripcion:
      "RR.HH. y administración trabajan en pantalla grande con legajos, recibos y reportes.",
  },
];

export const equipo = {
  integrantes: [
    "García Nieto, Roberto",
    "Giacomelli, Luciano",
    "Moyano, Gonzalo",
    "Yanardi, Juan Cruz",
  ],
  directores: [
    "Dr. Ing. Raúl Moralejo",
    "Lic. Gustavo Manino",
    "Ing. Malena Casas Castrillejo",
    "Ing. María Teresita Cuccia",
    "Ing. Gonzalo Pozzoli",
    "Ing. Erica Caro",
  ],
};
