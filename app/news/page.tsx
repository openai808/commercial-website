import type { Metadata } from "next";
import NewsRedirect from "./NewsRedirect";

const REDIRECT_URL = "https://remax8realtyph.com/re-max-news/";

export const metadata: Metadata = {
  title: "Redirecting…",
  robots: { index: false, follow: true },
};

export default function NewsPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${REDIRECT_URL}`} />
      <NewsRedirect url={REDIRECT_URL} />
    </>
  );
}
