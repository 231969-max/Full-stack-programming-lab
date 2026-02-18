function calculate() {

    const n1 = document.getElementById("num1").value;
    const n2 = document.getElementById("num2").value;
    const op = document.getElementById("operation").value;
    const box = document.getElementById("resultBox");

    if (n1 === "" || n2 === "") {
        box.innerHTML = "Please enter both numbers";
        box.style.background = "#ffd6d6";
        return;
    }

    const a = Number(n1);
    const b = Number(n2);
    let result;

    if (op === "/" && b === 0) {
        box.innerHTML = "Error: Cannot divide by zero";
        box.style.background = "#ffd6d6";
        return;
    }

    if (op === "+") result = a + b;
    else if (op === "-") result = a - b;
    else if (op === "*") result = a * b;
    else if (op === "/") result = a / b;

    box.innerHTML = "Result: " + result;

    if (result > 0) box.style.background = "lightgreen";
    else if (result < 0) box.style.background = "salmon";
    else box.style.background = "#eee";
}

function resetCalc() {
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("resultBox").innerHTML = "Result will appear here";
    document.getElementById("resultBox").style.background = "#eee";
}
