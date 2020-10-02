// Dom7
var $$ = Dom7;

// Framework7 App main instance
var myApp = new Framework7({
  root: '#app',
  id: 'com.agely.nuclick',
  name: 'Administrador',
  theme: 'md',
  panel: {
    leftBreakpoint: 1200,
  },
  data: function () {
    return {
      versao: "",
      banco: "",
      teste: true,
      // url_raiz: "http://localhost:8080/PrefeituraJacui",
      url_raiz: "",
      cor_app: "#007aff",
      iziModal: {
        headerColor: "#007aff",
        closeOnEscape: true,
        overlayClose: false,
        radius: 16,
        zindex: 10001
      },
      dataTable: {
        "sEmptyTable": "Nenhum registro encontrado",
        "sProcessing": "A processar...",
        "sLengthMenu": "Mostrar _MENU_ registos",
        "sZeroRecords": "Não foram encontrados resultados",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
        "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
        "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
        "sInfoPostFix": "",
        "sSearch": "Procurar:",
        "sUrl": "",
        "oPaginate": {
          "sFirst": "Primeiro",
          "sPrevious": "Anterior",
          "sNext": "Seguinte",
          "sLast": "Último"
        },
        "oAria": {
          "sSortAscending": ": Ordenar colunas de forma ascendente",
          "sSortDescending": ": Ordenar colunas de forma descendente"
        }
      }
    };
  },
});

/* iziModal width */
myApp["data"]["iziModal"]["width"] = myApp["width"] > 780 ? "calc(60% - 20px)" : "calc(100% - 20px)";

/* view principal */
var View_Principal = myApp.views.create('.view-principal', {
  url: '/',
  stackPages: true,
  routes: [
    { path: "/principal/", pageName: "principal"},
    { path: "/tela_produtos/", pageName: "tela_produtos"},
   ]
});