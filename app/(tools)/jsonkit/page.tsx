"use client";

import { dummyJson } from "@/app/components/dummy";
import JsonEditorMonaco from "@/app/components/JsonEditorMonaco";
import JsonGraphFlow from "@/app/components/JsonGraphReactFlow";
import JsonTree from "@/app/components/JsonTree";
import { useState } from "react";

export default function Page() {
  const [json, setJson] = useState(JSON.stringify(dummyJson, null, 2));

  let parsed = null;
  try {
    parsed = JSON.parse(json);
  } catch {
    parsed = "{}";
  }

  return (
    <div className="jsonkit-container">
      {/* <JsonEditor json={json} handleJsonChange={setJson} /> */}
      <JsonEditorMonaco json={json} handleJsonChange={setJson} />
      <JsonTree data={parsed} />
      {/* <JsonGraph data={parsed} /> */}
      <JsonGraphFlow data={parsed} />
    </div>
  );
}