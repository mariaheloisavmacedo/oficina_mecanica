# Requisitos — Oficina Mecânica

**Marco:** intermediário / primeiro incremento funcional
**Equipe:** Franciscana Ribeiro Cintra e Maria Heloísa Macedo
**Instituição:** Centro Universitário UFBRA

Este documento consolida o escopo do incremento implementado. O levantamento original e o escopo completo permanecem em [REQUISITOS.md](../REQUISITOS.md).

## Objetivo

Registrar clientes e veículos e acompanhar o atendimento da oficina por ordens de serviço (OS), desde a abertura até a conclusão ou o cancelamento.

## Atores

| Ator | Responsabilidade no sistema |
|---|---|
| Atendente | Cadastrar cliente e veículo e abrir OS. |
| Mecânico | Consultar OS, lançar mão de obra e avançar o status. |
| Gestor | Acompanhar a fila, os totais e as OS concluídas. |
| Cliente | Consultar o status de uma OS pelo número ou placa. |

## Requisitos funcionais

| ID | Requisito | Critério de aceite no incremento |
|---|---|---|
| RF-01 | Cadastrar cliente com nome, CPF/CNPJ e telefone. | CPF/CNPJ passa pela validação dos dígitos verificadores e não pode repetir no armazenamento local. |
| RF-02 | Cadastrar veículo associado a um cliente. | Placa única no formato clássico (`ABC1234`) ou Mercosul (`ABC1D23`); marca, modelo, ano e cor são obrigatórios. |
| RF-03 | Abrir OS para veículo cadastrado. | A aplicação atribui número sequencial, data/hora de abertura, queixa e status inicial `Aberta`. |
| RF-04 | Consultar e atualizar status da OS. | No painel web: `Aberta` → `Em Análise` → `Em Execução` → `Concluída`, com opção de cancelamento antes da conclusão. No MVP de terminal equivalente à tag da Maria: `Aguardando Inspeção` → `Em Reparo` → `Pronto`. Cada atualização demonstrada registra data/hora e mensagem. |
| RF-05 | Lançar mão de obra na OS. | Cada item contém descrição e valor; a OS identifica o mecânico responsável. No protótipo atual, o nome do mecânico é informado em cada serviço; o cadastro e a associação por matrícula previstos no UML ficam para o próximo incremento. |
| RF-06 | Calcular o total da OS. | Total exibido corresponde à soma dos serviços, atualizada após cada lançamento. |
| RF-07 | Acompanhar a operação e localizar uma OS. | Painel resume ordens abertas, em execução e concluídas; busca aceita número da OS ou placa. |
| RF-08 | Preparar uma atualização para o cliente quando o status mudar. | A mensagem simulada, o status, a data/hora e o responsável ficam registrados no histórico da OS. |

## Requisitos não funcionais e limites deste incremento

- Interface responsiva para uso em computador, tablet e celular.
- Dados persistidos em `localStorage` do navegador atual; não há banco de dados ou sincronização entre dispositivos.
- O protótipo não implementa login, autorização por perfil, portal privado do cliente, cópia de segurança ou proteção adequada para dados pessoais.
- Não usar dados reais de clientes nesta versão. A validação de documento verifica formato e dígitos verificadores, não substituindo validação cadastral oficial.
- Estoque, pagamentos, emissão fiscal, agendamento e envio real de notificações permanecem fora do escopo. A interface apenas registra uma mensagem simulada por mudança de status; integração com WhatsApp fica para uma manutenção evolutiva futura.

## Critérios de demonstração

1. Cadastrar um cliente e veículo com dados válidos; rejeitar documento inválido e placa duplicada ou fora do padrão.
2. Abrir uma OS e consultar seu número e status inicial na fila.
3. Lançar um serviço e confirmar que o total da OS foi recalculado.
4. Avançar o status na ordem permitida, confirmar mensagem simulada e responsável no histórico e impedir conclusão sem serviço.
5. Localizar a OS por número ou placa e confirmar que os dados continuam após recarregar a página no mesmo navegador.