export type BlogPost = {
  id: string;
  created_at: string;
  updated_at: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  category: string | null;
  author: string | null;
  status: "draft" | "published" | "archived";
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
};

export type BlogPostsPageResult = {
  data: BlogPost[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};
