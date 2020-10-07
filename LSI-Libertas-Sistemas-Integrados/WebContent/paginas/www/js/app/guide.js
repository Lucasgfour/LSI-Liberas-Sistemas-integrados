function guiaServicos () {
  var shepherd = new Shepherd.Tour({
    defaultStepOptions: {
      showCancelLink: true
    },
    useModalOverlay: true
  });

  shepherd.addStep('cidade', {
    text: 'Neste módulo o usuário pode ter acesso as principais cotações do mercado futuro e indicadores de preço relacionados ao mercado de açúcar e etanol.',
    attachTo: '.selecione_uma_cidade bottom',
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        action: shepherd.cancel,
        classes: 'shepherd-button-secondary',
        text: 'Pular'
      }, {
        action: shepherd.next,
        text: 'Próximo'
      }
    ]
  });
  shepherd.addStep('favoritos', {
    text: 'Receba aqui os principais alertas e propostas das suas negociações.',
    attachTo: '.btn_favoritos bottom',
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        action: shepherd.back,
        classes: 'shepherd-button-secondary',
        text: 'Voltar'
      }, {
        action: shepherd.next,
        text: 'Próximo'
      }
    ]
  });
  shepherd.addStep('procura', {
    text: 'Receba aqui os principais alertas e propostas das suas negociações.',
    attachTo: '.no-hairlines-md bottom',
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        action: shepherd.back,
        classes: 'shepherd-button-secondary',
        text: 'Voltar'
      }, {
        action: shepherd.next,
        text: 'Próximo'
      }
    ]
  });
  shepherd.addStep('procura', {
    text: 'Receba aqui os principais alertas e propostas das suas negociações.',
    attachTo: '.micro bottom',
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        action: shepherd.back,
        classes: 'shepherd-button-secondary',
        text: 'Voltar'
      }, {
        action: shepherd.next,
        text: 'Próximo'
      }
    ]
  });
  shepherd.addStep('notificacoes', {
    text: 'Receba aqui os principais alertas e propostas das suas negociações.',
    attachTo: '.categoria bottom',
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        action: shepherd.back,
        classes: 'shepherd-button-secondary',
        text: 'Voltar'
      }, {
        action: shepherd.next,
        text: 'Próximo'
      }
    ]
  });
  shepherd.addStep('notificacoes', {
    text: 'Receba aqui os principais alertas e propostas das suas negociações.',
    attachTo: '.ofertas bottom',
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        action: shepherd.back,
        classes: 'shepherd-button-secondary',
        text: 'Voltar'
      }, {
        action: shepherd.next,
        text: 'Próximo'
      }
    ]
  });
  shepherd.addStep('notificacoes', {
    text: 'Receba aqui os principais alertas e propostas das suas negociações.',
    attachTo: '.delivery bottom',
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        action: shepherd.back,
        classes: 'shepherd-button-secondary',
        text: 'Voltar'
      }, {
        action: shepherd.next,
        text: 'Próximo'
      }
    ]
  });
  shepherd.addStep('fale_conosco', {
    text: 'Problemas, dúvidas e sugestões poderão ser direcionadas para nossa equipe técnica diretamente por aqui.',
    attachTo: '.eventos bottom',
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        action: shepherd.back,
        classes: 'shepherd-button-secondary',
        text: 'Voltar'
      }, {
        action: shepherd.next,
        text: 'Próximo'
      }
    ]
  });
  shepherd.addStep('negociacoes', {
    text: 'Seção destinada para o gerenciamento, inclusão e acompanhamento das propostas abertas, em fase de negociação e concluídas, sejam elas de compra ou venda. Aqui podem ser fechadas negociações no mercado à vista (spot) e no mercado a termo (contratos de liquidação futura). Contrapropostas e interações com potenciais compradores e vendedores poderão ser feitas por aqui ou através da seção Bid & Offer.',
    attachTo: '.beneficios bottom',
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        action: shepherd.back,
        classes: 'shepherd-button-secondary',
        text: 'Voltar'
      }, {
        action: shepherd.next,
        text: 'Próximo'
      }
    ]
  });
  shepherd.addStep('bids_offers_etanol', {
    text: 'As negociações entre comprador e vendedor podem ser acompanhadas através desta seção, também conhecida como Livro de Oferta e Demanda. Os Usuários podem interagir digitalmente e de forma muito mais rápida e segura, diretamente da palma da mão através do seu smartphone ou se preferirem, através da plataforma web. Aqui ficarão centralizadas exclusivamente as negociações de Etanol.',
    attachTo: '.empresa bottom',
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        action: shepherd.back,
        classes: 'shepherd-button-secondary',
        text: 'Voltar'
      }, {
        action: shepherd.cancel,
        text: 'Sair'
      }
    ]
  });

  return shepherd.start();
}