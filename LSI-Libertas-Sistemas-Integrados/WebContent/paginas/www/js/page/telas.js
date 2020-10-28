/* Global ********************************************************************************************************************************/
  var Formulario = new Formulario();
  var Util = new Util();
  var Cruds = new Cruds();
  var Administrador = new Administrador();
/* Global CRUD ***************************************************************************************************************************/
  var Login = new Login();
/* Window on Load ***********************************************************************************************************************/
  window.onload = function(){

    var init = {
      versao: function(){
        init.web();
      },
      app: function(){
        init.boas_vindas();
      },
      web: function(){
        init.boas_vindas();
      },
      boas_vindas: function(){
        Cruds.getProdutos();
        localStorage.getItem("modo_noturno") == "true" ? $("body").addClass("theme-dark") : $("body").removeClass("theme-dark");
      }
    }

    if(typeof cordova !== "undefined")
      document.addEventListener('deviceready', function () { init.versao() }, false);
    else
      init.versao();
   }
/* Paginas ******************************************************************************************************************************/
  function AtualizarTabelaProduto() {
 	var tabProduto = Promessa("TabelaProduto", undefined, undefined);
	tabProduto.then(function(retorno){
    // $("#tbody_produto").html(retorno);
    console.log(retorno)
	})
  }

  $("#login").ready(function(){
    var page = $("#login");
    var form = page.find("form");

    page.find(".button").click(function(){
      var data = Formulario.getValores(form);

      if(!jQuery.isEmptyObject(data))
        Login.singIn(data);      

    });
   });
  $("#noticias").ready(function(){
    var page = $("#noticias");
    var noticias_1 = $("#noticias-1");
    var noticias_2 = $("#noticias-2");
   });

  $("#tela_produtos").ready(function(){
    var page = $("#tela_produtos")
    var form = page.find("form");

	$("#btnCadastrarProduto").on("click", function(){
      var data = Formulario.getValores(form)
      if(!jQuery.isEmptyObject(data)){
        Cruds.setProduto(data)
    //     var resultado = Promessa("CadastroProduto", data, undefined);
		//     resultado.then(function(retorno){
   	// 		Toast(retorno);
		// 	  Cruds.getProdutos();
		// })
      }
    })

    /* Antigo Click
	$("#btnCadastrarProduto").on("click", function(){
    myApp.popup.open(".popup-estoque");
      var data = Formulario.getValores(form)
      if(!jQuery.isEmptyObject(data)){
        console.log(data)
      }
    })*/
  })

  $(".popup-updateProtuto").ready(function(){
    var page = $(".popup-updateProtuto")
    var form = $("#formulario_updateProduto")

    $("#btn_updateProduto").on("click", function(){
      var data = Formulario.getValores(form)
      if(!jQuery.isEmptyObject(data)){
        Cruds.updateProduto(data)
      }
    })

  })
/* Modal ********************************************************************************************************************************/
