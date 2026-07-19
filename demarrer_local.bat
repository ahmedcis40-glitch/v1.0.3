@echo off
title BAOU - Lanceur Local
echo ==========================================
echo       Lancement de l'ecosysteme BAOU      
echo ==========================================

echo [1/2] Lancement du Backend Express sur le port 3001...
start cmd /k "cd backend && npm install && node server.js"

echo [2/2] Lancement de l'Administration React...
start cmd /k "cd admin && npm install && npm run dev"

echo.
echo ==========================================
echo Les serveurs s'ouvrent dans des fenetres separees.
echo L'application mobile peut maintenant se connecter !
echo ==========================================
pause
