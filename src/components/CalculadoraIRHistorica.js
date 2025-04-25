import React, { useState, useEffect } from 'react';
import tabelasIRPF from '../data/tabelasIRPF';

const CalculadoraIRHistorica = () => {
  const [salarioBruto, setSalarioBruto] = useState('');
  const [dependentes, setDependentes] = useState(0);
  const [tabelaSelecionada, setTabelaSelecionada] = useState('2024-2025');
  const [tabelaComparacao, setTabelaComparacao] = useState('');
  const [mostrarComparacao, setMostrarComparacao] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [resultadoComparacao, setResultadoComparacao] = useState(null);

  // Lista de tabelas disponíveis para seleção
  const tabelasDisponiveis = Object.keys(tabelasIRPF).sort().reverse();

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

  // Função para calcular o imposto de renda com base na tabela selecionada
  const calcularImposto = (salario, dependentes, codigoTabela) => {
    if (!salario || !codigoTabela) return null;

    const tabela = tabelasIRPF[codigoTabela];
    if (!tabela) return null;

    // Converte o salário para número
    const salarioNum = Number(salario.replace(/\./g, '').replace(',', '.'));
    
    // Dedução por dependentes
    const deducaoDependentes = dependentes * tabela.deducaoDependente;
    
    // Base de cálculo (salário - dedução por dependentes)
    const baseCalculo = Math.max(0, salarioNum - deducaoDependentes);
    
    // Encontra a faixa de imposto aplicável
    let faixaAplicavel = null;
    for (const faixa of tabela.faixas) {
      if (baseCalculo > faixa.de && baseCalculo <= faixa.ate) {
        faixaAplicavel = faixa;
        break;
      }
    }
    
    // Se não encontrou faixa específica, usa a última (para valores acima do último limite)
    if (!faixaAplicavel && baseCalculo > 0) {
      faixaAplicavel = tabela.faixas[tabela.faixas.length - 1];
    }
    
    // Calcula o imposto
    let imposto = 0;
    let aliquotaEfetiva = 0;
    
    if (faixaAplicavel) {
      imposto = (baseCalculo * faixaAplicavel.aliquota / 100) - faixaAplicavel.deducao;
      imposto = Math.max(0, imposto); // Imposto não pode ser negativo
      aliquotaEfetiva = (imposto / salarioNum) * 100;
    }
    
    return {
      salarioBruto: salarioNum,
      baseCalculo,
      aliquota: faixaAplicavel ? faixaAplicavel.aliquota : 0,
      deducaoDependentes,
      imposto,
      salarioLiquido: salarioNum - imposto,
      aliquotaEfetiva,
      tabela: tabela.nome,
      periodo: tabela.periodo
    };
  };

  const calcularImpostos = () => {
    const resultadoPrincipal = calcularImposto(salarioBruto, dependentes, tabelaSelecionada);
    setResultado(resultadoPrincipal);
    
    if (mostrarComparacao && tabelaComparacao) {
      const resultadoComp = calcularImposto(salarioBruto, dependentes, tabelaComparacao);
      setResultadoComparacao(resultadoComp);
    } else {
      setResultadoComparacao(null);
    }
  };

  // Resetar comparação quando o usuário desativa a opção
  useEffect(() => {
    if (!mostrarComparacao) {
      setResultadoComparacao(null);
    }
  }, [mostrarComparacao]);

  return (
    <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Calculadora de Imposto de Renda Histórica</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <label className="block text-gray-700 mb-2">Tabela do IRPF</label>
            <select
              value={tabelaSelecionada}
              onChange={(e) => setTabelaSelecionada(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {tabelasDisponiveis.map((codigo) => (
                <option key={codigo} value={codigo}>
                  {tabelasIRPF[codigo].nome} ({tabelasIRPF[codigo].periodo})
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="mostrarComparacao"
              checked={mostrarComparacao}
              onChange={(e) => setMostrarComparacao(e.target.checked)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-400"
            />
            <label htmlFor="mostrarComparacao" className="ml-2 text-gray-700">
              Comparar com outra tabela
            </label>
          </div>
          
          {mostrarComparacao && (
            <div>
              <label className="block text-gray-700 mb-2">Tabela para Comparação</label>
              <select
                value={tabelaComparacao}
                onChange={(e) => setTabelaComparacao(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Selecione uma tabela</option>
                {tabelasDisponiveis
                  .filter((codigo) => codigo !== tabelaSelecionada)
                  .map((codigo) => (
                    <option key={codigo} value={codigo}>
                      {tabelasIRPF[codigo].nome} ({tabelasIRPF[codigo].periodo})
                    </option>
                  ))}
              </select>
            </div>
          )}
          
          <button
            onClick={calcularImpostos}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Calcular Imposto
          </button>
        </div>
        
        <div>
          {resultado && (
            <div className="p-6 bg-gray-50 rounded-lg space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {resultado.tabela}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{resultado.periodo}</p>
              
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Salário Bruto:</span>
                <span className="text-right font-medium">R$ {resultado.salarioBruto.toFixed(2)}</span>
                
                <span className="text-gray-600">Dedução Dependentes:</span>
                <span className="text-right font-medium">R$ {resultado.deducaoDependentes.toFixed(2)}</span>
                
                <span className="text-gray-600">Base de Cálculo:</span>
                <span className="text-right font-medium">R$ {resultado.baseCalculo.toFixed(2)}</span>
                
                <span className="text-gray-600">Alíquota:</span>
                <span className="text-right font-medium">{resultado.aliquota}%</span>
                
                <span className="text-gray-600">Imposto a Pagar:</span>
                <span className="text-right font-medium text-red-600">R$ {resultado.imposto.toFixed(2)}</span>
                
                <span className="text-gray-600">Alíquota Efetiva:</span>
                <span className="text-right font-medium">{resultado.aliquotaEfetiva.toFixed(2)}%</span>
                
                <span className="text-gray-600 font-semibold">Salário Líquido:</span>
                <span className="text-right font-bold text-green-600">R$ {resultado.salarioLiquido.toFixed(2)}</span>
              </div>
            </div>
          )}
          
          {resultadoComparacao && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {resultadoComparacao.tabela}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{resultadoComparacao.periodo}</p>
              
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Imposto a Pagar:</span>
                <span className="text-right font-medium text-red-600">R$ {resultadoComparacao.imposto.toFixed(2)}</span>
                
                <span className="text-gray-600">Alíquota Efetiva:</span>
                <span className="text-right font-medium">{resultadoComparacao.aliquotaEfetiva.toFixed(2)}%</span>
                
                <span className="text-gray-600 font-semibold">Salário Líquido:</span>
                <span className="text-right font-bold text-green-600">R$ {resultadoComparacao.salarioLiquido.toFixed(2)}</span>
              </div>
              
              {resultado && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h4 className="font-semibold text-gray-800 mb-2">Comparação</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Diferença no Imposto:</span>
                    <span className={`text-right font-medium ${resultado.imposto > resultadoComparacao.imposto ? 'text-green-600' : resultado.imposto < resultadoComparacao.imposto ? 'text-red-600' : ''}`}>
                      R$ {Math.abs(resultado.imposto - resultadoComparacao.imposto).toFixed(2)}
                      {resultado.imposto !== resultadoComparacao.imposto && (
                        resultado.imposto > resultadoComparacao.imposto ? ' (menor)' : ' (maior)'
                      )}
                    </span>
                    
                    <span className="text-gray-600">Diferença no Salário Líquido:</span>
                    <span className={`text-right font-medium ${resultado.salarioLiquido < resultadoComparacao.salarioLiquido ? 'text-green-600' : resultado.salarioLiquido > resultadoComparacao.salarioLiquido ? 'text-red-600' : ''}`}>
                      R$ {Math.abs(resultado.salarioLiquido - resultadoComparacao.salarioLiquido).toFixed(2)}
                      {resultado.salarioLiquido !== resultadoComparacao.salarioLiquido && (
                        resultado.salarioLiquido < resultadoComparacao.salarioLiquido ? ' (maior)' : ' (menor)'
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculadoraIRHistorica;
