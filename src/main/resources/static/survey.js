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

const governorateSelect = document.getElementById("governorate");
const areaSelect = document.getElementById("area");
const pickupSelect = document.getElementById("pickupPoint");
const pickupManualInput = document.getElementById("pickupPointManual");

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

    } else {
        pickupSelect.classList.add("d-none");
        pickupManualInput.classList.remove("d-none");
    }

});

function getPickupPointValue() {
    return pickupManualInput.classList.contains("d-none")
        ? pickupSelect.value
        : pickupManualInput.value.trim();
}

function setRadioValue(name, value) {
    const el = document.querySelector(`input[name="${name}"][value="${value}"]`);
    if (el) el.checked = true;
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



//Employee identity — auto-detected by workstation IP
const employeeCodeInput = document.getElementById("employeeCode");
const employeeNameInput = document.getElementById("employeeName");
const employeeStatus = document.getElementById("employeeStatus");
const surveyForm = document.getElementById("surveyForm");

function lockEmployeeFields() {
    employeeCodeInput.readOnly = true;
    employeeNameInput.readOnly = true;
    employeeCodeInput.classList.add("bg-light");
    employeeNameInput.classList.add("bg-light");
}

async function initSurveyPage() {
    employeeStatus.innerHTML = "";

    try {
        const res = await fetch("/api/employees/auto-detect");

        if (!res.ok) {
            employeeStatus.innerHTML =
                '<div class="alert alert-warning">This computer is not registered. Please contact IT.</div>';
            surveyForm.querySelector("button[type=submit]").disabled = true;
            return;
        }

        const employee = await res.json();

        // if (employee.role !== "EMPLOYEE") {
        //     window.location.href = "hr.html";
        //     return;
        // }

        employeeCodeInput.value = employee.employeeCode;
        employeeNameInput.value = employee.employeeName;

        if(employee.role === "HR"){
            document.getElementById("hrNavLink").classList.remove("d-none");
        }
        // lockEmployeeFields();

        const surveyRes = await fetch("/api/surveys/mine");
        if (surveyRes.ok) {
            const survey = await surveyRes.json();
            fillFormWithSurvey(survey);
            employeeStatus.innerHTML =
                '<div class="alert alert-info py-2 mb-0">Loaded your previous submission — edit and resubmit to update it.</div>';
        } else {
            employeeStatus.innerHTML =
                '<div class="alert alert-success py-2 mb-0">Welcome, ' + employee.employeeName + '. Fill out the form below.</div>';
        }
    } catch (err) {
        employeeStatus.innerHTML =
            '<div class="alert alert-warning">Could not reach the server.</div>';
    }
}

surveyForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const getRadioValue = (name) => {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return el ? el.value : null;
    };

    const survey = {
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

    try {
        const res = await fetch("/api/surveys", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(survey),
        });
        if (!res.ok) throw new Error("Request failed: " + res.status);
        alert("Survey submitted — thank you!");
    } catch (err) {
        console.error(err);
        alert("Something went wrong submitting the survey.");
    }
});

document.addEventListener("DOMContentLoaded", initSurveyPage);