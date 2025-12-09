document.querySelector("#calculate").addEventListener("click", function () {
    const height = document.querySelector("#height").value;
    const weight = document.querySelector("#weight").value;
    const bmiValue = document.querySelector("#bmi-value");
    const category = document.querySelector("#bmi-category");

    if (height === "" || weight === "" || height <= 0 || weight <= 0) {
        bmiValue.textContent = "--";
        category.textContent = "Please enter valid values.";
        category.className = "category";
        return;
    }

    let heightInMeters = height / 100;
    let bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    bmiValue.textContent = bmi;

    let status = "";
    category.className = "category";

    if (bmi < 18.5) {
        status = "Underweight";
        category.classList.add("underweight");

    } else if (bmi >= 18.5 && bmi < 24.9) {
        status = "Normal (Healthy)";
        category.classList.add("normal");

    } else if (bmi >= 25 && bmi < 29.9) {
        status = "Overweight";
        category.classList.add("overweight");

    } else {
        status = "Obese";
        category.classList.add("obese");
    }

    category.textContent = status;
});

// Reset button functionality
document.querySelector("#reset").addEventListener("click", function () {
    document.querySelector("#height").value = "";
    document.querySelector("#weight").value = "";
    document.querySelector("#bmi-value").textContent = "--";
    const category = document.querySelector("#bmi-category");
    category.textContent = "--";
    category.className = "category";
});
