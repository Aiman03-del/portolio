export function Footer() {
  return (
    <footer className="bg-card/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-xl font-light tracking-widest text-accent mb-4">AS.</p>
            <p className="text-sm text-muted-foreground font-light">Full-stack developer crafting premium digital experiences.</p>
          </div>
          <div>
            <h3 className="text-sm font-light text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-light">
              <li><a href="/#projects" className="hover:text-accent transition-colors">Projects</a></li>
              <li><a href="/#expertise" className="hover:text-accent transition-colors">Expertise</a></li>
              <li><a href="/blog" className="hover:text-accent transition-colors">Blog</a></li>
              <li><a href="/#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-light text-foreground mb-4">Social</h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-light">
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground font-light">
          <p>&copy; 2026 Aiman Uddin Siam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
