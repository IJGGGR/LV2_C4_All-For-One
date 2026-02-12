"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { API_URL } from "../cmn";

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-2">
        <h1 className="text-6xl">Greater or Less</h1>
        <SubComponent />
      </main>
    </>
  );
}

interface ClientState { 0?: string, 1?: string };
interface ServerState { msg?: string };

function SubComponent() {
  const [ CL, setClientState ] = useState<ClientState>({});
  const [ SV, setServerState ] = useState<ServerState>({});

  function cbEdit(e: ChangeEvent<HTMLInputElement, HTMLInputElement>, k: number) {
    setClientState({ ...CL, [k]: e.target.value });
  }

  async function cbSend(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key != "Enter") return;
    if ( !CL[0]?.trim() || Number.isNaN(+CL[0])
      || !CL[1]?.trim() || Number.isNaN(+CL[1])
    ) { setServerState({ msg: "Invalid input." }); return; }

    setServerState({ msg: "fetching..." });

    const res = await fetch(`${API_URL}/GreaterOrLess/${+CL[0]}/${+CL[1]}`);

    setServerState({ msg: await res.text() || `ERROR: ${res.status} ${res.statusText}` });
    setClientState({});
  }

  return (
    <>
      <h2 className="text-3xl">Input</h2>
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="number"
        placeholder="1st number..."
        value={CL[0] ?? ""}
        onChange={e => cbEdit(e, 0)}
        onKeyDown={e => cbSend(e)}
      />
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="number"
        placeholder="2nd number..."
        value={CL[1] ?? ""}
        onChange={e => cbEdit(e, 1)}
        onKeyDown={e => cbSend(e)}
      />
      <h2 className="text-3xl">Output</h2>
      <p>{SV.msg ?? "..."}</p>
    </>
  );
}
