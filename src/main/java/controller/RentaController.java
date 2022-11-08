/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import beans.Renta;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import java.util.List;

import com.google.gson.Gson;

import connection.DBConnection;

public class RentaController implements IRentaController {

   

    @Override
    public String listarRentas(String username) {
        Gson gson = new Gson();

        DBConnection con = new DBConnection();

        String sql = "Select l.id, l.marca, l.modelo, l.novedad, a.fecha from vehiculos l "
                + "inner join renta a on l.id = a.id inner join usuarios u on a.username = u.username "
                + "where a.username = '" + username + "'";

        List<String> rentas = new ArrayList<String>();

        try {

            Statement st = con.getConnection().createStatement();
            ResultSet rs = st.executeQuery(sql);

            while (rs.next()) {
                int id = rs.getInt("id");
                String marca = rs.getString("marca");
                String modelo = rs.getString("modelo");
                boolean novedad = rs.getBoolean("novedad");
                Date fechaRenta = rs.getDate("fecha");

                Renta renta = new Renta(id, fechaRenta, novedad, modelo, marca);

                rentas.add(gson.toJson(renta));
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        } finally {
            con.desconectar();
        }
        return gson.toJson(rentas);
    }
    
}
