# Oficina Mecânica

Sistema de gestão para organizar o atendimento e o acompanhamento dos serviços de uma oficina mecânica.

## Objetivo

Centralizar informações de clientes, veículos e serviços para facilitar o fluxo de atendimento e dar visibilidade ao andamento dos reparos.

## Usuários

- **Clientes (donos dos veículos):** acompanham os serviços realizados em seus veículos.
- **Recepcionistas/atendentes:** realizam cadastros de clientes e veículos, além de abrir novas ordens de serviço.
- **Mecânicos:** consultam ordens de serviço abertas, executam reparos e registram as atividades realizadas.
- **Gestores/donos da oficina:** acompanham a operação global, produtividade e gerenciam o negócio.

## Funcionalidades Principais

- **Gestão de Clientes e Veículos:** cadastro de clientes (com validação de CPF/CNPJ e contatos) e vínculo com veículos pela placa.
- **Ordens de Serviço (OS):** abertura, controle de ciclo de vida (`Aberta` → `Em Análise` → `Em Execução` → `Concluída` → `Cancelada`) e acompanhamento em tempo real.
- **Registro de Serviços Executados:** lançamento de itens de mão de obra por OS com horas trabalhadas, responsável e valores.
- **Consulta de Andamento:** acompanhamento simplificado do status do reparo para os clientes.

## Versões do incremento

- `sistema_oficina.py`: demonstração de terminal correspondente ao MVP `v1.0-mvp` da Maria, com abertura de OS, status `Aguardando Inspeção` → `Em Reparo` → `Pronto` e histórico de mensagens simuladas.
- `index.html`: painel web complementar, com cadastro local e o fluxo de status definido nos requisitos revisados.

Nos dois casos, as mensagens são apenas demonstrativas; não há integração real com WhatsApp.

## Arquitetura do MVP atual

1. **Apresentação:** HTML e CSS, em `index.html` e `styles.css`, com interface responsiva.
2. **Controle e regras locais:** JavaScript em `app.js`, incluindo validações e máquina de estados da OS.
3. **Persistência demonstrativa:** `localStorage` do navegador.
4. **Demonstração Python:** `sistema_oficina.py`, com dados mantidos em memória durante a execução.

API, autenticação por perfil, banco relacional, backup e proteção da consulta do cliente são requisitos futuros. Eles não estão implementados neste MVP.

## Documentação e Modelagem

- [Marco intermediário](./docs/requisitos/marco_intermediario.md): síntese dos oito entregáveis, roteiro de demonstração e commits.
- [Requisitos do incremento](./docs/requisitos/requisitos.md): escopo, critérios de aceite e limites da versão demonstrável.
- [Arquitetura](./docs/modelagem/arquitetura.md): componentes implementados, restrições, execução e manutenção futura.
- [Modelo OO e UML](./docs/modelagem/uml.md): seis classes conceituais, atributos, operações, relacionamentos e correspondência com o código atual.
- [Diagrama de contexto](./docs/analise-dados/diagrama_contexto.md): fronteira do sistema e entidades externas.
- [DFD nível 0](./docs/analise-dados/dfd_nivel0.md): processos principais, armazenamentos e fluxos de dados.
- [Dicionário de dados](./docs/analise-dados/dicionario_dados.md): itens relevantes, formatos, origem e validações.
- [Relatório de ajustes](./docs/analise-dados/relatorio_ajustes.md): comparação DFD/DD, divergências e correções.
- [Planejamento incremental](./docs/processos/plano_incremental.md): modelo de processo, releases e organização de branches.
- [CHANGELOG](./CHANGELOG.md): histórico de versões, melhorias e correções.
- [Requisitos originais](./REQUISITOS.md): levantamento completo do escopo do projeto.
- [Planejamento E2](./docs/modelagem/PROJETO_ARQUITETURA_E2.md): documento de arquitetura e planejamento elaborado no marco anterior.
- [Plano de testes](./docs/testes/plano_testes.md): casos unitários, integração, sistema e aceitação.
- [Bugs e correções](./docs/testes/bugs_correcoes.md): problemas encontrados e tratamentos.
- [Evidências de testes](./docs/testes/evidencias_testes.md): comandos, resultados e capturas esperadas.
- [Análise de segurança](./docs/seguranca/analise_seguranca.md): dados, autenticação, autorização e riscos residuais.
- [Apresentação e defesa](./docs/apresentacao/apresentacao_defesa.md): roteiro para demonstração final.

## Executar o MVP em Python

Com Python 3 instalado, na raiz do projeto execute:

```sh
python3 sistema_oficina.py
```

## Executar o painel web complementar

Na raiz do projeto, inicie um servidor estático:

```sh
python3 -m http.server 8000
```

Abra `http://localhost:8000` no navegador. Não há dependências para instalar; os dados de demonstração são guardados no `localStorage` do navegador atual. Não use dados pessoais reais nesta versão.

## Executar testes do incremento Python

Na raiz do projeto:

```sh
python3 -m unittest discover -s tests -v
```

Os testes verificam a abertura da OS, o histórico inicial, a sequência de atualizações e o formato da data/hora.
