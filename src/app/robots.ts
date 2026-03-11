import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/portal/', '/login'],
    },
    sitemap: 'https://osunstatefa.org.ng/sitemap.xml',
  };
}
