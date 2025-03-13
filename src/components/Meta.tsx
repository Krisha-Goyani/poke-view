import Head from 'next/head';
import siteConfig from '../config/site';

const Meta = () => {
  return (
    <Head>
      <title>{siteConfig.title}</title>
      <meta name="description" content={siteConfig.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteConfig.url} />
      <meta property="og:title" content={siteConfig.title} />
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:image" content={siteConfig.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Pokemon Gallery Image" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteConfig.url} />
      <meta property="twitter:title" content={siteConfig.title} />
      <meta property="twitter:description" content={siteConfig.description} />
      <meta property="twitter:image" content={siteConfig.ogImage} />
    </Head>
  );
};

export default Meta; 