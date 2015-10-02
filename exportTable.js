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

        for (var i = 0; i < bodyRows.length; i++) {
            var bodyCells = bodyRows[i].children;
            for (var j = 0; j < bodyCells.length; j++) {
                returnValue += '"' + bodyCells[j].textContent + '",';
            }
            returnValue +=  '\n';
        }
    },

    export: function() {
        data = exportTable.data(this.getAttribute('data-export'));
        csvData = 'data:application/csv;charset=utf-8,';
        csvData += encodeURIComponent(data);
        this.setAttribute('download', exportTable.options.filename);
        this.setAttribute('target', '_blank');
        this.setAttribute('href', csvData);
    },
};

window.exportTable = exportTable;
