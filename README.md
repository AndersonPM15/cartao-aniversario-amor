# 💕 Cartão Virtual Interativo de Aniversário

Um cartão de aniversário digital personalizado e interativo, desenvolvido com HTML5, CSS3 e JavaScript puro.

## 🚀 Como usar

### Método 1: GitHub Pages (Direto na Web) 🌐
Acesse: [https://andersonpm15.github.io/cartao-aniversario-amor/](https://andersonpm15.github.io/cartao-aniversario-amor/)

### Método 2: Clonar e executar localmente
```bash
# Clonar o repositório
git clone https://github.com/AndersonPM15/cartao-aniversario-amor.git

# Entrar na pasta
cd cartao-aniversario-amor

# Executar servidor local
python server.py
```
Depois acesse: http://localhost:8000

### Método 3: Download direto
1. Baixe o ZIP do repositório
2. Extraia os arquivos
3. Abra `index.html` no navegador

## 🎯 Funcionalidades

### ✨ Características Principais
- **Cartão Interativo**: Animação de abertura 3D
- **Galeria de Fotos**: Modal com navegação
- **Player de Música**: Reprodução da música especial
- **Quiz do Amor**: Perguntas personalizadas sobre o relacionamento
- **Timeline**: História do relacionamento com animações
- **Jogo da Memória**: Jogo divertido com emojis de amor
- **Contador Regressivo**: Para o próximo aniversário
- **Surpresas**: Mensagens especiais e corações flutuantes

### 🎨 Recursos Visuais
- Partículas animadas de fundo
- Corações flutuantes
- Efeitos de transição suaves
- Design responsivo
- Modo escuro automático
- Alto contraste para acessibilidade

## 📁 Estrutura do Projeto

```
cartao-aniversario/
├── index.html          # Página principal
├── server.py           # Servidor HTTP local
├── css/
│   └── style.css       # Estilos principais
├── js/
│   └── script.js       # Lógica JavaScript
├── assets/
│   ├── images/         # Fotos do casal
│   │   ├── foto1.jpg
│   │   ├── foto2.jpg
│   │   └── foto3.jpg
│   └── audio/          # Música especial
│       ├── nossa-musica.mp3
│       └── nossa-musica.ogg
└── tests/              # Testes de qualidade
    ├── test-html.py
    └── test-quality.js
```

## 🔧 Personalização

### 📸 Alterando as Fotos
1. Substitua os arquivos em `assets/images/`
2. Mantenha os nomes: `foto1.jpg`, `foto2.jpg`, `foto3.jpg`
3. Edite as legendas no arquivo `js/script.js` (variável `photoData`)

### 🎵 Mudando a Música
1. Substitua os arquivos em `assets/audio/`
2. Mantenha os nomes: `nossa-musica.mp3` e `nossa-musica.ogg`
3. Formatos suportados: MP3, OGG

### 🎯 Editando o Quiz
No arquivo `js/script.js`, modifique a variável `quizQuestions`:
```javascript
const quizQuestions = [
    {
        question: "Sua pergunta aqui?",
        options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        correct: 1, // Índice da resposta correta (0-3)
        explanation: "Explicação da resposta! 💕"
    }
];
```

### 📅 Atualizando a Timeline
No arquivo `index.html`, edite as divs com classe `timeline-item`.

## 🛠️ Solução de Problemas

### ❌ Música não toca
- **Causa**: Política de autoplay do navegador
- **Solução**: Clique no botão de música após abrir o cartão

### 🖼️ Imagens não aparecem
- **Causa**: Arquivos não encontrados ou caminhos incorretos
- **Solução**: Verifique se os arquivos estão em `assets/images/`

### 📱 Problemas no celular
- **Causa**: Limitações de recursos móveis
- **Solução**: Use o servidor Python para melhor compatibilidade

## 🎨 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Recursos Necessários
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript ES6+
- Web Audio API
- Local Storage

## 🧪 Testes

### Executar testes automatizados:
```bash
# Teste HTML
python tests/test-html.py

# Teste JavaScript (no navegador)
# Abra test-quality.js no console do navegador
```

### Teste manual:
Abra `test.html` para diagnóstico completo.

## 💡 Dicas de Uso

1. **Primeira execução**: Use o servidor Python para evitar problemas de CORS
2. **Personalização**: Edite apenas os arquivos indicados
3. **Performance**: Otimize imagens para web (< 2MB cada)
4. **Música**: Use arquivos de boa qualidade mas compactos (< 10MB)

## 🆘 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Use o arquivo `test.html` para diagnóstico
3. Confirme que todos os arquivos estão nos locais corretos

## ❤️ Feito com Amor

Este cartão foi desenvolvido especialmente para celebrar momentos especiais. Personalize-o com suas próprias memórias e torne-o único!

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🔗 Links Úteis

- **Repositório**: [https://github.com/AndersonPM15/cartao-aniversario-amor](https://github.com/AndersonPM15/cartao-aniversario-amor)
- **Demo Online**: [https://andersonpm15.github.io/cartao-aniversario-amor/](https://andersonpm15.github.io/cartao-aniversario-amor/)
- **Issues**: [Reportar problemas](https://github.com/AndersonPM15/cartao-aniversario-amor/issues)

---

*Versão 1.0.0 - Cartão Virtual Interativo*
