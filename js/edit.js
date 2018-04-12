/*jshint esversion: 6 */
let transaction = sessionStorage.transaction;
const storageUrl = "https://storage.adrianjlane.com";

window.onload = function () {
    if (transaction != "") {
        getTransaction();
    }
};

function reqListener (xhr) {
    console.log(xhr.responseText);
}

function formatParams( params ){
    return Object
          .keys(params)
          .map(function(key){
            return key+"="+encodeURIComponent(params[key]);
          })
          .join("&");
  }

function cancelUpdate() {
    location.href = "index.html";
}

function getTransaction() {

    let xhr = new XMLHttpRequest();
    xhr.open("GET", storageUrl + "/storage/" + transaction);
    xhr.send();

    xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            reqListener(xhr);
            loadTransaction(xhr);
        }
    };
}

function loadTransaction(xhr) {
    let response = JSON.parse(xhr.responseText);
    document.forms["editTransactionForm"]["date"].value = response.date;
    document.forms["editTransactionForm"]["payee"].value = response.payee;
    document.forms["editTransactionForm"]["memo"].value = response.memo;
    document.forms["editTransactionForm"]["category"].value = response.category;
    document.forms["editTransactionForm"]["amount"].value = response.amount;
}

function updateTransaction() {
    let date = document.forms["editTransactionForm"]["date"].value;
    let payee = document.forms["editTransactionForm"]["payee"].value;
    let memo = document.forms["editTransactionForm"]["memo"].value;
    let category = document.forms["editTransactionForm"]["category"].value;
    let amount = document.forms["editTransactionForm"]["amount"].value;

    let params = {
        date: date, 
        payee: payee,
        memo: memo,
        category: category,
        amount: amount
      };

    let xhr = new XMLHttpRequest();
    if (transaction != "") {
        xhr.open("PUT", storageUrl + '/storage/' + transaction, true);
    } else {
        xhr.open("POST", storageUrl + '/storage', true);
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            alert("Transaction Saved");
            location.href = "index.html";
        }
    };

    xhr.send(formatParams(params));
}