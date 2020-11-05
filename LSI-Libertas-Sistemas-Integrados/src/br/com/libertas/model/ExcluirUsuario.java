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
 * Servlet implementation class ExcluirUsuario
 */
@WebServlet("/ExcluirUsuario")
public class ExcluirUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ExcluirUsuario() {
        super();
        // TODO Auto-generated constructor stub
    }

    protected void executar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		UsuarioDao uDao = new UsuarioDao();
		Gson gson = new Gson();
		
		PrintWriter out = response.getWriter();
		String res = gson.toJson(uDao.excluirUsuario(Integer.parseInt(request.getParameter("id"))));
		out.print(res);
	}
}
