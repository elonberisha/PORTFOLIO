export const settingsQuery = `*[_type == "settings"][0] {
  name, role, navMeta, navResumeLabel,
  navLinks[] { label, href },
  heroEyebrow, heroSub, heroPrimaryCtaLabel, heroProjectsCtaLabel, heroContactCtaLabel,
  heroPortraitPlaceholder, heroPhotoTag, heroPhotoLocation, heroPhotoRole,
  aboutSectionLabel, aboutTitle, aboutQuote, aboutBody,
  location, university, focus, status,
  aboutFacts[] { label, value },
  stackSectionLabel, stackTitle, stackSubtitle,
  projectsSectionLabel, projectsTitle, projectsSubtitle, projectsAllLabel,
  projectsFeaturedLabel, projectsStackLabel, projectsYearLabel, projectsTypeLabel, projectsFallbackTypeLabel,
  aiSearchSectionLabel, aiSearchTitle, seoTitle, seoDescription,
  entityRole, entitySummary, entityKeywords, knowsAbout,
  memberOfName, memberOfUrl,
  sameAsLinks[] { label, url },
  aiSearchFacts[] { question, answer },
  certificationsSectionLabel, certificationsTitle,
  certificationsAllLabel, certificationsPreviewLabel, certificationsVerifyLabel,
  certificationsVerifiedLabel, certificationsInProgressLabel,
  certificationsIdLabel, certificationsYearLabel,
  certificationsModalLabel, certificationsOpenLabel, certificationsCloseLabel,
  contactSectionLabel, contactTitle, contactIntro, contactEmailButtonLabel, contactCvButtonLabel,
  contactLinks[] { label, value, href },
  email, phone, githubUrl, linkedinUrl, resumeUrl,
  footerLeft, footerRight, footerClockLabel, footerTimeZone,
  portrait
}`

export const socialLinksQuery = `*[_type == "socialLink"] | order(order asc) {
  _id, network, label, url
}`

export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id, title, description, techTag, year, url,
  "categories": categories[]->{title, "slug": slug.current},
  "previewImageUrl": previewImage.asset->url
}`

export const projectCategoriesQuery = `*[_type == "projectCategory"] | order(order asc, title asc) {
  _id, title, "slug": slug.current
}`

export const certificationsQuery = `*[_type == "certification"] | order(year desc) {
  _id, seal, issuer, year, title, tag, status, certId, url,
  "categoryTitle": category->title,
  "categorySlug": category->slug.current,
  "pdfUrl": pdf.asset->url,
  "mediaUrl": media.asset->url,
  "mediaMimeType": media.asset->mimeType,
  "previewImageUrl": previewImage.asset->url
}`

export const stackGroupsQuery = `*[_type == "stackGroup"] | order(order asc) {
  _id, name, order,
  items[] { name, years }
}`

export const resumeQuery = `*[_type == "resume"][0] {
  toolbarLabel,
  printButtonLabel,
  homeButtonLabel,
  summary,
  facts[] { label, value },
  projectsSectionLabel,
  stackSectionLabel,
  certificationsSectionLabel,
  customSections[] {
    title,
    entries[] { title, meta, date, description }
  },
  showProjects,
  showStack,
  showCertifications,
  footerLeft,
  footerRight
}`
