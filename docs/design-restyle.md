# Revisão visual com a estrutura original

A proposta editorial anterior foi rejeitada. A orientação atual do usuário é manter integralmente os textos, a ordem das seções, a distribuição, as imagens e os links originais, refinando apenas a aparência.

A referência desta revisão é origin/main. Os 24 arquivos de páginas e rotas em src/app permanecem idênticos ao original (desconsiderando apenas CRLF/LF). Os componentes de idioma, login e galeria também foram restaurados. O seletor de telas introduzido na proposta rejeitada foi removido.

Escopo visual:
- Mesma marca, família tipográfica, larguras, grades, paddings e espaçamentos.
- Azul escuro e dourado da marca com superfícies sólidas e contraste mais consistente.
- Menos brilho e sombras profundas; cantos mais discretos nos mesmos blocos.
- Mesmos títulos e rótulos, com tratamento tipográfico menos espaçado.
- Mesmos botões, textos e destinos, com acabamento de superfície e foco de teclado.

A solicitação explícita de preservar a estrutura e o conteúdo tem prioridade sobre as regras genéricas da skill que pedem cortar títulos longos, remover rótulos, substituir grades ou mudar a composição. Essas estruturas do site original são mantidas intencionalmente. A direção e a avaliação da proposta anterior não se aplicam a esta revisão.

Nenhuma imagem nova, foto de banco, texto de exemplo, testemunho ou métrica foi introduzida. Não há novos créditos de imagem.

Validação: lint e build Next.js aprovados; comparação dos 24 arquivos de páginas/rotas com o original aprovada. Conferência visual em 1440, 768 e 390 pixels. Não foram realizadas submissões de formulários nem operações de cobrança.

Inspeção da home refeita nas três larguras e todas as capturas abertas. O inspector ainda sinaliza 9 ocorrências de regras genéricas (títulos originais longos, rótulos, cartões com ícones, tamanho de texto herdado, quantidade/proporção das imagens e ausência de animação). Elas não foram eliminadas por cortes de conteúdo ou redistribuição: a orientação explícita de manter o site original prevalece. Não se declara aprovação integral da skill. O resultado é um refinamento conservador, não a proposta editorial anterior.
