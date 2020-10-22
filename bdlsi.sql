CREATE TABLE `cad_produto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) DEFAULT NULL,
  `descricao` varchar(45) NOT NULL,
  `preco_custo` double NOT NULL,
  `preco_venda` double NOT NULL,
  `categoria` int(11) DEFAULT NULL,
  `cod_fornecedor` int(11) DEFAULT NULL,
  `id_estoque` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  UNIQUE KEY `id_estoque_UNIQUE` (`id_estoque`),
  CONSTRAINT `id` FOREIGN KEY (`id_estoque`) REFERENCES `cad_estoque` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `cad_estoque` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Produto` varchar(45) NOT NULL,
  `Quantidade` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;