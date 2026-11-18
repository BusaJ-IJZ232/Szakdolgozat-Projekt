CREATE DATABASE IF NOT EXISTS busa_boraszat
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE busa_boraszat;

DROP TABLE IF EXISTS borok;
CREATE TABLE borok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    evjarat INT NOT NULL,
    fajta ENUM('red', 'white', 'rose') NOT NULL,
    fajta_megnevezes VARCHAR(50) NOT NULL,
    ar INT NOT NULL,
    kep_utvonal VARCHAR(255) NOT NULL,
    reszletek_url VARCHAR(255) DEFAULT '#'
);
INSERT INTO borok (nev, evjarat, fajta, fajta_megnevezes, ar, kep_utvonal, reszletek_url) VALUES
('Cabernet Sauvignon', 2022, 'red', 'Vörösbor', 3250, 'Kepek/Bor Kepek/ikon_cabernet_sauvignon_2022_png_08ab3608.webp', 'Cabernet_Sauvignon.html'),
('Merlot Premium', 2024, 'red', 'Vörösbor', 6700, 'Kepek/Bor Kepek/ruppert_merlot_2024_png_7205a8b6.webp', 'Merlot_Premium.html'),
('Rosé Cuvée', 2025, 'rose', 'Rosé', 2500, 'Kepek/Bor Kepek/gere_rose_2025_png_e1433602.webp', '#'),
('Malbec', 2023, 'red', 'Vörösbor', 8700, 'Kepek/Bor Kepek/terrazas_malbec_2023_png_4109458c.webp', '#'),
('Gesztenyés Riesling', 2019, 'white', 'Fehérbor', 7800, 'Kepek/Bor Kepek/legli_gesztenyes_riesling_2019_png_a9cda910.webp', '#'),
('6 Puttonyos Aszú', 2017, 'white', 'Fehérbor', 23500, 'Kepek/Bor Kepek/grof_degenfeld_6_puttonyos_aszu_2017_tokaj_png_3ac65fa2.webp', '#'),
('Pinot Noir', 2023, 'red', 'Vörösbor', 20100, 'Kepek/Bor Kepek/cloudy_bay_pinot_noir_2023_png_27a0df7a.webp', '#'),
('Sauternes', 2022, 'white', 'Fehérbor', 175000, 'Kepek/Bor Kepek/chateau_d_yquem_2022_png_bc786d1a.webp', '#');