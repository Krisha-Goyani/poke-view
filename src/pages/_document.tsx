import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import siteConfig from '../config/site';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content={siteConfig.description} />
          <meta name="keywords" content="Pokemon, Gallery, Pokedex, Pokemon Images, Pokemon Stats" />
          <meta name="author" content="Your Name or Company" />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="English" />
          <link rel="canonical" href={siteConfig.url} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={siteConfig.url} />
          <meta property="og:site_name" content={siteConfig.title} />
          <meta property="og:title" content={siteConfig.title} />
          <meta property="og:description" content={siteConfig.description} />
          <meta property="og:image" content={siteConfig.ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Pokemon Gallery Image" />
          <meta property="og:locale" content="en_US" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={siteConfig.url} />
          <meta property="twitter:title" content={siteConfig.title} />
          <meta property="twitter:description" content={siteConfig.description} />
          <meta property="twitter:image" content={siteConfig.ogImage} />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
