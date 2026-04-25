import { MetadataRoute } from 'next';

async function getNewsItems() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.map((item: any) => ({
            id: item._id,
            slug: item.slug
        }));
    } catch (error) {
        console.error("Error fetching news for sitemap:", error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://osunstatefa.org.ng';
  
  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/affiliations/competition',
    '/affiliations/registered-club',
    '/affiliations/licensed-coach',
    '/affiliations/licensed-referee',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic blog routes
  const newsItems = await getNewsItems();
  const blogRoutes = newsItems.map((item: { id: string, slug?: string }) => ({
    url: `${baseUrl}/blog/${item.slug || item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}
