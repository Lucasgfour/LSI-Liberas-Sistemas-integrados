<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="br.com.libertas.dto.*" %> 
<%@ page import="br.com.libertas.db.*" %> 
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Security-Policy" content="default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: gap: content:">
  <meta http-equiv="Content-Language" content="pt-br">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="theme-color" content="#2196f3">
  <meta name="format-detection" content="telephone=no">
  <meta name="msapplication-tap-highlight" content="no">
  <title>Administrativo</title>

  <link rel="stylesheet" href="framework7/css/framework7.bundle.min.css">
  <link rel="stylesheet" href="css/icons.css">
  <link rel="stylesheet" href="css/all.min.css">
  <link rel="stylesheet" href="css/jquery.dataTables.min.css">
  <link rel="stylesheet" href="css/responsive.dataTables.min.css">
  <link rel="stylesheet" href="css/froala_editor.pkgd.min.css">
  <link rel="stylesheet" href="css/iziModal.min.css">
  <link rel="stylesheet" href="css/print.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" href="img/brasao.png">

</head>
<body>
  <div id="app" class="tabs">
    <div class="statusbar"></div>
    <!-- Login ------------------------------------------------------------------------------------------------------------------------->
      <div class="view view-login tab fadeIn ">
        <div class="page" data-name="login" id="login">
          <div class="page-content login-screen-content">
            <div class="logo"></div>
            <form class="list">
              <ul>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">UsuÃ¡rio</div>
                    <div class="item-input-wrap">
                      <input type="text" name="email" placeholder="UsuÃ¡rio" autocomplete="off" required>
                    </div>
                  </div>
                </li>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Senha</div>
                    <div class="item-input-wrap">
                      <input type="password" name="senha" placeholder="Senha" required>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
            <div class="row">
              <button class="col button button-fill button-round">Entrar</button>
            </div>
          </div>
        </div>
      </div>
    <!---------------------------------------------------------------------------------------------------------------------------------->
    <!-- Principal --------------------------------------------------------------------------------------------------------------------->
      <div class="view view-principal tab fadeIn tab-active">
        <!-- Panel-left ---------------------------------------------------------------------------------------------------------------->
          <div class="panel panel-left panel-cover elevation-3">
            <div class="page">
              <div class="page-content">
                <div class="elevation-3" onclick="LoadPage('principal')">
                  <div class="titulo">Administrativo</div>
                  <div class="boas-vindas">Bem vindo(a)</div>
                  <img class="logo elevation-2" src="img/brasao.png">
                  <div class="nome-razao">Administrador</div>
                </div>
                <div class="list links-list">
                  <ul>
                    <li>
                      <a href="#" class="item-content" onclick="LoadPage('tela_produtos')" id="menu_produtos">
                        <!-- <div class="item-media"><i class="far fa-sticky-note"></i></div> -->
                        <div class="item-inner">
                          <div class="item-title">Produtos</div>
                        </div>
                      </a>
                    </li>
                    <li class="elevation-5">
                      <a href="#" class="item-content" onclick="document.location.reload()">
                        <div class="item-media"><i class="fas fa-sign-out-alt"></i></div>
                        <div class="item-inner">
                          <div class="item-title">Sair</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        <!------------------------------------------------------------------------------------------------------------------------------>
        <!-- Principal ----------------------------------------------------------------------------------------------------------------->
          <div class="page" data-name="principal" id="principal">
            <div class="navbar">
              <div class="navbar-inner sliding">
                <div class="left">
                  <a href="#" class="link icon-only panel-open" data-panel="left">
                    <i class="icon material-icons md-only">menu</i>
                  </a>
                </div>
                <div class="title">Home</div>
              </div>
            </div>
            <div class="page-content">

            </div>
          </div>
        <!------------------------------------------------------------------------------------------------------------------------------>
        <!-- NotÃ­cias ------------------------------------------------------------------------------------------------------------------>
          <div class="page" data-name="tela_produtos" id="tela_produtos">
            <div class="navbar">
              <div class="navbar-inner">
                <div class="left">
                  <a href="#" class="link icon-only panel-open" data-panel="left">
                    <i class="icon material-icons md-only">menu</i>
                  </a>
                </div>
                <div class="title sliding">Produtos</div>
                <div class="right">
                  <!-- <a href="#" class="link icon-only panel-open" data-panel="right">
                    <i class="fas fa-lg fa-store"></i>
                  </a> -->
                </div>
              </div>
            </div>
            <div class="toolbar toolbar-top tabbar">
              <div class="toolbar-inner">
                <a href="#produto-listar" class="tab-link tab-link-active">Listar</a>
                <a href="#produto-cadastrar" class="tab-link">Cadastrar</a>
              </div>
            </div>
            <div class="tabs">
              <div id="produto-listar" class="page-content tab tab-active">
                <div class="block">
                  <div class="card">
                    <div class="card-content card-content-padding ">
                      <table id="table_produtos" class="display dataTable collapsed">
                        <thead>
                          <tr>
                            <th>CÃ³digo</th>
                            <th>DescriÃ§Ã£o</th>
                            <th>PreÃ§o Custo</th>
                            <th>PreÃ§o Venda</th>
                            <th>Categoria</th>
                            <th>Fornecedor</th>
                          </tr>
                        </thead>
                        <tbody>
                        	<%
								ProdutoDao pdao = new ProdutoDao();
								for (Produto p: pdao.listarProduto()) {
							%>
								<tr>
									<td><%= p.getCodigo() %></td>
									<td><%= p.getDescricao() %></td>
									<td><%= p.getPreco_custo() %></td>
									<td><%= p.getPreco_venda() %></td>
									<td><%= p.getCategoria() %></td>
									<td><%= p.getCod_fornecedor() %></td>
								</tr>
							<% 
								}
							%>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div id="produto-cadastrar" class="page-content tab">
                <!-- <div class="block row">
                  <button class="col button button-fill button-round">Nova NotÃ­cia</button>
                  <button class="col button button-fill button-round">Salvar NotÃ­cia</button>
                  <button class="col button button-fill button-round color-orange">NotÃ­cia Desativada</button>
                </div> -->
                <form class="list no-hairlines-md" action="salvar.jsp" method="post">
                  <!-- <input type="hidden" name="idnoticia_informacao"> -->
                  <ul class="row no-gap">
                    <!-- <li class="item-content item-input col-25">
                      <div class="item-inner">
                        <div class="item-title item-label">Data</div>
                        <div class="item-input-wrap">
                          <input type="date" placeholder="Data" name="data" required>
                        </div>
                      </div>
                    </li>
                    <li class="item-content item-input col-25">
                      <div class="item-inner">
                        <div class="item-title item-label">Hora</div>
                        <div class="item-input-wrap">
                          <input type="time" placeholder="Hora" name="hora" required>
                        </div>
                      </div>
                    </li> -->
                    <li class="item-content item-input col-50">
                      <div class="item-inner">
                        <div class="item-title item-label">CÃ³digo</div>
                        <div class="item-input-wrap">
                          <input type="text" placeholder="CÃ³digo" name="codigo" required>
                        </div>
                      </div>
                    </li>
                    <li class="item-content item-input col-50">
                      <div class="item-inner">
                        <div class="item-title item-label">DescriÃ§Ã£o</div>
                        <div class="item-input-wrap">
                          <input type="text" placeholder="DescriÃ§Ã£o" name="descricao" required>
                        </div>
                      </div>
                    </li>
                    <li class="item-content item-input col-50">
                      <div class="item-inner">
                        <div class="item-title item-label">PreÃ§o Compra</div>
                        <div class="item-input-wrap">
                          <input type="number" step="any" placeholder="PreÃ§o Compra" name="preco_custo" required>
                        </div>
                      </div>
                    </li>
                    <li class="item-content item-input col-50">
                      <div class="item-inner">
                        <div class="item-title item-label">PreÃ§o Venda</div>
                        <div class="item-input-wrap">
                          <input type="number" step="any" placeholder="PreÃ§o Venda" name="preco_venda" required>
                        </div>
                      </div>
                    </li>
                    <li class="item-content item-input col-50">
                      <div class="item-inner">
                        <div class="item-title item-label">Categoria</div>
                        <div class="item-input-wrap">
                          <input type="number" step="any" placeholder="Categoria" name="categoria" required>
                        </div>
                      </div>
                    </li>
                    <li class="item-content item-input col-50">
                      <div class="item-inner">
                        <div class="item-title item-label">Fornecedor</div>
                        <div class="item-input-wrap">
                          <input type="number" step="any" placeholder="Fornecedor" name="cod_fornecedor" required>
                        </div>
                      </div>
                    </li>
                   <!--   <li class="item-content item-input col-50">
                      <div class="item-inner">
                        <div class="item-title item-label">Fornecedor</div>
                        <div class="item-input-wrap input-dropdown-wrap">
                          <select placeholder="Escolha o fornecedor..." placeholder="Fornecedor" name="cod_fornecedor" required>
                            <option value="1">Fornecedor 1</option>
                            <option value="2">Fornecedor 2</option>
                          </select>-->
                          <!-- <input type="number" step="any" placeholder="PreÃ§o Venda" name="preco_venda" required> -->
                       <!--  </div>
                      </div>
                    </li> -->
                    <!-- <li class="item-content item-input col-100">
                      <div class="item-inner">
                        <div class="item-title block-title">DescriÃ§Ã£o</div>
                        <div class="item-input-wrap">
                          <textarea placeholder="DescriÃ§Ã£o" name="descricao" id="noticias_descricao" required></textarea>
                        </div>
                      </div>
                    </li> -->
                  </ul>
                  <div class="col-66"></div>
                  <div class="col-33">
                    <button class="col button button-small button-round button-fill" id="btnCadastrarProduto">Cadastrar</button>
                  </div>
                </form>
               <!-- <div class="block row"> -- >
                  <!-- <samp class="button button-fill button-round">
                    <label for="foto_capa"> Imagem Capa</label>
                    <input class="hidden" type="file" name="foto_capa" accept="image/*" id="foto_capa">
                  </samp> -->
                  <!-- <div class="col-66"></div>
                  <div class="col-33">
                    <button class="col button button-small button-round button-fill" id="btnCadastrarProduto">Cadastrar</button>
                  </div>
                </div> -->
                <!-- <div class="block row">
                  <samp class="button button-fill button-round">
                      <label for="fotos"> Imagens</label>
                    <input class="hidden" type="file" name="fotos" accept="image/*" id="fotos">
                  </samp>
                  <div class="col-100 elevation-3"></div>
                </div> -->
              </div>
            </div>
          </div>
        <!------------------------------------------------------------------------------------------------------------------------------>
        <!-- Modal Cardapio Produto ---------------------------------------------------------------------------------------------------->
          <div class="popup popup-downloads">
            <div class="page">
              <div class="navbar">
                <div class="navbar-inner">
                  <div class="title">Downloads</div>
                  <div class="right"><a href="#" class="link popup-close"><i class="material-icons ">close</i></a></div>
                </div>
              </div>
              <div class="page-content">
                <div class="card">
                  <div class="card-content card-content-padding ">
                    <table id="table_concurso_licitacao" class="display dataTable collapsed">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>CPF CNPJ</th>
                          <th>Estado</th>
                          <th>Cidade</th>
                          <th>Telefone</th>
                          <th>Data Hora</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <!------------------------------------------------------------------------------------------------------------------------------>
        <!-- Modal ManifestaÃ§Ã£o -------------------------------------------------------------------------------------------------------->
          <div class="hidden" id="modal_reclamacao">
            <div class="block">
              <form class="list no-hairlines-md">
                <ul class="row">
                  <input type="hidden" name="idmanifestacao">
                  <li class="item-content item-input col-100">
                    <div class="item-inner">
                      <div class="item-title item-label">Name</div>
                      <div class="item-input-wrap">
                        <input type="text" name="nome" placeholder="Nome" readonly>
                      </div>
                    </div>
                  </li>
                  <li class="item-content item-input col-100">
                    <div class="item-inner">
                      <div class="item-title item-label">E-mail</div>
                      <div class="item-input-wrap">
                        <input type="text" name="email" placeholder="E-mail" readonly>
                      </div>
                    </div>
                  </li>
                  <li class="item-content item-input col-50">
                    <div class="item-inner">
                      <div class="item-title item-label">Data Envio</div>
                      <div class="item-input-wrap">
                        <input type="date" name="data_insercao" readonly>
                      </div>
                    </div>
                  </li>
                  <li class="item-content item-input col-50">
                    <div class="item-inner">
                      <div class="item-title item-label">Data Resposta</div>
                      <div class="item-input-wrap">
                        <input type="date" name="data_resposta" required>
                      </div>
                    </div>
                  </li>
                  <li class="item-content item-input col-50">
                    <div class="item-inner">
                      <div class="item-title item-label">CÃ³digo</div>
                      <div class="item-input-wrap">
                        <input type="text" name="codigo" placeholder="CÃ³digo" readonly>
                      </div>
                    </div>
                  </li>
                  <li class="item-content item-input item-input-with-value col-50">
                    <div class="item-inner">
                      <div class="item-title item-label">Status</div>
                      <div class="item-input-wrap input-dropdown-wrap">
                        <select placeholder="Status" name="idmanifestacao_status" class="input-with-value" required>
                          <option value="1">Nova ManifestaÃ§Ã£o</option>
                          <option value="2">ManifestaÃ§Ã£o em Andamento</option>
                          <option value="3">ManifestaÃ§Ã£o Finalizada</option>
                        </select>
                      </div>
                    </div>
                  </li>
                  <li class="item-content item-input col-100">
                    <div class="item-inner">
                      <div class="item-title item-label">Titulo</div>
                      <div class="item-input-wrap">
                        <input type="text" name="titulo" placeholder="Titulo" readonly>
                      </div>
                    </div>
                  </li>
                  <li class="item-content item-input col-100">
                    <div class="item-inner">
                      <div class="item-title item-label">ManifestaÃ§Ã£o</div>
                      <div class="item-input-wrap">
                        <textarea name="manifestacao" placeholder="ManifestaÃ§Ã£o" readonly></textarea>
                      </div>
                    </div>
                  </li>
                  <li class="item-content item-input col-100">
                    <div class="item-inner">
                      <div class="item-title item-label">Resposta</div>
                      <div class="item-input-wrap">
                        <textarea name="manifestacao_resposta" placeholder="Resposta" required></textarea>
                      </div>
                    </div>
                  </li>
                </ul>
              </form>
            </div>
            <div class="fab fab-right-bottom">
              <a href="#" onclick="Reclamacoes.salvaManifestacao()"><i class="icon material-icons md-only">save</i>/a>
            </div>
          </div>
        <!------------------------------------------------------------------------------------------------------------------------------>
      </div>
    <!---------------------------------------------------------------------------------------------------------------------------------->    
  </div>
  <!-- Cordova -->
  <!--  <script src="cordova.js"></script>  -->
  <script src="framework7/js/framework7.bundle.min.js"></script>
  <script src="js/app/jquery.min.js"></script>
  <script src="js/app/jquery.mask.min.js"></script>
  <script src="js/app/jquery.dataTables.min.js"></script>
  <script src="js/app/dataTables.responsive.min.js"></script>
  <script src="js/app/dataTables.buttons.min.js"></script>
  <script src="js/app/buttons.flash.min.js"></script>
  <script src="js/app/jszip.min.js"></script>
  <script src="js/app/pdfmake.min.js"></script>
  <script src="js/app/vfs_fonts.js"></script>
  <script src="js/app/buttons.html5.min.js"></script>
  <script src="js/app/buttons.print.min.js"></script>
  <script src="js/app/iziModal.min.js"></script>
  <script src="js/app/md5.js"></script>
  <script src="js/app/print.min.js"></script>
  <script src="js/app/moment.js"></script>
  <script src="js/app/moment.pt-br.js"></script>
  <script src="js/app/valida-cpf-cnpj.js"></script>
  <script src="js/app/froala_editor.pkgd.min.js"></script>
  <script src="js/app/app.js"></script>

  <!-- Page -->
  <script src="js/page/funcoes.js"></script>
  <script src="js/page/server.js"></script>
  <script src="js/page/telas.js"></script>

</body>
</html>
