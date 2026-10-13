export type VerificationStatus = 'self_reported' | 'evidence_submitted' | 'verified';

export type UserRole = 'brand' | 'creator' | 'reviewer';

export interface User {
  id: string;
  email: string;
  role: UserRole | null;
  name: string;
  organizationName?: string;
  creatorProfileId?: string;
  onboardingCompleted?: boolean;
  onboardingGoal?: string;
  createdAt: string;
}

export interface VerificationEvidence {
  claim: string;
  evidenceType: 'node_graph' | 'screen_capture' | 'client_deliverable' | 'seed_reproducibility';
  description: string;
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  status: VerificationStatus;
  reviewerNotes?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  contentType: 'Brand Film' | 'Product Reel' | 'Commercial Short' | 'Key Visuals' | 'Virtual Production';
  aspectRatio: string;
  toolsUsed: string[];
  promptExcerpt?: string;
  clientOrProject?: string;
  year: string;
}

export interface Creator {
  id: string;
  userId?: string;
  name: string;
  handle: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  coverImageUrl: string;
  specialization: 'Filmmaking' | 'Animation' | 'Visual Art' | 'Virtual Production';
  primaryTools: string[];
  skills: string[];
  location: string;
  region?: 'North America' | 'Europe' | 'Asia-Pacific' | 'Latin America' | 'Remote';
  rateEstimate: string;
  minRate?: number;
  maxRate?: number;
  turnaroundTime?: string;
  commercialBuyoutReady?: boolean;
  seedLogsVerified?: boolean;
  availability?: 'immediate' | 'within_2_weeks' | 'flexible';
  verificationStatus: VerificationStatus;
  verificationEvidence: VerificationEvidence[];
  portfolio: PortfolioItem[];
  workflow: {
    phase: string;
    description: string;
    tools: string[];
  }[];
  featured?: boolean;
  published: boolean;
  rating?: number;
  reviewCount?: number;
  completedProjects?: number;
  isTopRated?: boolean;
  hourlyOrProjectRate?: number;
}

export interface CreativeBrief {
  id: string;
  brandId: string;
  brandName: string;
  title: string;
  objective: string;
  contentType: string;
  visualStyle: string;
  deliverables: string;
  aspectRatio: string;
  duration: string;
  budget: string;
  deadline: string;
  commercialRequirements: string;
  referenceNotes: string;
  invitedCreatorId?: string;
  missingRequirements?: string[];
  status: 'draft' | 'published';
  createdAt: string;
}

export interface DeliverableSubmission {
  id: string;
  title: string;
  fileUrl: string;
  previewUrl?: string;
  type: 'video' | 'image' | 'archive';
  submittedAt: string;
  notes?: string;
}

export interface EngagementMessage {
  id: string;
  authorRole: 'brand' | 'creator';
  authorName: string;
  message: string;
  createdAt: string;
}

export type EngagementStatus =
  | 'invited'
  | 'in_progress'
  | 'deliverables_submitted'
  | 'revision_requested'
  | 'completed'
  | 'declined';

export interface Engagement {
  id: string;
  briefId: string;
  brief: CreativeBrief;
  brandId: string;
  brandName: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  status: EngagementStatus;
  deliverables: DeliverableSubmission[];
  revisionNotes: EngagementMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface MatchResult {
  creator: Creator;
  score: number;
  matchReasons: string[];
  passesMandatory: boolean;
}

export type PageView =
  | 'home'
  | 'explore'
  | 'creator'
  | 'brief'
  | 'projects'
  | 'auth'
  | 'onboarding'
  | 'my-portfolio'
  | 'my-briefs'
  | 'shortlist'
  | 'applications';

export type AuthMode = 'sign_in' | 'sign_up' | 'forgot_password';
