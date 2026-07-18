import { metadataBase } from "@book-landings/landing-seo";
import { CTAButton, EditorialHero, Footer } from "@book-landings/landing-ui";
import { agroLibrarySiteConfig } from "../site.config";

export const metadata = metadataBase({
  site: agroLibrarySiteConfig,
  title: "AMI Team Publishing | Professional books for physical commodity markets",
  description: "Free professional editions for physical commodity brokers, traders, farmers, and market operators."
});

export default function Page() {
  return (
    <main>
      <EditorialHero
        title="Professional books for physical commodity markets"
        eyebrow="AMI Team Publishing"
        subtitle="Free practical editions for commodity brokers, traders, farmers, and market operators. Built around how physical markets, execution, logistics, and commercial decisions work in practice."
        actions={<CTAButton href="#catalog">Explore free books</CTAButton>}
      />
      <section id="catalog" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Free book library</h2>
        <p>The first English and Ukrainian editions are being prepared for publication.</p>
      </section>
      <section aria-labelledby="professional-notice-title">
        <h2 id="professional-notice-title">Professional materials</h2>
        <p>These editions are educational and operational materials. They are not investment advice and do not make price forecasts or return claims.</p>
      </section>
      <Footer legalHref="/legal" privacyHref="/privacy">
        <p>Published by AMI team. Developed by <a href="https://abvx.xyz" target="_blank" rel="noopener noreferrer">ABVx</a>.</p>
        <p><a href="mailto:abv@mn7r.com">abv@mn7r.com</a></p>
      </Footer>
    </main>
  );
}
