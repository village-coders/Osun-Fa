import { Metadata, ResolvingMetadata } from "next";
import SingleNewsContent from "@/app/(main)/blog/[slug]/SingleNewsContent";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getNewsItem(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${slug}`, {
            next: { revalidate: 3600 } // Revalidate every hour
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching news for metadata:", error);
        return null;
    }
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await props.params;
  const news = await getNewsItem(slug);

  if (!news) {
    return {
      title: "News Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://osunstatefa.org.ng";
  const title = news.title;
  const description = news.excerpt || news.content?.substring(0, 160) + "...";
  
  // Ensure image URL is absolute
  let imageUrl = news.imageUrl;
  if (imageUrl && !imageUrl.startsWith('http')) {
    imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  }

  const previousImages = (await parent).openGraph?.images || [];
  const images = imageUrl 
    ? [{ url: imageUrl, width: 1200, height: 630, alt: title }]
    : previousImages;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/blog/${news.slug || slug}`,
      siteName: "Osun State Football Association",
      locale: "en_NG",
      type: "article",
      publishedTime: news.publishedAt,
      authors: [news.author || "Osun State FA"],
      images: images,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: imageUrl ? [imageUrl] : (previousImages.length > 0 ? [(previousImages[0] as any).url] : []),
    },
    alternates: {
      canonical: `${baseUrl}/blog/${news.slug || slug}`,
    }
  };
}

export default async function SingleNewsPage(props: Props) {
    const { slug } = await props.params;
    const news = await getNewsItem(slug);

    const jsonLd = news ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": news.title,
        "description": news.excerpt || news.content?.substring(0, 160),
        "image": news.imageUrl ? [news.imageUrl] : [`${process.env.NEXT_PUBLIC_SITE_URL || "https://osunstatefa.org.ng"}/osun-fa-logo.png`],
        "datePublished": news.publishedAt,
        "dateModified": news.updatedAt || news.publishedAt,
        "author": [{
            "@type": "Organization",
            "name": news.author || "Osun State FA",
            "url": process.env.NEXT_PUBLIC_SITE_URL || "https://osunstatefa.org.ng"
        }],
        "publisher": {
            "@type": "Organization",
            "name": "Osun State Football Association",
            "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://osunstatefa.org.ng"}/osun-fa-logo.png`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://osunstatefa.org.ng"}/blog/${news.slug || slug}`
        }
    } : null;

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <SingleNewsContent initialData={news} />
        </>
    );
}
