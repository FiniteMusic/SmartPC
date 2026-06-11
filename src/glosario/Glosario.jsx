import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Glosario.css";

/* ─────────────────────────────────────────────────────
   SVG Icons
───────────────────────────────────────────────────── */
const Icon = {
  Arrow: () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h12M8 2l6 6-6 6"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 8H2M8 2L2 8l6 6"/>
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  BookOpen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  Cpu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>
    </svg>
  ),
  Memory: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v16M10 4v16M14 4v16M18 4v16M2 8h20M2 16h20"/>
    </svg>
  ),
  HardDrive: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="10" ry="6"/><path d="M2 12c0 3.31 4.48 6 10 6s10-2.69 10-6"/>
    </svg>
  ),
  Monitor: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  Gpu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="10" rx="2"/>
      <circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/>
      <path d="M8 3v4M16 3v4M8 17v4M16 17v4"/>
    </svg>
  ),
  Battery: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/>
      <path d="M6 11h6"/>
    </svg>
  ),
  Tag: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  Gaming: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="3"/>
      <path d="M6 12h4M8 10v4M15 11h2M15 13h2"/>
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Palette: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2.26C4.19 13.47 3 11.38 3 9a7 7 0 0 1 7-7"/>
    </svg>
  ),
  Office: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 4L4 12M4 4l8 8"/>
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────
   Datos del Glosario
───────────────────────────────────────────────────── */
const GLOSSARY = [
  /* RENDIMIENTO */
  {
    id: "cpu",
    term: "CPU",
    full: "Procesador central",
    category: "Rendimiento",
    definition: "El cerebro de la computadora. Coordina y ejecuta todas las tareas: abrir programas, procesar datos, manejar la multitarea.",
    why: "Una CPU más potente hace que todo responda más rápido. Para programación, diseño o multitarea intensa, la diferencia es enorme.",
    example: "Intel Core i5 vs i7: el i7 tiene más núcleos y responde mejor al abrir muchos programas a la vez.",
  },
  {
    id: "nucleos",
    term: "Núcleos e hilos",
    full: "Cores & Threads",
    category: "Rendimiento",
    definition: "Los núcleos son las unidades de procesamiento dentro de la CPU. Los hilos son tareas simultáneas que puede manejar cada núcleo.",
    why: "Más núcleos = más tareas en paralelo. Para edición de video o programación con herramientas pesadas, esto marca la diferencia.",
    example: "Un procesador de 6 núcleos puede compilar código mientras tienes el navegador y Spotify abiertos sin perder velocidad.",
  },
  {
    id: "frecuencia",
    term: "Frecuencia del procesador",
    full: "GHz — Gigahercios",
    category: "Rendimiento",
    definition: "Indica cuántos ciclos de operación ejecuta la CPU por segundo. Se mide en GHz (gigahercios).",
    why: "Mayor frecuencia = respuesta más rápida en tareas individuales. Más relevante para gaming que para multitarea.",
    example: "Una CPU a 4.5 GHz responde más rápido en juegos que una a 3.2 GHz aunque ambas tengan los mismos núcleos.",
  },
  {
    id: "benchmark",
    term: "Benchmark",
    full: "Prueba de rendimiento",
    category: "Rendimiento",
    definition: "Una prueba estandarizada que mide qué tan rápido es un componente. Da un número que permite comparar equipos de forma objetiva.",
    why: "SmartPC usa benchmarks para comparar procesadores y tarjetas gráficas sin depender de palabras de marketing como 'poderoso' o 'rápido'.",
    example: "Cinebench R23, Passmark y 3DMark son benchmarks conocidos. Puedes buscar el modelo de la laptop y comparar sus puntajes.",
  },
  {
    id: "score",
    term: "Score de componente",
    full: "Puntuación de rendimiento",
    category: "Rendimiento",
    definition: "Número que SmartPC asigna a un componente (CPU, GPU, RAM) según su benchmark. Permite comparar equipos de distinto precio en escala uniforme.",
    why: "Sin este número, comparar un 'i5' con un 'Ryzen 5' sería confuso. El score convierte especificaciones técnicas en una métrica clara.",
    example: "Una laptop con score CPU 72 y GPU 68 suele ser mejor para gaming que una con CPU 85 y GPU 40, dependiendo de tu uso.",
  },

  /* MEMORIA */
  {
    id: "ram",
    term: "RAM",
    full: "Memoria de acceso aleatorio",
    category: "Memoria",
    definition: "La memoria de trabajo de la computadora. Almacena temporalmente los programas que estás usando ahora mismo.",
    why: "Con poca RAM, la computadora se vuelve lenta cuando tienes varias cosas abiertas. 8 GB es el mínimo hoy; 16 GB es lo recomendable.",
    example: "Con 8 GB puedes tener 15 pestañas en Chrome. Con 16 GB puedes hacer eso y tener Visual Studio Code abierto al mismo tiempo.",
  },
  {
    id: "ddr4",
    term: "DDR4",
    full: "Double Data Rate 4",
    category: "Memoria",
    definition: "Tipo de memoria RAM de la generación anterior, aún muy común en laptops actuales.",
    why: "Funciona perfectamente para la mayoría de usuarios. Las laptops con DDR4 suelen ser más económicas.",
    example: "La mayoría de laptops de gama media-baja en 2024 usan DDR4. Es suficiente para oficina, escuela y programación ligera.",
  },
  {
    id: "ddr5",
    term: "DDR5",
    full: "Double Data Rate 5",
    category: "Memoria",
    definition: "La generación actual de memoria RAM, más rápida y eficiente que DDR4.",
    why: "Mejora el rendimiento en tareas que mueven mucha información entre la CPU y la memoria. Más relevante para diseño, edición y gaming de alto nivel.",
    example: "Laptops premium con procesadores Intel de 12.ª gen o superiores suelen incluir DDR5.",
  },
  {
    id: "ram-expandible",
    term: "Memoria expandible",
    full: "Slots de RAM accesibles",
    category: "Memoria",
    definition: "Indica si puedes agregar más RAM a la laptop en el futuro. Algunas laptops tienen la RAM soldada y no se puede cambiar.",
    why: "Si compras una laptop con 8 GB pero con slots disponibles, puedes ampliarla a 16 GB en el futuro sin comprar equipo nuevo.",
    example: "Las laptops de la línea Lenovo IdeaPad suelen tener RAM expandible. Las MacBook y muchas ultrabooks tienen RAM soldada.",
  },

  /* ALMACENAMIENTO */
  {
    id: "ssd",
    term: "SSD",
    full: "Solid State Drive",
    category: "Almacenamiento",
    definition: "Tipo de almacenamiento sin partes mecánicas. Es mucho más rápido que un disco duro tradicional.",
    why: "Con SSD, Windows inicia en 10-15 segundos, los programas abren casi al instante y el equipo no se siente lento con el tiempo.",
    example: "Una laptop con SSD de 256 GB se siente más rápida que una con HDD de 1 TB, aunque tenga menos espacio.",
  },
  {
    id: "nvme",
    term: "NVMe",
    full: "Non-Volatile Memory Express",
    category: "Almacenamiento",
    definition: "Protocolo de conexión para SSDs de alta velocidad. Es notablemente más rápido que un SSD convencional (SATA).",
    why: "Para programación, diseño o edición de video, el NVMe reduce los tiempos de carga de proyectos grandes significativamente.",
    example: "Un SSD NVMe puede leer datos a 3,500 MB/s. Un SSD SATA lo hace a ~500 MB/s. La diferencia se nota al abrir proyectos grandes.",
  },
  {
    id: "capacidad",
    term: "Capacidad de almacenamiento",
    full: "GB / TB disponibles",
    category: "Almacenamiento",
    definition: "Cuánto espacio tienes para guardar archivos, programas, juegos y sistema operativo.",
    why: "Un sistema operativo con programas básicos ocupa ~50 GB. Los juegos modernos pueden ocupar 60-100 GB cada uno. Planifica según tu uso.",
    example: "Para oficina o escuela: 256 GB es suficiente. Para gaming o edición de video: 512 GB–1 TB es más adecuado.",
  },
  {
    id: "hdd",
    term: "HDD",
    full: "Hard Disk Drive",
    category: "Almacenamiento",
    definition: "Disco duro mecánico tradicional. Tiene partes físicas que giran para leer y escribir datos. Más lento que un SSD.",
    why: "Hoy es un indicador de gama baja o de almacenamiento secundario. Si una laptop nueva solo tiene HDD, considera otra opción.",
    example: "Algunos equipos tienen HDD de 1 TB + SSD de 128 GB. El sistema operativo corre en el SSD y los archivos se guardan en el HDD.",
  },

  /* GRÁFICOS */
  {
    id: "gpu",
    term: "GPU",
    full: "Unidad de procesamiento gráfico",
    category: "Gráficos",
    definition: "El componente encargado de generar imágenes, videos y gráficos en tu pantalla. Es indispensable para gaming y edición visual.",
    why: "Para gaming o edición de video, la GPU es tan importante como la CPU. Una GPU débil crea el mayor cuello de botella en rendimiento gráfico.",
    example: "Renderizar un video en Premiere Pro tarda 10 minutos con GPU dedicada vs 45 minutos solo con la gráfica integrada.",
  },
  {
    id: "gpu-integrada",
    term: "GPU integrada",
    full: "Gráficos integrados",
    category: "Gráficos",
    definition: "GPU que viene incluida dentro del mismo procesador. Comparte la memoria RAM del sistema.",
    why: "Sirve para uso cotidiano, videos y trabajo de oficina. No está diseñada para gaming exigente ni edición de video profesional.",
    example: "Intel Iris Xe, AMD Radeon Graphics. Perfectas para navegar, presentaciones, videoconferencias y trabajo en documentos.",
  },
  {
    id: "gpu-dedicada",
    term: "GPU dedicada",
    full: "Tarjeta gráfica independiente",
    category: "Gráficos",
    definition: "GPU separada con su propia memoria dedicada (VRAM). Mucho más potente que la gráfica integrada.",
    why: "Si necesitas gaming, edición de video, diseño 3D o inteligencia artificial, necesitas GPU dedicada.",
    example: "NVIDIA RTX 4060, AMD RX 7600M. Con una de estas puedes jugar títulos modernos o editar video 4K sin problema.",
  },
  {
    id: "vram",
    term: "VRAM",
    full: "Video RAM",
    category: "Gráficos",
    definition: "Memoria exclusiva de la GPU. Almacena las texturas, modelos y datos visuales que la tarjeta gráfica procesa.",
    why: "Para gaming en alta resolución o edición de video 4K, necesitas al menos 6-8 GB de VRAM. Con menos, el rendimiento baja notablemente.",
    example: "Una RTX 4050 tiene 6 GB VRAM. Una RTX 4070 tiene 8 GB. La diferencia importa en juegos con texturas en Ultra.",
  },
  {
    id: "rtx-gtx",
    term: "RTX / GTX",
    full: "Líneas de GPU NVIDIA",
    category: "Gráficos",
    definition: "Familias de tarjetas gráficas de NVIDIA. GTX es la generación anterior; RTX incluye tecnologías como Ray Tracing y DLSS para mejor rendimiento visual.",
    why: "Para gaming moderno, la RTX ofrece ventajas reales: mejor imagen, mejor rendimiento con IA (DLSS) y soporte a largo plazo.",
    example: "RTX 4060 vs GTX 1660: la RTX es más eficiente, más rápida y compatible con DLSS para aumentar FPS sin perder calidad.",
  },

  /* PANTALLA */
  {
    id: "resolucion",
    term: "Resolución",
    full: "Píxeles de la pantalla",
    category: "Pantalla",
    definition: "Cantidad de puntos que forman la imagen. Más resolución = imagen más nítida y detallada.",
    why: "Para diseño gráfico o edición de foto/video, la resolución importa mucho. Para oficina, Full HD es más que suficiente.",
    example: "1920×1080 (Full HD) es el estándar actual. 2560×1600 (QHD) ofrece mayor nitidez. 3840×2160 (4K) para trabajo profesional.",
  },
  {
    id: "full-hd",
    term: "Full HD",
    full: "1920 × 1080 píxeles",
    category: "Pantalla",
    definition: "La resolución estándar más común. Ofrece una imagen clara y nítida para la mayoría de usos cotidianos.",
    why: "Para oficina, programación, entretenimiento y gaming casual es más que suficiente. El 90% de contenido está optimizado para esta resolución.",
    example: "La mayoría de laptops entre $8,000 y $20,000 MXN incluyen pantalla Full HD. Es el punto de referencia del mercado.",
  },
  {
    id: "wuxga",
    term: "WUXGA",
    full: "1920 × 1200 píxeles",
    category: "Pantalla",
    definition: "Resolución ligeramente más alta que Full HD con un poco más de espacio vertical. Común en laptops de productividad.",
    why: "Ideal para programadores y diseñadores que trabajan con muchas ventanas. El espacio extra vertical reduce el scroll.",
    example: "El ThinkPad X1 Carbon y varios modelos Dell XPS usan WUXGA para mejorar la experiencia de trabajo.",
  },
  {
    id: "oled",
    term: "OLED",
    full: "Organic Light Emitting Diode",
    category: "Pantalla",
    definition: "Tecnología de pantalla donde cada píxel emite su propia luz. Ofrece negros absolutos, colores vibrantes y contraste superior.",
    why: "Para diseño gráfico, fotografía o simplemente disfrutar de contenido visual, una pantalla OLED es una experiencia claramente superior.",
    example: "Samsung Galaxy Book Pro y Dell XPS 15 ofrecen versiones OLED. El costo es mayor pero la calidad visual es notablemente mejor.",
  },
  {
    id: "hz",
    term: "Frecuencia de actualización",
    full: "Hz — Hercios",
    category: "Pantalla",
    definition: "Cuántas veces por segundo se actualiza la imagen en la pantalla. Más Hz = movimiento más fluido.",
    why: "Para gaming es muy importante. 144 Hz hace que los juegos se vean notablemente más fluidos que 60 Hz. Para oficina, 60 Hz es suficiente.",
    example: "60 Hz: uso general y oficina. 120 Hz: gaming casual. 144-165 Hz: gaming competitivo. 240 Hz+: gaming profesional.",
  },
  {
    id: "tamano-pantalla",
    term: "Tamaño de pantalla",
    full: "Pulgadas — diagonal",
    category: "Pantalla",
    definition: "Medida diagonal de la pantalla en pulgadas. No indica calidad de imagen, solo el tamaño físico.",
    why: "Una pantalla grande es más cómoda para trabajo, pero hace la laptop más pesada. Una pequeña es más portátil pero puede cansar más la vista.",
    example: "13-14\" para viajes y movilidad. 15.6\" para el balance entre portabilidad y comodidad. 17\" para trabajo estacionario.",
  },

  /* PORTABILIDAD */
  {
    id: "peso",
    term: "Peso",
    full: "Kilogramos",
    category: "Portabilidad",
    definition: "Cuánto pesa la laptop. Impacta directamente en la comodidad si la cargas todos los días.",
    why: "Llevar 2.5 kg diariamente en una mochila se nota. Si te mueves mucho, busca laptops bajo 1.5 kg.",
    example: "MacBook Air M2: 1.24 kg. Lenovo ThinkPad X1: 1.12 kg. ASUS ROG Zephyrus: 2.1 kg. Laptops gaming típicas: 2.3-2.8 kg.",
  },
  {
    id: "bateria",
    term: "Batería",
    full: "Autonomía en horas",
    category: "Portabilidad",
    definition: "Cuánto tiempo dura la laptop con una carga completa. Se mide en horas y depende del uso.",
    why: "Para estudiantes o trabajadores que se mueven, una batería de 8+ horas evita cargar el adaptador a todos lados.",
    example: "Las MacBook con chip Apple suelen durar 15-18 horas. Laptops gaming: 3-5 horas. Ultrabooks Windows: 8-12 horas.",
  },
  {
    id: "cargador",
    term: "Cargador",
    full: "Adaptador de corriente",
    category: "Portabilidad",
    definition: "El adaptador que conectas a la corriente para cargar la laptop. Importa su tamaño, peso y si usa USB-C.",
    why: "Los cargadores de laptops gaming son grandes y pesados. Los que usan USB-C son más versátiles y compactos.",
    example: "Una laptop con carga por USB-C puede cargarse con cualquier cargador compatible, incluyendo baterías portátiles.",
  },
  {
    id: "ultrabook",
    term: "Ultrabook",
    full: "Laptop ultradelgada",
    category: "Portabilidad",
    definition: "Categoría de laptops diseñadas para ser muy delgadas, ligeras y de larga batería. Priorizan portabilidad sobre rendimiento máximo.",
    why: "Si viajas mucho o usas la laptop en clases o reuniones, una ultrabook es cómoda de llevar y dura todo el día.",
    example: "Dell XPS 13, LG Gram, ASUS ZenBook 14. Pesan menos de 1.5 kg y duran más de 10 horas.",
  },

  /* COMPRA INTELIGENTE */
  {
    id: "calidad-precio",
    term: "Relación calidad-precio",
    full: "Value for money",
    category: "Compra inteligente",
    definition: "Qué tan buenas son las especificaciones de un equipo en comparación con su precio. Un equipo puede ser caro sin ser el mejor para ti.",
    why: "SmartPC evalúa esta relación automáticamente. No siempre el equipo más caro es el más adecuado para tu uso.",
    example: "Una laptop de $15,000 MXN con SSD, 16 GB RAM y buena CPU puede superar en valor a una de $22,000 con extras que no usarás.",
  },
  {
    id: "gama",
    term: "Gama de equipo",
    full: "Nivel de precio / segmento",
    category: "Compra inteligente",
    definition: "Categoría del equipo según su nivel de precio y especificaciones: gama baja, media, alta o premium.",
    why: "Conocer la gama te ayuda a tener expectativas realistas. Un equipo de gama baja es perfecto para tareas básicas pero no para gaming.",
    example: "Gama baja: hasta $8,000 MXN. Media: $8,000-$18,000. Alta: $18,000-$30,000. Premium: +$30,000.",
  },
  {
    id: "reacondicionado",
    term: "Equipo reacondicionado",
    full: "Refurbished",
    category: "Compra inteligente",
    definition: "Equipo usado que fue revisado, reparado si era necesario, y puesto a la venta con garantía. No es nuevo pero funciona como tal.",
    why: "Puede ser una forma de acceder a un equipo de gama alta pagando el precio de uno de gama media.",
    example: "Una MacBook Pro reacondicionada por Apple incluye garantía oficial y puede costar 20-30% menos que una nueva.",
  },
  {
    id: "cuello-botella",
    term: "Cuello de botella",
    full: "Bottleneck",
    category: "Compra inteligente",
    definition: "Cuando un componente es tan débil que limita el rendimiento de los demás. El componente más lento define la velocidad del sistema.",
    why: "Una GPU potente con poca RAM es un cuello de botella. Gastar en GPU sin una CPU adecuada desperdicia tu inversión.",
    example: "Poner una RTX 4080 con un i3 de 2 núcleos: la CPU limita tanto la GPU que desperdicias el 70% de su capacidad.",
  },
  {
    id: "sobrecompra",
    term: "Sobrecompra",
    full: "Overspending / Overspec",
    category: "Compra inteligente",
    definition: "Pagar por especificaciones que nunca vas a usar. Comprar un equipo de gaming para solo ver Netflix y escribir documentos.",
    why: "SmartPC existe precisamente para evitar esto. Un equipo justo para tu uso es suficiente y te ahorra dinero.",
    example: "Comprar una laptop con RTX 4070 para tomar notas y hacer Excel es pagar de más por rendimiento que nunca aprovecharás.",
  },
];

/* ─────────────────────────────────────────────────────
   Categorías
───────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "Rendimiento", label: "Rendimiento" },
  { id: "Memoria", label: "Memoria" },
  { id: "Almacenamiento", label: "Almacenamiento" },
  { id: "Gráficos", label: "Gráficos" },
  { id: "Pantalla", label: "Pantalla" },
  { id: "Portabilidad", label: "Portabilidad" },
  { id: "Compra inteligente", label: "Compra inteligente" },
];

const CATEGORY_ICON = {
  "Rendimiento":       <Icon.Cpu />,
  "Memoria":           <Icon.Memory />,
  "Almacenamiento":    <Icon.HardDrive />,
  "Gráficos":          <Icon.Gpu />,
  "Pantalla":          <Icon.Monitor />,
  "Portabilidad":      <Icon.Battery />,
  "Compra inteligente":<Icon.Tag />,
};

/* ─────────────────────────────────────────────────────
   Perfil de uso → prioridades
───────────────────────────────────────────────────── */
const PROFILES = [
  {
    icon: <Icon.Gaming />,
    label: "Gaming",
    color: "teal",
    desc: "Juegos modernos, alto rendimiento visual",
    priorities: [
      { comp: "GPU dedicada", reason: "Es el componente más importante. Define los FPS y la calidad visual de los juegos." },
      { comp: "CPU rápida", reason: "Necesitas que la CPU no limite a la GPU. Al menos un Core i5 o Ryzen 5 de generación reciente." },
      { comp: "Pantalla 120Hz+", reason: "Un monitor de alta frecuencia hace la diferencia entre gaming suave y entrecortado." },
      { comp: "16 GB RAM", reason: "Los juegos modernos consumen 8-12 GB. 16 GB te da margen para seguir navegando mientras juegas." },
    ],
  },
  {
    icon: <Icon.Code />,
    label: "Programación",
    color: "navy",
    desc: "Desarrollo, servidores, IDEs, compilación",
    priorities: [
      { comp: "CPU con varios núcleos", reason: "Compilar proyectos, correr contenedores y manejar IDEs pesados demanda núcleos, no solo GHz." },
      { comp: "16-32 GB RAM", reason: "Docker, múltiples servicios corriendo, el IDE y el navegador con 20 pestañas: la RAM se va rápido." },
      { comp: "SSD NVMe", reason: "Los tiempos de compilación y carga de proyectos son notablemente más cortos con almacenamiento rápido." },
      { comp: "Pantalla cómoda", reason: "Pasas horas mirando código. Una pantalla WUXGA o QHD con buen brillo reduce la fatiga visual." },
    ],
  },
  {
    icon: <Icon.Palette />,
    label: "Diseño / Edición",
    color: "teal",
    desc: "Foto, video, 3D, diseño gráfico",
    priorities: [
      { comp: "Pantalla de calidad", reason: "El color preciso importa. Busca cobertura sRGB 100% o DCI-P3. OLED es ideal si el presupuesto lo permite." },
      { comp: "GPU dedicada", reason: "Exportar video, renderizar en 3D o usar IA en Photoshop se acelera enormemente con GPU dedicada." },
      { comp: "CPU potente", reason: "Edición de video y renderizado son muy dependientes de la CPU. Más núcleos = exportación más rápida." },
      { comp: "16-32 GB RAM", reason: "Trabajar con proyectos de video 4K o archivos PSD grandes requiere RAM generosa para no perder fluidez." },
    ],
  },
  {
    icon: <Icon.Office />,
    label: "Oficina / Escuela",
    color: "navy",
    desc: "Documentos, correo, videoconferencias",
    priorities: [
      { comp: "CPU suficiente", reason: "No necesitas lo más potente. Un i5 o Ryzen 5 de generación reciente es más que suficiente." },
      { comp: "8-16 GB RAM", reason: "Para navegador, Office y videoconferencias simultáneas, 8 GB funciona bien. 16 GB es muy holgado." },
      { comp: "SSD", reason: "La diferencia entre un equipo que 'se siente lento' y uno ágil suele ser el tipo de almacenamiento, no la CPU." },
      { comp: "Buena batería", reason: "Para trabajar sin enchufar en reuniones o clases. Busca 8+ horas de autonomía real." },
    ],
  },
];

/* ─────────────────────────────────────────────────────
   Ficha técnica de ejemplo
───────────────────────────────────────────────────── */
const SPEC_EXAMPLE = {
  raw: "Laptop Gamer Lenovo LOQ 15, Intel Core i5-12450HX, RTX 4050, 16GB RAM DDR5, 512GB SSD NVMe, 15.6\" 144Hz",
  parts: [
    { label: "Marca y modelo", value: "Lenovo LOQ 15", desc: "Serie orientada a gaming de entrada-gama media de Lenovo.", color: "default" },
    { label: "Procesador (CPU)", value: "Intel Core i5-12450HX", desc: "CPU de Intel de 12.ª generación, 8 núcleos. Suficiente para gaming y programación.", color: "teal" },
    { label: "Tarjeta gráfica (GPU)", value: "NVIDIA RTX 4050", desc: "GPU dedicada NVIDIA. Capaz de correr juegos modernos en 1080p con buenas tasas de FPS.", color: "teal" },
    { label: "Memoria RAM", value: "16 GB DDR5", desc: "Memoria amplia con tecnología actual. Ideal para gaming y multitarea.", color: "teal" },
    { label: "Almacenamiento", value: "512 GB SSD NVMe", desc: "Almacenamiento rápido. El sistema inicia en segundos y los juegos cargan rápido.", color: "teal" },
    { label: "Pantalla", value: "15.6 pulgadas, 144Hz", desc: "Tamaño estándar para gaming. 144 Hz da fluidez notable en juegos de acción.", color: "teal" },
  ],
};

/* ═══════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════ */
export default function Glosario() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return GLOSSARY.filter((item) => {
      const matchCategory =
        activeCategory === "todos" || item.category === activeCategory;
      if (!matchCategory) return false;
      if (!q) return true;
      return (
        item.term.toLowerCase().includes(q) ||
        item.full.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.why.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  const toggleExpand = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="gls-root">
      {/* ── NAV ── */}
      <nav className={`gls-nav${scrolled ? " gls-nav--scrolled" : ""}`}>
        <div className="gls-nav__inner">
         <a href="#" className="nav__logo">
            <img
              src="/logo_only.svg"
              alt="SmartPC"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span className="nav__logo-text">Smart<em>PC</em></span>
          </a>
          <ul className="gls-nav__links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/recomendador">Recomendador</Link></li>
            <li><Link to="/glosario" className="gls-nav__link--active">Glosario técnico</Link></li>
          </ul>
          <div className="gls-nav__right">
            <Link to="/recomendador" className="gls-nav__cta">
              Ir al recomendador <Icon.Arrow />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="gls-hero" id="gls-hero">
        <div className="gls-hero__bg-grid" aria-hidden="true" />
        <div className="gls-hero__content anim">
          <div className="gls-hero__tag">
            <Icon.BookOpen />
            Glosario SmartPC
          </div>
          <h1 className="gls-hero__title">
            Entiende las especificaciones<br />
            <em>antes de elegir tu computadora</em>
          </h1>
          <p className="gls-hero__sub">
            CPU, GPU, RAM, SSD, Hz… aquí explicamos cada término en lenguaje claro para que puedas tomar decisiones informadas, sin necesitar ser experto.
          </p>
          <Link to="/recomendador" className="gls-btn-primary">
            Ir al recomendador <Icon.Arrow />
          </Link>
        </div>
        <div className="gls-hero__stats" aria-hidden="true">
          <div className="gls-hero__stat">
            <span className="gls-hero__stat-n">{GLOSSARY.length}</span>
            <span className="gls-hero__stat-l">Términos</span>
          </div>
          <div className="gls-hero__stat-sep" />
          <div className="gls-hero__stat">
            <span className="gls-hero__stat-n">{CATEGORIES.length - 1}</span>
            <span className="gls-hero__stat-l">Categorías</span>
          </div>
          <div className="gls-hero__stat-sep" />
          <div className="gls-hero__stat">
            <span className="gls-hero__stat-n">0</span>
            <span className="gls-hero__stat-l">Tecnicismos innecesarios</span>
          </div>
        </div>
      </header>

      {/* ── BUSCADOR + FILTROS ── */}
      <section className="gls-search-section">
        <div className="gls-search-inner">
          <div className="gls-search-box">
            <span className="gls-search-icon" aria-hidden="true"><Icon.Search /></span>
            <input
              type="text"
              className="gls-search-input"
              placeholder="Busca un término, como 'GPU', 'velocidad' o 'video'…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar términos del glosario"
            />
            {query && (
              <button
                className="gls-search-clear"
                onClick={() => setQuery("")}
                aria-label="Limpiar búsqueda"
              >
                <Icon.Close />
              </button>
            )}
          </div>
          <div className="gls-filters" role="group" aria-label="Filtrar por categoría">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`gls-filter-btn${activeCategory === cat.id ? " active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.id !== "todos" && (
                  <span className="gls-filter-icon" aria-hidden="true">
                    {CATEGORY_ICON[cat.id]}
                  </span>
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOSARIO ── */}
      <section className="gls-terms-section">
        <div className="gls-terms-inner">
          {filtered.length > 0 ? (
            <>
              <p className="gls-terms-count">
                {filtered.length === GLOSSARY.length
                  ? `${GLOSSARY.length} términos`
                  : `${filtered.length} de ${GLOSSARY.length} términos`}
              </p>
              <div className="gls-terms-grid">
                {filtered.map((item) => {
                  const isOpen = expandedId === item.id;
                  return (
                    <article key={item.id} className={`gls-card${isOpen ? " gls-card--open" : ""}`}>
                      <button
                        className="gls-card__header"
                        onClick={() => toggleExpand(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`gls-body-${item.id}`}
                      >
                        <div className="gls-card__title-row">
                          <span className="gls-card__cat-dot" aria-hidden="true" />
                          <div>
                            <h3 className="gls-card__term">{item.term}</h3>
                            <span className="gls-card__full">{item.full}</span>
                          </div>
                        </div>
                        <div className="gls-card__meta">
                          <span className="gls-card__cat-badge">{item.category}</span>
                          <span className="gls-card__chevron" aria-hidden="true">
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 6l4 4 4-4"/>
                            </svg>
                          </span>
                        </div>
                      </button>
                      <div
                        id={`gls-body-${item.id}`}
                        className="gls-card__body"
                        hidden={!isOpen}
                      >
                        <p className="gls-card__definition">{item.definition}</p>
                        <div className="gls-card__block gls-card__block--why">
                          <span className="gls-card__block-label">Por qué importa</span>
                          <p>{item.why}</p>
                        </div>
                        <div className="gls-card__block gls-card__block--example">
                          <span className="gls-card__block-label">Ejemplo práctico</span>
                          <p>{item.example}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="gls-empty">
              <div className="gls-empty__icon" aria-hidden="true"><Icon.Search /></div>
              <p className="gls-empty__title">Sin resultados para "{query}"</p>
              <p className="gls-empty__sub">
                Intenta con otro término: "RAM", "pantalla", "batería", "velocidad"…
              </p>
              <button
                className="gls-btn-ghost"
                onClick={() => { setQuery(""); setActiveCategory("todos"); }}
              >
                Ver todos los términos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CÓMO LEER UNA FICHA TÉCNICA ── */}
      <section className="gls-spec-section">
        <div className="gls-spec-inner">
          <div className="gls-section-eyebrow">
            <Icon.Info />
            Lectura de fichas
          </div>
          <h2 className="gls-section-title">
            Cómo leer una ficha técnica
          </h2>
          <p className="gls-section-desc">
            Cuando ves esto en una tienda, ¿sabes qué significa cada parte?
          </p>

          <div className="gls-spec-example">
            <div className="gls-spec-raw" aria-label="Especificación completa de ejemplo">
              {SPEC_EXAMPLE.raw}
            </div>
            <div className="gls-spec-parts">
              {SPEC_EXAMPLE.parts.map((part, i) => (
                <div key={i} className={`gls-spec-part${part.color === "teal" ? " gls-spec-part--teal" : ""}`}>
                  <span className="gls-spec-part__label">{part.label}</span>
                  <span className="gls-spec-part__value">{part.value}</span>
                  <p className="gls-spec-part__desc">{part.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUÉ PRIORIZAR SEGÚN TU PERFIL ── */}
      <section className="gls-profiles-section">
        <div className="gls-profiles-inner">
          <div className="gls-section-eyebrow">
            <Icon.Tag />
            Prioridades por perfil
          </div>
          <h2 className="gls-section-title">
            Qué priorizar según tu uso
          </h2>
          <p className="gls-section-desc">
            No todos necesitan lo mismo. Aquí te decimos qué componentes importan más para cada tipo de usuario.
          </p>
          <div className="gls-profiles-grid">
            {PROFILES.map((profile, i) => (
              <div key={i} className="gls-profile-card">
                <div className="gls-profile-card__header">
                  <div className="gls-profile-card__icon">{profile.icon}</div>
                  <div>
                    <h3 className="gls-profile-card__name">{profile.label}</h3>
                    <p className="gls-profile-card__desc">{profile.desc}</p>
                  </div>
                </div>
                <ol className="gls-profile-card__list">
                  {profile.priorities.map((p, j) => (
                    <li key={j} className="gls-profile-card__item">
                      <span className="gls-profile-card__n">{j + 1}</span>
                      <div>
                        <span className="gls-profile-card__comp">{p.comp}</span>
                        <p className="gls-profile-card__reason">{p.reason}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="gls-cta-section">
        <div className="gls-cta-inner">
          <p className="gls-cta-eyebrow">¿Listo para elegir?</p>
          <h2 className="gls-cta-title">
            Ahora que conoces los términos,<br />
            <em>deja que SmartPC compare por ti.</em>
          </h2>
          <p className="gls-cta-desc">
            Responde algunas preguntas sobre tu uso y presupuesto. El motor de recomendación hace el resto.
          </p>
          <Link to="/recomendador" className="gls-btn-primary gls-btn-primary--lg">
            Usar recomendador <Icon.Arrow />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__top">
            <div className="footer__brand">
              <div className="footer__logo">
               <img
                  src="/logo.svg"
                  alt="SmartPC"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <span className="footer__logo-text">Smart<em>PC</em></span>
              </div>
              <p className="footer__tagline">
                Tu asesor de cómputo inteligente.<br />
                Recomendaciones personalizadas,<br />resultados precisos.
              </p>
            </div>
            <div className="footer__cols">
              <div>
                <p className="footer__col-title">Plataforma</p>
                <div className="footer__col-links">
                  <Link to="/">Inicio</Link>
                  <Link to="/recomendador">Recomendador</Link>
                  <a href="#gls-hero">Glosario</a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__divider" />
          <div className="footer__bottom">
            <span className="footer__copy">© {new Date().getFullYear()} SmartPC. Todos los derechos reservados.</span>
            <div className="footer__legal">
              <Link to="/aviso-privacidad">Aviso de privacidad</Link>
              <span className="footer__legal-sep" />
              <Link to="/terminos-uso">Términos de uso</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}