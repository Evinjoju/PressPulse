import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.citizencorrespondent.com';
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Category pages
  const categories = [
    'world',
    'business',
    'finance',
    'politics',
    'opinion',
    'education',
    'global-affairs',
    'featured',
    'renewable-energy',
    'climate-change',
    'hot',
    'research',
    'health',
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Article pages - dynamically load all articles
  let articlePages: MetadataRoute.Sitemap = [];
  
  try {
    const fs = require('fs');
    const path = require('path');
    const articleDir = path.join(process.cwd(), 'public/data/articleDetail');

    if (fs.existsSync(articleDir)) {
      const articleFiles = fs
        .readdirSync(articleDir)
        .filter((f: string) => 
          f.endsWith('.json') && 
          f !== 'article-example.json' && 
          f !== 'article-sidebar.json'
        );

      articlePages = articleFiles.map((file: string) => {
        const slug = file.replace('.json', '');
        try {
          const articleData = require(`@/public/data/articleDetail/${slug}.json`);
          return {
            url: `${baseUrl}/article/${slug}`,
            lastModified: articleData.lastUpdated || currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          };
        } catch {
          return {
            url: `${baseUrl}/article/${slug}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          };
        }
      });
    }
  } catch (error) {
    console.error('Error generating article sitemap:', error);
  }

  return [...staticPages, ...categoryPages, ...articlePages];
}

