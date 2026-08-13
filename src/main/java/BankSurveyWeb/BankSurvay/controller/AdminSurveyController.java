package BankSurveyWeb.BankSurvay.controller;

import java.util.List;
import java.util.Optional;

import BankSurveyWeb.BankSurvay.model.Employee;
import BankSurveyWeb.BankSurvay.model.TransportationSurvey;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// import BankSurveyWeb.BankSurvay.service.EmployeeService;
import BankSurveyWeb.BankSurvay.service.TransportationSurveyService;
import BankSurveyWeb.BankSurvay.service.WorkstationService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/admin")
public class AdminSurveyController {

    private final TransportationSurveyService service;
    private final WorkstationService workstationService;

    public AdminSurveyController(TransportationSurveyService service, WorkstationService workstationService) {
        this.service = service;
        this.workstationService = workstationService;
    }

    @GetMapping("/surveys")
    public ResponseEntity<List<TransportationSurvey>> getAllSurveys(HttpServletRequest httpRequest){
        Optional<Employee> employee = workstationService.resolveByIp(httpRequest.getRemoteAddr());
        if(employee.isEmpty() || !"HR".equalsIgnoreCase(employee.get().getRole())){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(service.getAllSurveys());
    }

    
}
