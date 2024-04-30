import { decryptTrans } from './encryption.js';

const apiUrl = 'http://localhost:3000';

const access_token = sessionStorage.getItem("accessToken");

let ok = false;
fetch(`${apiUrl}/bank/check`, {
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
            const balance = document.querySelector("#balance");
            const line = document.createElement('h2');
            line.innerHTML = `${data}`;
            balance.appendChild(line);
            console.log(data);
        }
    })
    .catch((error) => {
        console.error(
            "There was a problem with the fetch operation:",
            error
        );
    });