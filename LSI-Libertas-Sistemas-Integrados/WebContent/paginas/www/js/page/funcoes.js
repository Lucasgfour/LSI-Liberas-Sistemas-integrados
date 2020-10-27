/* Funçoes Gerais ***************************************************************************************************/
  function Promessa(tela, parametros, load) { // Faz a comunicação com o servidor
    if (!navigator.onLine){
      Toast("Você está sem internet, verifique a conexão e tente novamente");
      myApp.preloader.show()
    }

    if(load == undefined)
     /* myApp.preloader.show()*/

    if (!parametros)
      parametros = {};

    // parametros["idpessoa"] = jQuery.isEmptyObject(Usuario_Dados.listar()) ? 0: Usuario_Dados.listar()["pessoa"]["idpessoa"];
    return Promise.resolve(
      jQuery.ajax({
        type: "POST",
        dataType: "json",
        data: parametros,
        url: myApp["data"]["url_raiz"] + "/LSI-Libertas-Sistemas-Integrados/" + tela
      })
    ).finally(function() {
      myApp.preloader.hide();
    });
   }
  function Formulario() { 
    this.getValores = function(form) {
      var data = {};
      form.find("[name]").each(function(index) {
        var campo = $(this).attr("placeholder");
        var required = $(this).attr("required");
        var name = $(this).attr("name");
        var type = $(this).attr("type");
        var value = $(this).val();
        var objeto = name.split('.');

        if (!value && required) {
          data = {};
          Toast("Campo " + campo + " é Obrigatório");
          $(this).focus();
          return false;
        }

        if(type == "checkbox"){
          value = $(this).is(":checked");
          
        }
        if (type == "email" && required) {
          var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
          if (!$.trim(value).match(pattern)) {
            data = {};
            Toast(campo + ' Inválido');
            $(this).focus().select();
            return false;
          }
        }

        if (type == "textarea" && value) 
          value = value.replace(/\n/g, ' ').trim();        

        if (type == "password" && required && value) 
          value = md5("*" + value + "#Prefeitura*");

        /* Verifica se é um Objeto */
        if (objeto.length == 2) {
          if (data[objeto[0]] == undefined) data[objeto[0]] = {};
          if (value) data[objeto[0]][objeto[1]] = value;
        } else {
          if (value) data[name] = value;
        }

      });
      return data;
     };
    this.setValores = function(form, data, objeto) {
      objeto = objeto == undefined ? "": objeto + ".";
      for (var key in data) {
        if(!Array.isArray(data[key])){
          form.find("[name='"+ objeto + key +"']").val(data[key]).trigger("change");
          myApp.input.checkEmptyState(form.find("[name='"+ objeto + key +"']"));
        }
      }
     };
    this.clean = function(form) {
      form[0].reset();
      form.find('input[type=hidden]').val("");
      myApp.input.checkEmptyState(form.find("[name]"));
     };
   }
  function GeraGrafico() {
    this.lineGrafico = function (idGrafico, data, moeda, width) {
      $("#" + idGrafico).parent().empty().html("<canvas id='" + idGrafico + "'></canvas>");

      var grafico = document.getElementById(idGrafico).getContext('2d');
      var chart = new Chart(grafico, {
        // Tipo do grafico
        type: data["type"],

        // Dados do grafico
        data: data,
        // data: {
        //   labels: labels,
        //   datasets: [{
        //     label: title,
        //     backgroundColor: color,
        //     borderColor: color,
        //     data: dados,
        //     fill: false
        //   }]
        // },

        // Configuration options go here
        options: {
          responsive: true,
          legend: {
            display: data["legend"],
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            custom: function (tooltipModel) {
              tooltipModel.width = width;
              function getBody(bodyItem) {
                return bodyItem.lines;
              }
              // Set Text
              if (tooltipModel.body) {
                var titleLines = tooltipModel.title || [];
                var bodyLines = tooltipModel.body.map(getBody);
                bodyLines.forEach(function (body, i) {
                  var res = body[0].split(":");
                  // console.log(res[1]);
                  var valor = moeda + Util.formataDuasCasas(parseFloat(res[1]),4);
                  
                  body[0] = valor;
                });
              }
            },
          },
        }
      });
     }
   }
  function Util(){
    this.formataDuasCasas = function (n, casasDecimais) {
      var numero = parseFloat(n);
      casasDecimais = casasDecimais == undefined ? 2 : casasDecimais;
      numero = numero.toFixed(casasDecimais).split('.');
      numero[0] = " " + numero[0].split(/(?=(?:...)*$)/).join('.');
      return numero.join(',');
     }
    this.removeAccents = function (str) {
      var accents    = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
      var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
      str = str.split('');
      var strLen = str.length;
      var i, x;
      for (i = 0; i < strLen; i++) {
        if ((x = accents.indexOf(str[i])) != -1) {
          str[i] = accentsOut[x];
        }
      }
      return str.join('');
     }
    this.copiaAreaTransferencia = function (text) {
      var textArea = document.createElement("textarea");
    
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = 0;
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.value = text;
    
      document.body.appendChild(textArea);
      textArea.select();
    
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        Toast('Copiado para area de transferência.');
      } catch (err) {
        Toast('Não foi possivel copiar para area de transferência');
      }
    
      document.body.removeChild(textArea);
     }
    this.maiuscula = function (text) {
			var loweredText = text.toLowerCase();
			var words = loweredText.split(" ");
			for (var a = 0; a < words.length; a++) {
				var w = words[a];

				var firstLetter = w[0];
				w = firstLetter.toUpperCase() + w.slice(1);

				words[a] = w;
			}
			return words.join(" ");
     };
    this.normaliza = function(data){
      return JSON.stringify(data).replace(/\"/g, "\'");
     }
    this.preloadImgUnica = function(url, el){ // Melhorar essa coisa linda
      url = "http://sistemaagely.com.br/"+ url.replace("getImagem", "getArquivo");
      
      preloadImage(url,
        function(){ // Imagem carregada com sucesso 
          $(el).stop().animate({opacity:'0'},function(){
          $(this).attr('src', url).animate({opacity:'1'});
          });
        },
        function(){ // Imagem não carregada
          $(el).stop().animate({opacity:'0'},function(){
          $(this).attr('src', 'img/sem_logo.png').animate({opacity:'1'});
          });
        }
      );

      function preloadImage(url, anImageLoadedCallback, anImageErrorCallback){
      var img = new Image();

      img.onload = function() {
          anImageLoadedCallback();
      };
      img.onerror = function() {
          anImageErrorCallback();
      };

      img.src = url;
      }
     }
    this.onlyNumber = function(data){
      return data != undefined ? data.replace(/[^\d]/,'') : undefined;
     }
    this.carregaGoogleMaps = function(data){
      return new google.maps.Map(document.getElementById(data["id"]), {
        center: { 
          lat: parseFloat(data["latitude"]),
          lng: parseFloat(data["longitude"])
        },
        zoom: 14,
        disableDefaultUI: true
      });
     }
    this.carregaMarkerGoogleMaps = function(data, map){
      return new google.maps.Marker({
        map: map,
        title: data["nome"],
				position: {
          lat: parseFloat(data["latitude"]),
          lng: parseFloat(data["longitude"])
        },
        icon: {
          url: "img/logo.png", // url
          scaledSize: new google.maps.Size(32, 32), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0,32) // anchor
        }
			});
     }
    this.ordenaArray = function(data, key){
      return data.sort(function (a, b) { return (Util.removeAccents(a[key]) > Util.removeAccents(b[key])) ? 1 : ((Util.removeAccents(b[key]) > Util.removeAccents(a[key])) ? -1 : 0); });
     }
    this.desordenaArray = function(data){
      return data.sort(function () { return .5 - Math.random(); });
     }
    this.desordenaCroppie = function(){
      $("#imagem").remove();
      $("#redimenciona_imagem .block").html("<div id='imagem'></div>");
     }
    this.dataTableDestroy = function (id) {
      if ($.fn.dataTable.isDataTable(id))
        $(id).DataTable().destroy();

      $(id).find("tbody").empty();
      $(id).find("tfoot").empty();
     }
   }
  function Toast(texto, tempo, fechar) {
    tempo = tempo == undefined ? 3000 : tempo;
    fechar = fechar == undefined ? false : true;
    return myApp.toast.create({
      text: texto,
      closeTimeout: tempo,
      closeButton: fechar,
      closeButtonColor: 'green',
    }).open();
   }
  function LoadPage(name, parametros) {
    var pageName = "/" + name + "/";
    var page = $("#" + name);
    var painel = $(".panel-left");

    if(page.width() >= 1200)
      page.find(".tabs-swipeable-wrap").removeClass("tabs-swipeable-wrap").addClass("tabs-animated-wrap");

    if(painel.is(":visible")){
      if(painel.find(".accordion-item-opened").length > 0)
        myApp.accordion.close(painel.find(".accordion-item-opened"));

      myApp.panel.close();
    }

    if($(".view-inicial").is(":visible")){
      View_Inicial.router.navigate(pageName, parametros);
    } else {
      View_Principal.router.navigate(pageName, parametros);
    }
    
    openAccordion(page);    
   }
  function BackPage(){
    var view;

    if (View_Principal.$el.hasClass("tab-active"))
      view = View_Principal;    

    if (View_Inicial.$el.hasClass("tab-active"))
      view = View_Inicial;

    if (view.router.url == "/notificacoes/")
      visializaNotificacoes();

    if (view.router.url == "/busca_principal/")
      $("#busca_principal").find(".list ul").empty();

    if (myApp.popup.get() != undefined)
      myApp.popup.close();
    else if (myApp.dialog.get() != undefined) 
      myApp.dialog.close();
    else if ($(".iziModal").is(":visible")) 
      $(".iziModal:visible").iziModal("close");
    else 
      view.router.back();

    if (typeof cordova !== 'undefined') { screen.orientation.unlock(); }

   }
  function geraVirtualList(data) {
    return myApp.virtualList.create({
      // Elemento
      el: data["el"],
      // Array itens
      items: data["items"],
      // Função de busca
      searchAll: data["searchAll"],
      // Template lista
      itemTemplate: data["itemTemplate"],
      // Tamanho item
      height: data["height"]
    });
   }
  function geraListIndex(data){
    return myApp.listIndex.create({
      el: data["el"],
      listEl: data["listEl"],
      indexes: 'auto',
      scrollList: true,
      label: true,
    });
   }
  function abreviaName(name) { // Retorna o nome abreviado Luiz G.S.B. Mariano
    var name = name.split(' ');
    var novoNome;
    for (var key in name) {
      if (key == 0) {
        novoNome = name[key] + ' ';
      } else if (key == name.length - 1) {
        novoNome += ' ' + name[name.length - 1];
      } else {
        novoNome += name[key].charAt(0).toUpperCase() + '.';
      }
    }
    return novoNome.trim();
   }
  function openAccordion(page){
    if(page.find(".list.accordion-list").length > 0){
      page.find(".list.accordion-list").each(function(index){
        myApp.accordion.open($(this).find(".accordion-item").eq(0));
      });
    }
   }
  function salvaLocalStorage(){
    localStorage[myApp["id"]] = JSON.stringify(myApp["data"]);
   }
  function geraChip(page, data){
    page.find(".chip").remove();
    data.map(function(x){return page.find(".page-content").prepend("<div class='chip'> <div class='chip-label'>"+ x["descricao"] +"</div> </div>")});
   }
  function LoadModal(modal, data) {
    modal.iziModal("destroy");
    modal.iziModal({...data, ...myApp["data"]["iziModal"]});
    modal.iziModal("open");
   }
/* Principal ********************************************************************************************************/
  function Administrador(){
    this.modoNoturno = function(){
      if(localStorage.getItem("modo_noturno") == "true"){
        localStorage.setItem("modo_noturno", false);
        $("body").removeClass("theme-dark");
      } else {
        localStorage.setItem("modo_noturno", true);
        $("body").addClass("theme-dark")
      }
    }
   }
  function NoticiaInformacao(){
    this.carregaLista = function(data, tipo){
      var tablela = $(`#${tipo == 1 ? "table_noticias" : "table_informacoes"}`);

      Util.dataTableDestroy(`#${tipo == 1 ? "table_noticias" : "table_informacoes"}`);
      for (var key in data) {
        var item = data[key];
        tablela.find("tbody").append(`<tr>`
          + `<td>${moment(item["data"]).format("YYYY-MM-DD")}</td>`
          + `<td>${item["titulo"]}</td>`
          + `<td class="button" onclick="Util.copiaAreaTransferencia('${item["key_noticia_informacao"]}')">${item["key_noticia_informacao"]}</td>`
          + `<td>${item["ativo"] ? "Ativo" : "Desativada"}</td>`
          + `<td><button class="button button-fill button-small button-round" onclick="CRUDnoticia_informacao.read(${Util.normaliza(item)})">Editar</button> </td>`
          + `<td><button class="button button-fill button-small button-round" onclick="NoticiaInformacao.deletar(${Util.normaliza(item)})">Deletar</button> </td>`
          + `</tr>`);
      }

      tablela.DataTable({
        retrieve: true,
        destroy: true,
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: false,
        responsive: true,
        autoWidth: false,
        pageLength: 50
      });
      
     }
    this.carregaNoticiaEdicao = function(data){
      var page = $(`#${data["idnoticia_informacao_tipo"] == 1 ? "noticias-2" : "informacao-2"}`);

      myApp.tab.show(page);

      if(data["ativo"]){
        page.find(".block .button").eq(2).data("ativo", false);
        page.find(".block .button").eq(2).text(`${data["idnoticia_informacao_tipo"] == 1 ? "notícia": "informação"} ativa`);
        page.find(".block .button").eq(2).removeClass("color-orange");
        page.find(".block .button").eq(2).addClass("color-yellow");
      } else {
        page.find(".block .button").eq(2).data("ativo", true);
        page.find(".block .button").eq(2).text(`${data["idnoticia_informacao_tipo"] == 1 ? "notícia": "informação"} desativada`);
        page.find(".block .button").eq(2).removeClass("color-yellow");
        page.find(".block .button").eq(2).addClass("color-orange");
      }

      data["hora"] = moment(data["data"]).format("HH:mm");
      data["data"] = moment(data["data"]).format("YYYY-MM-DD");
      Formulario.setValores(page.find("form"), data);
      console.log(data);
      
      if(data["idnoticia_informacao_tipo"] == 1)
        NoticiasDdescricao.html.set(data["descricao"]);
      else
        InformacaoDescricao.html.set(data["descricao"]);

      page.find(".elevation-3").empty();
      for (var key in data["fotos"]) {
        var foto = data["fotos"][key];
        var block = foto["destaque"] ? page.find(".elevation-3").eq(0) : page.find(".elevation-3").eq(1);

        if(foto["url_arquivo"]){
          block.append(`<div class="foto elevation-2" style="background-image: url('${myApp["data"]["url_arquivos"] + foto["url_arquivo"]}'">`
            + `<i class="material-icons" onclick="NoticiasLicitacao.deletarArquivo(${Util.normaliza({idnoticia_informacao: data["idnoticia_informacao"], idnoticia_informacao_arquivo: foto["idnoticia_informacao_arquivo"]})})">close</i>`
            + `<span>${foto["url_arquivo"]}</span>`
            + `</div>`);
        }
      }

     }
    this.deletarArquivo = function(data){
      myApp.dialog.confirm("Deletar este arquivo ?", function(){
        CRUDnoticia_informacao.deletaArquivo(data);
      });
     }
    this.deletar = function(data){
      myApp.dialog.confirm("Confirma Deletar ?", function(){
        CRUDnoticia_informacao.deleta(data);
      });
     }
   }
  function ConcursoLicitacao(){
    this.carregaLista = function(data, tipo){
      var tablela = $(`#${tipo == 1 ? "table_concurso" : "table_licitacao"}`);

      Util.dataTableDestroy(`#${tipo == 1 ? "table_concurso" : "table_licitacao"}`);
      for (var key in data) {
        var item = data[key];
        tablela.find("tbody").append(`<tr>`
          + `<td>${item["numero_processo"]}</td>`
          + `<td>${item["descricao"]}</td>`
          + `<td>${item["modalidade"]}</td>`
          + `<td>${moment(item["data_postagem_inicial"]).format("DD/MM/YYYY")} - ${moment(item["data_postagem_final"]).format("DD/MM/YYYY")}</td>`
          + `<td><button class="button button-fill button-small button-round" onclick="CRUDconcurso_licitacao.readHistoricoDownloads(${Util.normaliza(item)})">Ver</button> </td>`
          + `<td><button class="button button-fill button-small button-round" onclick="CRUDconcurso_licitacao.read(${Util.normaliza(item)})">Editar</button> </td>`
          + `<td><button class="button button-fill button-small button-round" onclick="ConcursoLicitacao.deletar(${Util.normaliza(item)})">Deletar</button> </td>`
          + `</tr>`);
      }

      tablela.DataTable({
        retrieve: true,
        destroy: true,
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: false,
        responsive: true,
        autoWidth: false,
        pageLength: 50
      });
     }
    this.carregaListaDownloads = function(data){
      var tablela = $("#table_concurso_licitacao");

      myApp.popup.open(".popup-downloads");

      Util.dataTableDestroy(`#table_concurso_licitacao`);
      for (var key in data) {
        var item = data[key];
        tablela.find("tbody").append(`<tr>`
          + `<td>${item["nome"]}</td>`
          + `<td>${item["cpf_cnpj"]}</td>`
          + `<td>${item["estado"]}</td>`
          + `<td>${item["cidade"]}</td>`
          + `<td>${item["telefone"]}</td>`
          + `<td>${moment(item["data"]).format("DD/MM/YYYY HH:mm")}</td>`
          + `<td>${item["email"]}</td>`
          + `</tr>`);
      }

      tablela.DataTable({
        retrieve: true,
        destroy: true,
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: false,
        autoWidth: false,
        pageLength: 50,
        responsive: true,
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
      });

     }
    this.carregaInformacaoEdicao = function(data){
      var page = $(`#${data["idconcurso_licitacao_tipo"] == 1 ? "concurso-2" : "licitacao-2"}`);

      myApp.tab.show(page);

      data["hora_postagem_inicial"] = moment(data["data_postagem_inicial"]).format("HH:mm");
      data["hora_postagem_final"] = moment(data["data_postagem_final"]).format("HH:mm");

      data["data_postagem_inicial"] = moment(data["data_postagem_inicial"]).format("YYYY-MM-DD");
      data["data_postagem_final"] = moment(data["data_postagem_final"]).format("YYYY-MM-DD");

      Formulario.setValores(page.find("form"), data);
      page.find(".elevation-3").empty();

      for (var key in data["arquivos"]) {
        var foto = data["arquivos"][key];
        var block = page.find(".elevation-3").eq(0);

        if(foto["url_arquivo"] ){
          block.append(`<div class="foto elevation-2" style="background-image: url('img/sem_foto.jpg');">`
            + `<i class="material-icons" onclick="ConcursoLicitacao.deletarArquivo(${Util.normaliza({idconcurso_licitacao: data["idconcurso_licitacao"], idconcurso_licitacao_arquivo: foto["idconcurso_licitacao_arquivo"]})})">close</i>`
            + `<span>${foto["url_arquivo"]}</span>`
            + `</div>`);
        }
      }

     }
    this.deletarArquivo = function(data){
      myApp.dialog.confirm("Deletar esta arquivo ?", function(){
        CRUDconcurso_licitacao.deletaArquivo(data);
      });
     }
    this.deletar = function(data){
      myApp.dialog.confirm("Confirma Deletar ?", function(){
        CRUDconcurso_licitacao.deleta(data);
      });
     }
   }
  function Reclamacoes(){
    this.carregaLista = function(data){
      var tablela = $("#table_reclamacoes");
      
      Util.dataTableDestroy("#table_reclamacoes");
      for (var key in data) {
        var item = data[key];
        tablela.find("tbody").append(`<tr>`
          + `<td>${moment(item["data"]).format("YYYY-MM-DD")}</td>`
          + `<td>${item["titulo"]}</td>`
          + `<td>${item["nome"] ? abreviaName(item["nome"]) : "Anônimo"}</td>`
          + `<td>${item["status"]}</td>`
          + `<td><button class="button button-fill button-small button-round" onclick="CRUDmanifestacao.read(${Util.normaliza(item)})">Editar</button> </td>`
          + `</tr>`);
      }

      tablela.DataTable({
        retrieve: true,
        destroy: true,
        paging: true,
        responsive: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: false,
        autoWidth: false,
        pageLength: 50
      });
     }
    this.carregaManifestacao = function(data){
      var modal = $("#modal_reclamacao");

      LoadModal(modal, {title: "Editar Manifestação", subtitle: ""});

      if(data["data_insercao"])
        data["data_insercao"] = moment(data["data_insercao"]).format("YYYY-MM-DD");

      if(data["data_resposta"])
        data["data_resposta"] = moment(data["data_resposta"]).format("YYYY-MM-DD");
      
        console.log(data);      
      Formulario.clean(modal.find("form"));
      Formulario.setValores(modal.find("form"), data);
     }
    this.salvaManifestacao = function(){
      var page = $("#modal_reclamacao");
      var data = Formulario.getValores(page.find("form"));

      if(!jQuery.isEmptyObject(data)){
        var m = {};
        m["data_resposta"] = data["data_resposta"];
        m["idmanifestacao_status"] = data["idmanifestacao_status"];
        m["manifestacao_resposta"] = data["manifestacao_resposta"];
        m["idmanifestacao"] = data["idmanifestacao"];

        CRUDmanifestacao.update(m);
      }
    }
   }