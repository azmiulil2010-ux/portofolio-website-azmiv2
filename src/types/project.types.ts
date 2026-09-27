export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePath: string; // Compatibility alias for existing UI
  image_path?: string; // Supabase DB column
  tech_stack: string[];
  github_url?: string;
  demo_url?: string;
  websiteUrl: string; // Compatibility alias for existing UI
  website_url?: string; // Supabase DB column
  is_published?: boolean;
  display_order?: number;
  created_at?: string;
}

export type ProjectInput = {
  id?: string;
  title: string;
  description: string;
  image?: string;
  image_path?: string;
  tech_stack?: string[] | string;
  github_url?: string;
  demo_url?: string;
  website_url?: string;
  is_published?: boolean;
  display_order?: number;
};

export type ProjectRow = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  image_path?: string | null;
  tech_stack?: string[] | string | null;
  github_url?: string | null;
  demo_url?: string | null;
  website_url?: string | null;
  is_published?: boolean | null;
  display_order?: number | null;
  created_at?: string | null;
};
