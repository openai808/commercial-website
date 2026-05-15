export type ListingAgent = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  profile_picture_url: string | null;
  position: string | null;
};

/** Row shape from `listings_secure` with joined agent profile. */
export type ListingWithAgent = {
  id: string;
  created_at: string;
  status: string;
  agent_id?: string | null;
  slug?: string | null;
  title?: string | null;
  property_title?: string | null;
  name?: string | null;
  listing_type?: string | null;
  property_type?: string | null;
  asset_class?: string | null;
  city?: string | null;
  location?: string | null;
  address?: string | null;
  municipality?: string | null;
  cover_photo_url?: string | null;
  listing_photos_urls?: string | null;
  primary_image_url?: string | null;
  thumbnail_url?: string | null;
  image_url?: string | null;
  cover_image?: string | null;
  images?: string[] | null;
  price?: number | string | null;
  display_price?: string | null;
  floor_area?: number | string | null;
  floor_area_sqm?: number | string | null;
  floor_area_sqft?: number | string | null;
  building_size?: number | string | null;
  tags?: string[] | null;
  agent: ListingAgent | null;
  [key: string]: unknown;
};

export type PropertiesPageResult = {
  data: ListingWithAgent[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};
