import { Metadata, ResolvingMetadata } from "next";
import SingleNewsContent from "./SingleNewsContent";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getNewsItem(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, {
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
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const news = await getNewsItem(id);

  if (!news) {
    return {
      title: "News Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: news.title,
    description: news.excerpt || news.content?.substring(0, 160),
    openGraph: {
      title: news.title,
      description: news.excerpt || news.content?.substring(0, 160),
      url: `https://osunstatefa.org.ng/blog/${id}`,
      type: "article",
      publishedTime: news.publishedAt,
      authors: [news.author || "Osun State FA"],
      images: news.imageUrl ? [news.imageUrl, ...previousImages] : previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.excerpt || news.content?.substring(0, 160),
      images: news.imageUrl ? [news.imageUrl] : [],
    },
  };
}

export default async function SingleNewsPage({ params }: Props) {
    const { id } = await params;
    const news = await getNewsItem(id);

    const jsonLd = news ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": news.title,
        "image": news.imageUrl ? [news.imageUrl] : [],
        "datePublished": news.publishedAt,
        "author": [{
            "@type": "Person",
            "name": news.author || "Osun State FA",
            "url": "https://osunstatefa.org.ng"
        }]
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
