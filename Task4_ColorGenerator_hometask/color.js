function createColorBox(color) {
    if (!color) return;

    const box = document.createElement("div");
    box.style.background = color;

    document.getElementById("boxes").appendChild(box);
}

function addColors() {

    const c1 = document.getElementById("color1").value.trim();
    const c2 = document.getElementById("color2").value.trim();
    const c3 = document.getElementById("color3").value.trim();

    createColorBox(c1);
    createColorBox(c2);
    createColorBox(c3);

    // BONUS: BOM Info
    const info = `
        Window Size: ${window.innerWidth} x ${window.innerHeight}
        | Browser: ${navigator.userAgent}
    `;
    document.getElementById("browserInfo").innerText = info;
}

function clearBoxes() {
    document.getElementById("boxes").innerHTML = "";
    document.getElementById("browserInfo").innerText = "";
}
