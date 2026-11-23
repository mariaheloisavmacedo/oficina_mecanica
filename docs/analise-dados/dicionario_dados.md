# Dicionário de Dados

## Itens principais

| Código | Item | Composição / formato | Origem | Validações | Uso |
|---|---|---|---|---|---|
| DD-01 | `Cliente` | `{id, nome, documento, telefone}` | Formulário de cadastro | Nome obrigatório; CPF/CNPJ único e válido; telefone obrigatório. | Vínculo com veículo e OS. |
| DD-02 | `DocumentoCliente` | String numérica, 11 dígitos (CPF) ou 14 (CNPJ) | Atendente | Dígitos verificadores válidos; não pode ser repetido. | Identificação única do cliente. |
| DD-03 | `Veiculo` | `{id, placa, marca, modelo, ano, cor, clienteId}` | Formulário de cadastro | Placa única, padrão clássico ou Mercosul; ano válido; vinculação obrigatória. | Associação do atendimento ao proprietário. |
| DD-04 | `Placa` | String alfanumérica, 7 caracteres | Atendente | `AAA9999` ou `AAA9A99`, normalizada sem sinais. | Busca e identificação de veículo. |
| DD-05 | `OrdemServico` | `{id, numero, veiculoId, queixa, abertaEm, status, itens, historico}` | Processo de abertura | Número único; veículo existente; queixa obrigatória; status inicial `Aberta`. | Registro central do atendimento. |
| DD-06 | `QueixaInicial` | Texto, máximo 500 caracteres | Cliente/Atendente | Não pode ficar vazia. | Descreve o defeito informado na entrada. |
| DD-07 | `StatusOS` | Enumerado: `Aberta`, `Em Análise`, `Em Execução`, `Concluída`, `Cancelada` | Mecânico/Operador | Transição sequencial permitida; cancelamento antes da conclusão. | Controla o ciclo de vida. |
| DD-08 | `ItemServico` | `{id, descricao, mecanico, valor}` | Mecânico | Descrição obrigatória; mecânico obrigatório; valor decimal maior que zero. | Compõe serviços e valor da OS. |
| DD-09 | `ValorServico` | Decimal positivo em reais | Item lançado | Não pode ser zero ou negativo. | Soma do faturamento da OS. |
| DD-10 | `HistoricoStatus` | `{status, dataHora, responsavel, mensagem}` | Processo de atualização | Status permitido; data/hora automática; responsável registrado. | Linha do tempo da OS. |
| DD-11 | `MensagemAtualizacao` | Texto gerado no formato “Olá, cliente... status...” | Sistema | Mensagem demonstrativa; não envia integração externa. | Preparação futura de notificações. |
| DD-12 | `ConsultaAndamento` | `{numeroOS} | {placa}` | Cliente | Deve informar número ou placa existente. | Localiza uma OS e seus dados de acompanhamento. |

## Regras de integridade

- Um veículo referencia exatamente um cliente.
- Uma OS referencia exatamente um veículo.
- Os itens pertencem a uma OS; uma OS pode ter zero ou mais itens antes do fechamento.
- Uma OS não pode ser concluída sem item registrado.
- Cada mudança de status gera um registro em `HistoricoStatus`.
- O valor total da OS é derivado da soma dos `ValorServico` dos itens.
- A implementação atual usa um único armazenamento JSON no `localStorage`; não há tabelas relacionais independentes.

## Formatos e exemplos

| Item | Exemplo |
|---|---|
| DocumentoCliente | `52998224725` |
| Placa clássica | `ABC1234` |
| Placa Mercosul | `ABC1D23` |
| Número da OS | `0001` ou inteiro `1` |
| Data/hora | `2026-11-14T21:54:11.000Z` |
| ValorServico | `250.00` |
| StatusOS | `Em Execução` |
