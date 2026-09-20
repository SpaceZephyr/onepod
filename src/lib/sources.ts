import type { Podcast } from "./types";

export interface SourceItem {
  name: string;
  description: string;
  url: string;
  count?: number;
  avatarUrl?: string;
}

const PODCAST_DESCRIPTIONS: Record<string, string> = {
  "Y Combinator": "创业者、AI 公司和早期产品构建者的一手访谈。",
  "Latent Space": "面向 AI 工程师和研究者的技术访谈与行业讨论。",
  Every: "围绕 AI、知识工作、组织和软件产品的深度内容。",
  "The MAD Podcast (Matt Turck)": "数据、AI、基础设施和企业软件创业者访谈。",
  "The MAD Podcast with Matt Turck": "数据、AI、基础设施和企业软件创业者访谈。",
  "Peter Yang": "产品、创作者经济和 AI 工作流相关访谈。",
  "Lenny's Podcast": "产品增长、创业和团队建设的一线经验。",
  "Lex Fridman": "AI、科学、工程和思想领域的长访谈。",
  "South Park Commons": "技术创业者、研究者和产品构建者的深度对话。",
  "The Pragmatic Engineer": "工程管理、软件行业和开发者职业观察。",
  "Andrej Karpathy": "AI 教育、深度学习、编程和技术直觉讲解。",
  Anthropic: "Claude、AI 安全、模型能力和研究进展发布。",
  "No Priors": "AI 创业者、研究者和投资人访谈。",
  a16z: "科技趋势、创业、投资和 AI 行业观点。",
  "Google DeepMind": "AI 研究、模型能力和前沿科学应用。",
  "Google for Developers": "开发者工具、AI API、平台能力和工程实践。",
  "Stanford GSB": "商业、领导力和技术趋势相关公开访谈。",
  "Mckay Wrigley": "AI coding、产品构建和个人自动化实践。",
  "Tiago Forte": "知识管理、生产力和创作者工作流。",
  "The AI Daily Brief": "每日 AI 新闻、产品动态和行业趋势。",
  TBPN: "科技商业、AI 创业和硅谷实时讨论。",
  "Brett Malinowski": "AI 工具、自动化和创业机会拆解。",
  "Invest Like the Best": "投资人和公司创始人的长期主义访谈，覆盖科技、商业模式和资本配置。",
  "The All-In Podcast": "硅谷投资人和创业者围绕 AI、科技政策、资本市场和商业趋势的圆桌讨论。",
  Acquired: "用长篇公司史拆解伟大科技公司、商业模式和创始人决策。",
  "CNBC Television": "全球商业、科技公司、市场和宏观经济的即时视频内容。",
  "Dwarkesh Patel": "AI 研究者、创业者和思想家的长访谈，偏技术前沿和长期判断。",
  "Core Memory (Ashlee Vance)": "Ashlee Vance 主持的科技人物和硬科技公司访谈。",
  "Joseph Noel Walker": "科技、社会、科学和商业人物的深度访谈。",
  "The Information Bottleneck": "围绕 AI、信息理论、机器学习和研究进展的高密度讨论。",
  "How I Write (David Perell)": "创作者、写作者和创业者关于表达、内容和个人知识系统的访谈。",
  "Huberman Lab": "神经科学、健康、认知表现和行为科学的长内容。",
  "Big Technology": "Alex Kantrowitz 主持的科技新闻与大公司访谈，常覆盖 AI、平台和硅谷权力结构。",
  "Hard Fork": "纽约时报科技播客，追踪 AI、平台、监管和消费科技的最新变化。",
  "AI Engineer": "面向 AI 工程师、创始人和研究者的会议演讲与技术访谈。",
  "20VC with Harry Stebbings": "Harry Stebbings 主持的 VC、创业融资、AI 公司和增长访谈。",
  "Real Vision": "宏观、市场、科技投资和风险资产的深度访谈。",
  "Patrick Boyle": "用金融和商业视角拆解市场、科技泡沫、宏观和资本结构。",
  "David Senra": "与创始人对话，提炼创业史、公司建设和商业判断。",
  "Goldman Sachs": "高盛关于市场、科技投资、AI 资本开支和宏观趋势的公开观点。",
  Stratechery: "Ben Thompson 对科技平台、商业模式、AI 和产业结构的策略分析。",
  "Sequoia Capital": "Sequoia 的创业、AI builder 和技术公司访谈，包括 Training Data 系列。",
  "Product Pathways": "面向产品经理和 AI 产品构建者的产品方法、组织和实战讨论。",
  "How I AI": "Claire Vo 主持的实操型 AI 访谈，聚焦团队如何把 AI 用进真实工作流。",
  "Big Think": "科学、数学、哲学与认知领域思想家的高密度讲解和访谈。",
  "Kanał Zero": "Krzysztof Stanowski 主持的波兰语公共议题、文化与人物深度节目。",
  "The Knowledge Project Podcast": "Shane Parrish 主持的长期主义访谈，关注决策、习惯、思维模型与人生策略。",
};

const PODCAST_SKILL_CHANNELS = [
  ["Andrej Karpathy", "@AndrejKarpathy"],
  ["Anthropic", "@anthropic-ai"],
  ["Lex Fridman", "@lexfridman"],
  ["Lenny's Podcast", "@LennysPodcast"],
  ["Peter Yang", "@PeterYangYT"],
  ["The MAD Podcast (Matt Turck)", "@DataDrivenNYC"],
  ["Every", "@EveryInc"],
  ["Y Combinator", "@ycombinator"],
  ["Latent Space", "@LatentSpacePod"],
  ["South Park Commons", "@southparkcommons"],
  ["No Priors", "@NoPriorsPodcast"],
  ["a16z", "@a16z"],
  ["Google DeepMind", "@googledeepmind"],
  ["Google for Developers", "@GoogleDevelopers"],
  ["Stanford GSB", "@stanfordgsb"],
  ["Mckay Wrigley", "@realmckaywrigley"],
  ["Tiago Forte", "@TiagoForte"],
  ["The Pragmatic Engineer", "@ThePragmaticEngineer"],
  ["The AI Daily Brief", "@TheAIDailyBrief"],
  ["TBPN", "@TBPNLive"],
  ["Brett Malinowski", "@TheBrettWay"],
  ["Invest Like the Best", "@ILTB_Podcast"],
  ["The All-In Podcast", "@allin"],
  ["Acquired", "@AcquiredFM"],
  ["CNBC Television", "@CNBCtelevision"],
  ["Dwarkesh Patel", "@DwarkeshPatel"],
  ["Core Memory (Ashlee Vance)", "@CoreMemoryVideos"],
  ["Joseph Noel Walker", "@josephnoelwalker"],
  ["The Information Bottleneck", "@information_bottleneck"],
  ["How I Write (David Perell)", "@DavidPerellChannel"],
  ["Huberman Lab", "@hubermanlab"],
  ["Big Technology", "@BigTechnologyPodcast"],
  ["Hard Fork", "@hardfork"],
  ["AI Engineer", "@aiDotEngineer"],
  ["20VC with Harry Stebbings", "@20VC"],
  ["Real Vision", "@RealVisionFinance"],
  ["Patrick Boyle", "@PBoyle"],
  ["David Senra", "@DavidSenra"],
  ["Goldman Sachs", "@GoldmanSachs"],
  ["Stratechery", "@Stratechery"],
  ["Sequoia Capital", "channel/UCWrF0oN6unbXrWsTN7RctTw"],
  ["Product Pathways", "channel/UCFHnDTQrRshnLzLUJ3mvGQQ"],
  ["How I AI", "@howiaipodcast"],
  ["Big Think", "channel/UCvQECJukTDE2i6aCoMnS-Vg"],
  ["Kanał Zero", "@KanalZeroPL"],
  ["The Knowledge Project Podcast", "@tkppodcast"],
] as const;

const CHANNEL_NAME_ALIASES: Record<string, string> = {
  "The MAD Podcast with Matt Turck": "The MAD Podcast (Matt Turck)",
  "Stanford Graduate School of Business": "Stanford GSB",
  "All-In Podcast": "The All-In Podcast",
  "All-In with Chamath, Jason, Sacks & Friedberg": "The All-In Podcast",
  "The Twenty Minute VC (20VC): Venture Capital | Startup Funding | The Pitch": "20VC with Harry Stebbings",
  "The Twenty Minute VC (20VC)": "20VC with Harry Stebbings",
  "20VC with Harry Stebbings": "20VC with Harry Stebbings",
  "Latent Space: The AI Engineer Podcast": "Latent Space",
  "Lenny's Podcast: Product | Career | Growth": "Lenny's Podcast",
  "David Perell (How I Write)": "How I Write (David Perell)",
  "Dwarkesh Podcast": "Dwarkesh Patel",
};

export function normalizePodcastChannelName(name: string | null | undefined): string {
  if (!name) return "";
  const trimmed = name.trim();
  return CHANNEL_NAME_ALIASES[trimmed] || trimmed;
}

const PODCAST_AVATARS: Record<string, string> = {
  "Andrej Karpathy": "https://yt3.googleusercontent.com/ytc/AIdro_nDvyq2NoPL626bk1IbxQ94SfQsD-B0qgZchghtQNkLWoEz=s900-c-k-c0x00ffffff-no-rj",
  Anthropic: "https://yt3.googleusercontent.com/ux-GXUpB4PkI-qXVOpj9gGEiCkytT0Q78ka4srlxOm_Y3m1gEh5qy8Vu6vTjGSDztMT0NybtC7I=s900-c-k-c0x00ffffff-no-rj",
  "Lex Fridman": "https://yt3.googleusercontent.com/ytc/AIdro_ljfMy9kUR1PH9VRf-XsTsPqFMgORC_zodOQVEAm4hx36lC=s900-c-k-c0x00ffffff-no-rj",
  "Lenny's Podcast": "https://yt3.googleusercontent.com/Wk7-4UW17JqDXgVWDiE7s1gJxDkt_UwNa2oNw8OYRwc9deiCv2V2fFAdNgByDi0K9AAF0YMj=s900-c-k-c0x00ffffff-no-rj",
  "Peter Yang": "https://yt3.googleusercontent.com/ytc/AIdro_k0xbR9-CBYMh3YOZJnMQr00qwnbA_aAChW3z0I8lNcGRE=s900-c-k-c0x00ffffff-no-rj",
  "The MAD Podcast (Matt Turck)": "https://yt3.googleusercontent.com/zELsyYmenYTQanNFH9Vti3fuVN2Dkky0AGvVlMLUeTvssEiWIdIKKmwNxtrgmAKWGeN4F9RnNIc=s900-c-k-c0x00ffffff-no-rj",
  Every: "https://yt3.googleusercontent.com/n6p0RudkPKoaFsxiZfunvI5MpqS443Qfbf2E4mmAy1k0etF4M7etYyJAJ_RMknfit6Tnxx4Du4g=s900-c-k-c0x00ffffff-no-rj",
  "Y Combinator": "https://yt3.googleusercontent.com/dGyATx87Fp_s1nZvnupUFSnMqbAPZ6nqRby9Esk1m6YE41iBq-9Z8iGoIgHTCT9SiDBUpP2V=s900-c-k-c0x00ffffff-no-rj",
  "Latent Space": "https://yt3.googleusercontent.com/pSTHcffCXEverYEPdjM0iIRPH-IUT4d2biIMZ_Z7bhyf6sME-laFer9vEfpFbM5tqFYJV-UsLQ=s900-c-k-c0x00ffffff-no-rj",
  "South Park Commons": "https://yt3.googleusercontent.com/rTHi9Q-VulPPgZLDdamX57N_db9TognfYKHMG9liMbpFmSNAA5hTm7nyU0QLXgfU3E50LurN3wE=s900-c-k-c0x00ffffff-no-rj",
  "No Priors": "https://yt3.googleusercontent.com/HQXIpkLms_iVMi_Ob5Cie3PNcZ3smOT7HeNLIAWvBO-lZMdiax2N5LH1blWMxUtMrJCcXyNZ=s900-c-k-c0x00ffffff-no-rj",
  a16z: "https://yt3.googleusercontent.com/hkiO7UAtALrbqOcewo4CIrbd0j8XDeWttKkdtihfX1emeV4iUMwjIe1KKn4zd6wT2OOwANDnIA=s900-c-k-c0x00ffffff-no-rj",
  "Google DeepMind": "https://yt3.googleusercontent.com/xofhdRNoyqgAB_YpJgAQeasGtE6gTEXpR2v1vyMmtqlRCmoEUIsTGJcavUORLhhKQk3b9UeUFw=s900-c-k-c0x00ffffff-no-rj",
  "Google for Developers": "https://yt3.googleusercontent.com/WZ_63J_-745xyW_DGxGi3VUyTZAe0Jvhw2ZCg7fdz-tv9esTbNPZTFR9X79QzA0ArIrMjYJCDA=s900-c-k-c0x00ffffff-no-rj",
  "Stanford GSB": "https://yt3.googleusercontent.com/ytc/AIdro_lWoHJNSE1UPPiFdCG4_aQZ1apKXrKI7nZ_sFlKwhNwRl0=s900-c-k-c0x00ffffff-no-rj",
  "Mckay Wrigley": "https://yt3.googleusercontent.com/ytc/AIdro_m114mcpiz4WMxjxkci1z8z3XXCP64yYoL2Z4wsjM2bNdWO=s900-c-k-c0x00ffffff-no-rj",
  "Tiago Forte": "https://yt3.googleusercontent.com/CqC4SrpXMCHA9b39JDtbXxefJ0TlHmaxFpAxSKqDCBVIudLl50gtlYA5fmIIGFlc4mjE1-uw6w=s900-c-k-c0x00ffffff-no-rj",
  "The Pragmatic Engineer": "https://yt3.googleusercontent.com/ytc/AIdro_mzrMszjXcIm7EdsK_QfN9Pk7YXbiXj9fihf86JaB8=s900-c-k-c0x00ffffff-no-rj",
  "The AI Daily Brief": "https://yt3.googleusercontent.com/kNdRN_Aa_xXvA1Y2KxcephehAzzbvyYbnm2xGg7MjUZ11yHpVah2GqsprxIXlA57uhdl97yF=s900-c-k-c0x00ffffff-no-rj",
  TBPN: "https://yt3.googleusercontent.com/1QdlbXwJRXYY6leF-ULTE8ahNmTYEgezebSqVDZqI2DLGSkRCCcvcUtdkAhOj5mLB8C0AK_J=s900-c-k-c0x00ffffff-no-rj",
  "Brett Malinowski": "https://yt3.googleusercontent.com/jVlCb_H_mcYd9UkwcSLvoTDG3SRTobvGUQ22PLtogxFGJpbbXOVXhdzY9wULJe6hVLFbfdu2vQ=s900-c-k-c0x00ffffff-no-rj",
  "Invest Like the Best": "https://yt3.googleusercontent.com/78AMaBuqLsXiEDcsRDGdorTMEOJR9_ybvMKZ5dwtqnj_POrIzHMmRUsBy5da255luUCsd9fA=s900-c-k-c0x00ffffff-no-rj",
  "The All-In Podcast": "https://yt3.googleusercontent.com/ytc/AIdro_nPfH_2C5hQamMDz9i_b5mcFXYzym_qSV6mQqa6GQ=s900-c-k-c0x00ffffff-no-rj",
  Acquired: "https://yt3.googleusercontent.com/T76mIN42SrBDYIJDuBsJ-_zCkkoV37vhZ-VAsUx0rPb5YCzr99l1vzXMUsNTP9ZQsN6e-RxI=s900-c-k-c0x00ffffff-no-rj",
  "CNBC Television": "https://yt3.googleusercontent.com/ytc/AIdro_lZSh1UFSJgpq7hCgJp4W72-gZ1Fc6Lh5wN7hQOGk7LvVw=s900-c-k-c0x00ffffff-no-rj",
  "Dwarkesh Patel": "https://yt3.googleusercontent.com/Xhx80as-0fhg_Ag59pOnrTQvbf6zGbFDgxWhYUWYR77GMYQXUVJpRxeWyPyQm2fJhA-qw1ao=s900-c-k-c0x00ffffff-no-rj",
  "Core Memory (Ashlee Vance)": "https://yt3.googleusercontent.com/2y1DAilVrHF9KEtSAxsKu7uVfGGa5ZQys0HVECGhFSbENPQ4ifLKAHgInkg2HIrAwRUAiPX3=s900-c-k-c0x00ffffff-no-rj",
  "Joseph Noel Walker": "https://yt3.googleusercontent.com/uGltCcucH3lJaaL4NpGKCGmfkxVvOs5oi1vJG_XBv8tkoDEYF0FtGzEx4LRm-nKH4KCG7yQy=s900-c-k-c0x00ffffff-no-rj",
  "The Information Bottleneck": "https://yt3.googleusercontent.com/EbwDzvpWpmaANk7zXT0pGg7VsuKMnr0pzUyPOZ4taaxwFNClImJVfkajSeziUxmGMksaQMlUTw=s900-c-k-c0x00ffffff-no-rj",
  "How I Write (David Perell)": "https://yt3.googleusercontent.com/kPbhWUm1xRu12N3Y6Ct1RvMeRqQDj2jSqznUhR312hwdMYlW9QaZLcZTMfSjxn7IcuwQPJo-=s900-c-k-c0x00ffffff-no-rj",
  "Huberman Lab": "https://yt3.googleusercontent.com/aIeHXiBl7R6DEQd8DAVpNBS9oWSUqajmfKNpIaBBK2Il8BrQHyAMsgYVi3tNtLb_xLud7l3t=s900-c-k-c0x00ffffff-no-rj",
  "Big Technology": "https://yt3.googleusercontent.com/DxVHHiAYSavR5rIwm4EUzZ7Z8nyIHaQn-QB_4r_bNEeU2jXQBp9Gcb6Vz24HWG7XIWW9Yd1YFg=s900-c-k-c0x00ffffff-no-rj",
  "Hard Fork": "https://yt3.googleusercontent.com/11kb6ShkX3k0W3_NQhogENqJB4BpJEssk4tdeqNOxLbsShQDgUTIwF6NVdsCm_IbCq5jqCM1=s900-c-k-c0x00ffffff-no-rj",
  "AI Engineer": "https://yt3.googleusercontent.com/ajVemEB89DAOemsbfuMY6ZOWXJAACx3cbty9z21jeqRKODaVkDBSRun1b1xfQJljEsziOWS_Mg=s900-c-k-c0x00ffffff-no-rj",
  "20VC with Harry Stebbings": "https://yt3.googleusercontent.com/Du3wg7EZp9LaKFfVcOuKbEn0xFPryiiQgGQ9sJ9u11UCOmAAhp_5g9x9w1Fux5ijjfqb0COq=s900-c-k-c0x00ffffff-no-rj",
  "Real Vision": "https://yt3.googleusercontent.com/AB1DrmCzUFAlZSzlYhxQArRe2_Uwg4SewQlXcwvht9VmF95Bc-_Wje_rprG4HYE9cBO0cyvh=s900-c-k-c0x00ffffff-no-rj",
  "Patrick Boyle": "https://yt3.googleusercontent.com/cq4tU8wKdp_Y7yZIBxwAsSzecE-3VYDLkRXGo08-FuFwP_fwl7aMDTWY-_OEWGSw5iWDu-S29w=s900-c-k-c0x00ffffff-no-rj",
  "David Senra": "https://yt3.googleusercontent.com/2yUUt7GiVvaIvJFypoy-IjPbfwpe9dfYlYfr0mI03b3BYN6MqJGbdFpNgdDbYH4F3uuB5aYmpg=s900-c-k-c0x00ffffff-no-rj",
  "Goldman Sachs": "https://yt3.googleusercontent.com/DPQOZV-Fjm88XC9XBA1YwhB3LiaXRfdr0ZysHVl2PTP2fSNSesBm6pk9HwTUUC73M05x7ZkJIug=s900-c-k-c0x00ffffff-no-rj",
  Stratechery: "https://yt3.googleusercontent.com/G3KKbnKufJOIVSn2K-p-4DrmYkR50LHZileEND4IhJ38sLdznQIYOUShN7qqvG1G5vPvB63Mml8=s900-c-k-c0x00ffffff-no-rj",
  "Sequoia Capital": "https://yt3.googleusercontent.com/uCN-D7KzMQY-Ti-xTsNAwilXVFFMYjEBRju_mXrR22HUYxJZjVZgP_SnamO9KbPo2XN-nE3O-A=s900-c-k-c0x00ffffff-no-rj",
  "Product Pathways": "https://yt3.googleusercontent.com/nbYOlBIdjOt7d0sNBZIAA56CLWF3BpJA0oc6Z1zcP2Sadxczv6xxG863c4XjaOU9ppywgDdSyV4=s900-c-k-c0x00ffffff-no-rj",
};

export function getPodcastSources(podcasts: Podcast[]): SourceItem[] {
  const counts = new Map<string, number>();

  for (const podcast of podcasts) {
    const name = podcast.ytChannel?.trim();
    if (!name) continue;
    const normalized = normalizePodcastChannelName(name);
    counts.set(normalized, (counts.get(normalized) || 0) + 1);
  }

  return PODCAST_SKILL_CHANNELS.map(([name, handle]) => ({
    name,
    url: `https://www.youtube.com/${handle}`,
    count: counts.get(name) || 0,
    avatarUrl: PODCAST_AVATARS[name],
    description:
      PODCAST_DESCRIPTIONS[name] ||
      "podcast-workflow / youtube-feed skill 中配置的海外 AI、科技、创业播客。",
  })).sort((a, b) => {
    const countDiff = (b.count || 0) - (a.count || 0);
    if (countDiff !== 0) return countDiff;
    return a.name.localeCompare(b.name);
  });
}
