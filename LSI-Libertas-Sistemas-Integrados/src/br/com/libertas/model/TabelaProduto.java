package br.com.libertas.model;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.libertas.db.ProdutoDao;
import br.com.libertas.dto.Produto;

/**
 * Servlet implementation class TabelaProduto
 */
@WebServlet("/TabelaProduto")
public class TabelaProduto extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TabelaProduto() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ProdutoDao pdao = new ProdutoDao();
		String saidaTabela = "";
		Gson gson = new Gson();
		
		for (Produto p: pdao.listarProduto()) {
		saidaTabela = saidaTabela + "<tr>\n";
		saidaTabela = saidaTabela + "	<td>" + p.getCodigo() + "</td>\n";
		saidaTabela = saidaTabela + "	<td>" + p.getDescricao() + "</td>\n";
		saidaTabela = saidaTabela + "	<td>" + p.getPreco_custo() + "</td>\n";
		saidaTabela = saidaTabela + "	<td>" + p.getPreco_venda() + "</td>\n";
		saidaTabela = saidaTabela + "	<td>" + p.getCategoria() + "</td>\n";
		saidaTabela = saidaTabela + "	<td>" + p.getCod_fornecedor() + "</td>\n";
		saidaTabela = saidaTabela + "</tr>\n";
		}
		
		PrintWriter out = response.getWriter();
		String res = gson.toJson(saidaTabela);
		out.print(res);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
