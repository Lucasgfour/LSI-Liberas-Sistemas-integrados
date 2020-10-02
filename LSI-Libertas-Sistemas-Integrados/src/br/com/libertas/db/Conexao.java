package br.com.libertas.db;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexao {

	private Connection conexao;
	
	public Conexao() {
		try {
			
			//String url = "jdbc:mysql://localhost:3306/bdlsi";
			//conexao = DriverManager.getConnection(url, "admin", "lsi2020");
			Class.forName("org.mariadb.jdbc.Driver");
			String url = "jdbc:mariadb://localhost/bdlsi";
			conexao = DriverManager.getConnection(url, "root", "123456");
		} 
		
		catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void desconecta() {
		try {
			conexao.close();
		} 
		
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public Connection getConexao() {
		return conexao;
	}

	public void setConexao(Connection conexao) {
		this.conexao = conexao;
	}
	
}

