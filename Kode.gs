// Fungsi untuk memunculkan sidebar utama (menu pilih antara upload lengkap atau upload file saja)
function doGet() {
  var template = HtmlService.createTemplateFromFile("chooseUpload");
  return template.evaluate().setTitle("Pilih Jenis Upload");
}

// Fungsi yang berjalan saat file dibuka dan memunculkan menu Upload di spreadsheet
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Upload")
    .addItem("Pilih Jenis Upload", "showUploadChoiceSidebar")
    .addToUi();
}

// Fungsi untuk menampilkan sidebar pilihan jenis upload
function showUploadChoiceSidebar() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('chooseUpload')
    .setTitle('Pilih Jenis Upload')
    .setWidth(300);
  
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}

// Fungsi untuk menampilkan sidebar upload lengkap (dengan data)
function showUploadForm() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('sidebar')
    .setTitle('Upload Data Lengkap')
    .setWidth(300);
  
  var options = getDropdownOptions();
  htmlOutput = htmlOutput.append(`<script>
      var akunOptions = ${JSON.stringify(options.akun)};
      var campaignOptions = ${JSON.stringify(options.campaign)};
      var amilOptions = ${JSON.stringify(options.amil)};
    </script>`);
  
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}

// Fungsi untuk menampilkan sidebar upload file saja (tanpa input data lain)
function showFileUploadOnlyForm() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('fileUploadOnly')
    .setTitle('Upload File Saja')
    .setWidth(300);
  
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}

// Fungsi untuk mengambil data dropdown dari sheet donasi
function getDropdownOptions() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('donasi'); // Ganti dengan nama sheet yang sesuai
  var akunRange = sheet.getRange('C2:C'); // Ganti dengan rentang untuk akun
  var campaignRange = sheet.getRange('H2:H'); // Ganti dengan rentang untuk campaign
  var amilRange = sheet.getRange('I2:I'); // Ganti dengan rentang untuk amil

  var akunOptions = akunRange.getValues().flat().filter(Boolean);
  var campaignOptions = campaignRange.getValues().flat().filter(Boolean);
  var amilOptions = amilRange.getValues().flat().filter(Boolean);

  return {
    akun: akunOptions,
    campaign: campaignOptions,
    amil: amilOptions
  };
}

// Fungsi untuk menyimpan data lengkap (tanggal, nama, dll) dan file
function saveData(obj) {
  var folder = DriveApp.getFolderById("Id_folder"); // Ganti dengan ID folder yang diinginkan
  var rowData = [
    obj.tanggal,    // Tanggal
    obj.nama,       // Nama
    obj.akun,       // Akun
    obj.ponsel,     // Ponsel
    obj.catatan,    // Catatan
    obj.jumlah,     // Jumlah
    "",             // Kolom untuk "Bukti Transfer", diisi nanti setelah upload
    obj.campaign,   // Campaign (diisi manual)
    obj.amil        // Amil (diisi manual)
  ];

  if (obj.uploadFiles && obj.uploadFiles.length > 0) {
    let fileUrls = []; // Array untuk menyimpan URL file

    obj.uploadFiles.forEach(file => {
      let datafile = Utilities.base64Decode(file.data);
      let blob = Utilities.newBlob(datafile, file.type, file.name);
      let fileUrl = folder.createFile(blob).getUrl();
      fileUrls.push(fileUrl); // Tambahkan URL file ke array
    });

    rowData[6] = fileUrls.join(",\n"); // Gabungkan URL file menjadi satu string yang dipisahkan koma
  }

  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('donasi').appendRow(rowData);
  return true;
}

// Fungsi untuk menyimpan file saja ke kolom spesifik (baris dan kolom yang sudah ada)
function saveFileOnlyData(obj) {
  var folder = DriveApp.getFolderById("Id_folder");
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('donasi');
  var targetRow = obj.rowNumber; // nomor baris spesifik yang ditentukan user

  if (obj.uploadFile) {
    let files = obj.uploadFile;
    let datafile = Utilities.base64Decode(files.data);
    let blob = Utilities.newBlob(datafile, files.type, files.name);
    let fileUrl = folder.createFile(blob).getUrl();

    // Ambil nilai yang ada di kolom "Bukti Transfer" dan tambahkan URL baru di baris yang sama
    var existingLinks = sheet.getRange(targetRow, 7).getValue();
    if (existingLinks) {
      sheet.getRange(targetRow, 7).setValue(existingLinks + '\n' + fileUrl); // Menambahkan URL di baris baru
    } else {
      sheet.getRange(targetRow, 7).setValue(fileUrl);
    }
  }
  return true;
}
