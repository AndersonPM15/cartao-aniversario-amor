#!/usr/bin/env python3
"""
Servidor HTTP simples para o Cartão Virtual Interativo
Serve arquivos estáticos com suporte a CORS
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler HTTP com suporte a CORS"""
    
    def end_headers(self):
        """Adiciona headers CORS"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        """Responde a requisições OPTIONS para CORS"""
        self.send_response(200)
        self.end_headers()
    
    def guess_type(self, path):
        """Define tipos MIME corretos"""
        mimetype = super().guess_type(path)
        
        # Correções para tipos específicos
        if path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.mp3'):
            return 'audio/mpeg'
        elif path.endswith('.ogg'):
            return 'audio/ogg'
        elif path.endswith('.jpg') or path.endswith('.jpeg'):
            return 'image/jpeg'
        elif path.endswith('.png'):
            return 'image/png'
        
        return mimetype

def main():
    """Função principal do servidor"""
    PORT = 8000
    
    # Verificar se a porta está disponível
    try:
        with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
            print(f"🚀 Servidor iniciado em http://localhost:{PORT}")
            print(f"📁 Servindo arquivos de: {os.getcwd()}")
            print("⏹️  Pressione Ctrl+C para parar o servidor")
            print("-" * 50)
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n🛑 Servidor interrompido pelo usuário")
                httpd.shutdown()
                
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Erro: Porta {PORT} já está em uso")
            print(f"💡 Tente usar uma porta diferente ou pare o processo que está usando a porta {PORT}")
        else:
            print(f"❌ Erro ao iniciar servidor: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()