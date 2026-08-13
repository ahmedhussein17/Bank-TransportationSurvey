async function autoDetectAndRedirect() {
    const statusMsg = document.getElementById("statusMsg");

    try {
        const res = await fetch("/api/employees/auto-detect");

        if (!res.ok) {
            statusMsg.innerHTML =
                '<div class="alert alert-warning">This computer is not registered. Please contact IT.</div>';
            return;
        }

        const employee = await res.json();
        window.location.href = employee.role === "HR" ? "hr.html" : "survey.html";
    } catch (err) {
        statusMsg.innerHTML =
            '<div class="alert alert-warning">Could not reach the server.</div>';
    }
}

autoDetectAndRedirect();