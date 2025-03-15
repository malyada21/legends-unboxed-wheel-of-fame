import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Button, Input } from "@/components/ui/button";

const LegendsUnboxedWheel = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [spinResult, setSpinResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [wheelColors, setWheelColors] = useState({
    outline: "black",
    segments: ["#6A0DAD", "#C0C0C0"] // Purple & Silver
  });

  const addEntry = () => {
    if (newEntry.trim() !== "") {
      setEntries([...entries, { option: newEntry }]);
      setNewEntry("");
    }
  };

  const removeEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const spinWheel = () => {
    if (entries.length > 0 && !spinning) {
      setSpinning(true);
      setTimeout(() => {
        const resultIndex = Math.floor(Math.random() * entries.length);
        setSpinResult(entries[resultIndex].option);
        setSpinning(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold">Legends Unboxed Wheel of Fame</h1>
      <div className="flex mt-4">
        <Input
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Enter Name or Team"
        />
        <Button onClick={addEntry} className="ml-2">Add</Button>
      </div>
      <ul className="mt-4">
        {entries.map((entry, index) => (
          <li key={index} className="flex justify-between w-full p-2 border-b">
            {entry.option}
            <Button onClick={() => removeEntry(index)} variant="destructive">Remove</Button>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Wheel
          mustStartSpinning={spinning}
          prizeNumber={entries.length ? Math.floor(Math.random() * entries.length) : 0}
          data={entries}
          onStopSpinning={() => setSpinning(false)}
          outerBorderColor={wheelColors.outline}
          outerBorderWidth={6}
          backgroundColors={wheelColors.segments}
        />
        <Button onClick={spinWheel} className="mt-4" disabled={spinning || entries.length === 0}>Spin</Button>
      </div>
      {spinResult && <h2 className="mt-4 text-lg font-bold">Winner: {spinResult}</h2>}
    </div>
  );
};

export default LegendsUnboxedWheel;
