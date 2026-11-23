# Análise Básica de Segurança

## Objetivo

Identificar dados sensíveis, riscos de acesso, validações existentes e riscos residuais da versão 1.0.

## Dados sensíveis

| Dados | Sensibilidade | Estado atual | Medida necessária |
|---|---|---|---|
| Nome e telefone do cliente | Dados pessoais | Armazenados no `localStorage` sem criptografia | Evitar dados reais em demonstrações; usar banco protegido em produção. |
| CPF/CNPJ | Dado pessoal sensível | Número armazenado após validação | Não coletar em demonstração; cifrar ou restringir acesso em produção. |
| Placa e veículo | Dados associados ao proprietário | Armazenados no navegador | Restringir consulta e aplicar controle de acesso. |
| Histórico da OS | Pode revelar informações do veículo e cliente | Armazenado junto a todos os dados locais | Separar por usuário/perfil em banco protegido. |
| Mensagem simulada | Conteúdo preparado para o cliente | Exibido e armazenado localmente | Não transmitir sem consentimento ou canal seguro. |

## Autenticação e autorização

- O MVP não possui login, senha, sessão ou perfis.
- Qualquer pessoa que tiver acesso ao navegador pode alterar os dados armazenados.
- A consulta por OS ou placa não autentica o cliente e não aplica restrição por propriedade.
- A separação conceitual entre cliente, atendente, mecânico e gestor existe nos requisitos, mas não foi implementada como controle técnico.

**Risco:** crítico em ambiente real. **Tratamento futuro:** autenticação, perfis, autorização por endpoint/tela e registro de usuário responsável.

## Validação de entradas

Implementados:

- Validação de CPF/CNPJ com cálculo dos dígitos verificadores.
- Validação de formato clássico ou Mercosul da placa.
- Impedimento de CPF/CNPJ duplicado.
- Impedimento de placa duplicada.
- Campos obrigatórios em formulários HTML.
- Impedimento de concluir OS sem item.

Pontos de melhoria:

- Sanitização segura antes de persistência em banco.
- Limites explícitos para todos os campos no backend.
- Validação da placa também no servidor quando houver API.
- Proteção contra repetição automatizada ou abuso da consulta.

## Segredos e credenciais

- Não existem credenciais ou integrações externas configuradas no MVP.
- Não há chave de WhatsApp, token, senha ou segredo versionado.
- Os dados do navegador não são criptografados.

**Regra:** nunca adicionar chaves reais ao GitHub. Um futuro envio por WhatsApp deve usar variáveis de ambiente, cofre de segredos e armazenamento seguro no servidor.

## Dependências

- O painel web não usa pacotes externos além de recursos de navegador, apesar da fonte externa CSS remota. Para uso offline confiável, essa fonte pode ser removida ou hospedada localmente.
- O MVP Python usa somente bibliotecas padrão.
- Os testes usam `unittest`, disponível na biblioteca padrão do Python.

**Risco residual:** baixa probabilidade de vulnerabilidade por dependências externas neste MVP, mas deve ser feita revisão em cada atualização futura.

## Backup e integridade

- O `localStorage` é específico do navegador e pode ser apagado pelo usuário.
- Não existe backup, transação ou banco relacional.
- Não existem exclusões protegidas por integridade referencial no banco.

**Tratamento futuro:** banco relacional, chave estrangeira, transações, backup automatizado e rotina de recuperação.

## Riscos residuais

| Risco | Probabilidade | Impacto | Nível | Tratamento |
|---|---|---|---|---|
| Uso indevido de dados locais | Média | Alto | Alto | Não usar dados reais; migrar para autenticação e banco seguro. |
| Alteração manual dos dados pelo usuário | Alta | Alto | Alto | Implementar backend autoritativo e controle de acesso. |
| Consulta de OS por terceiros | Média | Alto | Alto | Associar consulta autenticada ao cliente correto. |
| Perda de dados por apagar navegador | Média | Médio | Médio | Backup, banco compartilhado e exportação. |
| Vazamento de credenciais futuras | Baixa | Alto | Médio/Alto | Variáveis de ambiente, cofre e rotação de chave. |

## Conclusão

A versão 1.0 é adequada como demonstração acadêmica, mas não deve ser publicada com dados reais. Os principais controles ausentes são autenticação, autorização, backend protegido e banco com backup. Esses itens integram o planejamento da versão futura.
