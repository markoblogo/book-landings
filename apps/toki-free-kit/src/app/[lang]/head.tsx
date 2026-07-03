export default async function Head({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const safeLang = lang === 'tp' ? 'tp' : 'en';

  const alternates = [
    { hrefLang: 'en', href: 'https://toki-free.abvx.xyz/en' },
    { hrefLang: 'tok', href: 'https://toki-free.abvx.xyz/tp' },
    { hrefLang: 'tp', href: 'https://toki-free.abvx.xyz/tp' },
    { hrefLang: 'x-default', href: 'https://toki-free.abvx.xyz/en' },
  ];

  return (
    <>
      {alternates.map((a) => (
        <link key={a.hrefLang} rel="alternate" hrefLang={a.hrefLang} href={a.href} />
      ))}
      <meta httpEquiv="content-language" content={safeLang === 'tp' ? 'tok' : 'en'} />
    </>
  );
}
