/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  worldweaver: [
    'index',
    {
      type: 'category',
      label: 'Tutorials',
      collapsed: false,
      items: ['tutorials/run-a-local-town'],
    },
    {
      type: 'category',
      label: 'How-to guides',
      collapsed: false,
      items: [
        'how-to/run-residents',
        'how-to/build-a-city',
        'how-to/operate-a-local-node',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/architecture',
        'reference/dependency-atlas',
        'reference/commands',
      ],
    },
    {
      type: 'category',
      label: 'Design explanations',
      items: [
        'explanation/residents-hearths-and-continuity',
        'explanation/elective-information-and-privacy',
        'explanation/federation-without-ownership',
        'explanation/stoops-artifacts-and-consequences',
      ],
    },
  ],
};

export default sidebars;
