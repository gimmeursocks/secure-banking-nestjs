import { encryptUser } from './encryption.js';

const apiUrl = 'http://localhost:3000';

document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var re_password = document.getElementById("re-password").value;
    var account_num = document.getElementById("account_num").value;
    var phone = document.getElementById("phone").value;
    var SSN = document.getElementById("SSN").value;
    var address = document.getElementById("address").value;
    var gender = document.querySelector(
        'input[name="gender"]:checked'
    ).value;

    let userData = {
        email: email,
        username: username,
        password: password,
        account_num: account_num,
        phone: phone,
        SSN: SSN,
        gender: gender,
        address: address
    };

    const alert = "there is a problem!! \nplease check account number again";
    if (password != re_password) {
        window.alert(alert);
    } else {
        (async () => {
            userData = await encryptUser(userData);
            console.log("Encrypted userData:", userData);
            createUser(userData);
        })();
    }
});

function createUser(params) {
    fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
        .then((response) => {
            if (!response.ok) {
                alert('Invalid Credentials');
                document.getElementById("signupForm").reset();
            } else {
                alert('User Created Successfully');
                window.location.href = "login.html";
            }
            return response.json();
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}