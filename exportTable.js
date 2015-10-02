'use strict';
var exportTable = {
    init: function(o) {
        var options = o || {};
        options.format =  options.format || 'csv';
        options.filename = options.filename || 'export.csv';
        var items = document.querySelectorAll(options.initiator);
        var initiator = this.castNodeList(items);
        initiator.forEach(this.bindEvent.bind(this));
        exportTable.options = options;
    },

    castNodeList: function(list) {
        return [].slice.call(list);
    },

    bindEvent: function(el) {
        el.addEventListener('click', this.export, false);
    },

    data: function(selector) {
        var returnValue = '';
        var table = document.querySelector(selector);
        var head = table.getElementsByTagName('thead');
        if (head.length) {
            var headRows = head[0].children;
            var headCells = headRows[0].children;
            for (var i = 0; i < headCells.length; i++) {
                returnValue += '"' + headCells[i].textContent + '",';
            }
            returnValue +=  '\n';
        }

        var body = table.getElementsByTagName('tbody')[0];
        var bodyRows = body.children;

        for (var j = 0; j < bodyRows.length; j++) {
            var bodyCells = bodyRows[j].children;
            for (var k = 0; k < bodyCells.length; k++) {
                returnValue += '"' + bodyCells[k].textContent + '",';
            }
            returnValue +=  '\n';
        }
    },

    export: function() {
        var data = exportTable.data(this.getAttribute('data-export'));
        var csvData = 'data:application/csv;charset=utf-8,';
        csvData += encodeURIComponent(data);
        this.setAttribute('download', exportTable.options.filename);
        this.setAttribute('target', '_blank');
        this.setAttribute('href', csvData);
    },
};

window.exportTable = exportTable;
