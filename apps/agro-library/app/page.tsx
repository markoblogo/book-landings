import { metadataBase } from "@book-landings/landing-seo";
import { EditorialHero, Footer } from "@book-landings/landing-ui";
import { agroLibrarySiteConfig } from "../site.config";

export const metadata = metadataBase({
  site: agroLibrarySiteConfig,
  title: "Agro Library",
  description: "Placeholder app shell for the new site after the migration constructor is proven."
});

export default function Page() {
  return (
    <main>
      <EditorialHero title="Agro Library" eyebrow="Placeholder app" subtitle="New site starts after the existing migrations prove the constructor." />
      <Footer legalHref="/en/legal" privacyHref="/en/privacy" />
    </main>
  );
}
