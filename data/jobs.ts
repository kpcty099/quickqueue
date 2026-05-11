import jobs from "@/data/jobs_enriched.json";

export type JobIconName =
  | "badge"
  | "brain"
  | "camera"
  | "clipboard"
  | "globe"
  | "languages";

export type Job = {
  title: string;
  category: string;
  countries: string;
  about: string;
  lookingFor: string[];
  compensation: string;
  tags: string[];
  iconName: JobIconName;
  link: string;
};

const trendingTitles = new Map([
  ["Generalist AI Trainer", 0],
  ["Generalist AI Trainer (Visual Content)", 1]
]);

export const staticJobs = [...(jobs as Job[])].sort((firstJob, secondJob) => {
  const firstRank = trendingTitles.get(firstJob.title) ?? 100;
  const secondRank = trendingTitles.get(secondJob.title) ?? 100;

  if (firstRank !== secondRank) {
    return firstRank - secondRank;
  }

  return 0;
});

export type FilterOption = {
  label: string;
  value: string;
  count: number;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function uniqueOptions(values: string[]): FilterOption[] {
  const counts = values.reduce<Map<string, FilterOption>>((accumulator, value) => {
    const normalized = normalize(value);
    const existing = accumulator.get(normalized);

    if (existing) {
      existing.count += 1;
      return accumulator;
    }

    accumulator.set(normalized, {
      label: value,
      value: normalized,
      count: 1
    });

    return accumulator;
  }, new Map());

  return Array.from(counts.values()).sort((first, second) =>
    first.label.localeCompare(second.label)
  );
}

export const categoryFilters = uniqueOptions(staticJobs.map((job) => job.category));
export const tagFilters = uniqueOptions(staticJobs.flatMap((job) => job.tags));
