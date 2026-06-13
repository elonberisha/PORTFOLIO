import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Personal Settings',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', title: 'Role Subtitle', type: 'string', description: 'e.g. AI Developer - Full-Stack Software Developer - AAB University' }),
    defineField({ name: 'navMeta', title: 'Nav Meta Text', type: 'string', description: 'Small text next to the name in the navbar, e.g. AI / full-stack' }),
    defineField({ name: 'navResumeLabel', title: 'Nav Resume Button Label', type: 'string' }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Href', type: 'string', description: 'Example: #about, #projects, /resume' }),
          ],
        },
      ],
    }),

    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string' }),
    defineField({ name: 'heroSub', title: 'Hero Subtext', type: 'text', description: 'Short paragraph under the hero title.' }),
    defineField({ name: 'heroPrimaryCtaLabel', title: 'Hero Primary CTA Label', type: 'string' }),
    defineField({ name: 'heroProjectsCtaLabel', title: 'Hero Projects CTA Label', type: 'string' }),
    defineField({ name: 'heroContactCtaLabel', title: 'Hero Contact CTA Label', type: 'string' }),
    defineField({ name: 'heroPortraitPlaceholder', title: 'Hero Portrait Placeholder Text', type: 'text', rows: 2 }),
    defineField({
      name: 'portrait',
      title: 'Hero Photo',
      type: 'image',
      description: 'Upload the photo used on the homepage hero. The site crops and resizes it automatically.',
      options: { hotspot: true },
    }),
    defineField({ name: 'heroPhotoTag', title: 'Hero Photo Tag', type: 'string' }),
    defineField({ name: 'heroPhotoLocation', title: 'Hero Photo Location Label', type: 'string' }),
    defineField({ name: 'heroPhotoRole', title: 'Hero Photo Role Label', type: 'string' }),

    defineField({ name: 'aboutSectionLabel', title: 'About Section Label', type: 'string' }),
    defineField({ name: 'aboutTitle', title: 'About Title', type: 'string', description: 'Use {firstName} where the first name should appear.' }),
    defineField({ name: 'aboutQuote', title: 'About Pull-Quote', type: 'text', description: 'Large italic quote in the About section.' }),
    defineField({
      name: 'aboutBody',
      title: 'About Body',
      type: 'text',
      description: 'Separate paragraphs with a blank line (two newlines).',
      rows: 6,
    }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'university', title: 'University', type: 'string' }),
    defineField({ name: 'focus', title: 'Focus', type: 'string' }),
    defineField({ name: 'status', title: 'Status', type: 'string', description: 'e.g. Open for internships - remote / hybrid' }),
    defineField({
      name: 'aboutFacts',
      title: 'About Facts',
      type: 'array',
      description: 'Rows displayed in the About section.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
        },
      ],
    }),

    defineField({ name: 'stackSectionLabel', title: 'Stack Section Label', type: 'string' }),
    defineField({ name: 'stackTitle', title: 'Stack Title', type: 'string', description: 'Use | for a line break, e.g. The tools|I trust.' }),
    defineField({ name: 'stackSubtitle', title: 'Stack Subtitle', type: 'text', rows: 2 }),

    defineField({ name: 'projectsSectionLabel', title: 'Projects Section Label', type: 'string' }),
    defineField({ name: 'projectsTitle', title: 'Projects Title', type: 'string' }),
    defineField({ name: 'projectsSubtitle', title: 'Projects Subtitle', type: 'text', rows: 2 }),
    defineField({ name: 'projectsAllLabel', title: 'Projects All Filter Label', type: 'string' }),
    defineField({ name: 'projectsFeaturedLabel', title: 'Projects Featured Label', type: 'string' }),
    defineField({ name: 'projectsStackLabel', title: 'Projects Stack Label', type: 'string' }),
    defineField({ name: 'projectsYearLabel', title: 'Projects Year Label', type: 'string' }),
    defineField({ name: 'projectsTypeLabel', title: 'Projects Type Label', type: 'string' }),
    defineField({ name: 'projectsFallbackTypeLabel', title: 'Projects Fallback Type Label', type: 'string' }),

    defineField({ name: 'aiSearchSectionLabel', title: 'AI Search Section Label', type: 'string', description: 'Small section label, e.g. 06 / AI Search Profile' }),
    defineField({ name: 'aiSearchTitle', title: 'AI Search Title', type: 'string', description: 'Visible title for answer engines and users.' }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', description: 'Google title. Leave empty to use name + role.' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, description: 'Google/AI summary. Keep it factual and under ~160 characters if possible.' }),
    defineField({ name: 'entityRole', title: 'Entity Role', type: 'string', description: 'Primary identity, e.g. AI Developer & Full-Stack Software Developer.' }),
    defineField({ name: 'entitySummary', title: 'Entity Summary', type: 'text', rows: 4, description: 'Citation-ready bio for Google, ChatGPT Search, Gemini, Claude, Perplexity, and Copilot.' }),
    defineField({
      name: 'entityKeywords',
      title: 'Entity Keywords',
      type: 'array',
      description: 'Topics you want connected to your name/entity.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'knowsAbout',
      title: 'Knows About',
      type: 'array',
      description: 'Schema.org knowsAbout terms, e.g. AI agents, full-stack development, Java, Spring Boot.',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'memberOfName', title: 'Team / Organization Name', type: 'string', description: 'Example: Devycore' }),
    defineField({ name: 'memberOfUrl', title: 'Team / Organization URL', type: 'url' }),
    defineField({
      name: 'sameAsLinks',
      title: 'Extra SameAs Links',
      type: 'array',
      description: 'Authoritative profiles that prove the same entity: GitHub, LinkedIn, Devycore profile, etc.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'aiSearchFacts',
      title: 'AI / Answer Engine Facts',
      type: 'array',
      description: 'Visible Q&A facts. These are used for AEO/LLMO and must stay truthful.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),

    defineField({ name: 'certificationsSectionLabel', title: 'Certifications Section Label', type: 'string' }),
    defineField({ name: 'certificationsTitle', title: 'Certifications Title', type: 'string' }),
    defineField({ name: 'certificationsAllLabel', title: 'Certifications All Filter Label', type: 'string' }),
    defineField({ name: 'certificationsPreviewLabel', title: 'Certifications Preview Label', type: 'string' }),
    defineField({ name: 'certificationsVerifyLabel', title: 'Certifications Verify Label', type: 'string' }),
    defineField({ name: 'certificationsVerifiedLabel', title: 'Certifications Verified Status Label', type: 'string' }),
    defineField({ name: 'certificationsInProgressLabel', title: 'Certifications In Progress Status Label', type: 'string' }),
    defineField({ name: 'certificationsIdLabel', title: 'Certifications ID Label', type: 'string' }),
    defineField({ name: 'certificationsYearLabel', title: 'Certifications Year Label', type: 'string' }),
    defineField({ name: 'certificationsModalLabel', title: 'Certifications Modal Label', type: 'string' }),
    defineField({ name: 'certificationsOpenLabel', title: 'Certifications Open Media Label', type: 'string' }),
    defineField({ name: 'certificationsCloseLabel', title: 'Certifications Close Preview Label', type: 'string' }),

    defineField({ name: 'contactSectionLabel', title: 'Contact Section Label', type: 'string' }),
    defineField({ name: 'contactTitle', title: 'Contact Title', type: 'string' }),
    defineField({ name: 'contactIntro', title: 'Contact Intro Text', type: 'text', rows: 3 }),
    defineField({ name: 'contactEmailButtonLabel', title: 'Contact Email Button Label', type: 'string' }),
    defineField({ name: 'contactCvButtonLabel', title: 'Contact CV Button Label', type: 'string' }),
    defineField({
      name: 'contactLinks',
      title: 'Contact Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Displayed Value', type: 'string' }),
            defineField({ name: 'href', title: 'Href', type: 'string', description: 'mailto:, tel:, https://, etc.' }),
          ],
        },
      ],
    }),

    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'resumeUrl', title: 'Resume PDF URL', type: 'url', description: 'External PDF link - leave empty to use /resume page' }),

    defineField({ name: 'footerLeft', title: 'Footer Left Text', type: 'string' }),
    defineField({ name: 'footerRight', title: 'Footer Right Text', type: 'string' }),
    defineField({ name: 'footerClockLabel', title: 'Footer Clock Label', type: 'string' }),
    defineField({ name: 'footerTimeZone', title: 'Footer Time Zone', type: 'string', description: 'IANA timezone, e.g. Europe/Belgrade' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
})
