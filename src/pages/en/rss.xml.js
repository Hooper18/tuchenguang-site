import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { en } from '../../i18n/en';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const enPosts = posts.filter((p) => p.id.endsWith('/en'));
  return rss({
    title: en.blog.rssTitle,
    description: en.blog.rssDesc,
    site: context.site,
    items: enPosts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => {
        const slug = post.id.split('/')[0];
        return {
          title: post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description,
          link: `/en/blog/${slug}/`,
        };
      }),
  });
}
