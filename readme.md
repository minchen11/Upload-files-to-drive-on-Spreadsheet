## Deskripsi

Aplikasi ini memungkinkan pengguna untuk mengupload bukti donasi melalui antarmuka web yang sederhana dan mudah digunakan. File yang diupload disimpan dalam Google Drive dan terintegrasi dengan Google Apps Script untuk pengolahan data lebih lanjut.

## Fitur

- Formulir pengisian data donatur
- Upload file bukti donasi
- Preview file sebelum diupload
- Kemampuan untuk menambahkan lebih dari satu file
- Validasi untuk memastikan semua data diisi
- Notifikasi keberhasilan atau kegagalan upload

## Teknologi yang Digunakan

- HTML
- CSS
- JavaScript
- Google Apps Script
- Bootstrap (untuk styling)

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
   - Tambahkan file `sidebar.html`, `fileUploadOnly.html`, `chooseUpload.html` untuk antarmuka pengguna.


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

# Support Me

Jika program yang saya bagikan di sini bermanfaat bagi Anda, pertimbangkan untuk mendukung saya melalui Saweria. Dukungan Anda akan membantu saya untuk terus membuat dan memperbarui konten yang berguna. Terima kasih atas dukungan Anda!

Kunjungi [Saweria](https://saweria.co/snowkel) untuk mendukung kami!