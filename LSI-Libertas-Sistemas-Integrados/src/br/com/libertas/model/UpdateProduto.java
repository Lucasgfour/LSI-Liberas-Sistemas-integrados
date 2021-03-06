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
 * Servlet implementation class UpdateProduto
 */
@WebServlet("/UpdateProduto")
public class UpdateProduto extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateProduto() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    public void executar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	ProdutoDao pDao = new ProdutoDao();
		Produto p = new Produto();
		Gson gson = new Gson();
		
		p.setCodigo(request.getParameter("codigo"));
		p.setDescricao(request.getParameter("descricao"));
		p.setPreco_custo(Double.parseDouble(request.getParameter("preco_custo")));
		p.setPreco_venda(Double.parseDouble(request.getParameter("preco_venda")));
		p.setCategoria(Integer.parseInt(request.getParameter("categoria")));;
		p.setCod_fornecedor(Integer.parseInt(request.getParameter("cod_fornecedor")));
		p.setQuantidade(Integer.parseInt(request.getParameter("quantidade")));
		p.setId(Integer.parseInt(request.getParameter("id")));
		
		PrintWriter out = response.getWriter();
		String res = gson.toJson(pDao.alterarProduto(p));
		out.print(res);
    }

//	/**
//	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// TODO Auto-generated method stub
//		ProdutoDao pDao = new ProdutoDao();
//		Produto p = new Produto();
//		Gson gson = new Gson();
//		
//		p.setCodigo(request.getParameter("codigo"));
//		p.setDescricao(request.getParameter("descricao"));
//		p.setPreco_custo(Double.parseDouble(request.getParameter("preco_custo")));
//		p.setPreco_venda(Double.parseDouble(request.getParameter("preco_venda")));
//		p.setCategoria(Integer.parseInt(request.getParameter("categoria")));;
//		p.setCod_fornecedor(Integer.parseInt(request.getParameter("cod_fornecedor")));
//		p.setQuantidade(Integer.parseInt(request.getParameter("quantidade")));
//		p.setId(Integer.parseInt(request.getParameter("id")));
//		
//		PrintWriter out = response.getWriter();
//		String res = gson.toJson(pDao.alterarProduto(p));
//		out.print(res);
//	}
//
//	/**
//	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// TODO Auto-generated method stub
//		doGet(request, response);
//	}

}
