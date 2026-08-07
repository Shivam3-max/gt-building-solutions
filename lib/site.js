export const SITE_URL = 'https://gtbuildingsolutions.in';
export const COMPANY_LOGO = '/Public/Logo.png';
export const WHATSAPP_NUMBER = '919814033573';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const STORES = {
  panchkula: {
    name: 'Garg Trading Company',
    tag: 'Garg Trading Company',
    street: 'Plot No. 1, Industrial Area Phase 1',
    city: 'Panchkula',
    region: 'Haryana',
    postalCode: '134109',
    fullAddress: 'Plot No. 1, Industrial Area Phase 1, Panchkula, Haryana 134109',
    phone: '+91 98140 33573',
    phoneHref: 'tel:+919814033573',
  },
  chandigarh: {
    name: 'Gujarat Tiles & Sanitary Depot',
    tag: 'Gujarat Tiles & Sanitary Depot',
    street: 'SCO 22-23, Phase 2, Industrial Area',
    city: 'Chandigarh',
    region: 'Chandigarh',
    postalCode: '160002',
    fullAddress: 'SCO 22-23, Phase 2, Industrial Area, Chandigarh',
    phone: '+91 92168 66671',
    phoneHref: 'tel:+919216866671',
  },
};

export const SOCIAL_LINKS = {
  facebook: null,
  instagram: null,
  whatsapp: WHATSAPP_LINK,
};

export const assetPath = (file) => encodeURI(`/Public/${file}`);
export const brandLogoPath = (file) => encodeURI(`/Public/brand logo/${file}`);

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Brands', href: '/brands' },
  { label: 'Locations', href: '/locations' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Calculators', href: '/calculators' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
