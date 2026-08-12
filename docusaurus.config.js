import path from 'node:path';
import {themes as prismThemes} from 'prism-react-renderer';

const docsPath = path.resolve(
  process.cwd(),
  process.env.WORLDWEAVER_DOCS_DIR || '../worldweaver/docs',
);
const worldweaverCommit = String(process.env.WORLDWEAVER_COMMIT || '').trim();
const worldweaverVersion = worldweaverCommit ? worldweaverCommit.slice(0, 7) : 'local checkout';
const worldweaverVersionUrl = worldweaverCommit
  ? `https://github.com/libardo667/worldweaver/tree/${worldweaverCommit}/docs`
  : 'https://github.com/libardo667/worldweaver/tree/main/docs';

function worldweaverEditUrl({docPath}) {
  const normalized = String(docPath).replaceAll('\\', '/');
  const docsMarker = '/docs/';
  const markerIndex = normalized.lastIndexOf(docsMarker);
  const relativePath = markerIndex >= 0
    ? normalized.slice(markerIndex + docsMarker.length)
    : normalized.replace(/^(\.\.\/)+/, '');
  return `https://github.com/libardo667/worldweaver/edit/main/docs/${relativePath}`;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hekswerk',
  tagline: 'Operations automation and open research',
  favicon: 'img/logo_aura.svg',
  url: 'https://www.hekswerk.com',
  baseUrl: '/',
  organizationName: 'libardo667',
  projectName: 'hekswerk-site',
  trailingSlash: false,
  customFields: {
    worldweaverCommit: worldweaverCommit || null,
  },
  staticDirectories: ['static'],
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
          editUrl: worldweaverEditUrl,
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
          "Hekswerk is Levi Banks's one-person systems practice. Its primary commercial offer is the Operations Automation Sprint.",
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
        {to: '/work', label: 'Work', position: 'left'},
        {to: '/work/selected-work', label: 'Selected work', position: 'left'},
        {to: '/research', label: 'Research', position: 'left'},
        {
          to: '/worldweaver/',
          label: 'WorldWeaver docs',
          position: 'left',
          activeBaseRegex: '/worldweaver/',
        },
        {to: '/about', label: 'About', position: 'left'},
        {to: '/contact', label: 'Contact', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Work',
          items: [
            {label: 'Operations Automation Sprint', to: '/work'},
            {label: 'Selected work', to: '/work/selected-work'},
            {label: 'Shareable brief', to: '/work/brief'},
          ],
        },
        {
          title: 'Research',
          items: [
            {label: 'WorldWeaver documentation', to: '/worldweaver/'},
            {label: 'Research orientation', to: '/research'},
            {label: 'WorldWeaver source', href: 'https://github.com/libardo667/worldweaver'},
          ],
        },
        {
          title: 'Practice',
          items: [
            {label: 'About', to: '/about'},
            {label: 'Contact', to: '/contact'},
            {label: 'Privacy', to: '/privacy'},
          ],
        },
      ],
      copyright:
        `Copyright © ${new Date().getFullYear()} Hekswerk. WorldWeaver source is AGPL-3.0-or-later. ` +
        `Manual source: <a href="${worldweaverVersionUrl}">${worldweaverVersion}</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
