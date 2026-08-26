/* ============================================================
   Sistema de iconos — trazo 1.25px, caja 24, esquinas rectas.
   Dibujados a mano para este proyecto: nada de emoji ni librería.
   ============================================================ */

type P = { size?: number; className?: string };

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

/* ---------- Servicios ---------- */
export const IconSitio = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <rect x="2.5" y="4" width="19" height="15" rx="1.5" />
    <path d="M2.5 8h19" />
    <circle cx="5.4" cy="6" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="7.6" cy="6" r="0.5" fill="currentColor" stroke="none" />
    <path d="M6 11.5h7M6 14.5h4.5" />
    <path d="M16 12.5l2.2 2.2-2.2 2.2" />
  </svg>
);

export const IconChat = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M3 6.5A2.5 2.5 0 015.5 4h13A2.5 2.5 0 0121 6.5v7a2.5 2.5 0 01-2.5 2.5H9l-5 4v-4H5.5A2.5 2.5 0 013 13.5z" />
    <path d="M8 8.8h8M8 11.8h5" />
  </svg>
);

export const IconEnlace = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <rect x="2.5" y="8" width="7" height="8" rx="1.2" />
    <rect x="14.5" y="8" width="7" height="8" rx="1.2" />
    <path d="M9.5 12h5" />
    <path d="M12.6 10.4L14.5 12l-1.9 1.6" />
  </svg>
);

export const IconEngranes = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="9.5" cy="9.5" r="3.2" />
    <path d="M9.5 3.4v2M9.5 13.6v2M3.4 9.5h2M13.6 9.5h2M5.2 5.2l1.4 1.4M12.4 12.4l1.4 1.4M13.8 5.2l-1.4 1.4M6.6 12.4l-1.4 1.4" />
    <circle cx="17" cy="17" r="2.2" />
    <path d="M17 13.4v1.2M17 19.4v1.2M13.4 17h1.2M19.4 17h1.2" />
  </svg>
);

export const IconCarrito = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M2.5 4h2.2l2.4 10.5h10l2.4-7.4H6" />
    <circle cx="9.2" cy="19" r="1.4" />
    <circle cx="17.2" cy="19" r="1.4" />
  </svg>
);

export const IconChispa = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
    <path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
  </svg>
);

/* ---------- Sectores ---------- */
export const IconPulso = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M2.5 12h4l2-5 3 10 2.5-6 1.8 3h6" />
  </svg>
);

export const IconTijera = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="6" cy="18" r="2.4" />
    <circle cx="18" cy="18" r="2.4" />
    <path d="M7.7 16.2L18.5 3.5M16.3 16.2L5.5 3.5" />
  </svg>
);

export const IconPlato = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M3 12.5h18a9 9 0 01-18 0z" />
    <path d="M2 20h20" />
    <path d="M9 9.2c0-1.6 1.3-1.9 1.3-3.2S9 3.2 9 3.2M15 9.2c0-1.6 1.3-1.9 1.3-3.2S15 3.2 15 3.2" />
  </svg>
);

export const IconBalanza = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M12 3.5v17M6 20.5h12" />
    <path d="M4 7.5h16" />
    <path d="M4 7.5L1.8 13a2.6 2.6 0 004.4 0z" />
    <path d="M20 7.5L17.8 13a2.6 2.6 0 004.4 0z" />
  </svg>
);

export const IconCamion = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M1.5 6.5h12v9h-12z" />
    <path d="M13.5 10h4l3 3v2.5h-7z" />
    <circle cx="6" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </svg>
);

export const IconTienda = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M3 9.5V20h18V9.5" />
    <path d="M2 9.5l1.8-5.5h16.4L22 9.5a2.6 2.6 0 01-5 0 2.6 2.6 0 01-5 0 2.6 2.6 0 01-5 0 2.6 2.6 0 01-5 0z" />
    <path d="M9.5 20v-5.5h5V20" />
  </svg>
);

/* ---------- Proceso y utilidades ---------- */
export const IconFlecha = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M4 12h15" />
    <path d="M13.5 6.5L20 12l-6.5 5.5" />
  </svg>
);

export const IconMas = ({ size = 24, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconWhatsApp = ({ size = 24, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ---------- Marca ---------- */
export const Marca = ({ size = 30, className }: P) => (
  <svg
    width={size}
    height={size * 1.18}
    viewBox="0 0 96 114"
    fill="none"
    stroke="currentColor"
    strokeWidth={10}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className={className}
  >
    <path d="M18 80 V28 L48 60 L78 28 V80 M48 60 V94" />
  </svg>
);
