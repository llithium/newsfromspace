import Link from "next/link";

export default function Footer() {
  return (
    <footer className="nfs">
      <div className="wrap">
        <div>
          <div className="brand">
            News <span className="from">from</span> Space
          </div>
          <div className="tagline">
            A front page for spaceflight, science, and the industry of leaving Earth.
          </div>
        </div>
        <div className="cols">
          <div className="col">
            <h4>Sections</h4>
            <Link href="/articles">Articles</Link>
            <Link href="/launches">Launches</Link>
            <Link href="/mission-control">Mission Control</Link>
            <Link href="/blogs">Blogs</Link>
          </div>
          <div className="col">
            <h4>Launches</h4>
            <Link href="/launches">Upcoming</Link>
            <Link href="/launches/past">Past</Link>
            <Link href="/mission-control">Providers</Link>
            <Link href="/mission-control">Spaceports</Link>
          </div>
          <div className="col">
            <h4>About</h4>
            <Link href="https://thespacedevs.com/snapi" target="_blank">
              Sources &amp; APIs
            </Link>
            <Link href="https://thespacedevs.com/llapi" target="_blank">
              Launch Library 2
            </Link>
            <Link href="/blogs">The Logbook</Link>
            <Link href="/articles">RSS</Link>
          </div>
        </div>
      </div>
      <div className="credit">
       News From Space · Data via Spaceflight News API &amp; Launch
        Library 2
      </div>
    </footer>
  );
}
