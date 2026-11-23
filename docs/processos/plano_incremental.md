# Planejamento de Processos e Incrementos — Oficina Mecânica

## Modelo de processo escolhido

Foi escolhido o **modelo incremental**, pois o projeto possui requisitos já definidos, mas permite entregar partes funcionais e validáveis em ciclos curtos. O modelo permite revisar UML, DFD, dicionário, interface e regras de negócio ao final de cada incremento, incorporando os ajustes da avaliação intermediária.

O modelo incremental é mais adequado que o cascata porque o MVP já foi revisado e precisa evoluir em partes; mais adequado que a prototipação isolada porque o projeto exige documentação, versionamento e testes; e mais flexível que o modelo espiral porque o principal risco do projeto atual é rastrear divergências entre modelo e implementação, não realizar uma análise formal de risco em cada ciclo.

## Estratégia de releases

| Release | Conteúdo | Evidência |
|---|---|---|
| `v1.0-mvp` | Fluxo demonstrativo de abertura e atualização de status, histórico e documentação inicial. | Tag da Maria e commit correspondente. |
| `v1.1.0` | Painel web, UML de seis classes, contexto, DFD, dicionário, relatório de ajustes e mensagens simuladas. | Tag já criada no repositório atual. |
| `v1.2.0` | Plano incremental, CHANGELOG, testes automatizados do fluxo Python e correção documentada de consulta normalizada. | Esta evolução. |

## Plano de incrementos

### Incremento 1 — MVP de acompanhamento

- Cadastro demonstrativo de cliente e veículo.
- Criação da OS.
- Máquina de estados.
- Histórico de status.
- Critério de aceite: demonstrar uma OS do início ao fim no painel ou no terminal.

### Incremento 2 — Lançamento operacional

- Registro de itens de serviço.
- Mecânico responsável como texto.
- Cálculo automático do valor total.
- Consulta por número da OS ou placa.
- Critério de aceite: registrar pelo menos um serviço e validar o total exibido.

### Incremento 3 — Análise estruturada

- Diagrama de contexto.
- DFD nível 0.
- Dicionário de dados.
- Comparação DFD/DD com implementação e relatório de divergências.
- Critério de aceite: todos os fluxos documentados precisam corresponder ao comportamento demonstrável.

### Incremento 4 — Evolução testada

- Testes automatizados das classes do MVP Python.
- Normalização da consulta por placa.
- CHANGELOG e evidências de release.
- Critério de aceite: testes executados sem falha e documentação alinhada ao código.

### Incremento 5 — Testes, segurança e release final

- Plano de testes unitário, integração, sistema e aceitação.
- Evidências das execuções e capturas de demonstração.
- Registro de bugs encontrados e correções aplicadas.
- Atualização da documentação após correções.
- Análise básica de segurança e riscos residuais.
- CHANGELOG da versão final.
- Tag `v1.0-final` e preparação da defesa.

### Incremento 6 — Produção futura

- Migrar `localStorage` para API e banco relacional.
- Criar entidade Mecânico e associá-la à OS.
- Substituir `ServicoExecutado` por `ItemServico` ou manter um mapeamento explícito.
- Implementar autenticação, autorização e acesso privado do cliente.
- Integrar mensagens reais por API somente após consentimento e segurança das credenciais.

## Organização de branches

- `main`: versões integradas e validadas.
- `feature/*`: alterações pequenas de uma funcionalidade.
- `fix/*`: correções identificadas em testes ou feedback.
- `docs/*`: alterações exclusivamente documentais.
- `release/vX.Y.Z`: preparação de uma versão marcada por tag.

O projeto mantém o histórico de merges em `main`; tags representam releases verificadas.

## Bug ou melhoria identificada

### Melhoria corrigida — consulta de placa normalizada

Antes da correção, uma placa informada com hífen ou separadores poderia não coincidir com a placa armazenada. A implementação passou a remover caracteres não alfanuméricos antes da busca.

Código relacionado:

- Normalização em `app.js`.
- Validação de formato clássico/Mercosul em `app.js`.
- Testes do fluxo Python em `tests/test_sistema_oficina.py`.

Como evidência desta melhoria, o repositório registra commits, o CHANGELOG e uma tag de progresso.
