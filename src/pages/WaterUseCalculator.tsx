import React, { useState } from 'react';
import './WaterUseCalculator.css';

const WaterUseCalculator: React.FC = () => {
  const [jarAmount, setJarAmount] = useState<number | ''>('');
  const [jarTime, setJarTime] = useState<number | ''>('');
  const [waterCost, setWaterCost] = useState<number | ''>('');
  const [waterLoss, setWaterLoss] = useState<number | null>(null);
  const [monthlyCost, setMonthlyCost] = useState<number | null>(null);

  const calculateWaterLoss = (e: React.FormEvent) => {
    e.preventDefault();
    if (jarAmount && jarTime && jarTime > 0) {
      const lossPerMinute = Number(jarAmount) / Number(jarTime);
      const lossPerDay = lossPerMinute * 60 * 24; // in ml
      setWaterLoss(lossPerDay);

      if (waterCost) {
        const monthlyLossInLiters = (lossPerDay / 1000) * 30;
        const cost = monthlyLossInLiters * Number(waterCost);
        setMonthlyCost(cost);
      }
    }
  };

  return (
    <div className="water-use-calculator-container">
      <h1>Water Leak Calculator</h1>
      <p>
        Use this tool to estimate the amount of water lost from a leak over a 24-hour period and the associated monthly cost.
      </p>

      <div className="calculator-card">
        <h2>Calculate Water Loss & Cost</h2>
        <form onSubmit={calculateWaterLoss}>
          <div className="form-group">
            <label htmlFor="jar-amount">
              Amount of water in the jar (in ml):
            </label>
            <input
              type="number"
              id="jar-amount"
              value={jarAmount}
              onChange={(e) => setJarAmount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g., 100"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jar-time">
              Time it took to collect (in minutes):
            </label>
            <input
              type="number"
              id="jar-time"
              value={jarTime}
              onChange={(e) => setJarTime(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g., 5"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="water-cost">
              Cost of water per liter (optional):
            </label>
            <input
              type="number"
              id="water-cost"
              value={waterCost}
              onChange={(e) => setWaterCost(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g., 0.005"
            />
          </div>
          <button type="submit" className="calculate-btn">Calculate</button>
        </form>

        {waterLoss !== null && (
          <div className="result">
            <h3>Estimated Water Loss in 24 hours:</h3>
            <p className="water-loss-amount">
              {(waterLoss / 1000).toFixed(2)} Liters
            </p>

            {monthlyCost !== null && (
              <>
                <h3>Estimated Monthly Cost:</h3>
                <p className="water-loss-amount">
                  ${monthlyCost.toFixed(2)}
                </p>
              </>
            )}

            <p className="water-loss-advice">
              Even small leaks can waste a significant amount of water. Consider getting it fixed as soon as possible.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterUseCalculator;
