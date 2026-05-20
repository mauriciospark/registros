# ⚡ Spark Registros
### 📦 Sistema Autónomo de Anotações e Caderno de Bordo | Zero-Server Architecture

O **Spark Registros** é uma aplicação de gerenciamento de notas, diários e cadernos de bordo desenvolvida sob o ecossistema da **Linhagem SPARK**. O projeto foi desenhado sob o conceito de **Soberania de Dados (Local-First)**, garantindo que o usuário tenha controle absoluto sobre suas informações, processando e armazenando tudo diretamente no cliente (client-side), sem dependência de bancos de dados em nuvem ou servidores externos.

---

## 📂 Documentação Completa do Ecossistema
Para facilitar a navegação no projeto e manter o padrão corporativo de nível de produção, a documentação foi dividida nos seguintes módulos:

1. 🚀 **[Recursos do Sistema (FEATURES.md)](./FEATURES.md)** - Detalhamento das funcionalidades, atalhos, regras do editor Markdown e funcionamento do ecossistema Local-First.
2. 🛠️ **[Guia de Instalação (INSTALLATION.md)](./INSTALLATION.md)** - Como clonar, executar localmente, integrar dependências via CDN e implantar (deploy) em produção.
3. ⚙️ **[Especificação da Arquitetura (API.md)](./API.md)** - Estrutura de dados do LocalStorage, ciclo de vida dos eventos e documentação dos métodos de Backup (Blob / FileReader).
4. 🤝 **[Guia de Contribuição (CONTRIBUTING.md)](./CONTRIBUTING.md)** - Padrões de código, nomenclatura de commits, fluxo de ramificação (Git Flow) e diretrizes para a comunidade.

---

## 🛠️ Tecnologias Utilizadas
* **Frontend:** HTML5 Semântico & CSS3 (Variáveis modernas e Layout Responsivo).
* **Engine de Lógica:** JavaScript Vanilla (ES6+).
* **Gerenciamento de Estado/Dados:** Web Storage API (`LocalStorage`).
* **Parser de Markdown:** Marked.js via CDN.

---

## 📂 Estrutura do Repositório
```text
├── index.html                     # Interface do usuário, menu lateral e workspace.
├── css/
│   └── style.css                  # Estilização completa do ecossistema visual Dark Modern.
├── js/
│   └── script.js                  # Core do sistema (Persistência local, atalhos e backup).
├── docs/
│   ├── README.md                  # Visão geral e portal da documentação (Este arquivo).
│   ├── FEATURES.md                # Manual de funcionalidades e UX.
│   ├── INSTALLATION.md            # Manual de deploy e execução local.
│   ├── API.md                     # Documentação das funções JS e LocalStorage.
│   └── CONTRIBUTING.md            # Diretrizes para novos desenvolvedores.
└── json/
    └── spark_registros_brain.json # Configuração e especificação do projeto.
```
