"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { API_URL } from "../cmn";

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-2">
        <h1 className="text-6xl">Restaurant Picker</h1>
        <SubComponent />
      </main>
    </>
  );
}

interface ClientState { val?: string };
interface ServerState { msg?: string };

function SubComponent() {
  const [ CL, setClientState ] = useState<ClientState>({});
  const [ SV, setServerState ] = useState<ServerState>({});

  function cbEdit(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    setClientState({ val: e.target.value });
  }

  async function cbSend(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key != "Enter") return;
    if ( !CL.val?.trim()
    ) { setServerState({ msg: "Invalid input." }); return; }

    setServerState({ msg: "fetching..." });

    const res = await fetch(`${API_URL}/RestaurantPicker/${CL.val}`);

    setServerState({ msg: await res.text() || `ERROR: ${res.status} ${res.statusText}` });
    setClientState({});
  }

  return (
    <>
      <h2 className="text-3xl">Input</h2>
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="A food category..."
        value={CL.val ?? ""}
        onChange={e => cbEdit(e)}
        onKeyDown={e => cbSend(e)}
      />
      <h2 className="text-3xl">Output</h2>
      <p>{SV.msg ?? "..."}</p>
    </>
  );
}
