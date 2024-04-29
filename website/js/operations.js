function addBankAccount() {
  alert('add account');
}
function validInfo() {
  let a = document.getElementById("name").value;
  let b = document.getElementById("email").value;
  let c = document.getElementById("pass").value;
  let d = document.getElementById("type").value;
  if (a == "") {
    alert("Please enter your name");
    return false;
  }
  else if (b == "") {
    alert("Please enter your email");
    return false;
  }
  else if (c == "") {
    alert("Please enter your password");
    return false;
  }
  else if (d == "") {
    alert("Please choose a type");
    return false;
  }
  else {
    alert("Submit successed");
  }
}
function cancle() {
  document.getElementById("info").reset();
}
function can_del() {
  window.location.assign("user_info.html")
}
function del() {
  window.location.assign("index.html");
  alert("Account has been deleted");
}
