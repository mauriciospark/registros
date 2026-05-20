# 🤝 Diretrizes de Contribuição (CONTRIBUTING.md)

Este documento estabelece as diretrizes para contribuir com o projeto **Spark Registros**, incluindo padrões de código, fluxo de trabalho Git e compromissos com a filosofia Local-First.

---

## 📋 Padrão de Estilo de Código (HTML, CSS, JS)

### **HTML**

#### **Estrutura e Semântica**
- Use HTML5 semântico (`<header>`, `<nav>`, `<main>`, `<section>`, etc.)
- Mantenha indentação consistente (2 ou 4 espaços)
- Use minúsculas para tags e atributos
- Feche todas as tags explicitamente (mesmo tags auto-fecháveis)
- Adicione comentários para seções complexas

#### **Exemplo:**
```html
<!-- Header Principal -->
<header class="workspace-header">
    <input type="text" id="current-title" class="note-title-input" value="Espaço de Registro">
    <div class="action-buttons">
        <button class="btn" onclick="saveCurrentData()">💾 Salvar Local</button>
    </div>
</header>
```

#### **Boas Práticas**
- Use classes em vez de IDs para estilização (exceto para elementos únicos)
- Mantenha atributos em ordem lógica: `id`, `class`, `type`, `value`, `onclick`
- Use aspas duplas para valores de atributos
- Evite JavaScript inline (use event listeners quando possível)

---

### **CSS**

#### **Organização**
- Use CSS Variables (Custom Properties) para cores e valores reutilizáveis
- Agrupe estilos por componente/seção
- Use BEM (Block Element Modifier) ou convenção similar para classes
- Mantenha seletores específicos, mas não excessivamente aninhados

#### **Exemplo:**
```css
:root {
    --bg-primary: #121214;
    --text-main: #e1e1e6;
    --accent: #00875f;
}

.sidebar {
    width: 300px;
    background-color: var(--bg-sidebar);
}

.menu-btn {
    width: 100%;
    padding: 12px;
}

.menu-btn:hover,
.menu-btn.active {
    background-color: var(--bg-card);
}
```

#### **Boas Práticas**
- Use unidades relativas (rem, em, %) quando possível
- Prefira Flexbox e Grid sobre floats
- Mantenha ordem de propriedades: posicionamento, layout, tipografia, visual
- Adicione comentários para hacks ou soluções não óbvias
- Use media queries para responsividade

---

### **JavaScript**

#### **Convenções de Nomenclatura**
- **Variáveis e Funções:** camelCase (`currentMode`, `saveCurrentData`)
- **Constantes:** UPPER_SNAKE_CASE (`TEMPLATE_BOAS_VINDAS`, `MAX_ITEMS`)
- **Classes:** PascalCase (se usar classes ES6)
- **Privado:** Prefixo underscore (`_internalFunction`)

#### **Exemplo:**
```javascript
// Constantes
const TEMPLATE_BOAS_VINDAS = `...`;
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB

// Variáveis
let currentMode = 'biografia';
let ideas = [];
let currentIdeaId = null;

// Funções
function initData() {
    // ...
}

function saveCurrentData() {
    // ...
}

// Privado (convenção)
function _validateBackup(data) {
    // ...
}
```

#### **Boas Práticas**
- Use `const` para valores que não mudam, `let` para variáveis
- Evite `var` (use ES6+)
- Use arrow functions para callbacks curtas
- Adicione JSDoc para funções complexas
- Mantenha funções pequenas e focadas (máximo 50 linhas)
- Use early returns para reduzir aninhamento

#### **Exemplo com JSDoc:**
```javascript
/**
 * Salva os dados atuais no LocalStorage
 * @param {string} mode - Modo atual ('biografia' ou 'ideias')
 * @returns {void}
 */
function saveCurrentData(mode) {
    // ...
}
```

---

## 🌿 Fluxo de Ramificação (Git Flow)

### **Branches Principais**

#### **main**
- Branch de produção
- Código estável e testado
- Apenas merges de release/hotfix

#### **develop**
- Branch de desenvolvimento
- Integração de features
- Código em desenvolvimento

### **Branches de Feature**

#### **Criação**
```bash
git checkout develop
git checkout -b feature/nome-da-feature
```

#### **Nomenclatura**
- `feature/` - Novas funcionalidades
- `bugfix/` - Correção de bugs
- `hotfix/` - Correções urgentes em produção
- `refactor/` - Refatoração de código
- `docs/` - Atualização de documentação
- `style/` - Formatação de código (sem lógica)
- `test/` - Adição de testes
- `chore/` - Atualizações de build/dependências

#### **Exemplos:**
```bash
feature/add-dark-mode
bugfix/fix-localstorage-limit
hotfix/critical-security-patch
refactor/optimize-preview-rendering
docs/update-api-documentation
```

---

## 📝 Padrão de Commits Semânticos (Conventional Commits)

### **Estrutura do Commit**
```
<tipo>(<escopo>): <descrição curta>

<body opcional>

<footer opcional>
```

### **Tipos de Commit**

- **feat:** Nova funcionalidade
- **fix:** Correção de bug
- **docs:** Alteração na documentação
- **style:** Formatação de código (sem lógica)
- **refactor:** Refatoração de código
- **test:** Adição ou modificação de testes
- **chore:** Atualização de build/dependências
- **perf:** Melhoria de performance

### **Exemplos:**

#### **feat**
```bash
feat(backup): add compression to export function

Implement gzip compression for backup files to reduce
file size by approximately 60%.

Closes #123
```

#### **fix**
```bash
fix(editor): resolve markdown preview not updating on paste

The oninput event was not triggered when pasting content.
Added onpaste event listener to handle this case.

Fixes #456
```

#### **docs**
```bash
docs(readme): update installation instructions

Added new deployment options for Vercel and Netlify.
Updated CDN links for Marked.js.
```

#### **refactor**
```bash
refactor(storage): optimize localStorage access patterns

Cache localStorage reads in memory to reduce
API calls and improve performance.
```

### **Boas Práticas**
- Use imperativo no presente ("add" não "added")
- Limite a primeira linha a 50 caracteres
- Limite o corpo a 72 caracteres por linha
- Referencione issues com `Closes #123` ou `Fixes #456`
- Adicione `BREAKING CHANGE:` no footer para mudanças quebrantes

---

## 🔒 Compromisso Local-First

### **Princípios Fundamentais**

#### **Zero-Server Architecture**
- **Proibido:** Introduzir backend, APIs externas ou serviços de autenticação
- **Obrigatório:** Manter tudo client-side (LocalStorage)
- **Exceção:** CDNs para bibliotecas essenciais (Marked.js)

#### **Privacidade por Padrão**
- **Proibido:** Analytics, rastreadores, cookies de terceiros
- **Proibido:** Coleta de dados de usuário
- **Proibido:** Envio de dados para servidores externos
- **Obrigatório:** Processamento 100% local

#### **Soberania de Dados**
- **Obrigatório:** Usuário tem controle total dos dados
- **Obrigatório:** Portabilidade completa (backup/restore)
- **Obrigatório:** Formato aberto e legível (JSON)
- **Proibido:** Lock-in de dados ou formatos proprietários

### **Regras Específicas**

#### **Conexões Externas**
- **Permitido:** CDNs para bibliotecas essenciais (Marked.js)
- **Permitido:** Links para documentação externa
- **Proibido:** Chamadas AJAX/Fetch para APIs
- **Proibido:** WebSockets ou WebRTC
- **Proibido:** Service Workers que sincronizam dados

#### **Dependências**
- **Preferência:** Bibliotecas via CDN (sem build step)
- **Proibido:** Dependências que enviam dados (analytics, tracking)
- **Proibido:** Dependências com licenças restritivas
- **Recomendado:** Bibliotecas com licenças permissivas (MIT, BSD, Apache)

#### **LocalStorage**
- **Obrigatório:** Usar LocalStorage para persistência
- **Obrigatório:** Validar limites de armazenamento
- **Obrigatório:** Tratar erros de quota excedida
- **Recomendado:** Implementar compressão para grandes volumes

---

## 🧪 Testes

### **Tipos de Testes**

#### **Testes Unitários**
- Testar funções individuais
- Mock de LocalStorage
- Testar edge cases

#### **Testes de Integração**
- Testar fluxos completos (criar, editar, salvar, excluir)
- Testar backup/restore
- Testar alternância de modos

#### **Testes E2E (Opcional)**
- Testar com Playwright ou Cypress
- Simular interações do usuário
- Testar cross-browser

### **Exemplo de Teste Unitário**
```javascript
describe('saveCurrentData', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should save biography in biografia mode', () => {
        currentMode = 'biografia';
        const editorText = '# Test Content';
        
        saveCurrentData();
        
        expect(localStorage.getItem('spark_biografia')).toBe(editorText);
    });
});
```

---

## 📋 Processo de Pull Request

### **Antes de Abrir PR**

1. **Atualize Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/sua-feature
   git rebase develop
   ```

2. **Resolva Conflitos**
   - Resolva conflitos manualmente
   - Teste após resolução

3. **Execute Testes**
   ```bash
   npm test
   ```

4. **Formate Código**
   ```bash
   npm run format
   ```

### **Template de PR**

```markdown
## Descrição
Breve descrição da mudança implementada.

## Tipo de Mudança
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Motivação
Por que esta mudança é necessária?

## Como Testar
Passos para testar a mudança:
1. ...
2. ...

## Screenshots (se aplicável)
Adicione screenshots para mudanças visuais.

## Checklist
- [ ] Código segue padrões de estilo
- [ ] Adicionou/atualizou documentação
- [ ] Adicionou testes (se aplicável)
- [ ] Todos os testes passam
- [ ] Sem conflitos com develop
- [ ] Compromisso Local-First mantido
```

---

## � Reportando Bugs

### **Template de Issue**

```markdown
## Descrição
Descrição clara e concisa do bug.

## Passos para Reproduzir
1. Vá para '...'
2. Clique em '....'
3. Role até '....'
4. Veja o erro

## Comportamento Esperado
Descrição do comportamento esperado.

## Comportamento Atual
Descrição do comportamento atual.

## Screenshots
Adicione screenshots se aplicável.

## Ambiente
- OS: [Windows 10, macOS, Linux]
- Browser: [Chrome 90, Firefox 88, Safari 14]
- Versão: [v1.0.0]

## Contexto Adicional
Informações adicionais sobre o problema.
```

---

## 💡 Sugestões de Features

### **Template de Issue**

```markdown
## Descrição
Descrição clara da feature sugerida.

## Motivação
Por que esta feature seria útil?

## Solução Proposta
Descrição de como você imagina a implementação.

## Alternativas
Outras soluções consideradas.

## Contexto Adicional
Informações adicionais.
```

---

## 📚 Documentação

### **Quando Atualizar Documentação**

- Adicionar nova funcionalidade → Atualizar FEATURES.md
- Alterar API → Atualizar API.md
- Mudar processo de instalação → Atualizar INSTALLATION.md
- Adicionar novas diretrizes → Atualizar CONTRIBUTING.md
- Mudanças significativas → Atualizar README.md

### **Padrão de Documentação**

- Use Markdown claro e conciso
- Adicione exemplos de código
- Use emojis para melhorar legibilidade
- Mantenha documentação atualizada
- Adicione diagramas quando útil

---

## 🎯 Código de Conduta

### **Princípios**

- **Respeito:** Trate todos com respeito e profissionalismo
- **Inclusão:** Seja acolhedor com novos contribuidores
- **Colaboração:** Trabalhe em equipe, não sozinho
- **Construtividade:** Feedback construtivo e positivo
- **Transparência:** Seja transparente sobre limitações

### **Comportamento Inaceitável**

- Linguagem ofensiva ou discriminatória
- Assédio ou intimidação
- Ataques pessoais
- Spam ou trolling
- Divulgação de informações privadas

---

## 🏆 Reconhecimento

### **Contribuidores**

Todos os contribuidores serão listados no README.md e receberão crédito por suas contribuições.

### **Tipos de Contribuição**

- Código (features, bugfixes, refactoring)
- Documentação
- Testes
- Design/UI
- Traduções
- Report de bugs
- Sugestões de features

---

## 📞 Contato e Suporte

### **Canais de Comunicação**

- **Issues:** Para bugs e features
- **Discussions:** Para perguntas e debates
- **Pull Requests:** Para contribuições de código

### **Tempo de Resposta**

- **Issues Críticas:** 24-48 horas
- **Issues Normais:** 3-5 dias
- **Pull Requests:** 1-3 dias
- **Discussões:** 1-2 dias

---

## ✅ Checklist de Contribuição

Antes de submeter sua contribuição, verifique:

- [ ] Li e entendi as diretrizes de contribuição
- [ ] Meu código segue os padrões de estilo
- [ ] Adicionei/atualizei a documentação necessária
- [ ] Adicionei testes para minha mudança
- [ ] Todos os testes passam
- [ ] Minha contribuição mantém o compromisso Local-First
- [ ] Não introduzi rastreadores ou conexões externas
- [ ] Usei commits semânticos
- [ ] Fiz rebase com a branch develop
- [ ] Preenchi o template de PR/Issue adequadamente

---

## 🔄 Licença

Ao contribuir com o projeto, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto (MIT License).

---

## 🌟 Agradecimentos

Obrigado por considerar contribuir com o **Spark Registros**! Sua ajuda é fundamental para manter e melhorar este projeto.
