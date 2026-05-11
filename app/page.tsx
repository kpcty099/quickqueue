import { JobBoard } from "@/components/job-board";
import { staticJobs } from "@/data/jobs";

export default function Home() {
  return <JobBoard jobs={staticJobs} />;
}
