#!/bin/bash

# Script para verificar o status do deploy na Vercel
# Execute este script após o deploy para verificar se tudo está funcionando corretamente

echo "=== Script de verificação do deploy na Vercel para o projeto IRFP ==="
echo "Este script irá ajudá-lo a verificar se o deploy foi bem-sucedido"
echo ""

# Solicitar URL do site
echo "Por favor, insira a URL do seu site na Vercel (ex: https://irfp.vercel.app):"
read site_url

# Verificar se a URL é válida
if [[ ! $site_url =~ ^https?:// ]]; then
    echo "URL inválida. Por favor, insira uma URL completa começando com http:// ou https://"
    exit 1
fi

echo "Verificando disponibilidade do site..."
if curl --output /dev/null --silent --head --fail "$site_url"; then
    echo "✅ Site está online e acessível!"
else
    echo "❌ Não foi possível acessar o site. Verifique se o deploy foi concluído corretamente."
    exit 1
fi

echo ""
echo "Checklist de verificação:"
echo ""
echo "Por favor, acesse $site_url e verifique os seguintes itens:"
echo ""
echo "1. Navegação entre calculadoras:"
echo "   [ ] Todas as calculadoras estão acessíveis pelo menu de navegação"
echo ""
echo "2. Calculadoras funcionais:"
echo "   [ ] Calculadora de IR Histórico"
echo "   [ ] Calculadora de IR 2025-2026"
echo "   [ ] Calculadora de Férias"
echo "   [ ] Calculadora de Rescisão"
echo "   [ ] Calculadora de 13º Salário"
echo "   [ ] Calculadora de Horas Extras"
echo "   [ ] Simulador de Salário Líquido"
echo ""
echo "3. Layout responsivo:"
echo "   [ ] Layout se adapta corretamente em dispositivos móveis"
echo "   [ ] Layout se adapta corretamente em desktop"
echo ""
echo "4. Anúncios AdSense:"
echo "   [ ] Anúncios são exibidos nos locais corretos"
echo ""
echo "Se todos os itens estiverem funcionando corretamente, o deploy foi bem-sucedido!"
echo "Caso contrário, verifique os logs de build na Vercel para identificar possíveis problemas."
echo ""
echo "Deseja abrir o site no navegador para verificação? (s/n)"
read abrir_navegador

if [ "$abrir_navegador" = "s" ]; then
    echo "Abrindo navegador..."
    xdg-open "$site_url"
fi
