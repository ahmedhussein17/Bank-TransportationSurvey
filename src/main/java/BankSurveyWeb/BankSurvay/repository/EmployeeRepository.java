package BankSurveyWeb.BankSurvay.repository;

import BankSurveyWeb.BankSurvay.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    
}
