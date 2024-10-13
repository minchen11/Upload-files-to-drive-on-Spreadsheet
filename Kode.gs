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

function saveData(obj) {
  var folder = DriveApp.getFolderById("1wxAnx8YRZiD5sRsCUph8Ldp5e41daagS"); // Ganti dengan ID folder yang diinginkan
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

  if (obj.uploadFile) {
    let files = obj.uploadFile;
    let datafile = Utilities.base64Decode(files.data);
    let blob = Utilities.newBlob(datafile, files.type, files.name);
    let file = folder.createFile(blob).getUrl();
    rowData[6] = file; // Menyimpan URL file ke kolom "Bukti Transfer"
  }

  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('donasi').appendRow(rowData);
  return true;
}
