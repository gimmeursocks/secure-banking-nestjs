import { encryptUser } from './encryption.js';
const apiUrl = 'http://localhost:3000';


$(document).ready(function () {
    // Fetch customer data from the backend
    $.ajax({
      url: '/api/customers', // URL of your backend endpoint
      method: 'GET',
      success: function (data) {
        // Handle the successful response
        updateCustomerTable(data);
      },
      error: function (xhr, status, error) {
        // Handle errors
        console.error(error);
      }
    });
  });
  
  function updateCustomerTable(customers) {
    // Select the table element by its ID
    var table = document.getElementById('customerTable');
  
    // Iterate through the fetched customer data and update the HTML table
    customers.forEach(function (customer) {
      // Create a new table row
      var row = table.insertRow();
  
      // Insert cells for each piece of customer information
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
  
      // Populate the cells with customer data
      cell1.innerHTML = customer.id;
      cell2.innerHTML = customer.name;
      cell3.innerHTML = customer.email;
      cell4.innerHTML = customer.ifscCode;
      cell5.innerHTML = customer.accountNumber;
    });
  }
  