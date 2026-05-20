# 🛠️ Guia de Instalação e Execução (INSTALLATION.md)

Este guia fornece instruções completas para configurar executar e implantar o **Spark Registros** em diferentes ambientes, desde desenvolvimento local até produção.

---

## 💻 Execução Local

O Spark Registros é uma aplicação client-side que não requer backend, servidores ou instalação complexa. Pode ser executado diretamente no navegador.

### **Pré-requisitos**
- **Navegador Moderno:** Chrome, Firefox, Safari, Edge (versões recentes)
- **Conexão com Internet:** Apenas para carregar o Marked.js via CDN (primeira vez)
- **Editor de Texto:** Opcional, para modificar arquivos

### **Método 1: Abrir Diretamente (Mais Simples)**
1. **Clone ou Baixe o Repositório**
   ```bash
   git clone [URL-DO-REPOSITORIO]
   cd registros
   ```

2. **Abra o Arquivo index.html**
   - Navegue até a pasta do projeto
   - Dê duplo clique em `index.html`
   - O arquivo abrirá no seu navegador padrão

3. **Pronto!** O sistema está funcionando

### **Método 2: Usando Live Server (Recomendado para Desenvolvimento)**
Se você usa VS Code ou outro editor com suporte a Live Server:

1. **Instale a Extensão Live Server**
   - No VS Code: Extensions → Pesquise "Live Server" → Instale

2. **Abra o Projeto no VS Code**
   ```bash
   code .
   ```

3. **Inicie o Live Server**
   - Clique com botão direito em `index.html`
   - Selecione "Open with Live Server"
   - O sistema abrirá em `http://127.0.0.1:5500`

### **Método 3: Usando Python (Para Desenvolvedores)**
Se você tem Python instalado:

```bash
# Python 3
cd registros
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Acesse: `http://localhost:8000`

### **Método 4: Usando Node.js (Para Desenvolvedores)**
Se você tem Node.js instalado:

```bash
cd registros
npx serve
```

O sistema estará disponível em `http://localhost:3000`

---

## 🌐 Integração de Dependências via CDN

O Spark Registros utiliza apenas uma dependência externa: **Marked.js** (parser de Markdown).

### **CDN do Marked.js**
A dependência é carregada no arquivo `index.html`:

```html
<!-- Marcador Markdown Simple (Marked.js) embutido via CDN para renderizar o markdown -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

### **Versão Utilizada**
- **Biblioteca:** Marked.js
- **Versão:** Latest (via CDN)
- **URL:** `https://cdn.jsdelivr.net/npm/marked/marked.min.js`
- **Propósito:** Converter Markdown para HTML no preview

### **Alternativa: Uso Offline**
Se você precisa executar o sistema completamente offline:

1. **Baixe o Marked.js**
   - Visite: https://cdn.jsdelivr.net/npm/marked/marked.min.js
   - Salve como `js/marked.min.js`

2. **Modifique o index.html**
   ```html
   <!-- Substitua a linha do CDN por: -->
   <script src="js/marked.min.js"></script>
   ```

3. **Pronto!** O sistema funcionará completamente offline

---

## 🚀 Implantação em Produção (Deploy)

O Spark Registros pode ser hospedado gratuitamente em diversas plataformas de hosting estático.

### **Opção 1: GitHub Pages (Recomendado)**

#### **Passo 1: Criar Repositório no GitHub**
1. Acesse https://github.com
2. Crie um novo repositório (público ou privado)
3. Faça upload dos arquivos do projeto

#### **Passo 2: Ativar GitHub Pages**
1. Vá para Settings → Pages
2. Em "Source", selecione `main branch`
3. Clique em "Save"

#### **Passo 3: Acessar o Site**
- Seu site estará disponível em: `https://[SEU-USUARIO].github.io/[NOME-DO-REPO]`

#### **Passo 4: Configurar Domínio Personalizado (Opcional)**
1. Compre um domínio
2. Adicione um arquivo `CNAME` na raiz com seu domínio
3. Configure DNS no seu provedor de domínio

### **Opção 2: Vercel**

#### **Passo 1: Instalar Vercel CLI**
```bash
npm install -g vercel
```

#### **Passo 2: Deploy**
```bash
cd registros
vercel
```

#### **Passo 3: Follow the Prompts**
- Pressione Enter para usar as configurações padrão
- Seu site estará disponível em: `https://[SEU-PROJETO].vercel.app`

### **Opção 3: Netlify**

#### **Passo 1: Criar Conta**
- Acesse https://netlify.com
- Crie uma conta gratuita

#### **Passo 2: Drag and Drop**
- Arraste a pasta `registros` para a área de deploy
- Aguarde o processo de build

#### **Passo 3: Acessar o Site**
- Seu site estará disponível em: `https://[SEU-SITE].netlify.app`

### **Opção 4: Surge.sh (Mais Simples)**

```bash
npm install -g surge
cd registros
surge
```

Seu site estará disponível em: `https://[NOME-ALEATORIO].surge.sh`

---

## 🔧 Configuração Avançada

### **Personalização do Tema**
Para modificar as cores do sistema, edite o arquivo `css/style.css`:

```css
:root {
    --bg-primary: #121214;      /* Fundo principal */
    --bg-sidebar: #1a1a1e;      /* Fundo da barra lateral */
    --bg-card: #202024;         /* Fundo de cards */
    --text-main: #e1e1e6;       /* Texto principal */
    --text-muted: #8d8d99;      /* Texto secundário */
    --accent: #00875f;          /* Cor de destaque */
    --accent-hover: #00b37e;    /* Cor de destaque (hover) */
    --border: #323238;          /* Bordas */
}
```

### **Modificação do Template de Boas-Vindas**
Para alterar o texto de boas-vindas para novos usuários, edite `js/script.js`:

```javascript
const TEMPLATE_BOAS_VINDAS = `# Seu Título
### Seu Subtítulo

Seu conteúdo de boas-vindas...`;
```

### **Alteração de Chaves do LocalStorage**
Se você precisa usar chaves diferentes, modifique em `js/script.js`:

```javascript
// Chave da biografia
localStorage.getItem('spark_biografia')

// Chave das ideias
localStorage.getItem('spark_registros_ideias')
```

---

## 📱 Compatibilidade

### **Navegadores Suportados**
- **Chrome/Edge:** 90+ (Recomendado)
- **Firefox:** 88+
- **Safari:** 14+
- **Opera:** 76+

### **Requisitos de Sistema**
- **RAM:** Mínimo 2GB (Recomendado 4GB+)
- **Processador:** Qualquer processador moderno
- **Armazenamento:** ~1MB para o aplicativo + dados do usuário

### **LocalStorage Limits**
- **Chrome/Edge:** ~5-10MB por origem
- **Firefox:** ~5-10MB por origem
- **Safari:** ~5MB por origem

Se você atingir o limite, o sistema alertará e você precisará fazer backup e limpar dados antigos.

---

## 🐛 Solução de Problemas

### **Problema: Preview não renderiza Markdown**
**Solução:** Verifique se o Marked.js está carregado. Abra o console do navegador (F12) e procure por erros. Se houver erro de rede, verifique sua conexão com a internet.

### **Problema: Dados não são salvos**
**Solução:** Verifique se o navegador permite LocalStorage. Alguns navegadores em modo privado podem bloquear LocalStorage.

### **Problema: Backup não funciona**
**Solução:** Verifique se o navegador permite downloads automáticos. Alguns navegadores podem bloquear downloads sem interação do usuário.

### **Problema: Importação de backup falha**
**Solução:** Verifique se o arquivo JSON é válido e possui a estrutura correta (biografia + ideias). Abra o arquivo em um editor de texto para verificar.

---

## 🔄 Atualização do Sistema

### **Como Atualizar para Nova Versão**

1. **Faça Backup dos Seus Dados**
   - Clique em "📤 Exportar Backup"
   - Salve o arquivo JSON em local seguro

2. **Atualize os Arquivos**
   - Baixe a nova versão do repositório
   - Substitua os arquivos antigos pelos novos

3. **Restaure Seus Dados**
   - Abra o sistema atualizado
   - Clique em "📥 Importar Backup"
   - Selecione o arquivo JSON salvo

4. **Pronto!** Seus dados foram migrados

---

## 📊 Estrutura de Arquivos

```
registros/
├── index.html          # Interface principal do usuário
├── css/
│   └── style.css       # Estilização completa do sistema
├── js/
│   └── script.js       # Lógica do sistema (persistência, atalhos, backup)
├── docs/
│   ├── README.md       # Visão geral e portal da documentação
│   ├── FEATURES.md     # Manual de funcionalidades
│   ├── INSTALLATION.md # Este arquivo
│   ├── API.md          # Documentação técnica
│   └── CONTRIBUTING.md # Diretrizes de contribuição
└── json/               # Pasta para backups (opcional)
```

---

## 🔒 Considerações de Segurança

### **LocalStorage vs Cookies**
- O sistema usa LocalStorage, não cookies
- LocalStorage não é enviado automaticamente com requisições HTTP
- Dados permanecem no navegador do usuário

### **HTTPS em Produção**
- Recomendado usar HTTPS em produção
- GitHub Pages, Vercel e Netlify fornecem HTTPS gratuito
- HTTPS protege contra ataques de intermediários

### **Sanitização de Markdown**
- Marked.js converte Markdown para HTML
- Para produção, considere adicionar sanitização (DOMPurify)
- Isso previne ataques XSS se você importar backups de terceiros

---

## 📞 Suporte

Para problemas ou dúvidas:
1. Consulte a documentação em `docs/`
2. Verifique o console do navegador para erros
3. Faça backup dos dados antes de fazer modificações

---

## ✅ Checklist de Instalação

- [ ] Clone ou baixe o repositório
- [ ] Abra `index.html` no navegador
- [ ] Verifique se o preview de Markdown funciona
- [ ] Teste o salvamento (Ctrl + S)
- [ ] Teste o backup (Exportar)
- [ ] Teste a restauração (Importar)
- [ ] Personalize o tema (opcional)
- [ ] Configure o deploy em produção (opcional)
