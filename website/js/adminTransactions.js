import { decryptTrans } from './encryption.js';

const apiUrl = 'http://localhost:3000';

const access_token = sessionStorage.getItem("accessToken");

let ok = false;
fetch(`${apiUrl}/trans/admin/view`, {
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
                    const decryptedItem = await decryptTrans(item);
                    console.log(decryptedItem);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${decryptedItem.id}</td>
                        <td>${decryptedItem.sender}</td>
                        <td>${decryptedItem.receiver}</td>
                        <td>${decryptedItem.amount}</td>
                        <td>${decryptedItem.comment}</td>
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