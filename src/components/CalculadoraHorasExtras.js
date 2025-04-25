import React, { useState } from 'react';

const CalculadoraHorasExtras = () => {
  const [salarioBruto, setSalarioBruto] = useState('');
  const [horasMensais, setHorasMensais] = useState(220);
  const [horasExtras50, setHorasExtras50] = useState(0);
  const [horasExtras100, setHorasExtras100] = useState(0);
  const [horasNoturnas, setHorasNoturnas] = useState(0);
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

  const calcularHorasExtras = () => {
    // Converte o salário para número
    const salarioNum = Number(salarioBruto.replace(/\./g, '').replace(',', '.'));
    
    // Valor da hora normal
    const valorHora = salarioNum / horasMensais;
    
    // Valor das horas extras 50%
    const valorHoraExtra50 = valorHora * 1.5;
    const totalHorasExtras50 = valorHoraExtra50 * horasExtras50;
    
    // Valor das horas extras 100%
    const valorHoraExtra100 = valorHora * 2;
    const totalHorasExtras100 = valorHoraExtra100 * horasExtras100;
    
    // Valor do adicional noturno (20% sobre a hora normal)
    const valorHoraNoturna = valorHora * 1.2;
    const totalHorasNoturnas = valorHoraNoturna * horasNoturnas;
    const adicionalNoturno = totalHorasNoturnas - (valorHora * horasNoturnas);
    
    // Total de adicionais
    const totalAdicionais = totalHorasExtras50 + totalHorasExtras100 + adicionalNoturno;
    
    // Reflexos no DSR (Descanso Semanal Remunerado) - considerando 30 dias no mês e 26 dias úteis
    const diasUteis = 26;
    const diasDescanso = 4; // 30 - 26
    const reflexoDSR = totalAdicionais * (diasDescanso / diasUteis);
    
    // Total geral
    const totalGeral = totalAdicionais + reflexoDSR;
    
    setResultado({
      valorHora,
      valorHoraExtra50,
      totalHorasExtras50,
      valorHoraExtra100,
      totalHorasExtras100,
      valorHoraNoturna,
      totalHorasNoturnas,
      adicionalNoturno,
      totalAdicionais,
      reflexoDSR,
      totalGeral
    });
  };

  return (
    <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Calculadora de Horas Extras e Adicional Noturno</h2>
      
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
          <label className="block text-gray-700 mb-2">Jornada Mensal (horas)</label>
          <select
            value={horasMensais}
            onChange={(e) => setHorasMensais(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value={220}>220 horas (44h semanais)</option>
            <option value={200}>200 horas (40h semanais)</option>
            <option value={180}>180 horas (36h semanais)</option>
            <option value={150}>150 horas (30h semanais)</option>
            <option value={120}>120 horas (24h semanais)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Horas Extras 50% (horas)</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={horasExtras50}
            onChange={(e) => setHorasExtras50(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Horas Extras 100% (domingos/feriados)</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={horasExtras100}
            onChange={(e) => setHorasExtras100(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Horas Noturnas (22h às 5h)</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={horasNoturnas}
            onChange={(e) => setHorasNoturnas(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        
        <button
          onClick={calcularHorasExtras}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Calcular Adicionais
        </button>
      </div>
      
      {resultado && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Resultado</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Valor Hora Normal:</span>
            <span className="text-right font-medium">R$ {resultado.valorHora.toFixed(2)}</span>
            
            <span className="text-gray-600">Valor Hora Extra 50%:</span>
            <span className="text-right font-medium">R$ {resultado.valorHoraExtra50.toFixed(2)}</span>
            
            <span className="text-gray-600">Total Horas Extras 50%:</span>
            <span className="text-right font-medium">R$ {resultado.totalHorasExtras50.toFixed(2)}</span>
            
            <span className="text-gray-600">Valor Hora Extra 100%:</span>
            <span className="text-right font-medium">R$ {resultado.valorHoraExtra100.toFixed(2)}</span>
            
            <span className="text-gray-600">Total Horas Extras 100%:</span>
            <span className="text-right font-medium">R$ {resultado.totalHorasExtras100.toFixed(2)}</span>
            
            <span className="text-gray-600">Valor Hora Noturna:</span>
            <span className="text-right font-medium">R$ {resultado.valorHoraNoturna.toFixed(2)}</span>
            
            <span className="text-gray-600">Adicional Noturno:</span>
            <span className="text-right font-medium">R$ {resultado.adicionalNoturno.toFixed(2)}</span>
            
            <span className="text-gray-600">Total Adicionais:</span>
            <span className="text-right font-medium">R$ {resultado.totalAdicionais.toFixed(2)}</span>
            
            <span className="text-gray-600">Reflexo no DSR:</span>
            <span className="text-right font-medium">R$ {resultado.reflexoDSR.toFixed(2)}</span>
            
            <span className="text-gray-600 font-semibold">Total a Receber:</span>
            <span className="text-right font-bold text-green-600">R$ {resultado.totalGeral.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculadoraHorasExtras;
