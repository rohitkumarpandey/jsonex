"use client";

import {
  useMemo,
  useState,
  useCallback,
} from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  NodeMouseHandler,
  PanOnScrollMode,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import Modal from "./Modal";
import { Maximize2 } from "lucide-react";

type Props = {
  data: any;
};

function truncate(value: any, max = 15) {
  const str = String(value);
  return str.length > max ? str.slice(0, max) + "..." : str;
}

function buildGraph(data: any) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const parentMap: Record<string, string | null> = {};

  let id = 0;
  let yIndex = 0;

  function traverse(
    obj: any,
    parentId: string | null,
    label: string,
    depth: number
  ) {
    const currentId = `${id++}`;
    const currentY = yIndex++;

    let display = "";

    if (typeof obj !== "object" || obj === null) {
      display = `${label}: ${truncate(obj)}`;
    } else if (Array.isArray(obj)) {
      display = `${label} [${obj.length}]`;
    } else {
      display = `${label} {${Object.keys(obj).length}}`;
    }

    nodes.push({
      id: currentId,
      data: { label: display },
      position: {
        x: depth * 260,
        y: currentY * 55,
      },
      style: {
        padding: "6px 8px",
        borderRadius: 6,
        fontSize: 12,
      },
    });

    parentMap[currentId] = parentId;

    if (parentId) {
      edges.push({
        id: `e-${parentId}-${currentId}`,
        source: parentId,
        target: currentId,
      });
    }

    if (typeof obj === "object" && obj !== null) {
      if (Array.isArray(obj)) {
        obj.forEach((item, i) =>
          traverse(item, currentId, String(i), depth + 1)
        );
      } else {
        Object.keys(obj).forEach((key) =>
          traverse(obj[key], currentId, key, depth + 1)
        );
      }
    }
  }

  traverse(data, null, "root", 0);

  return { nodes, edges, parentMap };
}

/* =========================
   🔹 GRAPH VIEW
========================= */
function GraphView({
  nodes,
  edges,
  parentMap,
  selectedPath,
  setSelectedPath,
  search,
  setSearch,
  defaultViewport = { x: 100, y: 100, zoom: 1 },
}: any) {
  const rf = useReactFlow();

  // ✅ FIX: stabilize viewport
  const memoViewport = useMemo(() => defaultViewport, [defaultViewport]);

  const focusNode = useCallback(
    (nodeId: string) => {
      const node = nodes.find((n: Node) => n.id === nodeId);
      if (!node) return;

      rf.setCenter(node.position.x, node.position.y, {
        zoom: 1,
        duration: 400,
      });
    },
    [nodes, rf]
  );

  const selectNode = useCallback(
    (nodeId: string) => {
      const path = new Set<string>();
      let current: string | null = nodeId;

      while (current) {
        path.add(current);
        current = parentMap[current];
      }

      setSelectedPath(path);
      focusNode(nodeId);
    },
    [parentMap, focusNode, setSelectedPath]
  );

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      selectNode(node.id);
    },
    [selectNode]
  );

  const filteredNodes = useMemo(() => {
    if (!search) return [];
    return nodes.filter((n: Node) =>
      n.data.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, nodes]);

  const styledNodes = useMemo(() => {
    return nodes.map((node: Node) => {
      const isActive = selectedPath.has(node.id);
      const hasSelection = selectedPath.size > 0;

      return {
        ...node,
        style: {
          ...node.style,
          background: isActive
            ? "var(--accent-bg)"
            : "var(--code-bg)",
          color: "var(--text-h)",
          border: isActive
            ? "1.5px solid var(--accent)"
            : "0.5px solid var(--text)",
          opacity: hasSelection && !isActive ? 0.8 : 1,
          cursor: "pointer",
          fontWeight: isActive ? "700" : "600",
        },
      };
    });
  }, [nodes, selectedPath]);

  const styledEdges = useMemo(() => {
    return edges.map((edge: Edge) => {
      const isActive =
        selectedPath.has(edge.source) &&
        selectedPath.has(edge.target);

      return {
        ...edge,
        style: {
          stroke: isActive ? "var(--accent)" : "var(--border)",
          strokeWidth: isActive ? 2.2 : 2,
          opacity: 1,
        },
      };
    });
  }, [edges, selectedPath]);

  return (
    <>
      <div className="json-graph-search">
        <input
          placeholder="Search node..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.length > 0 && (
          <div
            style={{
              marginTop: 6,
              background: "var(--code-bg)",
              border: "1px solid var(--border)",
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            {filteredNodes.slice(0, 10).map((n: Node) => (
              <div
                key={n.id}
                onClick={() => {
                  selectNode(n.id);
                  setSearch("");
                }}
                className="json-graph-search-item"
              >
                {n.data.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <ReactFlow
        nodes={styledNodes}
        edges={styledEdges}
        onNodeClick={handleNodeClick}
        defaultViewport={memoViewport} // ✅ FIXED
        zoomOnScroll={false}
        panOnScroll
        panOnScrollMode={PanOnScrollMode.Free}
        panOnDrag
        minZoom={0.2}
        maxZoom={2}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </>
  );
}

/* =========================
   🔹 MAIN COMPONENT
========================= */
export default function JsonGraphFlow({ data }: Props) {
  const [selectedPath, setSelectedPath] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { nodes, edges, parentMap } = useMemo(
    () => buildGraph(data),
    [data]
  );

  // ✅ FIX: stable viewport object
  const modalViewport = useMemo(
    () => ({ x: 100, y: 100, zoom: 1.2 }),
    []
  );

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div
        style={{ position: "relative" }}
        className="json-graph-container"
      >
        <button
          onClick={() => setOpenModal(true)}
          className="graph-btn"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
          }}
        >
          <Maximize2 size={18} />
        </button>

        <ReactFlowProvider>
          <GraphView
            nodes={nodes}
            edges={edges}
            parentMap={parentMap}
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
            search={search}
            setSearch={setSearch}
          />
        </ReactFlowProvider>
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "var(--bg)",
            position: "relative",
          }}
        >
          <ReactFlowProvider>
            <GraphView
              nodes={nodes}
              edges={edges}
              parentMap={parentMap}
              selectedPath={selectedPath}
              setSelectedPath={setSelectedPath}
              search={search}
              setSearch={setSearch}
              defaultViewport={modalViewport} // ✅ FIXED
            />
          </ReactFlowProvider>
        </div>
      </Modal>
    </>
  );
}