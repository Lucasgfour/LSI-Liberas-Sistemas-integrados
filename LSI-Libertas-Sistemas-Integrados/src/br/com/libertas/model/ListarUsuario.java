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
import br.com.libertas.db.UsuarioDao;
import br.com.libertas.dto.Usuario;

/**
 * Servlet implementation class ListarUsuario
 */
@WebServlet("/ListarUsuario")
public class ListarUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ListarUsuario() {
        super();
        // TODO Auto-generated constructor stub
    }

    public void executar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException  {
    	UsuarioDao uDao = new UsuarioDao();
    	PrintWriter pw = response.getWriter();
		Gson gson = new Gson();
    	pw.print(gson.toJson(uDao.listarUsuario()));
    }

}
