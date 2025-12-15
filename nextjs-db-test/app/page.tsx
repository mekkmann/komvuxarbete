"use client";

import { useState } from "react";

export default function Home() {

  const [log, setLog] = useState<string[]>([]);

  const seedWithClear = async (db: "sql" | "nosql", count: number) => {
  setLog(prev => [...prev, `--- SEED ${db.toUpperCase()} ${count} ---`]);

  await fetch(`/api/${db}/clear`, { method: "DELETE" });

  const res = await fetch(`/api/${db}/seed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count }),
  });

  const data = await res.json();

  setLog(prev => [
    ...prev,
    `[${db.toUpperCase()}] Inserted ${data.inserted} records in ${data.timeMs} ms`,
  ]);
  };


  const measureGetAll = async (db: "sql" | "nosql") => {
  setLog(prev => [...prev, `--- GET ALL ${db.toUpperCase()} ---`]);

  const res = await fetch(`/api/${db}/get`);
  const data = await res.json();

  setLog(prev => [
    ...prev,
    `[${db.toUpperCase()}] Read ${data.count} records in ${data.timeMs} ms`,
  ]);
  };

  const runMultipleGets = async (db: "sql" | "nosql", repetitions: number) => {
  const results: number[] = [];

  setLog(prev => [...prev, `--- Running ${repetitions}x GET ALL ${db.toUpperCase()} ---`]);

  for (let i = 0; i < repetitions; i++) {
    const res = await fetch(`/api/${db}/get`);
    const data = await res.json();

    results.push(data.timeMs);
    setLog(prev => [
      ...prev,
      `[${db.toUpperCase()}] Run ${i + 1}: ${data.timeMs} ms, count: ${data.count}`
    ]);
  }

  // Mean and standard deviation
  setLog(prev => [
    ...prev,
    `[${db.toUpperCase()}] MEAN: ${mean(results).toFixed(2)} ms, STD: ${standardDeviation(results).toFixed(2)} ms`
  ]);
};

  const runMultipleSeeds = async (db: "sql" | "nosql", count: number, repetitions: number) => {
    const results: number[] = [];

    setLog(prev => [...prev, `--- Running ${repetitions}x SEED ${db.toUpperCase()} ${count} ---`]);

  for (let i = 0; i < repetitions; i++) {
    // Clear DB
    await fetch(`/api/${db}/clear`, { method: "DELETE" });

    // Seed
    const res = await fetch(`/api/${db}/seed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count }),
    });
    const data = await res.json();

    results.push(data.timeMs);
    setLog(prev => [...prev, `[${db.toUpperCase()}] Run ${i + 1}: ${data.timeMs} ms`]);
  }

  // Mean and standard deviation
  setLog(prev => [
    ...prev,
    `[${db.toUpperCase()}] MEAN: ${mean(results).toFixed(2)} ms, STD: ${standardDeviation(results).toFixed(2)} ms`
  ]);
  }

  const mean = (arr: number[]) => {
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
  }

  const standardDeviation = (arr: number[]) => {
    const m = mean(arr);
    const variance = arr.reduce((sum, val) => sum + (val - m) ** 2, 0) / arr.length;
    return Math.sqrt(variance);
  }

  return (
    <div>
      <main>
        <h1>SQL vs NoSQL - Speed Test</h1>
        <h2>PostgreSQL (SQL)</h2>
        <h3>Seed</h3>
        <ul>
          <button onClick={() => seedWithClear("sql", 100)}>Seed 100</button>
          <button onClick={() => seedWithClear("sql", 1000)}>Seed 1000</button>
          <button onClick={() => seedWithClear("sql", 10000)}>Seed 10000</button>
          <button onClick={() => runMultipleSeeds("sql", 10000, 20)}>Seed 10000 x 20</button>
        </ul>
        <h3>Get</h3>
        <ul>
          <button onClick={() => measureGetAll("sql")}>Get All Entries</button>
          <button onClick={() => runMultipleGets("sql", 20)}>Get All Entries x 20</button>
        </ul>
        <button onClick={async () => {
          await fetch('/api/sql/clear', {
            method: "DELETE",
          })
        }}>Clear SQL DB</button>
        <h2>MongoDB (NoSQL)</h2>
        <h3>Seed</h3>
        <ul>
          <button onClick={() => seedWithClear("nosql", 100)}>Seed 100</button>
          <button onClick={() => seedWithClear("nosql", 1000)}>Seed 1000</button>
          <button onClick={() => seedWithClear("nosql", 10000)}>Seed 10000</button>
          <button onClick={() => runMultipleSeeds("nosql", 10000, 20)}>Seed 10000 x 20</button>
        </ul>
        <h3>Get</h3>
        <ul>
          <button onClick={() => measureGetAll("nosql")}>Get All Entries</button>
          <button onClick={() => runMultipleGets("nosql", 20)}>Get All Entries x 20</button>

        </ul>
        <button onClick={async () => {
          await fetch('/api/nosql/clear', {
            method: "DELETE",
          })
        }}>Clear NoSQL DB</button>

        <h2>Log</h2>
        <button onClick={() => {
          setLog([]);
        }}>Clear Log</button>
        <pre>{log.join("\n")}</pre>
      </main>
    </div>
  );
}
