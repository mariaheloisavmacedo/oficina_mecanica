# Relatório Curto de Ajustes — Dados e Implementação

## Objetivo

Registrar a revisão intermediária da análise de dados e comparar Diagrama de Contexto, DFD nível 0 e Dicionário de Dados com o incremento web já implementado.

## Revisão do feedback anterior

Foram corrigidos estes pontos da documentação anterior:

1. O modelo agora separa as classes conceituais das classes efetivamente implementadas.
2. A integração com WhatsApp foi mantida fora do MVP e classificada como manutenção evolutiva.
3. A documentação explica que existem estados diferentes no MVP Python e no painel web.
4. Os nomes técnicos do dicionário passam a coincidir com os dados reais do `localStorage`.

## Divergências encontradas

| Nº | DFD/DD ou requisito | Implementação atual | Ajuste necessário | Resultado |
|---|---|---|---|---|
| D-01 | Usuários possuem perfis com acesso controlado (RNF-03). | O protótipo não possui login nem controle por perfil. | Aprovar o protótipo como ambiente único de demonstração. | Documentado como limite no contexto e nos requisitos. |
| D-02 | Cliente e veículo usam classes separadas no UML conceitual. | Existem objetos separados no JavaScript e listas relacionadas por `customerId`. | Manter D1/D2 separados no DFD e confirmar vínculo por identificador. | Coerente no modelo atual. |
| D-03 | Mecânico é uma entidade cadastrada. | O nome do mecânico é texto informado em cada item. | Não representar cadastro real de mecânico no MVP atual. | Documentado como implementação parcial. |
| D-04 | `ItemServico` é uma entidade própria. | O objeto `ServicoExecutado` representa os itens na coleção `services`. | Manter separação conceitual no UML e equivalência prática no código. | Não exigiu alteração de código. |
| D-05 | Data/hora, status e responsável são registrados em todas as transições. | `history` recebe esses dados; a abertura também cria uma entrada inicial. | A mensagem simulada foi adicionada ao histórico. | Implementado e exibido na interface. |
| D-06 | Consulta por número da OS ou placa. | A busca aceita OS ou placa normalizada e a tabela permite abrir detalhes. | Manter uma consulta única e normalizar placas antes da comparação. | Já implementado. |
| D-07 | Valor total calculado a partir dos itens. | `OrdemServico.total` soma `service.price` em tempo real. | Não persistir o total independente na versão atual. | Coerente e corrigido documentalmente. |
| D-08 | Persistência relacional com backups. | Persistência em `localStorage` dentro do navegador. | Atualizar a arquitetura para não afirmar banco relacional no MVP. | Já registrado como limite. |
| D-09 | Exclusão protegida de cliente/veículo. | Não há ações de exclusão no protótipo atual. | Registrar que a regra é preparada para evolução de persistência. | Sem divergência funcional ativa. |
| D-10 | Integração de mensagens de WhatsApp. | Apenas uma mensagem simulada fica no histórico. | Não representar como sistema externo implementado. | Documentado como manutenção evolutiva. |

## Ajustes realizados

- Criado diagrama de contexto com clientes, atendentes, mecânicos, gestores e armazenamento local.
- Criado DFD nível 0 com seis processos principais e cinco armazenamentos documentados.
- Criado dicionário com 12 itens de dados relevantes, formatos e regras.
- Confirmada a implementação da consulta por número/placa, total derivado, histórico de status e mensagem simulada.
- Corrigida a descrição de persistência: o MVP usa `localStorage`, não banco relacional.
- Corrigida a descrição do mecânico: no MVP ele é texto no item de serviço, não entidade cadastrada.
- Corrigida a descrição dos itens: `ServicoExecutado` corresponde ao conceito de `ItemServico` em uma implementação simplificada.

## Ajustes pendentes para versões futuras

1. Criar entidade ou cadastro real de mecânico com matrícula e especialidade.
2. Trocar `ServicoExecutado` por `ItemServico` ou manter o nome com alias/documentação formal.
3. Adicionar vínculo direto de cada OS com cliente e mecânico no modelo persistido.
4. Migrar `localStorage` para banco relacional e API.
5. Implementar autenticação, autorização por perfil e consulta privada do cliente.
6. Integrar envio real de mensagens somente após consentimento e configuração segura da API.

## Conclusão

O DFD e o dicionário representam o fluxo implementado no MVP sem atribuir capacidades inexistentes. As maiores divergências são de infraestrutura e segurança: ausência de autenticação, banco compartilhado e integração externa. Elas não impedem a demonstração acadêmica, mas precisam ser tratadas antes de uso real em produção.
