# Portfolio Project Drafts

Draft-only notes for portfolio CMS entries. Do not upload these until the wording is approved.

## EU Guide KS

**Portfolio name:** EU Guide KS

**Domain:** https://www.euguide-ks.info

**Repo:** https://github.com/elonberisha/AAB-HACKATHON-1

**Positioning:** Civic AI information platform for Kosovo's EU integration process.

**Short description:**
EU Guide KS is a civic AI platform for Kosovo's EU integration process, combining a multilingual public website, Supabase CMS/admin tools, RAG chat, document ingestion, and a Vapi voice assistant over official EU and Kosovo materials.

**Medium description:**
EU Guide KS helps citizens understand Kosovo's European integration process, institutional reforms, rule of law, anti-corruption topics, core legal materials, objectives, FAQs, and source-backed public information. The project combines a Next.js public frontend with a Supabase-powered admin/CMS and a separate AI backend using GPT-4o, OpenAI embeddings, PostgreSQL/pgvector similarity search, SSE streaming chat, PDF/DOCX ingestion, saved chat/voice sessions, and Vapi voice-agent integration.

**Long description:**
EU Guide KS is a full-stack civic platform built around Kosovo's EU integration journey. The public site presents multilingual content in Albanian, English, and Serbian, with sections for reforms, rule of law, corruption, EU integration, objectives, infographics, FAQs, Kosovo context, legal standards, privacy, accessibility, and source methodology. Behind it, the admin panel manages pages, articles, FAQ items, infographics, EU objectives, documents, media, users, and global content through Supabase.

The AI backend adds a document-grounded assistant. Admins can upload PDFs, DOCX files, and text documents, which are stored, extracted, chunked, embedded with OpenAI `text-embedding-3-small`, and indexed in Supabase PostgreSQL with pgvector. Chat requests stream answers over SSE, search local RAG context first, preserve session history, and can fall back to trusted web-search sources when local documents do not contain enough context. The same session model connects chat and Vapi voice so a user can continue the conversation across text and voice.

**Role / work to highlight:**
- Built a multilingual civic information frontend for Kosovo/EU integration topics.
- Implemented Supabase-backed CMS/admin modules for pages, articles, FAQ, infographics, EU objectives, media, users, and AI documents.
- Built a separate AI backend with streaming chat, RAG retrieval, document ingestion, embeddings, pgvector search, session persistence, and voice-agent support.
- Designed the assistant around safer civic/legal answers: topic boundaries, source cues, official document preference, and legal-advice caution.

**Core features:**
- Multilingual public site: Albanian, English, Serbian.
- Topic pages for reforms, rule of law, anti-corruption, EU integration, objectives, infographics, FAQ, and Kosovo context.
- Supabase admin panel with role-checked editor/admin access.
- CMS collections for public content, charts, objectives, FAQ, legal/source standards, and media.
- AI document upload for PDF, DOCX, and text files.
- RAG pipeline with chunking, embeddings, pgvector search, and source-aware prompts.
- SSE streaming chat with session continuity.
- Vapi voice assistant integration.
- Trusted-source fallback for EU/Kosovo public information.

**Suggested CMS fields:**
- `title`: EU Guide KS
- `url`: https://www.euguide-ks.info
- `year`: 2026
- `tech`: NEXT.JS - RAG - SUPABASE
- `categories`: AI Products, Civic / Public Info, Education, Full Stack, CMS
- `featured`: true

**Suggested one-line card copy:**
Civic AI platform for Kosovo's EU integration, with multilingual content, Supabase CMS, RAG chat, document ingestion, and voice assistant support.

**Suggested longer portfolio copy:**
A public civic-tech platform for Kosovo's EU integration process. I built it as a full-stack system with a multilingual Next.js frontend, Supabase CMS/admin tools, document ingestion, pgvector RAG search, GPT-4o streaming chat, session persistence, and Vapi voice support. The assistant is designed to stay within Kosovo/EU public information topics and prefer official sources instead of giving unsupported legal claims.

**Source files checked:**
- `C:\Projects\repo-audit\AAB-HACKATHON-1\README.md`
- `C:\Projects\repo-audit\AAB-HACKATHON-1\front\src\components\EUGuideApp.jsx`
- `C:\Projects\repo-audit\AAB-HACKATHON-1\front\src\app\admin\page.tsx`
- `C:\Projects\repo-audit\AAB-HACKATHON-1\front\src\middleware.ts`
- `C:\Projects\repo-audit\AAB-HACKATHON-1\back\README.md`
- `C:\Projects\repo-audit\AAB-HACKATHON-1\back\src\app\api\chat\route.ts`
- `C:\Projects\repo-audit\AAB-HACKATHON-1\back\src\app\api\ingest\route.ts`
- `C:\Projects\repo-audit\AAB-HACKATHON-1\back\src\app\api\vapi\route.ts`
- `C:\Projects\repo-audit\AAB-HACKATHON-1\back\src\lib\rag.ts`
- `C:\Projects\repo-audit\AAB-HACKATHON-1\back\src\lib\prompt.ts`
- `C:\Projects\repo-audit\AAB-HACKATHON-1\back\supabase.sql`

## SchedyCore

**Portfolio name:** SchedyCore

**Domain:** https://schedycore.elonberisha.com

**Repo:** https://github.com/elonberisha/schedycore

**Positioning:** Full-stack scheduling and operations system for appointment-based businesses.

**Short description:**
SchedyCore is a full-stack scheduling and business operations platform with public booking, staff/service management, customer records, inventory, reports, permissions, trusted-device login, real-time updates, and a mobile app direction.

**Medium description:**
SchedyCore is an appointment and operations system built for service businesses such as barbershops. It combines a React/Vite admin app, a public booking flow, a Node/Express API, PostgreSQL data model, JWT authentication, role/permission controls, trusted-device security, WebSocket updates, reports, inventory, purchases, product sales, feedback, and Expo mobile screens.

**Long description:**
SchedyCore is a production-style operations platform for appointment-based businesses. The frontend is a React/Vite application with protected admin routes for appointments, customers, staff, services, users, audits, reports, products, suppliers, purchases, product sales, permissions, feedback, and settings. It also includes a public `/book` flow where clients can choose a date, free slot, service, staff member, contact details, and confirm the appointment directly into the system.

The backend is a Node.js and Express API connected to PostgreSQL. It exposes authenticated modules for users, customers, staff, services, appointments, dashboard stats, cleanup, reports, products, suppliers, purchases, sales, permissions, feedback, and audits. It also exposes public booking endpoints for services, staff, available slots, Vapi context, and appointment booking. The auth layer uses JWT, bcrypt password hashing, PIN login, admin credential challenge flow, login rate limiting, token blacklist, trusted devices, and WebSocket-driven force logout/device revocation.

The project also includes performance and reliability work: gzip compression, CORS origin controls, response caching for slow-changing data, scheduled appointment cleanup, database migrations, search/performance indexes, real-time WebSocket notifications for appointment/dashboard updates, PWA support, offline assets, install prompts, online status handling, and a separate Expo mobile implementation.

**Role / work to highlight:**
- Built a full-stack scheduling platform with admin workflows and public booking.
- Implemented secure login patterns: JWT, PIN login, admin credential challenge, trusted devices, token blacklist, and login rate limiting.
- Built PostgreSQL-backed modules for appointments, customers, staff, services, users, products, suppliers, purchases, product sales, reports, permissions, feedback, and audits.
- Added operational polish: WebSocket updates, PWA support, online/offline handling, exports, cleanup scheduler, and database indexes.
- Explored mobile app coverage with Expo/React Native screens for the same operations domain.

**Core features:**
- Public booking page for clients.
- Available slot lookup by date and staff member.
- Service and staff selection.
- Voice booking button through Vapi web integration.
- Appointment calendar and appointment status management.
- Customer records and customer detail views.
- Staff, services, users, and permission management.
- Dashboard stats and activity.
- Reports by date range, staff, service, day, hour, top customers, and CSV export.
- Product inventory, low-stock checks, stock adjustments, categories, and inventory reports.
- Suppliers, purchases, product sales, VAT/subtotals, and CSV export.
- Feedback collection and admin review.
- Audits/activity logging.
- JWT auth with PIN login and admin-only protected modules.
- Trusted devices and forced logout through WebSocket events.
- PWA install prompt, offline page/service worker, online status UI.
- Expo mobile app screens for appointments, dashboard, customers, products, purchases, reports, staff, settings, permissions, and more.

**Suggested CMS fields:**
- `title`: SchedyCore
- `url`: https://schedycore.elonberisha.com
- `year`: 2026
- `tech`: REACT - NODE - POSTGRES
- `categories`: Full Stack, SaaS, Scheduling, PWA, Business Tools
- `featured`: true

**Suggested one-line card copy:**
Full-stack scheduling and operations platform with public booking, admin workflows, PostgreSQL APIs, trusted-device auth, real-time updates, and PWA/mobile support.

**Suggested longer portfolio copy:**
A full-stack booking and operations system for service businesses. I built the React/Vite admin app, public booking flow, Node/Express API, PostgreSQL modules, reports, inventory and sales features, WebSocket updates, PWA behavior, and a stronger authentication model with JWT, PIN login, admin challenge flow, trusted devices, token blacklist, and rate limiting.

**Source files checked:**
- `C:\Projects\repo-audit\schedycore\README.md`
- `C:\Projects\repo-audit\schedycore\frontend\src\App.jsx`
- `C:\Projects\repo-audit\schedycore\frontend\src\pages\BookingPage.jsx`
- `C:\Projects\repo-audit\schedycore\frontend\src\utils\api.js`
- `C:\Projects\repo-audit\schedycore\backend-node\server.js`
- `C:\Projects\repo-audit\schedycore\backend-node\routes\auth.js`
- `C:\Projects\repo-audit\schedycore\backend-node\routes\public.js`
- `C:\Projects\repo-audit\schedycore\backend-node\services\websocket.js`
- `C:\Projects\repo-audit\schedycore\backend-node\database\migrations\017_performance_final.sql`
- `C:\Projects\repo-audit\schedycore\mobile\package.json`

## Employy

**Replacement note:** Replace/delete the old `Tenda Enisi` / `tendaenisi.in` portfolio entry with this project.

**Portfolio name:** Employy

**Domain:** https://employee.elonberisha.com

**Repo:** https://github.com/elonberisha/Employy

**Positioning:** Mobile-first employee, sector, work-hours, and payroll reporting system.

**Short description:**
Employy is a PHP/MySQL employee management PWA for tracking sectors, workers, daily work hours, hourly rates, payroll totals, reports, users, approvals, and audit logs from a mobile-friendly admin interface.

**Medium description:**
Employy is a business operations app for managing employees by sector and recording daily work hours. It includes login/signup, pending user approval, admin-only user management, employee CRUD, sector management, bulk work-hour entry, reports by employee or sector, payroll calculations from hourly rates, PDF/print-friendly reports, bilingual Albanian/Italian UI, PWA install support, CSRF protection, secure session cookies, and audit logging.

**Long description:**
Employy is a lightweight operations system built for businesses that need a fast way to manage employees, sectors, and work-hour reporting from phone or desktop. The app is built with PHP, MySQL, vanilla JavaScript, HTML/CSS, and PWA assets, making it simple to deploy on shared hosting while still behaving like an installable mobile app.

The main workflow lets admins create sectors, add employees with hourly rates, select a date and sector, enter work hours in bulk, and generate reports for payroll or internal tracking. Reports can be filtered by date range, sector, or individual employee, and calculate total hours, total pay, days worked, notes, and grand totals. The app also includes dashboard metrics for employees, sectors, monthly hours, monthly pay, today's hours, and recent activity.

The admin side includes user signup approval, admin/user roles, admin-only user management, audit logs, and secured routes. The app uses PHP sessions with secure cookie settings, CSRF tokens on POST requests, password hashing, session regeneration, security headers, no-cache handling for dynamic pages, and audit logs for important actions such as login, signup, employee changes, sector changes, work-hour updates, approvals, and deletes.

**Role / work to highlight:**
- Built a deployable PHP/MySQL business app for employee and work-hour management.
- Designed the mobile-first dashboard, sidebar, bottom navigation, modals, toasts, install banner, and PWA behavior.
- Implemented sector and employee CRUD with hourly-rate tracking.
- Built bulk daily work-hour entry with sector filtering and editable history.
- Built payroll-style reports by employee and by sector with hours, pay totals, notes, date filters, print/PDF-friendly output, and grand totals.
- Added admin approval, roles, audit logs, CSRF protection, secure sessions, security headers, and basic rate limiting.
- Added bilingual UI support for Albanian and Italian.

**Core features:**
- Login and signup flow with pending approval.
- Admin/user role handling.
- Admin-only users page and audit log page.
- Sector management with employee counts.
- Employee management with sector, phone, and hourly rate.
- Work-hour entry by date and sector.
- Bulk save of multiple employees' hours.
- Edit/delete work-hour records.
- Dashboard stats: employee count, sector count, monthly hours, monthly pay, today hours, recent activity.
- Reports: summary, individual employee, sector report, totals, notes, printable/PDF-friendly views.
- Albanian/Italian translation layer.
- PWA manifest, service worker, install prompt, mobile bottom navigation.
- CSRF token handling for POST actions.
- Secure session cookie settings in production.
- Security headers and dynamic page no-cache headers.
- Audit logs for operational changes.

**Suggested CMS fields:**
- `title`: Employy
- `url`: https://employee.elonberisha.com
- `year`: 2026
- `tech`: PHP - MYSQL - PWA
- `categories`: Business Tools, Full Stack, PWA, Dashboard, Payroll
- `featured`: true

**Suggested one-line card copy:**
Mobile-first employee management PWA for sectors, workers, daily work hours, payroll totals, reports, admin approvals, and audit logs.

**Suggested longer portfolio copy:**
A PHP/MySQL employee operations app built for fast mobile use. I built the sector and employee management, daily work-hour entry, hourly-rate payroll calculations, date/sector/employee reports, dashboard metrics, bilingual Albanian/Italian interface, PWA install flow, admin approvals, audit logs, CSRF protection, secure sessions, and deployable shared-hosting structure.

**Source files checked:**
- `C:\Projects\repo-audit\Employy\README.md`
- `C:\Projects\repo-audit\Employy\public_html\index.php`
- `C:\Projects\repo-audit\Employy\public_html\bootstrap.php`
- `C:\Projects\repo-audit\Employy\public_html\manifest.json`
- `C:\Projects\repo-audit\Employy\public_html\assets\js\app.js`
- `C:\Projects\repo-audit\Employy\public_html\assets\js\i18n.js`
- `C:\Projects\repo-audit\Employy\public_html\api\auth.php`
- `C:\Projects\repo-audit\Employy\public_html\api\employees.php`
- `C:\Projects\repo-audit\Employy\public_html\api\work-hours.php`
- `C:\Projects\repo-audit\Employy\public_html\api\reports.php`
- `C:\Projects\repo-audit\Employy\employy-app\pages\dashboard.php`
- `C:\Projects\repo-audit\Employy\employy-app\pages\reports.php`
- `C:\Projects\repo-audit\Employy\employy-app\setup.php`

## Duraku Beschichtung

**Portfolio name:** Duraku Beschichtung

**Domain:** https://durakubeschichtung.de

**Repo:** https://github.com/elonberisha/Duraku

**Positioning:** German/Albanian business website with CMS-style admin tooling for industrial coating services.

**Short description:**
Duraku Beschichtung is a bilingual business website for industrial floor coating and building protection, with SEO, structured data, dynamic services/gallery/about/hero content, PHP APIs, admin subdomain management, uploads, contact email, 2FA, and password reset.

**Medium description:**
Duraku Beschichtung is a professional company website for a German industrial flooring and coating business. It combines a static HTML/CSS/JavaScript frontend with PHP JSON-storage APIs for gallery, services, hero, about, categories, contact information, and uploads. The site includes German/Albanian translations, SEO metadata, sitemap, robots.txt, LocalBusiness JSON-LD, cookie-consent controlled Google Tag Manager, contact forms through PHPMailer SMTP, and an admin panel designed for `admin.durakubeschichtung.de`.

**Long description:**
Duraku Beschichtung is a client business website for construction protection, industrial floors, epoxy/polyurethane coating, parking garage coating, and related surface work in Germany. The public frontend is built with plain HTML, CSS, and JavaScript, with pages for home, about, services, gallery, contact, privacy, and impressum. The interface supports German and Albanian content through an i18n layer and loads gallery, service, hero, about, and contact content dynamically from PHP APIs.

The backend/admin layer uses PHP APIs with JSON-based storage instead of a full database, keeping deployment simple for shared hosting. Admins can manage gallery items, before/after images, categories, hero imagery, about content, contact information, services, and uploads. Contact messages are sent through SMTP using PHPMailer. The site also includes production SEO basics: canonical URLs, hreflang entries, Open Graph/Twitter cards, LocalBusiness structured data, sitemap.xml, robots.txt, favicon set, and cookie-consent handling before analytics scripts load.

Security and operations were also considered. The admin panel is designed to run behind `admin.durakubeschichtung.de`, with CORS configured for the admin subdomain, credentialed requests, secure PHP sessions, strict session settings, input sanitization, rate limiting, two-factor authentication by email code, password reset, and documented `.htaccess`/subdomain deployment rules.

**Role / work to highlight:**
- Built a bilingual German/Albanian business website for an industrial coating company.
- Implemented dynamic content APIs for gallery, categories, services, hero, about, and contact data without requiring a heavy CMS.
- Built an admin panel for managing content, images, categories, contact information, 2FA, password reset, and uploads.
- Added SEO foundations: metadata, canonical URL, hreflang, sitemap, robots.txt, LocalBusiness JSON-LD, Open Graph, Twitter cards, and favicon manifest.
- Added contact form delivery through PHPMailer SMTP.
- Designed admin deployment through a protected admin subdomain with CORS and session handling.

**Core features:**
- Responsive public website for industrial floor/coating services.
- German and Albanian language support.
- Home, about, services, gallery, contact, impressum, and privacy pages.
- Dynamic gallery with categories and before/after images.
- Dynamic services, hero, about, and contact content.
- Contact form with sanitized inputs and SMTP email delivery.
- Admin dashboard for gallery/content management.
- Image upload handling.
- Admin authentication with secure sessions.
- Optional 2FA by email verification code.
- Password reset flow.
- CORS support for admin subdomain.
- Cookie banner and consent-gated analytics.
- SEO metadata, LocalBusiness schema, sitemap, robots.txt, and hreflang.
- Deployment documentation for `admin.durakubeschichtung.de`.

**Suggested CMS fields:**
- `title`: Duraku Beschichtung
- `url`: https://durakubeschichtung.de
- `year`: 2026
- `tech`: PHP - CUSTOM JS - SEO
- `categories`: Business Website, CMS, SEO, Full Stack, Frontend
- `featured`: true

**Suggested one-line card copy:**
Bilingual German/Albanian business website with dynamic gallery/services content, PHP admin APIs, uploads, SMTP contact form, SEO schema, 2FA, and admin subdomain setup.

**Suggested longer portfolio copy:**
A professional business website for an industrial coating company in Germany. I built the bilingual frontend, dynamic gallery/services/about/hero/contact APIs, admin content tools, upload handling, SMTP contact form, cookie-consent analytics setup, SEO metadata, LocalBusiness schema, sitemap, robots.txt, 2FA/password reset flows, and admin subdomain deployment structure.

**Source files checked:**
- `C:\Projects\repo-audit\Duraku\index.html`
- `C:\Projects\repo-audit\Duraku\about.html`
- `C:\Projects\repo-audit\Duraku\services.html`
- `C:\Projects\repo-audit\Duraku\gallery.html`
- `C:\Projects\repo-audit\Duraku\contact.html`
- `C:\Projects\repo-audit\Duraku\i18n.js`
- `C:\Projects\repo-audit\Duraku\gallery-api.js`
- `C:\Projects\repo-audit\Duraku\services-api.js`
- `C:\Projects\repo-audit\Duraku\admin\admin.js`
- `C:\Projects\repo-audit\Duraku\api\auth.php`
- `C:\Projects\repo-audit\Duraku\api\gallery.php`
- `C:\Projects\repo-audit\Duraku\api\contact.php`
- `C:\Projects\repo-audit\Duraku\api\upload.php`
- `C:\Projects\repo-audit\Duraku\api\twofactor.php`
- `C:\Projects\repo-audit\Duraku\api\forget_password.php`
- `C:\Projects\repo-audit\Duraku\config\security.php`
- `C:\Projects\repo-audit\Duraku\composer.json`
- `C:\Projects\repo-audit\Duraku\ADMIN_SUBDOMAIN_SETUP.md`

## EduFlow

**Portfolio name:** EduFlow

**Domain:** Not deployed. School project / Android prototype.

**Repo:** https://github.com/elonberisha/eduflowapp

**Positioning:** Kotlin Android school-management app prototype for students and professors.

**Short description:**
EduFlow is a Kotlin Android school-management prototype built with Jetpack Compose and Room, with role-based student/professor dashboards, classes, courses, exams, grades, invoices, notifications, local demo data, and biometric login support.

**Medium description:**
EduFlow is an Android school-management app created as a school project and not deployed publicly. It uses Kotlin, Jetpack Compose, Material 3, Room/SQLite, Navigation Compose, ViewModels, and biometric authentication. The app separates student and professor experiences: students can view schedules, classes, grades, exams, notifications, invoices, and profile data, while professors can view assigned classes, students, exams, profiles, and add grades for students.

**Long description:**
EduFlow is a native Android prototype for managing school workflows between students and professors. The app is built in Kotlin with Jetpack Compose and Material 3, using a local Room database instead of a remote backend. It models a school domain with users, students, professors, courses, classes, class-student relationships, class-professor relationships, exams, grades, student invoices, and notifications.

The login flow supports student and professor accounts and routes each user to the correct dashboard. Student screens include a home overview, lecture/exam schedule, enrolled classes, grade views split between evaluations and exams, profile details, notification badges, and biometric login settings. Professor screens include dashboard summaries, schedules, class lists, student lists per class, grade management with grade type, percentage, feedback, and profile/security settings.

Because this was a school project, the app was never deployed publicly. The technical value is in the Android architecture: Compose UI, Navigation Compose, ViewModel state, Room DAOs/entities, demo data initialization, local persistence, bottom-tab navigation, student/professor role separation, and biometric authentication integration.

**Role / work to highlight:**
- Built a native Android school-management prototype in Kotlin.
- Modeled a complete local school database with Room entities and DAOs.
- Implemented role-based navigation for students and professors.
- Built student views for schedules, classes, exams, grades, invoices, notifications, and profile/security.
- Built professor views for assigned classes, student lists, schedules, grades, feedback, and profile/security.
- Added biometric login support using AndroidX Biometric and saved local preferences.
- Seeded demo data for students, professors, courses, classes, invoices, exams, grades, and notifications.

**Core features:**
- Kotlin Android app with Jetpack Compose and Material 3.
- Room/SQLite local database.
- Entities for users, students, professors, courses, classes, class-student links, class-professor links, invoices, notifications, exams, and grades.
- Role-based login for student and professor accounts.
- Navigation Compose routes for login, student dashboard, professor dashboard, and notifications.
- Student dashboard with tabs for home, schedule, classes, grades, and profile.
- Professor dashboard with tabs for home, schedule, classes, grades, and profile.
- Grade creation flow for professors with class, student, grade type, score, percentage, and feedback.
- Notification screens for student and professor contexts.
- Biometric login toggle and authentication flow.
- Demo data initializer for local testing.

**Suggested CMS fields:**
- `title`: EduFlow
- `url`: 
- `year`: 2026
- `tech`: KOTLIN - COMPOSE - ROOM
- `categories`: Mobile App, Education, School Management, Kotlin, Prototype
- `featured`: false

**Suggested one-line card copy:**
Kotlin Android school-management prototype with student/professor dashboards, Room database, classes, schedules, grades, invoices, notifications, and biometric login.

**Suggested longer portfolio copy:**
A school-management Android prototype built as a school project. I built it in Kotlin with Jetpack Compose, Material 3, Navigation Compose, ViewModels, Room/SQLite, local demo seeding, role-based student/professor dashboards, schedules, classes, exams, grades, invoices, notifications, and biometric login support. It was not deployed publicly, but it shows my native Android and local-data architecture work.

**Source files checked:**
- `C:\Projects\repo-audit\eduflowapp\README.md`
- `C:\Projects\repo-audit\eduflowapp\build.gradle.kts`
- `C:\Projects\repo-audit\eduflowapp\app\build.gradle.kts`
- `C:\Projects\repo-audit\eduflowapp\app\src\main\AndroidManifest.xml`
- `C:\Projects\repo-audit\eduflowapp\app\src\main\java\com\example\eduflow\navigation\Navigation.kt`
- `C:\Projects\repo-audit\eduflowapp\app\src\main\java\com\example\eduflow\data\database\EduFlowDatabase.kt`
- `C:\Projects\repo-audit\eduflowapp\app\src\main\java\com\example\eduflow\data\database\DemoData.kt`
- `C:\Projects\repo-audit\eduflowapp\app\src\main\java\com\example\eduflow\ui\screens\LoginScreen.kt`
- `C:\Projects\repo-audit\eduflowapp\app\src\main\java\com\example\eduflow\ui\screens\StudentDashboard.kt`
- `C:\Projects\repo-audit\eduflowapp\app\src\main\java\com\example\eduflow\ui\screens\ProfessorDashboard.kt`
- `C:\Projects\repo-audit\eduflowapp\app\src\main\java\com\example\eduflow\BiometricHelper.kt`
- `C:\Projects\repo-audit\eduflowapp\app\src\main\java\com\example\eduflow\PreferencesHelper.kt`

## Morina Baustoffe

**Portfolio name:** Morina Baustoffe

**Domain:** https://morinabaustoffe.com

**Repo:** https://github.com/elonberisha/MorinaBaustoffe

**Positioning:** Multilingual business website and lightweight CMS for a construction-materials company.

**Short description:**
Morina Baustoffe is a multilingual construction-materials business website with product catalogs, client/partner sections, GSAP animations, admin-managed JSON content, secure admin login, and SMTP contact delivery.

**Medium description:**
Morina Baustoffe is a German/Albanian/English business website for a construction-materials company in Neuburg an der Donau. The site presents services, product catalogs, clients, partners, contact information, and animated landing sections, while the admin area manages catalogs, gallery/media-style content, clients, partners, contact messages, uploads, and email configuration through PHP and JSON-backed storage.

**Long description:**
Morina Baustoffe is a practical business website built for a construction-materials company serving Neuburg an der Donau and nearby areas. The public site uses PHP, custom CSS/JavaScript, local fonts/icons, GSAP/ScrollTrigger animation, multilingual content, product catalog previews, clients, partners, service sections, and a contact form.

The admin side is intentionally lightweight for shared hosting: content is stored in JSON files and managed through PHP admin pages for catalogs, clients, partners, gallery/uploads, dashboard views, and messages. The contact flow uses PHPMailer/SMTP, while security work includes password hashing, CSRF protection, login rate limiting, timing-safe comparison, input sanitization, secure admin helpers, security logs, and optional two-factor email verification.

**Role / work to highlight:**
- Built a multilingual business website for a construction-materials company.
- Implemented product catalog, clients, partners, service, and contact sections.
- Built a PHP admin system for catalogs, uploads, clients, partners, and messages.
- Added SMTP contact delivery through PHPMailer.
- Added admin security: bcrypt password hashing, CSRF, rate limiting, input sanitization, logs, and 2FA support.
- Used local vendor assets/fonts to reduce CDN dependence.

**Core features:**
- German, Albanian, and English language support.
- Product catalog section loaded from admin-managed JSON.
- Clients and partners sections.
- GSAP/ScrollTrigger animations.
- Contact form with honeypot and SMTP email delivery.
- Admin dashboard.
- Catalog, client, partner, gallery, and upload management.
- CSRF protection and secure admin helpers.
- Login rate limiting and security logging.
- Optional email-based 2FA.
- Shared-hosting deployment documentation.

**Suggested CMS fields:**
- `title`: Morina Baustoffe
- `url`: https://morinabaustoffe.com
- `year`: 2026
- `tech`: PHP - GSAP - PHPMailer
- `categories`: Business Website, CMS, SEO, Full Stack, Frontend
- `featured`: true

**Suggested one-line card copy:**
Multilingual construction-materials website with product catalogs, admin-managed content, GSAP animations, SMTP contact forms, and hardened PHP admin workflows.

**Suggested longer portfolio copy:**
A multilingual business website for a construction-materials company in Germany. I built the public frontend, animated service/catalog sections, clients and partners areas, PHP admin tools for catalogs/uploads/content, SMTP contact delivery, and security measures including CSRF, rate limiting, password hashing, input sanitization, logging, and 2FA support.

**Source files checked:**
- `C:\Projects\repo-audit\MorinaBaustoffe\index.php`
- `C:\Projects\repo-audit\MorinaBaustoffe\products.php`
- `C:\Projects\repo-audit\MorinaBaustoffe\contact_submit.php`
- `C:\Projects\repo-audit\MorinaBaustoffe\composer.json`
- `C:\Projects\repo-audit\MorinaBaustoffe\SECURITY.md`
- `C:\Projects\repo-audit\MorinaBaustoffe\SHARED_HOSTING_SETUP.md`
- `C:\Projects\repo-audit\MorinaBaustoffe\admin\dashboard.php`
- `C:\Projects\repo-audit\MorinaBaustoffe\admin\catalogs.php`
- `C:\Projects\repo-audit\MorinaBaustoffe\admin\clients.php`
- `C:\Projects\repo-audit\MorinaBaustoffe\admin\partners.php`
- `C:\Projects\repo-audit\MorinaBaustoffe\admin\security_helpers.php`
- `C:\Projects\repo-audit\MorinaBaustoffe\i18n\de.js`
- `C:\Projects\repo-audit\MorinaBaustoffe\i18n\en.js`
- `C:\Projects\repo-audit\MorinaBaustoffe\i18n\sq.js`

## BTS Course Management

**Portfolio name:** BTS Course Management

**Domain:** https://britishlschool.online

**Repo:** https://github.com/elonberisha/bts

**Positioning:** Secure PHP/MySQL management system for courses, students, professors, invoices, payments, and salaries.

**Short description:**
BTS is a PHP/MySQL course-management system with student/professor/class CRUD, invoices, payments, professor salaries, settings, permissions, email 2FA, PIN-gated critical actions, CSRF protection, and audit logs.

**Medium description:**
BTS is a production-oriented course-management dashboard for a physics/course business. It manages courses, classes, students, professors, class assignments, student invoices, payments, professor salary statements, settings, permission access, and audit trails. The system is built with PHP, PDO/MySQL, vanilla JavaScript, custom CSS, Lucide icons, SMTP email, CSRF protection, 2FA login, password reset, rate limiting, account locking, and PIN verification for sensitive actions.

**Long description:**
BTS is a full-stack PHP management system for course operations. The database model covers admins, settings, activity logs, login attempts, password reset tokens, permission tokens, PIN permissions, courses, students, professors, classes, class-professor links, class-student links, class payment plans, student invoices, and salary statements. This makes it more than a simple admin panel: it handles academic, operational, and financial workflows in one place.

The app includes a login/signup flow, email 2FA, password recovery, protected dashboard pages, API endpoints for authentication, registrations, management, payments, salaries, settings, permissions, uploads, class details, CSRF, and user identity checks. Security is built into the workflow with prepared statements, CSRF protection, secure sessions, login rate limiting, account locking, audit logs, and PIN verification for critical management/payment/salary actions.

**Role / work to highlight:**
- Built a PHP/MySQL dashboard for course operations.
- Modeled academic and financial tables for courses, classes, students, professors, invoices, salaries, and settings.
- Implemented API endpoints for auth, management, payments, salaries, settings, permissions, uploads, and class details.
- Added email-based 2FA, password reset, login rate limiting, account lockout, CSRF protection, audit logs, and PIN-protected critical actions.
- Added deployment and production-readiness documentation/scripts.

**Core features:**
- Course, class, student, and professor management.
- Class-student and class-professor relationships.
- Student invoices and payment management.
- Professor salary statement management.
- Settings and permission management.
- PIN verification for sensitive operations.
- Email 2FA login and password reset.
- Signup/approval flow.
- CSRF protection and prepared SQL statements.
- Activity logs and PIN audit logs.
- Login attempt tracking and account locking.
- Deployment readiness checks and schema documentation.
- Cypress dev dependency for testing direction.

**Suggested CMS fields:**
- `title`: BTS Course Management
- `url`: https://britishlschool.online
- `year`: 2026
- `tech`: PHP - MYSQL - 2FA
- `categories`: Education, Course Management, Full Stack, Dashboard, Payments
- `featured`: true

**Suggested one-line card copy:**
Secure course-management dashboard for students, professors, classes, invoices, payments, salaries, permissions, email 2FA, PIN approvals, and audit logs.

**Suggested longer portfolio copy:**
A PHP/MySQL management system for course operations. I built modules for courses, classes, students, professors, invoices, payments, salary statements, settings, permission flows, and admin APIs, with stronger operational security through email 2FA, password reset, login rate limiting, account locking, CSRF protection, prepared statements, PIN-gated critical actions, and audit logs.

**Source files checked:**
- `C:\Projects\repo-audit\bts\README.md`
- `C:\Projects\repo-audit\bts\public\index.php`
- `C:\Projects\repo-audit\bts\database\SCHEMA_INFO.md`
- `C:\Projects\repo-audit\bts\database\schema_complete.sql`
- `C:\Projects\repo-audit\bts\includes\auth.php`
- `C:\Projects\repo-audit\bts\includes\permissions.php`
- `C:\Projects\repo-audit\bts\includes\csrf.php`
- `C:\Projects\repo-audit\bts\public\api\auth.php`
- `C:\Projects\repo-audit\bts\public\api\management.php`
- `C:\Projects\repo-audit\bts\public\api\payments.php`
- `C:\Projects\repo-audit\bts\public\api\salaries.php`
- `C:\Projects\repo-audit\bts\public\api\permissions.php`

## AB Bau Fliesen

**Portfolio name:** AB Bau Fliesen

**Domain:** https://ab-bau-fliesen.de

**Repo:** https://github.com/elonberisha/ab-bau

**Positioning:** German construction/tile-installation company website with CMS, SEO, legal pages, reviews, catalogs, and admin tooling.

**Short description:**
AB Bau Fliesen is a German business website for construction and tile-installation services, with SEO, LocalBusiness schema, legal pages, dynamic admin-managed content, catalogs, gallery, reviews, partners, contact forms, and PHP/MySQL CMS tooling.

**Medium description:**
AB Bau Fliesen is a responsive company website for construction and tile work in Petershausen near Munich. It combines static public pages with PHP/MySQL admin tools for hero content, about, services, projects, gallery, catalogs, reviews, partners, media, contact details, legal pages, and users. The frontend includes Tailwind CSS, JavaScript, SEO metadata, LocalBusiness JSON-LD, Open Graph/Twitter cards, sitemap-style deployment thinking, German/Albanian language support, AOS animation, and API-powered dynamic content.

**Long description:**
AB Bau Fliesen is a full business website and CMS-style admin system for a German construction/tile company. Public pages cover home, about, services, portfolio, catalogs, catalog detail, contact, impressum, privacy policy, and terms. The homepage uses production SEO basics such as canonical URLs, Open Graph/Twitter metadata, LocalBusiness structured data, performance-oriented asset preloading, and localized German business content.

The admin panel manages the content behind the site: hero, about, services, projects, gallery, catalogs, reviews, partners, media library, contact details, legal pages, users, and password changes. APIs handle dynamic public data, contact submission, and review submission. The stack is intentionally deployable on classic hosting: HTML/CSS/JS frontend, Tailwind build process, PHP backend, MySQL database, and Apache/mod_rewrite setup.

**Role / work to highlight:**
- Built a German business website for tile and construction services.
- Added SEO fundamentals: metadata, structured data, social cards, canonical URLs, and local-business positioning.
- Built PHP/MySQL admin tooling for content, media, catalogs, projects, reviews, partners, legal pages, and users.
- Implemented public APIs for dynamic data, contact submissions, and reviews.
- Created deployment-friendly structure for shared hosting/Apache.

**Core features:**
- Home, about, services, portfolio, catalogs, contact, impressum, privacy, and terms pages.
- Tailwind-powered frontend styling.
- Dynamic data loading through PHP APIs.
- Admin dashboard and sidebar.
- Hero, about, services, projects, gallery, catalogs, reviews, partners, media, contact, legal, and user management.
- Contact form submission API.
- Review submission API.
- LocalBusiness JSON-LD.
- German business SEO copy and metadata.
- DE/SQ language switcher direction.
- Shared-hosting deployment docs and setup scripts.

**Suggested CMS fields:**
- `title`: AB Bau Fliesen
- `url`: https://ab-bau-fliesen.de
- `year`: 2026
- `tech`: PHP - MYSQL - TAILWIND
- `categories`: Business Website, CMS, SEO, Full Stack, Frontend
- `featured`: true

**Suggested one-line card copy:**
German construction/tile business website with SEO schema, legal pages, dynamic PHP APIs, MySQL CMS admin, catalogs, gallery, reviews, partners, and contact flow.

**Suggested longer portfolio copy:**
A production-style business website for a German tile and construction company. I built the responsive public pages, SEO metadata and LocalBusiness schema, dynamic API-powered content, contact/review flows, Tailwind styling, and PHP/MySQL admin tools for services, projects, catalogs, gallery, reviews, partners, media, legal pages, contact info, and users.

**Source files checked:**
- `C:\Projects\repo-audit\ab-bau\README.md`
- `C:\Projects\repo-audit\ab-bau\package.json`
- `C:\Projects\repo-audit\ab-bau\index.html`
- `C:\Projects\repo-audit\ab-bau\about.html`
- `C:\Projects\repo-audit\ab-bau\services.html`
- `C:\Projects\repo-audit\ab-bau\portfolio.html`
- `C:\Projects\repo-audit\ab-bau\catalogs.html`
- `C:\Projects\repo-audit\ab-bau\contact.html`
- `C:\Projects\repo-audit\ab-bau\api\get-data.php`
- `C:\Projects\repo-audit\ab-bau\api\submit-contact.php`
- `C:\Projects\repo-audit\ab-bau\api\submit-review.php`
- `C:\Projects\repo-audit\ab-bau\admin\dashboard.php`
- `C:\Projects\repo-audit\ab-bau\admin\services.php`
- `C:\Projects\repo-audit\ab-bau\admin\catalogs.php`
- `C:\Projects\repo-audit\ab-bau\admin\media-library.php`

## DevyCore

**Portfolio name:** DevyCore

**Domain:** https://devycore.com

**Repo:** https://github.com/elonberisha/Devycore

**Positioning:** Software studio website with animated frontend, admin-managed projects, contact/discount flows, and custom Express backend.

**Short description:**
DevyCore is a software-studio website built with Vite, GSAP, Lenis, Three.js, and Express, with dynamic project management, admin CRUD, image uploads, contact/discount email endpoints, role-based admin users, CSP, and production deployment structure.

**Medium description:**
DevyCore is a custom portfolio/business website for a software studio. The frontend uses Vite, custom JavaScript, GSAP/ScrollTrigger, Lenis smooth scrolling, and a lazy Three.js WebGL background. The backend is a unified Express server serving the built site, admin panel, uploaded project images, project CRUD APIs, contact and discount form endpoints, SMTP email delivery, admin user management, role handling, bearer-token auth, password change/reset, and production CSP/security headers.

**Long description:**
DevyCore is a branded software-studio website built as a custom frontend rather than a template. The public side includes animated sections, dynamic badges/services/case studies/stack content, smooth scrolling, WebGL background effects, contact workflows, and a projects section loaded from the backend.

The backend is an Express server that handles both static hosting and operational APIs. It manages projects from `admin/projects.json`, supports admin CRUD with image uploads through Multer, sends contact and discount inquiries through Nodemailer/SMTP, supports custom admin email sending, manages multi-user admin credentials with roles, creates temporary bearer tokens, allows password change/reset flows, and applies a stricter Content Security Policy in production. The admin panel is plain HTML/CSS/JS and is designed to keep the studio site editable without a third-party CMS.

**Role / work to highlight:**
- Built the DevyCore brand website frontend with animation and WebGL-style visual work.
- Built a custom Express backend for admin, projects, uploads, contact, discount, and email workflows.
- Implemented admin CRUD for projects and images.
- Added role-based admin users, bearer-token sessions, password change/reset, and production CSP.
- Connected public project rendering to admin-managed project data.

**Core features:**
- Vite-powered frontend.
- GSAP and ScrollTrigger animation.
- Lenis smooth scrolling.
- Lazy Three.js shader/particle background.
- Dynamic public projects from API.
- Admin panel for project CRUD.
- Image uploads through Multer.
- Contact form endpoint with validation and rate limiting.
- Discount client endpoint with SMTP email delivery.
- Custom admin email endpoint.
- Multi-user admin roles: super/admin.
- Bearer-token admin auth.
- Password change and reset-code flow.
- Production CSP and `.htaccess` hardening notes.

**Suggested CMS fields:**
- `title`: DevyCore
- `url`: https://devycore.com
- `year`: 2026
- `tech`: VITE - EXPRESS - THREE.JS
- `categories`: Brand Website, Software Studio, Full Stack, CMS, Frontend
- `featured`: true

**Suggested one-line card copy:**
Animated software-studio website with GSAP/Lenis/Three.js frontend, Express backend, admin-managed projects, uploads, contact/discount emails, roles, and CSP hardening.

**Suggested longer portfolio copy:**
A custom software-studio website for DevyCore. I built the animated Vite frontend, smooth-scroll and WebGL visual layer, dynamic project rendering, Express backend, project CRUD admin, image uploads, contact and discount email workflows, role-based admin users, password handling, and production security headers/CSP.

**Source files checked:**
- `C:\Projects\repo-audit\Devycore\README.md`
- `C:\Projects\repo-audit\Devycore\package.json`
- `C:\Projects\repo-audit\Devycore\server.js`
- `C:\Projects\repo-audit\Devycore\src\main.js`
- `C:\Projects\repo-audit\Devycore\src\site.css`
- `C:\Projects\repo-audit\Devycore\admin\admin.html`
- `C:\Projects\repo-audit\Devycore\admin\admin.js`
- `C:\Projects\repo-audit\Devycore\admin\projects.json`
- `C:\Projects\repo-audit\Devycore\api\projects.js`
- `C:\Projects\repo-audit\Devycore\api\contact.js`
- `C:\Projects\repo-audit\Devycore\api\login.js`
- `C:\Projects\repo-audit\Devycore\api\discount.js`

## Unify

**Portfolio name:** Unify

**Domain:** Not publicly provided.

**Repo:** https://github.com/elonberisha8/unify

**Positioning:** Full social-impact platform for crowdfunding, volunteer support, creator dashboards, donations, messaging, and admin moderation.

**Short description:**
Unify is a full social-impact platform for Albanian crowdfunding and volunteer support, with public campaigns, donations, Stripe payments, creator verification, volunteer listings, applications, messaging, admin moderation, blog, notifications, uploads, and a Prisma/PostgreSQL backend.

**Medium description:**
Unify is a production-style donation and volunteer platform built with Next.js, TypeScript, Clerk, Stripe, Express, Prisma, PostgreSQL, Socket.io, Cloudinary, and Resend. It includes public pages for campaigns, volunteer listings, blog, profiles, services, legal pages, and contact; authenticated dashboards for campaigns, applications, inbox, transactions, saved items, profile, settings, creator onboarding, and verification; plus an admin area for campaigns, users, volunteers, reports, moderation, email center, blog, audit logs, and platform settings.

**Long description:**
Unify is a full-stack social-impact application for connecting people around fundraising campaigns and volunteer help. The public platform lets users browse campaigns, view campaign details, donate, explore volunteer listings, read blog content, view public profiles, and interact with Albanian-language landing pages. Authenticated users can create campaigns, manage their dashboard, apply to volunteer listings, save items, handle inbox conversations, view transactions, manage profile/settings, and go through creator verification.

The backend is an Express API backed by Prisma/PostgreSQL. It manages campaigns, donations, volunteers, applications, users, messages, uploads, admin actions, emails, webhooks, blog posts, search, notifications, and dashboard stats. Stripe is used for donation payment intents, Connect, Identity, and webhooks; Clerk handles auth; Socket.io powers real-time inbox updates; Cloudinary handles uploads; Resend supports email flows. The admin area includes moderation, reporting, campaign review, user management, volunteer management, blog review, email center, audit logs, and internal settings.

**Role / work to highlight:**
- Built a full social-impact crowdfunding and volunteer-support web app.
- Implemented public campaign, volunteer, blog, profile, service, contact, and legal pages.
- Built authenticated dashboard workflows for campaigns, creator onboarding, applications, inbox, transactions, saved items, profile, verification, and settings.
- Built an Express/Prisma backend for campaigns, donations, volunteers, applications, users, messages, uploads, admin, emails, webhooks, blog, search, notifications, and dashboard stats.
- Integrated Stripe payments, Connect, Identity, and webhooks for donation and creator verification flows.
- Added real-time messaging with Socket.io and email flows with Resend.
- Built admin modules for moderation, reports, campaigns, users, volunteers, blog, email center, audit logs, and settings.

**Core features:**
- Next.js 14 App Router frontend.
- Express backend with Prisma/PostgreSQL.
- Clerk authentication.
- Campaign listing, detail, create, edit, updates, comments, bookmarks, and reports.
- Stripe donation payment intents, Connect, Identity verification, and webhooks.
- Volunteer listings and applications.
- User dashboards for campaigns, transactions, applications, inbox, saved items, profile, verification, and settings.
- Admin dashboard with campaign review, reports, moderation, users, volunteers, blog, emails, audit log, and settings.
- Real-time direct/group messaging with Socket.io.
- Uploads through Cloudinary.
- Email flows through Resend.
- Blog publishing and review workflow.
- Notifications and search endpoints.
- Reusable UI/component system supporting the app.

**Suggested CMS fields:**
- `title`: Unify
- `url`: 
- `year`: 2026
- `tech`: NEXT.JS - PRISMA - STRIPE
- `categories`: Social Impact Platforms, SaaS Platforms
- `featured`: false

**Suggested one-line card copy:**
Full social-impact platform for Albanian crowdfunding and volunteer support, with campaigns, donations, Stripe payments, creator verification, volunteer listings, applications, messaging, admin moderation, and Prisma/PostgreSQL backend.

**Suggested longer portfolio copy:**
A full social-impact platform for crowdfunding and volunteer support. I built and analyzed the system as a complete app: Next.js public pages, authenticated dashboards, campaign and volunteer workflows, Stripe donation/verification flows, Express/Prisma backend, PostgreSQL schema, real-time messaging, uploads, email flows, admin moderation, reports, blog management, audit logs, and platform settings.

**Source files checked:**
- `C:\Projects\Unify\unify\unify-platform\package.json`
- `C:\Projects\Unify\unify\unify-platform\DEVELOPER_GUIDE.md`
- `C:\Projects\Unify\unify\unify-platform\app\page.tsx`
- `C:\Projects\Unify\unify\unify-platform\app\kampanjat\page.tsx`
- `C:\Projects\Unify\unify\unify-platform\app\dashboard\page.tsx`
- `C:\Projects\Unify\unify\unify-platform\app\admin\page.tsx`
- `C:\Projects\Unify\unify\unify-platform\backend\package.json`
- `C:\Projects\Unify\unify\unify-platform\backend\prisma\schema.prisma`
- `C:\Projects\Unify\unify\unify-platform\backend\src\index.ts`
- `C:\Projects\Unify\unify\unify-platform\backend\src\routes\campaigns.ts`
- `C:\Projects\Unify\unify\unify-platform\backend\src\routes\donations.ts`
- `C:\Projects\Unify\unify\unify-platform\backend\src\routes\admin.ts`
- `C:\Projects\Unify\unify\unify-platform\backend\src\routes\messages.ts`

## 1KeyAI

**Portfolio name:** 1KeyAI

**Domain:** https://www.1keyai.org

**Repo:** https://github.com/Beyond-the-classroom/ALLINONE

**Positioning:** API-first RAG platform where developers create document chatbots with one project key.

**Short description:**
1KeyAI is an API-first AI platform where developers upload PDFs or URLs, receive a `pk_xxx` project key, and call chat/streaming endpoints backed by FastAPI, Supabase, embeddings, vector search, configurable LLM providers, and a Next.js dashboard.

**Medium description:**
1KeyAI is a hackathon-built RAG platform for developers who want to add document-grounded AI chat to their own websites without building the AI infrastructure themselves. The monorepo includes a Next.js 15 dashboard, Supabase auth/storage/database, a FastAPI backend, OpenAI embeddings, Supabase vector storage, PDF and URL ingestion, Firecrawl website scraping, project API keys, RLS/data isolation direction, configurable LLM providers, streaming chat, image/voice/video route structure, OpenAPI/Scalar docs, generated SDK direction, and developer copy/paste integration flows.

**Long description:**
1KeyAI is a full AI product concept built around one promise: upload documents or a website, get one API key, and call an endpoint that answers from that project's knowledge base. It is API-first by design, meaning it gives developers the backend intelligence and integration snippets instead of forcing a fixed chatbot widget UI.

The backend is FastAPI and exposes project, ingest, chat, image, voice, and video routes. Dashboard endpoints use Supabase JWT authentication, while public chat endpoints use `pk_xxx` project keys. File ingestion extracts text from PDFs, chunks content, embeds it, stores chunks in Supabase, and retrieves relevant context during chat. URL ingestion uses Firecrawl, and chat can return normal JSON responses or stream Server-Sent Events with sources and tokens. The project also includes provider/model configuration, OpenAPI security schemes, Scalar documentation, rate limiting, Sentry integration, and generated SDK folders for TypeScript/Python.

The frontend is a Next.js 15/React 19 dashboard and marketing site. Developers can sign up, create projects, see project keys, upload knowledge, configure behavior, test chat in a playground, view snippets/API usage, manage settings/security, and understand the product through landing sections, FAQ, code examples, and trust/security messaging.

**Role / work to highlight:**
- Contributed to/build a full AI SaaS monorepo with frontend, backend, docs, and SDK direction.
- Built/structured the developer dashboard for projects, keys, knowledge, playground, snippets, security, and settings.
- Implemented FastAPI endpoints for projects, PDF/URL ingest, RAG chat, streaming chat, and provider configuration.
- Connected Supabase for auth, project ownership, document/chunk storage, and data isolation direction.
- Used embeddings and vector search to answer from project-specific documents.
- Added developer-facing API docs, OpenAPI security schemes, and SDK generation direction.

**Core features:**
- API-first RAG platform.
- Developer projects with `pk_xxx` API keys.
- Next.js dashboard and marketing site.
- Supabase auth/database/storage direction.
- FastAPI backend.
- PDF ingestion with text extraction.
- URL ingestion with Firecrawl.
- Chunking and embeddings.
- Supabase vector search/project-filtered retrieval.
- Configurable LLM provider/model direction: OpenAI, Anthropic, Google/Gemini.
- Normal chat response endpoint.
- Streaming chat endpoint through SSE.
- Project config endpoints.
- API key rotation.
- Documents list/delete endpoints.
- Image, voice, and video route structure.
- OpenAPI security schemes for Supabase JWT and project keys.
- Scalar API reference.
- Sentry monitoring and rate limiting.
- Generated TypeScript/Python SDK direction.

**Suggested CMS fields:**
- `title`: 1KeyAI
- `url`: https://www.1keyai.org
- `year`: 2026
- `tech`: FASTAPI - NEXT.JS - RAG
- `categories`: AI Products, SaaS, Full Stack, RAG, Developer Tools
- `featured`: true

**Suggested one-line card copy:**
API-first RAG platform where developers upload PDFs or URLs, get a `pk_xxx` key, and add document-grounded AI chat through FastAPI, Supabase, embeddings, and Next.js.

**Suggested longer portfolio copy:**
An AI developer platform built for a hackathon team. I worked on a monorepo combining a Next.js dashboard, FastAPI backend, Supabase auth/database/storage, PDF and URL ingestion, embeddings, project-scoped vector retrieval, configurable LLM providers, normal and streaming chat endpoints, project API keys, API docs, and SDK generation direction. The goal: let developers add a document chatbot to any website with one API key and no AI infrastructure setup.

**Source files checked:**
- `C:\Projects\repo-audit\ALLINONE\README.md`
- `C:\Projects\repo-audit\ALLINONE\PROJECT_OVERVIEW.md`
- `C:\Projects\repo-audit\ALLINONE\backend\README.md`
- `C:\Projects\repo-audit\ALLINONE\backend\requirements.txt`
- `C:\Projects\repo-audit\ALLINONE\backend\app\main.py`
- `C:\Projects\repo-audit\ALLINONE\backend\app\api\routes\projects.py`
- `C:\Projects\repo-audit\ALLINONE\backend\app\api\routes\ingest.py`
- `C:\Projects\repo-audit\ALLINONE\backend\app\api\routes\chat.py`
- `C:\Projects\repo-audit\ALLINONE\backend\app\api\routes\image.py`
- `C:\Projects\repo-audit\ALLINONE\backend\app\api\routes\voice.py`
- `C:\Projects\repo-audit\ALLINONE\backend\app\api\routes\video.py`
- `C:\Projects\repo-audit\ALLINONE\frontend\package.json`
- `C:\Projects\repo-audit\ALLINONE\frontend\README.md`
- `C:\Projects\repo-audit\ALLINONE\frontend\app\page.tsx`
- `C:\Projects\repo-audit\ALLINONE\frontend\app\dashboard\page.tsx`
- `C:\Projects\repo-audit\ALLINONE\frontend\app\dashboard\[id]\knowledge\page.tsx`
- `C:\Projects\repo-audit\ALLINONE\frontend\app\dashboard\[id]\playground\page.tsx`
- `C:\Projects\repo-audit\ALLINONE\frontend\app\dashboard\[id]\api\page.tsx`
- `C:\Projects\repo-audit\ALLINONE\sdks\typescript\README.md`
- `C:\Projects\repo-audit\ALLINONE\1-key-ai-python\README.md`

## QrCore

**Portfolio name:** QrCore

**Domain:** https://qrcore.elonberisha.com

**Repo:** https://github.com/elonberisha/QrCore

**Positioning:** Production-minded .NET QR generation API with PNG rendering, SQLite history, JWT-protected management endpoints, Swagger docs, and secret-handling documentation.

**Short description:**
QrCore is a .NET 10 Web API for generating customizable QR codes as PNG images, with SQLite history, JWT-protected management endpoints, Swagger/OpenAPI docs, QRCoder/SkiaSharp rendering, logo support, imgbb image-upload QR generation, and documented secret-handling practices.

**Medium description:**
QrCore is a feature-based .NET 10 / ASP.NET Core API and simple web app for creating QR codes from URLs, text, event details, email, phone, SMS, WiFi, and uploaded images. It uses QRCoder to generate QR data, SkiaSharp to render PNG images with custom colors/logo/quiet-zone settings, EF Core with SQLite to store QR metadata, JWT Bearer authentication for history/admin endpoints, Swagger/OpenAPI for testing, and HttpClient integration with imgbb for image-to-QR flows. The latest documentation also covers safer configuration with placeholder secrets, environment variables, `dotnet user-secrets`, secret rotation, and repository-history cleanup guidance.

**Long description:**
QrCore is a practical QR generation system built with .NET 10 and ASP.NET Core Web API. The public generation endpoint accepts QR content plus optional event name, location, foreground/background colors, output size, logo base64, logo size, quiet-zone modules, event-detail inclusion, and error-correction level. The service generates a PNG using QRCoder and SkiaSharp, stores metadata in SQLite, and returns the image directly with the generated record ID in the response headers.

The project also includes protected management endpoints for reading QR history, fetching a single QR record, regenerating a saved QR as PNG, and clearing history. Authentication uses demo login credentials from configuration and returns a signed JWT token. Image upload support sends uploaded files to imgbb, receives a public image URL, generates a QR code for that URL, and returns the PNG with the image URL in a response header. Swagger/OpenAPI is configured with bearer-token authorization, making the API easy to test and document.

The refreshed README and security documentation add an important production-hygiene layer: runtime secrets are represented as placeholders in `appsettings.json`, with guidance to use environment variables, `dotnet user-secrets`, or a real secrets manager in production. The security guide also documents what to do if a secret is ever committed: rotate exposed credentials, purge secrets from Git history with BFG or `git filter-repo`, force-push rewritten history carefully, and verify with secret-scanning tools.

**Role / work to highlight:**
- Built an ASP.NET Core Web API using feature-based architecture.
- Implemented QR PNG generation with QRCoder and custom SkiaSharp rendering.
- Added customization for colors, output size, logo, quiet zone, event details, and error correction.
- Stored QR metadata with EF Core and SQLite.
- Secured history/admin endpoints with JWT Bearer authentication.
- Integrated imgbb image upload so uploaded images can be converted into QR destinations.
- Documented and tested the API through Swagger/OpenAPI and academic/technical documentation.
- Added production-minded secret hygiene docs: placeholder config values, user-secrets/env-var guidance, rotation steps, and Git history cleanup recommendations.

**Core features:**
- ASP.NET Core Web API.
- Feature-based folders for Auth, QrCodes, Images, and Infrastructure.
- QR generation endpoint returning PNG binary responses.
- Custom foreground/background color support.
- Logo overlay support from Base64 image data.
- Adjustable size, quiet zone, and error correction level.
- Optional event name/location included in QR payload.
- SQLite metadata history through EF Core.
- Protected history listing, single-record lookup, PNG regeneration, and history deletion.
- JWT login and bearer-token authentication.
- Swagger/OpenAPI with authorization scheme.
- Image upload endpoint using imgbb API.
- Response headers for generated QR ID and uploaded image URL.
- Static-file/frontend fallback structure.
- Placeholder runtime secrets in `appsettings.json`.
- Security documentation for secret rotation, Git history cleanup, and future leak prevention.

**Suggested CMS fields:**
- `title`: QrCore
- `url`: https://qrcore.elonberisha.com
- `year`: 2026
- `tech`: .NET - SQLITE - JWT
- `categories`: Backend, API, Tools, Full Stack, QR / Utility
- `featured`: false

**Suggested one-line card copy:**
.NET QR generation API with custom PNG rendering, SQLite history, JWT-protected management endpoints, Swagger docs, logo support, image-upload QR flows, and secret-hygiene documentation.

**Suggested longer portfolio copy:**
A QR generation API built with .NET and ASP.NET Core. I implemented PNG rendering with QRCoder and SkiaSharp, QR customization for colors, size, logo, quiet zone, event details, and error correction, SQLite metadata history through EF Core, JWT-protected history/admin endpoints, Swagger/OpenAPI documentation, an imgbb upload flow that turns uploaded images into QR-linked public URLs, and documentation for safer secret handling in local and production environments.

**Source files checked:**
- `C:\Projects\repo-audit\QrCore\README.md`
- `C:\Projects\repo-audit\QrCore\SECURITY.md`
- `C:\Projects\repo-audit\QrCore\appsettings.json`
- `C:\Projects\repo-audit\QrCore\DOKUMENTIMI_AKADEMIK.md`
- `C:\Projects\repo-audit\QrCore\QrEventApi.csproj`
- `C:\Projects\repo-audit\QrCore\Program.cs`
- `C:\Projects\repo-audit\QrCore\Features\QrCodes\QrCodesController.cs`
- `C:\Projects\repo-audit\QrCore\Features\QrCodes\QrCodeModels.cs`
- `C:\Projects\repo-audit\QrCore\Features\QrCodes\QrCodeGeneratorService.cs`
- `C:\Projects\repo-audit\QrCore\Features\Auth\AuthController.cs`
- `C:\Projects\repo-audit\QrCore\Features\Auth\AuthModels.cs`
- `C:\Projects\repo-audit\QrCore\Features\Auth\JwtTokenService.cs`
- `C:\Projects\repo-audit\QrCore\Features\Images\ImageUploadController.cs`
- `C:\Projects\repo-audit\QrCore\Features\Images\ImageUploadService.cs`
- `C:\Projects\repo-audit\QrCore\Infrastructure\Data\AppDbContext.cs`
