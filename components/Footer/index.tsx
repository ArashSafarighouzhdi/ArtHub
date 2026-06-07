const Footer = () => {
  return (
    <footer className="border-t border-museum-line bg-black">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-between items-start gap-10">
          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-museum-light text-lg">
              Art Hub <span className="text-museum-gold">Harvard Museum</span>
            </h3>
            <p className="text-[11px] text-museum-warm tracking-wide max-w-[200px] leading-relaxed">
              Discover works across centuries and cultures.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] tracking-[0.15em] uppercase text-museum-warm font-medium">
              Developed by <span className="text-museum-gold">Arash</span>
            </h4>
            <div className="flex flex-col gap-2 text-[11px] text-museum-warm tracking-wider transition-colors [*_a]:w-fit hover:[*_a]:text-museum-gold">
              <a
                href="https://safariarash.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
              <a
                href="https://linkedin.com/in/safariarash"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:Safari.arash@gmail.com">Safari.arash@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="border-t border-museum-border mt-10 pt-6 text-center">
          <p className="text-[10px] text-museum-muted tracking-widest uppercase">
            © {new Date().getFullYear()} Arash Safari — Art Hub
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
