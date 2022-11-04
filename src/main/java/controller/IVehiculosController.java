/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package controller;

/**
 *
 * @author Maria Jose
 */
public interface IVehiculosController {
    
    public String listar(boolean ordenar, String orden);

    public String renta(int id, String username);

    public String modificar(int id);

    public String devolver(int id, String username);

    public String sumarCantidad(int id);
}
