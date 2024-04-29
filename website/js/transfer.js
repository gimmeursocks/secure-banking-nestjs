import { encryptUser } from './encryption.js';

const apiUrl = 'http://localhost:3000';

document.getElementById("transferForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var account_num = document.getElementById("account_num").value;
    var account_num_2 = document.getElementById("account_num_2").value;
    var amount = document.getElementById("amount").value;

    if (account_num != account_num_2) {
        window.alert("Accounts Do not match");
        document.getElementById("transferForm").reset();
    } else {
        const session = validateSession();
        console.log(session);
        // if (session) {
        //     alert(`valid session ${session.email}`);
        // }
    }
});

function validateSession() {
    const access_token = sessionStorage.getItem("accessToken");
    console.log(access_token);
    let ok = false;
    let data = {};
    fetch(`${apiUrl}/auth/user`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        }
    })
        .then((response) => {
            if (!response.ok) {
                alert('Unauthorized User');
                // console.log(response);
                // document.getElementById("transferForm").reset();
                // window.location.href = "login.html";
            } else {
                ok = true;
            }
            return response.json();
        })
        .then((resp) => {
            // console.log(resp);
            if (ok) {
                data = resp;
            }
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });

    return data;
}

// document.getElementById("loginForm").addEventListener("submit", function (event) {
//     event.preventDefault();

//     var email = document.getElementById("email").value;
//     var password = document.getElementById("password").value;

//     let userData = {
//         email: email,
//         password: password
//     };

//     (async () => {
//         userData = await encryptUser(userData);
//         console.log("Encrypted userData:", userData);
//         loginUser(userData);
//     })();
// });

// function loginUser(params) {
//     let ok = false;
//     fetch(`${apiUrl}/auth/login`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(params),
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 alert('Invalid Credentials');
//                 document.getElementById("loginForm").reset();
//             } else {
//                 ok = true;
//             }
//             return response.json();
//         })
//         .then((resp) => {
//             console.log(resp);
//             if (ok) {
//                 alert('Login Success');
//                 if (resp.role) {
//                     sessionStorage.setItem("accessToken", resp.access_token);
//                     sessionStorage.setItem("role", resp.role);
//                     if (resp.role == "user") {
//                         window.location.href = "user_home.html";
//                     }
//                     else if (resp.role == "admin") {
//                         window.location.href = "admin/admin_home.html";
//                     }
//                 }
//             }
//         })
//         .catch((error) => {
//             console.error(
//                 "There was a problem with the fetch operation:",
//                 error
//             );
//         });
// }