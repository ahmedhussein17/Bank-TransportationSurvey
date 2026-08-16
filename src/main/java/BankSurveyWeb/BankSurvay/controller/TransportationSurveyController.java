package BankSurveyWeb.BankSurvay.controller;

import BankSurveyWeb.BankSurvay.dto.TransportationSurveyRequest;
import BankSurveyWeb.BankSurvay.model.Employee;
import BankSurveyWeb.BankSurvay.model.TransportationSurvey;
import BankSurveyWeb.BankSurvay.service.TransportationSurveyService;
import BankSurveyWeb.BankSurvay.service.WorkstationService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/surveys")
public class TransportationSurveyController {

    private final TransportationSurveyService service;
    private final WorkstationService workstationService;

    public TransportationSurveyController(TransportationSurveyService service, WorkstationService workstationService){
        this.service = service;
        this.workstationService = workstationService;
    }

    @PostMapping
    public ResponseEntity<TransportationSurvey> createSurvey(@Valid @RequestBody TransportationSurveyRequest request, HttpServletRequest httpRequest) {
        Optional<Employee> employee = workstationService.resolveByIp(httpRequest.getRemoteAddr());
        if (employee.isEmpty()) {
            return ResponseEntity.status(403).build();
        }

        request.setEmployeeCode(employee.get().getEmployeeCode());
        request.setEmployeeName(employee.get().getEmployeeName());

        TransportationSurvey saved = service.saveFromRequest(request);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/mine")
    public ResponseEntity<TransportationSurvey> getMine(HttpServletRequest httpRequest) {
        Optional<Employee> employee = workstationService.resolveByIp(httpRequest.getRemoteAddr());
        if (employee.isEmpty()) {
            return ResponseEntity.status(403).build();
        }

        Optional<TransportationSurvey> survey = service.getByEmployeeCode(employee.get().getEmployeeCode());
        return survey.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}