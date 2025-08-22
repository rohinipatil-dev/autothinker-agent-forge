import { useState } from "react";

type Item = {
  id: string;
  name: string;
  url: string;
  createdAt: string;
};

export default function Collections() {
  const [items, setItems] = useState<Item[]>([]);

  // Dummy data for demo
  const addDummy = () => {
    const n = items.length + 1;
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        name: `Agent ${n}`,
        url: `https://example.com/agent/${n}`,
        createdAt: new Date().toLocaleString(),
      },
    ]);
  };

  return (
    <section id="Collections" className="py-16 md:py-24">
      <div className="container text-center"> {/* 👈 text-center applied here */}
        {/* Centered heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Collections
        </h2>

        {/* Centered subtitle/description */}
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Saved agent links will appear here. (Frontend-only placeholder)
        </p>

        {/* Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={addDummy}
            className="px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90"
          >
            Add dummy item
          </button>
        </div>

        {/* Items grid */}
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No items yet. After creating an agent, save it here.
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <li
                key={it.id}
                className="rounded-lg border p-4 bg-card text-card-foreground"
              >
                <a
                  href={it.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary hover:underline break-all"
                >
                  {it.name}
                </a>
                <div className="text-xs text-muted-foreground">{it.createdAt}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
