import DateBar from "@/src/components/DateBar";
import MainNav from "@/src/components/MainNav";
import CategoryNav from "@/src/components/CategoryNav";
import OverlayArticleGrid from "@/src/components/OverlayArticleGrid";
import BigAddBanner from "@/src/components/BigAddBanner";
import MainGrid from "@/src/components/MainGrid";
import Footer from "@/src/components/Footer";

import overlayData from "@/public/data/blogPage/blog-overlayGrid.json";
import mainGridData from "@/public/data/blogPage/blog-mainGrid.json";

export const metadata = {
  title: "Blog | CitizenCorrespondent",
  description: "Explore our blog for curated articles, in-depth analysis, and featured stories across politics, business, technology, health, and more.",
  openGraph: {
    title: "Blog | CitizenCorrespondent",
    description: "Explore our blog for curated articles, in-depth analysis, and featured stories.",
    type: "website",
    url: "https://citizencorrespondent.com/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <DateBar />
      <MainNav currentPage="blog" />
      <CategoryNav />

      {/* Overlay Article Grid */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Blog</h1>
        <OverlayArticleGrid items={overlayData.overlayArticles} />
      </section>

      {/* Ad Banner */}
      <div className="w-full py-2">
        <BigAddBanner />
      </div>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <MainGrid
          items={mainGridData.mainGrid}
          heading="Latest Articles"
          initialRows={3}
        />
      </section>

      <Footer />
    </main>
  );
}

