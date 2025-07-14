#!/usr/bin/env python3
"""
Testes de validação HTML para o Cartão Virtual
Verifica estrutura, elementos obrigatórios e integridade
"""

import os
import re
from html.parser import HTMLParser

class HTMLValidator(HTMLParser):
    """Validador HTML personalizado"""
    
    def __init__(self):
        super().__init__()
        self.tags = []
        self.ids = []
        self.classes = []
        self.images = []
        self.audio = []
        self.scripts = []
        self.styles = []
        self.errors = []
        
    def handle_starttag(self, tag, attrs):
        """Processa tags de abertura"""
        self.tags.append(tag)
        
        attrs_dict = dict(attrs)
        
        # Coletar IDs
        if 'id' in attrs_dict:
            self.ids.append(attrs_dict['id'])
        
        # Coletar classes
        if 'class' in attrs_dict:
            self.classes.extend(attrs_dict['class'].split())
        
        # Verificar imagens
        if tag == 'img':
            src = attrs_dict.get('src', '')
            alt = attrs_dict.get('alt', '')
            self.images.append({'src': src, 'alt': alt})
            
            if not alt:
                self.errors.append(f"Imagem sem alt text: {src}")
        
        # Verificar áudio
        if tag == 'audio':
            self.audio.append(attrs_dict)
        
        # Verificar scripts
        if tag == 'script':
            src = attrs_dict.get('src', '')
            if src:
                self.scripts.append(src)
        
        # Verificar estilos
        if tag == 'link' and attrs_dict.get('rel') == 'stylesheet':
            href = attrs_dict.get('href', '')
            if href:
                self.styles.append(href)

def validate_html_file(filepath):
    """Valida arquivo HTML"""
    print(f"🔍 Validando: {filepath}")
    
    if not os.path.exists(filepath):
        print(f"❌ Arquivo não encontrado: {filepath}")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    validator = HTMLValidator()
    validator.feed(content)
    
    # Verificações essenciais
    required_ids = [
        'card', 'animatedText', 'photoModal', 'quizContainer',
        'timelineContainer', 'countdownContainer', 'memoryGameContainer',
        'surpriseBox', 'backgroundMusic', 'toastContainer'
    ]
    
    required_classes = [
        'card-front', 'card-inside', 'photo-gallery', 'interactive-buttons',
        'timeline-item', 'countdown-display', 'memory-board'
    ]
    
    # Verificar IDs obrigatórios
    missing_ids = [id for id in required_ids if id not in validator.ids]
    if missing_ids:
        print(f"❌ IDs obrigatórios ausentes: {missing_ids}")
        return False
    
    # Verificar classes obrigatórias
    missing_classes = [cls for cls in required_classes if cls not in validator.classes]
    if missing_classes:
        print(f"⚠️  Classes importantes ausentes: {missing_classes}")
    
    # Verificar estrutura de arquivos
    expected_images = 3
    expected_audio = 1
    expected_scripts = 1
    expected_styles = 1
    
    if len(validator.images) < expected_images:
        print(f"⚠️  Esperado {expected_images} imagens, encontrado {len(validator.images)}")
    
    if len(validator.audio) < expected_audio:
        print(f"⚠️  Esperado {expected_audio} elemento de áudio, encontrado {len(validator.audio)}")
    
    if len(validator.scripts) < expected_scripts:
        print(f"⚠️  Esperado {expected_scripts} script, encontrado {len(validator.scripts)}")
    
    if len(validator.styles) < expected_styles:
        print(f"⚠️  Esperado {expected_styles} stylesheet, encontrado {len(validator.styles)}")
    
    # Mostrar erros
    if validator.errors:
        print("❌ Erros encontrados:")
        for error in validator.errors:
            print(f"   - {error}")
    
    print(f"✅ Validação concluída")
    print(f"📊 Estatísticas:")
    print(f"   - Tags: {len(set(validator.tags))}")
    print(f"   - IDs: {len(validator.ids)}")
    print(f"   - Classes: {len(set(validator.classes))}")
    print(f"   - Imagens: {len(validator.images)}")
    print(f"   - Áudio: {len(validator.audio)}")
    
    return len(validator.errors) == 0 and len(missing_ids) == 0

def check_file_structure():
    """Verifica estrutura de arquivos"""
    print("📁 Verificando estrutura de arquivos...")
    
    required_files = [
        'index.html',
        'css/style.css',
        'js/script.js',
        'README.md'
    ]
    
    required_dirs = [
        'assets/images',
        'assets/audio',
        'tests'
    ]
    
    all_good = True
    
    # Verificar arquivos
    for file in required_files:
        if os.path.exists(file):
            print(f"✅ {file}")
        else:
            print(f"❌ {file} - AUSENTE")
            all_good = False
    
    # Verificar diretórios
    for dir in required_dirs:
        if os.path.exists(dir):
            print(f"✅ {dir}/")
        else:
            print(f"❌ {dir}/ - AUSENTE")
            all_good = False
    
    # Verificar assets
    image_files = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg']
    audio_files = ['nossa-musica.mp3', 'nossa-musica.ogg']
    
    for img in image_files:
        path = f"assets/images/{img}"
        if os.path.exists(path):
            print(f"✅ {path}")
        else:
            print(f"⚠️  {path} - RECOMENDADO")
    
    for audio in audio_files:
        path = f"assets/audio/{audio}"
        if os.path.exists(path):
            print(f"✅ {path}")
        else:
            print(f"⚠️  {path} - RECOMENDADO")
    
    return all_good

def main():
    """Função principal dos testes"""
    print("🧪 TESTE DE VALIDAÇÃO HTML")
    print("=" * 40)
    
    # Verificar estrutura
    structure_ok = check_file_structure()
    print()
    
    # Validar HTML
    html_ok = validate_html_file('index.html')
    print()
    
    # Resultado final
    if structure_ok and html_ok:
        print("🎉 TODOS OS TESTES PASSARAM!")
        return 0
    else:
        print("❌ ALGUNS TESTES FALHARAM")
        return 1

if __name__ == "__main__":
    exit(main())