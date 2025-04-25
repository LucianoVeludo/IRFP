import React, { useState } from 'react';

const SimuladorSalarioLiquido = () => {
  const [salarioBruto, setSalarioBruto] = useState('');
  const [dependentes, setDependentes] = useState(0);
  const [outrosDescontos, setOutrosDescontos] = useState('');
  const [outrasRemuneracoes, setOutrasRemuneracoes] = useState('');
  const [resultado, setResultado] = useState(null);

  // Função para formatar o valor em "###.###,##"
  const formatarValor = (valor) => {
    const numeroLimpo = valor.replace(/\D/g, '');
    const numeroFormatado = Number(numeroLimpo) / 100;
    return numeroFormatado.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const handleSalarioChange = (e) => {
    const valorFormatado = formatarValor(e.target.value);
    setSalarioBruto(valorFormatado);
  };

  const handleOutrosDescontosChange = (e) => {
    const valorFormatado = formatarValor(e.target.value);
    setOutrosDescontos(valorFormatado);
  };

  const handleOutrasRemuneracoesChange = (e) => {
    const valorFormatado = formatarValor(e.target.value);
    setOutrasRemuneracoes(valorFormatado);
  };

  const calcularSalarioLiquido = () => {
    // Converte os valores para número
    const salarioNum = Number(salarioBruto.replace(/\./g, '').replace(',', '.'));
    const outrosDescontosNum = outrosDescontos ? Number(outrosDescontos.replace(/\./g, '').replace(',', '.')) : 0;
    const outrasRemuneracoesNum = outrasRemuneracoes ? Number(outrasRemuneracoes.replace(/\./g, '').replace(',', '.')) : 0;
    
    // Base de cálculo para INSS (salário bruto + outras remunerações)
    const baseINSS = salarioNum + outrasRemuneracoesNum;
    
    // Cálculo do INSS
    let descontoINSS = 0;
    
    if (baseINSS <= 1412.00) {
      descontoINSS = baseINSS * 0.075;
    } else if (baseINSS <= 2666.68) {
      descontoINSS = baseINSS * 0.09 - 21.18;
    } else if (baseINSS <= 4000.03) {
      descontoINSS = baseINSS * 0.12 - 101.18;
    } else if (baseINSS <= 7786.02) {
      descontoINSS = baseINSS * 0.14 - 181.18;
    } else {
      descontoINSS = 908.86; // Teto do INSS em 2024
    }
    
    // Dedução por dependente para IRRF
    const deducaoDependentes = dependentes * 189.59; // Valor de dedução por dependente em 2024
    
    // Base de cálculo para IRRF
    const baseIRRF = baseINSS - descontoINSS - deducaoDependentes;
    
    // Cálculo do IRRF
    let descontoIRRF = 0;
    let aliquotaEfetiva = 0;
    
    if (baseIRRF <= 2259.20) {
      descontoIRRF = 0;
      aliquotaEfetiva = 0;
    } else if (baseIRRF <= 2826.65) {
      descontoIRRF = baseIRRF * 0.075 - 169.44;
      aliquotaEfetiva = (descontoIRRF / baseIRRF) * 100;
    } else if (baseIRRF <= 3751.05) {
      descontoIRRF = baseIRRF * 0.15 - 381.44;
      aliquotaEfetiva = (descontoIRRF / baseIRRF) * 100;
    } else if (baseIRRF <= 4664.68) {
      descontoIRRF = baseIRRF * 0.225 - 662.77;
      aliquotaEfetiva = (descontoIRRF / baseIRRF) * 100;
    } else {
      descontoIRRF = baseIRRF * 0.275 - 896.00;
      aliquotaEfetiva = (descontoIRRF / baseIRRF) * 100;
    }
    
    // Cálculo do FGTS (8% sobre o salário bruto)
    const fgts = baseINSS * 0.08;
    
    // Total de descontos
    const totalDescontos = descontoINSS + descontoIRRF + outrosDescontosNum;
    
    // Salário líquido
    const salarioLiquido = baseINSS - totalDescontos;
    
    // Percentual de descontos sobre o salário bruto
    const percentualDescontos = (totalDescontos / baseINSS) * 100;
    
    setResultado({
      salarioBruto: baseINSS,
      descontoINSS,
      descontoIRRF,
      outrosDescontosNum,
      totalDescontos,
      salarioLiquido,
      percentualDescontos,
      fgts,
      aliquotaEfetiva
    });
  };

  return (
    <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Simulador de Salário Líquido</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Salário Bruto (R$)</label>
          <input
            type="text"
            value={salarioBruto}
            onChange={handleSalarioChange}
            placeholder="0,00"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Número de Dependentes</label>
          <input
            type="number"
            min="0"
            value={dependentes}
            onChange={(e) => setDependentes(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Outras Remunerações (R$)</label>
          <input
            type="text"
            value={outrasRemuneracoes}
            onChange={handleOutrasRemuneracoesChange}
            placeholder="0,00"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Outros Descontos (R$)</label>
          <input
            type="text"
            value={outrosDescontos}
            onChange={handleOutrosDescontosChange}
            placeholder="0,00"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        
        <button
          onClick={calcularSalarioLiquido}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Calcular Salário Líquido
        </button>
      </div>
      
      {resultado && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Resultado</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Salário Bruto:</span>
            <span className="text-right font-medium">R$ {resultado.salarioBruto.toFixed(2)}</span>
            
            <span className="text-gray-600">Desconto INSS:</span>
            <span className="text-right font-medium text-red-600">- R$ {resultado.descontoINSS.toFixed(2)}</span>
            
            <span className="text-gray-600">Desconto IRRF:</span>
            <span className="text-right font-medium text-red-600">- R$ {resultado.descontoIRRF.toFixed(2)}</span>
            
            {resultado.outrosDescontosNum > 0 && (
              <>
                <span className="text-gray-600">Outros Descontos:</span>
                <span className="text-right font-medium text-red-600">- R$ {resultado.outrosDescontosNum.toFixed(2)}</span>
              </>
            )}
            
            <span className="text-gray-600">Total Descontos:</span>
            <span className="text-right font-medium text-red-600">R$ {resultado.totalDescontos.toFixed(2)} ({resultado.percentualDescontos.toFixed(2)}%)</span>
            
            <span className="text-gray-600 font-semibold">Salário Líquido:</span>
            <span className="text-right font-bold text-green-600">R$ {resultado.salarioLiquido.toFixed(2)}</span>
            
            <div className="col-span-2 border-t border-gray-300 my-2"></div>
            
            <span className="text-gray-600">FGTS (não descontado):</span>
            <span className="text-right font-medium text-blue-600">R$ {resultado.fgts.toFixed(2)}</span>
            
            <span className="text-gray-600">Alíquota Efetiva IR:</span>
            <span className="text-right font-medium">{resultado.aliquotaEfetiva.toFixed(2)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimuladorSalarioLiquido;
