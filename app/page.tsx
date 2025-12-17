// app/page.tsx
import DateBar from "@/src/components/DateBar";
import MainNav from "@/src/components/MainNav";
import CategoryNav from "@/src/components/CategoryNav";
import FeatureHomePart, {
  HeroArticle,
} from "@/src/components/FeatureHomePart";
import { SidebarItem } from "@/src/components/Sidebar";
import { HorizontalSidebarItem } from "@/src/components/HorizontalSidebar";
import MainGrid, { MainGridItem } from "@/src/components/MainGrid";
import homeData from "@/public/data/homePage/home-featureHomepart.json";
import mainGridData from "@/public/data/homePage/home-mainGrid.json";
import mainGridTechnologyData from "@/public/data/homePage/home-mainGrid-technology.json";
import mainGridEnvironmentData from "@/public/data/homePage/home-mainGrid-environment.json";
import mainGridMoreNewsData from "@/public/data/homePage/home-mainGrid-moreNews.json";
import OverlayArticleGrid, { OverlayArticleGridItem } from "@/src/components/OverlayArticleGrid";
import overlayGridPoliticsData from "@/public/data/homePage/home-overlayGrid-politics.json";
import FeatureCategoryPart from "@/src/components/FeatureCategoryPart";
import { FeaturedArticleCardProps } from "@/src/components/FeaturedArticleCard";
import { ArticleCardSmallProps } from "@/src/components/ArticleCardSmall";
import { AdBannerProps } from "@/src/components/AdBanner";
import featureCategoryData from "@/public/data/homePage/home-featureCategoryPart.json";
import BigAddBanner from "@/src/components/BigAddBanner";
import HorizontalArticleCard, { HorizontalArticleCardProps } from "@/src/components/HorizontalArticleCard";
import horizontalArticleData from "@/public/data/homePage/home-horizontalArticle.json";
import Footer from "@/src/components/Footer";

export default function HomePage() {
  const heroArticle = homeData.hero as HeroArticle;
  const sidebarItems = homeData.sidebar as SidebarItem[];
  const horizontalItems = homeData.horizontal as HorizontalSidebarItem[];
  const mainGridItems = mainGridData.mainGrid as MainGridItem[];
  const mainGridTechnologyItems = mainGridTechnologyData.mainGrid as MainGridItem[];
  const mainGridEnvironmentItems = mainGridEnvironmentData.mainGrid as MainGridItem[];
  const mainGridMoreNewsItems = mainGridMoreNewsData.mainGrid as MainGridItem[];
  const overlayGridPoliticsItems = overlayGridPoliticsData.overlayGrid as OverlayArticleGridItem[];
  const featuredArticle = featureCategoryData.featuredArticle as FeaturedArticleCardProps;
  const rightArticles = featureCategoryData.rightArticles as ArticleCardSmallProps[];
  const adBanner = featureCategoryData.adBanner as AdBannerProps;
  const horizontalArticle = horizontalArticleData.article as HorizontalArticleCardProps;

  return (
    <div className="bg-white min-h-screen">
      <DateBar />
      <MainNav currentPage="home" />
      <CategoryNav />

      <FeatureHomePart
        hero={heroArticle}
        sidebarItems={sidebarItems}
        horizontalItems={horizontalItems}
      />

      <div className="max-w-7xl mx-auto px-6 pb-12 border-t border-gray-200">
        <MainGrid items={mainGridItems} heading="World" />
      </div>

      <div className="w-full py-2">
        <BigAddBanner />
      </div>

      <FeatureCategoryPart
        featuredArticle={featuredArticle}
        rightArticles={rightArticles}
        adBanner={adBanner}
        heading="Business News"
      />

      <div className="max-w-7xl mx-auto px-6 py-2">
        <HorizontalArticleCard
          slug={horizontalArticle.slug}
          category={horizontalArticle.category}
          title={horizontalArticle.title}
          excerpt={horizontalArticle.excerpt}
          date={horizontalArticle.date}
          image={horizontalArticle.image}
          bookmarked={horizontalArticle.bookmarked}
          heading="Technology"
        />
      </div>

      <div className="max-w-7xl mx-auto pt-4 px-6 pb-12">
        <MainGrid items={mainGridTechnologyItems}/>
      </div>

      <div className="w-full py-2">
        <BigAddBanner />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <MainGrid items={mainGridEnvironmentItems} heading="Environment" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12 border-t border-gray-200">
        <OverlayArticleGrid items={overlayGridPoliticsItems} heading="Politics" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12 border-t border-gray-200">
        <MainGrid items={mainGridMoreNewsItems} heading="More News" initialRows={2} />
      </div>

      <Footer />
    
    </div>
  );
}
