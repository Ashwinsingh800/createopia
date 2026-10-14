import {
  Creator,
  CreativeBrief,
  Engagement,
  User,
  MatchResult,
  EngagementStatus,
  DeliverableSubmission,
  EngagementMessage,
} from '../types';
import {
  SEED_CREATORS,
  INITIAL_BRIEFS,
  INITIAL_ENGAGEMENTS,
  SEED_USERS,
} from '../data/seedData';

const STORAGE_KEYS = {
  USERS: 'pixelforge_users_v4',
  CURRENT_USER: 'pixelforge_current_user_v4',
  CREDENTIALS: 'pixelforge_credentials_v1',
  CREATORS: 'pixelforge_creators_v4',
  BRIEFS: 'pixelforge_briefs_v4',
  ENGAGEMENTS: 'pixelforge_engagements_v4',
  SHORTLIST: 'pixelforge_shortlist_v4',
};

export const StorageService = {
  // ---- USERS & AUTH ----
  async hashPassword(password: string): Promise<string> {
    const data = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  },

  getUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
    return SEED_USERS;
  },

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return null;
  },

  setCurrentUser(user: User | null): void {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    }
  },

  registerUser(
    email: string,
    role: 'brand' | 'creator',
    name: string,
    organizationName?: string
  ): User {
    const users = this.getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      email: email.trim().toLowerCase(),
      role,
      name: name.trim(),
      organizationName: role === 'brand' ? organizationName?.trim() : undefined,
      onboardingCompleted: true,
      onboardingGoal: 'Getting started',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updated = [...users, newUser];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
    this.setCurrentUser(newUser);
    return newUser;
  },

  signInUser(email: string): User {
    const users = this.getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!existing) {
      throw new Error('No account found with this email. Please check your credentials or create an account.');
    }
    this.setCurrentUser(existing);
    return existing;
  },

  async registerUserWithPassword(
    email: string,
    password: string,
    role: 'brand' | 'creator',
    name: string,
    organizationName?: string
  ): Promise<User> {
    const user = this.registerUser(email, role, name, organizationName);
    const credentials = JSON.parse(localStorage.getItem(STORAGE_KEYS.CREDENTIALS) || '{}') as Record<string, string>;
    credentials[user.email] = await this.hashPassword(password);
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials));
    return user;
  },

  async authenticateUser(email: string, password: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.getUsers().find((candidate) => candidate.email.toLowerCase() === normalizedEmail);
    if (!user) throw new Error('No account found with this email. Please sign up first.');

    const credentials = JSON.parse(localStorage.getItem(STORAGE_KEYS.CREDENTIALS) || '{}') as Record<string, string>;
    const storedHash = credentials[normalizedEmail];
    if (!storedHash || storedHash !== await this.hashPassword(password)) {
      throw new Error('Incorrect email or password.');
    }
    this.setCurrentUser(user);
    return user;
  },

  signOut(): void {
    this.setCurrentUser(null);
  },

  updateUserProfile(userId: string, updates: Partial<User>): User {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) throw new Error('User not found');
    const updated = { ...users[index], ...updates };
    users[index] = updated;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    const current = this.getCurrentUser();
    if (current?.id === userId) {
      this.setCurrentUser(updated);
    }
    return updated;
  },

  // ---- CREATORS ----
  getCreators(): Creator[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CREATORS);
      if (data) {
        const creators = JSON.parse(data) as Creator[];
        const updatedCreators = creators.map((creator) => ({
          ...creator,
          portfolio: creator.portfolio.map((item) =>
            item.id === 'p-luna-1' && !item.videoUrl
              ? { ...item, videoUrl: '/creatopia-portfolio-showcase.mp4' }
              : (item.id === 'p-df-1' || item.id === 'p-4') && !item.videoUrl
              ? { ...item, videoUrl: '/creatopia-forest-showcase.mp4' }
              : (item.id === 'p-byte-1' || item.id === 'p-5') && !item.videoUrl
              ? { ...item, videoUrl: '/woman-hologram-city.mp4' }
              : (item.id === 'p-neon-1' || item.id === 'p-3' || item.id === 'p-zara-1') && !item.videoUrl
              ? { ...item, videoUrl: '/woman-industrial-hall.mp4' }
              : item.id === 'p-leo-1' && !item.videoUrl
              ? { ...item, videoUrl: '/operative-aims-rifle-corridor.mp4' }
              : item.id === 'p-1' && !item.videoUrl
              ? { ...item, videoUrl: '/operative-aims-rifle-corridor.mp4' }
              : item
          ),
        }));
        if (JSON.stringify(updatedCreators) !== JSON.stringify(creators)) {
          localStorage.setItem(STORAGE_KEYS.CREATORS, JSON.stringify(updatedCreators));
        }
        return updatedCreators;
      }
    } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.CREATORS, JSON.stringify(SEED_CREATORS));
    return SEED_CREATORS;
  },

  getCreatorById(id: string): Creator | undefined {
    return this.getCreators().find((c) => c.id === id);
  },

  getCreatorByUserId(userId: string): Creator | undefined {
    return this.getCreators().find((c) => c.userId === userId);
  },

  saveCreator(creator: Creator): Creator[] {
    const creators = this.getCreators();
    const index = creators.findIndex((c) => c.id === creator.id);
    let updated: Creator[];
    if (index >= 0) {
      updated = [...creators];
      updated[index] = creator;
    } else {
      updated = [...creators, creator];
    }
    localStorage.setItem(STORAGE_KEYS.CREATORS, JSON.stringify(updated));
    return updated;
  },

  updateCreatorVerification(
    creatorId: string,
    status: Creator['verificationStatus'],
    reviewerNote?: string
  ): Creator[] {
    const creators = this.getCreators();
    const updated = creators.map((c) => {
      if (c.id === creatorId) {
        const evidenceList = [...c.verificationEvidence];
        if (evidenceList.length > 0) {
          evidenceList[0] = {
            ...evidenceList[0],
            status,
            verifiedAt: status === 'verified' ? new Date().toISOString().split('T')[0] : undefined,
            verifiedBy: status === 'verified' ? 'Creatopia Editorial Board (Authorized)' : undefined,
            reviewerNotes:
              reviewerNote ||
              (status === 'verified'
                ? 'Approved by authorized reviewer based on submitted workflow files.'
                : 'Under active technical review.'),
          };
        }
        return {
          ...c,
          verificationStatus: status,
          verificationEvidence: evidenceList,
        };
      }
      return c;
    });
    localStorage.setItem(STORAGE_KEYS.CREATORS, JSON.stringify(updated));
    return updated;
  },

  // ---- BRIEFS ----
  getBriefs(): CreativeBrief[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BRIEFS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.BRIEFS, JSON.stringify(INITIAL_BRIEFS));
    return INITIAL_BRIEFS;
  },

  getBriefById(id: string): CreativeBrief | undefined {
    return this.getBriefs().find((b) => b.id === id);
  },

  saveBrief(brief: CreativeBrief): CreativeBrief[] {
    const briefs = this.getBriefs();
    const index = briefs.findIndex((b) => b.id === brief.id);
    let updated: CreativeBrief[];
    if (index >= 0) {
      updated = [...briefs];
      updated[index] = brief;
    } else {
      updated = [brief, ...briefs];
    }
    localStorage.setItem(STORAGE_KEYS.BRIEFS, JSON.stringify(updated));
    return updated;
  },

  // ---- SHORTLIST ----
  getShortlist(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SHORTLIST);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return [];
  },

  toggleShortlist(creatorId: string): string[] {
    const current = this.getShortlist();
    const exists = current.includes(creatorId);
    const updated = exists ? current.filter((id) => id !== creatorId) : [...current, creatorId];
    localStorage.setItem(STORAGE_KEYS.SHORTLIST, JSON.stringify(updated));
    return updated;
  },

  isShortlisted(creatorId: string): boolean {
    return this.getShortlist().includes(creatorId);
  },

  // ---- ENGAGEMENTS / PROJECTS ----
  getEngagements(): Engagement[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENGAGEMENTS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.ENGAGEMENTS, JSON.stringify(INITIAL_ENGAGEMENTS));
    return INITIAL_ENGAGEMENTS;
  },

  getEngagementById(id: string): Engagement | undefined {
    return this.getEngagements().find((e) => e.id === id);
  },

  createEngagement(brief: CreativeBrief, creator: Creator, brand: User): Engagement {
    const engagements = this.getEngagements();
    const newEng: Engagement = {
      id: 'eng-' + Date.now(),
      briefId: brief.id,
      brief,
      brandId: brand.id,
      brandName: brand.organizationName || brand.name,
      creatorId: creator.id,
      creatorName: creator.name,
      creatorAvatar: creator.avatarUrl,
      status: 'invited',
      deliverables: [],
      revisionNotes: [
        {
          id: 'msg-' + Date.now(),
          authorRole: 'brand',
          authorName: brand.name,
          message: `Hello ${creator.name}, we are excited to invite you to collaborate on "${brief.title}". Looking forward to your response!`,
          createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        },
      ],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newEng, ...engagements];
    localStorage.setItem(STORAGE_KEYS.ENGAGEMENTS, JSON.stringify(updated));
    return newEng;
  },

  updateEngagementStatus(engagementId: string, status: EngagementStatus): Engagement {
    const engagements = this.getEngagements();
    const index = engagements.findIndex((e) => e.id === engagementId);
    if (index === -1) throw new Error('Engagement not found');

    const updatedEng: Engagement = {
      ...engagements[index],
      status,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    engagements[index] = updatedEng;
    localStorage.setItem(STORAGE_KEYS.ENGAGEMENTS, JSON.stringify(engagements));
    return updatedEng;
  },

  addDeliverable(engagementId: string, deliverable: DeliverableSubmission): Engagement {
    const engagements = this.getEngagements();
    const index = engagements.findIndex((e) => e.id === engagementId);
    if (index === -1) throw new Error('Engagement not found');

    const updatedEng: Engagement = {
      ...engagements[index],
      status: 'deliverables_submitted',
      deliverables: [...engagements[index].deliverables, deliverable],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    engagements[index] = updatedEng;
    localStorage.setItem(STORAGE_KEYS.ENGAGEMENTS, JSON.stringify(engagements));
    return updatedEng;
  },

  addEngagementMessage(engagementId: string, message: EngagementMessage): Engagement {
    const engagements = this.getEngagements();
    const index = engagements.findIndex((e) => e.id === engagementId);
    if (index === -1) throw new Error('Engagement not found');

    const updatedEng: Engagement = {
      ...engagements[index],
      revisionNotes: [...engagements[index].revisionNotes, message],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    engagements[index] = updatedEng;
    localStorage.setItem(STORAGE_KEYS.ENGAGEMENTS, JSON.stringify(engagements));
    return updatedEng;
  },

  // ---- CREATOR MATCHING ALGORITHM ----
  // Matches creators to a brief or filters, applying mandatory constraints first
  matchCreators(
    brief: Partial<CreativeBrief>,
    creatorsList?: Creator[]
  ): MatchResult[] {
    const all = creatorsList || this.getCreators();

    return all
      .map((creator) => {
        let score = 50; // base compatibility
        const reasons: string[] = [];
        let passesMandatory = true;

        // 1. Mandatory constraint: Specialization compatibility
        if (brief.contentType) {
          const ct = brief.contentType.toLowerCase();
          const spec = creator.specialization.toLowerCase();

          if (ct.includes('film') || ct.includes('commercial')) {
            if (spec === 'filmmaking' || spec === 'animation') {
              score += 25;
              reasons.push(`Specializes in ${creator.specialization} for commercial video production`);
            } else if (spec === 'virtual production') {
              score += 15;
              reasons.push('Has high-end virtual production plate capabilities');
            }
          } else if (ct.includes('visual') || ct.includes('fashion') || ct.includes('still')) {
            if (spec === 'visual art') {
              score += 30;
              reasons.push('Primary specialization is high-concept visual art & key visuals');
            }
          } else if (ct.includes('3d') || ct.includes('motion')) {
            if (spec === 'animation' || spec === 'virtual production') {
              score += 25;
              reasons.push('Experienced in procedural 3D motion and particle simulation');
            }
          }
        }

        // 2. Style matching
        if (brief.visualStyle) {
          const vs = brief.visualStyle.toLowerCase();
          const bioMatches = creator.bio.toLowerCase().includes(vs.slice(0, 8));
          const skillMatches = creator.skills.some((s) =>
            vs.includes(s.toLowerCase().slice(0, 6))
          );
          if (bioMatches || skillMatches) {
            score += 20;
            reasons.push(`Matches art direction cues ("${brief.visualStyle}")`);
          }
        }

        // 3. Tool proficiency matching
        if (creator.primaryTools && creator.primaryTools.length > 0) {
          reasons.push(`Mastery of ${creator.primaryTools.slice(0, 2).join(' & ')}`);
          score += 10;
        }

        // 4. Verification bonus
        if (creator.verificationStatus === 'verified') {
          score += 15;
          reasons.push('Verified workflow files and reproducibility seeds audited by reviewer');
        } else if (creator.verificationStatus === 'evidence_submitted') {
          score += 5;
          reasons.push('Submitted technical evidence under active review');
        }

        // 5. Portfolio format compatibility
        if (brief.aspectRatio) {
          const hasAspect = creator.portfolio.some(
            (p) => p.aspectRatio === brief.aspectRatio
          );
          if (hasAspect) {
            score += 10;
            reasons.push(`Direct experience delivering in ${brief.aspectRatio} format`);
          }
        }

        return {
          creator,
          score,
          matchReasons: reasons.slice(0, 3),
          passesMandatory,
        };
      })
      .sort((a, b) => b.score - a.score);
  },
};
