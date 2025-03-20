import React, { useState } from 'react';

          const ImpostoRendaCalculator = () => {
            const [salario, setSalario] = useState('');
            const [resultado, setResultado] = useState(null);

            const calcularImpostoAtual = (salario) => {
              if (salario <= 2259.20) return 0;
              if (salario <= 2826.65) return salario * 0.075 - 169.44;
              if (salario <= 3751.05) return salario * 0.15 - 381.44;
              if (salario <= 4664.68) return salario * 0.225 - 662.77;
              return salario * 0.275 - 896;
            };

function CalculadoraIR() {
  return (
      <div>
          <h1>Calculadora de Imposto de Renda 2026</h1>

            const calcularImpostoNovo = (salario) => {
              if (salario <= 5000) return 0;
              if (salario <= 7000) {
                const desconto = (7000 - salario) / 2000;
                return (salario * 0.15) * (1 - desconto);
              }
              if (salario <= 4664.68) return salario * 0.225 - 662.77;
              return salario * 0.275 - 896;
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
                    <p>Imposto Atual: R$ {resultado.atual.toFixed(2)}</p>
                    <p>Novo Imposto (2026): R$ {resultado.novo.toFixed(2)}</p>
                    <p className="font-bold">
                      Você vai {resultado.diferenca > 0 ? 'economizar' : 'pagar mais'}: R${' '}
                      {Math.abs(resultado.diferenca).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            );
          };
        </div>
    );
}

export default CalculadoraIR;
