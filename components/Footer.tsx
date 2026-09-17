import { getWhatsAppUrl } from "../lib/whatsapp";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">

            <h2 className="text-2xl font-bold">
              Web
              <span className="text-blue-400">N</span>
              Software
            </h2>

            <p className="mt-4 max-w-md leading-7 text-slate-400">
              Websites, eCommerce, custom software, AI videos,
              reels and digital marketing solutions for modern businesses.
            </p>

            <a
              href={getWhatsAppUrl(
                "Hi WebNSoftware, I would like to discuss my project."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-green-500 px-6 py-3 text-sm font-semibold"
            >
              Start a Conversation →
            </a>

          </div>


          {/* Services */}
          <div>

            <h3 className="font-semibold">
              Services
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">

              <li>
                <a href="#services" className="hover:text-white">
                  Business Websites
                </a>
              </li>

              <li>
                <a href="#services" className="hover:text-white">
                  eCommerce
                </a>
              </li>

              <li>
                <a href="#services" className="hover:text-white">
                  Custom Software
                </a>
              </li>

              <li>
                <a href="#ai-videos" className="hover:text-white">
                  AI Videos
                </a>
              </li>

              <li>
                <a href="#reels" className="hover:text-white">
                  Reels
                </a>
              </li>

            </ul>

          </div>


          {/* Marketing */}
          <div>

            <h3 className="font-semibold">
              Marketing
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">

              <li>
                <a href="#marketing" className="hover:text-white">
                  Digital Marketing
                </a>
              </li>

              <li>
                <a href="#marketing" className="hover:text-white">
                  Social Media
                </a>
              </li>

              <li>
                <a href="#marketing" className="hover:text-white">
                  Meta Ads
                </a>
              </li>

            </ul>

          </div>

        </div>


        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} WebNSoftware. All rights reserved.
          </p>

          <p>
            Built for modern businesses.
          </p>

        </div>

      </div>

    </footer>
  );
}