@echo off
title BAOU - Lanceur Local v1.0.3
echo ==========================================
echo       Lancement de l'ecosysteme BAOU      
echo ==========================================

echo [1/2] Lancement du Backend Express sur le port 3001...
start cmd /k "cd /d d:\Antigravity\projet\finance\v1.0.3\backend && npm install && node server.js"

echo [2/2] Lancement de l'Administration React...
start cmd /k "cd /d d:\Antigravity\projet\finance\v1.0.3\admin && npm install && npm run dev"

echo.
echo ==========================================
echo [Optionnel] Tunnel de connexion mobile public
echo Si vous testez l'app sur un VRAI telephone,
echo vous avez besoin d'exposer votre serveur local.
echo ==========================================
set /p choice="Lancer un tunnel de connexion public avec NGROK ? (O/N) : "

if /i "%choice%"=="O" (
    echo.
    echo Lancement de ngrok sur le port 3001...
    start cmd /k "ngrok http 3001"
    echo.
    echo Copiez l'adresse generee par ngrok (ex: https://xxxx.ngrok-free.app) 
    echo et collez-la dans les parametres (engrenage) de l'application mobile !
)

echo.
echo Les serveurs s'ouvrent dans des fenetres separees.
echo ==========================================
pause
