import { encryptUser } from './encryption.js';

const apiUrl = 'http://localhost:3000';

document.getElementById("addForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    var accountNum = document.getElementById('account_num').value;
    var balance = document.getElementById('balance').value;
  
    let AccountData = {
        account_num: accountNum,
        balance: balance
    };

    AccountData = await encryptUser(AccountData);

    addAccount(AccountData);
});

function addAccount(AccountData) {
    const access_token = sessionStorage.getItem("accessToken");
    let ok = false;
    fetch(`${apiUrl}/bank/create`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(AccountData)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to add account');
        }
        ok = true;
        return response.json();
    })
    .then((resp) => {
        console.log(resp);
        if (ok) {
            alert("Account " + AccountData.account_num + " has been added successfully");
            document.getElementById("addForm").reset();
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add account: " + error.message);
    });
}
