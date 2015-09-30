var exportTable = {
	init: function(options){
		var options = options || {};
		options.downloadID = options.downloadID || 'downloadID';
		options.tableID = options.tableID || 'downloadTable';
		options.format =	options.format || 'csv';
		options.filename = options.filename || 'export.csv';

		options.downloadLink = document.getElementById(options.downloadID);
		options.downloadLink.addEventListener('click', exportTable.export, false);

		exportTable.options = options;

	},

	data: function() {
		var table = document.getElementById(exportTable.options.tableID);
		var body = table.getElementsByTagName('tbody')[0];
		var rows = body.children;
		var returnValue = '';
		for(var i=0;i<rows.length;i++){
		    var cells = rows[i].children;
		    for(var j=0;j<cells.length;j++){
		    	returnValue += '"' + cells[j].textContent + '",';
		    }
		    returnValue +=  '\n';
		} 
		
		return returnValue;
	},

	export: function(){
		data = exportTable.data();
		csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(data);
		exportTable.options.downloadLink.setAttribute('download', exportTable.options.filename);
		exportTable.options.downloadLink.setAttribute('target', '_blank');
		exportTable.options.downloadLink.setAttribute('href', csvData);

	},


};

window.exportTable = exportTable;