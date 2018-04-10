/*jshint esversion: 6 */

window.onload = function () {
    getRecords();
};

function reqListener (xhr) {
    console.log(xhr.responseText);
}

function getRecords () {

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://storage.adrianjlane.com:3000/storage", true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            reqListener(xhr);
            createLineItems(xhr);
        }
    };
}

function createLineItems (xhr) {
    // TODO: document.onready
    // create table row for each record

    // get transaction data
    let response = JSON.parse(xhr.responseText);
    let table = document.getElementById('transactions');
    // for each line item
    response.forEach(function(element) {
        // create a table row with transaction details
        let rowCount = table.rows.length;
        let row = table.insertRow(rowCount);

        let dateCol = row.insertCell(0);
        dateCol.innerHTML = element.date;
        dateCol.id = element._id + "date";

        let payeeCol = row.insertCell(1);
        payeeCol.innerHTML = element.payee;
        payeeCol.id = element._id + "payee";

        let memoCol = row.insertCell(2);
        memoCol.innerHTML = element.memo;
        memoCol.id = element._id + "memo";

        let categoryCol = row.insertCell(3);
        categoryCol.innerHTML = element.category;
        categoryCol.id = element._id + "category";

        let amountCol = row.insertCell(4);
        amountCol.innerHTML = element.amount;
        amountCol.id = element._id + "amount";
        
        // add edit button
        let editButton = document.createElement('button');
        editButton.id = element._id;
        editButton.innerHTML = "Edit";
        editButton.onclick = function(){updateRecord(this.id);};
        let editCol = row.insertCell(5);
        editCol.appendChild(editButton);
        
        // add delete button
        let deleteButton = document.createElement('button');
        deleteButton.id = element._id;
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function(){deleteRecord(this.id);};
        let deleteCol = row.insertCell(6);
        deleteCol.appendChild(deleteButton);
    });
}

function updateRecord(id) {
    sessionStorage.transaction = id;
    location.href = "edit.html";
}

function createRecord() {
    sessionStorage.transaction = "";
    location.href = "edit.html";
}

function deleteRecord(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://storage.adrianjlane.com:3000/storage/" + id, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            reqListener(xhr);
            refreshTable();
        }
    };
}

function refreshTable() {
    let table = document.getElementById('transactions');
    var rows = table.rows;
    var i = rows.length;
    while (--i) {
        rows[i].parentNode.removeChild(rows[i]);
    }
    getRecords();
}
