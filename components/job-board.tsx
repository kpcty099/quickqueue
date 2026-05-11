"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookmarkCheck,
  BriefcaseBusiness,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import { JobCard } from "@/components/job-card";
import { AdSlot } from "@/components/ads/AdSlot";
import { interleaveAds } from "@/lib/ads/utils";
import { categoryFilters, tagFilters, type Job } from "@/data/jobs";

type JobBoardProps = {
  jobs: Job[];
};

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/c\+\+/g, "cpp")
    .replace(/c\/c\+\+/g, "c cpp")
    .replace(/[^a-z0-9+#.]+/g, " ")
    .trim();
}

function getSearchText(job: Job) {
  return normalizeSearchValue(
    [
      job.title,
      job.category,
      job.countries,
      job.about,
      job.compensation,
      ...job.lookingFor,
      ...job.tags
    ].join(" ")
  );
}

export function JobBoard({ jobs }: JobBoardProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    try {
      if (typeof window === "undefined") {
        return [];
      }

      const storedJobs = window.localStorage.getItem("saved-jobs");

      if (storedJobs) {
        const parsedJobs = JSON.parse(storedJobs);
        return Array.isArray(parsedJobs)
          ? parsedJobs.filter((title): title is string => typeof title === "string")
          : [];
      }
    } catch {
      return [];
    }

    return [];
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("saved-jobs", JSON.stringify(savedJobs));
    } catch {
      // Saving is a progressive enhancement; browsing and applying still work.
    }
  }, [savedJobs]);

  const filters = useMemo(
    () => [
      { label: "All roles", value: "all", count: jobs.length },
      { label: "Saved", value: "saved", count: savedJobs.length },
      ...tagFilters,
      ...categoryFilters
    ],
    [jobs.length, savedJobs.length]
  );

  const visibleJobs = useMemo(() => {
    const queryTerms = normalizeSearchValue(query).split(" ").filter(Boolean);

    return jobs.filter((job) => {
      const filterTargets = [
        job.category,
        ...job.tags
      ].map((value) => value.trim().toLowerCase());
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "saved" && savedJobs.includes(job.title)) ||
        filterTargets.includes(activeFilter);
      const searchableText = getSearchText(job);
      const matchesSearch =
        queryTerms.length === 0 ||
        queryTerms.every((term) => searchableText.includes(term));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, jobs, query, savedJobs]);

  // Interleave ads into the visible jobs list
  const feedWithAds = useMemo(() => {
    return interleaveAds(visibleJobs, {
      firstAdIndex: 2, // First ad after 2nd job
      frequency: 6,    // Every 6 jobs thereafter
      maxAds: 50       // Scalable limit
    });
  }, [visibleJobs]);

  function toggleSavedJob(title: string) {
    setSavedJobs((currentJobs) =>
      currentJobs.includes(title)
        ? currentJobs.filter((savedTitle) => savedTitle !== title)
        : [...currentJobs, title]
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="grid-texture pointer-events-none absolute inset-x-0 top-0 h-[34rem]" />

      <nav className="sticky top-0 z-30 border-b border-line bg-slate-950/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="focus-ring flex items-center gap-3 rounded-md">
            <span className="flex size-10 items-center justify-center rounded-md bg-teal-300 text-slate-950">
              <BriefcaseBusiness className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">Remote AI Jobs</span>
              <span className="block text-xs text-slate-400">Curated remote roles</span>
            </span>
          </a>
          <div className="hidden items-center gap-4 text-sm text-slate-300 sm:flex">
            <span>{jobs.length} open roles</span>
            <a
              href="#jobs"
              className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-slate-700 px-4 font-semibold text-slate-100 transition hover:border-teal-300/60 hover:text-teal-100"
            >
              View Jobs
            </a>
          </div>
        </div>
      </nav>

      <section id="top" className="relative mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 md:pt-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-teal-200/30 bg-teal-200/10 px-3 py-2 text-sm font-semibold text-teal-100">
              <Sparkles className="size-4" aria-hidden="true" />
              Specialist AI work, remote-first
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-normal text-white sm:text-5xl lg:text-6xl">
              Remote AI Jobs
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Curated remote opportunities in AI training, expert evaluation, data annotation, and applied domain review.
            </p>
            <div className="mt-6 grid max-w-2xl grid-cols-3 gap-3">
              <div className="rounded-lg border border-line bg-slate-950/60 p-4">
                <p className="text-2xl font-bold text-white">{jobs.length}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                  Open roles
                </p>
              </div>
              <div className="rounded-lg border border-line bg-slate-950/60 p-4">
                <p className="text-2xl font-bold text-white">{categoryFilters.length}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                  Categories
                </p>
              </div>
              <div className="rounded-lg border border-line bg-slate-950/60 p-4">
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                  Remote
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border border-line bg-slate-950/72 p-4 shadow-glow backdrop-blur md:p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-white">Find a role</h2>
                <p className="mt-1 text-sm text-slate-400">Search by title, category, country, or skill.</p>
              </div>
              <ShieldCheck className="size-5 text-teal-200" aria-hidden="true" />
            </div>
            <label htmlFor="job-search" className="sr-only">Search jobs</label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="job-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, country, skill, or category"
                className="focus-ring min-h-12 w-full rounded-md border border-slate-700 bg-slate-900 py-3 pl-12 pr-12 text-base text-white placeholder:text-slate-500"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="focus-ring absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Filter className="size-4 text-slate-400" aria-hidden="true" />
              Filter roles
            </div>
            <div className="mt-3 flex flex-wrap gap-2" aria-label="Job filters">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.value;

                return (
                  <button
                    type="button"
                    key={filter.value}
                    onClick={() => setActiveFilter(isActive ? "all" : filter.value)}
                    aria-pressed={isActive}
                    className={`focus-ring min-h-9 rounded-md border px-3 text-sm font-semibold transition ${
                      isActive
                        ? "border-teal-300 bg-teal-300 text-slate-950"
                        : "border-slate-700 bg-slate-900 text-slate-200 hover:border-teal-300/60"
                      }`}
                  >
                    {filter.label}
                    <span className="ml-2 text-xs opacity-70">{filter.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Hero Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <AdSlot placement="HOME_HERO_TOP_01" lazy={false} />
      </div>

      <section id="jobs" className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
              Open Roles
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Browse curated AI work</h2>
          </div>
          <p className="text-sm text-slate-400">
            Showing {visibleJobs.length} of {jobs.length} roles
          </p>
        </div>

        {feedWithAds.length > 0 ? (
          <div className="grid gap-5">
            {feedWithAds.map((item, index) => {
              if ('isAd' in item) {
                return (
                  <AdSlot 
                    key={`ad-${index}`} 
                    placement={item.slotId} 
                    className="my-4"
                  />
                );
              }
              
              return (
                <JobCard
                  key={item.title}
                  job={item}
                  index={index}
                  isSaved={savedJobs.includes(item.title)}
                  onToggleSaved={toggleSavedJob}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-line bg-slate-950/72 p-8 text-center">
            <p className="text-lg font-semibold text-white">No roles match that search.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveFilter("all");
              }}
              className="focus-ring mt-4 inline-flex min-h-10 items-center justify-center rounded-md bg-teal-300 px-4 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Footer Ad Spot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <AdSlot placement="FOOTER_GRID_01" />
      </div>

      <footer className="border-t border-line bg-slate-950/90 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-white">Remote AI Jobs</p>
            <p className="mt-1">Curated remote AI and expert data opportunities.</p>
          </div>
          <div className="flex items-center gap-6 text-slate-300">
            <a href="/privacy" className="hover:text-teal-400 transition text-xs font-medium">Privacy Policy</a>
            <div className="flex items-center gap-2">
              <BookmarkCheck className="size-4 text-teal-200" aria-hidden="true" />
              {savedJobs.length} saved
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
