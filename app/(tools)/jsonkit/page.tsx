"use client";

import { dummyJson } from "@/app/components/dummy";
import JsonEditor from "@/app/components/JsonEditor";
import JsonGraph from "@/app/components/JsonGraph";
import JsonTree from "@/app/components/JsonTree";
import { useState } from "react";

export default function Page() {
  const [json, setJson] = useState(JSON.stringify(dummyJson, null, 2));

  let parsed = null;
  try {
    parsed = JSON.parse(json);
  } catch {}

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <JsonEditor json={json} handleJsonChange={setJson} />
      <JsonTree data={parsed} />
      <JsonGraph data={parsed} />
    </div>
  );
}