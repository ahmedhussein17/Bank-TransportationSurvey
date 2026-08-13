# Bank Transportation Survey

An internal web application built during my internship at Attijariwafa Bank to collect employee transportation preferences — commute time and cost, pickup points, interest in carpooling, and interest in bank-subsidized transport — to help the bank plan transportation solutions for staff.

## Features

- **Zero-login access on registered desktops** — each employee's work computer is registered by its network IP address in the database. When they open the site, the server automatically identifies them and takes them straight to their own survey or HR dashboard — no code or name to type.
- **Editable, one-record-per-employee surveys** — submitting again updates the employee's existing response instead of creating a duplicate.
- **Role-based routing** — the same entry point sends `EMPLOYEE`-role users to the survey form and `HR`-role users to the response dashboard, based on their registered identity.
- **HR dashboard** — a read-only table of every submitted response, restricted to registered HR desktops only.
- **Dynamic address selection** — governorate → area → pickup point cascading dropdowns, with automatic fallback to a free-text field for areas that don't have predefined pickup points.
- **Server-side validation** — required fields are enforced via a request DTO and Spring's Bean Validation; a submission missing required data is rejected before it ever reaches the database.
- **Fully responsive layout** — a single fluid header scales cleanly from mobile to desktop with no breakpoints or overlap.

## Tech stack

- **Backend:** Java, Spring Boot, Spring Data JPA, MySQL
- **Frontend:** HTML, vanilla JavaScript, Bootstrap 5

## How identity works

There's no username/password login. Instead:

1. IT registers each employee's desktop by its **local network IP address**, linked to that employee's code in the `workstation` table.
2. When the browser hits `/api/employees/auto-detect`, the server reads the request's source IP directly (this can't be spoofed or edited from the browser, unlike `localStorage` or form fields) and looks up the matching employee.
3. The frontend redirects to the employee survey or HR dashboard based on that employee's registered `role`.

This requires each registered desktop to have a **stable IP** (static, or a DHCP reservation) — if a machine's IP changes, its `workstation` row needs to be updated to match.

## Getting started

### 1. Database setup

Create a MySQL database and update `src/main/resources/application.properties` with your own connection details:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bank_survey
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### 2. Run the app once

```
./mvnw spring-boot:run
```

This auto-creates the `employee`, `workstation`, and `transportation_survey` tables via `spring.jpa.hibernate.ddl-auto=update`.

### 3. Register employees and their desktops manually

There's no signup form — employee and workstation records are added directly by an admin:

```sql
INSERT INTO employee (employee_code, employee_name, role) VALUES ('EMP001', 'Employee Name', 'EMPLOYEE');
INSERT INTO employee (employee_code, employee_name, role) VALUES ('HR001', 'HR Name', 'HR');

INSERT INTO workstation (ip_address, employee_code) VALUES ('192.168.1.101', 'EMP001');
INSERT INTO workstation (ip_address, employee_code) VALUES ('192.168.1.102', 'HR001');
```
Note -- to get the ip address write ipconfig in the cmd

### 4. Open the site

From a registered desktop, visit the server's address (e.g. `http://<server-ip>:8080/`) — it will auto-detect and redirect with no manual entry required.

## Notes

- This is an internal-network tool. Identity is trust-based on IP registration rather than a password login, which fits a controlled office environment but is not equivalent to full authentication — anyone with access to a registered desktop's network position could act as that employee.
- `application.properties` (with real DB credentials) is intentionally excluded from version control via `.gitignore`. Use `application.properties.example` as a template.
