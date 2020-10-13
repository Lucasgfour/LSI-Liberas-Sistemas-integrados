<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="br.com.libertas.dto.*" %> 
<%@ page import="br.com.libertas.db.*" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<%
			
			Produto p = new Produto();
			p.setCodigo( request.getParameter("codigo") );
			p.setDescricao( request.getParameter("descricao") );
			p.setPreco_custo( Double.parseDouble(request.getParameter("preco_custo")) );
			p.setPreco_venda(Double.parseDouble(request.getParameter("preco_venda")));
			p.setCategoria( Integer.parseInt(request.getParameter("categoria")) );
			p.setCod_fornecedor(Integer.parseInt(request.getParameter("cod_fornecedor")));
			ProdutoDao pdao = new ProdutoDao();
			pdao.inserirProduto(p);
			
			response.sendRedirect("index.jsp");
		%>
</body>
</html>