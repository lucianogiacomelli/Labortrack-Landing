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

export interface RecursoDocumentacion {
  icono: LucideIcon;
  titulo: string;
  descripcion: string;
  accion: string;
  // Sin href, la tarjeta se muestra como "Próximamente".
  href?: string;
}

export const documentacion: RecursoDocumentacion[] = [
  {
    icono: BookOpenText,
    titulo: "Diagrama de clases",
    descripcion:
      "Modelo de datos reducido con las entidades principales y sus relaciones.",
    accion: "Ver Diagrama de Clases Reducido",
  },
  {
    icono: UsersRound,
    titulo: "Modelo de casos de uso",
    descripcion:
      "Actores del sistema y casos de uso principales, agrupados por módulo.",
    accion: "Ver Casos de Uso Reducido",
  },
  {
    icono: ShieldCheck,
    titulo: "Diagramas de transición de estados",
    descripcion:
      "Ciclo de vida de obras, cuadrillas, jornadas y solicitudes de ausencia.",
    accion: "Ver Diagramas de Estados",
  },
  {
    icono: ChartColumn,
    titulo: "Mapa de módulos",
    descripcion:
      "Vista global de la arquitectura y las interacciones entre módulos.",
    accion: "Ver Mapa de Módulos",
  },
];

export interface Pantalla {
  titulo: string;
  descripcion: string;
  formato: "escritorio" | "movil";
  // Ruta de la captura dentro de /public. Sin imagen se muestra un marcador.
  src?: string;
}

export const pantallas: Pantalla[] = [
  {
    titulo: "Tablero de control",
    descripcion: "Indicadores de asistencia y personal por obra.",
    formato: "escritorio",
  },
  {
    titulo: "Fichado con QR",
    descripcion: "El operario registra su ingreso desde la obra.",
    formato: "movil",
  },
  {
    titulo: "Detalle de obra",
    descripcion: "Estado, cuadrillas y personal asignado.",
    formato: "escritorio",
  },
  {
    titulo: "Mis recibos",
    descripcion: "Consulta y conformidad del recibo de sueldo.",
    formato: "movil",
  },
  {
    titulo: "Legajos",
    descripcion: "Búsqueda y ficha completa del trabajador.",
    formato: "escritorio",
  },
  {
    titulo: "Asistente virtual",
    descripcion: "Respuestas sobre convenio, recibos y uso del sistema.",
    formato: "movil",
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
