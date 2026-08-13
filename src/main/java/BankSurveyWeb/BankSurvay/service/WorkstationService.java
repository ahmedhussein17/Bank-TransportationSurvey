package BankSurveyWeb.BankSurvay.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import BankSurveyWeb.BankSurvay.model.Employee;
import BankSurveyWeb.BankSurvay.repository.EmployeeRepository;
import BankSurveyWeb.BankSurvay.repository.WorkstationRepository;

@Service
public class WorkstationService {
    
    private final WorkstationRepository workstationRepository;
    private final EmployeeRepository employeeRepository;

    public WorkstationService(WorkstationRepository workstationRepository, EmployeeRepository employeeRepository) {
        this.workstationRepository = workstationRepository;
        this.employeeRepository = employeeRepository;
    }


    public Optional<Employee>resolveByIp(String ipAddress){
        if(ipAddress == null){
            return Optional.empty();
        }
        return workstationRepository.findById(ipAddress.trim()).flatMap(ws -> employeeRepository.findById(ws.getEmployeeCode()));
    }
}
