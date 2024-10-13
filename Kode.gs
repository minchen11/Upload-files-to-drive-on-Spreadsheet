function doGet() {
  var template = HtmlService.createTemplateFromFile("sidebar");
  return template.evaluate().setTitle("Upload File");
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Upload")
    .addItem("Upload File", "showSidebar")
    .addToUi();
}

function showSidebar() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('sidebar')
    .setTitle('Upload File')
    .setWidth(300);
  
  var options = getDropdownOptions();
  htmlOutput = htmlOutput.append(`<script>
      var akunOptions = ${JSON.stringify(options.akun)};
      var campaignOptions = ${JSON.stringify(options.campaign)};
      var amilOptions = ${JSON.stringify(options.amil)};
    </script>`);
  
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}

function getDropdownOptions() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Donasi Via Wa Center'); // Ganti dengan nama sheet yang sesuai
  var akunRange = sheet.getRange('C2:C'); // Ganti dengan rentang untuk akun
  var campaignRange = sheet.getRange('H2:H'); // Ganti dengan rentang untuk campaign
  var amilRange = sheet.getRange('I2:I'); // Ganti dengan rentang untuk amil

  var akunOptions = [...new Set(akunRange.getValues().flat().filter(Boolean))]; // Menghilangkan duplikat
  var campaignOptions = [...new Set(campaignRange.getValues().flat().filter(Boolean))]; // Menghilangkan duplikat
  var amilOptions = [...new Set(amilRange.getValues().flat().filter(Boolean))]; // Menghilangkan duplikat

  return {
    akun: akunOptions,
    campaign: campaignOptions,
    amil: amilOptions
  };
}

function saveData(obj) {
  var folder = DriveApp.getFolderById("Folder_id"); // Ganti dengan ID folder yang diinginkan
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

  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Donasi Via Wa Center').appendRow(rowData);
  return true;
}
