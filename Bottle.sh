#!/data/data/com.termux/files/usr/bin/bash
# Instala automáticamente Bottle en Termux

echo "===================================================="
echo "        🍼 Instalador Automático - Bottle       "
echo "===================================================="
echo
echo "Este script configurará e instalará todo lo necesario"
echo "para ejecutar Bottle en Termux."
echo

# 1. Permitir acceso al almacenamiento
echo "📂 Paso 1: Configurando permisos de almacenamiento..."
termux-setup-storage
sleep 2

# 2. Actualizar repositorios y paquetes
echo "🔄 Paso 2: Actualizando repositorios y paquetes..."
apt update && apt upgrade -y
sleep 2

# 3. Instalar dependencias necesarias
echo "📦 Paso 3: Instalando dependencias (git, nodejs, ffmpeg, imagemagick)..."
pkg install -y git nodejs ffmpeg imagemagick
sleep 2

# 4. Clonar el repositorio
echo "🌐 Paso 4: Clonando repositorio de Bottle..."
git clone https://github.com/Ado-rgb/Bottle.git
sleep 2

# 5. Entrar a la carpeta del bot
echo "📁 Paso 5: Accediendo al directorio del bot..."
cd Bottle || { echo "❌ Error: No se pudo acceder a la carpeta Bottle"; exit 1; }
sleep 2

# 6. Instalar dependencias de Node.js
echo "📦 Paso 6: Instalando módulos de Node.js (esto puede tardar)..."
npm install
sleep 2

# 7. Iniciar el bot
echo "🚀 Paso 7: Iniciando Bottle..."
echo "===================================================="
echo "✅ Instalación completada con éxito"
echo
echo "ℹ️  Si el bot se apaga en algún momento, vuelve a iniciarlo con:"
echo "   cd Bottle && npm start"
echo "===================================================="
npm start