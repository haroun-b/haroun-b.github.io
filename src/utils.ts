import { works } from "./works";

const GH_API_URL = "https://api.github.com/repos/haroun-b";
const CACHE_NAME = "haroun.holyduck";

async function fetchWorks() {
  const promises: Promise<any>[] = [];

  for (const work of works) {
    promises.push(
      fetchWithCache(`${GH_API_URL}/${work.repoName}/languages`)
        .then((res) => res.json())
        .then((langs) => {
          work.languages = langs;
        }),
      fetchWithCache(`${GH_API_URL}/${work.repoName}`)
        .then((res) => res.json())
        .then((repo) => {
          work.license = repo.license.spdx_id;
          work.description = repo.description;
        })
    );
  }

  await Promise.all(promises);

  return works;
}

async function fetchWithCache(url: string) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(url);

  if (cachedResponse) {
    const ratelimitReset = cachedResponse.headers.get("x-ratelimit-reset");
    const shouldUseCache =
      ratelimitReset && Date.now() < parseInt(`${ratelimitReset}000`);

    if (shouldUseCache) {
      return cachedResponse;
    }
  }

  const networkResponse = await fetch(url);
  cache.put(url, networkResponse.clone());
  return networkResponse;
}

export { fetchWorks };
