package br.com.libertas.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedList;

import br.com.libertas.dto.Produto;


public class ProdutoDao {
	private static LinkedList<Produto> lista = new LinkedList<Produto>();
	// Inserir um novo produto
	public void inserirProduto (Produto p) {
		Conexao con = new Conexao();
		try {
			String sql = "INSERT INTO cad_produto "
					+ "(codigo, descricao, preco_custo, preco_venda, categoria, cod_fornecedor)"
					+ "VALUES  (?, ?, ?, ?, ?, ?)";
			PreparedStatement prep = con.getConexao().prepareStatement(sql);
			prep.setString(1, p.getCodigo());
			prep.setString(2, p.getDescricao());
			prep.setDouble(3, p.getPreco_custo());
			prep.setDouble(4, p.getPreco_venda());
			prep.setInt(5, p.getCategoria());
			prep.setInt(6, p.getCod_fornecedor());
			prep.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconecta();
	}
	
	// Inserir um produto com retorno !
	public String inserirProdutoAjax (Produto p) {
		Conexao con = new Conexao();
		String saida = "Sem Retorno !";
		try {
			String sql = "INSERT INTO cad_produto "
					+ "(codigo, descricao, preco_custo, preco_venda, categoria, cod_fornecedor)"
					+ "VALUES  (?, ?, ?, ?, ?, ?)";
			PreparedStatement prep = con.getConexao().prepareStatement(sql);
			prep.setString(1, p.getCodigo());
			prep.setString(2, p.getDescricao());
			prep.setDouble(3, p.getPreco_custo());
			prep.setDouble(4, p.getPreco_venda());
			prep.setInt(5, p.getCategoria());
			prep.setInt(6, p.getCod_fornecedor());
			if(prep.execute()) {
				saida = "Produto cadastrado com sucesso !"; 
			} else {
				saida = "Não foi possivel cadastro o produto, favor verificar os dados !";
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			saida = "Não foi possivel cadastrar o produto, motivo : " + e.getStackTrace().toString();
		}
		con.desconecta();
		return saida;
	}
	
	// Excluir um produto
	public void excluirProduto (int id) {
		Conexao con = new Conexao();
		try {
			String sql = "DELETE FROM cad_produto WHERE id = ?";
			PreparedStatement prep = con.getConexao().prepareStatement(sql);
			prep.setInt(1, id);
			prep.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconecta();
	}
	
	// Alterar um produto
	public void alterarProduto (Produto p) {
		Conexao con = new Conexao();
		try {
			String sql = "UPDATE cad_produto SET codigo=?, descricao=?, preco_custo=?, preco_venda=?, categoria=?, cod_fornecedor=?"
					+ "WHERE id=?";
			PreparedStatement prep = con.getConexao().prepareStatement(sql);
			prep.setString(1, p.getCodigo());
			prep.setString(2, p.getDescricao());
			prep.setDouble(3, p.getPreco_custo());
			prep.setDouble(4, p.getPreco_venda());
			prep.setInt(5, p.getCategoria());
			prep.setInt(6, p.getCod_fornecedor());
			prep.setInt(7, p.getId());
			prep.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconecta();
	}
	
	// Consultar produto 
	public Produto consutarProduto (int id) {
		Produto p = new Produto();
		Conexao con = new Conexao();
		try {
			String sql = "SELECT * FROM cad_produto WHERE id = " + id;
			Statement sta = con.getConexao().createStatement();
			ResultSet res = sta.executeQuery(sql);
			if(res.next()) {
				p.setCodigo(res.getString("codigo"));
				p.setDescricao(res.getString("descricao"));
				p.setPreco_custo(res.getDouble("preco_custo"));
				p.setPreco_venda(res.getDouble("preco_venda"));
				p.setCategoria(res.getInt("categoria"));
				p.setCod_fornecedor(res.getInt("cod_fornecedor"));
				p.setId(res.getInt("id"));
			}
			res.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconecta();
		return p;
	}
	
	public LinkedList<Produto> listarProduto () {
		
		Conexao con = new Conexao();

		LinkedList<Produto> lista = new LinkedList<Produto>();
		try {
			String sql = "SELECT * FROM cad_produto";
			Statement sta = con.getConexao().createStatement();
			ResultSet res = sta.executeQuery(sql);
			while(res.next()) {
				Produto p = new Produto();
				p.setCodigo(res.getString("codigo"));
				p.setDescricao(res.getString("descricao"));
				p.setPreco_custo(res.getDouble("preco_custo"));
				p.setPreco_venda(res.getDouble("preco_venda"));
				p.setCategoria(res.getInt("categoria"));
				p.setCod_fornecedor(res.getInt("cod_fornecedor"));
				p.setId(res.getInt("id"));
				lista.add(p);
			}
			res.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconecta();
		return lista;
	}
	// Listar todos os produtos cadastrados no bd
	public LinkedList<Produto> listar(){
		Conexao con = new Conexao();
		LinkedList<Produto> lista = new LinkedList<Produto>();
		try {
			String sql = "SELECT * FROM cad_produto";
			Statement instrucao = con.getConexao().createStatement();
			ResultSet res = instrucao.executeQuery(sql);
			while (res.next()) {
				Produto p = new Produto();
				p.setCodigo(res.getString("codigo"));
				p.setDescricao(res.getString("descricao"));
				p.setPreco_custo(res.getDouble("preco_custo"));
				p.setPreco_venda(res.getDouble("preco_venda"));
				p.setCategoria(res.getInt("categoria"));
				p.setCod_fornecedor(res.getInt("cod_fornecedor"));
				p.setId(res.getInt("id"));
				lista.add(p);
			}
			res.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconecta();
		
		return lista;
	}
	
	

}
