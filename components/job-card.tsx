"use client";
import {
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Bookmark,
  BookmarkCheck,
  BrainCircuit,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  Languages,
  MapPin,
  Radio
} from "lucide-react";
import type { Job, JobIconName } from "@/data/jobs";

const icons: Record<JobIconName, typeof Camera> = {
  badge: BadgeCheck,
  brain: BrainCircuit,
  camera: Camera,
  clipboard: ClipboardCheck,
  globe: Globe2,
  languages: Languages
};

type JobCardProps = {
  job: Job;
  index: number;
  isSaved: boolean;
  onToggleSaved: (title: string) => void;
};

function getSafeApplyUrl(link: string) {
  try {
    const url = new URL(link);
    return url.protocol === "https:" ? url.href : "#";
  } catch {
    return "#";
  }
}

export function JobCard({ job, index, isSaved, onToggleSaved }: JobCardProps) {
  const Icon = icons[job.iconName] ?? Camera;
  const applyUrl = getSafeApplyUrl(job.link);

  return (
    <article
      style={{ transitionDelay: `${Math.min(index * 20, 120)}ms` }}
      className="group rounded-lg border border-line bg-slate-950/72 p-5 shadow-glow backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-teal-300/45 hover:bg-slate-900/86 md:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-teal-300/25 bg-teal-300/10 text-teal-200">
            <Icon className="size-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-cyan-200">{job.category}</p>
            <h2 className="mt-1 text-xl font-semibold tracking-normal text-white md:text-2xl">
              {job.title}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleSaved(job.title)}
            aria-pressed={isSaved}
            aria-label={isSaved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
            className="focus-ring flex size-10 items-center justify-center rounded-md border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-teal-300/60 hover:text-teal-100"
          >
            {isSaved ? (
              <BookmarkCheck className="size-4 text-teal-200" aria-hidden="true" />
            ) : (
              <Bookmark className="size-4" aria-hidden="true" />
            )}
          </button>
          <div className="flex items-center gap-2 rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-sm font-semibold text-emerald-100">
            <Radio className="size-4" aria-hidden="true" />
            Remote
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-2 text-sm text-slate-300">
        <MapPin className="mt-0.5 size-4 shrink-0 text-amber-200" aria-hidden="true" />
        <span>{job.countries}</span>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
            About The Role
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{job.about}</p>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
            Who We&apos;re Looking For
          </h3>
          <ul className="mt-3 space-y-2">
            {job.lookingFor.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-teal-200"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 text-sm text-slate-300">
          <Banknote className="mt-0.5 size-4 shrink-0 text-lime-200" aria-hidden="true" />
          <div>
            <p className="font-semibold text-white">Compensation</p>
            <p className="mt-1 leading-5">{job.compensation}</p>
          </div>
        </div>
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-teal-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
        >
          Apply
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
