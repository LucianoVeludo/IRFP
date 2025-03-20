import React, { useState } from 'react';

const CalculadoraIR = () => {
  const [salario, setSalario] = useState('');
  const [resultado, setResultado] = useState(null);

  // ✅ Cálculo do Imposto de Renda com a tabela ATUAL (2024)
  const calcularImpostoAtual = (salario) => {
    if (salario <= 2259.20) return 0;
    if (salario <= 2826.65) return salario * 0.075 - 169.44;
    if (salario <= 3751.05) return salario * 0.15 - 381.44;
    if (salario <= 4664.68) return salario * 0.225 - 662.77;
    return salario * 0.275 - 896;
  };

  // ✅ Cálculo do Imposto de Renda com a PROPOSTA para 2026
  const calcularImpostoNovo = (salario) => {
    if (salario <= 5000) return 0; // Isento até R$ 5.000

    // Faixa de transição entre 5.000 e 7.000
    if (salario <= 7000) {
      return (salario - 5000) * 0.075; // 7,5% sobre o que ultrapassar R$ 5.000
    }

    if (salario <= 10000) {
      return (salario - 7000) * 0.15 + 150; // 15% sobre o que ultrapassar R$ 7.000, +150 da faixa anterior
    }

    if (salario <= 15000) {
      return (salario - 10000) * 0.225 + 600; // 22,5% sobre o que ultrapassar R$ 10.000, +600 das faixas anteriores
    }

    // Acima de R$ 15.000
    return (salario - 15000) * 0.275 + 1710; // 27,5% sobre o que ultrapassar R$ 15.000, +1710 das faixas anteriores
  };

  const compararImpostos = () => {
    const atual = calcularImpostoAtual(Number(salario));
    const novo = calcularImpostoNovo(Number(salario));
    setResultado({ atual, novo, diferenca: atual - novo });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Calculadora de Imposto de Renda</h1>
      <input
        type="number"
        value={salario}
        onChange={(e) => setSalario(e.target.value)}
        placeholder="Digite seu salário mensal"
        className="border p-2 w-full rounded"
      />
      <button
        onClick={compararImpostos}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Calcular
      </button>

      {resultado && (
        <div className="mt-4">
          <p>📌 **Imposto Atual (2024):** <strong>R$ {resultado.atual.toFixed(2)}</strong></p>
          <p>📌 **Novo Imposto (2026):** <strong>R$ {resultado.novo.toFixed(2)}</strong></p>
          <p className="font-bold">
            📉 Você vai {resultado.diferenca > 0 ? 'economizar' : 'pagar mais'}:
            <strong> R$ {Math.abs(resultado.diferenca).toFixed(2)}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default CalculadoraIR;
