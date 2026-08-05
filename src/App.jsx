import { useState } from "react";

import Dashboard from "./components/Dashboard";
import Pairing from "./components/Pairing";
import Sessions from "./components/Sessions";
import Monitor from "./components/Monitor";
import BottomNav from "./components/BottomNav";

export default function App() {

  const [page, setPage] = useState("dashboard");

  return (
    <div className="app">

      <div className="background-glow"></div>

      <main className="container">

        {page === "dashboard" && (
          <Dashboard setPage={setPage} />
        )}

        {page === "pairing" && (
          <Pairing setPage={setPage} />
        )}

        {page === "sessions" && (
          <Sessions setPage={setPage} />
        )}

        {page === "monitor" && (
          <Monitor setPage={setPage} />
        )}

      </main>

      <BottomNav
        page={page}
        setPage={setPage}
      />

    </div>
  );
}
