import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const searchLimiter = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(5, "10 s"),
	analytics: true,
	timeout: 1000 * 60 * 2, // 2 minute timeout
	prefix: "search",
});

export const filterLimiter = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(10, "10 s"),
	analytics: true,
	timeout: 1000 * 60 * 4, // 4 minute timeout
	prefix: "create-playlist",
});
