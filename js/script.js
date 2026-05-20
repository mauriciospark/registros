/*
  ============================================================================
  PROPRIETÁRIO: Mauricio Spark
  MARCA: SparkMauricio
  PROJETO: Registros  
  VERSÃO: v1.0.0
  LINHAGEM: SPARK
  ============================================================================
  Documento de Planejamento de Escopo
  COPYRIGHT: © 2026 / Mauricio Spark. Todos os direitos reservados.
  ============================================================================
*/
// Inicialização de dados padrão (Caso o LocalStorage esteja vazio)
const TEMPLATE_BOAS_VINDAS = `# Bem-vindo ao Spark Registros
### Seu espaço seguro para documentar sua história e suas ideias.

Este é o seu diário e caderno de bordo pessoal, projetado com foco em privacidade, autonomia e soberania de dados. Tudo o que você escreve aqui é armazenado de forma 100% local no seu dispositivo, sem o uso de servidores externos (Zero-Server Architecture).

## Como começar?
- **Minha Biografia:** Use este espaço fixo para redigir sua trajetória profissional, seu manifesto ou seu diário oficial.
- **Agenda de Ideias:** Clique em "+ Nova" na barra lateral para criar registros dinâmicos para seus insights de negócios, códigos, projetos ou atas de reunião.`;

        // Estado da aplicação
        let currentMode = 'biografia'; // 'biografia' ou 'ideias'
        let ideas = [];
        let currentIdeaId = null;

        // Carregar dados iniciais do LocalStorage
        function initData() {
            // Carregar Biografia
            if (!localStorage.getItem('spark_biografia')) {
                localStorage.setItem('spark_biografia', TEMPLATE_BOAS_VINDAS);
            }
            
            // Carregar Ideias
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

            // Exibir modo inicial
            switchMode('biografia');
        }

        // Alternar entre o modo Biografia e Agenda de Ideias
        function switchMode(mode) {
            currentMode = mode;
            
            // Atualizar classes dos botões do menu
            document.getElementById('btn-menu-biografia').classList.toggle('active', mode === 'biografia');
            document.getElementById('btn-menu-ideias').classList.toggle('active', mode === 'ideias');
            
            // Mostrar ou ocultar lista de ideias na sidebar
            const ideasSection = document.getElementById('ideas-sidebar-section');
            const deleteBtn = document.getElementById('delete-btn');
            const titleInput = document.getElementById('current-title');

            if (mode === 'biografia') {
                ideasSection.style.display = 'none';
                deleteBtn.style.display = 'none';
                titleInput.value = "Espaço de Registro";
                titleInput.disabled = true; // Título fixo para a biografia
                
                // Carrega conteúdo da biografia no editor
                document.getElementById('markdown-editor').value = localStorage.getItem('spark_biografia');
                updatePreview();
            } else {
                ideasSection.style.display = 'flex';
                deleteBtn.style.display = 'block';
                titleInput.disabled = false;
                
                renderIdeasSidebar();
                
                // Selecionar a primeira ideia se houver
                if (ideas.length > 0) {
                    selectIdea(ideas[0].id);
                } else {
                    createNewIdea();
                }
            }
        }

        // Renderizar a lista de ideias na barra lateral
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

        // Selecionar uma ideia específica para editar
        function selectIdea(id) {
            currentIdeaId = id;
            const idea = ideas.find(i => i.id === id);
            if (idea) {
                document.getElementById('current-title').value = idea.title;
                document.getElementById('markdown-editor').value = idea.content;
                
                // Marcar item ativo na barra lateral
                renderIdeasSidebar();
                updatePreview();
            }
        }

        // Criar uma nova ideia na lista
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

        // Deletar a ideia selecionada atualmente
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

        // Atualizar a visualização em tempo real (Markdown para HTML)
        function updatePreview() {
            const mdText = document.getElementById('markdown-editor').value;
            // Utilizando a biblioteca Marked.js para converter markdown em HTML de forma segura
            document.getElementById('markdown-preview').innerHTML = marked.parse(mdText);
        }

        // Salvar os dados atuais no LocalStorage
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

        // Exportar um arquivo JSON de backup de todas as informações (Zero-Server Sovereignty)
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

        // Importar um arquivo JSON de backup
        function importBackup() {
            const fileInput = document.getElementById('fileInput');
            fileInput.click();
        }

        // Event listener para o input file
        document.getElementById('fileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const backupData = JSON.parse(e.target.result);

                    // Validar estrutura do backup
                    if (!backupData.biografia || !backupData.ideias) {
                        alert('❌ Arquivo de backup inválido. Estrutura incorreta.');
                        return;
                    }

                    // Restaurar dados no LocalStorage
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

            // Limpar o input para permitir selecionar o mesmo arquivo novamente
            event.target.value = '';
        });

        // Monitorar atalhos de teclado (Ctrl + S para salvar)
        window.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                saveCurrentData();
            }
        });

        // Inicializar aplicação ao carregar a página
        window.onload = initData;