import type { ReactNode } from 'react';
import { books } from '@/data/books';
import { articleDocuments } from '@/data/seo-article-content';
import { ukrainianModernismSiteConfig } from '@/site.config';

type ArticleDocument = { title: string; content: string; sourceFile: string };

export function getSeoArticle(id: string, lang: 'fr' | 'uk') {
  return articleDocuments[id as keyof typeof articleDocuments]?.[lang] as ArticleDocument | undefined;
}

export function getArticleRouteParams() {
  return books.filter((book) => book.id in articleDocuments).map((book) => ({ id: book.id }));
}

function inlineMarkdown(value: string): ReactNode[] {
  return value.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={link[2]}>{link[1]}</a>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export function renderArticleMarkdown(content: string): ReactNode[] {
  const blocks = content.trim().split(/\n\s*\n/);
  const editorialNotesIndex = blocks.findIndex((block) =>
    /^(?:Pour (?:le SEO de la page|la page française)|Pour la page française|Для української (?:сторінки|версії сторінки)|Meta description\s*:|Et comme meta description\b)/iu.test(block.trim())
  );
  if (editorialNotesIndex >= 0) {
    const previousBlock = blocks[editorialNotesIndex - 1]?.trim() ?? '';
    const isBookMetadataFooter = /^\*\*[^*]+\*\*/u.test(previousBlock)
      && /(?:Série|Collection|Серія)\s+\*?Modernisme ukrainien\*?/iu.test(previousBlock);
    blocks.splice(isBookMetadataFooter ? editorialNotesIndex - 1 : editorialNotesIndex);
  }
  const firstHeading = blocks.findIndex((block) => /^#\s/.test(block.trim()));
  if (firstHeading >= 0) blocks.splice(firstHeading, 1);

  return blocks.flatMap((block, index) => {
    const text = block.trim();
    if (!text) return [];
    if (text === '---') return [<hr key={index} />];
    const heading = text.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      const content = heading[2].replace(/\*\*/g, '').replace(/\*/g, '');
      const level = Math.min(4, heading[1].length);
      const id = `section-${index}`;
      if (level === 2) return [<h2 key={index} id={id}>{inlineMarkdown(heading[2])}</h2>];
      if (level === 3) return [<h3 key={index} id={id}>{inlineMarkdown(heading[2])}</h3>];
      return [<h4 key={index} id={id}>{inlineMarkdown(content)}</h4>];
    }
    const listItems = text.split('\n').filter((line) => /^\s*[-*]\s+/.test(line));
    if (listItems.length === text.split('\n').length) {
      return [<ul key={index}>{listItems.map((line, itemIndex) => <li key={itemIndex}>{inlineMarkdown(line.replace(/^\s*[-*]\s+/, ''))}</li>)}</ul>];
    }
    return [<p key={index}>{inlineMarkdown(text.replace(/\n/g, ' '))}</p>];
  });
}

export function articleUrl(id: string, lang: 'fr' | 'uk') {
  return `${ukrainianModernismSiteConfig.baseUrl}/${lang}/article/${id}`;
}

export function articleDescription(article: ArticleDocument) {
  const firstParagraph = article.content.split(/\n\s*\n/).map((line) => line.trim()).find((line) => line && !line.startsWith('#')) ?? article.title;
  return firstParagraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*{1,2}/g, '')
    .slice(0, 160);
}
