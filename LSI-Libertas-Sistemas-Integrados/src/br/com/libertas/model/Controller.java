package br.com.libertas.model;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class Controller
 */
@WebServlet("/Controller")
public class Controller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Controller() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			String funcao = request.getParameter("function");
			if(funcao.equals("TabelaProduto")) { // Listar Produtos
				TabelaProduto tProduto = new TabelaProduto();
				tProduto.executar(request, response);
			} else if (funcao.equals("CadastroProduto")) { // Cadastrar Produto
				CadastroProduto cProduto = new CadastroProduto();
				cProduto.executar(request, response);
			} else if (funcao.equals("ExcluirProduto")) { // Excluir Produto
				ExcluirProduto dProduto = new ExcluirProduto();
				dProduto.executar(request, response);
			} else if (funcao.equals("UpdateProduto")) { // Alterar Produto
				UpdateProduto uProduto = new UpdateProduto();
				uProduto.executar(request, response);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
