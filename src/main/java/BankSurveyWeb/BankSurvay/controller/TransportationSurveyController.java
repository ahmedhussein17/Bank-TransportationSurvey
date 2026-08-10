package BankSurveyWeb.BankSurvay.controller;

import BankSurveyWeb.BankSurvay.dto.TransportationSurveyRequest;
import BankSurveyWeb.BankSurvay.model.TransportationSurvey;
import BankSurveyWeb.BankSurvay.service.EmployeeService;
import BankSurveyWeb.BankSurvay.service.TransportationSurveyService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/surveys")
public class TransportationSurveyController {

    private final TransportationSurveyService service;
    private final EmployeeService employeeService;

    public TransportationSurveyController(TransportationSurveyService service, EmployeeService employeeService){
        this.service = service;
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<TransportationSurvey> createSurvey(@Valid @RequestBody TransportationSurveyRequest request) {
        TransportationSurvey saved = service.saveFromRequest(request);
        return ResponseEntity.ok(saved);
    }

    // @GetMapping
    // public List<TransportationSurvey> getAllSurveys() {
    //     return service.getAllSurveys();
    // }

    // @GetMapping("/{employeeCode}")
    // public ResponseEntity<TransportationSurvey> getByEmployeeCode(@PathVariable String employeeCode) {
    //     Optional<TransportationSurvey> survey = service.getByEmployeeCode(employeeCode);
    //     return survey.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    // }

    @GetMapping("/{employeeCode}")
    public ResponseEntity<TransportationSurvey> getByEmployeeCode(@PathVariable String employeeCode, @RequestParam String employeeName){
        
        if(employeeService.verify(employeeCode, employeeName, "EMPLOYEE").isEmpty()){
            return ResponseEntity.status(403).build();
        }
        Optional<TransportationSurvey> survey = service.getByEmployeeCode(employeeCode);
        return survey.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}