/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package beans;

import java.sql.Date;

/**
 *
 * @author Maria Jose
 */
public class renta {
    
    private int id;
    private String username;
    private Date fechaAlquiler;
    private boolean novedad;
    private String modelo;
    private String marca;

    public renta(int id, String username, Date fechaAlquiler, boolean novedad, String modelo) {
        this.id = id;
        this.username = username;
        this.fechaAlquiler = fechaAlquiler;
        this.novedad = novedad;
        this.modelo = modelo;  
    }

    public renta(int id, Date fechaAlquiler, boolean novedad, String modelo, String marca) {
        this.id = id;
        this.fechaAlquiler = fechaAlquiler;
        this.novedad = novedad;
        this.modelo = modelo;
        this.marca = marca;
    }
    
    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getFechaAlquiler() {
        return fechaAlquiler;
    }

    public void setFechaAlquiler(Date fechaAlquiler) {
        this.fechaAlquiler = fechaAlquiler;
    }

    public boolean isNovedad() {
        return novedad;
    }

    public void setNovedad(boolean novedad) {
        this.novedad = novedad;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    @Override
    public String toString() {
        return "renta{" + "id=" + id + ", username=" + username + ", fechaAlquiler=" + fechaAlquiler + ", novedad=" + novedad + ", modelo=" + modelo + '}';
    }
 
}
