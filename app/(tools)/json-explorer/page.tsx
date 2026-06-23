"use client";

import { dummyJson } from "@/app/components/dummy";
import JsonEditorMonaco from "@/app/components/JsonEditorMonaco";
import JsonGraphFlow from "@/app/components/JsonGraphReactFlow";
import JsonTree from "@/app/components/JsonTree";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [json, setJson] = useState(JSON.stringify(dummyJson, null, 2));

  const [workerData, setWorkerData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const workerRef = useRef<Worker | null>(null);
  const debounceRef = useRef<any>(null);

  // ✅ INIT WORKER
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../workers/jsonWorkers.ts", import.meta.url)
    );

    workerRef.current.onmessage = (e) => {
      setWorkerData(e.data);
      setIsProcessing(false);
    };

    return () => workerRef.current?.terminate();
  }, []);

  // ✅ PROCESS JSON (async, debounced)
  useEffect(() => {
    if (!workerRef.current) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    setIsProcessing(true);

    debounceRef.current = setTimeout(() => {
      workerRef.current?.postMessage({ json });
    }, 300);
  }, [json]);

  return (
    <div className="json-explorer-container">
      <JsonEditorMonaco json={json} handleJsonChange={setJson} size={workerData?.size || 0} />
      <JsonTree data={workerData?.tree || {}} />
      <JsonGraphFlow data={workerData?.graph}
      />
    </div>
  );
}