import React, { useState } from 'react';
 
const BmiCalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateBmi = () => {
    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    if (heightInMeters <= 0 || weightInKg <= 0) {
      setError("Height and weight must be positive numbers.");
      return;
    }
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    let category = '';
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue < 25) category = 'Normal';
    else if (bmiValue < 30) category = 'Overweight';
    else category = 'Obese';

    setResult({ bmi: bmiValue.toFixed(1), category });
    setError('');
  };

  const reload = () => {
    setWeight('');
    setHeight('');
    setResult(null);
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-3xl font-semibold text-center text-green-400 mb-6">BMI Calculator</h1>
        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">Height (cm)</label>
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height in cm"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">Weight (kg)</label>
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight in kg"
          />
        </div>
        <button
          onClick={calculateBmi}
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg w-full hover:bg-blue-700 transition duration-200"
        >
          Calculate BMI
        </button>

        <button
          onClick={reload}
          className="mt-4 bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg w-full hover:bg-gray-600 transition duration-200"
        >
          Reload
        </button>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-4xl font-bold text-blue-600">{result.bmi}</h2>
            <p className="text-xl text-gray-600 mt-2">{result.category}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BmiCalculator;
