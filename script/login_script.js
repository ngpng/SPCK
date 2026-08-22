function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please enter username and password!");
        return;
    }

    let users = localStorage.getItem("users");
    if (users === null) {
        users = [];
    } else {
        users = JSON.parse(users);
    }

    let founduser = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            founduser = true;
            break;
        }
    }

    if (founduser === true) {
        localStorage.setItem("currentUser", username);
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Wrong username or password!");
    }
}