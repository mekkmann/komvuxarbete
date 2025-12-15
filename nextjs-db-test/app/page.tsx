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

  return (
    <div>
      <main>
        <h1>SQL vs NoSQL - Seed Test</h1>
        <h2>PostgreSQL (SQL)</h2>
        <button onClick={() => seedWithClear("sql", 100)}>Seed 100</button>
        <button onClick={() => seedWithClear("sql", 1000)}>Seed 1000</button>
        <button onClick={() => seedWithClear("sql", 10000)}>Seed 10000</button>
        <button onClick={() => measureGetAll("sql")}>Get All Entries</button>
        <button onClick={async () => {
          await fetch('/api/sql/clear', {
            method: "DELETE",
          })
        }}>Clear SQL DB</button>
        <h2>MongoDB (NoSQL)</h2>
        <button onClick={() => seedWithClear("nosql", 100)}>Seed 100</button>
        <button onClick={() => seedWithClear("nosql", 1000)}>Seed 1000</button>
        <button onClick={() => seedWithClear("nosql", 10000)}>Seed 10000</button>
        <button onClick={() => measureGetAll("nosql")}>Get All Entries</button>
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
