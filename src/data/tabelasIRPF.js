// Dados históricos das tabelas de IRPF
// Fonte: https://www.yahii.com.br/IRhistorico.html

const tabelasIRPF = {
  "2024-2025": {
    nome: "Tabela IRPF 2024-2025",
    periodo: "02/2024 a 04/2025",
    faixas: [
      { de: 0, ate: 2259.20, aliquota: 0, deducao: 0 },
      { de: 2259.21, ate: 2826.65, aliquota: 7.5, deducao: 169.44 },
      { de: 2826.66, ate: 3751.05, aliquota: 15, deducao: 381.44 },
      { de: 3751.06, ate: 4664.68, aliquota: 22.5, deducao: 662.77 },
      { de: 4664.69, ate: Infinity, aliquota: 27.5, deducao: 896.00 }
    ],
    deducaoDependente: 189.59
  },
  "2023-2024": {
    nome: "Tabela IRPF 2023-2024",
    periodo: "05/2023 a 01/2024",
    faixas: [
      { de: 0, ate: 2112.00, aliquota: 0, deducao: 0 },
      { de: 2112.01, ate: 2826.65, aliquota: 7.5, deducao: 158.40 },
      { de: 2826.66, ate: 3751.05, aliquota: 15, deducao: 370.40 },
      { de: 3751.06, ate: 4664.68, aliquota: 22.5, deducao: 651.73 },
      { de: 4664.69, ate: Infinity, aliquota: 27.5, deducao: 884.96 }
    ],
    deducaoDependente: 189.59
  },
  "2015-2023": {
    nome: "Tabela IRPF 2015-2023",
    periodo: "04/2015 a 04/2023",
    faixas: [
      { de: 0, ate: 1903.98, aliquota: 0, deducao: 0 },
      { de: 1903.99, ate: 2826.65, aliquota: 7.5, deducao: 142.80 },
      { de: 2826.66, ate: 3751.05, aliquota: 15, deducao: 354.80 },
      { de: 3751.06, ate: 4664.68, aliquota: 22.5, deducao: 636.13 },
      { de: 4664.69, ate: Infinity, aliquota: 27.5, deducao: 869.36 }
    ],
    deducaoDependente: 189.59
  },
  "2014-2015": {
    nome: "Tabela IRPF 2014-2015",
    periodo: "01/2014 a 03/2015",
    faixas: [
      { de: 0, ate: 1787.77, aliquota: 0, deducao: 0 },
      { de: 1787.78, ate: 2679.29, aliquota: 7.5, deducao: 134.08 },
      { de: 2679.30, ate: 3572.43, aliquota: 15, deducao: 335.03 },
      { de: 3572.44, ate: 4463.81, aliquota: 22.5, deducao: 602.96 },
      { de: 4463.82, ate: Infinity, aliquota: 27.5, deducao: 826.15 }
    ],
    deducaoDependente: 179.71
  },
  "2013": {
    nome: "Tabela IRPF 2013",
    periodo: "01/2013 a 12/2013",
    faixas: [
      { de: 0, ate: 1710.78, aliquota: 0, deducao: 0 },
      { de: 1710.79, ate: 2563.91, aliquota: 7.5, deducao: 128.31 },
      { de: 2563.92, ate: 3418.59, aliquota: 15, deducao: 320.60 },
      { de: 3418.60, ate: 4271.59, aliquota: 22.5, deducao: 577.00 },
      { de: 4271.60, ate: Infinity, aliquota: 27.5, deducao: 790.58 }
    ],
    deducaoDependente: 171.97
  },
  "2012": {
    nome: "Tabela IRPF 2012",
    periodo: "01/2012 a 12/2012",
    faixas: [
      { de: 0, ate: 1637.11, aliquota: 0, deducao: 0 },
      { de: 1637.12, ate: 2453.50, aliquota: 7.5, deducao: 122.78 },
      { de: 2453.51, ate: 3271.38, aliquota: 15, deducao: 306.80 },
      { de: 3271.39, ate: 4087.65, aliquota: 22.5, deducao: 552.15 },
      { de: 4087.66, ate: Infinity, aliquota: 27.5, deducao: 756.53 }
    ],
    deducaoDependente: 164.56
  },
  "2011": {
    nome: "Tabela IRPF 2011",
    periodo: "04/2011 a 12/2011",
    faixas: [
      { de: 0, ate: 1566.61, aliquota: 0, deducao: 0 },
      { de: 1566.62, ate: 2347.85, aliquota: 7.5, deducao: 117.49 },
      { de: 2347.86, ate: 3130.51, aliquota: 15, deducao: 293.58 },
      { de: 3130.52, ate: 3911.63, aliquota: 22.5, deducao: 528.37 },
      { de: 3911.64, ate: Infinity, aliquota: 27.5, deducao: 723.95 }
    ],
    deducaoDependente: 157.47
  },
  "2010-2011": {
    nome: "Tabela IRPF 2010-2011",
    periodo: "01/2010 a 03/2011",
    faixas: [
      { de: 0, ate: 1499.15, aliquota: 0, deducao: 0 },
      { de: 1499.16, ate: 2246.75, aliquota: 7.5, deducao: 112.43 },
      { de: 2246.76, ate: 2995.70, aliquota: 15, deducao: 280.94 },
      { de: 2995.71, ate: 3743.19, aliquota: 22.5, deducao: 505.62 },
      { de: 3743.20, ate: Infinity, aliquota: 27.5, deducao: 692.78 }
    ],
    deducaoDependente: 150.69
  },
  "2009": {
    nome: "Tabela IRPF 2009",
    periodo: "01/2009 a 12/2009",
    faixas: [
      { de: 0, ate: 1434.59, aliquota: 0, deducao: 0 },
      { de: 1434.60, ate: 2150.00, aliquota: 7.5, deducao: 107.59 },
      { de: 2150.01, ate: 2866.70, aliquota: 15, deducao: 268.84 },
      { de: 2866.71, ate: 3582.00, aliquota: 22.5, deducao: 483.84 },
      { de: 3582.01, ate: Infinity, aliquota: 27.5, deducao: 662.94 }
    ],
    deducaoDependente: 144.20
  },
  "2008": {
    nome: "Tabela IRPF 2008",
    periodo: "01/2008 a 12/2008",
    faixas: [
      { de: 0, ate: 1372.81, aliquota: 0, deducao: 0 },
      { de: 1372.82, ate: 2743.25, aliquota: 15, deducao: 205.92 },
      { de: 2743.26, ate: Infinity, aliquota: 27.5, deducao: 548.82 }
    ],
    deducaoDependente: 137.99
  },
  "2007": {
    nome: "Tabela IRPF 2007",
    periodo: "01/2007 a 12/2007",
    faixas: [
      { de: 0, ate: 1313.69, aliquota: 0, deducao: 0 },
      { de: 1313.70, ate: 2625.12, aliquota: 15, deducao: 197.05 },
      { de: 2625.13, ate: Infinity, aliquota: 27.5, deducao: 525.19 }
    ],
    deducaoDependente: 132.05
  },
  "2006": {
    nome: "Tabela IRPF 2006",
    periodo: "02/2006 a 12/2006",
    faixas: [
      { de: 0, ate: 1257.12, aliquota: 0, deducao: 0 },
      { de: 1257.13, ate: 2512.08, aliquota: 15, deducao: 188.57 },
      { de: 2512.09, ate: Infinity, aliquota: 27.5, deducao: 502.58 }
    ],
    deducaoDependente: 126.36
  },
  "2005-2006": {
    nome: "Tabela IRPF 2005-2006",
    periodo: "01/2005 a 01/2006",
    faixas: [
      { de: 0, ate: 1164.00, aliquota: 0, deducao: 0 },
      { de: 1164.01, ate: 2326.00, aliquota: 15, deducao: 174.60 },
      { de: 2326.01, ate: Infinity, aliquota: 27.5, deducao: 465.35 }
    ],
    deducaoDependente: 117.00
  },
  "2002-2004": {
    nome: "Tabela IRPF 2002-2004",
    periodo: "01/2002 a 12/2004",
    faixas: [
      { de: 0, ate: 1058.00, aliquota: 0, deducao: 0 },
      { de: 1058.01, ate: 2115.00, aliquota: 15, deducao: 158.70 },
      { de: 2115.01, ate: Infinity, aliquota: 27.5, deducao: 423.08 }
    ],
    deducaoDependente: 106.00
  },
  "1998-2001": {
    nome: "Tabela IRPF 1998-2001",
    periodo: "01/1998 a 12/2001",
    faixas: [
      { de: 0, ate: 900.00, aliquota: 0, deducao: 0 },
      { de: 900.01, ate: 1800.00, aliquota: 15, deducao: 135.00 },
      { de: 1800.01, ate: Infinity, aliquota: 27.5, deducao: 360.00 }
    ],
    deducaoDependente: 90.00
  },
  "1996-1997": {
    nome: "Tabela IRPF 1996-1997",
    periodo: "01/1996 a 12/1997",
    faixas: [
      { de: 0, ate: 900.00, aliquota: 0, deducao: 0 },
      { de: 900.01, ate: 1800.00, aliquota: 15, deducao: 135.00 },
      { de: 1800.01, ate: Infinity, aliquota: 25, deducao: 315.00 }
    ],
    deducaoDependente: 90.00
  },
  // Proposta para 2026 (conforme mencionado pelo usuário)
  "2026-proposta": {
    nome: "Tabela IRPF 2026 (Proposta)",
    periodo: "Proposta para 2026",
    faixas: [
      { de: 0, ate: 5000.00, aliquota: 0, deducao: 0 },
      { de: 5000.01, ate: 7000.00, aliquota: 7.5, deducao: 0 },
      { de: 7000.01, ate: 10000.00, aliquota: 15, deducao: 150.00 },
      { de: 10000.01, ate: 15000.00, aliquota: 22.5, deducao: 600.00 },
      { de: 15000.01, ate: 50000.00, aliquota: 27.5, deducao: 1710.00 },
      { de: 50000.01, ate: Infinity, aliquota: 30, deducao: 11385.00 }
    ],
    deducaoDependente: 528.00
  }
};

export default tabelasIRPF;
