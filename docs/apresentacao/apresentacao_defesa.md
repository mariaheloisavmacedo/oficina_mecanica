# Roteiro de Apresentação — Versão 1.0

## Sequência sugerida

1. **Problema e objetivo (1–2 min)**
   - Falta de acompanhamento claro da oficina.
   - Clientes, atendentes, mecânicos e gestor.

2. **Modelo de processo e incrementos (2 min)**
   - Modelo incremental.
   - MVP Python, painel web, modelagem estruturada e evolução controlada.

3. **Requisitos e escopo (2 min)**
   - RF-01 a RF-08.
   - Cadastro, OS, status, itens, total e consulta.

4. **Diagrama de contexto e DFD (3 min)**
   - Mostrar atores externos.
   - Mostrar processos 1.0 a 6.0 e armazenamentos D1 a D5.

5. **UML e dicionário (3 min)**
   - Apresentar seis classes conceituais.
   - Explicar correspondência parcial com o código atual.

6. **Demonstração do sistema (5–7 min)**
   - Executar `python3 sistema_oficina.py`.
   - Abrir o painel web e cadastrar dados fictícios.
   - Criar OS e lançar item.
   - Atualizar status e mostrar histórico.
   - Consultar por número ou placa.

7. **Testes e correções (2–3 min)**
   - Executar os quatro testes unitários.
   - Apresentar BUG-01, BUG-02 e correções no DFD.

8. **Segurança e riscos (2 min)**
   - Dados sensíveis e ausência de autenticação.
   - `localStorage`, sem banco ou backup.
   - WhatsApp não integrado.
   - Riscos futuros e tratamentos planejados.

9. **Git, changelog e release (1–2 min)**
   - Branch utilizada.
   - Commits significativos.
   - Tag `v1.0-final`.
   - CHANGELOG.

10. **Conclusão e próximos passos (1 min)**
   - Entregas concluídas no MVP.
   - Evoluções previstas para autenticação, banco e notificações reais.

## Comandos para demonstração

```bash
python3 sistema_oficina.py
python3 -m unittest discover -s tests -v
python3 -m http.server 8000
```

Endereço: `http://localhost:8000`.

## Perguntas esperadas

- Por que incremental?
- Qual é a diferença entre modelo conceitual e implementação?
- Por que o WhatsApp não está integrado?
- Por que o sistema usa `localStorage`?
- Como o histórico registra as alterações?
- Como o total da OS é calculado?
- Quais partes são inseguras em produção?
- O que será feito na próxima versão?
