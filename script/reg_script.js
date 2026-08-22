function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let repeatPass = document.getElementById("repeat_pass").value;

    if ((username.trim() === "") || (password.trim() === "") || (repeatPass.trim() === "")) {
        alert("Please fill in all boxes!");
        return;
    }

    if (password !== repeatPass) {
        alert("Passwords do not match!");
        return;
    }

    let users = localStorage.getItem("cinema_users");
    if (users === null) {
        users = [];
    } else {
        users = JSON.parse(users);
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            alert("Username already exists!");
            return;
        }
    }

    let newUser = {
        username: username,
        password: password
    };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login_page.html";
}