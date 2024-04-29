import { encryptUser } from './encryption.js';
const apiUrl = 'http://localhost:3000';

document.getElementById("addForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Get the values from the input fields
    var accountNum = document.getElementById('account_num').value;
    var balance = document.getElementById('balance').value;
  
    let AccountData = {
        account_num: accountNum,
        balance: balance
    }
    async () => {
        console.log(AccountData);
        const plainData = AccountData;
        AccountData = await encryptObject(AccountData);
        console.log("Encrypted AccountData:", AccountData);
        addAccount(AccountData)
    }
    
    function addAccount(AccountData){
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
                    alert('Account Added');
                } else {
                    ok = true;
                }
                return response.json();
            })
            .then((resp) => {
                console.log(resp);
                if (ok) {
                    alert("account " + plainData.accountNum + " has been ADDED successfully");
                    document.getElementById("transferForm").reset();
                }
            })
            .catch((error) => {
                console.error(
                    ":",
                    error
                );
            });
        }
  }
)