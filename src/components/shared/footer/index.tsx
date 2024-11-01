import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative max-w-full border-t text-sm font-medium">
      <div className="mx-auto flex max-w-7xl flex-wrap px-8 py-14">
        <div className="mr-auto flex flex-col justify-between">
          <Link
            href="/"
            className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
          >
            EchoSafe® Technology - Built Worldwide
          </Link>
          <span className="text-[#9c9da1]">
            © {new Date().getFullYear()} EchoSafe® All rights reserved.
          </span>
        </div>

        {/*         <div className="mx-auto">
          <h3 className="mb-3 font-medium text-[#b4bcd0]">Product</h3>
          <ul className="m-0 space-y-3 p-0">
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Integrations
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Changelog
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Integrations
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Integrations
              </Link>
            </li>
          </ul>
        </div> */}
        <div className="mx-auto">
          <h3 className="mb-3 font-medium text-[#b4bcd0]">Company</h3>
          <ul className="m-0 space-y-3 p-0">
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                About us
              </Link>
            </li>
            <li>
              <a
                href="https://www.theleadengineer.com/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Blog
              </a>
            </li>
            {/* <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Customers
              </Link>
            </li> */}
          </ul>
        </div>
        {/* <div className="mx-auto">
          <h3 className="mb-3 font-medium text-[#b4bcd0]">Resources</h3>
          <ul className="m-0 space-y-3 p-0">
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Small School Program
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Community
              </Link>
            </li>
          </ul>
        </div> */}
        <div className="mx-auto">
          <h3 className="mb-3 font-medium text-[#b4bcd0]">Developers</h3>
          <ul className="m-0 space-y-3 p-0">
            {/* <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                API
              </Link>
            </li> */}
            <li>
              <a
                href="https://status.echosafe.org/"
                target="_blank"
                rel="noreferrer"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Status
              </a>
            </li>
            <li>
              <a
                href="https://github.com/yagoandrade/echosafe-frontend"
                target="_blank"
                rel="noreferrer"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://github.com/yagoandrade/echosafe-frontend/blob/main/README.md"
                target="_blank"
                rel="noreferrer"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                README
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@echosafe.org"
                target="_blank"
                rel="noreferrer"
                className="duration-50 text-[#62687a] transition hover:text-[#1994ff]"
              >
                Report a vulnerability
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
