const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function uploadPrediction({ name = "", age = "", file }) {
  try {
    const form = new FormData();
    form.append("name", name);
    form.append("age", age);
    // IMPORTANT: backend expects the file field name "fingerprint"
    form.append("fingerprint", file);

    const res = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      // Try to read error body
      let t = "";
      try { t = await res.text(); } catch {}
      throw new Error(`Server responded ${res.status}: ${t || res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}
