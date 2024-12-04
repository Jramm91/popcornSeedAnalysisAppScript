
function pushData() {
  //sheet and tab names
  const templateTab = "Simplified Master Form";
  const destinationTab = "Simplified Collection";
  
  // cell location from template tab
  const dateAndLotRange = ["B4","C4","D4","E4","F4","G4","H4"]
  const moistureCell = "C11";
  const k10Cell ="F11";
  const expansionCell = "I11"
  const userInputCells = ["B4:H4","C8:C10","F8:F10", "I8:I10"]

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const templateSheet = ss.getSheetByName(templateTab);
  const destinationSheet = ss.getSheetByName(destinationTab);

  if (!templateSheet || !destinationSheet) {
    throw new Error("Ensure both the template and the destination tabs exist.");
  }

  // Copy values from specified cells to the destination tab
  const lastRow = destinationSheet.getLastRow();
  dateAndLotRange.forEach((cell, index) => {
    const value = templateSheet.getRange(cell).getValue();
    destinationSheet.getRange(lastRow + 1, index + 1).setValue(value);
  });
  const moistureValue = templateSheet.getRange(moistureCell).getValue();
  destinationSheet.getRange(lastRow + 1, 8).setValue(moistureValue);

  const k10Value = templateSheet.getRange(k10Cell).getValue();
  destinationSheet.getRange(lastRow + 1, 10).setValue(k10Value);

  const expansionValue = templateSheet.getRange(expansionCell).getValue();
  destinationSheet.getRange(lastRow + 1, 12).setValue(expansionValue);

  //copy tab
  const seedName = templateSheet.getRange("D4").getValue().toString();
  const seedLot  = templateSheet.getRange("F4").getValue().toString();
  const date = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(),"MM/dd/yy");
  const newTabName = `${seedName} ${seedLot} ${date}`;
  const newSheet = templateSheet.copyTo(ss).setName(newTabName);

  // clear values in template sheet
  userInputCells.forEach(cell => {
    templateSheet.getRange(cell).clearContent();
  });
  
}
