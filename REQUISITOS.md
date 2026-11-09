# Requisitos e Escopo — Oficina Mecânica (Revisão E1/E2)

## 1. Objetivo

Organizar e padronizar o atendimento e o acompanhamento de serviços de uma oficina mecânica, mantendo a integridade e o rastreamento dos dados de clientes e veículos relacionados às ordens de serviço (OS) e aos serviços técnicos executados.

## 2. Usuários, Perfis e Responsabilidades

| Usuário / Perfil | Responsabilidades e Acessos |
|---|---|
| **Clientes (donos dos veículos)** | Consultar o andamento dos serviços do seu veículo em tempo real via código da OS ou placa. |
| **Recepcionistas / Atendentes** | Cadastrar e atualizar dados de clientes e veículos; realizar abertura de novas ordens de serviço e prestar esclarecimentos. |
| **Mecânicos** | Consultar ordens atribuídas/abertas, atualizar o status operacional da OS e lançar os serviços/mão de obra executados. |
| **Gestores / Donos da oficina** | Acompanhar o fluxo integral de atendimentos, consultar métricas de serviços concluídos e gerenciar a operação geral. |

## 3. Escopo da Primeira Versão (v1.0)

### Incluído

- **Gestão Cadastral:** Cadastro completo de clientes (PF/PJ) e veículos, com vínculo relacional obrigatório.
- **Ciclo de Vida da OS:** Abertura formal com número sequencial e controle de status (`Aberta`, `Em Análise`, `Em Execução`, `Concluída`, `Cancelada`).
- **Registro de Serviços:** Lançamento discriminado de cada serviço executado por OS (descrição, mecânico responsável e valor unitário).
- **Cálculo de Faturamento da OS:** Somatório automático de todos os serviços lançados na ordem.
- **Painel de Acompanhamento:** Visão resumida para acompanhamento do status do serviço pelo cliente.

### Fora do Escopo Inicial (Backlog para Versões Futuras)

- Gestão de estoque de peças sobressalentes e insumos.
- Cobrança automatizada, emissão de boletos, links de pagamento ou integração fiscal (NF-e/NFS-e).
- Agendamento prévio com calendário online de vagas.
- Disparo automático de notificações via WhatsApp ou SMS.

## 4. Requisitos Funcionais (Refinados e Desambiguados)

- **RF-01 — Cadastro e Consulta de Clientes:**
  - O sistema deve permitir cadastrar, consultar e atualizar clientes.
  - **Critérios:** Obrigatoriedade de nome completo, CPF/CNPJ (único e validado) e telefone de contato. A busca deve permitir pesquisa por nome ou documento.

- **RF-02 — Cadastro e Associação de Veículos:**
  - O sistema deve permitir cadastrar veículos e associá-los compulsoriamente a um cliente cadastrado (relação de 1 cliente para N veículos).
  - **Critérios:** Obrigatoriedade de placa (única no padrão Mercosul ou clássico), marca, modelo, ano e cor predominante.

- **RF-03 — Abertura de Ordem de Serviço (OS):**
  - O sistema deve permitir a abertura de uma OS para um veículo já cadastrado.
  - **Critérios:** Geração automática de identificador numérico único (código da OS), registro de data/hora de entrada, descrição do defeito/queixa inicial relatada pelo cliente e atribuição do status inicial como `Aberta`.

- **RF-04 — Controle do Ciclo de Vida e Acompanhamento da OS:**
  - O sistema deve permitir a alteração e consulta do status da OS através de máquina de estados predefinida:
    $$\text{Aberta} \longrightarrow \text{Em Análise} \longrightarrow \text{Em Execução} \longrightarrow \text{Concluída}$$
    *(com opção de transição para $\text{Cancelada}$ a qualquer etapa anterior à conclusão)*.
  - **Critérios:** Toda alteração de estado registra data, hora e responsável pela transição.

- **RF-05 — Registro de Serviços Executados:**
  - O sistema deve permitir lançar um ou mais serviços em uma OS aberta ou em execução.
  - **Critérios:** Cada item deve conter descrição do trabalho (ex.: alinhamento, troca de correia), valor da mão de obra e indicação do mecânico responsável.

- **RF-06 — Cálculo do Valor Total:**
  - O sistema deve calcular automaticamente o valor total da OS somando todos os serviços registrados, atualizando o saldo antes do encerramento.

## 5. Requisitos Não Funcionais

- **RNF-01 — Usabilidade e Acessibilidade:** Interfaces de cadastro e atualização de status simplificadas, permitindo operação rápida em balcão de atendimento e painéis limpos em tablets/estações no pátio da oficina.
- **RNF-02 — Integridade Referencial:** Não será permitida a exclusão de clientes com veículos cadastrados, nem de veículos que possuam histórico de ordens de serviço vinculadas.
- **RNF-03 — Privacidade e Restrição de Acesso:** O cliente tem acesso de visualização exclusivamente às informações do seu próprio veículo e OS, não tendo visibilidade sobre dados de outros clientes ou faturamento geral da oficina.
- **RNF-04 — Persistência e Segurança:** Utilização de banco de dados relacional com rotinas programadas de backup e integridade de transações.

## 6. Resolução de Premissas e Pendências

- **Equipe:** Franciscana Ribeiro Cintra e Maria Heloísa Macedo (Centro Universitário UFBRA).
- **Ciclo de Estados da OS:** Formalmente mapeado e especificado no item RF-04.
- **Campos Obrigatórios e Perfis:** Mapeados e incorporados nas seções 2 e 4 deste documento.
- **Stack Inicial Recomendada:** Backend em Python/Django ou Node.js, Frontend Web responsivo e banco de dados PostgreSQL/SQLite.