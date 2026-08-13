package BankSurveyWeb.BankSurvay.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import BankSurveyWeb.BankSurvay.model.Workstation;

public interface WorkstationRepository extends JpaRepository<Workstation, String> {
    
}
