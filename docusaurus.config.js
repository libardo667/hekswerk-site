import {themes as prismThemes} from 'prism-react-renderer';

const siteUrl = 'https://www.hekswerk.com';
const practiceDescription =
  "Hekswerk is Levi Banks's one-person systems practice for contract operations automation, independent engineering, and open research.";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hekswerk',
  tagline: 'Contract operations automation, independent engineering, and open research',
  favicon: 'img/logo_aura.svg',
  url: siteUrl,
  baseUrl: '/',
  organizationName: 'libardo667',
  projectName: 'hekswerk-site',
  trailingSlash: false,
  staticDirectories: ['static'],
  onBrokenLinks: 'throw',
  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'Hekswerk',
            url: siteUrl,
            description: practiceDescription,
            logo: `${siteUrl}/img/logo_aura.svg`,
            founder: {
              '@id': `${siteUrl}/about#levi-banks`,
            },
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: 'Hekswerk',
            description: practiceDescription,
            inLanguage: 'en-US',
            publisher: {
              '@id': `${siteUrl}/#organization`,
            },
          },
        ],
      }),
    },
  ],
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  future: {
    v4: true,
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/hekswerk-social-card.png',
    metadata: [
      {
        name: 'description',
        content: practiceDescription,
      },
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Hekswerk',
      logo: {
        alt: 'Hekswerk aura mark',
        src: 'img/logo_aura.svg',
      },
      items: [
        {to: '/work', label: 'Contract Work', position: 'left'},
        {to: '/work/selected-work', label: 'Selected Work', position: 'left'},
        {to: '/research', label: 'Engineering & Research', position: 'left'},
        {to: '/about', label: 'About', position: 'left'},
        {
          to: '/contact',
          label: 'Start a conversation',
          position: 'right',
          className: 'navbar__cta',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contract work',
          items: [
            {label: 'Operations Automation Sprint', to: '/work'},
            {label: 'Start a conversation', to: '/contact'},
            {label: 'Selected work', to: '/work/selected-work'},
            {label: 'About', to: '/about'},
            {label: 'Privacy', to: '/privacy'},
          ],
        },
        {
          title: 'Engineering and research',
          items: [
            {label: 'Overview', to: '/research'},
            {label: 'GitHub profile', href: 'https://github.com/libardo667'},
            {label: 'EvoGen source', href: 'https://github.com/libardo667/evogen'},
            {label: 'Kenshi Agent Environment source', href: 'https://github.com/libardo667/kenshi-agent-env'},
            {label: 'WorldWeaver source', href: 'https://github.com/libardo667/worldweaver'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hekswerk.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
