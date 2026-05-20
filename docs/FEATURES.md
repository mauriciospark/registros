# 🚀 Recursos e Funcionalidades (FEATURES.md)

O **Spark Registros** oferece um conjunto robusto de funcionalidades projetadas para maximizar a produtividade, privacidade e experiência do usuário. Abaixo está o detalhamento completo de cada recurso do sistema.

---

## 1. Workspace em Tela Dividida (Split-Screen)

O workspace principal é dividido em dois painéis síncronos que proporcionam uma experiência de edição em tempo real:

### **Painel de Edição (Esquerda)**
- **Editor Markdown:** Área de texto onde o usuário digita o conteúdo em formato Markdown puro
- **Fonte Monoespaçada:** Utiliza `Courier New` para melhor legibilidade de código e formatação
- **Sincronização em Tempo Real:** Cada caractere digitado dispara a atualização do preview
- **Placeholder Inteligente:** Exibe "Escreva aqui usando Markdown..." quando o campo está vazio

### **Painel de Preview (Direita)**
- **Renderização Instantânea:** Converte Markdown para HTML usando a biblioteca Marked.js
- **Estilização Dark Modern:** Aplica cores e tipografia consistentes com o tema do sistema
- **Suporte Completo a Markdown:** Títulos, listas, negrito, itálico, blocos de código, citações
- **Scroll Independente:** Cada painel possui sua própria barra de rolagem

### **Integração Marked.js**
```javascript
// A renderização é feita através da função updatePreview()
function updatePreview() {
    const mdText = document.getElementById('markdown-editor').value;
    document.getElementById('markdown-preview').innerHTML = marked.parse(mdText);
}
```

---

## 2. Abas de Contexto Síncronas (Biografia vs Agenda)

O sistema opera em dois modos distintos que podem ser alternados instantaneamente:

### **Modo Biografia (Registro Principal)**
- **Espaço Fixo:** Área dedicada para conteúdo permanente (biografia, manifesto, diário oficial)
- **Título Bloqueado:** O campo de título exibe "Espaço de Registro" e não pode ser editado
- **Persistência Única:** Apenas um registro de biografia é mantido no sistema
- **Chave LocalStorage:** `spark_biografia`
- **Botão de Excluir:** Oculto neste modo para evitar exclusão acidental

### **Modo Ideias (Caderno de Ideias)**
- **Múltiplos Registros:** Sistema de notas dinâmicas com criação, edição e exclusão
- **Lista Lateral:** Barra lateral mostra todas as ideias criadas com título e data
- **Título Editável:** Campo de título permite personalização de cada ideia
- **Ordenação:** Novas ideias são adicionadas ao topo da lista (unshift)
- **Chave LocalStorage:** `spark_registros_ideias` (array JSON)
- **Botão de Excluir:** Visível para permitir remoção de ideias

### **Alternância de Modo**
```javascript
function switchMode(mode) {
    currentMode = mode;
    // Atualiza UI, carrega conteúdo correspondente, ajusta visibilidade de elementos
}
```

---

## 3. Atalhos de Teclado Operacionais (Ctrl + S)

O sistema implementa atalhos de teclado para agilizar operações comuns:

### **Atalho Principal: Ctrl + S (ou Cmd + S no Mac)**
- **Função:** Salva o conteúdo atual no LocalStorage
- **Comportamento:**
  - No modo Biografia: Salva o conteúdo da biografia
  - No modo Ideias: Salva a ideia atual (título + conteúdo)
  - Exibe alerta de confirmação após salvar
- **Prevenção de Padrão:** Intercepta o comportamento padrão do navegador (salvar página)

### **Implementação**
```javascript
window.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveCurrentData();
    }
});
```

---

## 4. Portabilidade Absoluta de Dados (Backup JSON)

O sistema oferece funcionalidades completas de backup e restauração para garantir que os dados do usuário nunca sejam perdidos:

### **Exportar Backup**
- **Função:** `exportBackup()`
- **Formato:** Arquivo JSON com timestamp no nome
- **Conteúdo do Backup:**
  ```json
  {
    "biografia": "Conteúdo da biografia em Markdown",
    "ideias": [
      {
        "id": "timestamp",
        "title": "Título da ideia",
        "content": "Conteúdo em Markdown",
        "date": "DD/MM/AAAA"
      }
    ],
    "exportedAt": "ISO-8601 timestamp"
  }
  ```
- **Método:** Cria um Blob JSON e dispara download automático
- **Nome do Arquivo:** `spark_registros_backup_{timestamp}.json`

### **Importar Backup**
- **Função:** `importBackup()`
- **Validação:** Verifica se o arquivo possui estrutura válida (biografia + ideias)
- **Processo:**
  1. Usuário seleciona arquivo JSON
  2. FileReader lê o conteúdo
  3. Sistema valida a estrutura
  4. Dados são restaurados no LocalStorage
  5. Página é recarregada para aplicar mudanças
- **Tratamento de Erros:** Exibe alerta se o arquivo for inválido ou corrompido

### **Botões de Acesso**
- **Sidebar:** Botões "📤 Exportar Backup" e "📥 Importar Backup"
- **Header:** Botão "📤 Exportar Backup" para acesso rápido

---

## 5. Design Industrial Dark Modern

O sistema adota uma estética industrial moderna com tema escuro, focado em produtividade e conforto visual:

### **Paleta de Cores (CSS Variables)**
```css
--bg-primary: #121214      /* Fundo principal */
--bg-sidebar: #1a1a1e      /* Fundo da barra lateral */
--bg-card: #202024         /* Fundo de cards */
--text-main: #e1e1e6       /* Texto principal */
--text-muted: #8d8d99      /* Texto secundário */
--accent: #00875f          /* Cor de destaque (verde) */
--accent-hover: #00b37e    /* Cor de destaque (hover) */
--border: #323238          /* Bordas */
```

### **Tipografia**
- **Fonte Principal:** Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Fonte de Editor:** Courier New, Courier, monospace
- **Tamanhos:** Hierarquia clara com títulos de 24px a 12px

### **Componentes UI**
- **Sidebar:** 300px de largura fixa, borda direita sutil
- **Botões:** Borda arredondada (6px), hover com mudança de cor
- **Inputs:** Fundo transparente, borda invisível, foco sem outline
- **Scrollbars:** Customizadas com 8px de largura, cor de hover

### **Estilização Markdown no Preview**
- **H1:** Cor verde, borda inferior, 24px
- **H2:** Borda esquerda verde, padding-left, 20px
- **H3:** 16px, sem borda
- **Parágrafos:** Justificados, cor cinza claro
- **Código:** Fundo escuro, padding, borda arredondada
- **Citações:** Borda esquerda, itálico, cor secundária

---

## 6. Guia de Markdown Integrado

A sidebar inclui um guia rápido de sintaxe Markdown para auxiliar usuários:

### **Sintaxe Suportada**
- `# Texto` → Título Principal (H1)
- `## Texto` → Subtítulo de Seção (H2)
- `**texto**` → Texto em Negrito
- `*texto*` → Texto em Itálico
- `- item` → Lista com Marcador
- `> texto` → Bloco de Destaque (Citação)

### **Localização**
- Posição: Parte inferior da sidebar
- Estilo: Fundo escuro, título em verde, exemplos em código monoespaçado

---

## 7. Sistema de Onboarding

Para novos usuários, o sistema carrega automaticamente um texto de boas-vindas:

### **Template de Boas-Vindas**
- **Constante:** `TEMPLATE_BOAS_VINDAS`
- **Conteúdo:** Introdução ao sistema, explicações sobre privacidade, instruções de uso
- **Condição de Ativação:** LocalStorage vazio na chave `spark_biografia`
- **Comportamento:** Carregado apenas na primeira visita, substituível pelo usuário

---

## 8. Gerenciamento de Estado

O sistema mantém um estado interno consistente:

### **Variáveis de Estado**
```javascript
let currentMode = 'biografia';  // Modo atual
let ideas = [];                  // Array de ideias
let currentIdeaId = null;        // ID da ideia selecionada
```

### **Ciclo de Vida dos Dados**
1. **Inicialização:** `initData()` carrega dados do LocalStorage
2. **Edição:** `updatePreview()` renderiza em tempo real
3. **Salvamento:** `saveCurrentData()` persiste no LocalStorage
4. **Alternância:** `switchMode()` muda contexto e carrega dados
5. **Backup:** `exportBackup()` / `importBackup()` gerencia portabilidade

---

## 9. Responsividade e Layout

O sistema utiliza Flexbox para um layout responsivo:

### **Estrutura Principal**
```html
<body>
  <div class="sidebar">...</div>
  <div class="workspace">...</div>
</body>
```

### **Comportamento**
- **Sidebar:** Largura fixa de 300px
- **Workspace:** Flex-grow para ocupar espaço restante
- **Editor Container:** Flexbox com dois painéis de largura igual
- **Overflow:** Scrollbars personalizadas para conteúdo extenso

---

## 10. Segurança e Privacidade

O sistema foi projetado com princípios de privacidade por padrão:

### **Zero-Server Architecture**
- Nenhum dado é enviado para servidores externos
- Tudo é processado localmente no navegador
- LocalStorage é o único mecanismo de persistência

### **Sem Rastreadores**
- Sem analytics
- Sem cookies
- Sem conexões externas (exceto CDN do Marked.js)
- Sem coleta de dados de usuário

### **Portabilidade Total**
- Backup JSON completo
- Restauração validada
- Formato aberto e legível
