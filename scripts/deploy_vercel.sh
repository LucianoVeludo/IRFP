#!/bin/bash

# Script para fazer deploy no Vercel
# Execute este script após atualizar o GitHub

echo "=== Script de deploy no Vercel para o projeto IRFP ==="
echo "Este script irá guiá-lo no processo de deploy do projeto na Vercel"
echo ""

# Verificar se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI não está instalado. Deseja instalá-lo agora? (s/n)"
    read resposta
    if [ "$resposta" = "s" ]; then
        echo "Instalando Vercel CLI..."
        npm install -g vercel
    else
        echo "Por favor, instale o Vercel CLI manualmente e execute este script novamente."
        exit 1
    fi
fi

echo "Para fazer o deploy na Vercel, você tem duas opções:"
echo ""
echo "1. Deploy via Vercel CLI (recomendado para desenvolvedores)"
echo "2. Deploy via interface web da Vercel (mais fácil para iniciantes)"
echo ""
echo "Qual opção você prefere? (1/2)"
read opcao

if [ "$opcao" = "1" ]; then
    echo "Preparando para deploy via Vercel CLI..."
    echo "Você será solicitado a fazer login na sua conta Vercel."
    
    # Login na Vercel
    vercel login
    
    # Deploy do projeto
    echo "Iniciando deploy do projeto..."
    vercel --prod
    
    echo ""
    echo "=== Deploy concluído com sucesso! ==="
    echo "Seu site está agora disponível online."
    
else
    echo "Para fazer o deploy via interface web da Vercel:"
    echo ""
    echo "1. Acesse https://vercel.com/import"
    echo "2. Selecione 'Import Git Repository'"
    echo "3. Escolha seu repositório IRFP"
    echo "4. Configure as opções de build:"
    echo "   - Framework Preset: React"
    echo "   - Build Command: npm run build"
    echo "   - Output Directory: build"
    echo "5. Clique em 'Deploy'"
    echo ""
    echo "Deseja abrir o navegador na página de import da Vercel? (s/n)"
    read abrir_navegador
    
    if [ "$abrir_navegador" = "s" ]; then
        echo "Abrindo navegador..."
        xdg-open https://vercel.com/import
    fi
fi

echo ""
echo "Após o deploy, verifique se todas as funcionalidades estão funcionando corretamente."
