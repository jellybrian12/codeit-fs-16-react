import { useState } from 'react';

const CounterView = ({ label, count, onIncrement }) => {
  console.log(`${label} 실행`);

  return (
    <button type="button" onClick={onIncrement}>
      {label} {count}
    </button>
  );
};

const LiftedPanel = () => {
  console.log('LiftedPanel 실행');
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  return (
    <div>
      <CounterView label="A" count={countA} onIncrement={() => setCountA((c) => c + 1)} />
      <CounterView label="B" count={countB} onIncrement={() => setCountB((c) => c + 1)} />
    </div>
  );
};

export default LiftedPanel;