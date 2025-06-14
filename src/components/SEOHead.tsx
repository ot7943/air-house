import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  robots?: string;
  siteName?: string;
  twitterCard?: string;
  googlebot?: string;
  canonical?: string;
  alternateLanguages?: { hreflang: string; href: string }[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
    video?: string;
    audio?: string;
    determiner?: string;
    locale?: string;
    localeAlternate?: string[];
    siteName?: string;
    type?: string;
    url?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    player?: string;
    playerWidth?: number;
    playerHeight?: number;
  };
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    expirationTime?: string;
    author?: string | string[];
    section?: string;
    tags?: string[];
  };
  product?: {
    name?: string;
    brand?: string;
    price?: number;
    priceCurrency?: string;
    availability?: string;
    condition?: string;
    category?: string;
    sku?: string;
    gtin?: string;
    mpn?: string;
    weight?: string;
    color?: string;
    material?: string;
    pattern?: string;
    size?: string;
    retailerItemId?: string;
  };
  business?: {
    name?: string;
    type?: string;
    telephone?: string[];
    email?: string;
    address?: {
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry?: string;
    };
    geo?: {
      latitude?: number;
      longitude?: number;
    };
    openingHours?: string[];
    priceRange?: string;
    rating?: {
      ratingValue?: number;
      reviewCount?: number;
      bestRating?: number;
      worstRating?: number;
    };
    sameAs?: string[];
    logo?: string;
    image?: string[];
    paymentAccepted?: string[];
    currenciesAccepted?: string;
    areaServed?: string | string[];
  };
  breadcrumbs?: Array<{
    name: string;
    item: string;
    position: number;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  customMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
    httpEquiv?: string;
  }>;
  customStructuredData?: object[];
  noIndex?: boolean;
  noFollow?: boolean;
  noArchive?: boolean;
  noSnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: string;
  maxVideoPreview?: number;
}

export function SEOHead({
  title = "Air House | اير هاوس - شركة وحلول التكييف المتكاملة في مصر",
  description = "Air House هي شركة رائدة في مجال حلول التكييف المتكاملة في مصر. نقدم أفضل أجهزة التكييف من كبرى العلامات التجارية مثل كاريير، ميديا، تورنيدو، شارب، فريش، وهايير.",
  keywords = "تكييف مصر, اير هاوس, شراء تكييف, تكييف شارب, تكييف كاريير, تكييف ميديا, تكييف فريش, تكييف هايير, تكييف تورنيدو",
  image = "https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/Air%20Logo.webp",
  url = "https://www.airhouse.shop/",
  type = "website",
  author = "Air House Egypt",
  robots,
  siteName = "Air House Egypt",
  twitterCard = "summary_large_image",
  googlebot,
  canonical,
  alternateLanguages,
  openGraph,
  twitter,
  article,
  product,
  business,
  breadcrumbs,
  faq,
  customMeta = [],
  customStructuredData = [],
  noIndex = false,
  noFollow = false,
  noArchive = false,
  noSnippet = false,
  maxSnippet,
  maxImagePreview = "large",
  maxVideoPreview
}: SEOHeadProps) {
  
  // Generate robots meta content
  const generateRobotsContent = () => {
    if (robots) return robots;
    
    const robotsArray = [];
    if (noIndex) robotsArray.push('noindex');
    else robotsArray.push('index');
    
    if (noFollow) robotsArray.push('nofollow');
    else robotsArray.push('follow');
    
    if (noArchive) robotsArray.push('noarchive');
    if (noSnippet) robotsArray.push('nosnippet');
    if (maxSnippet) robotsArray.push(`max-snippet:${maxSnippet}`);
    if (maxImagePreview) robotsArray.push(`max-image-preview:${maxImagePreview}`);
    if (maxVideoPreview) robotsArray.push(`max-video-preview:${maxVideoPreview}`);
    
    return robotsArray.join(', ');
  };

  // Generate googlebot meta content
  const generateGooglebotContent = () => {
    if (googlebot) return googlebot;
    return generateRobotsContent();
  };

  // Merge OpenGraph data
  const ogData = {
    title: openGraph?.title || title,
    description: openGraph?.description || description,
    image: openGraph?.image || image,
    url: openGraph?.url || url,
    type: openGraph?.type || type,
    siteName: openGraph?.siteName || siteName,
    locale: openGraph?.locale || 'ar_EG',
    ...openGraph
  };

  // Merge Twitter data
  const twitterData = {
    card: twitter?.card || twitterCard,
    title: twitter?.title || title,
    description: twitter?.description || description,
    image: twitter?.image || image,
    site: twitter?.site || '@AirHouseEgypt',
    creator: twitter?.creator || '@AirHouseEgypt',
    ...twitter
  };

  // Generate structured data
  const generateStructuredData = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@graph": []
    };

    // Website schema
    baseSchema["@graph"].push({
      "@type": "WebSite",
      "@id": `${url}#website`,
      "url": url,
      "name": siteName,
      "description": description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${url}search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "ar-EG"
    });

    // Organization/Business schema
    if (business || url === "https://www.airhouse.shop/") {
      const businessSchema = {
        "@type": business?.type || "LocalBusiness",
        "@id": `${url}#organization`,
        "name": business?.name || "Air House Egypt",
        "alternateName": "اير هاوس مصر",
        "description": business?.type || "شركة رائدة في مجال حلول التكييف المتكاملة في مصر",
        "url": url,
        "image": {
          "@type": "ImageObject",
          "url": business?.logo || image,
          "height": 500,
          "width": 500,
          "caption": "شعار شركة Air House لأنظمة التكييف"
        },
        "logo": {
          "@type": "ImageObject",
          "url": business?.logo || image,
          "height": 500,
          "width": 500
        },
        "inLanguage": "ar-EG"
      };

      // Add contact information
      if (business?.telephone || business?.email) {
        businessSchema["contactPoint"] = [];
        if (business?.telephone) {
          business.telephone.forEach((phone, index) => {
            businessSchema["contactPoint"].push({
              "@type": "ContactPoint",
              "telephone": phone,
              "contactType": index === 0 ? "customer service" : "technical support",
              "availableLanguage": ["Arabic", "English"]
            });
          });
        }
        if (business?.email) {
          businessSchema["email"] = business.email;
        }
      }

      // Add address
      if (business?.address) {
        businessSchema["address"] = {
          "@type": "PostalAddress",
          "streetAddress": business.address.streetAddress,
          "addressLocality": business.address.addressLocality,
          "addressRegion": business.address.addressRegion,
          "postalCode": business.address.postalCode,
          "addressCountry": business.address.addressCountry
        };
      }

      // Add geo coordinates
      if (business?.geo) {
        businessSchema["geo"] = {
          "@type": "GeoCoordinates",
          "latitude": business.geo.latitude,
          "longitude": business.geo.longitude
        };
      }

      // Add opening hours
      if (business?.openingHours) {
        businessSchema["openingHours"] = business.openingHours;
      }

      // Add rating
      if (business?.rating) {
        businessSchema["aggregateRating"] = {
          "@type": "AggregateRating",
          "ratingValue": business.rating.ratingValue?.toString(),
          "reviewCount": business.rating.reviewCount?.toString(),
          "bestRating": business.rating.bestRating?.toString() || "5",
          "worstRating": business.rating.worstRating?.toString() || "1"
        };
      }

      // Add other business properties
      if (business?.priceRange) businessSchema["priceRange"] = business.priceRange;
      if (business?.paymentAccepted) businessSchema["paymentAccepted"] = business.paymentAccepted;
      if (business?.currenciesAccepted) businessSchema["currenciesAccepted"] = business.currenciesAccepted;
      if (business?.areaServed) businessSchema["areaServed"] = business.areaServed;
      if (business?.sameAs) businessSchema["sameAs"] = business.sameAs;

      baseSchema["@graph"].push(businessSchema);
    }

    // Article schema
    if (article && type === "article") {
      const articleSchema = {
        "@type": "Article",
        "@id": `${url}#article`,
        "headline": title,
        "description": description,
        "image": {
          "@type": "ImageObject",
          "url": image,
          "height": 630,
          "width": 1200
        },
        "author": {
          "@type": Array.isArray(article.author) ? "Person" : "Person",
          "name": Array.isArray(article.author) ? article.author[0] : (article.author || author)
        },
        "publisher": {
          "@type": "Organization",
          "@id": `${url}#organization`
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        },
        "inLanguage": "ar-EG"
      };

      if (article.publishedTime) articleSchema["datePublished"] = article.publishedTime;
      if (article.modifiedTime) articleSchema["dateModified"] = article.modifiedTime;
      if (article.expirationTime) articleSchema["expires"] = article.expirationTime;
      if (article.section) articleSchema["articleSection"] = article.section;
      if (article.tags) articleSchema["keywords"] = article.tags.join(", ");

      baseSchema["@graph"].push(articleSchema);
    }

    // Product schema
    if (product && type === "product") {
      const productSchema = {
        "@type": "Product",
        "@id": `${url}#product`,
        "name": product.name || title,
        "description": description,
        "image": {
          "@type": "ImageObject",
          "url": image,
          "height": 630,
          "width": 1200
        },
        "brand": {
          "@type": "Brand",
          "name": product.brand || "Air House"
        },
        "category": product.category || "Air Conditioners",
        "offers": {
          "@type": "Offer",
          "price": product.price?.toString(),
          "priceCurrency": product.priceCurrency || "EGP",
          "availability": product.availability || "https://schema.org/InStock",
          "itemCondition": product.condition || "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "@id": `${url}#organization`
          }
        },
        "manufacturer": {
          "@type": "Organization",
          "name": product.brand || "Air House"
        }
      };

      // Add optional product properties
      if (product.sku) productSchema["sku"] = product.sku;
      if (product.gtin) productSchema["gtin"] = product.gtin;
      if (product.mpn) productSchema["mpn"] = product.mpn;
      if (product.weight) productSchema["weight"] = product.weight;
      if (product.color) productSchema["color"] = product.color;
      if (product.material) productSchema["material"] = product.material;
      if (product.size) productSchema["size"] = product.size;

      baseSchema["@graph"].push(productSchema);
    }

    // Breadcrumbs schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      baseSchema["@graph"].push({
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map(crumb => ({
          "@type": "ListItem",
          "position": crumb.position,
          "name": crumb.name,
          "item": crumb.item
        }))
      });
    }

    // FAQ schema
    if (faq && faq.length > 0) {
      baseSchema["@graph"].push({
        "@type": "FAQPage",
        "mainEntity": faq.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      });
    }

    // WebPage schema
    baseSchema["@graph"].push({
      "@type": "WebPage",
      "@id": url,
      "url": url,
      "name": title,
      "description": description,
      "isPartOf": {
        "@id": `${url}#website`
      },
      "about": {
        "@id": `${url}#organization`
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": image
      },
      "datePublished": article?.publishedTime || new Date().toISOString(),
      "dateModified": article?.modifiedTime || new Date().toISOString(),
      "inLanguage": "ar-EG"
    });

    // Add custom structured data
    if (customStructuredData.length > 0) {
      baseSchema["@graph"].push(...customStructuredData);
    }

    return JSON.stringify(baseSchema, null, 2);
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={generateRobotsContent()} />
      <meta name="googlebot" content={generateGooglebotContent()} />
      
      {/* Prerender.io meta tags */}
      <meta name="prerender-status-code" content="200" />
      <meta name="prerender-spa-wait" content="2000" />
      <meta name="prerender-token" content="H7dpHY5qz6mCeEVaRaoY" />
      <meta httpEquiv="X-Prerender-Token" content="H7dpHY5qz6mCeEVaRaoY" />
      
      {/* Language and Character Set */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* HTTP Equiv Meta Tags */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Security Headers */}
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogData.title} />
      <meta property="og:description" content={ogData.description} />
      <meta property="og:image" content={ogData.image} />
      <meta property="og:url" content={ogData.url} />
      <meta property="og:type" content={ogData.type} />
      <meta property="og:site_name" content={ogData.siteName} />
      <meta property="og:locale" content={ogData.locale} />
      {ogData.imageAlt && <meta property="og:image:alt" content={ogData.imageAlt} />}
      {ogData.imageWidth && <meta property="og:image:width" content={ogData.imageWidth.toString()} />}
      {ogData.imageHeight && <meta property="og:image:height" content={ogData.imageHeight.toString()} />}
      {ogData.video && <meta property="og:video" content={ogData.video} />}
      {ogData.audio && <meta property="og:audio" content={ogData.audio} />}
      {ogData.determiner && <meta property="og:determiner" content={ogData.determiner} />}
      {ogData.localeAlternate?.map((locale, index) => (
        <meta key={index} property="og:locale:alternate" content={locale} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterData.card} />
      <meta name="twitter:title" content={twitterData.title} />
      <meta name="twitter:description" content={twitterData.description} />
      <meta name="twitter:image" content={twitterData.image} />
      <meta name="twitter:site" content={twitterData.site} />
      <meta name="twitter:creator" content={twitterData.creator} />
      {twitterData.imageAlt && <meta name="twitter:image:alt" content={twitterData.imageAlt} />}
      {twitterData.player && <meta name="twitter:player" content={twitterData.player} />}
      {twitterData.playerWidth && <meta name="twitter:player:width" content={twitterData.playerWidth.toString()} />}
      {twitterData.playerHeight && <meta name="twitter:player:height" content={twitterData.playerHeight.toString()} />}
      
      {/* Article specific meta tags */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.expirationTime && <meta property="article:expiration_time" content={article.expirationTime} />}
          {article.author && (
            Array.isArray(article.author) 
              ? article.author.map((auth, index) => (
                  <meta key={index} property="article:author" content={auth} />
                ))
              : <meta property="article:author" content={article.author} />
          )}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Product specific meta tags */}
      {product && (
        <>
          {product.brand && <meta property="product:brand" content={product.brand} />}
          {product.availability && <meta property="product:availability" content={product.availability} />}
          {product.condition && <meta property="product:condition" content={product.condition} />}
          {product.price && <meta property="product:price:amount" content={product.price.toString()} />}
          {product.priceCurrency && <meta property="product:price:currency" content={product.priceCurrency} />}
          {product.retailerItemId && <meta property="product:retailer_item_id" content={product.retailerItemId} />}
        </>
      )}
      
      {/* Custom Meta Tags */}
      {customMeta.map((meta, index) => {
        if (meta.httpEquiv) {
          return <meta key={index} httpEquiv={meta.httpEquiv} content={meta.content} />;
        } else if (meta.property) {
          return <meta key={index} property={meta.property} content={meta.content} />;
        } else if (meta.name) {
          return <meta key={index} name={meta.name} content={meta.content} />;
        }
        return null;
      })}
      
      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href={image} />
      <link rel="icon" type="image/png" sizes="16x16" href={image} />
      <link rel="apple-touch-icon" sizes="180x180" href={image} />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || url} />
      
      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="ar" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      {alternateLanguages?.map((lang, index) => (
        <link key={index} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//xohlkwkewrgnhcxjlsbl.supabase.co" />
      
      {/* Preconnect for Critical Resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#0284c7" />
      <meta name="msapplication-TileColor" content="#0284c7" />
      
      {/* Mobile App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Air House" />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="EG-GZ" />
      <meta name="geo.placename" content="Giza, Egypt" />
      <meta name="geo.position" content="30.01012715559585;31.1799511878156" />
      <meta name="ICBM" content="30.01012715559585, 31.1799511878156" />
      
      {/* Business Meta Tags */}
      <meta name="business:contact_data:street_address" content="25 شارع العشرين بجوار شركة الاتصالات فيصل" />
      <meta name="business:contact_data:locality" content="الجيزة" />
      <meta name="business:contact_data:region" content="الجيزة" />
      <meta name="business:contact_data:postal_code" content="21634" />
      <meta name="business:contact_data:country_name" content="Egypt" />
      <meta name="business:contact_data:phone_number" content="+201027755778" />
      <meta name="business:contact_data:email" content="airhouse@gmail.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {generateStructuredData()}
      </script>
    </Helmet>
  );
}