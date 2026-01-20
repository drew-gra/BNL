'use client';

import { useState, useEffect } from 'react';

function ResultsContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vS7yO13EMUL16VBIgRda_T27H2LyzJU8dgJ_IQl-9LfhI25W2qRk103sM9pCgNBFrw3J7j45MuVGCLu/pub?gid=1760345965&single=true&output=csv'
        );
        const text = await response.text();
        const rows = text.split('\n').map(row => row.split(','));
        
        // Parse values from the CSV (columns H and I are indices 7 and 8)
        const lastUpdated = rows[0]?.[8] || '';
        const totalPitches = rows[2]?.[8] || '';
        const openRate = rows[3]?.[8]?.replace('%', '') || '';
        const responseRate = rows[4]?.[8]?.replace('%', '') || '';
        const benchmarkOpen = rows[6]?.[8]?.replace('%', '') || '';
        const benchmarkResponse = rows[7]?.[8]?.replace('%', '') || '';

        setData({
          lastUpdated,
          totalPitches,
          openRate: parseFloat(openRate),
          responseRate: parseFloat(responseRate),
          benchmarkOpen: parseFloat(benchmarkOpen),
          benchmarkResponse: parseFloat(benchmarkResponse),
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate comparisons
  const formatComparison = (mine, benchmark) => {
    if (!mine || !benchmark) return { text: '', direction: '' };
    const ratio = mine / benchmark;
    const isHigher = ratio >= 1;
    
    if (ratio >= 2 || ratio <= 0.5) {
      const multiplier = isHigher ? ratio : (1 / ratio);
      return {
        text: `${multiplier.toFixed(1)}x`,
        direction: isHigher ? 'more' : 'less'
      };
    } else {
      const percentDiff = Math.abs((ratio - 1) * 100);
      return {
        text: `${percentDiff.toFixed(0)}%`,
        direction: isHigher ? 'more' : 'less'
      };
    }
  };

  if (loading) {
    return (
      <div className="pt-6 pb-2 text-center">
        <p className="text-base font-normal text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-6 pb-2 text-center">
        <p className="text-base font-normal text-gray-400">{error}</p>
      </div>
    );
  }

  const openComparison = formatComparison(data.openRate, data.benchmarkOpen);
  const responseComparison = formatComparison(data.responseRate, data.benchmarkResponse);

  return (
    <div className="pt-6 pb-2">
      <p className="text-base font-extralight text-gray-400 leading-relaxed text-center max-w-md mx-auto mb-12">
        Currently, my communication to media gets opened <span className="text-white">{openComparison.text} {openComparison.direction}</span> frequently and it instigates a response <span className="text-white">{responseComparison.text} {responseComparison.direction}</span> frequently when compared against my peers. <a href="#results" className="text-gray-600 hover:text-gray-400 transition-colors">#</a>
      </p>
      
      <div className="flex flex-col gap-12 mb-12">
        {/* Open Rate */}
        <div className="text-center">
          <div className="text-sm font-normal tracking-[0.2em] text-gray-400 uppercase mb-4">
            Open Rate
          </div>
          <div className="flex items-start gap-4 justify-center">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium tracking-[0.2em] text-gray-400 mb-2">BNL</span>
              <span className="text-6xl font-extralight text-white">{data.openRate}%</span>
              <span className="text-sm font-normal text-gray-500 mt-2">n = {data.totalPitches}</span>
            </div>
            <span className="text-base font-extralight text-gray-600 mt-10">vs</span>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium tracking-[0.2em] text-gray-400 mb-2">PEERS</span>
              <span className="text-6xl font-extralight text-gray-500">{data.benchmarkOpen}%</span>
            </div>
          </div>
        </div>
        
        {/* Response Rate */}
        <div className="text-center">
          <div className="text-sm font-normal tracking-[0.2em] text-gray-400 uppercase mb-4">
            Response Rate
          </div>
          <div className="flex items-start gap-4 justify-center">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium tracking-[0.2em] text-gray-400 mb-2">BNL</span>
              <span className="text-6xl font-extralight text-white">{data.responseRate}%</span>
              <span className="text-sm font-normal text-gray-500 mt-2">n = {data.totalPitches}</span>
            </div>
            <span className="text-base font-extralight text-gray-600 mt-10">vs</span>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium tracking-[0.2em] text-gray-400 mb-2">PEERS</span>
              <span className="text-6xl font-extralight text-gray-500">{data.benchmarkResponse}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 text-center mt-6">
        Last updated: {data.lastUpdated}
      </p>
      <p className="text-sm text-gray-500 text-center mt-2">
        Comps via Propel Media Barometer
      </p>
    </div>
  );
}

export default function Home() {
  const tagline = "Earned-First Public Relations";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [approachOpen, setApproachOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < tagline.length) {
        setDisplayedText(tagline.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Check URL hash on page load and open the corresponding accordion
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#approach') {
      setApproachOpen(true);
    } else if (hash === '#results') {
      setResultsOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex justify-center pt-24 pb-24 relative">
      <div className="text-center">
        <h1 className="text-4xl font-extralight text-gray-100 tracking-[0.3em] uppercase">
          Bread & Law
        </h1>
        <p className="text-base font-extralight text-gray-400 tracking-[0.2em] uppercase mt-3">
          {displayedText}
          {showCursor && <span className="animate-pulse">|</span>}
        </p>
        <div className="flex justify-center mt-6">
          <hr className="w-64 border-t border-gray-600" />
        </div>
        <p className="text-base font-extralight text-gray-400 tracking-[0.2em] uppercase mt-6 flex items-center justify-center gap-2">
          Andrew Graham
          <a 
            href="https://www.linkedin.com/in/andrewsgraham/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </p>
        <p className="text-base font-extralight text-gray-400 tracking-[0.2em] uppercase mt-3">
          Founder
        </p>
        
        <div className="mt-12 space-y-6">
          {/* Approach */}
          <div id="approach">
            <button
              onClick={() => setApproachOpen(!approachOpen)}
              className="text-base font-extralight text-gray-300 tracking-[0.2em] uppercase hover:text-gray-100 transition-colors relative mx-auto"
            >
              <span>Approach</span>
              <span className={`absolute -right-6 transition-transform duration-300 ${approachOpen ? 'rotate-180' : ''}`}>↓</span>
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${approachOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="text-base font-extralight text-gray-400 tracking-wide max-w-md mx-auto">
                <p className="mb-4">I'm a Brooklyn-based comms consultant and spox, currently representing cannabis and AI interests. <a href="#approach" className="text-gray-600 hover:text-gray-400 transition-colors">#</a></p>
                <a 
                  href="mailto:newbiz@breadandlaw.com" 
                  className="text-gray-400 hover:text-gray-100 transition-colors"
                >
                  newbiz at breadandlaw dot com
                </a>
              </div>
            </div>
          </div>

          {/* Results */}
          <div id="results">
            <button
              onClick={() => setResultsOpen(!resultsOpen)}
              className="text-base font-extralight text-gray-300 tracking-[0.2em] uppercase hover:text-gray-100 transition-colors relative mx-auto"
            >
              <span>Results</span>
              <span className={`absolute -right-6 transition-transform duration-300 ${resultsOpen ? 'rotate-180' : ''}`}>↓</span>
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${resultsOpen ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <ResultsContent />
            </div>
          </div>
        </div>
      </div>
      
      <footer className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Bread & Law LLC
        </p>
      </footer>
    </div>
  );
}