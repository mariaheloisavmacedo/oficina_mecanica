# Projeto de Software — E2: Arquitetura, Modelagem UML e Planejamento

**Projeto:** Oficina Mecânica  
**Instituição:** Centro Universitário UFBRA  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS)  
**Disciplina:** Projeto de Software  
**Docente:** Jefferson Brandão  
**Equipe:** Franciscana Ribeiro Cintra e Maria Heloísa Macedo  
**Data:** 08/11/2026  

---

## 1. Revisão e Correção dos Requisitos (E1)

Durante a revisão do documento inicial (`REQUISITOS.md`), foram sanadas as ambiguidades e ausências de especificação técnica:
- **RF-01 (Clientes):** Estabelecidos campos mandatórios (Nome, CPF/CNPJ, Telefone e E-mail), validação de formato e unicidade de documento.
- **RF-02 (Veículos):** Criação da obrigatoriedade do vínculo estrito a um cliente ativo e validação do formato de placa/matrícula.
- **RF-03 (Ordens de Serviço):** Definição de identificador numérico sequencial único, data/hora de abertura automática e associação obrigatória a veículo já cadastrado.
- **RF-04 (Ciclo de Vida da OS):** Padronização formal da máquina de estados: `Aberta` ➔ `Em Análise` ➔ `Em Execução` ➔ `Concluída` ou `Cancelada`.
- **RF-05 (Serviços Executados):** Suporte à inserção de múltiplos itens por OS, registrando descrição técnica, mecânico responsável, horas despendidas e valor da mão de obra.

---

## 2. Arquitetura de Alto Nível (4 Blocos)

O sistema foi modelado segundo o padrão arquitetural em camadas, dividindo as responsabilidades de forma clara e desacoplada:

```
+-------------------------------------------------------------+
|         Bloco 1: Camada de Apresentação (Frontend)          |
|  - Telas Web Responsivas (Recepção, Oficina e Portal Cliente)|
+-------------------------------------------------------------+
                               |
                               v (HTTP / REST / JSON)
+-------------------------------------------------------------+
|           Bloco 2: Camada de Controle / API (Backend)        |
|  - Roteamento, Autenticação, Validação de Payloads e Sessão  |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|        Bloco 3: Regras de Negócio (Camada de Domínio)       |
|  - Máquina de Estados da OS, Cálculos de Custos e Validações |
+-------------------------------------------------------------+
                               |
                               v (ORM / SQL)
+-------------------------------------------------------------+
|        Bloco 4: Camada de Dados (Persistência)              |
|  - Banco de Dados Relacional (PostgreSQL / SQLite)           |
+-------------------------------------------------------------+
```

### Responsabilidades de Cada Bloco:
1. **Frontend:** Captura comandos dos usuários (atendentes, mecânicos e clientes) e exibe dados formatados.
2. **Backend / API:** Recebe requisições HTTP, protege endpoints de acesso indevido e direciona para a camada de serviços.
3. **Serviços / Domínio:** Aplica as regras de negócio da oficina (ex.: não concluir OS sem serviço registrado, validação de transições de estado).
4. **Persistência de Dados:** Garante a persistência transacional com integridade referencial entre clientes, veículos, OS e itens de serviço.

---

## 3. Diagramas UML

### 3.1 Diagrama de Casos de Uso (Visão Funcional)

```
             +---------------------------------------------------+
             |            Sistema Oficina Mecânica               |
             |                                                   |
 (Atendente) |----> [UC01: Cadastrar e Atualizar Cliente]        |
     |       |----> [UC02: Cadastrar Veículo e Associar Cliente] |
     +------>|----> [UC03: Abertura de Ordem de Serviço (OS)]    |
             |                                                   |
  (Mecânico) |---> [UC04: Consultar Ordens de Serviço Abertas]   |
     |       |---> [UC05: Alterar Status da OS (Execução)]       |
     +------>|---> [UC06: Lançar Serviços Executados e Horas]    |
             |                                                   |
   (Cliente) |---> [UC07: Consultar Andamento da OS por Placa]   |
             |                                                   |
   (Gestor)  |---> [UC08: Visualizar Relatório Operacional da OS]|
             +---------------------------------------------------+
```

### 3.2 Diagrama de Classes de Domínio

```
+------------------------+        1       0..* +------------------------+
|        Cliente         |---------------------|        Veiculo         |
+------------------------+                     +------------------------+
| - id: int              |                     | - id: int              |
| - nome: string         |                     | - placa: string (PK)   |
| - cpf_cnpj: string     |                     | - modelo: string       |
| - telefone: string     |                     | - ano: int             |
| - email: string        |                     | - cliente_id: int (FK) |
+------------------------+                     +------------------------+
                                                           | 1
                                                           | 0..*
+------------------------+        1       1..* +------------------------+
|    ServicoExecutado    |---------------------|     OrdemServico       |
+------------------------+                     +------------------------+
| - id: int              |                     | - numero_os: int (PK)  |
| - ordem_id: int (FK)   |                     | - veiculo_id: int (FK) |
| - descricao: string    |                     | - data_abertura: date  |
| - horas_gastas: float  |                     | - status: StatusOS     |
| - mecanico_nome: string|                     | - defeito_relatado: str|
| - valor_servico: float |                     | - valor_total: float   |
+------------------------+                     +------------------------+
```

---

## 4. Interfaces Principais e Dados Manipulados

| Interface | Usuários Principais | Dados Manipulados e Finalidade |
|---|---|---|
| **Painel de Recepção e Atendimento** | Recepcionistas e Atendentes | Formulários de entrada para Cliente (nome, documento, contato), Veículo (placa, modelo) e criação inicial da OS com o defeito relatado. |
| **Painel da Oficina / Mecânico** | Mecânicos e Líderes Técnicos | Visualização da fila de OS, alteração dos status técnicos (`Em Análise`, `Em Execução`, `Concluída`) e inserção das horas e descrição do serviço efetuado. |
| **Portal de Consulta do Cliente** | Clientes (Proprietários) | Interface de leitura simplificada consultada via número da OS ou placa do veículo, apresentando histórico e status em tempo real. |

---

## 5. Equipe, Recursos e Plano de Gestão

### Equipe do Projeto
- **Franciscana Ribeiro Cintra:** Engenharia de Requisitos, Arquitetura Backend, Modelagem de Dados e Documentação Técnica.
- **Maria Heloísa Macedo:** Modelagem de Diagramas UML, Interfaces Frontend, Validação e Garantia de Qualidade de Software.

### Recursos e Stack Técnica
- **Ambiente de Desenvolvimento:** Visual Studio Code, Git e GitHub.
- **Tecnologias de Implementação:** Python (Backend / API), HTML5/CSS3/JavaScript (Frontend), SQLite/PostgreSQL (Persistência).
- **Ferramentas de Modelagem:** PlantUML, Markdown e Draw.io.

### Matriz de Riscos e Mitigação
1. **Risco 1 — Aumento Descontrolado do Escopo (Scope Creep):** Novas funcionalidades serem exigidas durante a codificação.  
   *Prevenção:* Delimitação rigorosa dos entregáveis da primeira versão em `REQUISITOS.md`, congelando o escopo base.
2. **Risco 2 — Dificuldades Técnicas com a Integração:** Problemas na comunicação entre Frontend e Backend.  
   *Prevenção:* Definição antecipada dos contratos de endpoints REST (JSON) e testes modulares prévios.
3. **Risco 3 — Perda de Código ou Conflitos de Versão:** Falhas locais ou sobreposições de código entre os membros da equipe.  
   *Prevenção:* Utilização contínua de repositório Git remoto (GitHub), commits semânticos atômicos e sincronização diária.

### Estratégia de Acompanhamento
- Reuniões semanais de alinhamento com acompanhamento visual das tarefas através do quadro Kanban do GitHub Projects.
- Revisão em pares (*code review*) via Pull Requests antes de integrar o código na branch principal.