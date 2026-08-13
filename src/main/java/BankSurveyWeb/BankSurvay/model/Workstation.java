package BankSurveyWeb.BankSurvay.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Workstation {
    
    @Id
    @Column(unique = true, nullable = false)
    private String ipAddress;

    @Column(nullable = false)
    private String employeeCode;

    public Workstation(){
    }

    public Workstation(String ipAddress, String employeeCode) {
        this.ipAddress = ipAddress;
        this.employeeCode = employeeCode;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    
}
