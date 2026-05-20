# ⚙️ Especificação da Arquitetura e Engenharia de Dados (API.md)

Este documento descreve a arquitetura técnica, modelagem de dados, ciclo de vida dos eventos e documentação completa dos métodos do sistema **Spark Registros**.

---

## 💾 Modelagem de Dados no LocalStorage

O Spark Registros utiliza a Web Storage API (`localStorage`) para persistência de dados. Todos os dados são armazenados localmente no navegador do usuário.

### **Chaves de Armazenamento**

#### **1. spark_biografia**
- **Tipo:** String
- **Descrição:** Contém o texto bruto em Markdown da biografia/registro principal
- **Estrutura:** Texto puro em formato Markdown
- **Exemplo:**
  ```markdown
  # Bem-vindo ao Spark Registros
  ### Seu espaço seguro para documentar sua história e suas ideias.
  
  Este é o seu diário e caderno de bordo pessoal...
  ```
- **Inicialização:** Carregada com `TEMPLATE_BOAS_VINDAS` se vazia
- **Atualização:** Salva via `saveCurrentData()` no modo biografia

#### **2. spark_registros_ideias**
- **Tipo:** String (JSON serializado)
- **Descrição:** Array de objetos representando as ideias/notas do usuário
- **Estrutura:**
  ```json
  [
    {
      "id": "1716200000000",
      "title": "💡 Projeto Local-First Novo",
      "content": "# Novo Software\n\nIdeia de criar um sistema focado em privacidade...",
      "date": "20/05/2026"
    }
  ]
  ```
- **Campos do Objeto:**
  - `id`: String (timestamp em milissegundos) - Identificador único
  - `title`: String - Título da ideia
  - `content`: String - Conteúdo em Markdown
  - `date`: String - Data no formato DD/MM/AAAA
- **Inicialização:** Carregada com array padrão contendo uma ideia exemplo se vazia
- **Atualização:** Salva via `saveCurrentData()` no modo ideias

---

## 🏗️ Estrutura de Dados

### **Objeto de Backup**
```javascript
{
  biografia: "String com conteúdo da biografia em Markdown",
  ideias: [
    {
      id: "String (timestamp)",
      title: "String",
      content: "String (Markdown)",
      date: "String (DD/MM/AAAA)"
    }
  ],
  exportedAt: "String (ISO-8601 timestamp)"
}
```

### **Estado da Aplicação**
```javascript
let currentMode = 'biografia';  // 'biografia' ou 'ideias'
let ideas = [];                  // Array de objetos de ideias
let currentIdeaId = null;        // ID da ideia selecionada atualmente
```

---

## 🔄 Ciclo de Vida dos Eventos

### **1. Inicialização (window.onload)**
```
window.onload → initData()
  ↓
Verifica spark_biografia
  ↓
Se vazio → Carrega TEMPLATE_BOAS_VINDAS
  ↓
Verifica spark_registros_ideias
  ↓
Se vazio → Carrega array padrão
  ↓
switchMode('biografia')
  ↓
Carrega conteúdo no editor
  ↓
updatePreview()
```

### **2. Edição em Tempo Real (oninput)**
```
Usuário digita no textarea
  ↓
oninput="updatePreview()"
  ↓
updatePreview()
  ↓
marked.parse(mdText)
  ↓
innerHTML do preview atualizado
```

### **3. Salvamento Manual (Ctrl + S ou Botão)**
```
saveCurrentData()
  ↓
Verifica currentMode
  ↓
Se 'biografia' → localStorage.setItem('spark_biografia', editorText)
Se 'ideias' → Atualiza objeto no array → localStorage.setItem('spark_registros_ideias', JSON.stringify(ideas))
  ↓
Exibe alerta de confirmação
```

### **4. Alternância de Modo (switchMode)**
```
switchMode(mode)
  ↓
Atualiza currentMode
  ↓
Atualiza classes dos botões do menu
  ↓
Mostra/oculta seção de ideias na sidebar
  ↓
Se 'biografia' → Carrega spark_biografia, bloqueia título, oculta botão excluir
Se 'ideias' → Mostra lista, desbloqueia título, mostra botão excluir
  ↓
Carrega conteúdo no editor
  ↓
updatePreview()
```

### **5. Exportação de Backup**
```
exportBackup()
  ↓
Cria objeto backupData
  ↓
JSON.stringify(backupData, null, 2)
  ↓
encodeURIComponent()
  ↓
Cria Blob data:text/json
  ↓
Cria elemento <a> com href e download
  ↓
Simula click()
  ↓
Remove elemento
```

### **6. Importação de Backup**
```
importBackup()
  ↓
Dispara click no input file
  ↓
Usuário seleciona arquivo
  ↓
FileReader.readAsText(file)
  ↓
onload → JSON.parse(e.target.result)
  ↓
Valida estrutura (biografia + ideias)
  ↓
Se válido → localStorage.setItem() para ambas chaves
  ↓
window.location.reload()
```

---

## 🛠️ Métodos Core (script.js)

### **initData()**
**Propósito:** Inicializa a aplicação carregando dados do LocalStorage

**Parâmetros:** Nenhum

**Retorno:** void

**Comportamento:**
1. Verifica se `spark_biografia` existe no LocalStorage
2. Se não existe, salva `TEMPLATE_BOAS_VINDAS`
3. Verifica se `spark_registros_ideias` existe no LocalStorage
4. Se não existe, salva array padrão com uma ideia exemplo
5. Chama `switchMode('biografia')` para exibir o modo inicial

**Código:**
```javascript
function initData() {
    if (!localStorage.getItem('spark_biografia')) {
        localStorage.setItem('spark_biografia', TEMPLATE_BOAS_VINDAS);
    }
    
    const savedIdeas = localStorage.getItem('spark_registros_ideias');
    if (savedIdeas) {
        ideas = JSON.parse(savedIdeas);
    } else {
        ideas = [
            {
                id: '1',
                title: '💡 Projeto Local-First Novo',
                content: '# Novo Software\n\nIdeia de criar um sistema focado em privacidade...',
                date: '20/05/2026'
            }
        ];
        localStorage.setItem('spark_registros_ideias', JSON.stringify(ideas));
    }

    switchMode('biografia');
}
```

---

### **switchMode(mode)**
**Propósito:** Alterna entre o modo Biografia e o modo Ideias

**Parâmetros:**
- `mode` (String): 'biografia' ou 'ideias'

**Retorno:** void

**Comportamento:**
1. Atualiza `currentMode`
2. Atualiza classes dos botões do menu (active/inactive)
3. Mostra ou oculta a seção de ideias na sidebar
4. Se modo 'biografia':
   - Oculta botão de excluir
   - Bloqueia campo de título
   - Carrega `spark_biografia` no editor
5. Se modo 'ideias':
   - Mostra botão de excluir
   - Desbloqueia campo de título
   - Renderiza lista de ideias
   - Seleciona primeira ideia ou cria nova

**Código:**
```javascript
function switchMode(mode) {
    currentMode = mode;
    
    document.getElementById('btn-menu-biografia').classList.toggle('active', mode === 'biografia');
    document.getElementById('btn-menu-ideias').classList.toggle('active', mode === 'ideias');
    
    const ideasSection = document.getElementById('ideas-sidebar-section');
    const deleteBtn = document.getElementById('delete-btn');
    const titleInput = document.getElementById('current-title');

    if (mode === 'biografia') {
        ideasSection.style.display = 'none';
        deleteBtn.style.display = 'none';
        titleInput.value = "Espaço de Registro";
        titleInput.disabled = true;
        
        document.getElementById('markdown-editor').value = localStorage.getItem('spark_biografia');
        updatePreview();
    } else {
        ideasSection.style.display = 'flex';
        deleteBtn.style.display = 'block';
        titleInput.disabled = false;
        
        renderIdeasSidebar();
        
        if (ideas.length > 0) {
            selectIdea(ideas[0].id);
        } else {
            createNewIdea();
        }
    }
}
```

---

### **renderIdeasSidebar()**
**Propósito:** Renderiza a lista de ideias na barra lateral

**Parâmetros:** Nenhum

**Retorno:** void

**Comportamento:**
1. Limpa o container da lista
2. Itera sobre o array `ideas`
3. Para cada ideia, cria elemento HTML com título e data
4. Adiciona classe `active` se for a ideia selecionada
5. Adiciona evento de clique para selecionar a ideia

**Código:**
```javascript
function renderIdeasSidebar() {
    const container = document.getElementById('notes-list-container');
    container.innerHTML = '';
    
    ideas.forEach(idea => {
        const item = document.createElement('div');
        item.className = `note-item ${idea.id === currentIdeaId ? 'active' : ''}`;
        item.onclick = () => selectIdea(idea.id);
        
        item.innerHTML = `
            <div class="note-item-title">${idea.title}</div>
            <div class="note-item-date">${idea.date}</div>
        `;
        container.appendChild(item);
    });
}
```

---

### **selectIdea(id)**
**Propósito:** Seleciona uma ideia específica para edição

**Parâmetros:**
- `id` (String): ID da ideia a ser selecionada

**Retorno:** void

**Comportamento:**
1. Atualiza `currentIdeaId`
2. Encontra a ideia no array `ideas`
3. Se encontrada:
   - Carrega título no campo de título
   - Carrega conteúdo no editor
   - Re-renderiza sidebar para atualizar classe active
   - Atualiza preview

**Código:**
```javascript
function selectIdea(id) {
    currentIdeaId = id;
    const idea = ideas.find(i => i.id === id);
    if (idea) {
        document.getElementById('current-title').value = idea.title;
        document.getElementById('markdown-editor').value = idea.content;
        
        renderIdeasSidebar();
        updatePreview();
    }
}
```

---

### **createNewIdea()**
**Propósito:** Cria uma nova ideia e a adiciona ao topo da lista

**Parâmetros:** Nenhum

**Retorno:** void

**Comportamento:**
1. Gera data atual no formato DD/MM/AAAA
2. Cria objeto nova ideia com:
   - ID: timestamp atual
   - Título: "Nova Ideia Autoral"
   - Conteúdo: Template padrão
   - Data: Data atual
3. Adiciona ao topo do array (unshift)
4. Salva no LocalStorage
5. Seleciona a nova ideia

**Código:**
```javascript
function createNewIdea() {
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth()+1).padStart(2, '0')}/${now.getFullYear()}`;
    
    const newIdea = {
        id: Date.now().toString(),
        title: 'Nova Ideia Autoral',
        content: '# Nova Ideia\n\nEscreva os detalhes da sua ideia aqui...',
        date: dateStr
    };
    
    ideas.unshift(newIdea);
    localStorage.setItem('spark_registros_ideias', JSON.stringify(ideas));
    currentMode = 'ideias';
    selectIdea(newIdea.id);
}
```

---

### **deleteCurrentIdea()**
**Propósito:** Deleta a ideia selecionada atualmente

**Parâmetros:** Nenhum

**Retorno:** void

**Comportamento:**
1. Verifica se está no modo ideias e se há ideia selecionada
2. Exibe confirmação ao usuário
3. Se confirmado:
   - Remove ideia do array
   - Salva no LocalStorage
   - Se houver outras ideias, seleciona a primeira
   - Se não houver, cria nova ideia

**Código:**
```javascript
function deleteCurrentIdea() {
    if (currentMode !== 'ideias' || !currentIdeaId) return;
    
    if (confirm('Tem certeza que deseja apagar essa ideia?')) {
        ideas = ideas.filter(i => i.id !== currentIdeaId);
        localStorage.setItem('spark_registros_ideias', JSON.stringify(ideas));
        
        if (ideas.length > 0) {
            selectIdea(ideas[0].id);
        } else {
            createNewIdea();
        }
    }
}
```

---

### **updatePreview()**
**Propósito:** Atualiza a visualização do preview convertendo Markdown para HTML

**Parâmetros:** Nenhum

**Retorno:** void

**Comportamento:**
1. Obtém texto do editor
2. Usa Marked.js para converter Markdown para HTML
3. Atualiza innerHTML do preview

**Código:**
```javascript
function updatePreview() {
    const mdText = document.getElementById('markdown-editor').value;
    document.getElementById('markdown-preview').innerHTML = marked.parse(mdText);
}
```

---

### **saveCurrentData()**
**Propósito:** Salva os dados atuais no LocalStorage

**Parâmetros:** Nenhum

**Retorno:** void

**Comportamento:**
1. Obtém texto do editor
2. Se modo 'biografia':
   - Salva em `spark_biografia`
   - Exibe alerta de sucesso
3. Se modo 'ideias':
   - Obtém título do campo de título
   - Encontra índice da ideia no array
   - Atualiza título e conteúdo
   - Salva array em `spark_registros_ideias`
   - Re-renderiza sidebar
   - Exibe alerta de sucesso

**Código:**
```javascript
function saveCurrentData() {
    const editorText = document.getElementById('markdown-editor').value;
    
    if (currentMode === 'biografia') {
        localStorage.setItem('spark_biografia', editorText);
        alert('📖 Biografia salva localmente com sucesso!');
    } else if (currentMode === 'ideias' && currentIdeaId) {
        const titleText = document.getElementById('current-title').value;
        
        const ideaIndex = ideas.findIndex(i => i.id === currentIdeaId);
        if (ideaIndex !== -1) {
            ideas[ideaIndex].title = titleText;
            ideas[ideaIndex].content = editorText;
            
            localStorage.setItem('spark_registros_ideias', JSON.stringify(ideas));
            renderIdeasSidebar();
            alert('💡 Ideia salva localmente com sucesso!');
        }
    }
}
```

---

### **exportBackup()**
**Propósito:** Exporta um arquivo JSON de backup de todas as informações

**Parâmetros:** Nenhum

**Retorno:** void

**Comportamento:**
1. Cria objeto `backupData` com:
   - biografia: conteúdo de `spark_biografia`
   - ideias: array `ideas`
   - exportedAt: timestamp ISO-8601
2. Converte para JSON com formatação
3. Cria data URI com encoding
4. Cria elemento <a> com href e download
5. Simula clique para download
6. Remove elemento

**Código:**
```javascript
function exportBackup() {
    const backupData = {
        biografia: localStorage.getItem('spark_biografia'),
        ideias: ideas,
        exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `spark_registros_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}
```

---

### **importBackup()**
**Propósito:** Importa um arquivo JSON de backup

**Parâmetros:** Nenhum

**Retorno:** void

**Comportamento:**
1. Dispara clique no input file oculto
2. Event listener do input file:
   - Obtém arquivo selecionado
   - Cria FileReader
   - Lê arquivo como texto
   - Parse JSON
   - Valida estrutura (biografia + ideias)
   - Se válido: restaura dados no LocalStorage e recarrega página
   - Se inválido: exibe alerta de erro

**Código:**
```javascript
function importBackup() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const backupData = JSON.parse(e.target.result);

            if (!backupData.biografia || !backupData.ideias) {
                alert('❌ Arquivo de backup inválido. Estrutura incorreta.');
                return;
            }

            localStorage.setItem('spark_biografia', backupData.biografia);
            localStorage.setItem('spark_registros_ideias', JSON.stringify(backupData.ideias));

            alert('✅ Backup importado com sucesso! A página será recarregada.');
            window.location.reload();
        } catch (error) {
            alert('❌ Erro ao ler o arquivo de backup. Certifique-se de que é um arquivo JSON válido.');
            console.error('Erro de importação:', error);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
});
```

---

## 🎯 Event Listeners

### **window.onload**
```javascript
window.onload = initData;
```
Dispara a inicialização da aplicação quando a página carrega.

### **window.keydown (Ctrl + S)**
```javascript
window.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveCurrentData();
    }
});
```
Intercepta o atalho Ctrl + S para salvar dados em vez de salvar a página.

### **textarea.oninput**
```html
<textarea id="markdown-editor" oninput="updatePreview()" ...>
```
Atualiza o preview em tempo real enquanto o usuário digita.

### **fileInput.change**
```javascript
document.getElementById('fileInput').addEventListener('change', function(event) { ... });
```
Processa o arquivo selecionado para importação de backup.

---

## 🔌 Integração com Marked.js

### **Carregamento**
```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

### **Uso**
```javascript
marked.parse(mdText)
```
Converte string Markdown para string HTML.

### **Suporte a Markdown**
- Títulos (H1-H6)
- Parágrafos
- Listas (ordenadas e não ordenadas)
- Negrito e itálico
- Blocos de código
- Citações
- Links e imagens

---

## 🧪 Testes e Validação

### **Validação de Backup**
```javascript
if (!backupData.biografia || !backupData.ideias) {
    alert('❌ Arquivo de backup inválido. Estrutura incorreta.');
    return;
}
```

### **Tratamento de Erros**
```javascript
try {
    const backupData = JSON.parse(e.target.result);
    // ...
} catch (error) {
    alert('❌ Erro ao ler o arquivo de backup...');
    console.error('Erro de importação:', error);
}
```

### **Verificação de Modo**
```javascript
if (currentMode !== 'ideias' || !currentIdeaId) return;
```

---

## 📊 Fluxo de Dados

```
Usuário → Editor Markdown → updatePreview() → Marked.js → HTML Preview
                ↓
          saveCurrentData()
                ↓
          LocalStorage
                ↓
          spark_biografia (String)
          spark_registros_ideias (JSON)
                ↓
          exportBackup() → JSON File
          importBackup() ← JSON File
```

---

## 🔒 Considerações de Segurança

### **LocalStorage**
- Dados persistem no navegador
- Não são enviados automaticamente em requisições
- Podem ser limpos pelo usuário
- Limitados por origem (domain)

### **XSS Prevention**
- Marked.js converte Markdown para HTML
- Para produção, considere adicionar DOMPurify para sanitização
- Isso previne injeção de scripts maliciosos via backup

### **Validação de Input**
- Backup importado é validado antes de restauração
- Estrutura JSON é verificada
- Erros de parse são capturados

---

## 🚀 Performance Considerations

### **LocalStorage Limits**
- Chrome/Edge: ~5-10MB por origem
- Firefox: ~5-10MB por origem
- Safari: ~5MB por origem

### **Otimizações**
- Preview atualizado apenas oninput (não onkeyup)
- Array de ideias mantido em memória para evitar parse frequente
- Backup usa JSON.stringify com formatação para legibilidade

---

## 📝 Constantes e Configurações

### **TEMPLATE_BOAS_VINDAS**
```javascript
const TEMPLATE_BOAS_VINDAS = `# Bem-vindo ao Spark Registros
### Seu espaço seguro para documentar sua história e suas ideias.

Este é o seu diário e caderno de bordo pessoal, projetado com foco em privacidade, autonomia e soberania de dados. Tudo o que você escreve aqui é armazenado de forma 100% local no seu dispositivo, sem o uso de servidores externos (Zero-Server Architecture).

## Como começar?
- **Minha Biografia:** Use este espaço fixo para redigir sua trajetória profissional, seu manifesto ou seu diário oficial.
- **Agenda de Ideias:** Clique em "+ Nova" na barra lateral para criar registros dinâmicos para seus insights de negócios, códigos, projetos ou atas de reunião.`;
```

### **Chaves do LocalStorage**
```javascript
'spark_biografia'           // Biografia/Registro Principal
'spark_registros_ideias'    // Array de Ideias
```

---

## 🔄 Extensibilidade

### **Adicionar Novos Modos**
Para adicionar um novo modo (ex: "Diário"):
1. Adicionar nova chave ao LocalStorage
2. Adicionar opção no menu HTML
3. Atualizar `switchMode()` para handle novo modo
4. Adicionar lógica de salvamento em `saveCurrentData()`

### **Adicionar Campos às Ideias**
Para adicionar novos campos (ex: "tags"):
1. Atualizar estrutura do objeto ideia
2. Atualizar `createNewIdea()` para incluir novo campo
3. Atualizar `saveCurrentData()` para salvar novo campo
4. Atualizar UI para exibir/editar novo campo

### **Integrar com Outros Parsers**
Para substituir Marked.js:
1. Baixar biblioteca alternativa
2. Atualizar CDN em index.html
3. Modificar `updatePreview()` para usar novo parser
