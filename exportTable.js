var exportTable = {
	init: function(options){
		var options = options || {};
		options.format =	options.format || 'csv';
		options.filename = options.filename || 'export.csv';

		var initiator = this.castNodeList(document.querySelectorAll(options.initiator));
		initiator.forEach(this.bindEvent.bind(this));

		exportTable.options = options;
	},

	castNodeList: function (list) {
		return [].slice.call(list);
	},

	bindEvent: function (el) {
		el.addEventListener('click', this.export, false);
	},

	data: function(selector) {
		var table = document.querySelector(selector);

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

	export: function() {
		data = exportTable.data(this.getAttribute('data-export'));
		csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(data);
		this.setAttribute('download', exportTable.options.filename);
		this.setAttribute('target', '_blank');
		this.setAttribute('href', csvData);
	},


};

window.exportTable = exportTable;