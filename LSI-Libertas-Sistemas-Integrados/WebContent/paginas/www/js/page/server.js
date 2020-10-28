/* CRUD *******************************************************************************************************************************/
function Login() {
  this.singIn = function (data) {
    myApp.tab.show($$('.view-principal'));
  }
}

function Cruds() {
  this.getProdutos = function () {
    var tabProduto = Promessa("TabelaProduto", undefined, undefined);
    tabProduto.then(function (retorno) {
      // $("#tbody_produto").html(retorno);
      console.log(retorno)
      Administrador.listarProdutos(retorno)
    }, function(e){ console.log(e)})
  }
  this.setProduto = function(data){
    var resultado = Promessa("CadastroProduto", data, undefined);
		    resultado.then(function(retorno){
        Toast(retorno);
       
        setTimeout(() => {
          Cruds.getProdutos();
          Formulario.clean($("#produto-cadastrar").find("form"))
          $("#tab-listarProduto")[0].click()
        }, 3000);
        }, function(e){console.log(e)})
  }
  this.excluirProduto = function(data){
    data = {id: data}
    var resultado = Promessa("ExcluirProduto", data, undefined);
		    resultado.then(function(retorno){
        Toast(retorno);
        Cruds.getProdutos();
        }, function(e){console.log(e)})
  }
  this.updateProduto = function(data){
    var resultado = Promessa("UpdateProduto", data, undefined);
		    resultado.then(function(retorno){
        Toast(retorno);
        myApp.popup.close(".popup-updateProtuto");
        Formulario.clean($("#formulario_updateProduto"))
        Cruds.getProdutos();
        }, function(e){console.log(e)})
  }

}