package BankSurveyWeb.BankSurvay.controller;

import java.util.Optional;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import BankSurveyWeb.BankSurvay.model.Employee;
import BankSurveyWeb.BankSurvay.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService service;

    public EmployeeController(EmployeeService service){
        this.service = service;
    }

    @GetMapping("/verify")
    public ResponseEntity<Employee> verify(@RequestParam String employeeCode, @RequestParam String employeeName, @RequestParam String role){
        Optional<Employee> employee = service.verify(employeeCode, employeeName, role);
        return employee.map(ResponseEntity :: ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/verify-any")
    public ResponseEntity<Employee> verifyAny(@RequestParam String employeeCode, @RequestParam String employeeName){
        Optional<Employee> employee = service.verifyAny(employeeCode, employeeName);
        return employee.map(ResponseEntity :: ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
