import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  Bookmark,
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Star,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Layers,
  ShieldCheck,
  Clock,
  Globe,
  FileCheck,
  DollarSign,
  Zap,
  Tag,
  Sliders,
} from 'lucide-react';
import { Creator, CreativeBrief, User, MatchResult, VerificationStatus } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { StorageService } from '../services/storage';
import { useTheme } from '../context/ThemeContext';

interface ExplorePageProps {
  creators: Creator[];
  onSelectCreator: (id: string) => void;
  shortlist: string[];
  onToggleShortlist: (id: string) => void;
  currentUser: User | null;
  onRequireAuth: () => void;
  activeBriefFilter?: CreativeBrief | null;
  onClearBriefFilter?: () => void;
  initialShowShortlisted?: boolean;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  creators,
  onSelectCreator,
  shortlist,
  onToggleShortlist,
  currentUser,
  onRequireAuth,
  activeBriefFilter = null,
  onClearBriefFilter,
  initialShowShortlisted = false,
}) => {
  const { isDark } = useTheme();

  // 1. Search & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<
    'best_match' | 'highest_rated' | 'most_projects' | 'rate_low' | 'rate_high' | 'name_asc'
  >('best_match');

  // 2. Specialization Filter (Multi-select)
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);

  // 3. Skills Filter (Multi-select)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillSearch, setSkillSearch] = useState('');

  // 4. Tools Filter (Multi-select)
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [toolSearch, setToolSearch] = useState('');

  // 5. Content Type Filter (Multi-select)
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);

  // 6. Other Profile Attributes
  const [selectedVerification, setSelectedVerification] = useState<
    'all' | 'verified' | 'evidence_submitted' | 'self_reported'
  >('all');
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [rateTier, setRateTier] = useState<'all' | 'under_3500' | 'mid_tier' | 'high_tier'>('all');
  const [maxBudget, setMaxBudget] = useState<number>(10000);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [rapidTurnaroundOnly, setRapidTurnaroundOnly] = useState(false);
  const [commercialBuyoutOnly, setCommercialBuyoutOnly] = useState(false);
  const [seedLogsVerifiedOnly, setSeedLogsVerifiedOnly] = useState(false);
  const [showShortlistedOnly, setShowShortlistedOnly] = useState(initialShowShortlisted);

  useEffect(() => {
    if (initialShowShortlisted) {
      setShowShortlistedOnly(true);
    }
  }, [initialShowShortlisted]);

  // UI accordion toggles for sidebar sections
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    specialization: true,
    skills: true,
    tools: true,
    contentType: true,
    verification: true,
    budget: true,
    attributes: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Dynamic discovery of all available options across all creators
  const availableSpecializations = useMemo(() => {
    const specs = new Set<string>();
    creators.forEach((c) => {
      if (c.specialization) specs.add(c.specialization);
    });
    return Array.from(specs).sort();
  }, [creators]);

  const availableSkills = useMemo(() => {
    const skillsMap = new Map<string, number>();
    creators.forEach((c) => {
      c.skills.forEach((s) => {
        skillsMap.set(s, (skillsMap.get(s) || 0) + 1);
      });
    });
    return Array.from(skillsMap.entries()).sort((a, b) => b[1] - a[1]);
  }, [creators]);

  const availableTools = useMemo(() => {
    const toolsMap = new Map<string, number>();
    creators.forEach((c) => {
      c.primaryTools.forEach((t) => {
        toolsMap.set(t, (toolsMap.get(t) || 0) + 1);
      });
    });
    return Array.from(toolsMap.entries()).sort((a, b) => b[1] - a[1]);
  }, [creators]);

  const availableContentTypes = useMemo(() => {
    const typesMap = new Map<string, number>();
    creators.forEach((c) => {
      c.portfolio.forEach((p) => {
        if (p.contentType) {
          typesMap.set(p.contentType, (typesMap.get(p.contentType) || 0) + 1);
        }
      });
    });
    return Array.from(typesMap.entries()).sort((a, b) => b[1] - a[1]);
  }, [creators]);

  const availableRegions = useMemo(() => {
    const regions = new Set<string>();
    creators.forEach((c) => {
      if (c.region) regions.add(c.region);
    });
    return Array.from(regions).sort();
  }, [creators]);

  // Counts helpers
  const getSpecializationCount = (spec: string) =>
    creators.filter((c) => c.specialization === spec).length;

  const getSkillCount = (skill: string) =>
    creators.filter((c) => c.skills.some((s) => s.toLowerCase() === skill.toLowerCase())).length;

  const getToolCount = (tool: string) =>
    creators.filter((c) => c.primaryTools.some((t) => t.toLowerCase() === tool.toLowerCase())).length;

  const getContentTypeCount = (type: string) =>
    creators.filter((c) =>
      c.portfolio.some((p) => p.contentType.toLowerCase() === type.toLowerCase())
    ).length;

  const getRegionCount = (reg: string) =>
    creators.filter((c) => c.region === reg).length;

  // Toggle helpers
  const toggleSpecialization = (spec: string) => {
    setSelectedSpecializations((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const toggleContentType = (ct: string) => {
    setSelectedContentTypes((prev) =>
      prev.includes(ct) ? prev.filter((c) => c !== ct) : [...prev, ct]
    );
  };

  const toggleRegion = (reg: string) => {
    setSelectedRegions((prev) =>
      prev.includes(reg) ? prev.filter((r) => r !== reg) : [...prev, reg]
    );
  };

  // Brief matching scores if active
  const matchResultsMap = useMemo(() => {
    if (!activeBriefFilter) return new Map<string, MatchResult>();
    const results = StorageService.matchCreators(activeBriefFilter, creators);
    const map = new Map<string, MatchResult>();
    results.forEach((r) => map.set(r.creator.id, r));
    return map;
  }, [activeBriefFilter, creators]);

  // Filter & Sort Pipeline
  const filteredCreators = useMemo(() => {
    return creators
      .filter((creator) => {
        // 1. Shortlist filter
        if (showShortlistedOnly && !shortlist.includes(creator.id)) {
          return false;
        }

        // 2. Global search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = creator.name.toLowerCase().includes(q);
          const matchesHandle = creator.handle.toLowerCase().includes(q);
          const matchesBio = creator.bio.toLowerCase().includes(q);
          const matchesTagline = creator.tagline.toLowerCase().includes(q);
          const matchesLocation = creator.location.toLowerCase().includes(q);
          const matchesSpecialization = creator.specialization.toLowerCase().includes(q);
          const matchesSkills = creator.skills.some((s) => s.toLowerCase().includes(q));
          const matchesTools = creator.primaryTools.some((t) => t.toLowerCase().includes(q));
          const matchesPortfolio = creator.portfolio.some(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.contentType.toLowerCase().includes(q) ||
              (p.promptExcerpt && p.promptExcerpt.toLowerCase().includes(q))
          );

          if (
            !matchesName &&
            !matchesHandle &&
            !matchesBio &&
            !matchesTagline &&
            !matchesLocation &&
            !matchesSpecialization &&
            !matchesSkills &&
            !matchesTools &&
            !matchesPortfolio
          ) {
            return false;
          }
        }

        // 3. Specialization Filter (Multi-select OR match)
        if (selectedSpecializations.length > 0) {
          if (!selectedSpecializations.includes(creator.specialization)) {
            return false;
          }
        }

        // 4. Skills Filter (Multi-select OR match)
        if (selectedSkills.length > 0) {
          const hasSkill = selectedSkills.some((skill) =>
            creator.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
          );
          if (!hasSkill) return false;
        }

        // 5. Tools Filter (Multi-select OR match)
        if (selectedTools.length > 0) {
          const hasTool = selectedTools.some((tool) =>
            creator.primaryTools.some((t) => t.toLowerCase() === tool.toLowerCase())
          );
          if (!hasTool) return false;
        }

        // 6. Content Type Filter (Multi-select OR match)
        if (selectedContentTypes.length > 0) {
          const hasContentType = selectedContentTypes.some((ct) =>
            creator.portfolio.some((p) => p.contentType.toLowerCase() === ct.toLowerCase())
          );
          if (!hasContentType) return false;
        }

        // 7. Verification Status Filter
        if (selectedVerification !== 'all') {
          if (creator.verificationStatus !== selectedVerification) {
            return false;
          }
        }

        // 8. Top Rated / Min Rating Filter
        if (topRatedOnly && !creator.isTopRated) {
          return false;
        }
        if (minRating > 0 && (creator.rating || 0) < minRating) {
          return false;
        }

        // 9. Budget Scope Tier & Max Budget
        const minRate = creator.minRate || 3000;
        const maxRate = creator.maxRate || 6000;

        if (rateTier !== 'all') {
          if (rateTier === 'under_3500' && minRate >= 3500) return false;
          if (rateTier === 'mid_tier' && (minRate < 3000 || minRate > 6000)) return false;
          if (rateTier === 'high_tier' && minRate < 5000) return false;
        }

        if (maxBudget < 10000 && minRate > maxBudget) {
          return false;
        }

        // 10. Region Filter
        if (selectedRegions.length > 0) {
          if (!creator.region || !selectedRegions.includes(creator.region)) {
            return false;
          }
        }

        // 11. Rapid Turnaround Filter (Under 2 weeks)
        if (rapidTurnaroundOnly) {
          const isRapid =
            creator.turnaroundTime?.includes('1-2') ||
            creator.availability === 'immediate';
          if (!isRapid) return false;
        }

        // 12. Commercial Buyout Ready
        if (commercialBuyoutOnly && !creator.commercialBuyoutReady) {
          return false;
        }

        // 13. Seed Logs Verified
        if (seedLogsVerifiedOnly && !creator.seedLogsVerified) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'highest_rated') {
          return (b.rating || 4.5) - (a.rating || 4.5);
        }
        if (sortBy === 'most_projects') {
          return (b.completedProjects || 0) - (a.completedProjects || 0);
        }
        if (sortBy === 'rate_low') {
          return (a.minRate || 3000) - (b.minRate || 3000);
        }
        if (sortBy === 'rate_high') {
          return (b.maxRate || 6000) - (a.maxRate || 6000);
        }
        if (sortBy === 'name_asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'best_match' && activeBriefFilter) {
          const scoreA = matchResultsMap.get(a.id)?.score || 0;
          const scoreB = matchResultsMap.get(b.id)?.score || 0;
          return scoreB - scoreA;
        }
        return 0;
      });
  }, [
    creators,
    searchQuery,
    selectedSpecializations,
    selectedSkills,
    selectedTools,
    selectedContentTypes,
    selectedVerification,
    topRatedOnly,
    minRating,
    rateTier,
    maxBudget,
    selectedRegions,
    rapidTurnaroundOnly,
    commercialBuyoutOnly,
    seedLogsVerifiedOnly,
    showShortlistedOnly,
    shortlist,
    sortBy,
    activeBriefFilter,
    matchResultsMap,
  ]);

  // Reset all filters
  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedSpecializations([]);
    setSelectedSkills([]);
    setSkillSearch('');
    setSelectedTools([]);
    setToolSearch('');
    setSelectedContentTypes([]);
    setSelectedVerification('all');
    setTopRatedOnly(false);
    setMinRating(0);
    setRateTier('all');
    setMaxBudget(10000);
    setSelectedRegions([]);
    setRapidTurnaroundOnly(false);
    setCommercialBuyoutOnly(false);
    setSeedLogsVerifiedOnly(false);
    setShowShortlistedOnly(false);
    setSortBy('best_match');
    if (onClearBriefFilter) onClearBriefFilter();
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    selectedSpecializations.length +
    selectedSkills.length +
    selectedTools.length +
    selectedContentTypes.length +
    (selectedVerification !== 'all' ? 1 : 0) +
    (topRatedOnly ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (rateTier !== 'all' ? 1 : 0) +
    (maxBudget < 10000 ? 1 : 0) +
    selectedRegions.length +
    (rapidTurnaroundOnly ? 1 : 0) +
    (commercialBuyoutOnly ? 1 : 0) +
    (seedLogsVerifiedOnly ? 1 : 0) +
    (showShortlistedOnly ? 1 : 0) +
    (activeBriefFilter ? 1 : 0);

  const isFiltered = activeFiltersCount > 0;

  return (
    <div
      className={`pf-page max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 transition-colors duration-200 ${
        isDark ? 'text-white' : 'text-[#242424]'
      }`}
    >
      {/* Top Header & Search Bar */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${
          isDark ? 'border-[#1F2433]' : 'border-[#E5E4DE]'
        }`}
      >
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-[#242424]'
            }`}
          >
            Explore Creators
          </h1>
          <p
            className={`text-xs sm:text-sm mt-0.5 ${
              isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
            }`}
          >
            Discover verified AI filmmakers, animators, and visual artists with proven production workflows.
          </p>
        </div>

        {/* Global Search & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-96">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creators, skills, tools, styles..."
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-[#121622] border border-[#232838] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#E60067] focus:ring-1 focus:ring-[#E60067] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-white p-1 cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden px-3 py-2.5 bg-[#121622] border border-[#232838] rounded-xl text-xs font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Filter className="w-4 h-4 text-[#E60067]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#E60067] text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Quick Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        <span className="text-[#94A3B8] font-medium shrink-0 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-[#E60067]" /> Quick Filters:
        </span>

        <button
          type="button"
          onClick={() => {
            if (selectedSpecializations.includes('Filmmaking')) {
              setSelectedSpecializations(selectedSpecializations.filter((s) => s !== 'Filmmaking'));
            } else {
              setSelectedSpecializations([...selectedSpecializations, 'Filmmaking']);
            }
          }}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium shrink-0 transition-colors cursor-pointer ${
            selectedSpecializations.includes('Filmmaking')
              ? 'bg-[#E60067] text-white border-[#E60067]'
              : 'bg-[#151923] text-[#CBD5E1] border-[#232838] hover:border-[#E60067]'
          }`}
        >
          Filmmaking
        </button>

        <button
          type="button"
          onClick={() => {
            if (selectedSpecializations.includes('Animation')) {
              setSelectedSpecializations(selectedSpecializations.filter((s) => s !== 'Animation'));
            } else {
              setSelectedSpecializations([...selectedSpecializations, 'Animation']);
            }
          }}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium shrink-0 transition-colors cursor-pointer ${
            selectedSpecializations.includes('Animation')
              ? 'bg-[#E60067] text-white border-[#E60067]'
              : 'bg-[#151923] text-[#CBD5E1] border-[#232838] hover:border-[#E60067]'
          }`}
        >
          Animation
        </button>

        <button
          type="button"
          onClick={() => {
            if (selectedSpecializations.includes('Visual Art')) {
              setSelectedSpecializations(selectedSpecializations.filter((s) => s !== 'Visual Art'));
            } else {
              setSelectedSpecializations([...selectedSpecializations, 'Visual Art']);
            }
          }}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium shrink-0 transition-colors cursor-pointer ${
            selectedSpecializations.includes('Visual Art')
              ? 'bg-[#E60067] text-white border-[#E60067]'
              : 'bg-[#151923] text-[#CBD5E1] border-[#232838] hover:border-[#E60067]'
          }`}
        >
          Visual Art
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedVerification(selectedVerification === 'verified' ? 'all' : 'verified');
          }}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium shrink-0 transition-colors cursor-pointer inline-flex items-center gap-1 ${
            selectedVerification === 'verified'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-[#151923] text-emerald-400 border-[#232838] hover:border-emerald-500'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Verified Only</span>
        </button>

        <button
          type="button"
          onClick={() => setTopRatedOnly(!topRatedOnly)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium shrink-0 transition-colors cursor-pointer inline-flex items-center gap-1 ${
            topRatedOnly
              ? 'bg-[#E60067] text-white border-[#E60067]'
              : 'bg-[#151923] text-[#CBD5E1] border-[#232838] hover:border-[#E60067]'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Top Rated (4.8+)</span>
        </button>

        <button
          type="button"
          onClick={() => setCommercialBuyoutOnly(!commercialBuyoutOnly)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium shrink-0 transition-colors cursor-pointer inline-flex items-center gap-1 ${
            commercialBuyoutOnly
              ? 'bg-[#E60067] text-white border-[#E60067]'
              : 'bg-[#151923] text-[#CBD5E1] border-[#232838] hover:border-[#E60067]'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Commercial Buyout Ready</span>
        </button>

        <button
          type="button"
          onClick={() => setRapidTurnaroundOnly(!rapidTurnaroundOnly)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium shrink-0 transition-colors cursor-pointer inline-flex items-center gap-1 ${
            rapidTurnaroundOnly
              ? 'bg-[#E60067] text-white border-[#E60067]'
              : 'bg-[#151923] text-[#CBD5E1] border-[#232838] hover:border-[#E60067]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Rapid (&lt;2 wks)</span>
        </button>
      </div>

      {/* Active Brief Match Notice */}
      {activeBriefFilter && (
        <div className="p-4 bg-[#E60067]/10 border border-[#E60067]/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E60067] shrink-0" />
            <span>
              Matching creators for brief: <strong>"{activeBriefFilter.title}"</strong> ({activeBriefFilter.contentType} · {activeBriefFilter.visualStyle})
            </span>
          </div>
          <button
            type="button"
            onClick={onClearBriefFilter}
            className="text-[#E60067] font-semibold hover:underline cursor-pointer self-start sm:self-auto"
          >
            Clear Brief Match Filter
          </button>
        </div>
      )}

      {/* Main 2-Column Discovery Layout: Filter Sidebar (Left) + Creator Grid (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filter Sidebar */}
        <aside
          className={`md:col-span-4 lg:col-span-3 space-y-5 ${
            mobileFiltersOpen ? 'block' : 'hidden md:block'
          } bg-[#121622] rounded-2xl border border-[#232838] p-5 shadow-sm`}
        >
          {/* Header of Filter Sidebar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1F2433]">
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <Filter className="w-4 h-4 text-[#E60067]" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="text-[11px] font-semibold bg-[#E60067]/20 text-[#FF007A] px-2 py-0.5 rounded-full">
                  {activeFiltersCount} active
                </span>
              )}
            </div>
            {isFiltered && (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs text-[#E60067] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* 1. Specialization Filter */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => toggleSection('specialization')}
              className="w-full flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider cursor-pointer"
            >
              <span>Specialization</span>
              {openSections.specialization ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#94A3B8]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
              )}
            </button>

            {openSections.specialization && (
              <div className="space-y-1.5 text-xs text-[#CBD5E1] pt-1">
                {availableSpecializations.map((spec) => {
                  const checked = selectedSpecializations.includes(spec);
                  const count = getSpecializationCount(spec);
                  return (
                    <label
                      key={spec}
                      className="flex items-center justify-between gap-2 cursor-pointer hover:text-[#E60067] py-0.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSpecialization(spec)}
                          className="rounded border-[#232838] bg-[#1A1F2E] text-[#E60067] focus:ring-0 cursor-pointer"
                        />
                        <span>{spec}</span>
                      </div>
                      <span className="text-[11px] text-[#64748B]">({count})</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Skills Filter */}
          <div className="space-y-2 pt-4 border-t border-[#1F2433]">
            <button
              type="button"
              onClick={() => toggleSection('skills')}
              className="w-full flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider cursor-pointer"
            >
              <span>Skills ({availableSkills.length})</span>
              {openSections.skills ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#94A3B8]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
              )}
            </button>

            {openSections.skills && (
              <div className="space-y-2 pt-1">
                <input
                  type="text"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder="Filter skills..."
                  className="w-full px-2.5 py-1 text-xs bg-[#1A1F2E] border border-[#232838] rounded-lg text-white focus:outline-none focus:border-[#E60067]"
                />

                <div className="space-y-1.5 text-xs text-[#CBD5E1] max-h-48 overflow-y-auto pr-1">
                  {availableSkills
                    .filter(([skill]) =>
                      skillSearch.trim()
                        ? skill.toLowerCase().includes(skillSearch.toLowerCase())
                        : true
                    )
                    .map(([skill, count]) => {
                      const checked = selectedSkills.includes(skill);
                      return (
                        <label
                          key={skill}
                          className="flex items-center justify-between gap-2 cursor-pointer hover:text-[#E60067] py-0.5"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleSkill(skill)}
                              className="rounded border-[#232838] bg-[#1A1F2E] text-[#E60067] focus:ring-0 cursor-pointer shrink-0"
                            />
                            <span className="truncate">{skill}</span>
                          </div>
                          <span className="text-[11px] text-[#64748B] shrink-0">({count})</span>
                        </label>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* 3. Tools & Models Filter */}
          <div className="space-y-2 pt-4 border-t border-[#1F2433]">
            <button
              type="button"
              onClick={() => toggleSection('tools')}
              className="w-full flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider cursor-pointer"
            >
              <span>AI Tools &amp; Models ({availableTools.length})</span>
              {openSections.tools ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#94A3B8]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
              )}
            </button>

            {openSections.tools && (
              <div className="space-y-2 pt-1">
                <input
                  type="text"
                  value={toolSearch}
                  onChange={(e) => setToolSearch(e.target.value)}
                  placeholder="Filter tools..."
                  className="w-full px-2.5 py-1 text-xs bg-[#1A1F2E] border border-[#232838] rounded-lg text-white focus:outline-none focus:border-[#E60067]"
                />

                <div className="space-y-1.5 text-xs text-[#CBD5E1] max-h-48 overflow-y-auto pr-1">
                  {availableTools
                    .filter(([tool]) =>
                      toolSearch.trim()
                        ? tool.toLowerCase().includes(toolSearch.toLowerCase())
                        : true
                    )
                    .map(([tool, count]) => {
                      const checked = selectedTools.includes(tool);
                      return (
                        <label
                          key={tool}
                          className="flex items-center justify-between gap-2 cursor-pointer hover:text-[#E60067] py-0.5"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleTool(tool)}
                              className="rounded border-[#232838] bg-[#1A1F2E] text-[#E60067] focus:ring-0 cursor-pointer shrink-0"
                            />
                            <span className="truncate">{tool}</span>
                          </div>
                          <span className="text-[11px] text-[#64748B] shrink-0">({count})</span>
                        </label>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* 4. Content Type Filter */}
          <div className="space-y-2 pt-4 border-t border-[#1F2433]">
            <button
              type="button"
              onClick={() => toggleSection('contentType')}
              className="w-full flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider cursor-pointer"
            >
              <span>Content Type</span>
              {openSections.contentType ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#94A3B8]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
              )}
            </button>

            {openSections.contentType && (
              <div className="space-y-1.5 text-xs text-[#CBD5E1] pt-1">
                {availableContentTypes.map(([ct, count]) => {
                  const checked = selectedContentTypes.includes(ct);
                  return (
                    <label
                      key={ct}
                      className="flex items-center justify-between gap-2 cursor-pointer hover:text-[#E60067] py-0.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleContentType(ct)}
                          className="rounded border-[#232838] bg-[#1A1F2E] text-[#E60067] focus:ring-0 cursor-pointer"
                        />
                        <span>{ct}</span>
                      </div>
                      <span className="text-[11px] text-[#64748B]">({count})</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 5. Verification Signals */}
          <div className="space-y-2 pt-4 border-t border-[#1F2433]">
            <button
              type="button"
              onClick={() => toggleSection('verification')}
              className="w-full flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider cursor-pointer"
            >
              <span>Verification Status</span>
              {openSections.verification ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#94A3B8]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
              )}
            </button>

            {openSections.verification && (
              <div className="space-y-2 text-xs text-[#CBD5E1] pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="verif"
                    checked={selectedVerification === 'all'}
                    onChange={() => setSelectedVerification('all')}
                    className="text-[#E60067] cursor-pointer"
                  />
                  <span>All Statuses</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="verif"
                    checked={selectedVerification === 'verified'}
                    onChange={() => setSelectedVerification('verified')}
                    className="text-[#E60067] cursor-pointer"
                  />
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified by Reviewer
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="verif"
                    checked={selectedVerification === 'evidence_submitted'}
                    onChange={() => setSelectedVerification('evidence_submitted')}
                    className="text-[#E60067] cursor-pointer"
                  />
                  <span className="font-medium text-amber-400">Evidence Submitted</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="verif"
                    checked={selectedVerification === 'self_reported'}
                    onChange={() => setSelectedVerification('self_reported')}
                    className="text-[#E60067] cursor-pointer"
                  />
                  <span className="text-[#94A3B8]">Self-reported</span>
                </label>
              </div>
            )}
          </div>

          {/* 6. Budget Scope & Project Rate */}
          <div className="space-y-2.5 pt-4 border-t border-[#1F2433]">
            <button
              type="button"
              onClick={() => toggleSection('budget')}
              className="w-full flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider cursor-pointer"
            >
              <span>Budget Range</span>
              {openSections.budget ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#94A3B8]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
              )}
            </button>

            {openSections.budget && (
              <div className="space-y-3 pt-1">
                <select
                  value={rateTier}
                  onChange={(e) => setRateTier(e.target.value as any)}
                  className="w-full py-1.5 px-2 bg-[#1A1F2E] border border-[#232838] rounded-lg text-xs text-white focus:outline-none focus:border-[#E60067] cursor-pointer"
                >
                  <option value="all">Any Budget Tier</option>
                  <option value="under_3500">Under $3,500 / project</option>
                  <option value="mid_tier">$3,500 - $6,000 / project</option>
                  <option value="high_tier">$6,000+ / project</option>
                </select>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                    <span>Max Starting Rate:</span>
                    <strong className="text-white">${maxBudget.toLocaleString()}</strong>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="10000"
                    step="500"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(Number(e.target.value))}
                    className="w-full accent-[#E60067] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#64748B]">
                    <span>$2,000</span>
                    <span>$10,000+</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 7. Other Profile Attributes */}
          <div className="space-y-2.5 pt-4 border-t border-[#1F2433]">
            <button
              type="button"
              onClick={() => toggleSection('attributes')}
              className="w-full flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider cursor-pointer"
            >
              <span>Profile Attributes</span>
              {openSections.attributes ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#94A3B8]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
              )}
            </button>

            {openSections.attributes && (
              <div className="space-y-2 text-xs text-[#CBD5E1] pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={commercialBuyoutOnly}
                    onChange={(e) => setCommercialBuyoutOnly(e.target.checked)}
                    className="rounded bg-[#1A1F2E] border-[#232838] text-[#E60067] cursor-pointer"
                  />
                  <span>Commercial Buyout Ready</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={seedLogsVerifiedOnly}
                    onChange={(e) => setSeedLogsVerifiedOnly(e.target.checked)}
                    className="rounded bg-[#1A1F2E] border-[#232838] text-[#E60067] cursor-pointer"
                  />
                  <span>Seed &amp; Node Graph Verified</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={rapidTurnaroundOnly}
                    onChange={(e) => setRapidTurnaroundOnly(e.target.checked)}
                    className="rounded bg-[#1A1F2E] border-[#232838] text-[#E60067] cursor-pointer"
                  />
                  <span>Rapid Turnaround (&lt;2 wks)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={topRatedOnly}
                    onChange={(e) => setTopRatedOnly(e.target.checked)}
                    className="rounded bg-[#1A1F2E] border-[#232838] text-[#E60067] cursor-pointer"
                  />
                  <span>Top Rated Creators Only</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={showShortlistedOnly}
                    onChange={(e) => setShowShortlistedOnly(e.target.checked)}
                    className="rounded bg-[#1A1F2E] border-[#232838] text-[#E60067] cursor-pointer"
                  />
                  <span>Shortlisted Creators ({shortlist.length})</span>
                </label>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-[#94A3B8] block mb-1">
                    Region / Location
                  </span>
                  <div className="space-y-1">
                    {availableRegions.map((reg) => (
                      <label key={reg} className="flex items-center justify-between text-xs cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedRegions.includes(reg)}
                            onChange={() => toggleRegion(reg)}
                            className="rounded bg-[#1A1F2E] border-[#232838] text-[#E60067] focus:ring-0 cursor-pointer"
                          />
                          <span>{reg}</span>
                        </div>
                        <span className="text-[10px] text-[#64748B]">({getRegionCount(reg)})</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Right Column: Search Results Grid */}
        <div className="md:col-span-8 lg:col-span-9 space-y-5">
          {/* Top Results Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-[#121622] p-3.5 rounded-xl border border-[#232838]">
            <div className="text-[#94A3B8]">
              Showing <strong className="text-white font-bold">{filteredCreators.length}</strong> of{' '}
              <strong className="text-white">{creators.length}</strong> creators
              {isFiltered && <span className="text-[#E60067] ml-1 font-medium">(Filtered)</span>}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#94A3B8] whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1 px-2.5 bg-[#1A1F2E] border border-[#232838] rounded-lg text-white text-xs font-medium focus:outline-none focus:border-[#E60067] cursor-pointer"
              >
                <option value="best_match">Best Match</option>
                <option value="highest_rated">Highest Rated (Reviews)</option>
                <option value="most_projects">Most Completed Projects</option>
                <option value="rate_low">Starting Rate: Low to High</option>
                <option value="rate_high">Starting Rate: High to Low</option>
                <option value="name_asc">Name (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Removable Chips */}
          {isFiltered && (
            <div className="flex flex-wrap items-center gap-1.5 p-3 bg-[#121622] rounded-xl border border-[#232838]">
              <span className="text-[11px] font-semibold text-[#94A3B8] mr-1">Active filters:</span>

              {searchQuery && (
                <span
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#E60067]/15 text-[#FF007A] border border-[#E60067]/30 px-2 py-0.5 rounded-md cursor-pointer hover:bg-[#E60067]/25"
                >
                  <span>Query: "{searchQuery}"</span>
                  <X className="w-3 h-3" />
                </span>
              )}

              {selectedSpecializations.map((spec) => (
                <span
                  key={spec}
                  onClick={() => toggleSpecialization(spec)}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Specialization: {spec}</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              ))}

              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Skill: {skill}</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              ))}

              {selectedTools.map((tool) => (
                <span
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Tool: {tool}</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              ))}

              {selectedContentTypes.map((ct) => (
                <span
                  key={ct}
                  onClick={() => toggleContentType(ct)}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Content: {ct}</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              ))}

              {selectedVerification !== 'all' && (
                <span
                  onClick={() => setSelectedVerification('all')}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Status: {selectedVerification}</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              )}

              {rateTier !== 'all' && (
                <span
                  onClick={() => setRateTier('all')}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Tier: {rateTier}</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              )}

              {maxBudget < 10000 && (
                <span
                  onClick={() => setMaxBudget(10000)}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Max Budget: ${maxBudget.toLocaleString()}</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              )}

              {selectedRegions.map((reg) => (
                <span
                  key={reg}
                  onClick={() => toggleRegion(reg)}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Region: {reg}</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              ))}

              {commercialBuyoutOnly && (
                <span
                  onClick={() => setCommercialBuyoutOnly(false)}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Commercial Buyout</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              )}

              {seedLogsVerifiedOnly && (
                <span
                  onClick={() => setSeedLogsVerifiedOnly(false)}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Seed Logs Verified</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              )}

              {rapidTurnaroundOnly && (
                <span
                  onClick={() => setRapidTurnaroundOnly(false)}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Rapid &lt;2wks</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              )}

              {topRatedOnly && (
                <span
                  onClick={() => setTopRatedOnly(false)}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Top Rated</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              )}

              {showShortlistedOnly && (
                <span
                  onClick={() => setShowShortlistedOnly(false)}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#1A1F2E] border border-[#2A3246] px-2 py-0.5 rounded-md text-white cursor-pointer hover:border-[#E60067]"
                >
                  <span>Shortlisted</span>
                  <X className="w-3 h-3 text-[#94A3B8]" />
                </span>
              )}

              <button
                type="button"
                onClick={handleClearAll}
                className="text-[11px] text-[#E60067] font-bold hover:underline ml-auto cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Creators Card Grid */}
          {filteredCreators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredCreators.map((creator) => {
                const isSaved = shortlist.includes(creator.id);
                const matchInfo = matchResultsMap.get(creator.id);

                return (
                  <div
                    key={creator.id}
                    className="bg-[#121622] rounded-2xl border border-[#232838] overflow-hidden hover:border-[#E60067] transition-all flex flex-col group shadow-md"
                  >
                    {/* Media Thumbnail */}
                    <div
                      onClick={() => onSelectCreator(creator.id)}
                      className="relative aspect-16/10 bg-[#0B0E14] overflow-hidden cursor-pointer"
                    >
                      {creator.portfolio[0]?.videoUrl ? (
                        <video
                          src={creator.portfolio[0].videoUrl}
                          poster={creator.portfolio[0].imageUrl || creator.coverImageUrl}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          autoPlay
                          muted
                          loop
                          playsInline
                          aria-label={`${creator.name} portfolio video preview`}
                        />
                      ) : (
                        <img
                          src={creator.portfolio[0]?.imageUrl || creator.coverImageUrl}
                          alt={creator.name}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="bg-black/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-0.5 rounded-md font-semibold border border-white/20">
                          {creator.specialization}
                        </span>
                        {creator.region && (
                          <span className="bg-[#1F2433]/90 backdrop-blur-xs text-[#CBD5E1] text-[10px] px-2 py-0.5 rounded-md font-medium border border-[#2A3246]">
                            {creator.region}
                          </span>
                        )}
                      </div>

                      {/* Bookmark / Shortlist button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!currentUser) {
                            onRequireAuth();
                            return;
                          }
                          onToggleShortlist(creator.id);
                        }}
                        className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-xs transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-[#E60067] text-white shadow-xs'
                            : 'bg-black/60 text-white hover:bg-black/85 border border-white/20'
                        }`}
                        title={isSaved ? 'Remove from shortlist' : 'Add to shortlist'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                      </button>

                      {/* Bottom Banner inside image */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white font-medium px-2 py-1 bg-black/75 backdrop-blur-xs rounded-md border border-white/10">
                        <span>{creator.portfolio[0]?.contentType || 'Key Deliverable'}</span>
                        <span className="text-[#00C9FF] font-semibold">{creator.rateEstimate}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        {/* Avatar & Name & Rating */}
                        <div
                          onClick={() => onSelectCreator(creator.id)}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <img
                            src={creator.avatarUrl}
                            alt={creator.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#232838] shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-sm text-white truncate group-hover:text-[#FF007A] transition-colors">
                                {creator.name}
                              </h3>
                              {creator.verificationStatus === 'verified' && (
                                <span title="Verified Creator" className="shrink-0 inline-flex">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#94A3B8] truncate">
                              {creator.tagline}
                            </div>
                          </div>
                        </div>

                        {/* Rating & Completed Projects */}
                        <div className="flex items-center gap-2 text-xs pt-0.5">
                          <span className="font-bold text-white flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {creator.rating || 4.9}
                          </span>
                          <span className="text-[#64748B] text-[11px]">
                            ({creator.reviewCount || 90} reviews)
                          </span>
                          <span aria-hidden="true" className="text-[#232838]">·</span>
                          <span className="text-[11px] text-[#94A3B8]">
                            {creator.completedProjects || 12}+ projects
                          </span>
                        </div>

                        {/* Attribute Badges (Turnaround & Commercial Buyout) */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[10px]">
                          {creator.turnaroundTime && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1A1F2E] border border-[#232838] text-[#CBD5E1]">
                              <Clock className="w-2.5 h-2.5 text-[#94A3B8]" />
                              <span>{creator.turnaroundTime}</span>
                            </span>
                          )}
                          {creator.commercialBuyoutReady && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 font-medium">
                              <Check className="w-2.5 h-2.5" />
                              <span>Buyout Ready</span>
                            </span>
                          )}
                          {creator.seedLogsVerified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E60067]/15 border border-[#E60067]/30 text-[#FF007A] font-medium">
                              <FileCheck className="w-2.5 h-2.5" />
                              <span>Seeds Logged</span>
                            </span>
                          )}
                        </div>

                        {/* Tool tags with match highlight */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {creator.primaryTools.slice(0, 3).map((tool, idx) => {
                            const isMatched = selectedTools.includes(tool);
                            return (
                              <span
                                key={idx}
                                className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                  isMatched
                                    ? 'bg-[#E60067] text-white border border-[#E60067]'
                                    : 'bg-[#1A1F2E] border border-[#232838] text-[#CBD5E1]'
                                }`}
                              >
                                {tool}
                              </span>
                            );
                          })}
                        </div>

                        {/* Match reasons if brief active */}
                        {matchInfo && (
                          <div className="p-2 bg-[#E60067]/10 rounded-lg border border-[#E60067]/25 text-[10px] text-white space-y-0.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-[#E60067]">AI portfolio score</span>
                              <span className="font-bold text-white">{Math.min(100, Math.round(matchInfo.score))}/100</span>
                            </div>
                            {matchInfo.matchReasons[0] && (
                              <div><span className="font-semibold text-[#E60067]">Why:</span> {matchInfo.matchReasons[0]}</div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Card Bottom: Verification Status Pill & Action */}
                      <div className="pt-2.5 border-t border-[#1F2433] flex items-center justify-between">
                        <VerificationBadge
                          status={creator.verificationStatus}
                          evidence={creator.verificationEvidence}
                          creatorName={creator.name}
                        />

                        <button
                          type="button"
                          onClick={() => onSelectCreator(creator.id)}
                          className="text-xs font-semibold text-[#E60067] hover:text-[#FF007A] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Profile</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 text-center bg-[#121622] rounded-2xl border border-[#232838] space-y-4 shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#1A1F2E] flex items-center justify-center text-[#94A3B8]">
                <Filter className="w-5 h-5 text-[#E60067]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">
                  No creators match your selected filters
                </h3>
                <p className="text-xs text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                  Try clearing specific skills, tools, or widening your budget range to view available creators.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#E60067] hover:bg-[#C70058] rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters &amp; View All</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
