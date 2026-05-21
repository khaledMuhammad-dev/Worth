export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  hero: string;
  intro: string;
  accent: string;
  stats: { label: string; value: string }[];
  deliverables: string[];
  outcomes: string[];
  process: { title: string; description: string }[];
}

export interface ProjectDetail {
  slug: string;
  title: string;
  summary: string;
  client: string;
  industry: string;
  service: string;
  tags: string[];
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  overview: string[];
  nextSlug: string;
}

export interface ArticleDetail {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  featured?: boolean;
  sections: { heading: string; body: string[] }[];
}

export const teamMembers = [
  {
    name: 'Mariam Adel',
    role: 'Managing Director',
    bio: 'Mariam leads strategy, client partnerships, and high-growth planning for brands scaling across MENA.',
  },
  {
    name: 'Youssef Nabil',
    role: 'Creative Director',
    bio: 'Youssef shapes visual systems, campaigns, and storytelling experiences that feel premium and perform.',
  },
  {
    name: 'Nadine Sherif',
    role: 'Digital Growth Lead',
    bio: 'Nadine turns data into action through paid media, experimentation, and full-funnel performance systems.',
  },
];

export const clientLogos = ['AURORA', 'NOVA', 'CITADEL', 'BLOOM', 'PULSE', 'VERVE'];

export const services = [
  {
    slug: 'marketing-media-buying',
    title: 'Marketing & Media Buying',
    shortDescription: 'Performance campaigns built to reach the right audience, reduce waste, and scale revenue confidently.',
    hero: 'We build media systems that turn spend into measurable growth.',
    intro:
      'From launch campaigns to mature acquisition engines, we plan, deploy, and optimize paid media with full-funnel accountability. Every creative angle, targeting decision, and reporting layer is designed around profitable growth.',
    accent: 'from-[#FFF4EE] to-[#FDE68A]',
    stats: [
      { label: 'Average ROAS lift', value: '+182%' },
      { label: 'Channels managed', value: '8+' },
      { label: 'Campaign reports', value: 'Weekly' },
    ],
    deliverables: [
      'Audience research and funnel mapping',
      'Meta, Google, TikTok, and LinkedIn campaign setup',
      'Ad creative direction and testing roadmap',
      'Tracking, pixels, and conversion reporting',
      'Weekly optimization and budget pacing',
    ],
    outcomes: [
      'Lower customer acquisition costs',
      'Clearer attribution and reporting confidence',
      'Sustainable lead and sales growth',
    ],
    process: [
      { title: 'Audit & Insight', description: 'We assess your current funnel, competitors, creative gaps, and measurement stack.' },
      { title: 'Campaign Architecture', description: 'We structure campaigns around awareness, consideration, conversion, and retention goals.' },
      { title: 'Creative Testing', description: 'We ship multiple hooks, offers, and formats to uncover what drives efficient results.' },
      { title: 'Optimization', description: 'We scale top performers, cut inefficiencies, and report on the metrics that matter.' },
    ],
  },
  {
    slug: 'brand-identity',
    title: 'Brand Identity',
    shortDescription: 'Distinctive brands with strategic positioning, memorable visual systems, and language people remember.',
    hero: 'We shape brands people trust, recognize, and choose faster.',
    intro:
      'Brand identity is more than a logo. We define the strategic foundations, voice, and visual language that help your business look sharper, feel more consistent, and command stronger pricing power in the market.',
    accent: 'from-[#FFF4EE] to-[#E9D5FF]',
    stats: [
      { label: 'Brand systems delivered', value: '70+' },
      { label: 'Core assets included', value: '20+' },
      { label: 'Avg. timeline', value: '4-6 weeks' },
    ],
    deliverables: [
      'Brand strategy workshop',
      'Positioning, mission, and messaging pillars',
      'Logo suite and visual identity system',
      'Color, typography, and design rules',
      'Brand guideline deck and social kit',
    ],
    outcomes: [
      'Stronger recall across touchpoints',
      'More confident launches and campaigns',
      'A premium, cohesive market presence',
    ],
    process: [
      { title: 'Positioning', description: 'We uncover the strategic whitespace that makes your brand relevant and distinct.' },
      { title: 'Identity Design', description: 'We craft a flexible identity system that works across digital, print, and motion.' },
      { title: 'Messaging', description: 'We define tone of voice, brand language, and key message hierarchies.' },
      { title: 'Rollout', description: 'We package the tools your team needs to launch consistently with confidence.' },
    ],
  },
  {
    slug: 'motion-graphics',
    title: 'Motion Graphics',
    shortDescription: 'Short-form motion, product explainers, and social-first animations that capture attention instantly.',
    hero: 'We turn complex messages into motion people feel in seconds.',
    intro:
      'Motion graphics help brands explain, persuade, and stand out in fast-scrolling environments. We storyboard and animate content that makes your offer clearer and your campaigns more compelling.',
    accent: 'from-[#FFF4EE] to-[#BBF7D0]',
    stats: [
      { label: 'Video completion lift', value: '+41%' },
      { label: 'Formats produced', value: '12+' },
      { label: 'Delivery speed', value: 'Fast-turn' },
    ],
    deliverables: [
      'Concept development and scripting',
      'Storyboards and motion direction',
      'Animated brand assets and explainers',
      'Social reels, ads, and launch loops',
      'Export packages for paid and organic use',
    ],
    outcomes: [
      'Higher engagement on key campaigns',
      'Better storytelling in product launches',
      'A richer, more modern content mix',
    ],
    process: [
      { title: 'Story', description: 'We simplify the message and define the narrative arc before design begins.' },
      { title: 'Frames', description: 'We build storyboard frames and style references that align with your brand.' },
      { title: 'Animation', description: 'We animate for clarity, rhythm, and performance across different placements.' },
      { title: 'Optimization', description: 'We export cutdowns and variants tailored to paid, social, and website use.' },
    ],
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    shortDescription: 'Fast, conversion-ready websites and landing pages built to turn traffic into action.',
    hero: 'We build high-performance websites that earn trust and drive conversion.',
    intro:
      'Your website is where attention turns into decision. We design and develop scalable digital experiences that communicate clearly, load quickly, and support both brand perception and bottom-line performance.',
    accent: 'from-[#FFF4EE] to-[#BFDBFE]',
    stats: [
      { label: 'Pages built', value: '250+' },
      { label: 'Typical speed score', value: '90+' },
      { label: 'CMS-ready builds', value: 'Yes' },
    ],
    deliverables: [
      'UX strategy and wireframing',
      'Responsive interface design',
      'Custom Next.js development',
      'Conversion-focused landing pages',
      'Analytics, forms, and SEO foundations',
    ],
    outcomes: [
      'Higher inquiry and lead conversion rates',
      'Better mobile experience and load times',
      'A premium web presence built for growth',
    ],
    process: [
      { title: 'UX Mapping', description: 'We structure journeys, pages, and key actions around real user intent.' },
      { title: 'Interface Design', description: 'We create polished, modern designs with a clear hierarchy and strong CTAs.' },
      { title: 'Development', description: 'We build scalable frontends with speed, responsiveness, and maintainability in mind.' },
      { title: 'Launch & Iterate', description: 'We QA, launch, and refine based on analytics and behavior data.' },
    ],
  },
  {
    slug: 'creative-production',
    title: 'Creative Production',
    shortDescription: 'Campaign concepts, ad systems, and content toolkits that keep your brand moving with consistency.',
    hero: 'We produce campaign-ready creative assets that scale across channels.',
    intro:
      'When campaigns need momentum, creative production becomes the engine. We build visual systems, ad sets, launch kits, and repeatable content frameworks that help internal teams execute faster without sacrificing quality.',
    accent: 'from-[#FFF4EE] to-[#FBCFE8]',
    stats: [
      { label: 'Creative assets/month', value: '50+' },
      { label: 'Campaign kits', value: 'End-to-end' },
      { label: 'Turnaround', value: 'Agile' },
    ],
    deliverables: [
      'Campaign concepting and key visuals',
      'Social content systems and templates',
      'Ad creative batches and iteration cycles',
      'Launch decks and internal asset guides',
      'Photography and production direction',
    ],
    outcomes: [
      'Faster rollout across channels',
      'More consistent brand expression',
      'Creative libraries built for testing and scale',
    ],
    process: [
      { title: 'Concepting', description: 'We translate campaign goals into visual ideas and content directions.' },
      { title: 'System Design', description: 'We build reusable templates and production rules for consistency at scale.' },
      { title: 'Asset Creation', description: 'We produce design, copy, and motion assets for launch and iteration.' },
      { title: 'Iteration', description: 'We refine top performers and expand the system based on channel feedback.' },
    ],
  },
] satisfies ServiceDetail[];

export const projects = [
  {
    slug: 'nova-build-rebrand',
    title: 'NovaBuild Rebrand & Demand Generation',
    summary: 'Repositioning a fast-growing construction technology brand for regional expansion.',
    client: 'NovaBuild',
    industry: 'Construction Technology',
    service: 'Branding',
    tags: ['Brand Identity', 'Paid Media', 'Website'],
    image: '',
    challenge:
      'NovaBuild had an innovative product and a strong sales team, but their brand identity looked generic and their acquisition channels were fragmented. The business needed a sharper story and a more credible digital presence before entering new GCC markets.',
    solution:
      'Worth rebuilt the brand from the ground up, from positioning and identity to a conversion-focused website and B2B lead generation campaigns. We aligned messaging across every touchpoint, launched a content-rich website, and rolled out a high-intent paid media funnel targeting developers and project decision-makers.',
    results: ['3.4x increase in qualified leads in 5 months', '41% lower cost per lead after launch', 'New brand system rolled out across 3 regional markets'],
    overview: [
      'The project began with a strategy sprint to define NovaBuild’s strongest market differentiators and buyer concerns. That work informed a bold identity system that balanced innovation with credibility.',
      'From there, we built a high-converting website with focused service pages, proof-led messaging, and frictionless inquiry paths. Launch campaigns combined search intent, remarketing, and high-value creative sequences.',
    ],
    nextSlug: 'bloom-retail-growth',
  },
  {
    slug: 'bloom-retail-growth',
    title: 'Bloom Retail Performance Launch',
    summary: 'Scaling a lifestyle retail brand with a stronger paid social engine and sharper creative.',
    client: 'Bloom Retail',
    industry: 'Retail',
    service: 'Marketing',
    tags: ['Media Buying', 'Creative', 'Analytics'],
    image: '',
    challenge:
      'Bloom had strong product-market fit but inconsistent paid performance. Campaigns lacked creative variation, reporting was unclear, and the brand had limited visibility into which products and audiences actually drove profitable growth.',
    solution:
      'We rebuilt the account structure, introduced a full testing framework, and created a creative pipeline tailored to seasonal launches. Attribution was tightened, reporting became executive-friendly, and campaign decisions were grounded in margin-aware performance data.',
    results: ['218% increase in revenue from paid social', '26% improvement in returning customer rate', '7-day creative testing cycle implemented'],
    overview: [
      'Worth introduced a campaign architecture built around hero products, bundles, and remarketing journeys. We paired that with a disciplined creative calendar designed to feed new hooks into the account weekly.',
      'The result was a more stable growth engine that gave Bloom’s team confidence to increase spend without compromising efficiency.',
    ],
    nextSlug: 'aurora-finance-platform',
  },
  {
    slug: 'aurora-finance-platform',
    title: 'Aurora Finance Product Experience',
    summary: 'A premium web platform for a fintech brand ready to look as sophisticated as its service.',
    client: 'Aurora Finance',
    industry: 'Fintech',
    service: 'Web',
    tags: ['Web Development', 'UX', 'SEO'],
    image: '',
    challenge:
      'Aurora’s previous website failed to reflect the sophistication of its advisory offering. Navigation was unclear, content felt dense, and mobile conversion rates were underperforming dramatically compared with desktop.',
    solution:
      'We redesigned the experience around decision-stage journeys, simplified the information architecture, and developed a premium interface with stronger credibility signals, clearer product storytelling, and lightweight interactions. Technical SEO and performance optimizations were implemented from day one.',
    results: ['52% increase in demo requests', 'Page speed score improved to 95', 'Bounce rate reduced by 31%'],
    overview: [
      'We focused heavily on clarity and trust: modular proof sections, client outcomes, and benefit-led content replaced dense copy blocks. The design system balanced elegance with simplicity to appeal to both affluent users and enterprise decision-makers.',
      'Post-launch, the site became a stronger conversion and sales enablement asset across paid, organic, and referral traffic.',
    ],
    nextSlug: 'pulse-health-campaign',
  },
  {
    slug: 'pulse-health-campaign',
    title: 'Pulse Health Motion Campaign',
    summary: 'Explainer-led motion content that made a complex health offering easier to understand and trust.',
    client: 'Pulse Health',
    industry: 'Healthcare',
    service: 'Motion',
    tags: ['Motion Graphics', 'Campaign Creative', 'Social'],
    image: '',
    challenge:
      'Pulse Health needed to explain a multi-layered health subscription model to a broad consumer audience. Static creative was not communicating enough value, and the marketing team needed assets that worked across awareness and retargeting placements.',
    solution:
      'We developed a motion-led campaign system with educational explainers, short ads, and onboarding animations. The visual language simplified the offer while keeping the tone premium, trustworthy, and easy to remember.',
    results: ['63% lift in video completion rate', '29% higher landing page conversion from video traffic', '12 reusable motion assets for future campaigns'],
    overview: [
      'We combined scripting, storyboard design, and fast-turn motion production to create a system that Pulse could keep using beyond the initial campaign. Each asset was adapted for paid social, landing pages, and CRM sequences.',
      'By clarifying the value proposition visually, the brand shortened the path from awareness to action.',
    ],
    nextSlug: 'citadel-properties-launch',
  },
  {
    slug: 'citadel-properties-launch',
    title: 'Citadel Properties Launch System',
    summary: 'A real-estate launch identity and campaign ecosystem designed to attract premium buyers quickly.',
    client: 'Citadel Properties',
    industry: 'Real Estate',
    service: 'Branding',
    tags: ['Launch Campaign', 'Brand Identity', 'Web'],
    image: '',
    challenge:
      'Citadel was preparing a flagship property launch but lacked a unifying story, cohesive campaign visuals, and a digital journey worthy of a high-value audience. Internal teams also needed a clearer rollout system to keep messaging aligned.',
    solution:
      'Worth created the campaign concept, identity extensions, sales deck system, landing pages, and ad creative. The end result was a polished launch ecosystem that looked premium at every touchpoint, from billboards to lead forms.',
    results: ['Sold-out first release phase in 6 weeks', '2.1x increase in qualified buyer inquiries', 'Unified launch system used across sales and marketing'],
    overview: [
      'This engagement required speed without compromise. Our team worked alongside Citadel’s internal stakeholders to create a system that both looked elevated and remained operationally practical for launch.',
      'The campaign’s consistency helped build trust early and reduced friction across the buyer journey.',
    ],
    nextSlug: 'verve-ecommerce-scale',
  },
  {
    slug: 'verve-ecommerce-scale',
    title: 'Verve E-commerce Scale Program',
    summary: 'Creative production and performance marketing support for a fashion label entering aggressive growth mode.',
    client: 'Verve',
    industry: 'Fashion',
    service: 'Marketing',
    tags: ['Creative Production', 'Paid Social', 'Retention'],
    image: '',
    challenge:
      'Verve’s fast product drops were outpacing its marketing system. Creative quality varied across channels, campaigns lacked a steady testing rhythm, and the brand needed a scalable performance partner to support growth without diluting its aesthetic.',
    solution:
      'We set up a monthly production and campaign sprint model: content planning, ad creative batches, paid media management, and performance reporting in one loop. This gave the brand a repeatable system for launches, evergreen campaigns, and retention pushes.',
    results: ['Monthly revenue doubled within two quarters', 'Creative output increased by 4x', 'Email and paid media worked as one unified growth system'],
    overview: [
      'Worth acted as an embedded extension of the Verve team, bridging creative production and paid execution. The work focused on speed, consistency, and profit-aware testing rather than isolated campaign bursts.',
      'The result was a more resilient growth operation that supported rapid launches without compromising brand quality.',
    ],
    nextSlug: 'nova-build-rebrand',
  },
] satisfies ProjectDetail[];

export const articles = [
  {
    slug: 'why-brand-strategy-matters-before-design',
    title: 'Why Brand Strategy Matters Before Design',
    excerpt: 'Strong visuals start with sharper positioning. Here is how strategy makes creative work more valuable.',
    category: 'Brand Strategy',
    author: 'Mariam Adel',
    role: 'Managing Director',
    date: 'Jan 18, 2024',
    readTime: '6 min read',
    featured: true,
    sections: [
      {
        heading: 'Design Without Strategy Looks Polished but Feels Replaceable',
        body: [
          'Many businesses invest in visual identity before they have clarity on audience, category position, message hierarchy, or promise. The result is usually attractive work that lacks strategic tension and therefore fails to create memorability.',
          'When strategy comes first, design choices become more intentional. Color, typography, tone, and layout stop being decoration and start becoming signals of value and meaning.',
        ],
      },
      {
        heading: 'Strategy Gives Creative Teams Better Constraints',
        body: [
          'Clear positioning simplifies creative decisions. Teams know what to emphasize, what to avoid, and what emotional territory the brand should own.',
          'This does not limit creativity. It sharpens it. Better constraints create stronger concepts because the work is anchored in a real business objective rather than personal taste.',
        ],
      },
      {
        heading: 'The Payoff Shows Up in Consistency and Conversion',
        body: [
          'Brands with strategic clarity tend to launch faster, brief better, and communicate more consistently across sales, marketing, and product touchpoints.',
          'That consistency improves trust. And trust, in most markets, improves conversion just as much as a visual refresh does.',
        ],
      },
    ],
  },
  {
    slug: 'the-new-rules-of-performance-creative',
    title: 'The New Rules of Performance Creative',
    excerpt: 'Winning paid campaigns today depend on creative velocity, not just media optimization.',
    category: 'Performance Marketing',
    author: 'Nadine Sherif',
    role: 'Digital Growth Lead',
    date: 'Feb 02, 2024',
    readTime: '5 min read',
    sections: [
      {
        heading: 'Media Buying Alone Is No Longer the Edge',
        body: [
          'Algorithms have improved, competition has intensified, and audience fatigue happens faster than ever. That means performance teams need creative systems that generate fresh hooks and formats continuously.',
          'Brands that treat creative like a scalable testing function usually outperform brands that rely on a single “hero” ad for too long.',
        ],
      },
      {
        heading: 'Creative Volume Must Stay Strategic',
        body: [
          'More output is useful only when each asset tests something specific: a new promise, a new audience angle, a different proof point, or a different emotional trigger.',
          'Without that discipline, teams produce noise instead of learning.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-build-a-website-that-sells',
    title: 'How to Build a Website That Sells',
    excerpt: 'A good website looks polished. A great one removes doubt and creates momentum toward action.',
    category: 'Web Strategy',
    author: 'Youssef Nabil',
    role: 'Creative Director',
    date: 'Feb 16, 2024',
    readTime: '7 min read',
    sections: [
      {
        heading: 'Clarity Beats Cleverness',
        body: [
          'Visitors decide quickly whether your website feels relevant. Your homepage should make the offer, audience, and value obvious within seconds.',
          'Elegant language matters, but clarity is what moves people deeper into the experience.',
        ],
      },
      {
        heading: 'Trust Signals Do the Heavy Lifting',
        body: [
          'Case studies, testimonials, client logos, process transparency, and thoughtful UI details all reduce friction. They reassure visitors that your business can deliver on its promise.',
          'The more complex or expensive the offer, the more important these signals become.',
        ],
      },
    ],
  },
  {
    slug: 'content-systems-for-fast-moving-brands',
    title: 'Content Systems for Fast-Moving Brands',
    excerpt: 'The fastest growing brands are not posting more randomly — they are operating from repeatable systems.',
    category: 'Content Marketing',
    author: 'Mariam Adel',
    role: 'Managing Director',
    date: 'Mar 05, 2024',
    readTime: '4 min read',
    sections: [
      {
        heading: 'Systems Create Speed Without Chaos',
        body: [
          'When a content team has clear formats, approval paths, and campaign pillars, quality improves while execution gets faster.',
          'That system becomes especially valuable when multiple departments contribute to launches and messaging.',
        ],
      },
    ],
  },
  {
    slug: 'what-makes-a-campaign-feel-premium',
    title: 'What Makes a Campaign Feel Premium',
    excerpt: 'Premium is not just a visual style. It is the sum of clarity, restraint, and confidence across the full experience.',
    category: 'Creative Direction',
    author: 'Youssef Nabil',
    role: 'Creative Director',
    date: 'Mar 19, 2024',
    readTime: '5 min read',
    sections: [
      {
        heading: 'Premium Brands Use Restraint Intentionally',
        body: [
          'Premium communication rarely tries to say everything at once. It chooses what matters most and presents it with enough confidence to leave room for curiosity.',
          'That restraint shapes everything from copy length to animation speed and spacing choices.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-measure-roi-beyond-vanity-metrics',
    title: 'How to Measure ROI Beyond Vanity Metrics',
    excerpt: 'Strong reporting goes beyond impressions and clicks to connect marketing activity with business outcomes.',
    category: 'Analytics',
    author: 'Nadine Sherif',
    role: 'Digital Growth Lead',
    date: 'Apr 02, 2024',
    readTime: '6 min read',
    sections: [
      {
        heading: 'The Best Dashboards Support Decisions',
        body: [
          'Metrics only matter when they help teams choose what to double down on, what to fix, and what to stop doing. That means tying campaign reporting to margin, quality, conversion rate, or pipeline outcomes whenever possible.',
          'Once teams agree on those metrics, reporting becomes far more actionable and far less noisy.',
        ],
      },
    ],
  },
  {
    slug: 'why-localized-campaigns-win-in-mena',
    title: 'Why Localized Campaigns Win in MENA',
    excerpt: 'Brands that respect nuance, culture, and language context consistently outperform generic regional campaigns.',
    category: 'Regional Growth',
    author: 'Mariam Adel',
    role: 'Managing Director',
    date: 'Apr 15, 2024',
    readTime: '5 min read',
    sections: [
      {
        heading: 'Localization Is More Than Translation',
        body: [
          'The best localized campaigns adapt tone, framing, proof, and creative context to the audience — not just the language. That is especially important across MENA, where expectations and references vary significantly by market.',
          'Brands that invest in nuance feel more relevant and more trustworthy from the first impression.',
        ],
      },
    ],
  },
] satisfies ArticleDetail[];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
