# Elon Berisha Portfolio — Setup Guide

## 1. Sanity CMS Setup (5 minuta)

1. Shko te **https://sanity.io** dhe hyr me llogarinë tënde
2. Kliko **"Create new project"** → emërtoje `elon-portfolio`
3. Zgjidh **dataset**: `production`
4. Kopjo **Project ID** (duket si `abc12345`)

## 2. Environment Variables

```bash
# Kopjo .env.local.example → .env.local
cp .env.local.example .env.local
```

Pastaj edito `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345   ← ID nga hapi 1
NEXT_PUBLIC_SANITY_DATASET=production
```

## 3. Lësho projektin

```bash
npm install     # nëse nuk ke bërë akoma
npm run dev     # hap http://localhost:3000
```

## 4. Shto përmbajtje në Sanity Studio

Hap: **http://localhost:3000/studio**

### Renditja e rekomanduar:
1. **Personal Settings** — emri, email, foto portret, bio, social URLs
2. **Social Links** — shto 8 rrjetet sociale me URL të vërteta
3. **Stack Groups** — 4 grupe (Languages, Backend, Databases, DevOps)
4. **Projects** — shto projektet tua
5. **Certifications** — shto certifikatat

## 5. Foto portret

Në Sanity Studio → Personal Settings → Portrait Photo → ngarko foton (4:5 aspect ratio punon perfekt)

## 6. Deploy (Vercel — falas)

```bash
npx vercel
# ose lidhe GitHub repo dhe Vercel e bën automatikisht
```

Mos harro të shtosh environment variables edhe në Vercel dashboard.

### Security variables for production

Set these in Vercel before production deploy:

```env
STUDIO_HOST=studio.elonberisha.com
STUDIO_BASIC_USER=your_studio_user
STUDIO_BASIC_PASSWORD=your_long_random_password
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

`/studio` is protected by Basic Auth only in production. On production, Studio is only available on the host configured with `STUDIO_HOST`. On the public domain (`elonberisha.com`), `/studio` returns `404`.

If you want the subdomain spelled `studi.elonberisha.com`, set `STUDIO_HOST=studi.elonberisha.com` in Vercel and point that DNS record to the same Vercel project.

Keep `SANITY_API_WRITE_TOKEN` local for scripts only. If that token has ever been shared in terminal output, chat context, screenshots, or logs, rotate it in Sanity and replace it in `.env.local`.

Use least-privilege Sanity tokens:

- Runtime portfolio pages should use public/read-only content.
- Write tokens should only be used for local scripts such as seeding or CMS maintenance.
- Never add write tokens as `NEXT_PUBLIC_*` variables.

---

## Struktura e skedarëve

```
elon-portfolio/
├── app/
│   ├── page.tsx          ← faqja kryesore (server component, fetch Sanity)
│   ├── resume/page.tsx   ← CV A4 (print to PDF)
│   ├── studio/           ← Sanity Studio (/studio)
│   ├── robots.ts         ← SEO robots.txt
│   └── sitemap.ts        ← SEO sitemap.xml
├── components/
│   ├── Nav.tsx           ← navigimi (sticky, glassmorphism)
│   ├── Hero.tsx          ← hero section me animacione
│   ├── About.tsx         ← rreth meje
│   ├── Stack.tsx         ← stack teknologjik
│   ├── Projects.tsx      ← projektet (hover animations)
│   ├── Certifications.tsx ← certifikatat (filter + animations)
│   ├── Contact.tsx       ← kontakt
│   ├── Footer.tsx        ← footer me orë live
│   ├── SocialPills.tsx   ← butonat e rrjeteve sociale
│   └── AnimateIn.tsx     ← komponent i riusable për scroll animations
├── lib/
│   ├── sanity.ts         ← Sanity client + urlFor()
│   └── queries.ts        ← të gjithë GROQ queries
└── sanity/
    └── schema/           ← 5 schema: settings, project, certification, stackGroup, socialLink
```

## Teknologjitë

| Teknologji | Versioni | Pse |
|-----------|---------|-----|
| Next.js | 15 | App Router, SSR, ISR, SEO |
| React | 19 | Latest |
| Tailwind CSS | 4 | Design tokens në CSS, zero config |
| Framer Motion | 11 | Animations GPU-accelerated (opacity + transform only) |
| Sanity | 3 | Headless CMS, dashboard online |
| next-sanity | 9 | Integrim perfekt me Next.js 15 |

## Çmimi

- **Vercel hosting**: Falas (hobby plan)
- **Sanity CMS**: Falas (free tier: 10k/month requests, 5GB bandwidth)
- **Sanity Studio**: Te /studio route (embedded, nuk duhet host i veçantë)
