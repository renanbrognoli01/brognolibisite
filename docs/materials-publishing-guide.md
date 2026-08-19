# Publicação de materiais para download

A página `/pt-br/materials` (e sua versão `/en/materials`) usa:

- **Supabase** para o catálogo e os metadados;
- **Vercel Blob público** para armazenar e entregar os arquivos grandes;
- qualquer URL direta alternativa também pode ser usada em `download_url`.

Depois da configuração inicial, publicar um material não exige commit nem novo deploy.

## Configuração inicial

### 1. Criar a tabela no Supabase

1. Abra o projeto Supabase já usado pelo site.
2. Entre em **SQL Editor**.
3. Execute o conteúdo de `supabase/materials.sql`.
4. Confirme no **Table Editor** que a tabela `materials` foi criada.

A política criada pelo script permite que visitantes leiam apenas registros com
`is_published = true`. Inclusões e alterações continuam restritas ao painel do
Supabase.

### 2. Criar o armazenamento na Vercel

1. Abra o projeto do site na Vercel.
2. Entre em **Storage**.
3. Crie um Blob Store com acesso **Public**.
4. Use um nome como `brognoli-materials`.

Arquivos públicos podem ser baixados por qualquer pessoa que possua a URL. Não
envie materiais privados, credenciais ou dados pessoais para esse armazenamento.

## Publicar um novo material

### 1. Subir o arquivo

1. Abra o Blob Store no painel da Vercel.
2. Use uma pasta por tema ou vídeo, por exemplo:
   `materials/power-bi/contexto-de-filtro/arquivo-exemplo.pbix`.
3. Faça o upload.
4. Copie a URL pública ou a URL de download do arquivo.

Convenção recomendada para nomes:

- apenas letras minúsculas, números e hífens;
- sem espaços ou acentos;
- mantenha a extensão original (`.pbix`, `.xlsx`, `.zip`, `.pdf`, etc.).

### 2. Cadastrar no Supabase

Abra **Table Editor → materials → Insert row** e preencha:

| Campo | Uso |
| --- | --- |
| `slug` | Identificador único, como `contexto-de-filtro-power-bi` |
| `title` | Nome exibido no card |
| `description` | Resumo do conteúdo do arquivo |
| `category` | Ex.: `Power BI`, `Excel`, `DAX`, `Fabric` |
| `language` | `pt-br`, `en` ou `both` |
| `file_name` | Nome que identifica o arquivo |
| `file_type` | Ex.: `PBIX`, `XLSX`, `ZIP`, `PDF` |
| `file_size_bytes` | Tamanho em bytes; pode ficar vazio |
| `download_url` | URL pública/direta copiada do armazenamento |
| `video_url` | Link do vídeo relacionado; opcional |
| `thumbnail_url` | Thumbnail do YouTube ou outra imagem; opcional |
| `published_at` | Data de publicação |
| `is_published` | Marque `true` para aparecer no site |

O catálogo do site é revalidado a cada cinco minutos. Para preparar um material
sem publicá-lo imediatamente, deixe `is_published = false`.

## Alternativa: Supabase Storage

O arquivo também pode ficar em um bucket público do Supabase. Nesse caso, copie
a URL pública e acrescente `?download` se quiser forçar o download. O catálogo
continua usando a mesma coluna `download_url`.

Antes de escolher essa alternativa para arquivos grandes, confira o limite de
upload do plano do projeto Supabase.
