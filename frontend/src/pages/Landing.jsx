import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Layers, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import LandingNavbar from '../components/LandingNavbar';
import LoadingScreen from '../components/LoadingScreen';
import mayaImage from '../assets/Maya.jpg';
import arielImage from '../assets/Ariel.jpg';


const features = [
  {
    title: 'AI idea engine',
    description: 'Generate scroll-stopping reel concepts with a tap, tailored for your niche and tone.',
    icon: Sparkles,
  },
  {
    title: 'Planner built-in',
    description: 'Schedule your content, save ideas, and keep your creative process organized.',
    icon: Layers,
  },
  {
    title: 'Performance insights',
    description: 'Track followers, engagement, and best posting moments with premium clarity.',
    icon: ShieldCheck,
  },
];

const stats = [
  { label: 'Creators onboard', value: '12K+' },
  { label: 'Ideas generated', value: '52K+' },
  { label: 'Growth lift', value: '32%' },
];

const testimonials = [
  {
    quote: 'ReelCraft cut my creative planning time in half and helped me hit consistent growth.',
    author: 'Maya R.',
    role: 'Creator Lead',
    image: mayaImage,
  },
  {
    quote: 'The UI feels premium and the generated ideas actually convert. Love the workflow.',
    author: 'Ariel T.',
    role: 'Content Strategist',
    image: arielImage,
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
};

const Landing = () => {
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  const benefits = useMemo(
    () => [
      'Premium glassmorphism layout with soft motion',
      'Responsive mobile-first experience',
      'Dark / Light mode toggle',
      'Fast page load and modern UI patterns',
    ],
    []
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      {loading && <LoadingScreen />}
      <LandingNavbar theme={theme} toggleTheme={toggleTheme} />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.22),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_30%)]" />

        <section id="hero" className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          >
            <div className="space-y-8">
              <span className="inline-flex rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-purple-200 ring-1 ring-purple-400/20">
                Launch your next viral reel strategy
              </span>
              <div className="space-y-6">
                <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  Build premium social reels faster with AI-powered planning.
                </h1>
                <p className="max-w-2xl text-slate-300 sm:text-lg">
                  ReelCraft blends smart concept generation, caption suggestion, and planning tools into a polished workflow made for modern creators.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/30"
                >
                  Get started free
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-3xl border border-transparent bg-white/10 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/20"
                >
                  Sign in
                </Link>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  Start free trial
                </Link>
                <Link
                  to="/idea-generator"
                  className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  Try idea generator
                </Link>
                <Link
                  to="/analytics"
                  className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  View analytics
                </Link>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Link
                  to="/planner"
                  className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  Planner
                </Link>
                <Link
                  to="/analytics"
                  className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  Analytics
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                    <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-1 shadow-2xl shadow-slate-950/30"
            >
              <div className="rounded-[1.75rem] bg-slate-950/95 p-8 sm:p-10">
                <div className="mb-8 flex items-center justify-between gap-4 rounded-3xl bg-slate-900/80 p-5 ring-1 ring-white/10">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Product preview</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">Dashboard & performance cards</h2>
                  </div>
                  <div className="h-14 w-14 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-400 shadow-xl shadow-purple-500/20" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-inner shadow-white/5">
                    <p className="text-sm text-slate-400">Campaign view</p>
                    <p className="mt-4 text-xl font-semibold text-white">Capture trend insights instantly.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-inner shadow-white/5">
                    <p className="text-sm text-slate-400">Content planner</p>
                    <p className="mt-4 text-xl font-semibold text-white">Save ideas and schedule effortlessly.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-8"
          >
            <motion.div variants={sectionVariant} className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-purple-300">What you get</p>
              <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Everything creators need to craft high-impact reels.</h2>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.article
                    key={feature.title}
                    variants={sectionVariant}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                  >
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-4 text-slate-300">{feature.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section id="product" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
              <motion.p variants={sectionVariant} className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Product tour</motion.p>
              <motion.h2 variants={sectionVariant} className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                Scale content creation with a polished, data-driven engine.
              </motion.h2>
              <motion.p variants={sectionVariant} className="mt-6 max-w-xl text-slate-300 sm:text-lg">
                ReelCraft is designed for creators who want a premium system to generate ideas, captions, and a release plan without friction.
              </motion.p>

              <motion.div variants={sectionVariant} className="mt-10 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-300 transition-all duration-300 hover:bg-white/10">
                    <div className="flex items-center gap-3 text-slate-100">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                        <CheckCircle2 className="h-5 w-5" />
                      </span>
                      <p>{benefit}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950/80 to-slate-900/80 p-1 shadow-2xl shadow-slate-950/30">
                <div className="rounded-[1.85rem] bg-slate-950 px-8 py-10 lg:px-10 lg:py-12">
                  <div className="flex items-center justify-between gap-4 rounded-3xl bg-white/5 p-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Live dashboard</p>
                      <p className="mt-2 text-xl font-semibold text-white">Realtime insights</p>
                    </div>
                    <span className="inline-flex rounded-2xl bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">New</span>
                  </div>

                  <div className="mt-8 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Ideas ready</p>
                        <p className="mt-3 text-2xl font-semibold text-white">24</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Engagement</p>
                        <p className="mt-3 text-2xl font-semibold text-white">+18.9%</p>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Next post</p>
                      <p className="mt-3 text-xl font-semibold text-white">Morning routine transformation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="flex items-center gap-4 text-slate-300">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-purple-500/15 text-purple-300">
                    <Zap className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Speed & polish</p>
                    <p className="mt-2 text-lg font-semibold text-white">Fast, responsive landing experience with premium visuals.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="reviews" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-10"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Testimonials</p>
              <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Creators trust ReelCraft for faster results.</h2>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {testimonials.map((item) => (
                <div key={item.author} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                  <p className="text-slate-300">"{item.quote}"</p>
                  <div className="mt-6 flex items-center gap-4">
                    <img src={item.image} alt={`${item.author} photo`} className="h-23 w-17 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold text-white">{item.author}</p>
                      <p className="text-sm text-slate-400">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Pricing</p>
                <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">A premium workflow for every creator.</h2>
                <p className="mt-4 max-w-xl text-slate-300 sm:text-lg">
                  Start with a modern creator landing page, then grow into a full analytics and planner suite.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950/95 p-6 text-center ring-1 ring-white/10 sm:p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Starter</p>
                <p className="mt-4 text-5xl font-semibold text-white">$19</p>
                <p className="mt-2 text-slate-400">per month</p>
                <Link to="/signup" className="mt-6 inline-flex w-full justify-center rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  Start free trial
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="cta" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95 p-10 shadow-2xl shadow-slate-950/30"
          >
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Ready to launch</p>
                <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Start creating polished reels with confidence.</h2>
                <p className="mt-4 max-w-xl text-slate-300 sm:text-lg">
                  Experience a modern creator workflow that keeps your ideas, captions, and schedule aligned in one beautiful dashboard.
                </p>
              </div>
              <div className="space-y-4">
                <Link to="/signup" className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  Start your journey
                </Link>
                <a href="#features" className="inline-flex w-full items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                  View features
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
