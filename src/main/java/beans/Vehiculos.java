
package beans;

public class Vehiculos {
    private int id;
    private String marca;
    private String modelo;
    private String anio;
    private int disponibles;
    private boolean novedad;

    public Vehiculos(int id, String marca, String modelo, String anio, int disponibles, boolean novedad) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.disponibles = disponibles;
        this.novedad = novedad;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getAnio() {
        return anio;
    }

    public void setAnio(String anio) {
        this.anio = anio;
    }

    public int getDisponibles() {
        return disponibles;
    }

    public void setDisponibles(int disponibles) {
        this.disponibles = disponibles;
    }

    public boolean isNovedad() {
        return novedad;
    }

    public void setNovedad(boolean novedad) {
        this.novedad = novedad;
    }

    @Override
    public String toString() {
        return "Vehiculos{" + "id=" + id + ", marca=" + marca + ", modelo=" + modelo 
                + ", anio=" + anio + ", disponibles=" + disponibles + ", novedad=" + novedad + '}';
    }

   
}
