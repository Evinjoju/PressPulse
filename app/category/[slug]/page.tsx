import DateBar from "@/src/components/DateBar";
import MainNav from "@/src/components/MainNav";
import CategoryNav from "@/src/components/CategoryNav";
import CategoryIntro from "@/src/components/CategoryIntro";
import FeatureCategoryPart from "@/src/components/FeatureCategoryPart";
import { FeaturedArticleCardProps } from "@/src/components/FeaturedArticleCard";
import { ArticleCardSmallProps } from "@/src/components/ArticleCardSmall";
import { AdBannerProps } from "@/src/components/AdBanner";
import MainGrid, { MainGridItem } from "@/src/components/MainGrid";
import Footer from "@/src/components/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Map slug to category name
const slugToCategory: Record<string, string> = {
  world: "World",
  business: "Business",
  finance: "Finance",
  politics: "Politics",
  opinion: "Opinion",
  education: "Education",
  "global-affairs": "Global Affairs",
  featured: "Featured",
  "renewable-energy": "Renewable Energy",
  "climate-change": "Climate Change",
  hot: "Hot",
  research: "Research",
  health: "Health",
};

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  world: "Stay informed with the latest global news, international affairs, and world events. Our comprehensive coverage brings you breaking news, in-depth analysis, and expert perspectives on issues that shape our world.",
  business: "Get the latest business news, market updates, and industry insights. From startups to Fortune 500 companies, we cover the stories that matter to entrepreneurs, investors, and business leaders.",
  finance: "Stay ahead with financial news, market trends, and investment insights. Our coverage includes stock markets, cryptocurrencies, personal finance, and economic analysis to help you make informed decisions.",
  politics: "Comprehensive political coverage including elections, policy changes, and government affairs. Get unbiased reporting and analysis on local, national, and international politics.",
  opinion: "Our seasoned columnists and guest writers offer insightful perspectives, thought-provoking opinions, and in-depth analysis on the most pressing issues of the day. From politics and policy to culture and society, our editorials aim to spark meaningful conversations and provide a platform for diverse voices and viewpoints.",
  education: "Explore the latest developments in education, from K-12 to higher education. Coverage includes policy changes, innovative teaching methods, student achievements, and the future of learning.",
  "global-affairs": "In-depth coverage of international relations, diplomacy, and global events. Stay informed about how nations interact, cooperate, and address shared challenges on the world stage.",
  featured: "Discover our handpicked selection of top stories, exclusive interviews, and must-read articles. Our featured content represents the best of our journalism and the most important stories of the moment.",
  "renewable-energy": "Stay updated on the latest developments in renewable energy, sustainable technology, and green initiatives. Coverage includes solar, wind, hydroelectric, and other clean energy solutions shaping our future.",
  "climate-change": "Comprehensive coverage of climate science, environmental policy, and sustainability efforts. Stay informed about the latest research, climate action, and solutions to address global warming.",
  hot: "Breaking news and trending stories that everyone's talking about. Get the latest updates on viral topics, social media trends, and stories capturing global attention.",
  research: "Explore groundbreaking research, scientific discoveries, and academic studies across all fields. From medicine to technology, stay informed about the latest findings that shape our understanding of the world.",
  health: "Your source for health news, medical breakthroughs, wellness tips, and healthcare policy. Stay informed about public health, medical research, and tips for living a healthy lifestyle.",
};

// All available categories for related topics
const allCategories = [
  "Business",
  "Finance",
  "Politics",
  "World",
  "Health",
  "Education",
  "Research",
  "Opinion",
  "Global Affairs",
  "Featured",
  "Hot",
  "Renewable Energy",
  "Climate Change",
];

// Function to get related topics, excluding the current category
const getRelatedTopics = (currentCategory: string) => {
  const filteredCategories = allCategories.filter(
    (cat) => cat.toLowerCase().replace(/\s+/g, "-") !== currentCategory.toLowerCase().replace(/\s+/g, "-")
  );
  // Shuffle and take the first 6
  return filteredCategories.sort(() => 0.5 - Math.random()).slice(0, 6);
};

// Generate static params for all categories
export function generateStaticParams() {
  return Object.keys(slugToCategory).map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slugToCategory[slug] || slug;
  const description = categoryDescriptions[slug] || categoryDescriptions.opinion;

  if (!slugToCategory[slug]) {
    return {
      title: "Category Not Found | CitizenCorrespondent",
      robots: { index: false, follow: false },
    };
  }

  const url = `https://www.citizencorrespondent.com/category/${slug}`;

  return {
    metadataBase: new URL("https://www.citizencorrespondent.com"),
    title: `${categoryName} News | CitizenCorrespondent`,
    description: description,
    keywords: [
      `${categoryName.toLowerCase()} news`,
      `${categoryName.toLowerCase()} 2025`,
      "latest news",
      "breaking news",
      "citizen correspondent",
      `${categoryName.toLowerCase()} articles`,
      `${categoryName.toLowerCase()} updates`,
    ].join(", "),
    alternates: { canonical: url },
    openGraph: {
      title: `${categoryName} News – Latest Stories 2025 | CitizenCorrespondent`,
      description: description,
      url,
      siteName: "CitizenCorrespondent",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${categoryName} News – CitizenCorrespondent`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} News 2025 | CitizenCorrespondent`,
      description: description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = slugToCategory[slug] || slug;
  const categoryDescription = categoryDescriptions[slug] || categoryDescriptions.opinion;
  const relatedTopics = getRelatedTopics(slug);

  if (!slugToCategory[slug]) {
    notFound();
  }

  // Dynamic imports for category data
  let featureData: any;
  let mainGridData: any;

  try {
    const folderName = `${slug}Page`;
    [featureData, mainGridData] = await Promise.all([
      import(`@/public/data/${folderName}/${slug}-featureCategoryPart.json`).then((m) => m.default),
      import(`@/public/data/${folderName}/${slug}-mainGrid.json`).then((m) => m.default),
    ]);
  } catch (error) {
    notFound();
  }

  const featuredArticle = featureData.featuredArticle as FeaturedArticleCardProps;
  const rightArticles = featureData.rightArticles as ArticleCardSmallProps[];
  const adBanner = featureData.adBanner as AdBannerProps;
  const mainGridItems = mainGridData.mainGrid as MainGridItem[];

  return (
    <>
      {/* CollectionPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${categoryName} – CitizenCorrespondent`,
            description: categoryDescription,
            url: `https://www.citizencorrespondent.com/category/${slug}`,
            publisher: {
              "@type": "Organization",
              name: "CitizenCorrespondent",
              logo: {
                "@type": "ImageObject",
                url: "https://www.citizencorrespondent.com/logo.png",
              },
            },
          }),
        }}
      />

      <div className="bg-white min-h-screen">
        <div className="hidden">{categoryName} News – Latest Stories 2025</div>
        <DateBar />
        <MainNav currentPage={`category/${slug}`} />
        <CategoryNav />

        <CategoryIntro
          categoryName={categoryName}
          description={categoryDescription}
          relatedTopics={relatedTopics}
        />

        <FeatureCategoryPart
          featuredArticle={featuredArticle}
          rightArticles={rightArticles}
          adBanner={adBanner}
          heading={`${categoryName} News`}
        />

        <div className="max-w-7xl mx-auto px-6 pb-12 border-t border-gray-400">
          <MainGrid items={mainGridItems} heading={categoryName} />
        </div>

        <Footer />
      </div>
    </>
  );
}
