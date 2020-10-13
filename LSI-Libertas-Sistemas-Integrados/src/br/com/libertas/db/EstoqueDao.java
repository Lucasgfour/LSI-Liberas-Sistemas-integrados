package br.com.libertas.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedList;

import br.com.libertas.dto.Estoque;
import br.com.libertas.dto.Produto;
import jdk.jfr.Description;

public class EstoqueDao {
	
	/** @author Thulio Barbosa de Paula Martins
	 *  @date 07-10-2020
	 *  @Descripition Responsavel por realizar a inserção um novo registro
	 *  @param Estoque e
	 */ 
	public void inserir(Estoque e) {
		
		Conexao conexao = new Conexao();
		
		try {
			
			String sql = "INSERT INTO estoque (id, produto, quantidade) " +
						 	" VALUES (?, ?) ";
					
			PreparedStatement prep = conexao.getConexao().prepareStatement(sql);
			prep.setInt(1, e.getProduto());
			prep.setInt(2, e.getQuantidade());
			prep.execute();
			
		} 
		catch (Exception e1) {
			e1.printStackTrace();
		}
		
		conexao.desconecta();
		
	}
	
	/** @author Thulio Barbosa de Paula Martins
	 *  @date 07-10-2020
	 *  @Descripition Responsavel por realizar a exclusão de um registro
	 *  @param int id 
 	 */ 
	public void excluir(int id) {
		
		Conexao conexao = new Conexao();
		
		try {
			
			String sql = " DELETE FROM estoque WHERE id = ?";
			
			PreparedStatement prep = conexao.getConexao().prepareStatement(sql);
			prep.setInt(1, id);
			prep.execute();
			
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		
		conexao.desconecta();
		
	}
	
	/** @author Thulio Barbosa de Paula Martins
	 *  @date 07-10-2020
	 *  @Descripition Responsavel por realizar a alteração de um registro
	 *  @param Estoque e
	 */ 
	public void alterar(Estoque e) {
		
		Conexao conexao = new Conexao();
		
		try {
			
			String sql = " UPDATE estoque SET produto = ?, quantidade = ? WHERE id = ?";
			
			PreparedStatement prep = conexao.getConexao().prepareStatement(sql);
			prep.setInt(1, e.getProduto());
			prep.setInt(2, e.getQuantidade());
			prep.setInt(3, e.getId());
			prep.execute();
			
		} 
		catch (Exception e1) {
			e1.printStackTrace();
		}
		
		conexao.desconecta();
		
	}
	
	/** @author Thulio Barbosa de Paula Martins
	 *  @date 07-10-2020
	 *  @Descripition Responsavel por realizar consulta de um registro
	 *  @param int id
	 *  @return e
	 */ 
	public Estoque consultar (int id) {
		
		Estoque e = new Estoque();
		Conexao con = new Conexao();
		
		try {
			
			String sql = "SELECT * FROM estoque WHERE id = " + id;
			
			Statement sta = con.getConexao().createStatement();
			ResultSet res = sta.executeQuery(sql);
			
			if(res.next()) {
				e.setProduto(res.getInt("produto"));
				e.setQuantidade(res.getInt("quantidade"));
				e.setId(res.getInt("id"));
			}
			
			res.close();
			
		} 
		catch (Exception e1) {
			e1.printStackTrace();
		}
		
		con.desconecta();
		
		return e;
	}
	
	/** @author Thulio Barbosa de Paula Martins
	 *  @date 07-10-2020
	 *  @Descripition Responsavel por listar todos registros
	 *  @return dados
	 */ 
	public LinkedList<Estoque> listar(){
		
		Conexao con = new Conexao();
		LinkedList<Estoque> dados = new LinkedList<Estoque>();
		
		try {
			
			String sql = "SELECT * FROM estoque";
			
			Statement instrucao = con.getConexao().createStatement();
			ResultSet res = instrucao.executeQuery(sql);
			
			while (res.next()) {
				
				Estoque e = new Estoque();
				e.setProduto(res.getInt("produto"));
				e.setQuantidade(res.getInt("quantidade"));
				e.setId(res.getInt("id"));
				
				dados.add(e);
			}
			
			res.close();
			
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		
		con.desconecta();
		
		return dados;
	}
	
	

}
