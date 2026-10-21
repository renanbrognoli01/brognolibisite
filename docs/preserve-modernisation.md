# Modernização em modo Preserve

## Limites
Base: main, commit 26cb3a4. Todos os 21 componentes page.tsx continuam idênticos ao original. Mantidos textos visíveis, ordem de seções, grades, espaçamentos, imagens, URLs existentes, rótulos primários do menu, campos de formulário, logo e cópia legal. Os endpoints sitemap.xml e robots.txt são adições técnicas, sem migração de páginas.

## Implementação
- Tokens de raios e duração; superfícies sólidas e redução de sombras/gradientes nos componentes existentes.
- Mesma tipografia e tamanhos; rótulos e contraste refinados, foco de teclado consistente, estados hover/pressionado e movimento reduzido.
- Menu móvel com os nove rótulos originais, acesso à conta, Escape, fechamento ao navegar e clique externo. Sem mudar a navegação desktop.
- Metadados por rota, canonical sem parâmetros de campanha, hreflang PT/EN e metadados dos artigos derivados dos títulos/resumos existentes.
- Idioma HTML correto na resposta inicial e após troca de idioma por navegação cliente.
- Sitemap para páginas públicas, artigos e materiais publicados; conta/autenticação fora dele e com noindex.
- Cabeçalho interno de rota sobrescrito pelo proxy a partir da URL real, sem confiar em valor fornecido pelo visitante.

## Validação
- Lint e build de produção aprovados.
- Comparação direta dos componentes de página, dicionário de textos/menu, componentes de formulário e imagem do logo contra a base: preservados.
- Teste de integração tests/preserve-seo.mjs: títulos distintos, idioma, canonical, alternates, artigo, noindex, 404, sitemap, robots e resistência a spoofing do cabeçalho.
- Navegador real: nove links e Login no menu móvel, fechamento por Escape, metadados após navegação cliente, idioma após troca PT/EN e ausência de overflow em 320px.
- A aparência de marketing deixa de ser aplicada ao navegar para as páginas legais; conteúdo legal preservado.
- Sem submissões de formulários, alterações de conta, compras ou operações de cobrança.

## Inspeção visual e prioridade das instruções
A skill continua sendo uma referência para refinamento, e não autorização para reescrever ou redistribuir o site. A composição adotada é a original, sem nova direção sorteada, fotografias de banco, imagens geradas ou conteúdo de exemplo.

O inspector foi executado em 1440, 768 e 390px. Restam flags de estilo herdadas da base: títulos longos, rótulos, grades com ícones, densidade/tamanho do texto, proporção/quantidade das imagens e ausência de animações de entrada. Preservá-los atende à instrução explícita de conservar textos e estrutura. Não se declara aprovação integral da skill nem usa seu score como critério para alterar o conteúdo.

A home permanece com a apresentação de Renan e retrato à direita no desktop; as seções originais e os planos do Studio permanecem em suas posições. A modernização é deliberadamente conservadora. Não há novos créditos de imagem: todos os assets são os existentes.
