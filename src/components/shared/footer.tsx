import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative max-w-full border-t text-sm font-medium dark:border-[#ffffff14] dark:bg-[#000212]">
      <div className="mx-auto flex max-w-7xl flex-wrap px-8 py-14">
        <div className="mr-auto flex flex-col justify-between">
          <Link
            href="/"
            className="duration-50 text-[#62687a] transition hover:text-white"
          >
            EchoSafe® Technology - Built Worldwide
          </Link>
          <span className="text-[#9c9da1]">
            © {new Date().getFullYear()} EchoSafe®. All rights reserved.
          </span>
        </div>

        <div className="mx-auto">
          <h3 className="mb-3 font-medium text-[#b4bcd0]">Product</h3>
          <ul className="m-0 space-y-3 p-0">
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Integrations
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Changelog
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Integrations
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Integrations
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto">
          <h3 className="mb-3 font-medium text-[#b4bcd0]">Company</h3>
          <ul className="m-0 space-y-3 p-0">
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Customers
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto">
          <h3 className="mb-3 font-medium text-[#b4bcd0]">Resources</h3>
          <ul className="m-0 space-y-3 p-0">
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Small School Program
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Community
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto">
          <h3 className="mb-3 font-medium text-[#b4bcd0]">Developers</h3>
          <ul className="m-0 space-y-3 p-0">
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                API
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Status
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                README
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="duration-50 text-[#62687a] transition hover:text-white"
              >
                Report a vulnerability
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
