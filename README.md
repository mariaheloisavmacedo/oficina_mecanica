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

- [REQUISITOS.md](./REQUISITOS.md): Requisitos funcionais e não funcionais revisados (E1 corrigido).
- [PROJETO_ARQUITETURA_E2.md](./docs/PROJETO_ARQUITETURA_E2.md): Detalhamento da arquitetura em 4 blocos, Diagramas UML (Casos de Uso e Classes), interfaces e matriz de riscos.