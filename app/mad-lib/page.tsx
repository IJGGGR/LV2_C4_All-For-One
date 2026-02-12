"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { API_URL } from "../cmn";

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-2">
        <h1 className="text-6xl">Mad Lib</h1>
        <SubComponent />
      </main>
    </>
  );
}

interface ClientState { creature_adjective?: string, creature?: string, place?: string, things?: string, adverb_1?: string, adverb_2?: string, base_verb?: string, adverb_3?: string, adverb_4?: string, past_verb?: string };
interface ServerState { msg?: string };

function SubComponent() {
  const [ CL, setClientState ] = useState<ClientState>({});
  const [ SV, setServerState ] = useState<ServerState>({});

  function cbEdit(e: ChangeEvent<HTMLInputElement, HTMLInputElement>, k: string) {
    setClientState({ ...CL, [k]: e.target.value });
  }

  async function cbSend(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key != "Enter") return;
    if ( !CL.creature_adjective?.trim()
      || !CL.creature?.trim()
      || !CL.place?.trim()
      || !CL.things?.trim()
      || !CL.adverb_1?.trim()
      || !CL.adverb_2?.trim()
      || !CL.base_verb?.trim()
      || !CL.adverb_3?.trim()
      || !CL.adverb_4?.trim()
      || !CL.past_verb?.trim()
    ) { setServerState({ msg: "Invalid input." }); return; }

    setServerState({ msg: "fetching..." });

    const res = await fetch(`${API_URL}/MadLib/${CL.creature_adjective}/${CL.creature}/${CL.place}/${CL.things}/${CL.adverb_1}/${CL.adverb_2}/${CL.base_verb}/${CL.adverb_3}/${CL.adverb_4}/${CL.past_verb}`);

    setServerState({ msg: await res.text() || `ERROR: ${res.status} ${res.statusText}` });
    setClientState({});
  }

  return (
    <>
      <h2 className="text-3xl">Input</h2>
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="Adjective..."
        value={CL.creature_adjective ?? ""}
        onChange={e => cbEdit(e, "creature_adjective")}
        onKeyDown={e => cbSend(e)}
      />
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="Living creature..."
        value={CL.creature ?? ""}
        onChange={e => cbEdit(e, "creature")}
        onKeyDown={e => cbSend(e)}
      />
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="Place..."
        value={CL.place ?? ""}
        onChange={e => cbEdit(e, "place")}
        onKeyDown={e => cbSend(e)}
      />
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="Plural living things..."
        value={CL.things ?? ""}
        onChange={e => cbEdit(e, "things")}
        onKeyDown={e => cbSend(e)}
      />
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="Adverb..."
        value={CL.adverb_1 ?? ""}
        onChange={e => cbEdit(e, "adverb_1")}
        onKeyDown={e => cbSend(e)}
      />
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="Adverb..."
        value={CL.adverb_2 ?? ""}
        onChange={e => cbEdit(e, "adverb_2")}
        onKeyDown={e => cbSend(e)}
      />
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="Base verb..."
        value={CL.base_verb ?? ""}
        onChange={e => cbEdit(e, "base_verb")}
        onKeyDown={e => cbSend(e)}
      />
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="Adverb..."
        value={CL.adverb_3 ?? ""}
        onChange={e => cbEdit(e, "adverb_3")}
        onKeyDown={e => cbSend(e)}
      />
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="Adverb..."
        value={CL.adverb_4 ?? ""}
        onChange={e => cbEdit(e, "adverb_4")}
        onKeyDown={e => cbSend(e)}
      />
      <input
        className="p-2 rounded-xl border-2 border-[#ffffff80]"
        type="text"
        placeholder="Past verb..."
        value={CL.past_verb ?? ""}
        onChange={e => cbEdit(e, "past_verb")}
        onKeyDown={e => cbSend(e)}
      />
      <h2 className="text-3xl">Output</h2>
      <p className="text-lg">{SV.msg ?? "..."}</p>
    </>
  );
}
