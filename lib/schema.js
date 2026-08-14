import { SITE_URL, STORES, SOCIAL_LINKS, COMPANY_LOGO, assetPath, brandLogoPath } from '@/lib/site';

const abs = (path) => `${SITE_URL}${path}`;

// sameAs is intentionally built from only the non-null entries in
// SOCIAL_LINKS. Facebook/Instagram are null until the site owner supplies
// real profile URLs (and ideally the Google Business Profile URL too) —
// do not fill these with placeholders.
const SAME_AS = Object.values(SOCIAL_LINKS).filter(Boolean);

export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'GT Building Solutions',
    url: SITE_URL,
    logo: abs(COMPANY_LOGO),
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
  };
}

const storeImage = {
  panchkula: 'client/gt-storefront-wide-1.jpg',
  chandigarh: 'client/gujarat-tiles-signboard.jpg',
};

export function storeNode(key) {
  const s = STORES[key];
  return {
    '@type': 'HardwareStore',
    '@id': `${SITE_URL}/locations/${key}/#store`,
    name: s.name,
    image: abs(assetPath(storeImage[key])),
    telephone: s.phone,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.street,
      addressLocality: s.city,
      addressRegion: s.region,
      postalCode: s.postalCode,
      addressCountry: 'IN',
    },
    url: `${SITE_URL}/locations/${key}`,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  };
}

export function serviceAreaNode(city, slug) {
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}/locations/${slug}/#service`,
    name: `GT Building Solutions — ${city} delivery & project supply`,
    areaServed: city,
    provider: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}/locations/${slug}`,
  };
}

export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function blogArchiveSchema({ name, path, posts }) {
  return {
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}${path}#collection`,
    name,
    url: `${SITE_URL}${path}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };
}

export function brandSchema(brand) {
  return {
    '@type': 'Brand',
    name: brand.name,
    description: brand.description,
    logo: abs(brandLogoPath(brand.logo)),
  };
}

export function faqPageSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
