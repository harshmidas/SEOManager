// utils/api.ts
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store", // disable caching for fresh SEO
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (err) {
    console.error("API Fetch Error:", err);
    throw err;
  }
}
