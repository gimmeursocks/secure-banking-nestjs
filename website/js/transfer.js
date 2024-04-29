import { encryptObject } from './encryption.js';

const apiUrl = 'http://localhost:3000';

document.getElementById("transferForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var account_num = document.getElementById("account_num").value;
    var account_num_2 = document.getElementById("account_num_2").value;
    var amount = document.getElementById("amount").value;
    var comment = document.getElementById("comment").value;

    let transData = {
        receiver: account_num,
        amount: amount,
        comment: comment
    }

    if (account_num != account_num_2) {
        window.alert("Accounts Do not match");
        document.getElementById("transferForm").reset();
    } else {
        (async () => {
            const plainData = transData;
            transData = await encryptObject(transData);
            console.log("Encrypted transData:", transData);
            transfer(transData, plainData);
        })();
    }
});

function transfer(transData, plainData) {
    const access_token = sessionStorage.getItem("accessToken");

    let ok = false;
    fetch(`${apiUrl}/trans`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transData)
    })
        .then((response) => {
            if (!response.ok) {
                alert('Unauthorized User');
            } else {
                ok = true;
            }
            return response.json();
        })
        .then((resp) => {
            console.log(resp);
            if (ok) {
                alert("Amount of " + plainData.amount + " has been transferred to " + plainData.receiver + " successfully");
                document.getElementById("transferForm").reset();
            }
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}