import Link from "next/link";
import HomePodcastCard, { type HomePodcast } from "@/components/HomePodcastCard";

export default function HomeTabs({
  podcasts,
}: {
  podcasts: HomePodcast[];
}) {
  return (
    <main
      className="min-h-screen px-3 py-5 text-[#20251f] transition-colors duration-700 sm:px-5 md:px-8 lg:px-12"
      style={{ backgroundColor: "#e9ece8" }}
    >
      <div className="mx-auto max-w-[1680px]">
        <header className="mb-5 flex items-start justify-between gap-3 px-1 sm:mb-7 md:mb-9">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-[34px] font-semibold leading-none tracking-normal text-[#20251f] md:text-[48px]">
              Onepod
            </h1>
            <p className="mt-2 text-[13px] text-[#62705f] md:text-[14px]">
              每日精选海外科技播客
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <nav aria-label="首页导航" className="flex h-[34px] items-center gap-5 md:h-[48px] md:gap-8">
              <Link href="/news/" className="font-[family-name:var(--font-display)] text-[18px] font-semibold leading-none text-[#20251f] no-underline transition hover:text-[#5b6a57] md:text-[24px]">
                日报
              </Link>
              <Link href="/sources/" className="font-[family-name:var(--font-display)] text-[18px] font-semibold leading-none text-[#20251f] no-underline transition hover:text-[#5b6a57] md:text-[24px]">
                信源
              </Link>
            </nav>

            <div className="hidden text-right text-[12px] uppercase tracking-normal text-[#7d887c] sm:block">
              {podcasts.length} episodes
            </div>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {podcasts.map((podcast) => (
            <HomePodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </section>
      </div>
    </main>
  );
}
