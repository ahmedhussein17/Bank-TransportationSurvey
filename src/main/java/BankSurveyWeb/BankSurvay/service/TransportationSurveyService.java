package BankSurveyWeb.BankSurvay.service;

import BankSurveyWeb.BankSurvay.dto.TransportationSurveyRequest;
import BankSurveyWeb.BankSurvay.model.TransportationSurvey;
import BankSurveyWeb.BankSurvay.repository.TransportationSurveyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class TransportationSurveyService {
    private final TransportationSurveyRepository repository;

    public TransportationSurveyService(TransportationSurveyRepository repository){
        this.repository = repository;
    }

    public TransportationSurvey saveSurvey(TransportationSurvey survey){
        Optional<TransportationSurvey> existing = repository.findByEmployeeCode(survey.getEmployeeCode());
        existing.ifPresent(e -> survey.setId(e.getId()));
        return repository.save(survey);
    }

    public TransportationSurvey saveFromRequest(TransportationSurveyRequest request) {
        TransportationSurvey survey = repository.findByEmployeeCode(request.getEmployeeCode())
                .orElse(new TransportationSurvey());

        survey.setEmployeeCode(request.getEmployeeCode());
        survey.setEmployeeName(request.getEmployeeName());
        survey.setGovernorate(request.getGovernorate());
        survey.setArea(request.getArea());
        survey.setStreet(request.getStreet());
        survey.setPickupPoint(request.getPickupPoint());
        survey.setTripTime(request.getTripTime());
        survey.setMonthlyCost(request.getMonthlyCost());
        survey.setTransportMethod(request.getTransportMethod());
        survey.setBankTransport(request.getBankTransport());
        survey.setCarpooling(request.getCarpooling());
        survey.setChallenges(request.getChallenges());
        survey.setSuggestions(request.getSuggestions());
        survey.setComments(request.getComments());

        return repository.save(survey);
    }

    public Optional<TransportationSurvey> getByEmployeeCode(String employeeCode){
        return repository.findByEmployeeCode(employeeCode);
    }

    public List<TransportationSurvey> getAllSurveys(){
        return repository.findAll();
    }
}