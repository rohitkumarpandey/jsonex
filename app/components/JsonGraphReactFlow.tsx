"use client";

import { ReactFlowProvider } from "reactflow";
import JsonGraphInner from "./JsonGraphReactFlowInner";

export default function JsonGraphFlow({ data }: { data: any }) {
  return (
    <ReactFlowProvider>
      <JsonGraphInner data={data} />
    </ReactFlowProvider>
  );
}