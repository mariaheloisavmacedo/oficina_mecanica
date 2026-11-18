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

## Arquitetura do Sistema

O projeto adota uma arquitetura em camadas estruturada em 4 blocos principais:
1. **Frontend (Camada de Apresentação):** interfaces web responsivas para atendimento, oficina e clientes.
2. **Backend / API (Camada de Controle):** serviços REST responsáveis por autenticação, regras de acesso e rotas.
3. **Regras de Negócio (Camada de Domínio):** validação de dados, fluxo de status da OS e cálculos operacionais.
4. **Banco de Dados (Camada de Persistência):** armazenamento relacional garantindo integridade referencial.

## Equipe e Papéis

Projeto acadêmico desenvolvido para a disciplina de **Projeto de Software** (Centro Universitário UFBRA):

- **Franciscana Ribeiro Cintra:** Engenharia de Software, Desenvolvimento Backend e Documentação.
- **Maria Heloísa Macedo:** Modelagem UML, Desenvolvimento Frontend e Garantia de Qualidade.

**Professor:** Jefferson Brandão  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS)

## Documentação e Modelagem

- [Marco intermediário](./docs/marco_intermediario.md): síntese dos oito entregáveis, roteiro de demonstração e commits.
- [Requisitos do incremento](./docs/requisitos.md): escopo, critérios de aceite e limites da versão demonstrável.
- [Arquitetura](./docs/arquitetura.md): componentes implementados, restrições, execução e manutenção futura.
- [Modelo OO e UML](./docs/uml.md): seis classes conceituais, atributos, operações, relacionamentos e correspondência com o código atual.
- [Requisitos originais](./REQUISITOS.md): levantamento completo do escopo do projeto.
- [Planejamento E2](./docs/PROJETO_ARQUITETURA_E2.md): documento de arquitetura e planejamento elaborado no marco anterior.

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
