# Donation File Upload App

Aplikasi berbasis Google Apps Script untuk mengelola bukti donasi. Program ini memungkinkan pengguna untuk mengupload file bukti donasi ke Google Drive dan mencatat informasi donatur serta detail donasi ke dalam Google Spreadsheet.

## Fitur
- Upload file bukti donasi ke Google Drive.
- Menyimpan informasi donatur ke dalam Google Spreadsheet.
- Dropdown untuk pilihan akun, campaign, dan amil.
- Preview file yang diupload sebelum submit.

## Prerequisites
- Akun Google untuk mengakses Google Drive dan Google Sheets.
- Menggunakan Google Chrome atau browser lain yang mendukung Google Apps Script.

## Instalasi

1. **Buka Google Sheets**:
   - Masuk ke akun Google Anda dan buka [Google Sheets](https://sheets.google.com).
   - Buat spreadsheet baru.

2. **Buka Editor Apps Script**:
   - Di menu, pilih `Extensions > Apps Script`.

3. **Salin Kode**:
   - Ganti isi file `Code.gs` dengan kode yang telah Anda buat untuk upload file.
   - Tambahkan file `sidebar.html` untuk antarmuka pengguna.

4. **Simpan dan Jalankan**:
   - Simpan project dengan nama yang sesuai.
   - Jalankan fungsi `onOpen` untuk menambahkan menu upload di Google Sheets.

5. **Konfigurasi Folder Drive**:
   - Pastikan Anda mengganti ID folder di kode dengan ID folder Google Drive Anda untuk menyimpan file yang diupload.

## Menggunakan Aplikasi
1. **Buka Menu Upload**:
   - Di Google Sheets, buka menu **Upload** dan pilih **Upload File**.

2. **Isi Formulir**:
   - Isi semua kolom yang diperlukan termasuk memilih file yang ingin diupload.

3. **Preview File**:
   - Setelah memilih file, preview file akan ditampilkan.

4. **Submit**:
   - Klik tombol **Submit** untuk mengupload file dan menyimpan data ke spreadsheet.

## Kontribusi
Jika Anda ingin berkontribusi, silakan buat pull request atau buka isu di repository ini.

## Lisensi
Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).
