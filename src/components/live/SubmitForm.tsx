"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SandboxPreview from "@/components/live/SandboxPreview";

interface SubmitFormProps {
  remixOf?: { id: string; name: string; sourceCode: string; category: string };
}

const CATEGORIES = ["buttons", "loaders", "navbars", "backgrounds", "cards", "other"];

export default function SubmitForm({ remixOf }: SubmitFormProps) {
  const router = useRouter();
  const [name, setName] = useState(remixOf ? `${remixOf.name} remix` : "");
  const [category, setCategory] = useState(remixOf?.category ?? CATEGORIES[0]);
  const [tags, setTags] = useState("");
  const [sourceCode, setSourceCode] = useState(remixOf?.sourceCode ?? "");
  const [makerNote, setMakerNote] = useState("");
  const [behaviorNote, setBehaviorNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/drops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          sourceCode,
          makerNote,
          behaviorNote,
          remixedFrom: remixOf?.id ?? null,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
        return;
      }
      router.push("/live?submitted=1");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={80}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tags" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Tags (comma separated, up to 6)
          </label>
          <input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="hover, glow, cta"
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
          />
        </div>

        <div>
          <label htmlFor="makerNote" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Maker note (first person, why you built it)
          </label>
          <textarea
            id="makerNote"
            value={makerNote}
            onChange={(e) => setMakerNote(e.target.value)}
            required
            maxLength={600}
            rows={3}
            placeholder="I built this for a checkout where I wanted the button to feel like it pulls toward the cursor."
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
          />
        </div>

        <div>
          <label htmlFor="behaviorNote" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Behavior note (one line, what hover/presence behavior it shows)
          </label>
          <input
            id="behaviorNote"
            value={behaviorNote}
            onChange={(e) => setBehaviorNote(e.target.value)}
            required
            maxLength={600}
            placeholder="cursor-follow magnetic pull"
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
          />
        </div>

        <div>
          <label htmlFor="sourceCode" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            HTML + Tailwind classes (not JSX, use class not className)
          </label>
          <textarea
            id="sourceCode"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            required
            maxLength={20000}
            rows={10}
            spellCheck={false}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-white outline-none focus:border-cyan-500/50"
          />
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md border border-cyan-500/50 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-cyan-400 transition-colors hover:bg-cyan-500/20 disabled:opacity-50"
        >
          {submitting ? "Submitting" : "Submit for review"}
        </button>
        <p className="text-xs text-zinc-500">
          Submissions go into a review queue. A maintainer approves them before they appear in the feed.
        </p>
      </div>

      <div className="flex h-fit flex-col gap-2 rounded-2xl border border-white/10 bg-[#0a0a0d] p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Live preview</p>
        <SandboxPreview
          sourceCode={sourceCode || "<p style=\"color:#52525b;font-size:14px\">Nothing to preview yet.</p>"}
          active
          className="h-64 w-full rounded-lg border border-white/10"
        />
      </div>
    </form>
  );
}
