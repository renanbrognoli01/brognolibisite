import { ProductShowcase } from "@/components/product-showcase";
import { GlassCard, PageHero, Section } from "@/components/ui";
import { siteData } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];
  const isPt = locale === "pt-br";

  return (
    <>
      <PageHero title={dict.products.title} description={dict.products.description}>
        <div className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-2xl font-semibold text-white">
            {isPt
              ? "Produtos digitais com foco em valor real para a rotina"
              : "Digital products designed to create real value in daily life"}
          </h2>
          <p className="text-sm leading-7 text-white/72">
            {isPt
              ? "Aqui voce encontra produtos do ecossistema Brognoli apresentados de forma mais clara, com explicacao do que cada um faz, para quem ele foi criado e como acessar."
              : "Here you can explore products from the Brognoli ecosystem with clear explanations about what each one does, who it is for, and how to access it."}
          </p>
        </div>
      </PageHero>

      <Section
        eyebrow={isPt ? "Portifolio" : "Portfolio"}
        title={isPt ? "Escolha um produto para ver os detalhes" : "Choose a product to view details"}
        description={
          isPt
            ? "A ideia aqui e manter a navegacao simples: voce escolhe o produto e o conteudo aparece logo abaixo, sem precisar sair do site para entender a proposta."
            : "The idea here is to keep navigation simple: choose a product and the content appears right below, without forcing you to leave the site just to understand the offer."
        }
      >
        <ProductShowcase locale={locale} />
      </Section>

      <Section
        eyebrow={isPt ? "Proximos passos" : "Next steps"}
        title={isPt ? "Mais produtos vao entrar aqui em breve" : "More products will be added here soon"}
        description={
          isPt
            ? "Esta estrutura ja esta pronta para receber novos apps, plataformas, ebooks e produtos digitais do Grupo Brognoli."
            : "This structure is already prepared to receive new apps, platforms, ebooks, and digital products from the Brognoli ecosystem."
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          <GlassCard
            title={isPt ? "Apps e mobile" : "Apps and mobile"}
            description={
              isPt
                ? "Espaco pronto para produtos publicados em App Store e Play Store."
                : "Ready for products published to the App Store and Play Store."
            }
          />
          <GlassCard
            title={isPt ? "Ferramentas e software" : "Tools and software"}
            description={
              isPt
                ? "Produtos focados em produtividade, dados, BI e automacao."
                : "Products focused on productivity, data, BI, and automation."
            }
          />
          <GlassCard
            title={isPt ? "Conteudo digital" : "Digital content"}
            description={
              isPt
                ? "Guias, ebooks e materiais criados para aprendizado pratico."
                : "Guides, ebooks, and materials created for practical learning."
            }
          />
        </div>
      </Section>
    </>
  );
}
