import React from 'react';
import './StatsSection.css';

const StatsSection = ({ stats = { wins: 28, losses: 12 } }) => {
  const wins = Number(stats.wins || 28);
  const losses = Number(stats.losses || 12);
  const total = wins + losses;
  const winPct = total ? Math.round((wins / total) * 100) : 70;

  return (
    <section className="stats-section">
      <div className="stats-container">
        {/* Donut Chart Card */}
        <div className="stats-card stats-pie">
          <div className="stats-title">الإحصائيات</div>
          <div className="pie-chart">
            <div 
              className="donut-chart" 
              style={{ 
                background: `conic-gradient(#22c55e 0% ${winPct}%, #ef4444 ${winPct}% 100%)` 
              }}
            >
              <div className="donut-center"></div>
            </div>
            <div className="pie-legend">
              <div className="legend-item">
                <span className="legend-dot win-color"></span>
                <span>فوز</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot loss-color"></span>
                <span>خسارة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Bar Card */}
        <div className="stats-card stats-summary">
          <div className="stats-main-title">
            مجموع المباريات الملعوبة: {total} (الإنتصارات {wins} المباريات من عند {losses})
          </div>
          <div className="stats-subtitle">نسبة الفوز %{winPct}</div>
          <div className="stats-bar">
            <div className="bar-section win-bar" style={{ width: `${winPct}%` }}>
              {winPct}%
            </div>
            <div className="bar-section loss-bar" style={{ width: `${100 - winPct}%` }}>
              {100 - winPct}%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
