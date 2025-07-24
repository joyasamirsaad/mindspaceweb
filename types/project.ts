export interface Project {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  text?: string;
  client?: string;
  director?: string;
  agency?: string;
  cinematographer?: string;
}