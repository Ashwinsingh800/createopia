# MASTER WEBSITE BUILD PROMPT — CREATEOPIA
## AI-Native Creator Marketplace | Full-Stack Product | Production-Quality UI

### 1. YOUR ROLE

Act as a senior product designer, full-stack developer, UX researcher, motion designer, and AI application engineer working together.

Design and build a complete, responsive, functional website called **Createopia** — an AI-native creative marketplace connecting AI filmmakers, AI animators, AI image artists, brands, and creative agencies.

I have attached a visual UI concept. Use it as the primary visual reference for the layout, cinematic portfolio imagery, sidebar navigation, creator profiles, AI-assisted brief builder, creator verification, and project management interface.

Improve the reference into a cohesive, usable product. Do not blindly copy the image or reproduce a collection of disconnected mockups.

**The objective is to build a real working website, not merely a UI design, landing page, static prototype, or collection of placeholder screens.**

Before coding, create a concise step-by-step implementation plan covering the structure, data model, design system, API integration, and testing strategy. Then implement the product in stages. Do not stop after presenting the plan.

If an existing codebase is available, inspect it and extend it without unnecessarily replacing working code.

---

### 2. PRODUCT VISION

Createopia helps brands find the right AI creator, evaluate their work and capabilities, create professional creative briefs, and manage engagements from discovery through delivery.

The product must solve four key problems:

1. Brands struggle to find creators with the specific AI-production skills their projects require.
2. Traditional portfolios often do not explain which tools, workflows, and production techniques were used.
3. Brands need a structured way to specify content requirements, formats, deadlines, budgets, and commercial-use rights.
4. Creators and brands need a straightforward workflow to collaborate, review revisions, and approve final deliverables.

Build the following essential capabilities:

- Creator profiles and AI-native portfolios.
- Creator discovery, search, and filtering.
- Brand and agency dashboards.
- Creative brief creation and publishing.
- AI-assisted brief generation.
- Creator verification signals and evidence.
- Explainable creator recommendations.
- Creator shortlisting and invitations.
- Basic engagement and delivery tracking.
- A Gemini-powered Creative Copilot chatbot that helps users develop image, video, animation, and campaign prompts.
- Supabase authentication, database persistence, and media storage.

The product must prioritize ease of use. A first-time user should understand what to do without reading a long tutorial.

### 3. DESIGN DIRECTION: CREATIVE MISSION CONTROL

Create a sophisticated creative-technology product with the visual quality of a professional design studio's SaaS platform.

The website should feel carefully art-directed, premium, creative, trustworthy, and calm.

It must NOT look like a generic AI-generated website, an off-the-shelf website-builder theme, an overdesigned crypto dashboard, or a cluttered collection of cards.

#### Visual identity

Product name: Createopia

Tagline: “More than a marketplace. It's a creative ecosystem.”

Suggested palette:

- Midnight navy: `#11152B`
- Deep indigo: `#20284B`
- Electric violet: `#7865FF`
- Soft porcelain: `#F5F6FA`
- White: `#FFFFFF`
- Primary text: `#171A2B`
- Secondary text: `#737A90`
- Border: `#E3E6EF`
- Verified mint: `#24A878`

Use violet sparingly for primary actions, active navigation, focus indicators, and AI features. Use mint for genuine successful or verified states, not ordinary decoration.

Prefer light, spacious pages for discovery, portfolios, and forms. Use dark surfaces selectively for the homepage hero, the AI Copilot workspace, and detailed project rooms.

Avoid making every section dark.

#### Typography

Use a modern, highly legible font such as Inter or Geist. Establish a consistent type scale:

- Large, editorial homepage headline.
- Clear page titles.
- Moderate subsection headings.
- Readable body text.
- Small, muted labels for metadata.

Avoid excessively large headings, tightly packed copy, unnecessary uppercase labels, and paragraphs that make the interface feel heavy.

#### Layout

Use a consistent maximum content width, deliberate spacing, clean alignment, and a restrained border-radius system.

Use:

- A persistent, simple navigation system.
- A left sidebar for logged-in workspaces on desktop.
- A centered content area for search results and forms.
- Large portfolio media with predictable aspect ratios.
- Compact, information-rich creator cards.
- Clear page headings and one primary action per page.
- Accessible tooltips where icon-only controls are unavoidable.

Do not place every element inside a card. Use cards only when they group meaningful content. Create visual hierarchy with typography, whitespace, alignment, subtle borders, and image composition.

Do not add unnecessary graphs, statistics, badges, floating panels, glassmorphism, neon effects, or gradient backgrounds.

Gradients may be used subtly in the homepage hero or the Creative Copilot illustration, but never as a substitute for a considered visual design.

#### Logo

Create a minimal geometric logo based on a small constellation, creative spark, or connected visual nodes, paired with the Createopia wordmark.

Keep it simple, recognizable, and suitable for a favicon. Do not rely on a generic robot icon.

### 4. USER ROLES AND NAVIGATION

Support three account types:

**Creator**
- Build and edit a profile.
- Upload portfolio items.
- Add skills, tools, and production workflows.
- Submit evidence for verification.
- Browse suitable briefs.
- Receive and respond to invitations.
- Manage engagements and deliverables.

**Brand / Agency**
- Discover AI creators.
- Save creators to a shortlist.
- Build and publish briefs.
- Review creator applications or invitations.
- Manage active projects.
- Review submissions and request revisions.

**Administrator / Reviewer**
- Review creator verification evidence.
- Approve or reject individual verification claims.
- Record reviewer notes and timestamps.
- Manage verification status without impersonating creator claims.

Keep the primary navigation short.

Desktop public navigation:

- Explore Creators
- How It Works
- For Brands
- For Creators
- Pricing (optional; only include if a meaningful pricing page exists)
- Sign In
- Get Started

Desktop authenticated navigation:

- Home
- Discover
- Briefs
- Shortlist
- Messages
- Projects
- Creative Copilot
- Profile / Settings

For mobile, use a compact header and accessible menu or bottom navigation where appropriate. Do not cram every navigation item into one horizontal bar.

Navigation items must lead to actual pages or implemented sections. Remove dead links.

### 5. PAGE ONE: HOMEPAGE

Create a polished homepage with an editorial, portfolio-first aesthetic.

#### Header

- Createopia wordmark on the left.
- A small set of navigation links.
- Sign In.
- A clear primary CTA: “Find a Creator.”
- A secondary CTA: “Join as a Creator.”

Make the header sticky only if it improves navigation. Use a subtle background and border when the header transitions from transparent to solid.

#### Hero section

Suggested headline:

**Find the creative talent behind your next big idea.**

Supporting text:

“Discover AI-native filmmakers, animators, and visual artists. Build better briefs, verify creative capabilities, and take campaigns from concept to delivery.”

Primary CTA: “Explore Creators”

Secondary CTA: “Build a Creative Brief”

Use a carefully selected cinematic visual composition featuring several portfolio projects: premium product imagery, futuristic filmmaking, stylized animation, and editorial visuals.

The imagery should feel like an actual art-directed creative studio portfolio rather than a random collage of AI pictures.

Add a compact search field that supports queries such as:

- Cinematic product videos
- AI animation
- Fashion visuals
- Character-driven storytelling
- Image-to-video specialists

#### Featured creators

Display a modest selection of creator cards with:

- Portfolio thumbnail.
- Creator name.
- Specialization.
- Selected tool tags.
- Rating only when grounded in actual demo review data.
- Verification indicators only when appropriate.
- A “View Profile” link.
- A shortlist action.

Use varied but visually coherent portfolio images.

#### How it works

Use three concise steps:

1. Discover — Find creators by their capabilities and work.
2. Define — Turn your idea into a structured creative brief.
3. Deliver — Collaborate, review, and approve the final work.

#### AI Copilot introduction

Include a modest section introducing Creative Copilot.

Suggested copy:

“From rough idea to production-ready prompt.”

Explain that it can help plan campaigns, develop visual direction, and produce prompts for image and video generation.

CTA: “Try Creative Copilot”

#### Trust section

Introduce creator evidence and verification, explaining the difference between self-reported tools and claims actually reviewed.

#### Footer

Include links to Explore, For Creators, For Brands, Help, Privacy, Terms, and Contact. Only present legal or policy pages as authoritative if their content has actually been implemented and reviewed.

### 6. PAGE TWO: CREATOR DISCOVERY

This is one of the most important pages in the product.

Create a functional discovery page with a clean filter sidebar and responsive results grid.

#### Top area

Page title: “Discover AI Creators”

Supporting text: “Find the right skills, style, and production experience for your project.”

Provide:

- Search input.
- Active-filter chips.
- Result count.
- Sorting selector.
- Grid/list toggle only if both views work.

#### Functional filters

Implement the following filters using real query parameters and database fields:

1. Specialization:
   - AI Filmmaking
   - AI Animation
   - AI Imaging
   - AI Advertising
   - Motion Graphics
   - Character Design
   - Product Visualization
   - Other

2. Skills:
   - Text-to-video
   - Image-to-video
   - Prompt engineering
   - Storyboarding
   - Character consistency
   - Compositing
   - Video editing
   - Product visualization
   - Motion design

3. Tools and models:
   - Store tool names as database records, not hard-coded labels spread throughout the application.
   - Seed useful example tools including Runway, Midjourney, Adobe After Effects, Photoshop, Blender, and other relevant tools.
   - Make adding a tool possible without rewriting the search interface.

4. Content type:
   - Video
   - Animation
   - Static image
   - Motion graphics
   - Mixed media

5. Supported aspect ratios:
   - 9:16
   - 16:9
   - 1:1
   - 4:5
   - Custom

6. Budget range, when creators have provided pricing.
7. Availability, when maintained by the creator.
8. Commercial-use capability.
9. Verification status.

Provide a “Clear all” action and ensure every selected filter visibly updates the results.

Mandatory filters must exclude incompatible creators. Optional preferences can contribute to relevance ranking.

Do not treat missing rights information as proof of commercial eligibility.

#### Search behavior

Support searching creator names, biographies, skills, tools, specializations, and portfolio descriptions.

For the initial release, prioritize structured filters and keyword search. Add semantic retrieval only if it can be completed without sacrificing correctness or usability.

Sort by relevant match, rather than arbitrarily labeling popular creators as the best.

#### Creator cards

Each card should contain:

- Strong portfolio artwork.
- Creator avatar or initials.
- Name and specialization.
- A concise description.
- A small set of skills or tools.
- Genuine verification signals.
- A View Profile action.
- An accessible shortlist button.

Cards should feel like a carefully curated creative directory, not generic e-commerce tiles.

#### Empty, loading, and error states

Implement polished empty states.

When no creators match:

“No creators match these filters yet.”

Offer:
- Remove one or more filters.
- Clear all filters.
- Edit the search query.

Never leave an empty blank grid or invent results to fill the page.

Use skeleton loading where appropriate and clear error messages when data cannot load.

### 7. PAGE THREE: CREATOR PROFILE AND PORTFOLIO

Create a portfolio page that makes AI-production capabilities easy to evaluate.

#### Profile header

Include:

- Creator photo or avatar.
- Name.
- Professional headline.
- Location or timezone when relevant.
- Short biography.
- Specializations.
- Availability.
- Pricing information if available.
- Message or Invite to Brief action.
- Shortlist action.

Avoid adding unsupported ratings, earnings, client logos, job history, or verification badges.

#### Portfolio gallery

Build a visually rich, responsive media gallery with filters by:

- All
- Videos
- Animations
- Images
- Campaigns

Each portfolio item should open a detailed project view or accessible modal.

Project detail fields:

- Title and description.
- Media preview.
- Creator's specific role.
- Content type and intended use.
- Tools and models used.
- Skills demonstrated.
- Aspect ratio and duration.
- Production workflow.
- Supporting references or evidence when provided.
- Commercial-use information or limitations, if documented.

Support images and video playback. Use appropriate controls, poster images, lazy loading, and responsive sizing.

For video uploads, use reasonable limits and clear upload progress. Store files in Supabase Storage rather than attempting to store binary media in database rows.

Do not fake production provenance or claim to have verified authorship simply because a media file exists.

#### Skills and tools

Display compact, readable groups.

Every tool can have its own verification state, such as:

- Self-reported
- Evidence submitted
- Verified

Only a reviewer-controlled verification process can grant the final verified state.

### 8. PAGE FOUR: BRAND DASHBOARD

Create an uncomplicated workspace for brand and agency users.

Include:

- Welcome header.
- “Create Brief” primary action.
- Draft briefs.
- Published briefs.
- Shortlisted creators.
- Active engagements.
- Recent applications or invitations.

Use simple lists and status labels instead of an unnecessary analytics dashboard.

Initial empty state:

“Your next campaign starts with a brief.”

CTA: “Create Your First Brief”

All counts must come from actual data. Do not show inflated marketplace statistics.

Brands must be able to open, edit, archive, or publish their own briefs according to their permissions.

### 9. PAGE FIVE: AI-ASSISTED BRIEF BUILDER

Treat this as a key product feature.

Provide two clear ways to build a brief:

- Start with AI
- Create Manually

The AI flow must turn a rough idea into an editable, structured creative brief.

#### Initial prompt box

Placeholder:

“Describe your campaign idea, product, visual direction, and the content you need…”

Example:

“We are launching premium coffee. We need a cinematic Instagram video showing coffee beans transforming into a beautiful cup, with a warm and modern visual style.”

CTA: “Build My Brief”

#### AI output fields

The output should populate a normal editable form containing:

- Campaign title.
- Brand or product.
- Campaign objective.
- Target audience.
- Content type.
- Creative style.
- Mood and visual direction.
- Deliverables and quantity.
- Aspect ratio and dimensions.
- Duration for video.
- Resolution.
- Platform or channel.
- Required tools, where relevant.
- Budget and currency.
- Deadline.
- Revision allowance.
- Commercial-use type.
- Usage duration.
- Territory.
- Exclusivity.
- Third-party asset or likeness requirements, where applicable.
- Reference images and attachments.
- Additional notes.

For fields that do not apply, use appropriate conditional logic. For example, a static image does not require a video duration.

#### AI reliability

The chatbot must not silently invent budget, deadlines, commercial licensing rights, or user preferences.

If details are absent, show “Needs your input” or provide clearly marked suggested defaults.

For example:

- Video duration: Suggested, confirm before publishing.
- Budget: Not specified.
- Commercial-use duration: Needs confirmation.
- Territory: Needs confirmation.

Use the Gemini API to return structured data conforming to a schema. Validate this output in the application server before populating the form.

Let the user edit all generated fields before saving.

#### Brief workflow

1. User enters a rough idea.
2. AI extracts proposed fields.
3. Website validates the response.
4. Incomplete fields are marked.
5. User edits and confirms requirements.
6. User saves as draft or publishes.
7. The published brief becomes searchable for creators.
8. Suitable creators are suggested using the same matching system as discovery.

Display validation errors inline and use concise explanations.

### 10. PAGE SIX: CREATIVE COPILOT CHATBOT

Create a polished AI assistant called **Creative Copilot**.

Its purpose is to help brands and creators turn rough visual ideas into useful image, video, animation, and campaign prompts.

It must use the Gemini API through a secure server-side function.

#### Chat interface

Create a dedicated chat workspace that is simple and approachable, not a complicated developer console.

Layout:

- Small introduction explaining what the assistant can do.
- Message history.
- One clear message input.
- Send button.
- Optional attachment button.
- Copy actions for generated prompts.
- New conversation action.
- Small suggestion chips.
- Clear loading and error states.

Suggested welcome message:

“Tell me what you want to create. I'll help you shape the visual direction, ask the important questions, and build a prompt you can use.”

Suggested quick actions:

- Create an image prompt
- Create a video prompt
- Build a campaign brief
- Improve an existing prompt
- Analyze a visual reference
- Create a storyboard

#### Conversation flow

The assistant should ask a few focused questions, only when necessary.

For an image request, it may ask about:

- Subject or product.
- Intended use.
- Visual style.
- Composition.
- Lighting.
- Colors.
- Aspect ratio.
- Required text or brand elements.
- Reference images.

For a video request, it may ask about:

- Subject and action.
- Scene.
- Duration.
- Camera movement.
- Shot composition.
- Lighting and mood.
- Aspect ratio.
- Audio or dialogue requirements.
- Start and end frames when relevant.
- Continuity requirements.

Do not ask every question in every interaction. Infer what is clear and ask only for information that materially affects the output.

If the user already provides sufficient detail, generate a useful prompt immediately.

#### Example conversation

User:

“I need an advertisement for a luxury perfume.”

Assistant:

“Are you planning a still product image, a cinematic video, or both?”

User:

“A 10-second video for Instagram.”

Assistant:

“Should the look feel dark and dramatic, warm and luxurious, or fresh and minimal?”

User:

“Dark and dramatic. Use gold lighting.”

Assistant:

Generate a detailed video prompt with shot progression, subject movement, camera direction, lighting, composition, timing, and visual consistency.

Provide a final panel with:

- **Main prompt**
- **Shot-by-shot breakdown**, where useful
- **Visual style**
- **Camera and movement instructions**
- **Lighting and atmosphere**
- **Aspect ratio and duration**
- **Negative prompt or exclusions**, where supported
- **Audio guidance**, when applicable
- **Recommended adjustments**

Add one-click “Copy Prompt” and “Edit Prompt” actions.

Never tell the user a video was generated if the application only generated text.

#### Optional image and video generation

The default Copilot feature must produce high-quality prompts even when media generation is unavailable.

If the configured Gemini media API supports image or video generation, allow an optional “Generate Media” action. Before invoking it, clearly communicate the selected output type and any applicable usage or quota constraints.

Use separate, configurable model settings for text tasks and media tasks. Implement actual API integration and error handling rather than fake responses or permanently loading mock data.

If media generation is unavailable, return the prepared prompt and allow the user to copy it.

#### Connecting Copilot to the marketplace

When a user is building a brief, let them transfer the relevant structured requirements directly into the Brief Builder.

When a brand has already published a brief, provide an optional action to produce a campaign-specific prompt.

When creators work on a portfolio project, let them use Copilot to refine the project description or generate a reusable visual direction prompt.

Do not expose private briefs or portfolio material to other users through the chatbot.

### 11. CREATOR VERIFICATION — BONUS FEATURE

Implement real verification states with a review flow.

Verification should be available at the claim level for:

- Tools and models.
- Workflow evidence.
- Specific portfolio work.
- Client references or completed engagements, if properly supported.

#### Creator side

Allow creators to:

1. Select a verification claim.
2. Add relevant supporting evidence.
3. Provide an optional explanation.
4. Submit it for review.
5. See the current status and review notes.

#### Reviewer side

Provide a protected review interface where authorized reviewers can:

- Inspect submitted evidence.
- Approve a specific claim.
- Reject the claim with an explanation.
- Request additional information.
- Record who reviewed it and when.

Suggested statuses:

- Self-reported.
- Evidence submitted.
- Additional information required.
- Verified.
- Rejected.

Store verification status, evidence reference, reviewer identity, review notes, and timestamps where appropriate.

Never let a creator update their own claim directly to Verified.

Only display the Verified badge after an authorized review decision.

If a specific kind of external tool verification is not implemented, state the verification method honestly and do not label the tool account itself as independently verified.

### 12. CREATOR MATCHING ENGINE

Create a reusable matching function used by both manual search and the AI brief workflow.

#### Step one: mandatory constraints

Exclude creators who do not meet explicit mandatory requirements, such as a required aspect ratio or confirmed commercial-use capability.

Missing data must not automatically pass a mandatory requirement.

#### Step two: relevance scoring

Build an explainable scoring function from:

- Skills match: 35%
- Portfolio relevance: 25%
- Tool match: 20%
- Format compatibility: 10%
- Relevant workflow or experience evidence: 10%

Treat these as initial configurable weights for the hackathon, not scientifically validated performance metrics.

Apply eligibility filters before ranking. Never let an impressive overall score override a mandatory requirement.

#### Step three: explain the match

Each recommended creator should show a few reasons, such as:

- Matches the requested AI video specialization.
- Has relevant product advertising work.
- Supports the required aspect ratio.
- Lists a suitable production tool.
- Commercial-use requirements still need confirmation.

Do not claim that the score is an objective probability of project success.

#### Step four: user actions

Allow the brand to:

- View the full profile.
- Save to shortlist.
- Invite to a brief.
- Compare relevant portfolio work.
- Remove a creator from the shortlist.

Provide the same empty-state behavior as the main discovery page.

### 13. PAGE SEVEN: BRIEFS AND CREATOR APPLICATIONS

Build a brief marketplace where creators can see suitable opportunities.

Each brief preview should show:

- Campaign title.
- Content type.
- Required skills.
- Required aspect ratio.
- Budget when supplied.
- Deadline.
- Commercial-use requirements.
- Brief status.

Creator actions:

- Open full brief.
- Save brief.
- Apply or express interest.
- Decline or withdraw an application where appropriate.

Brand actions:

- View applications.
- Open creator portfolios.
- Shortlist candidates.
- Send invitations.
- Accept a creator into an engagement.

Use explicit application and invitation statuses. Prevent duplicate applications and duplicate invitations where possible.

Do not show one brand's private briefs to another brand.

### 14. PAGE EIGHT: PROJECT ROOM AND DELIVERY

Build a focused workspace for approved engagements.

Include:

- Campaign summary.
- Assigned creator.
- Original brief.
- Project status.
- Deliverables.
- Milestones.
- Messages or notes.
- Revision requests.
- Approval and completion.

Suggested statuses:

- Invitation sent.
- Accepted.
- In progress.
- Submitted for review.
- Revision requested.
- Approved.
- Completed.

Allow creators to upload a deliverable and provide a short description.

Allow brands to approve it or request a revision with clear feedback.

Persist these changes in Supabase.

For the hackathon, a lightweight project room is sufficient. Do not build real payment processing, escrow, or complicated contracts unless time and requirements justify them.

Do not represent a payment as completed unless a real payment integration exists.

### 15. SUPABASE BACKEND AND AUTHENTICATION

Use Supabase for:

- Authentication.
- PostgreSQL database.
- Portfolio and evidence storage.
- Persistent briefs.
- Shortlists.
- Creator applications and invitations.
- Engagements.
- Verification submissions.
- Chat history, when users choose to save conversations.

Implement a proper data layer rather than storing the entire application in browser local storage.

#### Authentication

Use Supabase Auth with:

- Email and password.
- A practical password reset flow.
- Optional Google OAuth if configured.
- Persistent sessions.
- Sign-out.
- Protected routes.

On registration, ask the user to choose Creator or Brand/Agency.

Create the relevant profile record after sign-up. Protect role changes so users cannot grant themselves reviewer privileges.

If reviewer administration is included, restrict it to an authorized administrator or reviewer role managed securely.

#### Database entities

Create migrations for tables equivalent to:

`profiles`
- id
- display_name
- avatar_url
- role
- created_at
- updated_at

`creator_profiles`
- user_id
- headline
- biography
- specializations
- availability
- pricing information
- location or timezone when provided

`portfolio_items`
- id
- creator_id
- title
- description
- media_path
- media_type
- content_type
- aspect_ratios
- tools_used
- skills_demonstrated
- workflow_notes
- commercial_use_notes
- visibility
- created_at

`tools`
- id
- name
- category

`creator_tools`
- id
- creator_id
- tool_id
- proficiency_claim
- verification_status
- evidence_path
- verified_at
- reviewed_by

`skills`
- id
- name
- category

`creator_skills`
- creator_id
- skill_id

`brands`
- user_id
- organization_name
- website
- description

`briefs`
- id
- brand_id
- title
- objective
- content_type
- style
- target_audience
- deliverables
- aspect_ratio
- duration_seconds
- resolution
- platform
- budget
- currency
- deadline
- revision_count
- commercial_use
- rights_duration
- rights_territory
- exclusivity
- reference_files
- status
- created_at
- updated_at

`shortlists`
- id
- brand_id
- creator_id
- created_at

`applications`
- id
- brief_id
- creator_id
- proposal
- status
- created_at

`invitations`
- id
- brief_id
- brand_id
- creator_id
- status
- created_at

`engagements`
- id
- brief_id
- creator_id
- brand_id
- status
- created_at
- updated_at

`deliverables`
- id
- engagement_id
- file_path
- description
- status
- submitted_at
- reviewed_at

`messages`
- id
- engagement_id
- sender_id
- body
- created_at

`verification_submissions`
- id
- creator_id
- claim_type
- claim_reference
- evidence_path
- status
- reviewer_id
- review_notes
- reviewed_at
- created_at

Adapt and normalize the schema as necessary. Add proper primary keys, foreign keys, uniqueness rules, constraints, and indexes.

Use PostgreSQL arrays or relation tables appropriately. Keep important search attributes queryable. Use JSONB for genuinely variable structured fields, not as a substitute for the entire schema.

Add a `prompt_sessions` or equivalent table only if persistent Creative Copilot history is implemented.

#### Row Level Security

Enable RLS for user-related tables and storage objects.

Define and test policies so that:

- Users may edit their own profile.
- Creators may manage their own portfolio items.
- Public portfolio records are readable only when intended to be public.
- Brands may create and manage their own briefs.
- Creators may see published, eligible briefs.
- Only authorized participants may access engagement data and messages.
- Private attachments remain private.
- Only authorized reviewers may change verification decisions.
- Users cannot grant themselves administrative permissions.

Do not use permissive policies such as unconditional read/write access on production tables.

Use the authenticated user's identity for authorization, and apply ownership checks to updates and deletes.

#### Storage

Use separate buckets or clearly separated storage policies for:

- Publicly viewable portfolio media, if intended.
- Private verification evidence.
- Private brief references.
- Engagement deliverables.

Use signed URLs for private content and validate uploaded file types and sizes.

Avoid exposing private evidence or deliverables through unrestricted public URLs.

### 16. GEMINI API INTEGRATION

Use the Gemini API for actual AI features.

Implement server-side functions with clear responsibilities, such as:

`creative-copilot`
- Handle chatbot messages.
- Maintain validated conversation context.
- Ask relevant follow-up questions.
- Generate polished image/video prompts.
- Return structured responses where appropriate.

`build-brief`
- Accept a rough campaign idea.
- Extract brief fields.
- Identify missing requirements.
- Validate the result.
- Return structured JSON for the editable brief form.

`generate-media` (optional)
- Invoke a supported image/video generation model if the configured API and account support it.
- Return real task status and output references.
- Handle generation errors and timeouts.

Do not call the Gemini service directly from browser components using a secret key.

#### Environment variables

Use server-side environment variables or Supabase Edge Function secrets:

- `GEMINI_API_KEY`
- `GEMINI_TEXT_MODEL`
- `GEMINI_MEDIA_MODEL` (optional)
- `SUPABASE_URL`
- The appropriate Supabase server-side credentials as required by the deployment.

On the frontend, expose only the necessary Supabase public or publishable configuration.

Do not expose `GEMINI_API_KEY`, Supabase secret keys, or service-role credentials in client-side code, built assets, console logs, or Git commits.

Keep the configured text and media model names separate and easy to change.

Do not hard-code a model name into multiple unrelated components. Check that the selected model and endpoint support the particular operation before invoking them.

#### AI response validation

Define a schema for the chatbot and brief builder outputs.

Validate all AI-generated fields on the server. Apply length limits and handle malformed or incomplete output gracefully.

Use function calling only when the model needs to request a permitted application action, and validate that action before executing it.

The model must not be allowed to bypass normal application authorization or change verification status, publish a brief, accept an engagement, or delete user data without an explicitly authorized application action.

#### User experience and failures

Implement:

- Loading indicators.
- Rate limits.
- Friendly API error messages.
- Graceful handling of timeouts.
- Appropriate retry behavior.
- Input validation.
- Conversation continuity.
- A useful fallback when the AI API is unavailable.

If the chatbot cannot call the model, do not return a fabricated AI result. Clearly tell the user the assistant is temporarily unavailable and preserve their draft.

### 17. SCROLL-IN ANIMATIONS AND MICROINTERACTIONS

Implement tasteful scroll-triggered animations as part of the website itself. Do not require a separate visual-animation prompt.

The animation style must feel refined, intentional, and subtle. Avoid exaggerated movement, constant bouncing, distracting parallax, or effects that make the website feel like a template.

Use Framer Motion or an equivalent lightweight approach, if compatible with the chosen stack.

#### Homepage scroll animation

Hero:
- Text fades in with a slight upward movement.
- The main artwork appears with a subtle opacity and scale transition.
- Primary and secondary CTAs appear with a gentle stagger.
- Avoid delaying access to the primary action.

Featured creators:
- Cards enter with a staggered fade and slight upward movement.
- Keep the stagger short.
- Do not animate all cards independently with excessive delays.

How-it-works section:
- Heading reveals first.
- Each step appears with a slight vertical movement.
- Use simple icons and restrained motion.

Creative Copilot preview:
- A subtle reveal as the section enters the viewport.
- Optional minimal cursor or message animation, but never simulate an actual conversation before interaction.

Trust and verification:
- Reveal the section cleanly.
- Use a small icon transition for verified states only when appropriate.

Footer:
- Simple fade-in or no animation.

#### Internal page animations

Apply subtle transitions to:
- Sidebar active states.
- Page content transitions.
- Filter panel expansion.
- Creator card hover and shortlist changes.
- Modal and dialog open/close.
- Brief-builder field updates.
- Chat message appearance.
- Loading and success states.
- Project status changes.

Animations must help explain actions, not merely decorate them.

#### Technical requirements

- Use viewport-based triggers so scroll-in animations run only when content becomes visible.
- Trigger most reveal animations once rather than replaying them continuously.
- Keep interaction animations fast and subtle.
- Avoid layout shifts.
- Respect `prefers-reduced-motion`.
- Do not block keyboard navigation or screen readers.
- Keep animation performance smooth on mobile.
- Use CSS transitions for simple effects instead of adding complex animation dependencies unnecessarily.

Never animate every paragraph, badge, line of text, or icon. The interface should feel fast even when the user scrolls quickly.

### 18. RESPONSIVE DESIGN AND ACCESSIBILITY

Build mobile-first responsive layouts.

#### Desktop
- Spacious creator grid.
- Stable filter sidebar.
- Clear, compact navigation.
- Portfolio media at suitable sizes.
- Dashboard sidebar with a consistent content area.

#### Tablet
- Collapsible filter sidebar.
- Responsive creator grid.
- Appropriate spacing and touch targets.

#### Mobile
- Single-column content where appropriate.
- Accessible menu.
- Simple filter drawer.
- Full-width form controls where useful.
- Responsive image and video previews.
- A comfortable chatbot interface.
- No horizontal scrolling on standard layouts.

Accessibility requirements:

- Semantic HTML.
- Proper form labels.
- Keyboard navigation.
- Visible focus styles.
- Accessible dialog behavior.
- Adequate color contrast.
- Accessible icons and buttons.
- Useful error announcements.
- Reduced-motion support.
- Alt text for meaningful media.
- Captions or text alternatives when available.

Do not use color as the sole indicator of status.

### 19. COMPONENT ARCHITECTURE

Build reusable components rather than duplicating UI logic across pages.

Suggested components:

- `AppShell`
- `PublicHeader`
- `DashboardSidebar`
- `MobileNavigation`
- `CreatorCard`
- `CreatorGrid`
- `CreatorProfileHeader`
- `PortfolioGallery`
- `PortfolioDetail`
- `ToolBadge`
- `SkillTag`
- `VerificationIndicator`
- `VerificationEvidencePanel`
- `SearchFilters`
- `ActiveFilterChips`
- `EmptyState`
- `LoadingSkeleton`
- `BriefForm`
- `BriefReviewPanel`
- `AIBriefBuilder`
- `CreatorMatchCard`
- `ShortlistButton`
- `CreativeCopilot`
- `PromptResult`
- `ProjectTimeline`
- `DeliverableUpload`
- `ReviewActions`
- `ConfirmDialog`
- `ToastNotification`

Centralize database access, validation, matching logic, and AI calls in dedicated modules.

Use TypeScript if supported by the existing project. Define types for creators, portfolio items, briefs, tool verification, applications, engagements, and AI responses.

Keep components readable and maintainable.

### 20. CONTENT AND DEMO DATA

Populate the app with enough realistic demo data to make the marketplace useful immediately.

Seed approximately 8–12 distinct fictional creators, with different skills, specializations, tools, formats, and portfolios.

Example creator profiles:

- An AI filmmaker specializing in cinematic product advertising.
- An AI animator creating character-driven brand campaigns.
- An AI image creator focusing on luxury and editorial visuals.
- A short-form video creator specializing in vertical social campaigns.
- A product visualization artist.
- A motion designer experienced in mixed-media projects.
- A fashion-focused generative artist.
- A storyboard and visual development specialist.

Add diverse portfolio projects such as:
- Luxury perfume advertisement.
- Premium coffee launch.
- Futuristic automotive campaign.
- Fashion editorial.
- Character animation.
- Gaming environment.
- Product key art.
- Vertical social advertisement.

Use visual assets that look professionally art-directed. Use real media files or curated royalty-safe assets with suitable usage rights.

Do not use broken image URLs or repeat the same thumbnail across the whole marketplace.

Do not invent real client endorsements, completed transactions, or verified histories. Clearly treat sample profiles and projects as demo data.

Seed multiple filter combinations, some creators with incomplete rights information, and at least one case where a search returns zero results.

Create a demonstration brief for a premium product video, with an editable draft and a functioning creator-matching flow.

The app should look populated on the first visit, while making a clear distinction between seeded demo content and real user-submitted information.

### 21. ERROR HANDLING AND POLISH

Every important action must have a working user feedback state.

Examples:

- Profile saved successfully.
- Brief published successfully.
- Verification evidence submitted.
- Creator added to shortlist.
- Invitation sent.
- Deliverable uploaded.
- Revision requested.
- AI response failed; draft preserved.

Disable repeated submissions while a request is processing where appropriate.

Handle network failures and expired sessions. Provide a retry action where useful.

Use confirmation dialogs for destructive actions.

Never show success messages before the server confirms that the operation succeeded.

Do not create fake buttons, arbitrary percentages, fake notifications, static filters disguised as functional ones, or forms that silently discard user input.

### 22. IMPLEMENTATION ORDER

Build the product in the following sequence.

**Phase 1 — Foundation**
- Inspect the current repository and toolchain.
- Establish the design tokens and global layout.
- Set up routing, reusable components, and environment configuration.
- Connect Supabase.
- Create database migrations and initial seed data.

**Phase 2 — Marketplace**
- Implement creator cards and full profiles.
- Build portfolio views.
- Implement search and all core filters.
- Add shortlist and empty-result behavior.

**Phase 3 — Brand workflow**
- Implement authentication and role-specific dashboards.
- Create the manual brief builder.
- Implement brief drafts and publishing.
- Connect briefs to creator matching.

**Phase 4 — Bonus capabilities**
- Integrate the Gemini-powered AI Brief Builder.
- Implement the Creative Copilot chatbot.
- Implement the creator evidence submission and reviewer workflow.
- Add match explanations.

**Phase 5 — Engagement workflow**
- Implement invitations and applications.
- Add the project room, deliverable submissions, and revisions.

**Phase 6 — Production-quality finish**
- Implement scroll-in animations and microinteractions.
- Complete responsive layouts.
- Test loading, error, and empty states.
- Test access controls and RLS policies.
- Test API integrations.
- Rehearse the entire demo workflow.

If time or integration access is limited, keep the P0 marketplace and brief flow working, then simplify secondary features rather than leaving the primary experience incomplete.

### 23. ACCEPTANCE CRITERIA

The website is not complete until these conditions are met:

1. A user can register, log in, and sign out through Supabase.
2. Creator and brand roles have appropriate experiences and permissions.
3. A creator can create and edit a profile.
4. A creator can add portfolio projects, skills, tools, and workflow information.
5. Portfolio media is correctly displayed.
6. Search and filters operate on actual creator data.
7. Clearing filters resets the results.
8. Empty results display a useful recovery path.
9. A brand can create, edit, save, and publish a brief.
10. The AI Brief Builder produces validated, editable brief fields.
11. The Creative Copilot can ask relevant follow-up questions and generate structured image or video prompts.
12. API failures do not destroy the user's draft or conversation.
13. Creators can submit verification evidence.
14. Only an authorized reviewer can approve verification claims.
15. Creator recommendations respect mandatory criteria and show match explanations.
16. Brands can shortlist and invite creators.
17. An engagement can progress through a basic delivery and review workflow.
18. Supabase RLS policies prevent unauthorized access to private user data.
19. Secret API keys are not exposed in frontend code.
20. The application is responsive and accessible.
21. Scroll animations are subtle and respect reduced-motion preferences.
22. No important buttons or navigation links are dead.
23. No fake verification, fabricated completed transactions, or misleading AI-generation claims are displayed.
24. The entire primary demo flow can be completed without manually editing the database.

### 24. FINAL DESIGN RULES

Keep reminding yourself of the following throughout the build:

- The website must look like a professional creative technology company designed it.
- Do not make it look AI-generated.
- Do not make it resemble a generic website-builder template.
- Do not make it look like a complicated enterprise dashboard.
- Do not add features simply to make the product appear more advanced.
- Make all important actions obvious and easy to reach.
- Use visual storytelling through the portfolio, not endless gradients and decorative cards.
- Keep the text concise and the forms understandable.
- Use animations sparingly and with purpose.
- Never sacrifice working functionality for decorative visuals.
- Do not make claims about verification, commercial rights, client history, or media generation that the system cannot substantiate.
- Make the site feel complete, polished, and reliable even when AI or media-generation APIs are unavailable.

**Final goal:** Deliver a cohesive, responsive, functional full-stack Createopia marketplace that combines beautiful AI-creator portfolios, reliable discovery, structured creative briefs, an AI-powered Creative Copilot, creator verification, and a simple engagement workflow. Build it so a first-time user can understand the product within seconds and complete the most important tasks without needing a tutorial.
# SIMPLIFY AND REDESIGN CREATEOPIA — IMPORTANT

The website you created is too complicated. I want you to simplify the existing project and make it look like a real, professional creative-tech startup website.

Do not add more features. Do not rebuild a huge enterprise dashboard. Focus on making the website beautiful, simple, fast, and genuinely usable.

Inspect the existing project first, then modify it. Preserve working integrations and useful components.

## 1. Main objective

Createopia is an AI Content Creator Marketplace connecting brands with AI filmmakers, AI animators, and AI visual artists.

The website has only three main goals:

1. Help brands discover suitable AI creators.
2. Help brands create structured creative briefs.
3. Help creators showcase their AI portfolios and capabilities.

Add two bonus features: an AI-assisted Brief Builder and creator verification signals.

Every other feature is secondary.

## 2. Keep only these main pages

**Page 1 — Homepage**

Create a beautiful, simple landing page with:
- A clean navigation bar.
- A compelling headline and short description.
- One prominent “Explore Creators” button.
- One secondary “Create a Brief” button.
- A small selection of featured creator cards.
- A short “How It Works” section.
- A compact footer.

**Page 2 — Explore Creators**

Create a clean creator discovery page with:
- A search bar.
- Simple filters for specialization, tools, skills, and content type.
- Beautiful portfolio thumbnails.
- Creator name, specialization, and tool tags.
- Accurate verification indicators.
- A clear “View Profile” action.

Filters must actually work. Show a useful empty state when no creators match.

**Page 3 — Creator Profile**

Create a portfolio-first profile with:
- Creator introduction and biography.
- Portfolio gallery.
- Skills and specializations.
- Tools and models used.
- Workflow information.
- Honest verification statuses.
- A “Shortlist” or “Invite to Brief” action.

Make the portfolio artwork the visual focus.

**Page 4 — Create a Brief**

Create one simple brief form with these fields:
- Campaign title and objective.
- Content type.
- Visual style.
- Deliverables.
- Aspect ratio and duration when applicable.
- Budget and deadline.
- Commercial-use requirements.
- Reference images.

At the top, add a small AI assistant input:

“Describe your creative idea…”

Include one button: “Build Brief with AI”.

Gemini should turn the rough idea into suggested form values. The user can edit everything before saving or publishing. Highlight missing requirements rather than inventing answers.

The homepage, creator discovery, and creator profile should remain easy to access from the main navigation.

## 3. Add a simple Creative Copilot

Do not build a separate complicated AI dashboard.

Add a small, accessible chatbot that can open from a “Creative Copilot” button.

The chatbot should:
- Ask whether the user needs an image prompt, video prompt, or campaign idea.
- Ask only the important follow-up questions.
- Generate a detailed, useful prompt.
- Provide a one-click “Copy Prompt” button.
- Allow the user to transfer relevant information into the creative brief.

Use the Gemini API through a secure server-side integration.

Do not add an elaborate chatbot interface, multiple agents, complicated settings, or unnecessary model-selection menus.

## 4. Keep the bonus features simple

**AI Brief Builder:** Turn a natural-language idea into an editable, structured brief using Gemini.

**Creator Verification:** Show three clear states:
- Self-reported.
- Evidence submitted.
- Verified.

Display Verified only when an authorized reviewer has actually approved the specific claim.

These two features are important. Do not remove them.

## 5. Simplify the backend

Use Supabase for authentication, database persistence, and portfolio storage.

Keep only the essential data:
- Users and roles.
- Creator profiles.
- Portfolio items.
- Skills and tools.
- Creative briefs.
- Shortlists.
- Verification status.
- Basic invitations, if already implemented.

Keep proper access controls and database policies. Creators must not edit other people's profiles or verify themselves.

Use the existing Supabase configuration where possible. Keep Gemini API credentials server-side.

Do not build payments, escrow, complex contracts, elaborate messaging systems, notification centers, advanced analytics, or a large project-management platform.

Those features are outside the MVP scope.

## 6. Professional UI design

Use my attached Createopia visual reference as inspiration, but simplify the layout.

Design style:
- Premium creative agency meets modern SaaS.
- Warm white or soft off-white background.
- Dark navy text.
- Restrained violet accents.
- Beautiful, cinematic portfolio images.
- Clean typography using Inter or Geist.
- Generous whitespace.
- Subtle borders and consistent spacing.
- Clear primary actions.

Use light backgrounds for most pages. Use dark navy selectively for the hero or Creative Copilot.

Do not:
- Put every element inside a card.
- Add unnecessary gradients everywhere.
- Use excessive glassmorphism or neon effects.
- Create too many sidebars or navigation items.
- Add dozens of badges.
- Show fake statistics or ratings.
- Use oversized headings on every section.
- Make the interface look like a generic AI-generated dashboard.

The design should feel handcrafted, restrained, and professionally art-directed.

## 7. Simple scroll animations

Use subtle scroll-in animations:
- Hero content fades in with slight upward movement.
- Featured creator cards reveal with a small stagger.
- Sections fade in as they enter the viewport.
- Buttons and cards have restrained hover transitions.

Keep animations fast, smooth, and minimal. Respect reduced-motion preferences.

Do not animate every element or introduce excessive parallax, bouncing, or dramatic transitions.

## 8. Make everything easy to use

A new visitor should understand the website in a few seconds.

Use clear labels, short forms, obvious buttons, responsive layouts, and useful loading and empty states.

Remove duplicated features, unnecessary routes, placeholder pages, unused components, and dead buttons.

Use a small amount of realistic demo data so the marketplace looks complete immediately. Clearly distinguish sample information from verified real-world claims.

Connect the essential actions to Supabase. Connect the Brief Builder and Creative Copilot to Gemini.

Never fake an AI response or claim an operation succeeded before it actually does.

## 9. Final implementation priority

Build in this order:

1. Beautiful homepage.
2. Working creator search and filters.
3. Professional creator portfolio pages.
4. Working creative brief form.
5. Gemini AI Brief Builder.
6. Creator verification indicators.
7. Gemini Creative Copilot chatbot.
8. Supabase authentication and persistence.
9. Responsive polish and subtle animations.

Do not add extra features unless they are necessary for these flows to work.

**Final instruction:** Make Createopia simpler, not bigger. Prioritize the portfolio, discovery, and brief creation experience. Keep both bonus features. Reuse working code, remove unnecessary complexity, and ensure the final website feels like a polished startup product that a normal person can use without instructions.