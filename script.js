let saldo = 1000;
const historico = ["Abertura da conta: R$ 1.000,00"];

const saldoNaTela = document.getElementById("saldo");
const operacao = document.getElementById("operacao");
const campoValor = document.getElementById("valor");
const resultado = document.getElementById("resultado");

function emReais(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

document.getElementById("executar").addEventListener("click", function () {
  const textoValor = campoValor.value.trim();
  const valor = Number(textoValor);
  let mensagem = "";

  switch (operacao.value) {
    case "consultar":
      mensagem = "Saldo disponível: " + emReais(saldo);
      break;

    case "depositar":
      if (textoValor === "" || !Number.isInteger(valor) || valor <= 0) {
        mensagem = "Erro: digite um valor inteiro maior que zero.";
      } else {
        saldo += valor;
        historico.push("Depósito: +" + emReais(valor));
        mensagem = "Depósito realizado! Novo saldo: " + emReais(saldo);
        saldoNaTela.textContent = emReais(saldo);
      }
      break;

    case "sacar":
      if (textoValor === "" || !Number.isInteger(valor) || valor <= 0) {
        mensagem = "Erro: digite um valor inteiro maior que zero.";
      } else if (valor % 10 !== 0) {
        mensagem = "Erro: o saque deve ser múltiplo de 10.";
      } else if (valor > saldo) {
        mensagem = "Erro: saldo insuficiente.";
      } else {
        let restante = valor;
        let notas100 = 0;
        let notas50 = 0;
        let notas20 = 0;
        let notas10 = 0;

        while (restante >= 100) {
          notas100++;
          restante -= 100;
        }
        while (restante >= 50) {
          notas50++;
          restante -= 50;
        }
        while (restante >= 20) {
          notas20++;
          restante -= 20;
        }
        while (restante >= 10) {
          notas10++;
          restante -= 10;
        }

        saldo -= valor;
        historico.push("Saque: -" + emReais(valor));
        saldoNaTela.textContent = emReais(saldo);
        mensagem = "Saque de " + emReais(valor) + " realizado!\n" +
          "Notas de R$ 100: " + notas100 + "\n" +
          "Notas de R$ 50: " + notas50 + "\n" +
          "Notas de R$ 20: " + notas20 + "\n" +
          "Notas de R$ 10: " + notas10 + "\n" +
          "Total de notas: " + (notas100 + notas50 + notas20 + notas10) + "\n" +
          "Saldo restante: " + emReais(saldo);
      }
      break;

    case "extrato":
      mensagem = "EXTRATO\n";
      for (let i = 0; i < historico.length; i++) {
        mensagem += (i + 1) + ". " + historico[i] + "\n";
      }
      mensagem += "Saldo atual: " + emReais(saldo);
      break;
  }

  resultado.textContent = mensagem;
});
