package beans;

import java.sql.Date;

public class Renta {
    
    private int id;
    private String username;
    private Date fechaRenta;
    private boolean novedad;
    private String modelo;
    private String marca;
            
            
    public Renta(int id, String username, Date fechaRenta, boolean novedad, String modelo) {
        this.id = id;
        this.username = username;
        this.fechaRenta = fechaRenta;
        this.novedad = novedad;
        this.modelo = modelo;
    }

    public Renta(int id, Date fechaRenta, boolean novedad, String modelo, String marca) {
        this.id = id;
        this.fechaRenta = fechaRenta;
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

    public Date getFechaRenta() {
        return fechaRenta;
    }

    public void setFechaRneta(Date fechaRenta) {
        this.fechaRenta = fechaRenta;
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
        return "Renta{" + "id=" + id + ", username=" + username + ", fechaRenta=" + fechaRenta + ", novedad=" + novedad + ", modelo=" + modelo + '}';
    }
    
        
}

