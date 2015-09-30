# exportTable.js
Micro library to export a table as a csv file

## Example
[Demo at JSFiddle](http://jsfiddle.net/jaygoodfellow/5ghun91L/)
    
    exportTable.init({
         downloadID: 'downloadID',
         downloadTable: 'downloadTable',
         filename: 'export.csv'
    });

## Documentation

`exportTable.init(options)`

### Options
- `downloadID` the ID of the button to download the csv
- `downloadTable` the ID of table (it must include a tbody element)
- `filename` the name of downloaded csv file
