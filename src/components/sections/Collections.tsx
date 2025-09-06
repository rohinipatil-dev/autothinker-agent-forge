import { useCollections } from "@/context/CollectionsContext";

export default function Collections() {
  const { items, removeItem, clear } = useCollections();

  return (
    <section id="Collections" className="py-16 md:py-24">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Collections</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Saved agent links appear here and persist in your browser.
        </p>

        {items.length > 0 && (
          <div className="flex justify-center mb-8">
            <button
              onClick={clear}
              className="px-3 py-2 rounded border hover:bg-muted"
            >
              Clear all
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No agents yet. Generate one in the Playground section.
          </div>
        ) : (
          <ul className="mx-auto max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
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
                <div className="mt-1 text-xs text-muted-foreground">
                  {new Date(it.createdAt).toLocaleString()}
                </div>
                <button
                  onClick={() => removeItem(it.id)}
                  className="mt-3 text-xs px-2 py-1 rounded border hover:bg-muted"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
