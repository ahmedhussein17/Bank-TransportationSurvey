const hrCodeInput = document.getElementById("hrCode");
const hrNameInput = document.getElementById("hrName");
const hrStatus = document.getElementById("hrStatus");
const hrVerifyBtn = document.getElementById("hrVerifyBtn");
const dashboardSection = document.getElementById("dashboardSection");

const EMP_STORAGE_KEY = "bankSurveyEmployee";

function lockHrFields() {
    hrCodeInput.readOnly = true;
    hrNameInput.readOnly = true;
    hrCodeInput.classList.add("bg-light");
    hrNameInput.classList.add("bg-light");
}

function addCell(row, text) {
    const td = document.createElement("td");
    td.textContent = text ?? "";
    row.appendChild(td);
}

function loadSavedEntry() {
    const raw = localStorage.getItem(EMP_STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

async function loadSurveys(hrCode, hrName) {
    const loadingMsg = document.getElementById("loadingMsg");
    const errorMsg = document.getElementById("errorMsg");
    const tableWrapper = document.getElementById("tableWrapper");
    const tbody = document.getElementById("surveyTableBody");

    // Reset state so repeated clicks don't duplicate rows or stack old messages.
    tbody.innerHTML = "";
    errorMsg.classList.add("d-none");
    errorMsg.classList.remove("alert-info");
    errorMsg.classList.add("alert-danger");
    tableWrapper.classList.add("d-none");
    loadingMsg.classList.remove("d-none");

    try {
        const res = await fetch(`/api/admin/surveys?hrCode=${encodeURIComponent(hrCode)}&hrName=${encodeURIComponent(hrName)}`);
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

async function verifyAndLoad(code, name) {
    hrStatus.innerHTML = "";

    if (!code || !name) {
        hrStatus.innerHTML = '<div class="alert alert-warning py-2 mb-0">Please enter both fields.</div>';
        return;
    }

    try {
        const verifyRes = await fetch(
            `/api/employees/verify?employeeCode=${encodeURIComponent(code)}&employeeName=${encodeURIComponent(name)}&role=HR`
        );

        if (!verifyRes.ok) {
            hrStatus.innerHTML = '<div class="alert alert-danger py-2 mb-0">HR code/name not recognized.</div>';
            return;
        }

        lockHrFields();
        dashboardSection.classList.remove("d-none");
        loadSurveys(code, name);
    } catch (err) {
        hrStatus.innerHTML = '<div class="alert alert-warning py-2 mb-0">Could not reach the server.</div>';
    }
}

hrVerifyBtn.addEventListener("click", () => {
    verifyAndLoad(hrCodeInput.value.trim(), hrNameInput.value.trim());
});

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const paramCode = params.get("code");
    const paramName = params.get("name");

    if (paramCode && paramName) {
        hrCodeInput.value = paramCode;
        hrNameInput.value = paramName;
        verifyAndLoad(paramCode, paramName);
        return;
    }

    const saved = loadSavedEntry();
    if (saved && saved.role === "HR") {
        hrCodeInput.value = saved.code;
        hrNameInput.value = saved.name;
        verifyAndLoad(saved.code, saved.name);
        return;
    }

    if (saved && saved.role === "EMPLOYEE") {
        window.location.href = "survey.html";
    }
});