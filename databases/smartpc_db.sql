-- SmartPC database schema and seed data


CREATE DATABASE IF NOT EXISTS `smartpc_db`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE `smartpc_db`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP VIEW IF EXISTS `vista_equipos_recomendacion`;
DROP TABLE IF EXISTS `detalle_recomendacion`;
DROP TABLE IF EXISTS `equipo_componentes`;
DROP TABLE IF EXISTS `perfil_pesos`;
DROP TABLE IF EXISTS `recomendaciones`;
DROP TABLE IF EXISTS `productos_scraping`;
DROP TABLE IF EXISTS `componentes`;
DROP TABLE IF EXISTS `equipos`;
DROP TABLE IF EXISTS `perfiles`;

-- Tablas
CREATE TABLE `componentes` (
  `id` int(11) NOT NULL,
  `tipo` enum('cpu','ram','gpu','almacenamiento','pantalla','bateria','portabilidad') NOT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Datos iniciales
INSERT INTO `componentes` (`id`, `tipo`, `modelo`, `score`) VALUES
(1, 'cpu', 'Intel Core i5-13420H', 75),
(2, 'ram', '16 GB RAM', 85),
(3, 'gpu', 'RTX 4050', 78),
(4, 'almacenamiento', '512 GB SSD', 80),
(5, 'pantalla', '15.6 pulgadas 1920x1080', 72),
(6, 'bateria', 'Batería no especificada', 60),
(7, 'portabilidad', 'Peso no especificado', 65),
(8, 'cpu', 'AMD Ryzen 7 7445HS', 85),
(9, 'ram', '16 GB RAM', 85),
(10, 'gpu', 'RTX 4050', 78),
(11, 'almacenamiento', '512 GB SSD', 80),
(12, 'pantalla', '15.6 pulgadas 1920x1080', 72),
(13, 'bateria', 'Batería no especificada', 60),
(14, 'portabilidad', 'Peso no especificado', 65),
(15, 'cpu', 'AMD Ryzen 5 7235HS', 75),
(16, 'ram', '8 GB RAM', 55),
(17, 'gpu', 'RTX 3050', 65),
(18, 'almacenamiento', '512 GB SSD', 80),
(19, 'pantalla', '15.6 pulgadas 1920x1080', 72),
(20, 'bateria', 'Batería no especificada', 60),
(21, 'portabilidad', 'Peso no especificado', 65),
(22, 'cpu', 'Intel Core i7-13620H', 85),
(23, 'ram', '16 GB RAM', 85),
(24, 'gpu', 'RTX 5060', 92),
(25, 'almacenamiento', '512 GB SSD', 80),
(26, 'pantalla', '15.6 pulgadas 1920x1080', 72),
(27, 'bateria', 'Batería no especificada', 60),
(28, 'portabilidad', 'Peso no especificado', 65),
(29, 'cpu', 'Intel Core i5-13420H', 75),
(30, 'ram', '16 GB RAM', 85),
(31, 'gpu', 'RTX 4060', 88),
(32, 'almacenamiento', '512 GB SSD', 80),
(33, 'pantalla', '15.6 pulgadas 1920x1080', 72),
(34, 'bateria', 'Batería no especificada', 60),
(35, 'portabilidad', 'Peso no especificado', 65),
(36, 'cpu', 'AMD Ryzen 5 7235HS', 75),
(37, 'ram', '32 GB RAM', 95),
(38, 'gpu', 'RTX 3050', 65),
(39, 'almacenamiento', '1024 GB SSD', 92),
(40, 'pantalla', '15.6 pulgadas 1920x1200', 82),
(41, 'bateria', 'Batería no especificada', 60),
(42, 'portabilidad', 'Peso no especificado', 65);

CREATE TABLE `detalle_recomendacion` (
  `id` int(11) NOT NULL,
  `recomendacion_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL,
  `score_final` decimal(5,2) NOT NULL,
  `posicion` int(11) NOT NULL,
  `explicacion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `equipos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `marca` varchar(80) DEFAULT NULL,
  `categoria` varchar(80) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `tienda` varchar(100) DEFAULT NULL,
  `link_tienda` text DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT 1,
  `descripcion` text DEFAULT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `equipos` (`id`, `nombre`, `marca`, `categoria`, `precio`, `tienda`, `link_tienda`, `disponible`, `descripcion`, `ultima_actualizacion`) VALUES
(1, 'HP Victus', 'HP', 'Gaming', 19259.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-HP-Victus-15-6-1920x1080-Full-HD-Intel-Core-i5-13420H-NVIDIA-GeForce-RTX-4050-16GB-512GB-SSD-Windows-11-Home-Ingles-2.html', 1, 'Equipo importado desde scraping. Gama detectada: Media.', '2026-06-11 14:52:00'),
(2, 'Laptop Gamer HP BM4X8UA', 'HP', 'Gaming', 18199.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-HP-BM4X8UA-15-6-1920x1080-Full-HD-AMD-Ryzen-7-7445HS-NVIDIA-GeForce-RTX-4050-16GB-512GB-SSD-Windows-11-Home-Ingles.html', 1, 'Equipo importado desde scraping. Gama detectada: Media.', '2026-06-11 14:52:02'),
(3, 'Lenovo LOQ 15ARP9', 'Lenovo', 'Gaming', 15449.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-Lenovo-LOQ-15ARP9-15-6-1920x1080-Full-HD-AMD-Ryzen-5-7235HS-NVIDIA-GeForce-RTX-3050-8GB-512GB-SSD-Windows-11-Home-Espanol.html', 1, 'Equipo importado desde scraping. Gama detectada: Media.', '2026-06-11 14:52:07'),
(4, 'HP Victus', 'HP', 'Gaming', 23379.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-HP-Victus-15-15-6-1920x1080-Full-HD-Intel-Core-i7-13620H-NVIDIA-GeForce-RTX-5060-16GB-512GB-SSD-Windows-11-Home-Ingles-2.html', 1, 'Equipo importado desde scraping. Gama detectada: Media-alta.', '2026-06-11 14:52:09'),
(5, 'Laptop Gamer MSI Thin 15 B13VF', 'MSI', 'Gaming', 16119.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-MSI-Thin-15-B13VF-15-6-1920x1080-Full-HD-Intel-Core-i5-13420H-NVIDIA-GeForce-RTX-4060-16GB-512GB-SSD-Windows-11-Home-Ingles.html', 1, 'Equipo importado desde scraping. Gama detectada: Media.', '2026-06-11 15:01:05'),
(6, 'Lenovo LOQ', 'Lenovo', 'Gaming', 21409.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-Lenovo-LOQ-15-6-1920x1200-WUXGA-AMD-Ryzen-5-7235HS-NVIDIA-GeForce-RTX-3050-32GB-1TB-SSD-Windows-11-Home-Espanol.html', 1, 'Equipo importado desde scraping. Gama detectada: Media-alta.', '2026-06-11 14:52:17');

CREATE TABLE `equipo_componentes` (
  `id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL,
  `componente_id` int(11) NOT NULL,
  `capacidad_gb` int(11) DEFAULT NULL,
  `tipo_memoria` varchar(50) DEFAULT NULL,
  `tipo_gpu` varchar(50) DEFAULT NULL,
  `vram_gb` int(11) DEFAULT NULL,
  `tipo_almacenamiento` varchar(80) DEFAULT NULL,
  `tamano_pantalla` varchar(80) DEFAULT NULL,
  `resolucion` varchar(100) DEFAULT NULL,
  `hz` int(11) DEFAULT NULL,
  `tipo_pantalla` varchar(100) DEFAULT NULL,
  `peso_kg` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `equipo_componentes` (`id`, `equipo_id`, `componente_id`, `capacidad_gb`, `tipo_memoria`, `tipo_gpu`, `vram_gb`, `tipo_almacenamiento`, `tamano_pantalla`, `resolucion`, `hz`, `tipo_pantalla`, `peso_kg`) VALUES
(1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, 2, 16, 'No especificada', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 1, 3, NULL, NULL, 'dedicada', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 1, 4, 512, NULL, NULL, NULL, 'SSD', NULL, NULL, NULL, NULL, NULL),
(5, 1, 5, NULL, NULL, NULL, NULL, NULL, '15.6 pulgadas', '1920x1080', 60, 'No especificada', NULL),
(6, 1, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 1, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 2, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 2, 9, 16, 'No especificada', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 2, 10, NULL, NULL, 'dedicada', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 2, 11, 512, NULL, NULL, NULL, 'SSD', NULL, NULL, NULL, NULL, NULL),
(12, 2, 12, NULL, NULL, NULL, NULL, NULL, '15.6 pulgadas', '1920x1080', 60, 'No especificada', NULL),
(13, 2, 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 2, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 3, 15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 3, 16, 8, 'No especificada', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 3, 17, NULL, NULL, 'dedicada', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 3, 18, 512, NULL, NULL, NULL, 'SSD', NULL, NULL, NULL, NULL, NULL),
(19, 3, 19, NULL, NULL, NULL, NULL, NULL, '15.6 pulgadas', '1920x1080', 60, 'No especificada', NULL),
(20, 3, 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, 3, 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, 4, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, 4, 23, 16, 'No especificada', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(24, 4, 24, NULL, NULL, 'dedicada', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, 4, 25, 512, NULL, NULL, NULL, 'SSD', NULL, NULL, NULL, NULL, NULL),
(26, 4, 26, NULL, NULL, NULL, NULL, NULL, '15.6 pulgadas', '1920x1080', 60, 'No especificada', NULL),
(27, 4, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(28, 4, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(29, 5, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(30, 5, 30, 16, 'No especificada', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(31, 5, 31, NULL, NULL, 'dedicada', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, 5, 32, 512, NULL, NULL, NULL, 'SSD', NULL, NULL, NULL, NULL, NULL),
(33, 5, 33, NULL, NULL, NULL, NULL, NULL, '15.6 pulgadas', '1920x1080', 60, 'No especificada', NULL),
(34, 5, 34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(35, 5, 35, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(36, 6, 36, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(37, 6, 37, 32, 'No especificada', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(38, 6, 38, NULL, NULL, 'dedicada', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(39, 6, 39, 1024, NULL, NULL, NULL, 'SSD', NULL, NULL, NULL, NULL, NULL),
(40, 6, 40, NULL, NULL, NULL, NULL, NULL, '15.6 pulgadas', '1920x1200', 60, 'No especificada', NULL),
(41, 6, 41, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(42, 6, 42, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

CREATE TABLE `perfiles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `nombre_visual` varchar(80) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `perfiles` (`id`, `nombre`, `nombre_visual`, `descripcion`) VALUES
(1, 'Gaming', 'Gaming', 'Perfil orientado a videojuegos y alto rendimiento gráfico.'),
(2, 'Programacion', 'Programación', 'Perfil orientado a desarrollo de software, multitarea y compilación.'),
(3, 'Diseno', 'Diseño', 'Perfil orientado a trabajo creativo, pantalla, GPU y RAM.'),
(4, 'Oficina', 'Oficina', 'Perfil orientado a productividad, batería y costo-beneficio.');

CREATE TABLE `perfil_pesos` (
  `id` int(11) NOT NULL,
  `perfil_id` int(11) NOT NULL,
  `tipo_componente` enum('cpu','ram','gpu','almacenamiento','pantalla','bateria','portabilidad') NOT NULL,
  `peso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `perfil_pesos` (`id`, `perfil_id`, `tipo_componente`, `peso`) VALUES
(1, 1, 'gpu', 40),
(2, 1, 'cpu', 25),
(3, 1, 'ram', 20),
(4, 1, 'almacenamiento', 10),
(5, 1, 'pantalla', 5),
(6, 1, 'bateria', 0),
(7, 1, 'portabilidad', 0),
(8, 2, 'cpu', 35),
(9, 2, 'ram', 30),
(10, 2, 'almacenamiento', 20),
(11, 2, 'gpu', 5),
(12, 2, 'pantalla', 10),
(13, 2, 'bateria', 0),
(14, 2, 'portabilidad', 0),
(15, 3, 'pantalla', 25),
(16, 3, 'gpu', 25),
(17, 3, 'ram', 20),
(18, 3, 'cpu', 20),
(19, 3, 'almacenamiento', 10),
(20, 3, 'bateria', 0),
(21, 3, 'portabilidad', 0),
(22, 4, 'cpu', 20),
(23, 4, 'ram', 20),
(24, 4, 'almacenamiento', 20),
(25, 4, 'pantalla', 15),
(26, 4, 'bateria', 15),
(27, 4, 'portabilidad', 10),
(28, 4, 'gpu', 0);

CREATE TABLE `productos_scraping` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `tienda` varchar(100) DEFAULT NULL,
  `link_tienda` text DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT 1,
  `query_busqueda` varchar(150) DEFAULT NULL,
  `revisado` tinyint(1) DEFAULT 0,
  `fecha_scraping` timestamp NOT NULL DEFAULT current_timestamp(),
  `cpu_detectado` varchar(150) DEFAULT NULL,
  `gpu_detectada` varchar(150) DEFAULT NULL,
  `ram_gb` int(11) DEFAULT NULL,
  `almacenamiento_gb` int(11) DEFAULT NULL,
  `estado_revision` enum('pendiente','aprobado','descartado') DEFAULT 'pendiente',
  `observaciones` text DEFAULT NULL,
  `tipo_producto` varchar(50) DEFAULT 'laptop',
  `gama_detectada` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `productos_scraping` (`id`, `nombre`, `precio`, `tienda`, `link_tienda`, `disponible`, `query_busqueda`, `revisado`, `fecha_scraping`, `cpu_detectado`, `gpu_detectada`, `ram_gb`, `almacenamiento_gb`, `estado_revision`, `observaciones`, `tipo_producto`, `gama_detectada`) VALUES
(1, 'Laptop Gamer Ghia Libero Gamer, 15.6\" 1920x1080 Full HD, Intel Core i5-12450H, NVIDIA GeForce RTX 3050, 16GB, 512GB SSD, Windows 11 Home, Español', 13619.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-Ghia-Libero-Gamer-15-6-1920x1080-Full-HD-Intel-Core-i5-12450H-NVIDIA-GeForce-RTX-3050-16GB-512GB-SSD-Windows-11-Home-Espanol.html', 1, 'laptop gamer rtx 3050', 0, '2026-06-11 00:30:26', 'Intel Core i5-12450H', 'RTX 3050', 16, 512, 'pendiente', NULL, 'laptop', NULL),
(2, 'Laptop Gamer Lenovo LOQ 15ARP9, 15.6\" 1920x1080 Full HD, AMD Ryzen 5 7235HS, NVIDIA GeForce RTX 3050, 8GB, 512GB SSD, Windows 11 Home, Español', 15449.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-Lenovo-LOQ-15ARP9-15-6-1920x1080-Full-HD-AMD-Ryzen-5-7235HS-NVIDIA-GeForce-RTX-3050-8GB-512GB-SSD-Windows-11-Home-Espanol.html', 1, 'laptop lenovo loq', 0, '2026-06-11 00:30:54', 'AMD Ryzen 5 7235HS', 'RTX 3050', 8, 512, 'aprobado', 'Convertido a catalogo principal', 'laptop', NULL),
(3, 'Laptop Gamer ASUS TUF Gaming F16, 16\" 1920x1200 WUXGA, Intel Core 5 210H, NVIDIA GeForce RTX 3050, 16GB, 512GB SSD, Windows 11 Home, Español', 18879.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-ASUS-TUF-Gaming-F16-16-1920x1200-WUXGA-Intel-Core-5-210H-NVIDIA-GeForce-RTX-3050-16GB-512GB-SSD-Windows-11-Home-Espanol.html', 1, 'laptop gamer rtx 3050', 0, '2026-06-11 00:30:26', NULL, 'RTX 3050', 16, 512, 'pendiente', NULL, 'laptop', NULL),
(4, 'Laptop Gamer Lenovo LOQ, 15.6\" 1920x1200 WUXGA, AMD Ryzen 5 7235HS, NVIDIA GeForce RTX 3050, 32GB, 1TB SSD, Windows 11 Home, Español', 21409.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-Lenovo-LOQ-15-6-1920x1200-WUXGA-AMD-Ryzen-5-7235HS-NVIDIA-GeForce-RTX-3050-32GB-1TB-SSD-Windows-11-Home-Espanol.html', 1, 'laptop lenovo loq', 0, '2026-06-11 00:30:54', 'AMD Ryzen 5 7235HS', 'RTX 3050', 32, 1024, 'aprobado', 'Convertido a catalogo principal', 'laptop', NULL),
(5, 'Laptop Gamer HP Victus, 15.6\" 1920x1080 Full HD, Intel Core i5-13420H, NVIDIA GeForce RTX 4050, 16GB, 512GB SSD, Windows 11 Home, Inglés', 19259.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-HP-Victus-15-6-1920x1080-Full-HD-Intel-Core-i5-13420H-NVIDIA-GeForce-RTX-4050-16GB-512GB-SSD-Windows-11-Home-Ingles-2.html', 1, 'laptop hp victus', 0, '2026-06-11 00:31:08', 'Intel Core i5-13420H', 'RTX 4050', 16, 512, 'aprobado', 'Convertido a catalogo principal', 'laptop', NULL),
(6, 'Laptop Gamer HP BM4X8UA, 15.6\" 1920x1080 Full HD, AMD Ryzen 7 7445HS, NVIDIA GeForce RTX 4050, 16GB, 512GB SSD, Windows 11 Home, Inglés', 18199.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-HP-BM4X8UA-15-6-1920x1080-Full-HD-AMD-Ryzen-7-7445HS-NVIDIA-GeForce-RTX-4050-16GB-512GB-SSD-Windows-11-Home-Ingles.html', 1, 'laptop hp victus', 0, '2026-06-11 00:31:08', 'AMD Ryzen 7 7445HS', 'RTX 4050', 16, 512, 'aprobado', 'Convertido a catalogo principal', 'laptop', NULL),
(7, 'Laptop Gamer Dell AC16250, 16\" 2560x1600, Intel Core 5 210H, NVIDIA GeForce RTX 4050, 16GB, 512GB SSD, Windows 11 Home, Español', 24379.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-Dell-AC16250-16-2560x1600-Intel-Core-5-210H-NVIDIA-GeForce-RTX-4050-16GB-512GB-SSD-Windows-11-Home-Espanol.html', 1, 'laptop gamer rtx 4050', 0, '2026-06-11 00:30:35', NULL, 'RTX 4050', 16, 512, 'pendiente', NULL, 'laptop', NULL),
(8, 'Laptop Gamer AORUS 15 9MF, 15.6\" 1920x1080 Full HD, Intel Core i5-12500H, NVIDIA GeForce RTX 4050, 8GB, 512GB SSD, Windows 11 Home, Español', 16859.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-AORUS-15-9MF-15-6-1920x1080-Full-HD-Intel-Core-i5-12500H-NVIDIA-GeForce-RTX-4050-8GB-512GB-SSD-Windows-11-Home-Espanol.html', 1, 'laptop gamer rtx 4050', 0, '2026-06-11 00:30:35', 'Intel Core i5-12500H', 'RTX 4050', 8, 512, 'pendiente', NULL, 'laptop', NULL),
(9, 'Laptop Gamer MSI THIN 15 B13V, 15.6\" 1920x1080 Full HD, Intel Core i7-13620H, NVIDIA GeForce RTX 4060, 16GB, 1TB SSD, Windows 11 Home, Español', 21969.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-MSI-THIN-15-B13V-15-6-1920x1080-Full-HD-Intel-Core-i7-13620H-NVIDIA-GeForce-RTX-4060-16GB-1TB-SSD-Windows-11-Home-Espanol.html', 1, 'laptop gamer rtx 4060', 0, '2026-06-11 00:30:45', 'Intel Core i7-13620H', 'RTX 4060', 16, 1024, 'pendiente', NULL, 'laptop', NULL),
(10, 'Laptop Gamer AORUS 17 9KF, 17.3\" 1920x1080 Full HD, Intel Core i5-12500H, NVIDIA GeForce RTX 4060, 8GB, 512GB SSD, Windows 11 Pro, Español', 19179.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-AORUS-17-9KF-17-3-1920x1080-Full-HD-Intel-Core-i5-12500H-NVIDIA-GeForce-RTX-4060-8GB-512GB-SSD-Windows-11-Pro-Espanol.html', 1, 'laptop gamer rtx 4060', 0, '2026-06-11 00:30:45', 'Intel Core i5-12500H', 'RTX 4060', 8, 512, 'pendiente', NULL, 'laptop', NULL),
(11, 'Laptop Gamer MSI Thin 15 B13VF, 15.6\" 1920x1080 Full HD, Intel Core i5-13420H, NVIDIA GeForce RTX 4060, 16GB, 512GB SSD, Windows 11 Home, Inglés', 16119.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-MSI-Thin-15-B13VF-15-6-1920x1080-Full-HD-Intel-Core-i5-13420H-NVIDIA-GeForce-RTX-4060-16GB-512GB-SSD-Windows-11-Home-Ingles.html', 1, 'laptop gamer rtx 4060', 0, '2026-06-11 00:30:45', 'Intel Core i5-13420H', 'RTX 4060', 16, 512, 'aprobado', 'Convertido a catalogo principal', 'laptop', NULL),
(12, 'Laptop Gamer Lenovo Legion Pro 5 16ARX8, 16\" 2560x1600, AMD Ryzen 7 7745HX, NVIDIA GeForce RTX 4060, 16GB, 512GB SSD, Windows 11 Home, Español', 31279.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-Lenovo-Legion-Pro-5-16ARX8-16-2560x1600-AMD-Ryzen-7-7745HX-NVIDIA-GeForce-RTX-4060-16GB-512GB-SSD-Windows-11-Home-Espanol.html', 1, 'laptop gamer rtx 4060', 0, '2026-06-11 00:30:45', 'AMD Ryzen 7 7745HX', 'RTX 4060', 16, 512, 'pendiente', NULL, 'laptop', NULL),
(13, 'Laptop Gamer Lenovo LOQ 15IRX10, 15.6\" 1920x1080 Full HD, Intel Core i5-13450HX, NVIDIA GeForce RTX 5050, 24GB, 512GB SSD, Windows 11 Home, Español', 22759.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-Lenovo-LOQ-15IRX10-15-6-1920x1080-Full-HD-Intel-Core-i5-13450HX-NVIDIA-GeForce-RTX-5050-24GB-512GB-SSD-Windows-11-Home-Espanol.html', 1, 'laptop lenovo loq', 0, '2026-06-11 00:30:54', 'Intel Core i5-13450HX', 'RTX 5050', 24, 512, 'pendiente', NULL, 'laptop', NULL),
(14, 'Laptop Gamer Lenovo LOQ 15AHP10, 15.6\" 1920x1080 Full HD, AMD Ryzen 7 250, NVIDIA GeForce RTX 5050, 24GB, 512GB SSD, Windows 11 Home, Español', 24359.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-Lenovo-LOQ-15AHP10-15-6-1920x1080-Full-HD-AMD-Ryzen-7-250-NVIDIA-GeForce-RTX-5050-24GB-512GB-SSD-Windows-11-Home-Espanol.html', 1, 'laptop lenovo loq', 0, '2026-06-11 00:30:54', 'AMD Ryzen 7 250', 'RTX 5050', 24, 512, 'pendiente', NULL, 'laptop', NULL),
(15, 'Laptop Gamer HP Victus 15, 15.6\" 1920x1080 Full HD, Intel Core i7-13620H, NVIDIA GeForce RTX 5060, 16GB, 512GB SSD, Windows 11 Home, Inglés ― ¡Compra y recibe 007 First Light! Un código por cliente', 23379.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-HP-Victus-15-15-6-1920x1080-Full-HD-Intel-Core-i7-13620H-NVIDIA-GeForce-RTX-5060-16GB-512GB-SSD-Windows-11-Home-Ingles-2.html', 1, 'laptop hp victus', 0, '2026-06-11 00:31:08', 'Intel Core i7-13620H', 'RTX 5060', 16, 512, 'aprobado', 'Convertido a catalogo principal', 'laptop', NULL),
(16, 'Laptop Gamer HP Victus, 15.6\" 1920x1080 Full HD, Intel Core i5-12450H, NVIDIA GeForce RTX 3050, 32GB, 512GB SSD, Windows 11 Home, Inglés', 17949.00, 'Cyberpuerta', 'https://www.cyberpuerta.mx/Computadoras/Laptops/Laptop-Gamer-HP-Victus-15-6-1920x1080-Full-HD-Intel-Core-i5-12450H-NVIDIA-GeForce-RTX-3050-32GB-512GB-SSD-Windows-11-Home-Ingles-2.html', 1, 'laptop hp victus', 0, '2026-06-11 00:31:08', 'Intel Core i5-12450H', 'RTX 3050', 32, 512, 'pendiente', NULL, 'laptop', NULL);

CREATE TABLE `recomendaciones` (
  `id` int(11) NOT NULL,
  `perfil_id` int(11) NOT NULL,
  `presupuesto_min` decimal(10,2) NOT NULL,
  `presupuesto_max` decimal(10,2) NOT NULL,
  `preferencias` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`preferencias`)),
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Vista de consulta para el recomendador
CREATE OR REPLACE VIEW `vista_equipos_recomendacion` AS SELECT `e`.`id` AS `id`, `e`.`nombre` AS `nombre`, `e`.`marca` AS `marca`, `e`.`categoria` AS `categoria`, `e`.`precio` AS `precio`, `e`.`tienda` AS `tienda`, `e`.`link_tienda` AS `link_tienda`, `e`.`disponible` AS `disponible`, `e`.`descripcion` AS `descripcion`, max(case when `c`.`tipo` = 'cpu' then `c`.`modelo` end) AS `cpu_modelo`, max(case when `c`.`tipo` = 'cpu' then `c`.`score` end) AS `cpu_score`, max(case when `c`.`tipo` = 'ram' then `ec`.`capacidad_gb` end) AS `ram_capacidad_gb`, max(case when `c`.`tipo` = 'ram' then `ec`.`tipo_memoria` end) AS `ram_tipo`, max(case when `c`.`tipo` = 'ram' then `c`.`score` end) AS `ram_score`, max(case when `c`.`tipo` = 'gpu' then `c`.`modelo` end) AS `gpu_modelo`, max(case when `c`.`tipo` = 'gpu' then `ec`.`tipo_gpu` end) AS `gpu_tipo`, max(case when `c`.`tipo` = 'gpu' then `ec`.`vram_gb` end) AS `gpu_vram_gb`, max(case when `c`.`tipo` = 'gpu' then `c`.`score` end) AS `gpu_score`, max(case when `c`.`tipo` = 'almacenamiento' then `ec`.`capacidad_gb` end) AS `almacenamiento_capacidad_gb`, max(case when `c`.`tipo` = 'almacenamiento' then `ec`.`tipo_almacenamiento` end) AS `almacenamiento_tipo`, max(case when `c`.`tipo` = 'almacenamiento' then `c`.`score` end) AS `almacenamiento_score`, max(case when `c`.`tipo` = 'pantalla' then `ec`.`tamano_pantalla` end) AS `pantalla_tamano`, max(case when `c`.`tipo` = 'pantalla' then `ec`.`resolucion` end) AS `pantalla_resolucion`, max(case when `c`.`tipo` = 'pantalla' then `ec`.`hz` end) AS `pantalla_hz`, max(case when `c`.`tipo` = 'pantalla' then `ec`.`tipo_pantalla` end) AS `pantalla_tipo`, max(case when `c`.`tipo` = 'pantalla' then `c`.`score` end) AS `pantalla_score`, max(case when `c`.`tipo` = 'bateria' then `c`.`score` end) AS `bateria_score`, max(case when `c`.`tipo` = 'portabilidad' then `ec`.`peso_kg` end) AS `portabilidad_peso_kg`, max(case when `c`.`tipo` = 'portabilidad' then `c`.`score` end) AS `portabilidad_score` FROM ((`equipos` `e` left join `equipo_componentes` `ec` on(`e`.`id` = `ec`.`equipo_id`)) left join `componentes` `c` on(`ec`.`componente_id` = `c`.`id`)) GROUP BY `e`.`id`, `e`.`nombre`, `e`.`marca`, `e`.`categoria`, `e`.`precio`, `e`.`tienda`, `e`.`link_tienda`, `e`.`disponible`, `e`.`descripcion` ;

-- Índices, auto_increment y relaciones
ALTER TABLE `componentes`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `detalle_recomendacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recomendacion_id` (`recomendacion_id`),
  ADD KEY `equipo_id` (`equipo_id`);

ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `equipo_componentes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipo_id` (`equipo_id`),
  ADD KEY `componente_id` (`componente_id`);

ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

ALTER TABLE `perfil_pesos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `perfil_id` (`perfil_id`);

ALTER TABLE `productos_scraping`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `recomendaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `perfil_id` (`perfil_id`);

ALTER TABLE `componentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

ALTER TABLE `detalle_recomendacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `equipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `equipo_componentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

ALTER TABLE `perfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `perfil_pesos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

ALTER TABLE `productos_scraping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

ALTER TABLE `recomendaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `detalle_recomendacion`
  ADD CONSTRAINT `detalle_recomendacion_ibfk_1` FOREIGN KEY (`recomendacion_id`) REFERENCES `recomendaciones` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_recomendacion_ibfk_2` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`id`);

ALTER TABLE `equipo_componentes`
  ADD CONSTRAINT `equipo_componentes_ibfk_1` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `equipo_componentes_ibfk_2` FOREIGN KEY (`componente_id`) REFERENCES `componentes` (`id`) ON DELETE CASCADE;

ALTER TABLE `perfil_pesos`
  ADD CONSTRAINT `perfil_pesos_ibfk_1` FOREIGN KEY (`perfil_id`) REFERENCES `perfiles` (`id`) ON DELETE CASCADE;

ALTER TABLE `recomendaciones`
  ADD CONSTRAINT `recomendaciones_ibfk_1` FOREIGN KEY (`perfil_id`) REFERENCES `perfiles` (`id`);

SET FOREIGN_KEY_CHECKS = 1;
