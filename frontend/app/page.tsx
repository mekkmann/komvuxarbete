'use client';

export default function Home() {
  return (
    <div>
      <main>
       <div>
        <h1>SQL relaterat</h1>
        <button onClick={() => console.log('text')}>Seed SQL</button>
        <p>Klicka på knappen ovan för att fylla SQL-databasen med massor av data</p>
        <button onClick={() => console.log('text')}>Fetch SQL Data</button>
        <p>Klicka på knappen ovan för att hämta all data från SQL-databasen</p>
       </div>
       <div>
        <h1>NoSQL relaterat</h1>
        <button onClick={() => console.log('text')}>Seed NoSQL</button>
        <p>Klicka på knappen ovan för att fylla NoSQL-databasen med massor av data</p>
        <button onClick={() => console.log('text')}>Fetch NoSQL Data</button>
        <p>Klicka på knappen ovan för att hämta all data från NoSQL-databasen</p>
       </div>
       </main>
    </div>
  );
}
