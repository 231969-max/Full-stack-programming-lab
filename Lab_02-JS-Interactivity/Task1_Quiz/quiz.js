const a1 = "hypertext markup language";
const a2 = "styling";
const a3 = "programming language";

function checkQuiz() {
    let score = 0;

    if (q1.value.toLowerCase() === a1) score++;
    if (q2.value.toLowerCase() === a2) score++;
    if (q3.value.toLowerCase() === a3) score++;

    let msg;

    if (score === 3) msg = "Excellent! Full marks 🎉";
    else if (score === 2) msg = "Good job 👍";
    else msg = "Keep practicing 💪";

    result.innerHTML = "Score " + score + "/3 - " + msg;

    result.style.color =
        score === 3 ? "green" :
        score === 2 ? "orange" :
        "red";
}

function resetQuiz() {
    q1.value = "";
    q2.value = "";
    q3.value = "";
    result.innerHTML = "";
}
