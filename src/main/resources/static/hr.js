const hrCodeInput = document.getElementById("hrCode");
const hrNameInput = document.getElementById("hrName");
const hrStatus = document.getElementById("hrStatus");
const hrVerifyBtn = document.getElementById("hrVerifyBtn");
const hrLoginCard = document.getElementById("hrLoginCard");
const dashboardSection = document.getElementById("dashboardSection");

function addCell(row, text) {
    const td = document.createElement("td");
    td.textContent = text ?? "";
    row.appendChild(td);
}

async function loadSurveys(hrCode, hrName) {
    const loadingMsg = document.getElementById("loadingMsg");
    const errorMsg = document.getElementById("errorMsg");
    const tableWrapper = document.getElementById("tableWrapper");
    const tbody = document.getElementById("surveyTableBody");

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

hrVerifyBtn.addEventListener("click", async () => {
    const code = hrCodeInput.value.trim();
    const name = hrNameInput.value.trim();
    hrStatus.innerHTML = "";

    if (!code || !name) {
        hrStatus.innerHTML = '<div class="alert alert-warning py-2">Please enter both fields.</div>';
        return;
    }

    try {
        const verifyRes = await fetch(
            `/api/employees/verify?employeeCode=${encodeURIComponent(code)}&employeeName=${encodeURIComponent(name)}&role=HR`
        );

        if (!verifyRes.ok) {
            hrStatus.innerHTML = '<div class="alert alert-danger py-2">HR code/name not recognized.</div>';
            return;
        }

        hrLoginCard.classList.add("d-none");
        dashboardSection.classList.remove("d-none");
        loadSurveys(code, name);
    } catch (err) {
        hrStatus.innerHTML = '<div class="alert alert-warning py-2">Could not reach the server.</div>';
    }
});