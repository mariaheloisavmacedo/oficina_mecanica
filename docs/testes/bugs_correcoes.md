# Bugs e Correções — Versão 1.0

## BUG-01 — Consulta por placa formatada

**Problema observado:** uma placa pesquisada com hífen ou caracteres de formatação poderia não coincidir com a placa normalizada armazenada.

**Impacto:** consulta da OS poderia retornar resultado incorreto ou não encontrar uma ordem existente.

**Correção:** normalização da entrada antes da comparação. A implementação remove caracteres não alfanuméricos e compara em letras maiúsculas.

**Validação:** teste manual no navegador com a placa armazenada `ABC1D23` e consulta usando `ABC-1D23`.

**Estado:** corrigido.

## BUG-02 — Conclusão permitida sem serviço

**Problema observado:** uma OS poderia ser concluída antes de existir um item de serviço registrado.

**Impacto:** violaria RF-06 e impediria o cálculo coerente do faturamento da OS.

**Correção:** `changeStatus` verifica se existem itens antes de aceitar `Concluída`.

**Validação:** teste manual solicitando conclusão em OS sem serviço; o sistema mostra mensagem de erro.

**Estado:** corrigido.

## BUG-03 — DFD com seta sem destino

**Problema observado:** a versão gráfica do DFD apresentava uma seta partindo do processo 6 sem elemento externo de destino.

**Impacto:** diagrama ambíguo e incoerente com os fluxos definidos.

**Correção:** removida a seta vazia e criado fluxo bidirecional explícito entre processo 6.0 e Gestor.

**Validação:** SVG submetido a parse XML e revisão visual.

**Estado:** corrigido.

## MEL-01 — Nomes dos processos centralizados no DFD

**Problema observado:** descrições dos processos 1.0 a 6.0 ficavam visualmente desalinhadas dentro dos círculos.

**Impacto:** dificuldade de leitura no relatório e na apresentação.

**Correção:** centralização em duas linhas com fonte proporcional dentro de cada círculo.

**Estado:** corrigido.

## Melhorias pendentes

- Criar cadastro real de mecânico com matrícula e especialidade.
- Substituir ou mapear formalmente `ServicoExecutado` para `ItemServico`.
- Migrar `localStorage` para API e banco relacional.
- Implementar autenticação e autorização por perfil.
- Integrar WhatsApp somente após requisitos de consentimento e segurança.
