# Marco Intermediário — Oficina Mecânica

**Projeto:** Sistema de gestão para oficina mecânica
**Instituição:** Centro Universitário UFBRA
**Curso:** Análise e Desenvolvimento de Sistemas (ADS)
**Disciplina:** Projeto de Software
**Equipe:** Franciscana Ribeiro Cintra e Maria Heloísa Macedo
**Data do marco:** 14/11/2026

## Objetivo do marco

Apresentar o modelo orientado a objetos, a arquitetura do primeiro incremento, uma aplicação demonstrável para o fluxo de ordens de serviço, instruções para execução e o histórico de alterações versionadas.

## Entregáveis

| Item | Entrega | Evidência no projeto |
|---|---|---|
| 1. Classes centrais | Seis classes conceituais: `Cliente`, `Veiculo`, `Mecanico`, `OrdemServico`, `ItemServico` e `HistoricoStatus`. O incremento ainda não implementa todas elas no código. | [Modelo OO e UML](../modelagem/uml.md), seções “Classes centrais” e “Correspondência com o incremento implementado”. |
| 2. Atributos, operações e relacionamentos | Tabela de atributos e operações, responsabilidades e regras de associação/composição. | [Modelo OO e UML](../modelagem/uml.md). |
| 3. Diagrama de classes | Diagrama UML em Mermaid, incluindo as classes e enumeração `StatusOS`. | [Modelo OO e UML](../modelagem/uml.md), seção “Diagrama de classes”. |
| 4. Mudança futura e manutenção | Enviar automaticamente atualizações de status pela API oficial do WhatsApp; classificada como manutenção evolutiva. | [Modelo OO e UML](../modelagem/uml.md) e [Arquitetura](../modelagem/arquitetura.md). |
| 5. Primeiro incremento funcional | MVP de terminal compatível com `v1.0-mvp` e painel web complementar com cadastro, OS, itens, totais e mensagens simuladas. | [Programa Python](../../sistema_oficina.py), [painel web](../../index.html) e critérios em [requisitos](../../requisitos.md). |
| 6. Instruções para executar | Comando Python para a versão de terminal e servidor estático para o painel web. | [Arquitetura](../modelagem/arquitetura.md), seção “Como executar o incremento”. |
| 7. Histórico Git | Commits separados para documentação, funcionalidade e ajustes posteriores. | Histórico listado abaixo; consultar também `git log --oneline`. |
| 8. Preparação do marco | Este documento reúne escopo, evidências, limites e roteiro de demonstração. | Este arquivo e links para os documentos detalhados. |

## Primeiro incremento

O repositório acompanha o MVP de terminal da Maria e oferece um painel web complementar:

1. No terminal, criar uma OS de demonstração e registrar as mudanças para `Em Reparo` e `Pronto` com histórico cronológico.
2. No painel web, cadastrar cliente e veículo, abrir OS, adicionar mão de obra, calcular o total e consultar o status.

As duas versões apenas simulam o preparo das mensagens; nenhuma envia mensagens pelo WhatsApp. O exemplo Python mantém dados em memória durante a execução; o painel web salva dados no `localStorage`. O painel é uma prova de conceito sem autenticação, sincronização entre dispositivos ou backup. Use apenas dados fictícios.

## Como executar

Para o MVP de terminal, com Python 3 instalado, execute na raiz:

```sh
python3 sistema_oficina.py
```

Para abrir o painel web complementar, execute `python3 -m http.server 8000` e acesse `http://localhost:8000`. Para detalhes e limitações, consulte [arquitetura.md](../modelagem/arquitetura.md).

## Roteiro de demonstração

1. Executar `python3 sistema_oficina.py` e mostrar a OS de exemplo, as mensagens simuladas e a linha do tempo.
2. Abrir o painel web, cadastrar dados fictícios, lançar um serviço e apresentar o total e a consulta de OS.
3. Abrir [uml.md](../modelagem/uml.md) para apresentar as seis classes conceituais, a correspondência parcial do código e a integração futura com WhatsApp como manutenção evolutiva.

## Histórico de commits

| Commit | Alteração |
|---|---|
| `32a57ed` | Preparar documentação do marco e diagramas. |
| `29cc749` | Implementar painel local de ordens de serviço. |
| `54d3653` | Destacar mudança futura e manutenção no documento UML. |
| `c4668c7` | Destacar instruções para executar o incremento. |
| `e6a9e0e` | Registrar mensagens simuladas no histórico de status da OS. |
| `7f73f4f` | Classificar integração futura com WhatsApp como manutenção evolutiva. |
| `f28a53a` | Adicionar o MVP Python de controle de status compatível com a tag da Maria. |
| `32cc73a` | Registrar no README e na documentação o alinhamento com o MVP da Maria. |

## Documentação relacionada

- [Requisitos do incremento](requisitos.md)
- [Arquitetura e execução](../modelagem/arquitetura.md)
- [Modelo orientado a objetos e UML](../modelagem/uml.md)
- [Requisitos completos do projeto](../../REQUISITOS.md)