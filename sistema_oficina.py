from datetime import datetime


class HistoricoStatus:
    def __init__(self, status_novo, mensagem):
        self.data_hora = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        self.status_novo = status_novo
        self.mensagem_enviada = mensagem

    def exibir(self):
        return f"[{self.data_hora}] {self.status_novo} - Mensagem: {self.mensagem_enviada}"


class OrdemServico:
    def __init__(self, numero_os, cliente_nome, veiculo_placa):
        self.numero_os = numero_os
        self.cliente_nome = cliente_nome
        self.veiculo_placa = veiculo_placa
        self.status_atual = "Aguardando Inspeção"
        self.valor_total = 0.0
        self.historico = []

        self.atualizar_status(
            "Aguardando Inspeção",
            "O veículo deu entrada na oficina.",
        )

    def atualizar_status(self, novo_status, mensagem):
        self.status_atual = novo_status
        registro = HistoricoStatus(novo_status, mensagem)
        self.historico.append(registro)
        print(
            f"--> [DEMONSTRAÇÃO] Mensagem preparada para {self.cliente_nome}: "
            f"'{mensagem}'"
        )

    def exibir_painel_cliente(self):
        print(
            f"\n=== PAINEL DO CLIENTE: {self.cliente_nome} "
            f"| Veículo: {self.veiculo_placa} ==="
        )
        print(f"Status Atual da OS #{self.numero_os}: {self.status_atual}")
        print("Histórico de Atualizações:")
        for registro in self.historico:
            print(f"  {registro.exibir()}")
        print("=" * 72 + "\n")


if __name__ == "__main__":
    print("--- INICIANDO SISTEMA DA OFICINA ---")

    ordem = OrdemServico(
        numero_os=101,
        cliente_nome="Maria Souza",
        veiculo_placa="ABC-1234",
    )
    ordem.exibir_painel_cliente()

    ordem.atualizar_status(
        "Em Reparo",
        "O diagnóstico foi concluído. Iniciamos o conserto e a troca das peças.",
    )
    ordem.atualizar_status(
        "Pronto",
        "Serviço finalizado! O seu veículo já está pronto para retirada na recepção.",
    )

    ordem.exibir_painel_cliente()
