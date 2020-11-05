package br.com.libertas.model;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.libertas.db.UsuarioDao;
import br.com.libertas.dto.Usuario;

/**
 * Servlet implementation class CadastroUsuario
 */
@WebServlet("/CadastroUsuario")
public class CadastroUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CadastroUsuario() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void executar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		UsuarioDao uDao = new UsuarioDao();
		Usuario u = new Usuario();
		Gson gson = new Gson();
		
		u.setNome(request.getParameter("nome"));
		u.setLogin(request.getParameter("login"));
		u.setSenha(request.getParameter("senha"));
		u.setAdministrador(Boolean.parseBoolean(request.getParameter("administrador")));
		
		PrintWriter out = response.getWriter();
		String res = gson.toJson(uDao.inserirUsuario(u));
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
