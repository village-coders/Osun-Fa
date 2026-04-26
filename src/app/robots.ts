import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/portal/', '/login'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://osunstatefa.org.ng'}/sitemap.xml`,
  };
}
