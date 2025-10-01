import React from 'react';
import TeamPlayersDemo from './components/TeamPlayersDemo';

// صفحة اختبار مستقلة للـ Player Cards
function TestPlayersPage() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    }}>
      <TeamPlayersDemo />
    </div>
  );
}

export default TestPlayersPage;
