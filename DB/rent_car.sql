-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Okt 2023 pada 18.02
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rent_car`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `full_name`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(46, 'Alvika Aji Prahasta', 'alvika', 'alvika@gmail.con', '$2b$10$/lgjMhCNeLuvd3Wwk9UoK.W7J0cGGQATZuiX21CEi93w4yvAAvExG', '2023-03-23', '2023-03-23'),
(47, 'Neneng Pipit Adrianty', 'pipitcantik', 'pipit@gmail.com', '$2b$10$G3fln00eZ/dYAIfHO1ZsxOSBVOmBWqDLPWiop/TFPqQhs.quOJwPC', '2023-03-23', '2023-03-23'),
(50, 'Imam Masamba', 'imam', 'imam@gmail.com', '$2b$10$7M/JXAC365x68VI53FhIlOZ.i9bvYPleZZ0eF08PILVxmpnnM86k2', '2023-03-25', '2023-03-25'),
(55, 'galih dwi putra anjay', 'galih', 'galih@gmail.com', '$2b$10$B2DfogU86moYOLDkVamA1ObDFXqg6nM8Li5XjJK9pwvNOpno9Vdz6', '2023-10-19', '2023-10-20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `car`
--

CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name_car` varchar(255) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `plat` varchar(255) NOT NULL,
  `seat` int(5) NOT NULL,
  `tipe_mobil` varchar(50) NOT NULL,
  `harga` varchar(255) NOT NULL,
  `status` varchar(5) NOT NULL,
  `deskripsi` text NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `car`
--

INSERT INTO `car` (`id`, `image`, `name_car`, `slug`, `plat`, `seat`, `tipe_mobil`, `harga`, `status`, `deskripsi`, `createdAt`, `updatedAt`) VALUES
(174, 'http://localhost:5000/uploads/Daihatsuxenia_1697735432738.png', 'Daihatsu Xenia', 'daihatsu-xenia', 'D ASD 23', 7, 'Automatic', '2000000', '1', '<p>Include Driver and BBM</p>\r\n', '2023-10-19', '2023-10-20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kostumer`
--

CREATE TABLE `kostumer` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `whatsapp` varchar(100) NOT NULL,
  `ktp` varchar(255) NOT NULL,
  `jenis_kelamin` varchar(50) NOT NULL,
  `is_verifikasi` tinyint(1) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kostumer`
--

INSERT INTO `kostumer` (`id`, `nama_lengkap`, `username`, `password`, `email`, `alamat`, `whatsapp`, `ktp`, `jenis_kelamin`, `is_verifikasi`, `createdAt`, `updatedAt`) VALUES
(39, 'Alvika Aji Prahasta', 'alvika', '$2b$10$ukOe4RfY0J.T6j5pN4VoWOyAZSx8e2QixvyK44tpJIq7BHhwzmXli', 'alvikaajiandrianty@gmail.com', 'Kp. Cikupa Rt 03 Rw 08', '08979382175', '23244545', 'Pria', 1, '2023-10-19', '2023-10-20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `promo`
--

CREATE TABLE `promo` (
  `id` int(11) NOT NULL,
  `id_car` int(11) NOT NULL,
  `harga_promo` varchar(255) NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_akhir` date NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `promo`
--

INSERT INTO `promo` (`id`, `id_car`, `harga_promo`, `tanggal_mulai`, `tanggal_akhir`, `createdAt`, `updatedAt`) VALUES
(14, 164, '300000', '2023-10-17', '2023-10-18', '2023-10-17', '2023-10-17'),
(16, 174, '100000', '2023-10-20', '2023-10-27', '2023-10-20', '2023-10-20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sewa`
--

CREATE TABLE `sewa` (
  `id` int(11) NOT NULL,
  `id_kostumer` int(11) NOT NULL,
  `id_car` int(11) NOT NULL,
  `lama_sewa` varchar(100) NOT NULL,
  `total_harga` varchar(255) NOT NULL,
  `awal_sewa` date NOT NULL,
  `akhir_sewa` date NOT NULL,
  `tanggal_pengembalian` date NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sewa`
--

INSERT INTO `sewa` (`id`, `id_kostumer`, `id_car`, `lama_sewa`, `total_harga`, `awal_sewa`, `akhir_sewa`, `tanggal_pengembalian`, `status`, `createdAt`, `updatedAt`) VALUES
(123, 39, 174, '4', '8000000', '2023-10-01', '2023-10-05', '2023-10-05', 0, '2023-10-20', '2023-10-20'),
(124, 39, 174, '3', '6000000', '2023-10-07', '2023-10-10', '2023-10-10', 0, '2023-10-20', '2023-10-20'),
(125, 39, 174, '2', '4000000', '2023-10-11', '2023-10-13', '2023-10-13', 0, '2023-10-20', '2023-10-20'),
(126, 39, 174, '4', '8000000', '2023-09-25', '2023-09-29', '2023-09-29', 0, '2023-10-20', '2023-10-20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `supir`
--

CREATE TABLE `supir` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `no_whatsapp` varchar(255) NOT NULL,
  `status` int(3) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `supir`
--

INSERT INTO `supir` (`id`, `nama_lengkap`, `no_whatsapp`, `status`, `foto`, `createdAt`, `updatedAt`) VALUES
(3, 'Samsudin Permana', '08979382175', 1, 'http://localhost:5000/supir/felixrevisi_1697562773863.png', '2023-10-17', '2023-10-17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `token_user`
--

CREATE TABLE `token_user` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiredAt` date NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `token_user`
--

INSERT INTO `token_user` (`id`, `id_user`, `token`, `expiredAt`, `createdAt`, `updatedAt`) VALUES
(19, 32, '378700', '2023-05-10', '2023-05-10', '2023-05-10'),
(20, 33, '540178', '2023-05-10', '2023-05-10', '2023-05-10'),
(21, 34, '210634', '2023-05-10', '2023-05-10', '2023-05-10'),
(22, 35, '37808', '2023-05-10', '2023-05-10', '2023-05-10'),
(23, 36, '705020', '2023-05-10', '2023-05-10', '2023-05-10'),
(24, 37, '577145', '2023-05-11', '2023-05-11', '2023-05-11'),
(25, 34, '207960', '2023-05-12', '2023-05-12', '2023-05-12'),
(26, 34, '755660', '2023-05-12', '2023-05-12', '2023-05-12'),
(27, 32, '118050', '2023-05-12', '2023-05-12', '2023-05-12'),
(28, 32, '134329', '2023-05-12', '2023-05-12', '2023-05-12'),
(29, 32, '327905', '2023-05-12', '2023-05-12', '2023-05-12'),
(30, 37, '198588', '2023-05-12', '2023-05-12', '2023-05-12'),
(31, 37, '941622', '2023-05-12', '2023-05-12', '2023-05-12'),
(32, 32, '793011', '2023-05-12', '2023-05-12', '2023-05-12'),
(33, 32, '598445', '2023-05-12', '2023-05-12', '2023-05-12'),
(34, 32, '37156', '2023-05-12', '2023-05-12', '2023-05-12'),
(35, 32, '604797', '2023-05-12', '2023-05-12', '2023-05-12'),
(36, 32, '429073', '2023-05-12', '2023-05-12', '2023-05-12'),
(37, 34, '806133', '2023-05-12', '2023-05-12', '2023-05-12'),
(38, 34, '867748', '2023-05-12', '2023-05-12', '2023-05-12'),
(39, 34, '45757', '2023-05-12', '2023-05-12', '2023-05-12'),
(40, 32, '639835', '2023-05-13', '2023-05-13', '2023-05-13'),
(41, 32, '338253', '2023-05-13', '2023-05-13', '2023-05-13'),
(42, 32, '498971', '2023-05-13', '2023-05-13', '2023-05-13'),
(43, 32, '716326', '2023-05-13', '2023-05-13', '2023-05-13'),
(44, 32, '482466', '2023-05-13', '2023-05-13', '2023-05-13'),
(45, 32, '9305', '2023-05-13', '2023-05-13', '2023-05-13'),
(46, 32, '676732', '2023-05-13', '2023-05-13', '2023-05-13'),
(47, 32, '881975', '2023-05-13', '2023-05-13', '2023-05-13'),
(48, 32, '965815', '2023-05-13', '2023-05-13', '2023-05-13'),
(49, 38, '666605', '2023-08-21', '2023-08-21', '2023-08-21'),
(50, 39, '130775', '2023-10-19', '2023-10-19', '2023-10-19'),
(51, 40, '488918', '2023-10-19', '2023-10-19', '2023-10-19'),
(52, 41, '326759', '2023-10-19', '2023-10-19', '2023-10-19'),
(53, 42, '86997', '2023-10-20', '2023-10-20', '2023-10-20'),
(54, 43, '125386', '2023-10-20', '2023-10-20', '2023-10-20'),
(55, 44, '380126', '2023-10-20', '2023-10-20', '2023-10-20'),
(56, 44, '826656', '2023-10-20', '2023-10-20', '2023-10-20'),
(57, 45, '758312', '2023-10-20', '2023-10-20', '2023-10-20');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kostumer`
--
ALTER TABLE `kostumer`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sewa`
--
ALTER TABLE `sewa`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `supir`
--
ALTER TABLE `supir`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `token_user`
--
ALTER TABLE `token_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT untuk tabel `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- AUTO_INCREMENT untuk tabel `kostumer`
--
ALTER TABLE `kostumer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `promo`
--
ALTER TABLE `promo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `sewa`
--
ALTER TABLE `sewa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT untuk tabel `supir`
--
ALTER TABLE `supir`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `token_user`
--
ALTER TABLE `token_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
