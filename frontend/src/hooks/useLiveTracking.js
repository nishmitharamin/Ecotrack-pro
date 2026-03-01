import { useState, useEffect } from 'react';

export const useLiveTracking = () => {
  const [data, setData] = useState({
    co2: 450.20,
    distance: 1200,
    fuel: 85,
    status: 'In Transit'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        co2: +(prev.co2 + (Math.random() * 0.12)).toFixed(2),
        distance: +(prev.distance + 0.05).toFixed(2),
        fuel: +(prev.fuel - 0.01).toFixed(2),
        status: Math.random() > 0.98 ? 'Delayed' : 'Active'
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return data;
};