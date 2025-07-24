'use client'

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import PoweredByBar from '../components/PoweredByBar';
import Footer from '../components/Footer';
import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);
// Removed: chart.js and react-chartjs-2 imports

export default function FeaturesPage() {
  // Dummy data for charts
  const hoursSavedData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Average Hours Saved Per Week',
        data: [4, 6, 10, 12],
        borderColor: '#00FFC2',
        backgroundColor: 'rgba(0,255,194,0.1)',
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#7F5AF0',
      },
    ],
  };
  const donutData = {
    labels: ['Faster Notes', 'Other'],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ['#7F5AF0', '#232946'],
        borderWidth: 0,
      },
    ],
  };
  const barData = {
    labels: ['Manual', 'With AI'],
    datasets: [
      {
        label: 'Content Ideas Generated per Week',
        data: [10, 60],
        backgroundColor: ['#7F5AF0', '#00FFC2'],
        borderRadius: 8,
      },
    ],
  };
  const funnelData = {
    labels: ['Idea', 'MVP', 'Launch'],
    datasets: [
      {
        label: 'Students',
        data: [120, 80, 50],
        backgroundColor: ['#00FFC2', '#7F5AF0', '#2563eb'],
      },
    ],
  };
  const activityData = {
    labels: ['Week 1', 'Week 2', 'Week 3'],
    datasets: [
      {
        label: 'Templates',
        data: [4, 5, 6],
        backgroundColor: '#7F5AF0',
      },
      {
        label: 'Guides',
        data: [2, 3, 2],
        backgroundColor: '#00FFC2',
      },
    ],
  };
  const memberGrowthData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Members',
        data: [100, 250, 450],
        borderColor: '#00FFC2',
        backgroundColor: 'rgba(0,255,194,0.1)',
        tension: 0.4,
      },
    ],
  };
  const radarData = {
    labels: ['Weekly Updates', 'Student Focus', 'Content Packs', 'AI Tools', 'Community'],
    datasets: [
      {
        label: 'HustleHack AI',
        data: [5, 5, 5, 5, 5],
        backgroundColor: 'rgba(127,90,240,0.3)',
        borderColor: '#7F5AF0',
        pointBackgroundColor: '#7F5AF0',
      },
      {
        label: 'ChatGPT/Notion',
        data: [2, 1, 1, 3, 2],
        backgroundColor: 'rgba(0,255,194,0.2)',
        borderColor: '#00FFC2',
        pointBackgroundColor: '#00FFC2',
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-[#0A1020] text-white">
      <Navigation />
      <main className="pt-32 pb-20 min-h-screen bg-[#0A1020] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-8">Features</h1>
          {/* Charts Section - Temporarily Unavailable */}
          <div className="bg-[#181f36]/80 border border-[#7F5AF0] rounded-2xl shadow-2xl p-8 sm:p-12 text-white text-base leading-7 mb-12 text-center">
            <p className="text-lg text-[#00FFC2] font-semibold">Charts are temporarily unavailable while we upgrade our analytics. 🚧</p>
            <p className="text-gray-400 mt-2">We're working on a new, faster dashboard experience. Stay tuned!</p>
          </div>
          {/* Section 2: Core Features (With Metrics) */}
          <section className="py-12 sm:py-20 bg-[#151a28]">
            <div className="container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 px-2 sm:px-4">
              {/* Study Smarter */}
              <div className="bg-[#181f36] rounded-2xl p-5 sm:p-8 flex flex-col items-center text-center shadow-lg gap-2">
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">Study Smarter</h3>
                <div className="w-24 h-24 sm:w-32 sm:h-32 mb-2 sm:mb-4 min-h-[100px]">
                  <Doughnut data={donutData} options={{ cutout: '70%', plugins: { legend: { display: false } } }} />
                </div>
                <p className="text-[#00FFC2] font-bold mb-1 sm:mb-2 text-sm sm:text-base">80% finish notes 3x faster using AI templates.</p>
                <p className="text-gray-300 text-xs sm:text-sm">Average time per chapter: <br />Before: 3h → Now: 30min</p>
              </div>
              {/* Create Faster */}
              <div className="bg-[#181f36] rounded-2xl p-5 sm:p-8 flex flex-col items-center text-center shadow-lg gap-2">
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">Create Faster</h3>
                <div className="w-32 h-24 sm:w-40 sm:h-32 mb-2 sm:mb-4 min-h-[100px]">
                  <Bar data={barData} options={{ plugins: { legend: { display: false } }, scales: { x: { grid: { color: '#232946' } }, y: { grid: { color: '#232946' } } }, responsive: true, maintainAspectRatio: false }} />
                </div>
                <p className="text-[#7F5AF0] font-bold mb-1 sm:mb-2 text-sm sm:text-base">6x more content ideas per week.</p>
              </div>
              {/* Launch Boldly */}
              <div className="bg-[#181f36] rounded-2xl p-5 sm:p-8 flex flex-col items-center text-center shadow-lg gap-2">
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">Launch Boldly</h3>
                <div className="w-32 h-24 sm:w-40 sm:h-32 mb-2 sm:mb-4 min-h-[100px]">
                  <Bar data={funnelData} options={{ plugins: { legend: { display: false } }, scales: { x: { grid: { color: '#232946' } }, y: { grid: { color: '#232946' } } }, responsive: true, maintainAspectRatio: false }} />
                </div>
                <p className="text-[#00FFC2] font-bold mb-1 sm:mb-2 text-sm sm:text-base">120+ students launched side projects.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Weekly Hustle Drops (Activity Graph) */}
          <section className="py-12 sm:py-20 bg-[#0A1020]">
            <div className="container max-w-4xl mx-auto px-2 sm:px-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 sm:mb-8 text-center">Weekly Hustle Drops</h2>
              <div className="w-full min-h-[180px] h-64 bg-[#151a28] rounded-2xl p-4 sm:p-6">
                <Bar data={activityData} options={{
                  plugins: { legend: { labels: { color: '#fff' } } },
                  scales: { x: { grid: { color: '#232946' }, ticks: { color: '#fff' } }, y: { grid: { color: '#232946' }, ticks: { color: '#fff' } } },
                  responsive: true,
                  maintainAspectRatio: false,
                }} />
              </div>
            </div>
          </section>

          {/* Section 4: Community Growth Metrics */}
          <section className="py-12 sm:py-20 bg-[#151a28]">
            <div className="container max-w-4xl mx-auto px-2 sm:px-4 flex flex-col items-center text-center gap-4 sm:gap-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 sm:mb-8">Community Growth</h2>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-4 sm:mb-8 w-full">
                <div className="bg-[#0A1020] rounded-2xl px-4 sm:px-8 py-4 sm:py-6 text-xl sm:text-3xl font-bold text-[#00FFC2] shadow-lg w-full sm:w-auto text-center">1,200+ active students & creators</div>
                <div className="bg-[#0A1020] rounded-2xl px-4 sm:px-8 py-4 sm:py-6 text-xl sm:text-3xl font-bold text-[#7F5AF0] shadow-lg w-full sm:w-auto text-center">500+ AI projects launched</div>
              </div>
              <div className="w-full min-h-[180px] h-64 bg-[#181f36] rounded-2xl p-4 sm:p-6">
                <Line data={memberGrowthData} options={{
                  plugins: { legend: { display: false } },
                  scales: { x: { grid: { color: '#232946' }, ticks: { color: '#fff' } }, y: { grid: { color: '#232946' }, ticks: { color: '#fff' } } },
                  elements: { line: { borderWidth: 4 } },
                  responsive: true,
                  maintainAspectRatio: false,
                }} />
              </div>
            </div>
          </section>

          {/* Section 5: Why HustleHack AI? (Comparison Table + Chart) */}
          <section className="py-12 sm:py-20 bg-[#0A1020]">
            <div className="container max-w-6xl mx-auto px-2 sm:px-4 flex flex-col md:flex-row gap-8 sm:gap-10 items-center">
              <div className="flex-1 w-full overflow-x-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 sm:mb-6">Why HustleHack AI?</h2>
                <table className="w-full min-w-[400px] text-left text-white border-separate border-spacing-y-2 text-xs sm:text-base">
                  <thead>
                    <tr className="text-[#00FFC2]">
                      <th className="p-2">Feature</th>
                      <th className="p-2">ChatGPT</th>
                      <th className="p-2">Notion</th>
                      <th className="p-2">HustleHack AI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2">Weekly updates</td>
                      <td className="p-2">❌</td>
                      <td className="p-2">❌</td>
                      <td className="p-2">✅</td>
                    </tr>
                    <tr>
                      <td className="p-2">Student-focused</td>
                      <td className="p-2">❌</td>
                      <td className="p-2">❌</td>
                      <td className="p-2">✅</td>
                    </tr>
                    <tr>
                      <td className="p-2">Content packs</td>
                      <td className="p-2">❌</td>
                      <td className="p-2">❌</td>
                      <td className="p-2">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex-1 w-full max-w-md min-h-[220px]">
                <Radar data={radarData} options={{
                  plugins: { legend: { labels: { color: '#fff' } } },
                  scales: { r: { angleLines: { color: '#232946' }, grid: { color: '#232946' }, pointLabels: { color: '#fff' }, ticks: { color: '#fff' } } },
                  responsive: true,
                  maintainAspectRatio: false,
                }} height={320} />
              </div>
            </div>
          </section>

          {/* Section 6: Final CTA */}
          <section className="py-12 sm:py-20 bg-[#151a28] flex flex-col items-center text-center gap-4">
            <div className="w-full max-w-2xl mx-auto mb-6 sm:mb-10 min-h-[120px]">
              <Line data={{
                labels: ['Student', 'Creator', 'Founder'],
                datasets: [{
                  label: 'Progress',
                  data: [1, 2, 3],
                  borderColor: '#00FFC2',
                  backgroundColor: 'rgba(0,255,194,0.1)',
                  tension: 0.5,
                  pointRadius: 8,
                  pointBackgroundColor: '#7F5AF0',
                }],
              }} options={{ plugins: { legend: { display: false } }, scales: { x: { grid: { color: '#232946' } }, y: { display: false } }, elements: { line: { borderWidth: 4 } }, responsive: true, maintainAspectRatio: false }} height={180} />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white mb-4 sm:mb-8">Don’t just study. Don’t just dream. Build your future with AI.</h2>
            <Link href="/signup" className="inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-base sm:text-xl md:text-2xl px-6 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-lg transition-all duration-150">Get Started Today.</Link>
          </section>
        </div>
      </main>
      <PoweredByBar />
      <Footer />
    </div>
  );
} 