# Evidências de Testes — Versão 1.0

## Comandos executados

```bash
python3 sistema_oficina.py
python3 -m unittest discover -s tests -v
python3 -m http.server 8000
```

## Evidência unitária registrada

Comando:

```text
python3 -m unittest discover -s tests -v
```

Resultado observado:

```text
Ran 4 tests
OK
```

Casos aprovados:

- Registro de status, mensagem e data/hora.
- Criação da OS com histórico inicial.
- Atualização sequencial até `Pronto`.
- Identificação do número e status no painel demonstrativo.

## Evidência do MVP Python

Fluxo observado no terminal:

1. Impressão de `Aguardando Inspeção`.
2. Impressão da mensagem de entrada da OS.
3. Atualização para `Em Reparo`.
4. Atualização para `Pronto`.
5. Exibição cronológica completa no painel da OS.

## Evidências sugeridas no relatório

- Captura do terminal durante a execução Python.
- Captura da execução dos testes com `OK`.
- Captura do cadastro fictício no painel web.
- Captura da abertura da OS.
- Captura do lançamento do item e total recalculado.
- Captura da máquina de estados.
- Captura da consulta por número ou placa.
- Captura do histórico de status.
- Captura da página de GitHub com commits e tag.

## Evidências negativas ou limitações

- Não existe demonstração real de login.
- Não existe demonstração real de banco relacional.
- Não existe envio real pelo WhatsApp.
- Não existe consulta autenticada privada do cliente.

Essas limitações devem ser apresentadas como pendências da produção, não como requisitos já implementados.
