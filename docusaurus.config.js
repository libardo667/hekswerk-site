import path from 'node:path';
import {themes as prismThemes} from 'prism-react-renderer';

const docsPath = path.resolve(
  process.cwd(),
  process.env.WORLDWEAVER_DOCS_DIR || '../worldweaver/docs',
);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hekswerk',
  tagline: 'Independent research and careful systems work',
  favicon: 'img/logo_aura.svg',
  url: 'https://www.hekswerk.com',
  baseUrl: '/',
  organizationName: 'libardo667',
  projectName: 'hekswerk-site',
  trailingSlash: false,
  staticDirectories: ['static', 'legacy-static'],
  onBrokenLinks: 'throw',
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
        docs: {
          path: docsPath,
          routeBasePath: 'worldweaver',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/libardo667/worldweaver/edit/main/docs/',
          showLastUpdateTime: true,
        },
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
    metadata: [
      {
        name: 'description',
        content:
          'Hekswerk is an independent research practice building WorldWeaver, open infrastructure for persistent AI residents and shared worlds.',
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
        {
          to: '/worldweaver/',
          label: 'WorldWeaver docs',
          position: 'left',
          activeBaseRegex: '/worldweaver/',
        },
        {to: '/research', label: 'Research', position: 'left'},
        {to: '/about', label: 'About', position: 'left'},
        {
          href: 'https://github.com/libardo667/worldweaver',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'WorldWeaver',
          items: [
            {label: 'Documentation', to: '/worldweaver/'},
            {
              label: 'Source code',
              href: 'https://github.com/libardo667/worldweaver',
            },
          ],
        },
        {
          title: 'Hekswerk',
          items: [
            {label: 'Research record', to: '/research'},
            {label: 'About', to: '/about'},
            {label: 'Contact', href: 'https://www.hekswerk.com/contact.html'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hekswerk. WorldWeaver source is AGPL-3.0-or-later.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
