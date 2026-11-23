import unittest

from sistema_oficina import HistoricoStatus, OrdemServico


class HistoricoStatusTest(unittest.TestCase):
    def test_guarda_status_mensagem_e_data(self):
        registro = HistoricoStatus("Em Reparo", "O diagnóstico foi concluído.")

        self.assertEqual(registro.status_novo, "Em Reparo")
        self.assertEqual(registro.mensagem_enviada, "O diagnóstico foi concluído.")
        self.assertRegex(registro.data_hora, r"^\d{2}/\d{2}/\d{4} \d{2}:\d{2}:\d{2}$")


class OrdemServicoTest(unittest.TestCase):
    def setUp(self):
        self.ordem = OrdemServico(
            numero_os=101,
            cliente_nome="Maria Souza",
            veiculo_placa="ABC-1234",
        )

    def test_abertura_cria_status_e_historico_inicial(self):
        self.assertEqual(self.ordem.status_atual, "Aguardando Inspeção")
        self.assertEqual(len(self.ordem.historico), 1)
        self.assertEqual(self.ordem.historico[0].status_novo, "Aguardando Inspeção")

    def test_atualizacoes_sao_registradas_em_ordem(self):
        self.ordem.atualizar_status("Em Reparo", "Diagnóstico concluído.")
        self.ordem.atualizar_status("Pronto", "Veículo liberado para retirada.")

        self.assertEqual(self.ordem.status_atual, "Pronto")
        self.assertEqual(
            [item.status_novo for item in self.ordem.historico],
            ["Aguardando Inspeção", "Em Reparo", "Pronto"],
        )

    def test_painel_mostra_numero_cliente_e_placa(self):
        painel = (
            f"Status Atual da OS #{self.ordem.numero_os}: "
            f"{self.ordem.status_atual}"
        )

        self.assertIn("101", painel)
        self.assertIn("Aguardando Inspeção", painel)


if __name__ == "__main__":
    unittest.main()
