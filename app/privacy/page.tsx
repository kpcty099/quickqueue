import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition mb-8 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition" />
          Back to Jobs
        </Link>
        
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="mb-6">Effective Date: May 11, 2026</p>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              Welcome to Remote AI Jobs ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you save jobs or interact with our site. We also automatically collect certain information when you visit, including your IP address, browser type, and usage data via cookies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">3. Google AdSense & Cookies</h2>
            <p>
              We use Google AdSense to serve advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.
            </p>
            <p className="mt-2 text-teal-400">
              You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" className="underline">Ads Settings</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">4. How We Use Information</h2>
            <p>
              We use the collected information to provide, maintain, and improve our services, to personalize your experience, and to monitor the usage of our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">6. Contact Us</h2>
            <p>
              If you have questions or comments about this policy, you may contact us at: support@remoteaijobs.vercel.app
            </p>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center">
          &copy; 2026 Remote AI Jobs. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
