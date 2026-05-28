export interface Announcement {
  id: string
  active: boolean
  priority: number
  messageEN: string
  messageAR: string
  ctaLabelEN: string
  ctaLabelAR: string
  ctaHref: string
  bgColor: string
  textColor: string
  emoji: string
  startDate: string
  expiryDate: string
  dismissible: boolean
}

export interface NavLink {
  id: string
  labelEN: string
  labelAR: string
  href: string
}

export interface NavigationData {
  links: NavLink[]
  ctaEN: string
  ctaAR: string
  ctaHref: string
}

export interface StatItem {
  value: string
  suffix: string
  labelEN: string
  labelAR: string
}

export interface ServiceItem {
  id: string
  iconColor: string
  titleEN: string
  titleAR: string
  descriptionEN: string
  descriptionAR: string
  href: string
}

export interface ProcessStep {
  number: string
  titleEN: string
  titleAR: string
  descriptionEN: string
  descriptionAR: string
}

export interface TestimonialItem {
  id: string
  nameEN: string
  nameAR: string
  roleEN: string
  roleAR: string
  quoteEN: string
  quoteAR: string
  stars: number
  avatarUrl: string
}

export interface HomeData {
  hero: {
    headingEN: string
    headingAR: string
    accentWordEN: string
    accentWordAR: string
    subheadingEN: string
    subheadingAR: string
    primaryCtaEN: string
    primaryCtaAR: string
    primaryCtaHref: string
    secondaryCtaEN: string
    secondaryCtaAR: string
    secondaryCtaHref: string
    stats: StatItem[]
  }
  services: {
    headingEN: string
    headingAR: string
    accentWordEN: string
    accentWordAR: string
    items: ServiceItem[]
  }
  process: {
    headingEN: string
    headingAR: string
    accentWordEN: string
    accentWordAR: string
    steps: ProcessStep[]
  }
  testimonials: {
    headingEN: string
    headingAR: string
    accentWordEN: string
    accentWordAR: string
    items: TestimonialItem[]
  }
  cta: {
    headingEN: string
    headingAR: string
    buttonEN: string
    buttonAR: string
    buttonHref: string
  }
}

export interface ValueItem {
  id: string
  icon: string
  titleEN: string
  titleAR: string
  descriptionEN: string
  descriptionAR: string
}

export interface TeamMember {
  id: string
  name: string
  roleEN: string
  roleAR: string
  photoUrl: string
  bioEN: string
  bioAR: string
}

export interface Milestone {
  year: string
  titleEN: string
  titleAR: string
  descriptionEN: string
  descriptionAR: string
}

export interface ClientLogo {
  id: string
  name: string
  logoUrl: string
}

export interface AboutData {
  hero: { headingEN: string; headingAR: string; accentWordEN: string; accentWordAR: string; subheadingEN: string; subheadingAR: string }
  story: { headingEN: string; headingAR: string; bodyEN: string; bodyAR: string }
  values: ValueItem[]
  team: TeamMember[]
  milestones: Milestone[]
  clients: ClientLogo[]
}

export interface ServiceDetail {
  slug: string
  iconColor: string
  titleEN: string
  titleAR: string
  descriptionEN: string
  descriptionAR: string
  featuresEN: string[]
  featuresAR: string[]
}

export interface ServicesData {
  hero: { headingEN: string; headingAR: string; accentWordEN: string; accentWordAR: string; subheadingEN: string; subheadingAR: string }
  items: ServiceDetail[]
}

export interface PricingPackage {
  id: string
  badgeEN: string; badgeAR: string
  nameEN: string; nameAR: string
  descriptionEN: string; descriptionAR: string
  basePrice: number
  billingEN: string; billingAR: string
  deliveryEN: string; deliveryAR: string
  featured: boolean
  featuresEN: string[]; featuresAR: string[]
  excludedEN: string[]; excludedAR: string[]
}

export interface PricingData {
  hero: { headingEN: string; headingAR: string; accentWordEN: string; accentWordAR: string; subheadingEN: string; subheadingAR: string }
  currencies: Record<string, { symbol: string; rate: number }>
  packages: PricingPackage[]
  faq: { id: string; questionEN: string; questionAR: string; answerEN: string; answerAR: string }[]
  note: { EN: string; AR: string }
}

export interface Project {
  slug: string
  titleEN: string; titleAR: string
  coverUrl: string
  tags: string[]
  industryEN: string; industryAR: string
  year: string
  featured: boolean
  summaryEN: string; summaryAR: string
  challengeEN: string; challengeAR: string
  solutionEN: string; solutionAR: string
  resultsEN: string[]; resultsAR: string[]
  galleryUrls: string[]
}

export interface WorkData {
  hero: { headingEN: string; headingAR: string; accentWordEN: string; accentWordAR: string; subheadingEN: string; subheadingAR: string }
  projects: Project[]
}

export interface ContactData {
  hero: { headingEN: string; headingAR: string; accentWordEN: string; accentWordAR: string; subheadingEN: string; subheadingAR: string }
  info: { emailEN: string; emailAR: string; phone: string; addressEN: string; addressAR: string; mapEmbedUrl: string; bookingUrl: string }
  socials: { platform: string; url: string }[]
  formFields: { nameEN: string; nameAR: string; emailEN: string; emailAR: string; serviceEN: string; serviceAR: string; messageEN: string; messageAR: string; submitEN: string; submitAR: string }
}

export interface BlogMeta {
  slug: string
  titleEN: string
  titleAR: string
  excerptEN: string
  excerptAR: string
  author: string
  coverUrl: string
  tags: string[]
  status: 'published' | 'draft'
  publishedAt: string
  updatedAt: string
}
