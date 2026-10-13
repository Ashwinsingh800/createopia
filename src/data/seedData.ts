import { Creator, CreativeBrief, Engagement, User } from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'user-brand-1',
    email: 'brand@lumina.studio',
    role: 'brand',
    name: 'Sarah Jenkins',
    organizationName: 'Lumina Creative Studio',
    onboardingCompleted: true,
    onboardingGoal: 'Find the right AI creator for a project',
    createdAt: '2026-09-01',
  },
  {
    id: 'user-creator-1',
    email: 'elena@elenafilm.ai',
    role: 'creator',
    name: 'Elena Rostova',
    creatorProfileId: 'elena-rostova',
    onboardingCompleted: true,
    onboardingGoal: 'Showcase my AI creative work',
    createdAt: '2026-09-10',
  },
  {
    id: 'user-creator-2',
    email: 'marcus@marcusvance.art',
    role: 'creator',
    name: 'Marcus Vance',
    creatorProfileId: 'marcus-vance',
    onboardingCompleted: true,
    onboardingGoal: 'Find ambitious brand projects',
    createdAt: '2026-09-12',
  },
  {
    id: 'user-creator-luna',
    email: 'luna@lunavisuals.ai',
    role: 'creator',
    name: 'Luna Visuals',
    creatorProfileId: 'luna-visuals',
    onboardingCompleted: true,
    onboardingGoal: 'Showcase my AI creative work',
    createdAt: '2026-08-15',
  },
];

export const SEED_CREATORS: Creator[] = [
  {
    id: 'luna-visuals',
    userId: 'user-creator-luna',
    name: 'Luna Visuals',
    handle: '@lunavisuals',
    tagline: 'AI Filmmaker & Visual Storyteller',
    bio: 'Pioneering director crafting cinematic narratives and broadcast-ready brand films with Runway Gen-3 and Midjourney. Over 12+ completed commercial projects for global lifestyle and automotive brands.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: '/src/assets/images/hero_cinematic_film_1791881136552.jpg',
    specialization: 'Filmmaking',
    primaryTools: ['Runway Gen-3', 'Midjourney v6', 'Pika'],
    skills: ['Video Generation', 'Prompt Engineering', 'Storyboarding', 'AI Filmmaking'],
    location: 'Remote · Joined 2023',
    region: 'Remote',
    rateEstimate: '$3,500 - $6,000 / project',
    minRate: 3500,
    maxRate: 6000,
    turnaroundTime: '1-2 weeks',
    commercialBuyoutReady: true,
    seedLogsVerified: true,
    availability: 'immediate',
    verificationStatus: 'verified',
    featured: true,
    published: true,
    rating: 4.9,
    reviewCount: 124,
    completedProjects: 18,
    isTopRated: true,
    verificationEvidence: [
      {
        claim: 'Runway Gen-3 Commercial Generation Seeds & Timeline Passes',
        evidenceType: 'seed_reproducibility',
        description: 'Verified prompt seeds and motion parameters for award-winning commercial spot.',
        submittedAt: '2026-09-01',
        verifiedAt: '2026-09-04',
        verifiedBy: 'Createopia Editorial Board',
        status: 'verified',
        reviewerNotes: 'Seeds verified and reproduced. Commercial buyout release checked.'
      }
    ],
    workflow: [
      {
        phase: '1. Ideation & Prompting',
        description: 'Style concept exploration and character turnaround prompt seeds in Midjourney v6.',
        tools: ['Midjourney v6.1']
      },
      {
        phase: '2. Generation & Refinement',
        description: 'Motion passes in Runway Gen-3 with custom camera direction and motion brush masking.',
        tools: ['Runway Gen-3']
      },
      {
        phase: '3. Editing & Post-Production',
        description: '4K master upscaling and grain grading for broadcast distribution.',
        tools: ['Topaz Video AI', 'DaVinci Resolve']
      }
    ],
    portfolio: [
      {
        id: 'p-luna-1',
        title: 'Chronos: The Origin of Time',
        description: 'Cinematic widescreen spec commercial exploring time dilation and gravity.',
        imageUrl: '/src/assets/images/hero_cinematic_film_1791881136552.jpg',
        videoUrl: '/createopia-portfolio-showcase.mp4',
        contentType: 'Brand Film',
        aspectRatio: '16:9',
        toolsUsed: ['Runway Gen-3', 'Midjourney v6.1'],
        promptExcerpt: 'Cinematic widescreen 35mm film still, sci-fi reconnaissance officer navigating corridor, anamorphic blue lens flare, volumetric steam, 8k DaVinci graded.',
        clientOrProject: 'Global Spec Campaign',
        year: '2026'
      }
    ]
  },
  {
    id: 'bytecanvas',
    name: 'ByteCanvas',
    handle: '@bytecanvas',
    tagline: 'AI Animator & Motion Designer',
    bio: 'Motion specialist creating dynamic 2D and 3D character animation loops, fluid motion dynamics, and expressive music video sequences with Stable Diffusion and Pika.',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: '/src/assets/images/portfolio_cyber_cinema_1791881136586.jpg',
    specialization: 'Animation',
    primaryTools: ['Pika', 'Stable Diffusion', 'ComfyUI'],
    skills: ['Animation', 'Character Consistency', 'Motion Graphics', 'Image Editing'],
    location: 'Toronto · Joined 2024',
    region: 'North America',
    rateEstimate: '$2,800 - $5,200 / project',
    minRate: 2800,
    maxRate: 5200,
    turnaroundTime: '2-3 weeks',
    commercialBuyoutReady: true,
    seedLogsVerified: true,
    availability: 'within_2_weeks',
    verificationStatus: 'verified',
    featured: true,
    published: true,
    rating: 4.8,
    reviewCount: 98,
    completedProjects: 14,
    isTopRated: false,
    verificationEvidence: [
      {
        claim: 'ComfyUI AnimateDiff Node Workflow Verification',
        evidenceType: 'node_graph',
        description: 'Validated zero-flicker character animation graph with ControlNet OpenPose.',
        submittedAt: '2026-08-15',
        verifiedAt: '2026-08-18',
        verifiedBy: 'Createopia Technical Review Committee',
        status: 'verified',
        reviewerNotes: 'Verified prompt node graph authenticity.'
      }
    ],
    workflow: [
      {
        phase: '1. Character Rigging in Diffusers',
        description: 'Build open-pose seed constraints in ComfyUI for seamless frame-by-frame character consistency.',
        tools: ['Stable Diffusion', 'ComfyUI']
      },
      {
        phase: '2. Motion Simulation',
        description: 'Generate motion in Pika and AnimateDiff.',
        tools: ['Pika Labs', 'AnimateDiff']
      }
    ],
    portfolio: [
      {
        id: 'p-byte-1',
        title: 'Neon Odyssey Character Sequences',
        description: 'Stylized 3D character animation test with vibrant city backdrop.',
        imageUrl: '/src/assets/images/portfolio_cyber_cinema_1791881136586.jpg',
        contentType: 'Commercial Short',
        aspectRatio: '16:9',
        toolsUsed: ['Pika', 'Stable Diffusion', 'ComfyUI'],
        promptExcerpt: 'Stylized cybernetic character running on neon rain street, anime-cinematic hybrid, 60fps motion coherence.',
        clientOrProject: 'Indie Studio Short',
        year: '2026'
      }
    ]
  },
  {
    id: 'neon-muse',
    name: 'NeonMuse',
    handle: '@neonmuse',
    tagline: 'Generative Artist & Concept Designer',
    bio: 'Digital illustrator and visual artist blending surreal cyberpunk aesthetics with high-concept editorial imagery. Specializes in key art, book covers, and concept design.',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: '/src/assets/images/portfolio_surreal_fashion_1791881137083.jpg',
    specialization: 'Visual Art',
    primaryTools: ['Midjourney v6', 'DALL-E 3', 'FLUX.1'],
    skills: ['Prompt Engineering', 'Image Editing', 'Lighting Simulation'],
    location: 'New York · Joined 2024',
    region: 'North America',
    rateEstimate: '$2,200 - $4,500 / project',
    minRate: 2200,
    maxRate: 4500,
    turnaroundTime: '1-2 weeks',
    commercialBuyoutReady: true,
    seedLogsVerified: false,
    availability: 'immediate',
    verificationStatus: 'self_reported',
    featured: true,
    published: true,
    rating: 4.7,
    reviewCount: 76,
    completedProjects: 11,
    isTopRated: true,
    verificationEvidence: [
      {
        claim: 'Midjourney v6 Master Prompt Recipes and Inpainting Layers',
        evidenceType: 'screen_capture',
        description: 'Self-reported workflow documentation for editorial fashion cover art.',
        submittedAt: '2026-10-01',
        status: 'self_reported',
        reviewerNotes: 'Awaiting raw PSD file validation.'
      }
    ],
    workflow: [
      {
        phase: '1. Prompt Exploration',
        description: 'Iterative generation in Midjourney v6 and DALL-E 3.',
        tools: ['Midjourney v6', 'DALL-E 3']
      }
    ],
    portfolio: [
      {
        id: 'p-neon-1',
        title: 'Iridescent Cyber Couture',
        description: 'Sculptural digital editorial piece with titanium fabrics.',
        imageUrl: '/src/assets/images/portfolio_surreal_fashion_1791881137083.jpg',
        contentType: 'Key Visuals',
        aspectRatio: '4:3',
        toolsUsed: ['Midjourney v6', 'Photoshop'],
        promptExcerpt: 'Avant-garde runway sculpture, metallic titanium blue lamé, dark industrial warehouse, Leica 35mm f/1.4.',
        year: '2026'
      }
    ]
  },
  {
    id: 'dreamforge-studio',
    name: 'DreamForge Studio',
    handle: '@dreamforge',
    tagline: 'AI Visual Effects & Procedural Worlds',
    bio: 'Collective of senior VFX artists integrating generative diffusion models directly into commercial production pipelines. Specialists in photorealistic volumetric lighting, water simulations, and complex destruction physics.',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: '/src/assets/images/portfolio_bioluminescent_nature_1791881135764.jpg',
    specialization: 'Animation',
    primaryTools: ['Runway Gen-3', 'ComfyUI', 'Houdini FX'],
    skills: ['3D Modeling', 'Video Generation', 'Particle Simulation', 'Animation'],
    location: 'London · Joined 2023',
    region: 'Europe',
    rateEstimate: '$4,500 - $8,500 / project',
    minRate: 4500,
    maxRate: 8500,
    turnaroundTime: '2-4 weeks',
    commercialBuyoutReady: true,
    seedLogsVerified: true,
    availability: 'flexible',
    verificationStatus: 'verified',
    featured: true,
    published: true,
    rating: 4.9,
    reviewCount: 160,
    completedProjects: 22,
    isTopRated: true,
    verificationEvidence: [
      {
        claim: 'Houdini FX Node Graph Combined with Latent Diffusion Passes',
        evidenceType: 'node_graph',
        description: 'Verified node graph combining procedural pyro particles with Runway Gen-3 video output.',
        submittedAt: '2026-09-05',
        verifiedAt: '2026-09-08',
        verifiedBy: 'Createopia Technical Review Committee',
        status: 'verified',
        reviewerNotes: 'Verified against studio pipeline project.'
      }
    ],
    workflow: [
      {
        phase: '1. Procedural Simulation',
        description: 'Simulate particle dynamics in Houdini FX.',
        tools: ['Houdini FX']
      },
      {
        phase: '2. Neural Diffusion Reskinning',
        description: 'Texture and relight using custom ControlNet passes in ComfyUI.',
        tools: ['ComfyUI', 'Runway Gen-3']
      }
    ],
    portfolio: [
      {
        id: 'p-df-1',
        title: 'Bioluminescent Canopy Spec Commercial',
        description: 'Living enchanted jungle with fluid light currents.',
        imageUrl: '/src/assets/images/portfolio_bioluminescent_nature_1791881135764.jpg',
        videoUrl: '/createopia-forest-showcase.mp4',
        contentType: 'Product Reel',
        aspectRatio: '4:3',
        toolsUsed: ['Runway Gen-3', 'ComfyUI'],
        promptExcerpt: 'Bioluminescent glowing forest, river reflections, volumetric night lighting, 8k documentary.',
        year: '2026'
      }
    ]
  },
  {
    id: 'elena-rostova',
    userId: 'user-creator-1',
    name: 'Elena Rostova',
    handle: '@elenafilm.ai',
    tagline: 'Cinematic AI Director & Spec Commercial Creator',
    bio: 'Former documentary cinematographer transitioned to high-concept AI filmmaking. Specializes in anamorphic camera motion, photorealistic skin textures, and end-to-end commercial pipelines combining Runway Gen-3 with custom DaVinci color grades.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: '/src/assets/images/hero_cinematic_film_1791881136552.jpg',
    specialization: 'Filmmaking',
    primaryTools: ['Runway Gen-3', 'Midjourney v6', 'DaVinci Resolve', 'Topaz Video AI'],
    skills: ['Video Generation', 'Anamorphic Cinematography', 'Color Grading', 'Sound Design'],
    location: 'Berlin & London',
    region: 'Europe',
    rateEstimate: '$4,000 - $8,000 / project',
    minRate: 4000,
    maxRate: 8000,
    turnaroundTime: '2-3 weeks',
    commercialBuyoutReady: true,
    seedLogsVerified: true,
    availability: 'within_2_weeks',
    verificationStatus: 'verified',
    featured: true,
    published: true,
    rating: 4.9,
    reviewCount: 142,
    completedProjects: 19,
    isTopRated: true,
    verificationEvidence: [
      {
        claim: 'Original 4K DaVinci Resolve Master Timeline & Node Graph',
        evidenceType: 'screen_capture',
        description: 'Verified raw timeline export with original 24fps frame interpolation, audio multi-track mix, and color grading tree.',
        submittedAt: '2026-09-12',
        verifiedAt: '2026-09-15',
        verifiedBy: 'Createopia Editorial Board (Lead Reviewer: M. Chen)',
        status: 'verified',
        reviewerNotes: 'Verified against DaVinci project archive. No stock footage substitution detected.'
      }
    ],
    workflow: [
      {
        phase: '1. Concept & Character Seed Anchor',
        description: 'Generate high-fidelity character turnaround sheets in Midjourney v6 with fixed seed anchors for facial structural continuity.',
        tools: ['Midjourney v6.1']
      },
      {
        phase: '2. Motion Dynamics & Camera Blocking',
        description: 'Rig shot sequences using Runway Gen-3 with manual camera speed controls (slow dolly zoom, pan left, rack focus).',
        tools: ['Runway Gen-3']
      },
      {
        phase: '3. Frame Upscaling & Grain Matching',
        description: 'Enhance motion frames to 4K resolution using Topaz Video AI with custom 35mm film grain overlay to eliminate plastic texture.',
        tools: ['Topaz Video AI', 'DaVinci Resolve Studio']
      }
    ],
    portfolio: [
      {
        id: 'p-1',
        title: 'Sector 7G: Spec Sci-Fi Narrative',
        description: 'An atmospheric sci-fi short focusing on deep corridor tension and anamorphic lens flares.',
        imageUrl: '/src/assets/images/hero_cinematic_film_1791881136552.jpg',
        contentType: 'Brand Film',
        aspectRatio: '16:9',
        toolsUsed: ['Runway Gen-3', 'Midjourney v6.1', 'DaVinci Resolve'],
        promptExcerpt: 'Cinematic widescreen 35mm film still, sci-fi reconnaissance officer navigating corridor, anamorphic blue lens flare, volumetric steam, 8k DaVinci graded.',
        clientOrProject: 'Independent Spec Film',
        year: '2026'
      }
    ]
  },
  {
    id: 'marcus-vance',
    userId: 'user-creator-2',
    name: 'Marcus Vance',
    handle: '@marcusvance.art',
    tagline: 'High-Fashion AI Visual Artist & Haute Couture Stylist',
    bio: 'Art director with 8 years in luxury fashion. Produces surreal avant-garde digital editorial spreads and high-concept product visualizations that challenge physical materiality and textile limits.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: '/src/assets/images/portfolio_surreal_fashion_1791881137083.jpg',
    specialization: 'Visual Art',
    primaryTools: ['Midjourney v6', 'FLUX.1', 'Photoshop CC', 'Magnific AI'],
    skills: ['Image Editing', 'Prompt Engineering', 'Luxury Fashion Direction', 'Textile Synthesis'],
    location: 'Paris & Milan',
    region: 'Europe',
    rateEstimate: '$2,500 - $5,000 / project',
    minRate: 2500,
    maxRate: 5000,
    turnaroundTime: '1-2 weeks',
    commercialBuyoutReady: true,
    seedLogsVerified: true,
    availability: 'immediate',
    verificationStatus: 'verified',
    featured: true,
    published: true,
    rating: 4.8,
    reviewCount: 89,
    completedProjects: 15,
    isTopRated: true,
    verificationEvidence: [
      {
        claim: 'Original Multi-Layer High-Res PSD with Non-Destructive Retouching',
        evidenceType: 'screen_capture',
        description: 'Provided layered source files with frequency separation passes and lighting adjustment layers.',
        submittedAt: '2026-08-20',
        verifiedAt: '2026-08-23',
        verifiedBy: 'Createopia Editorial Board',
        status: 'verified',
        reviewerNotes: 'Verified authentic working file with proprietary grading curve.'
      }
    ],
    workflow: [
      {
        phase: '1. Silhouette & Fabric Moodboard',
        description: 'Develop tactile lighting prompts emphasizing metallic lamé, sheer silk organza, and architectural tailoring.',
        tools: ['FLUX.1 Pro', 'Midjourney v6']
      }
    ],
    portfolio: [
      {
        id: 'p-3',
        title: 'Chrysalis: Architectural Couture',
        description: 'Avant-garde sculptural garment exploring iridescent metallic ribs and chiaroscuro warehouse lighting.',
        imageUrl: '/src/assets/images/portfolio_surreal_fashion_1791881137083.jpg',
        contentType: 'Key Visuals',
        aspectRatio: '4:3',
        toolsUsed: ['FLUX.1', 'Magnific AI', 'Photoshop'],
        promptExcerpt: 'Avant-garde sculptural runway garment, iridescent blue titanium ribbing, stark concrete warehouse studio, Leica 35mm f/1.4.',
        year: '2026'
      }
    ]
  },
  {
    id: 'sora-takahashi',
    name: 'Sora Takahashi',
    handle: '@soratakahashi.motion',
    tagline: 'Bioluminescent Worlds & 3D Generative Animator',
    bio: 'Specialist in organic procedural animation and ethereal natural environments. Merges ComfyUI animated diffusions with Houdini particle systems to create breathtaking brand worlds for climate and wellness innovators.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: '/src/assets/images/portfolio_bioluminescent_nature_1791881135764.jpg',
    specialization: 'Animation',
    primaryTools: ['ComfyUI', 'Kling 1.5', 'Houdini FX', 'After Effects'],
    skills: ['Animation', '3D Modeling', 'Particle Simulation', 'Video Generation'],
    location: 'Tokyo & San Francisco',
    region: 'Asia-Pacific',
    rateEstimate: '$3,500 - $7,000 / project',
    minRate: 3500,
    maxRate: 7000,
    turnaroundTime: '2-3 weeks',
    commercialBuyoutReady: true,
    seedLogsVerified: true,
    availability: 'within_2_weeks',
    verificationStatus: 'evidence_submitted',
    featured: true,
    published: true,
    rating: 4.9,
    reviewCount: 115,
    completedProjects: 16,
    isTopRated: false,
    verificationEvidence: [
      {
        claim: 'ComfyUI Workflow JSON Node Architecture with Custom AnimateDiff Checkpoints',
        evidenceType: 'node_graph',
        description: 'Full JSON workflow containing ControlNet Depth models and custom latent upscaler chains.',
        submittedAt: '2026-10-02',
        status: 'evidence_submitted',
        reviewerNotes: 'Under review by technical evaluation committee. Node execution verified.'
      }
    ],
    workflow: [
      {
        phase: '1. Latent Spatial Mapping',
        description: 'Generate depth and normal maps using custom LoRA models.',
        tools: ['ComfyUI', 'SDXL']
      }
    ],
    portfolio: [
      {
        id: 'p-4',
        title: 'Lumina Nocturna: Living Forest',
        description: 'A tranquil twilight forest where flora illuminates in harmony with water currents.',
        imageUrl: '/src/assets/images/portfolio_bioluminescent_nature_1791881135764.jpg',
        videoUrl: '/createopia-forest-showcase.mp4',
        contentType: 'Product Reel',
        aspectRatio: '4:3',
        toolsUsed: ['ComfyUI', 'AnimateDiff', 'Kling 1.5'],
        promptExcerpt: 'Ethereal bioluminescent forest twilight, glowing mushrooms and ferns, crystal river reflections.',
        year: '2026'
      }
    ]
  },
  {
    id: 'kai-araujo',
    name: 'Kai Araújo',
    handle: '@kaiaraujo.vp',
    tagline: 'Virtual Production & Unreal Engine 5 AI Integrator',
    bio: 'Virtual production supervisor merging real-time Unreal Engine 5 LED volume plates with GenAI background generation. Crafts seamless physical-to-virtual transitions for global commercial sets.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: '/src/assets/images/portfolio_cyber_cinema_1791881136586.jpg',
    specialization: 'Virtual Production',
    primaryTools: ['Unreal Engine 5', 'Sora', 'Runway Gen-3', 'ComfyUI'],
    skills: ['3D Modeling', 'Video Generation', 'Virtual Production', 'AI Previz'],
    location: 'São Paulo & Los Angeles',
    region: 'Latin America',
    rateEstimate: '$5,000 - $10,000 / project',
    minRate: 5000,
    maxRate: 10000,
    turnaroundTime: '3-4 weeks',
    commercialBuyoutReady: true,
    seedLogsVerified: false,
    availability: 'flexible',
    verificationStatus: 'self_reported',
    featured: false,
    published: true,
    rating: 4.7,
    reviewCount: 64,
    completedProjects: 9,
    isTopRated: false,
    verificationEvidence: [
      {
        claim: 'Unreal Engine 5 Virtual Production Set Environment Integration',
        evidenceType: 'client_deliverable',
        description: 'Self-reported capability in generating high-resolution 360-degree EXR panoramas for in-camera visual effects.',
        submittedAt: '2026-10-08',
        status: 'self_reported',
        reviewerNotes: 'Awaiting evidence submission.'
      }
    ],
    workflow: [
      {
        phase: '1. Rapid AI Pre-Visualization',
        description: 'Generate 50 scene variants in minutes.',
        tools: ['Runway Gen-3', 'Midjourney']
      }
    ],
    portfolio: [
      {
        id: 'p-5',
        title: 'Neo-Tokyo Rainy Street Volume',
        description: 'A dynamic LED volume background for a commercial shoot with interactive water reflections.',
        imageUrl: '/src/assets/images/portfolio_cyber_cinema_1791881136586.jpg',
        contentType: 'Virtual Production',
        aspectRatio: '4:3',
        toolsUsed: ['Unreal Engine 5', 'Runway Gen-3', 'ComfyUI'],
        promptExcerpt: 'Cyberpunk rain night street, neon signage Japanese typography, reflective puddles.',
        year: '2026'
      }
    ]
  },
  {
    id: 'zara-chen',
    name: 'Zara Chen',
    handle: '@zarachen.art',
    tagline: 'Hyperreal Generative Art & Key Visual Specialist',
    bio: 'Award-winning digital artist creating high-end key visuals and brand campaign stills with FLUX.1 and Midjourney v6. Specializes in luxury cosmetics, luxury tech, and editorial print visual assets.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: '/src/assets/images/portfolio_surreal_fashion_1791881137083.jpg',
    specialization: 'Visual Art',
    primaryTools: ['FLUX.1', 'Midjourney v6', 'Photoshop CC', 'Magnific AI'],
    skills: ['Prompt Engineering', 'Image Editing', 'Lighting Simulation', 'Color Grading'],
    location: 'Shanghai & Tokyo',
    region: 'Asia-Pacific',
    rateEstimate: '$2,400 - $4,200 / project',
    minRate: 2400,
    maxRate: 4200,
    turnaroundTime: '1-2 weeks',
    commercialBuyoutReady: true,
    seedLogsVerified: true,
    availability: 'immediate',
    verificationStatus: 'verified',
    featured: true,
    published: true,
    rating: 4.9,
    reviewCount: 110,
    completedProjects: 17,
    isTopRated: true,
    verificationEvidence: [
      {
        claim: 'FLUX.1 High-Resolution Master Passes & Seed Checksums',
        evidenceType: 'seed_reproducibility',
        description: 'Verified 8K uncompressed TIFF master deliverables with full seed reproducibility documentation.',
        submittedAt: '2026-09-18',
        verifiedAt: '2026-09-22',
        verifiedBy: 'Createopia Editorial Board',
        status: 'verified',
        reviewerNotes: 'Photoreal skin textures and lighting passes verified.'
      }
    ],
    workflow: [
      {
        phase: '1. Seed Anchor Exploration',
        description: 'Establish lighting coordinates in FLUX.1 with controlled depth conditioning.',
        tools: ['FLUX.1 Dev']
      },
      {
        phase: '2. Micro-Texture Retouching',
        description: 'Upscale using Magnific AI and finish in Photoshop for print resolution.',
        tools: ['Magnific AI', 'Photoshop']
      }
    ],
    portfolio: [
      {
        id: 'p-zara-1',
        title: 'Luminescence: High Jewelry Campaign',
        description: 'Refined key visuals for international luxury jewelry house.',
        imageUrl: '/src/assets/images/portfolio_surreal_fashion_1791881137083.jpg',
        contentType: 'Key Visuals',
        aspectRatio: '4:3',
        toolsUsed: ['FLUX.1', 'Magnific AI', 'Photoshop'],
        promptExcerpt: 'Extreme macro fine jewelry editorial, platinum diamond reflection, crystalline light refraction, Hasselblad H6D.',
        year: '2026'
      }
    ]
  },
  {
    id: 'leo-valdez',
    name: 'Leo Valdez',
    handle: '@leovaldez.film',
    tagline: 'AI Commercial Director & Audio-Visual Synthesizer',
    bio: 'Commercial director specializing in high-energy spec ads and social reels using Kling 1.5, Runway Gen-3, and custom sound design pipelines. Focused on seamless pacing and photoreal motion.',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: '/src/assets/images/hero_cinematic_film_1791881136552.jpg',
    specialization: 'Filmmaking',
    primaryTools: ['Kling 1.5', 'Runway Gen-3', 'DaVinci Resolve', 'ElevenLabs'],
    skills: ['Video Generation', 'Sound Design', 'Storyboarding', 'Motion Graphics'],
    location: 'Austin & Los Angeles',
    region: 'North America',
    rateEstimate: '$3,200 - $5,800 / project',
    minRate: 3200,
    maxRate: 5800,
    turnaroundTime: '1-2 weeks',
    commercialBuyoutReady: true,
    seedLogsVerified: true,
    availability: 'immediate',
    verificationStatus: 'verified',
    featured: true,
    published: true,
    rating: 4.8,
    reviewCount: 92,
    completedProjects: 13,
    isTopRated: true,
    verificationEvidence: [
      {
        claim: 'Original Multi-Track Audio Master & 4K ProRes Export',
        evidenceType: 'client_deliverable',
        description: 'Full audio stem alignment and 60fps frame interpolated video file with raw export manifests.',
        submittedAt: '2026-09-25',
        verifiedAt: '2026-09-28',
        verifiedBy: 'Createopia Technical Review Committee',
        status: 'verified',
        reviewerNotes: 'Verified commercial broadcast suitability.'
      }
    ],
    workflow: [
      {
        phase: '1. Dynamic Motion Prompting',
        description: 'Direct high-speed camera cuts in Kling 1.5 with prompt motion weighting.',
        tools: ['Kling 1.5']
      },
      {
        phase: '2. Audio Synthesis & Color Sync',
        description: 'Sync sound effects and grade in DaVinci Resolve.',
        tools: ['DaVinci Resolve', 'ElevenLabs']
      }
    ],
    portfolio: [
      {
        id: 'p-leo-1',
        title: 'Velocity: Electric Moto Spec Ad',
        description: 'Fast-paced urban motorcycle spec commercial with neon motion trails.',
        imageUrl: '/src/assets/images/hero_cinematic_film_1791881136552.jpg',
        contentType: 'Commercial Short',
        aspectRatio: '16:9',
        toolsUsed: ['Kling 1.5', 'Runway Gen-3', 'DaVinci Resolve'],
        promptExcerpt: 'Sleek electric motorcycle carving nighttime canyon curves, neon trails, dynamic low-angle tracking shot, 4K 60fps.',
        year: '2026'
      }
    ]
  }
];

export const INITIAL_BRIEFS: CreativeBrief[] = [
  {
    id: 'brief-sample-1',
    brandId: 'user-brand-1',
    brandName: 'Lumina Creative Studio',
    title: 'Aura Skincare: "Metamorphosis" 30s Brand Film',
    objective: 'Create an ethereal, nature-inspired AI commercial showcasing botanical ingredients transforming into luminous skin textures.',
    contentType: 'AI Brand Film',
    visualStyle: 'Bioluminescent Organic Hyperrealism',
    deliverables: '1x 30s Master Video (16:9 4K) + 2x 15s Cutdowns (9:16) + 4x 4K Stills',
    aspectRatio: '16:9',
    duration: '30 seconds',
    budget: '$4,500 - $7,000',
    deadline: 'November 15, 2026',
    commercialRequirements: 'Global digital paid media buyout for 12 months. All generation prompts and seed logs logged in repository.',
    referenceNotes: 'Reference the visual pacing of high-end perfume commercials. Gentle camera movements, macro water droplets, luminous soft lighting.',
    status: 'published',
    createdAt: '2026-10-10'
  },
  {
    id: 'brief-sample-2',
    brandId: 'user-brand-1',
    brandName: 'Lumina Creative Studio',
    title: 'Vanguard Audio: Wireless Horizon Spec Campaign',
    objective: 'Showcase urban cyberpunk acoustics with rain reflections and volumetric city lights.',
    contentType: 'Commercial Short',
    visualStyle: 'Cinematic Neo-Noir 35mm',
    deliverables: '1x 45s Film (4K) + 3x Social Cutdowns (9:16)',
    aspectRatio: '16:9',
    duration: '45 seconds',
    budget: '$5,000 - $8,500',
    deadline: 'December 01, 2026',
    commercialRequirements: 'Worldwide commercial digital license, prompt transparency and seed logs required.',
    referenceNotes: 'Blade Runner style reflections, anamorphic flares, DaVinci Resolve color grade.',
    status: 'published',
    createdAt: '2026-10-12'
  }
];

export const INITIAL_ENGAGEMENTS: Engagement[] = [
  {
    id: 'eng-sample-1',
    briefId: 'brief-sample-1',
    brief: INITIAL_BRIEFS[0],
    brandId: 'user-brand-1',
    brandName: 'Lumina Creative Studio',
    creatorId: 'luna-visuals',
    creatorName: 'Luna Visuals',
    creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    status: 'deliverables_submitted',
    deliverables: [
      {
        id: 'deliv-1',
        title: 'Master 4K Video Cut (v1.2) - 30s ProRes 422 HQ',
        fileUrl: 'https://storage.pixelforge.ai/deliverables/aura_master_v1.mp4',
        previewUrl: '/src/assets/images/hero_cinematic_film_1791881136552.jpg',
        type: 'video',
        submittedAt: '2026-10-12 16:40',
        notes: 'Final DaVinci 35mm grain pass applied. Character facial anchor verified across cutaways. Sound design mixed at -14 LUFS.'
      },
      {
        id: 'deliv-2',
        title: 'Seed Reproducibility Log & Prompt Master Manifest',
        fileUrl: 'https://storage.pixelforge.ai/deliverables/aura_seeds_log.json',
        type: 'archive',
        submittedAt: '2026-10-12 16:42',
        notes: 'All Runway Gen-3 seeds and Midjourney character turnarounds included.'
      }
    ],
    revisionNotes: [
      {
        id: 'msg-1',
        authorRole: 'brand',
        authorName: 'Sarah Jenkins (Lumina)',
        message: 'Luna, the lighting in the opening sequence is stunning! Could we adjust the transition timing around 00:18 so the fluid glow lingers 1.5 seconds longer?',
        createdAt: '2026-10-12 18:15'
      },
      {
        id: 'msg-2',
        authorRole: 'creator',
        authorName: 'Luna Visuals',
        message: 'Updated the motion interpolation curve in Runway to extend the glow fade at 00:18. Render uploaded in v1.2 above!',
        createdAt: '2026-10-13 01:10'
      }
    ],
    createdAt: '2026-10-11',
    updatedAt: '2026-10-13'
  }
];
