package BankSurveyWeb.BankSurvay.service;

import org.springframework.stereotype.Service;
import BankSurveyWeb.BankSurvay.repository.EmployeeRepository;
import BankSurveyWeb.BankSurvay.model.Employee;

import java.util.Optional;

@Service
public class EmployeeService {
    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }


    public Optional<Employee> verify(String employeeCode, String employeeName, String requiredRole){
        if(employeeCode == null || employeeName == null || requiredRole == null ) return Optional.empty();
        return repository.findById(employeeCode.trim())
                .filter(emp -> emp.getEmployeeName().trim().equalsIgnoreCase(employeeName.trim()))
                .filter(emp -> emp.getRole().trim().equalsIgnoreCase(requiredRole.trim()));

    }

    public Optional<Employee> verifyAny(String employeeCode, String employeeName){
        if(employeeCode == null || employeeName == null){
            return Optional.empty();
        }
        return repository.findById(employeeCode.trim()).filter(emp -> emp.getEmployeeName().trim().equalsIgnoreCase(employeeName.trim()));
    }
}

