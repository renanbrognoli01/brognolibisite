# Publicação automática de materiais

A página `/pt-br/materials` (e sua versão `/en/materials`) lista automaticamente
todos os arquivos do Vercel Blob conectado ao projeto. Não existe cadastro no
Supabase nem outro painel: terminou o upload, o material entra no catálogo.

## Configuração única do Vercel Blob

1. Abra o projeto **Brognoli BI** no painel da Vercel.
2. No menu lateral do projeto, entre em **Storage**.
3. Selecione **Create Database**.
4. Escolha **Blob** e avance em **Continue**.
5. Defina o acesso como **Public**.
6. Use um nome como `brognoli-materials`.
7. Conecte o armazenamento aos ambientes **Production**, **Preview** e
   **Development** do projeto.
8. Conclua a criação.

A Vercel adicionará automaticamente a variável `BLOB_READ_WRITE_TOKEN` ao
projeto. Faça um novo deploy após a criação para que a aplicação receba a
variável pela primeira vez.

Use esse armazenamento somente para materiais públicos. Qualquer pessoa que
possua a URL poderá baixar o arquivo.

## Publicar um material

1. Abra **Vercel → projeto Brognoli BI → Storage**.
2. Selecione o Blob Store `brognoli-materials`.
3. Na área de arquivos, clique em **Upload**.
4. Escolha o arquivo e aguarde o upload terminar.

Pronto. Em até trinta minutos ele aparecerá automaticamente na página de
materiais. Não é necessário copiar URL, abrir o Supabase, fazer commit ou gerar
outro deploy.

## Como o card é montado

O site usa os dados do próprio arquivo:

| Informação do card | Origem |
| --- | --- |
| Título | Nome do arquivo sem a extensão |
| Formato | Extensão do arquivo |
| Tamanho | Tamanho registrado no Blob |
| Data | Data do upload |
| Download | URL direta criada pelo Blob |
| Categoria | Primeira pasta ou, se não houver pasta, o tipo do arquivo |

Exemplo:

`Power-BI/contexto-de-filtro.pbix`

Será exibido como **Contexto de Filtro**, na categoria **Power BI**, com o
formato **PBIX**.

As pastas são opcionais. Você pode simplesmente fazer o upload na raiz. Para um
catálogo mais organizado, use nomes como:

- `Power-BI/modelo-vendas.pbix`
- `Excel/dashboard-financeiro.xlsx`
- `DAX/medidas-time-intelligence.zip`
- `Fabric/notebook-lakehouse.ipynb`

Prefira nomes descritivos com hífens e mantenha a extensão original.

## Remover ou substituir

Para retirar um material do site, exclua o arquivo no próprio Blob Store. Para
substituí-lo, remova a versão anterior e envie o novo arquivo com o nome desejado.
O catálogo refletirá a alteração automaticamente em até trinta minutos.
