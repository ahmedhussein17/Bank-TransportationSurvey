//governorates and their areas
const areas = {
    "Cairo": [
        "مدينة نصر",
        "هيليوبلس",
        "القاهرة الجديدة",
        "التجمع الخامس",
        "الرحاب",
        "مدينتي",
        "الشروق",
        "بدر",
        "العبور",
        "المقطم",
        "المعادي",
        "زهراء المعادي",
        "المعادي الجديدة",
        "حلوان",
        "دار السلام",
        "السيدة زينب",
        "البساتين",
        "المنيل",
        "جاردن سيتي",
        "التحرير",
        "الزمالك",
        "شبرا",
        "المرج",
        "عين شمس",
        "السلام",
        "المريوطية",
        "حدائق القبة",
        "الزيتون",
        "النزهة",
        "الويلي",
        "العباسية",
        "القطامية",
        "أخرى"
    ],

    "Giza": [
        "الدقي",
        "المهندسين",
        "العجوزة",
        "الهرم",
        "فيصل",
        "الجيزة",
        "العمرانية",
        "بولاق الدكرور",
        "الشيخ زايد",
        "6 أكتوبر",
        "حدائق القبة",
        "ديم لاند",
        "بيفرلي هيلز",
        "كرداسة",
        "أبو رواش",
        "أخرى"
    ]
};

//da b y get by id ll select elements
const governorateSelect = document.getElementById("governorate");
const areaSelect = document.getElementById("area");
const pickupSelect = document.getElementById("pickupPoint"); // da ll pickup points
const pickupManualInput = document.getElementById("pickupPointManual"); //da 3shan el amaken el mlhash enha tselect pickup point


governorateSelect.addEventListener("change", function () {

    areaSelect.innerHTML = '<option value="">Select area</option>';

    const selectedGovernorate = this.value;

    if (selectedGovernorate !== "") {

        areas[selectedGovernorate].forEach(function (area) {

            let option = document.createElement("option");

            option.value = area;
            option.textContent = area;

            areaSelect.appendChild(option);

        });

    }

});


// pickup points

const pickupPoints = {

    "حلوان": [
        "شارع منصور",
        "عين حلوان (طريق الجامعة)",
        "دار المهندسين",
        "الدواجن",
        "عزبة النخل",
        "منتصر",
        "كوتسكا (جامع عبد المنعم)",
        "شارع 199 المعادي",
        "محور حسب الله الكفراوي",
        "التجمع"
    ],

    "الرحاب": [
        "مدينتي B11",
        "مدينتي B10",
        "مدينتي B6",
        "مدينتي B2",
        "وصال (طريق السويس)",
        "الرحاب بوابة 23",
        "الرحاب بوابة 6",
        "التجمع الأول"
    ],

    "مدينتي": [
        "مدينتي B11",
        "مدينتي B10",
        "مدينتي B6",
        "مدينتي B2",
        "وصال (طريق السويس)"
    ],

    "6 أكتوبر": [
        "جامعة أكتوبر",
        "المتميز",
        "الفردوس الشرطة",
        "الفردوس الجيش",
        "حي الأشجار",
        "مدخل زويل",
        "السلم السياحي"
    ],

    "مدينة نصر": [
        "جنينة مول",
        "شارع زهراء مدينة نصر",
        "مكرم عبيد",
        "النادي الأهلي",
        "مساكن الضباط"
    ],

    "هيليوبلس": [
        "ميدان المطرية",
        "حلمية الزيتون",
        "التجنيد",
        "الجلاء",
        "دار الإشارة",
        "سيتي سنتر ألماظة"
    ],

    "مصر الجديدة 1": [
        "ميدان المطرية",
        "حلمية الزيتون",
        "التجنيد",
        "الجلاء",
        "دار الإشارة",
        "سيتي سنتر ألماظة"
    ],

    "مصر الجديدة 2": [
        "إشارة الجنزوري من جسر السويس",
        "ألف مسكن",
        "ميدان الحجاز",
        "ميدان تريومف"
    ],

    "فيصل": [
        "شارع العشرين من بره",
        "أول فيصل برج الأطباء",
        "مستشفى الرمد",
        "ميدان الجيزة",
        "المنيل",
        "جامع عمرو",
        "متحف الحضارات"
    ],

    "الهرم": [
        "ترسا",
        "شارع الهرم",
        "شارع فيصل",
        "مستشفى الرمد",
        "شارع البحر الأعظم",
        "دائري كارفور المعادي",
        "BMW"
    ],

    "المعادي": [
        "دجلة",
        "امتداد الأمل",
        "القمر الصناعي",
        "اللاسلكي",
        "النصر",
        "توكيل أديداس (الدائري)"
    ]
};

areaSelect.addEventListener("change", function () {

    pickupSelect.innerHTML = '<option value="">Select pickup point</option>';
    pickupManualInput.value = "";

    const selectedArea = this.value;

    if (selectedArea !== "" && pickupPoints[selectedArea]) {

        pickupSelect.classList.remove("d-none");
        pickupManualInput.classList.add("d-none");

        pickupPoints[selectedArea].forEach(function (point) {

            let option = document.createElement("option");

            option.value = point;
            option.textContent = point;

            pickupSelect.appendChild(option);

        });

    } else{
        pickupSelect.classList.add("d-none");
        pickupManualInput.classList.remove("d-none");
    }

});

// ===================== Employee verification + edit-existing-data + device lock =====================
// Employees are added to the database manually by an admin (not through this form).
// When the user fills in their code amd name, we verify them against that table and,
// if they've already submitted a survey, load it into the form so they can edit it.
// Once verified, the code/name are saved to this device (localStorage) and locked,
// so the same person can't retype different credentials from this browser.

const employeeCodeInput = document.getElementById("employeeCode");
const employeeNameInput = document.getElementById("employeeName");
const employeeStatus = document.getElementById("employeeStatus");
const surveyForm = document.getElementById("surveyForm");

const EMP_STORAGE_KEY = "bankSurveyEmployee";

function lockEmployeeFields() {
    employeeCodeInput.readOnly = true;
    employeeNameInput.readOnly = true;
    employeeCodeInput.classList.add("bg-light");
    employeeNameInput.classList.add("bg-light");
}

function loadSavedEmployee() {
    const raw = localStorage.getItem(EMP_STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function saveEmployeeToDevice(code, name) {
    localStorage.setItem(EMP_STORAGE_KEY, JSON.stringify({ code, name }));
}

function setRadioValue(name, value) {
    const el = document.querySelector(`input[name="${name}"][value="${value}"]`);
    if (el) el.checked = true;
}

function getPickupPointValue(){
    return pickupManualInput.classList.contains("d-none")
    ? pickupSelect.value
    : pickupManualInput.value.trim();
}

function fillFormWithSurvey(survey) {
    document.getElementById("governorate").value = survey.governorate || "";
    document.getElementById("governorate").dispatchEvent(new Event("change"));
    document.getElementById("area").value = survey.area || "";
    document.getElementById("area").dispatchEvent(new Event("change"));

    if (pickupPoints[survey.area] && pickupPoints[survey.area].includes(survey.pickupPoint)) {
        pickupSelect.value = survey.pickupPoint || "";
    } else if (survey.pickupPoint) {
        pickupSelect.classList.add("d-none");
        pickupManualInput.classList.remove("d-none");
        pickupManualInput.value = survey.pickupPoint;
    }

    document.getElementById("street").value = survey.street || "";
    document.getElementById("monthlyCost").value = survey.monthlyCost || "";
    document.getElementById("Challenges").value = survey.challenges || "";
    document.getElementById("Suggestions").value = survey.suggestions || "";
    document.getElementById("comments").value = survey.comments || "";
    if (survey.tripTime) setRadioValue("tripTime", survey.tripTime);
    if (survey.transportMethod) setRadioValue("transportMethod", survey.transportMethod);
    if (survey.bankTransport) setRadioValue("bankTransport", survey.bankTransport);
    if (survey.carpooling) setRadioValue("carpooling", survey.carpooling);
}

async function checkEmployeeAndLoadSurvey() {
    const code = employeeCodeInput.value.trim();
    const name = employeeNameInput.value.trim();
    employeeStatus.innerHTML = "";

    if (!code || !name) return;

    try {

        // by verify en el code wl name mwgodeen fl database
        const verifyRes = await fetch(
            `/api/employees/verify?employeeCode=${encodeURIComponent(code)}&employeeName=${encodeURIComponent(name)}&role=EMPLOYEE`
        );

        if (!verifyRes.ok) {
            employeeStatus.innerHTML =
                '<div class="alert alert-danger py-2 mb-0">Employee code/name not recognized. Please check with HR/admin.</div>';
            return;
        }

        //lock the credentials to this device so they can't be changed later.
        saveEmployeeToDevice(code, name);
        lockEmployeeFields();

        // Check if they already have a submitted survey to edit.
        const surveyRes = await fetch(`/api/surveys/${encodeURIComponent(code)}?employeeName=${encodeURIComponent(name)}`);  //di el 3delt fiha 
        if (surveyRes.ok) {
            const survey = await surveyRes.json();
            fillFormWithSurvey(survey);
            employeeStatus.innerHTML =
                '<div class="alert alert-info py-2 mb-0">Loaded your previous submission — edit and resubmit to update it.</div>';
        } else {
            employeeStatus.innerHTML =
                '<div class="alert alert-success py-2 mb-0">Employee verified. No previous submission found — fill out the form below.</div>';
        }
    } catch (err) {
        console.error(err);
        employeeStatus.innerHTML =
            '<div class="alert alert-warning py-2 mb-0">Could not reach the server to verify employee.</div>';
    }
}

employeeCodeInput.addEventListener("blur", checkEmployeeAndLoadSurvey);
employeeNameInput.addEventListener("blur", checkEmployeeAndLoadSurvey);

//Submit (single handler — verifies, then upserts)
surveyForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const getRadioValue = (name) => {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return el ? el.value : null;
    };

    const survey = {
        employeeCode: employeeCodeInput.value.trim(),
        employeeName: employeeNameInput.value.trim(),
        governorate: document.getElementById("governorate").value,
        area: document.getElementById("area").value,
        street: document.getElementById("street").value,
        pickupPoint: getPickupPointValue(),
        tripTime: getRadioValue("tripTime"),
        monthlyCost: document.getElementById("monthlyCost").value,
        transportMethod: getRadioValue("transportMethod"),
        bankTransport: getRadioValue("bankTransport"),
        carpooling: getRadioValue("carpooling"),
        challenges: document.getElementById("Challenges").value,
        suggestions: document.getElementById("Suggestions").value,
        comments: document.getElementById("comments").value,
    };

    // Re-verify right before submit so no one can bypass the check by
    // editing the form without ever blurring the employee fields.
    const verifyRes = await fetch(
        `/api/employees/verify?employeeCode=${encodeURIComponent(survey.employeeCode)}&employeeName=${encodeURIComponent(survey.employeeName)}&role=EMPLOYEE`
    );
    if (!verifyRes.ok) {
        employeeStatus.innerHTML =
            '<div class="alert alert-danger py-2 mb-0">Employee code/name not recognized. Cannot submit.</div>';
        return;
    }

    try {
        const res = await fetch("/api/surveys", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(survey),
        });
        if (!res.ok) throw new Error("Request failed: " + res.status);

        // Successful save also confirms this device's saved credentials, keep them locked.
        saveEmployeeToDevice(survey.employeeCode, survey.employeeName);
        lockEmployeeFields();

        alert("Survey submitted — thank you!");
    } catch (err) {
        console.error(err);
        alert("Something went wrong submitting the survey.");
    }
});

//Auto-load on page visit
// lock the fields ll 3mlo el survey  abl keda.
document.addEventListener("DOMContentLoaded", async () => {
    const saved = loadSavedEmployee();
    if (saved) {
        employeeCodeInput.value = saved.code;
        employeeNameInput.value = saved.name;
        lockEmployeeFields();
        await checkEmployeeAndLoadSurvey();
    }
});
