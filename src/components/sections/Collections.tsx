import { useCollections } from "@/context/CollectionsContext";
import { ExternalLink, Trash2, Loader2, Clock, Sparkles } from "lucide-react";

export default function Collections() {
  const { items, removeItem, clear } = useCollections();

  return (
    <section id="Collections" className="py-16 md:py-24 bg-gradient-to-b from-background to-background/50">
      <div className="container text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Your AI Collection
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
            Beautiful AI agents with stunning auto-generated thumbnails, ready to serve.
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex justify-center mb-12">
            <button
              onClick={clear}
              className="group px-6 py-3 rounded-full bg-destructive/10 hover:bg-destructive/20 transition-all duration-300 border border-destructive/20 hover:border-destructive/40"
            >
              <span className="text-destructive font-medium group-hover:text-destructive/80">
                Clear all collections
              </span>
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <div className="max-w-md mx-auto">
            <div className="relative p-12 rounded-3xl border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-muted/30 to-muted/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-3xl"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No agents yet</h3>
                <p className="text-muted-foreground">
                  Generate your first AI agent in the Playground above to see it here!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-left">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-card border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: `fadeInUp 0.6s ease-out forwards ${index * 100}ms`
                }}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* AI-Generated Thumbnail with enhanced styling */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.thumbnailStatus === 'loading' ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative">
                      {/* Animated shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin text-white mb-3 mx-auto" />
                          <div className="text-white/90 text-sm font-medium">Creating magic...</div>
                        </div>
                      </div>
                      {/* Status badge */}
                      <div className="absolute top-3 left-3">
                        <div className="bg-blue-600/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
                          <Sparkles className="w-3 h-3 inline mr-1" />
                          Generating
                        </div>
                      </div>
                    </div>
                  ) : item.thumbnailStatus === 'success' && item.thumbnail ? (
                    <>
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {/* Success badge */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-green-600/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                          <Sparkles className="w-3 h-3 inline mr-1" />
                          AI Generated
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 relative overflow-hidden">
                      {/* Subtle pattern background */}
                      <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 0), radial-gradient(circle at 75% 75%, white 2px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-center">
                        <div>
                          <div className="text-4xl mb-3">🤖</div>
                          <div className="text-white font-semibold text-lg mb-1">{item.name}</div>
                          <div className="text-white/70 text-sm">AI Agent</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content section with better typography and spacing */}
                <div className="p-6 relative z-10">
                  <div className="mb-4">
                    <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Created {new Date(item.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</span>
                    </div>

                    {/* Agent type badge based on name */}
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {item.name.toLowerCase().includes('chatbot') ? '💬 Chatbot' :
                         item.name.toLowerCase().includes('assistant') ? '🤖 Assistant' :
                         item.name.toLowerCase().includes('teacher') ? '👨‍🏫 Teacher' :
                         item.name.toLowerCase().includes('helper') ? '🛟 Helper' :
                         '✨ AI Agent'}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons with better styling */}
                  <div className="flex items-center gap-3">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="launch-button flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
                    >
                      <ExternalLink className="launch-icon h-4 w-4 transition-transform duration-300" />
                      Launch Agent
                    </a>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="delete-button p-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 transform hover:scale-110"
                      title="Remove from collection"
                    >
                      <Trash2 className="delete-icon h-4 w-4 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                {/* Subtle border glow effect */}
                <div className="absolute inset-0 rounded-2xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
