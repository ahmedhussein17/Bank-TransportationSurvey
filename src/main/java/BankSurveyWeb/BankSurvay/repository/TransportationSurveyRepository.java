package BankSurveyWeb.BankSurvay.repository;

import BankSurveyWeb.BankSurvay.model.TransportationSurvey;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransportationSurveyRepository extends JpaRepository<TransportationSurvey, Long> {
    Optional<TransportationSurvey> findByEmployeeCode(String employeeCode);

}
