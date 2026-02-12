"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { API_URL } from "../cmn";

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-2">
        <h1 className="text-6xl">Asking Questions</h1>
        <SubComponent />
      </main>
    </>
  );
}

interface ClientState { name?: string, time?: string };
interface ServerState { msg?: string };

function SubComponent() {
  const [ CL, setClientState ] = useState<ClientState>({});
  const [ SV, setServerState ] = useState<ServerState>({});

  // function cbEdit(e: ChangeEvent<HTMLInputElement, HTMLInputElement>, k: string) {
  //   setClientState({ ...CL, [k]: e.target.value });
  // }

  async function cbSend(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key != "Enter") return;
    if ( !CL.name?.trim()
      || !CL.time?.trim()
    ) { setServerState({ msg: "Invalid input." }); return; }

    setServerState({ msg: "fetching..." });

    const res = await fetch(`${API_URL}/AskTwoQuestions/${CL.name}/${CL.time}`);

    setServerState({ msg: await res.text() || `ERROR: ${res.status} ${res.statusText}` });
    setClientState({});
  }

  return (
    <>
      <h2 className="text-3xl">Input</h2>
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="What's your name?"
        value={CL.name ?? ""}
        onChange={e => setClientState({ ...CL, name: e.target.value })}
        onKeyDown={e => cbSend(e)}
      />
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="What time did you wake up?"
        value={CL.time ?? ""}
        onChange={e => setClientState({ ...CL, time: e.target.value })}
        onKeyDown={e => cbSend(e)}
      />
      <h2 className="text-3xl">Output</h2>
      <p>{SV.msg ?? "..."}</p>
    </>
  );
}
