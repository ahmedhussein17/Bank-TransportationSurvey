package BankSurveyWeb.BankSurvay.controller;

import java.util.List;

import BankSurveyWeb.BankSurvay.model.TransportationSurvey;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import BankSurveyWeb.BankSurvay.service.EmployeeService;
import BankSurveyWeb.BankSurvay.service.TransportationSurveyService;

@RestController
@RequestMapping("/api/admin")
public class AdminSurveyController {

    private final TransportationSurveyService service;
    private final EmployeeService employeeService;

    public AdminSurveyController(TransportationSurveyService service, EmployeeService employeeService) {
        this.service = service;
        this.employeeService = employeeService;
    }

    @GetMapping("/surveys")
    public ResponseEntity<List<TransportationSurvey>> getAllSurveys(@RequestParam String hrCode, @RequestParam String hrName){
        if(employeeService.verify(hrCode, hrName, "HR").isEmpty()){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(service.getAllSurveys());
    }

    
}
