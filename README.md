# Tutorial Instalasi Website Central Java E-Commerce

Website E-Commerce ini terdiri dari tiga folder utama:
1. frontend - Antarmuka pengguna yang dibangun dengan React.
2. backend - API backend untuk menangani data dan logika aplikasi.
3. sqlData - Berisi file SQL untuk menambahkan data item ke database.

## Prasyarat
Pastikan Anda sudah menginstal:
- Node.js dan npm (https://nodejs.org/)
- Database SQL (MySQL/PostgreSQL atau sesuai kebutuhan Anda)

---

## Langkah Instalasi

### 1. Frontend
1. Masuk ke folder frontend:
  
   cd frontend
   
2. Instal dependensi:
  
   npm install
   
3. Jalankan aplikasi:
  
   npm run dev
   
4. Aplikasi frontend akan berjalan pada alamat http://localhost:5173 (atau port lain yang ditentukan).

---

### 2. Backend
1. Masuk ke folder backend:
  
   cd backend
   
2. Salin file .env-example menjadi .env:
  
   cp .env-example .env
   
3. Edit file .env dan isi dengan konfigurasi database Anda (host, username, password, nama database, dll).
4. Instal dependensi:
  
   npm install
   
5. Migrasi database:
  
   npm run migrate
   
6. Seed data awal ke database:
  
   npm run seed
   
7. Jalankan server backend:
  
   npm run dev
   
8. Backend akan berjalan pada alamat http://localhost:3000 (atau port lain yang ditentukan).

---

### 3. SQL Data
1. Masuk ke folder sqlData.
2. Jalankan file items.sql dan imageItems.sql di database Anda untuk menambahkan data awal.
   - Contoh menggunakan MySQL:
    
     mysql -u [username] -p [database_name] < items.sql
     mysql -u [username] -p [database_name] < imageItems.sql
     
---

## Troubleshooting
- Jika ada error saat instalasi atau migrasi, pastikan:
  - Konfigurasi di file .env sudah benar.
  - Database sudah dibuat sebelum menjalankan migrasi.
- Untuk port yang bentrok, Anda dapat mengubah konfigurasi di file .env atau di pengaturan React (jika frontend).

---

Setelah semua langkah di atas selesai, website Central Java E-Commerce siap digunakan!