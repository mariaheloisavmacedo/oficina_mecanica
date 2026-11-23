# Plano de Testes — Versão 1.0

## Objetivo

Verificar se o sistema atende aos requisitos críticos de criação da OS, ciclo de status, histórico, registro de itens, cálculo do total, consulta e persistência demonstrativa.

## Estratégia

A validação combina testes unitários automatizados do MVP Python, testes de integração pela troca de objetos e dados no painel web, testes de sistema pela execução completa no navegador e testes de aceitação pelos critérios definidos nos requisitos.

## Níveis de teste

| Tipo | Objetivo | Evidência |
|---|---|---|
| Unitário | Verificar classes e métodos isolados. | `tests/test_sistema_oficina.py`. |
| Integração | Verificar se dados da OS, histórico e serviços são combinados corretamente. | Execução do navegador e persistência no `localStorage`. |
| Sistema | Validar o fluxo completo em uma demonstração ponta a ponta. | Vídeo/fotos do navegador e saída do terminal. |
| Aceitação | Confirmar requisitos funcionais prioritários com dados fictícios. | Lista de casos executados e observações. |

## Casos de teste

| ID | Tipo | Requisito | Pré-condição | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|---|---|
| TU-01 | Unitário | RF-03/RF-04 | Instância nova | Número 101, cliente e placa | Status inicial `Aguardando Inspeção` e histórico com um registro | Aprovação |
| TU-02 | Unitário | RF-04 | OS criada | `Em Reparo` e depois `Pronto` | Status final `Pronto` e três registros na ordem correta | Aprovação |
| TU-03 | Unitário | RF-04/RF-08 | Registro criado | Status e mensagem | Data/hora, status e mensagem são preservados | Aprovação |
| TU-04 | Unitário | RF-03 | OS criada | Número 101 | Painel mostra número da OS e status atual | Aprovação |
| TI-01 | Integração | RF-01/RF-02 | Navegador aberto | Cliente válido e veículo Mercosul | Cliente e veículo ficam associados | Aprovação manual |
| TI-02 | Integração | RF-05/RF-06 | OS selecionada | Descrição, mecânico e valor | Item entra na coleção e total é recalculado | Aprovação manual |
| TI-03 | Integração | RF-04 | OS com item | Atualizações sequenciais | Status avança e histórico recebe registro | Aprovação manual |
| TS-01 | Sistema | RF-03/RF-05/RF-06 | Navegador limpo | Cadastro, veículo, OS e item | Fila mostra OS concluível e total correto | Aprovação manual |
| TS-02 | Sistema | RF-07 | OS existente | Número da OS ou placa | Consulta localiza a ordem correta | Aprovação manual |
| TS-03 | Sistema | RF-04 | OS sem itens | Solicitação de conclusão | Sistema impede conclusão | Aprovação manual |
| TS-04 | Sistema | RNF-02 | Dados cadastrados | Recarregar página | Dados do navegador permanecem disponíveis | Aprovação manual |
| TA-01 | Aceitação | RF-01/RF-02 | Dados fictícios válidos | CPF/CNPJ e placa válidos | Cadastro é concluído sem inconsistência | Aprovação manual |
| TA-02 | Aceitação | RF-04/RF-08 | OS em análise | Mudança para execução | Mensagem simulada aparece no histórico | Aprovação manual |
| TA-03 | Aceitação | RNF-03 | Cliente comum | Consulta por número/placa | Demonstração não representa controle real por perfil | Limitação conhecida |

## Critérios de aprovação

- Todos os testes unitários devem passar.
- Nenhum erro de sintaxe deve permanecer em JavaScript ou Python.
- Os requisitos críticos RF-03, RF-04, RF-05, RF-06 e RF-07 devem ter execução demonstrável.
- Limitações de segurança, autenticação e persistência devem permanecer documentadas.

## Evidências

Guardar no repositório ou no relatório:

- Resultado do comando `python3 -m unittest discover -s tests -v`.
- Capturas do cadastro, abertura da OS, lançamento do item e conclusão.
- Captura da consulta por número/placa.
- Captura do histórico de status.
- Histórico Git e tag `v1.0-final`.
