package BankSurveyWeb.BankSurvay.dto;

import jakarta.validation.constraints.NotBlank;

public class TransportationSurveyRequest {


    private String employeeCode; //set server-side from requesting IP
    private String employeeName; //set server-side from requesting IP

    @NotBlank(message = "Governorate is required")
    private String governorate;

    @NotBlank(message = "Area is required")
    private String area;

    @NotBlank(message = "Street is required")
    private String street;

    @NotBlank(message = "Pickup point is required")
    private String pickupPoint;

    @NotBlank(message = "Trip time is required")
    private String tripTime;

    @NotBlank(message = "Monthly cost is required")
    private String monthlyCost;

    @NotBlank(message = "Transport method is required")
    private String transportMethod;

    @NotBlank(message = "Bank transport answer is required")
    private String bankTransport;

    @NotBlank(message = "Carpooling answer is required")
    private String carpooling;

    // dol el optional fields
    private String challenges;
    private String suggestions;
    private String comments;


    public String getEmployeeCode() {
        return employeeCode;
    }
    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }
    public String getEmployeeName() {
        return employeeName;
    }
    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
    public String getGovernorate() {
        return governorate;
    }
    public void setGovernorate(String governorate) {
        this.governorate = governorate;
    }
    public String getArea() {
        return area;
    }
    public void setArea(String area) {
        this.area = area;
    }
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }
    public String getTripTime() {
        return tripTime;
    }
    public void setTripTime(String tripTime) {
        this.tripTime = tripTime;
    }
    public String getMonthlyCost() {
        return monthlyCost;
    }
    public void setMonthlyCost(String monthlyCost) {
        this.monthlyCost = monthlyCost;
    }
    public String getTransportMethod() {
        return transportMethod;
    }
    public void setTransportMethod(String transportMethod) {
        this.transportMethod = transportMethod;
    }
    public String getBankTransport() {
        return bankTransport;
    }
    public void setBankTransport(String bankTransport) {
        this.bankTransport = bankTransport;
    }
    public String getCarpooling() {
        return carpooling;
    }
    public void setCarpooling(String carpooling) {
        this.carpooling = carpooling;
    }
    public String getChallenges() {
        return challenges;
    }
    public void setChallenges(String challenges) {
        this.challenges = challenges;
    }
    public String getSuggestions() {
        return suggestions;
    }
    public void setSuggestions(String suggestions) {
        this.suggestions = suggestions;
    }
    public String getComments() {
        return comments;
    }
    public void setComments(String comments) {
        this.comments = comments;
    }
    public String getPickupPoint() {
        return pickupPoint;
    }
    public void setPickupPoint(String pickupPoint) {
        this.pickupPoint = pickupPoint;
    }
    
}