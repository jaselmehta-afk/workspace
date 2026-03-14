# Product Requirements Document
## Workspace.co.uk — Modern Rebuild

**Version:** 1.0
**Date:** 2026-03-14
**Author:** Claude (AI)
**Status:** Approved for Build

---

## 1. Executive Summary

Workspace Group is London's premier flexible office space provider, operating 60+ distinctive, characterful buildings across the city. This PRD defines the requirements for a complete modern rebuild of workspace.co.uk — a website that better serves the needs of London's SME founders, creative teams, and fast-growing businesses who are looking for inspiring, flexible workspace.

The rebuilt site must be visually stunning, fast, accessible, and conversion-optimised — transforming casual visitors into leads and leads into tenants.

---

## 2. Business Goals

| Goal | Metric |
|---|---|
| Increase organic search traffic | +40% YoY |
| Improve lead conversion rate | Homepage → Enquiry > 4% |
| Reduce time-to-find-space | Under 2 minutes from landing |
| Build brand equity | NPS > 70 among prospects |
| Showcase community & culture | 3+ user stories per quarter |

---

## 3. Target Users

### Primary: The Ambitious Founder
- 25–45 years old, growing a team from 5–50 people
- Needs flexibility (can scale up/down)
- Values design, community, and location
- Pain points: traditional leases are too rigid; WeWork feels impersonal

### Secondary: The Ops/Facilities Manager
- Evaluating options for an established team (20–200 people)
- Needs specs, pricing, and compliance info quickly
- Values reliability, support, and clear commercial terms

### Tertiary: The Freelancer / Solo Creative
- Looking for hot-desk, day pass, or month-to-month commitment
- Wants community, caffeine, and fast Wi-Fi
- Values affordability and atmosphere

---

## 4. Core Features & Pages

### 4.1 Homepage
- **Hero section** — full-bleed video/image background with headline, subheadline, and smart search bar (location + space type + team size)
- **Space type selector** — animated cards: Private Office, Coworking, Meeting Rooms, Studios
- **Featured locations** — curated cards with photo, location name, neighbourhood, headline amenity
- **"Why Workspace" section** — 4 core value propositions with icons: Flexible Contracts, Customise Freely, Prime London Locations, Thriving Community
- **Social proof strip** — logos of notable tenant companies
- **Customer stories carousel** — quote, photo, company name, space used
- **By the numbers** — animated stats: 60+ buildings, 4,000+ businesses, 5M sq ft, 35+ years
- **Community / events teaser** — upcoming events at Workspace buildings
- **Sustainability pledge** — ESG commitment section (B Corp aligned language)
- **Newsletter CTA** — email capture with value proposition
- **Footer** — comprehensive: links, social, legal, contact

### 4.2 Find a Space (Search & Listings)
- **Smart search bar** — autocomplete for London boroughs and postcodes
- **Filter sidebar** — Space type, Team size, Neighbourhood/Zone, Amenities (bike storage, showers, café, EV charging, pet-friendly), Availability
- **Map/List toggle** — interactive London map with pins; list view with cards
- **Space cards** — photo, name, area, type badges, key amenities icons, "From £X/month", CTA button
- **Sort options** — Recommended, Price (low/high), Newest, Closest to you
- **Results count** — "Showing 24 of 60 spaces"
- **Space comparison tool** — select up to 3 spaces and compare side-by-side

### 4.3 Space Detail Page
- **Photo gallery** — hero image + scrollable gallery (lightbox)
- **Location badge + map** — embedded Google Map or Mapbox
- **Space specs** — sq ft, capacity, contract type, floor
- **Amenities grid** — icon + label for each included amenity
- **Pricing section** — "From £X/month per desk" with CTA to enquire
- **Virtual tour CTA** — book a viewing / watch virtual tour
- **Similar spaces** — 3 related cards
- **Enquiry form** — name, email, phone, team size, move-in date, message
- **Local area guide** — nearby transport links, restaurants, gyms

### 4.4 Meeting Rooms
- **Room listings** — filtered by location, capacity, half-day/full-day
- **Room detail** — specs, AV equipment, catering options, pricing
- **Booking flow** — date picker, time slots, attendee count, add-ons
- **Member vs guest pricing** — clear tier display

### 4.5 Community & Content Hub
- **Articles, news, and events** — filterable by category (Startup, Growth, Culture, Events, Workspace News)
- **Featured story** — full-bleed featured article card
- **Events calendar** — upcoming events at Workspace buildings
- **Member spotlight** — rotating feature of a tenant business
- **Podcast/video series teaser** — "The London Business Podcast"

### 4.6 About Workspace
- **Mission and values** — "Space to grow" narrative
- **History timeline** — 1987 founding → today
- **Leadership team** — headshots, names, bios
- **ESG / Sustainability** — commitments, certifications, progress
- **Investors** — FTSE 250 information
- **Press/media** — press releases, media kit download

### 4.7 Contact
- **Enquiry form** — general enquiry, sales, press, careers
- **Office address** — Canterbury Court, Kennington Park
- **Phone & email**
- **Interactive map**

---

## 5. Enhanced Features (Beyond Original)

### 5.1 AI Space Finder Quiz
A 4-step conversational wizard:
1. "How big is your team?" (1–5, 6–15, 16–50, 50+)
2. "What part of London?" (map-based area selector)
3. "What matters most?" (multi-select: price, design, transport, community, amenities)
4. "When do you need it?" (date picker)

→ Returns 3 recommended spaces with match percentage

### 5.2 Interactive London Map
- Cluster pins by borough
- Filter pins by space type
- Click pin → mini-card preview → "View Space" CTA
- "Near me" geolocation button

### 5.3 Space Comparison Tool
Select up to 3 spaces → side-by-side table comparing:
- Price, sq ft, contract length, amenities, transport links, availability

### 5.4 Virtual Tour Integration
- 360° photo viewer embedded per location
- "Book a Physical Tour" CTA with calendar booking

### 5.5 Community Event Discovery
- Filter events by building, category, date
- RSVP/register flow
- "Events near you" personalisation

### 5.6 ESG Dashboard
- Carbon footprint per building
- BREEAM ratings
- Cycle-to-work stats
- EV charger availability

### 5.7 Tenant Portal Teaser
- "Already a member? Access your portal" → login CTA
- Shows: invoice history, access cards, community forum, event RSVPs

### 5.8 Smart Search with Autocomplete
- Suggests: building names, neighbourhoods, postcodes, tube stations
- Recent searches saved in localStorage

---

## 6. Design System

### Typography
- **Display/Hero:** `Fraunces` — elegant serif with personality (contrast to generic sans-serif competitors)
- **Body/UI:** `Inter` — clean, modern, readable

### Colour Palette
| Token | Hex | Usage |
|---|---|---|
| `brand-charcoal` | `#1C1C2E` | Primary text, nav background |
| `brand-cream` | `#FAF8F4` | Page backgrounds, cards |
| `brand-orange` | `#E8622A` | Primary CTA, accents |
| `brand-sage` | `#7B9E87` | Secondary accents, sustainability |
| `brand-gold` | `#C9A84C` | Premium/highlight elements |
| `neutral-50` | `#FAFAFA` | Light backgrounds |
| `neutral-900` | `#111111` | Dark text |

### Motion Principles
- Entrance animations: fade-up on scroll (Intersection Observer)
- Hover states: subtle scale + shadow lift on cards
- Page transitions: smooth fade
- Loading states: skeleton screens (no spinners)

### Component Library
- Buttons: Primary (orange fill), Secondary (outline), Ghost (text-only)
- Cards: Space card, Blog card, Team card, Stat card
- Forms: Floating label inputs, custom selects, date pickers
- Navigation: Sticky nav with blur backdrop on scroll

---

## 7. Technical Architecture

### Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Inter + Fraunces)
- **Maps:** Leaflet.js (open source, no API key required for demo)
- **Deployment:** Vercel-ready

### Performance Targets
- Lighthouse Performance: >90
- LCP: <2.5s
- CLS: <0.1
- FID: <100ms
- Core Web Vitals: All green

### SEO
- Server-side rendered pages for all content
- Structured data (LocalBusiness, Event, Article schema)
- Dynamic OG images per page
- Sitemap.xml + robots.txt
- Canonical URLs

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation throughout
- Screen reader optimised (ARIA labels)
- Focus management for modals and overlays

---

## 8. Content Strategy

### Voice & Tone
- **Ambitious but warm** — speaks to founders, not corporates
- **London-proud** — celebrates the city's energy and diversity
- **Community-first** — tenants are partners, not just customers
- **Direct and confident** — no filler copy, every word earns its place

### Key Messages
1. "Space to grow" — the master brand promise
2. "Flexible on your terms" — contract flexibility
3. "London's most characterful buildings" — product differentiation
4. "A community of London's brightest businesses" — network effect

---

## 9. Metrics & Success Criteria

| KPI | Target |
|---|---|
| Page load time | < 2s on 4G mobile |
| Enquiry form completion | > 8% of space page visitors |
| Space finder quiz completion | > 60% start → finish |
| Virtual tour CTR | > 15% of space page visitors |
| Newsletter signups | > 500/month |
| Bounce rate | < 40% |

---

## 10. Out of Scope (v1)

- Backend CMS integration (content is static/mocked)
- Real-time availability API
- Payment processing for meeting room bookings
- Member portal (full implementation)
- Native mobile app

These are flagged for v2 post-launch.

---

*End of PRD*
