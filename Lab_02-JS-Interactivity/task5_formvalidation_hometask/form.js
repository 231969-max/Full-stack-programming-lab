function validateName(name) {
    if (name.trim() === "") return "Name cannot be empty";
    return "";
}

function validateEmail(email) {
    if (!email.includes("@")) return "Email must contain @";
    return "";
}

function validateAge(age) {
    if (age < 18 || age > 60) return "Age must be between 18 and 60";
    return "";
}

function validatePassword(pass) {
    if (pass.length < 6) return "Password must be at least 6 characters";
    return "";
}

function validateForm() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = Number(document.getElementById("age").value);
    const pass = document.getElementById("password").value;

    document.getElementById("nameError").innerText = validateName(name);
    document.getElementById("emailError").innerText = validateEmail(email);
    document.getElementById("ageError").innerText = validateAge(age);
    document.getElementById("passError").innerText = validatePassword(pass);

    if (
        validateName(name) === "" &&
        validateEmail(email) === "" &&
        validateAge(age) === "" &&
        validatePassword(pass) === ""
    ) {

        if (confirm("Submit the form?")) {

            alert("🎉 Registration Successful!");

            const hobby = prompt("What is your favorite hobby?");
            if (hobby) alert("Nice! I like " + hobby + " too 😊");

            document.getElementById("successMsg").innerText =
                "Form submitted successfully!";
        }
    }
}
