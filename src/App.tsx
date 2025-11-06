import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import Submission from "./pages/Submission";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";
import Article from './pages/Article';
import Themes from "./pages/Themes";
import CreatureProfile from "./pages/Creatureprofile";
import CreatureArticle from "./pages/Creaturearticle";
import DebunkedArticles from "./pages/Debunkedarticles";
import Debunked from "./pages/Debunked";
import WhatifArticles from "./pages/Whatifarticles";
import Whatif from "./pages/Whatif";
import JuniorArticles from "./pages/Juniorarticles";
import Junior from "./pages/Junior";
import Videos from "./pages/Videos";
import HowArticles from "./pages/Howarticles";
import How from "./pages/How";
import AnalyticsTracker from "./AnalyticsTracker"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/article" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/creatureprofile" element={<CreatureProfile />} />
          <Route path="/creaturearticle" element={<CreatureArticle />} />
          <Route path="/debunkedarticles" element={<DebunkedArticles />} />
          <Route path="/debunked" element={<Debunked />} />
          <Route path="/whatifarticles" element={<WhatifArticles />} />
          <Route path="/whatif" element={<Whatif />} />
          <Route path="/juniorarticles" element={<JuniorArticles />} />
          <Route path="/junior" element={<Junior />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/howarticles" element={<HowArticles />} />
          <Route path="/how" element={<How />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
