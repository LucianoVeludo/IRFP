#!/bin/bash

# Script para atualizar o repositório GitHub
# Execute este script na pasta raiz do projeto

echo "=== Script de atualização do GitHub para o projeto IRFP ==="
echo "Este script irá preparar e enviar as alterações para o GitHub"
echo ""

# Verificar se o Git está instalado
if ! command -v git &> /dev/null; then
    echo "Git não está instalado. Por favor, instale o Git primeiro."
    exit 1
fi

# Verificar se estamos na pasta do projeto
if [ ! -d ".git" ]; then
    echo "Este script deve ser executado na pasta raiz do projeto IRFP."
    exit 1
fi

# Adicionar todas as alterações
echo "Adicionando todas as alterações ao Git..."
git add .

# Commit das alterações
echo "Criando commit com as alterações..."
git commit -m "Implementação de novas calculadoras trabalhistas, tabelas históricas de IRPF e otimização de layout"

# Push para o GitHub
echo "Enviando alterações para o GitHub..."
echo "Você será solicitado a inserir suas credenciais do GitHub."
git push origin main

echo ""
echo "=== Alterações enviadas com sucesso para o GitHub! ==="
echo "Agora você pode fazer o deploy no Vercel usando o script deploy_vercel.sh"
