function addCell(row, text) {
    const td = document.createElement("td");
    td.textContent = text ?? "";
    row.appendChild(td);
}

async function loadSurveys() {
    const loadingMsg = document.getElementById("loadingMsg");
    const errorMsg = document.getElementById("errorMsg");
    const tableWrapper = document.getElementById("tableWrapper");
    const tbody = document.getElementById("surveyTableBody");

    tbody.innerHTML = "";
    errorMsg.classList.add("d-none");
    errorMsg.classList.remove("alert-info");
    errorMsg.classList.add("alert-danger");
    tableWrapper.classList.add("d-none");
    loadingMsg.classList.remove("d-none");

    try {
        const res = await fetch("/api/admin/surveys");
        if (!res.ok) throw new Error("Request failed: " + res.status);

        const surveys = await res.json();
        loadingMsg.classList.add("d-none");

        if (surveys.length === 0) {
            errorMsg.textContent = "No survey responses yet.";
            errorMsg.classList.remove("d-none");
            errorMsg.classList.replace("alert-danger", "alert-info");
            return;
        }

        surveys.forEach(s => {
            const row = document.createElement("tr");
            [s.employeeCode, s.employeeName, s.governorate, s.area, s.street, s.pickupPoint,
             s.tripTime, s.monthlyCost, s.transportMethod, s.bankTransport, s.carpooling,
             s.challenges, s.suggestions, s.comments].forEach(val => addCell(row, val));
            tbody.appendChild(row);
        });

        tableWrapper.classList.remove("d-none");
    } catch (err) {
        loadingMsg.classList.add("d-none");
        errorMsg.textContent = "Could not load survey responses.";
        errorMsg.classList.remove("d-none");
    }
}

async function initHrPage() {
    const hrStatus = document.getElementById("hrStatus");
    const dashboardSection = document.getElementById("dashboardSection");
    const hrCodeInput = document.getElementById("hrCode");
    const hrNameInput = document.getElementById("hrName");

    try {
        const res = await fetch("/api/employees/auto-detect");

        if (!res.ok) {
            hrStatus.innerHTML =
                '<div class="alert alert-warning">This computer is not registered. Please contact IT.</div>';
            return;
        }

        const employee = await res.json();

        if (employee.role !== "HR") {
            window.location.href = "survey.html";
            return;
        }

        hrCodeInput.value = employee.employeeCode;
        hrNameInput.value = employee.employeeName;
        hrCodeInput.readOnly = true;
        hrNameInput.readOnly = true;
        hrCodeInput.classList.add("bg-light");
        hrNameInput.classList.add("bg-light");

        dashboardSection.classList.remove("d-none");
        loadSurveys();
    } catch (err) {
        hrStatus.innerHTML =
            '<div class="alert alert-warning">Could not reach the server.</div>';
    }
}

document.addEventListener("DOMContentLoaded", initHrPage);