const historyList = JSON.parse(localStorage.getItem("bmiHistory")) || [];

document.querySelector("#calculate").addEventListener("click", calculateBMI);
document.querySelector("#reset").addEventListener("click", resetForm);
window.addEventListener("load", renderHistory);

function calculateBMI() {
    const age = Number(value("#age"));
    const gender = value("#gender");
    const height = Number(value("#height"));
    const weight = Number(value("#weight"));

    const bmiValue = document.querySelector("#bmi-value");
    const category = document.querySelector("#bmi-category");
    const advice = document.querySelector("#advice");
    const ideal = document.querySelector("#ideal-weight");
    const bar = document.querySelector("#progress-bar");

    if (!age || !gender || !height || !weight) {
        category.textContent = "Please fill all fields";
        return;
    }

    if (age < 5 || age > 120) {
        category.textContent = "Enter valid age (5–120)";
        return;
    }

    if (height < 50 || height > 250) {
        category.textContent = "Enter valid height (50–250 cm)";
        return;
    }

    if (weight < 10 || weight > 300) {
        category.textContent = "Enter valid weight (10–300 kg)";
        return;
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    bmiValue.textContent = bmi;

    let status = "", tips = "", color = "";

    if (bmi < 18.5) {
        status = "Underweight";
        tips = "Increase calorie intake and consult a nutritionist.";
        color = "underweight";
        bar.style.width = "25%";
    } else if (bmi < 25) {
        status = "Normal";
        tips = "Great! Maintain your healthy lifestyle.";
        color = "normal";
        bar.style.width = "50%";
    } else if (bmi < 30) {
        status = "Overweight";
        tips = "Exercise regularly and avoid junk food.";
        color = "overweight";
        bar.style.width = "75%";
    } else {
        status = "Obese";
        tips = "Medical consultation is recommended.";
        color = "obese";
        bar.style.width = "100%";
    }

    if (gender === "Female" && bmi > 25) {
        tips += " Consider consulting a specialist.";
    }

    category.className = `category ${color}`;
    category.textContent = status;
    advice.textContent = tips;

    const min = (18.5 * (height / 100) ** 2).toFixed(1);
    const max = (24.9 * (height / 100) ** 2).toFixed(1);
    ideal.textContent = `Ideal Weight Range: ${min} kg – ${max} kg`;

    saveHistory(bmi, status);
}

function saveHistory(bmi, status) {
    historyList.unshift(`BMI: ${bmi} (${status})`);
    if (historyList.length > 5) historyList.pop();
    localStorage.setItem("bmiHistory", JSON.stringify(historyList));
    renderHistory();
}

function renderHistory() {
    const list = document.querySelector("#history");
    list.innerHTML = historyList.map(item => `<li>${item}</li>`).join("");
}

function resetForm() {
    document.querySelectorAll("input, select").forEach(i => i.value = "");
    document.querySelector("#bmi-value").textContent = "--";
    document.querySelector("#bmi-category").textContent = "--";
    document.querySelector("#advice").textContent = "";
    document.querySelector("#ideal-weight").textContent = "";
    document.querySelector("#progress-bar").style.width = "0%";
}

function value(id) {
    return document.querySelector(id).value;
}
