export interface RepoDetailsProps {
  id: string;
  description?: string | null;
  owner?: string | null;
  stars?: number | null;
  forks?: number | null;
  watchers?: number | null;
  language?: string | null;
}
