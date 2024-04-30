import { decryptUser } from './encryption.js';

const apiUrl = 'http://localhost:3000';

const access_token = sessionStorage.getItem("accessToken");

let ok = false;
fetch(`${apiUrl}/admin/users`, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
    }
})
    .then((response) => {
        if (!response.ok) {
            alert('Unauthorized User');
        } else {
            ok = true;
        }
        return response.json();
    })
    .then((data) => {
        if (ok) {
            const tableBody = document.querySelector("#dataTable tbody");
            data.forEach(async (item) => {
                try {
                  console.log(item);
                    const decryptedItem = await decryptUser(item);
                    console.log(decryptedItem);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${decryptedItem.email}</td>
                        <td>${decryptedItem.username}</td>
                        <td>${decryptedItem.account_num}</td>
                        <td>${decryptedItem.phone}</td>
                        <td>${decryptedItem.SSN}</td>
                        <td>${decryptedItem.gender}</td>
                        <td>${decryptedItem.address}</td>
                        `;
                    tableBody.appendChild(row);
                } catch (error) {
                    console.error("Error decrypting item:", error);
                }
            });
        }
    })
    .catch((error) => {
        console.error(
            "There was a problem with the fetch operation:",
            error
        );
    });