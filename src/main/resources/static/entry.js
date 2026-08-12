const entryCodeInput = document.getElementById("entryCode");
const entryNameInput = document.getElementById("entryName");
const entryStatus = document.getElementById("entryStatus");
const entryBtn = document.getElementById("entryBtn");

const EMP_STORAGE_KEY = "bankSurveyEmployee";

function loadSavedEntry(){
    const raw = localStorage.getItem(EMP_STORAGE_KEY);
    if(!raw) return null;
    try{
        return JSON.parse(raw);
    }catch{
        return null;
    }
}

function goToRolePage(code, name, role){
    if(role === "HR"){
        window.location.href = "hr.html"
    }else{
        window.location.href = "survey.html"
    }
}

entryBtn.addEventListener("click", async () => {
    const code = entryCodeInput.value.trim();
    const name = entryNameInput.value.trim();
    entryStatus.innerHTML = "";

    if(!code || !name){
        entryStatus.innerHTML = '<div class="alert alert-warning py-2">Please enter both fields</div>';
        return;
    }
    try{
        const res = await fetch(`/api/employees/verify-any?employeeCode=${encodeURIComponent(code)}&employeeName=${encodeURIComponent(name)}`);

        if (!res.ok) {
        entryStatus.innerHTML = '<div class="alert alert-danger py-2">Code/name not recognized. Please check and try again.</div>';
        return;
    }

    const employee = await res.json();

    localStorage.setItem(
        EMP_STORAGE_KEY,
        JSON.stringify({
            code,
            name,
            role : employee.role
        })
    );
    goToRolePage(code, name, employee.role)

    } catch (err){
        entryStatus.innerHTML = '<div class="alert alert-warning py-2">Could not reach the server.</div>';
    }
});


//di 3shan lw el device d5al abl keda kol myft7 el site ht5osh 3la 7gto 3ltool
document.addEventListener("DOMContentLoaded", () => {
    const saved = loadSavedEntry();
    if(saved){
        goToRolePage(saved.code, saved.name, saved.role);
    }
})