"use client";

import Tree from "react-d3-tree";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

type Props = {
  data: any;
};

// 🔥 truncate helper
function truncate(value: any, max = 15) {
  const str = String(value);
  return str.length > max ? str.slice(0, max) + "..." : str;
}

function convertToTree(data: any, name = "root"): any {
  if (typeof data !== "object" || data === null) {
    const raw = String(data);

    return {
      name: `${name}: ${truncate(raw)}`,
    };
  }

  if (Array.isArray(data)) {
    return {
      name: `${name} [${data.length}]`,
      children: data.map((item, index) =>
        convertToTree(item, `${index}`)
      ),
    };
  }

  return {
    name: `${name} {${Object.keys(data).length}}`,
    children: Object.keys(data).map((key) =>
      convertToTree(data[key], key)
    ),
  };
}

export default function JsonGraph({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(0.4);
  const [modalZoom, setModalZoom] = useState(0.4);

  const [openModal, setOpenModal] = useState(false);

  const treeData = data ? convertToTree(data) : null;

  // ✅ SSR safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Auto center graph properly
  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } =
      containerRef.current.getBoundingClientRect();

    setTranslate({
      x: width / 3,
      y: height / 2,
    });
  }, [data, mounted]);

  if (!data || !mounted) return <div>Loading...</div>;

  // 🔥 open modal + reset zoom
  const openFullscreen = () => {
    setModalZoom(0.9);
    setOpenModal(true);
  };

  return (
    <>
      {/* 🔹 INLINE GRAPH */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          overflow: "hidden"
        }}
        className="json-graph-container"
      >
        {/* Controls */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            display: "flex",
            gap: "0.6rem",
          }}
        >
          <button className="graph-btn" onClick={() => setZoom((z) => z + 0.2)}>+</button>
          <button className="graph-btn" onClick={() => setZoom((z) => Math.max(0.2, z - 0.2))}>-</button>
          <button className="graph-btn" onClick={() => setZoom(0.4)}>Reset</button>

          <button className="graph-btn" onClick={openFullscreen}>
            ⛶
          </button>
        </div>

        <Tree
          data={treeData}
          orientation="horizontal"
          pathFunc="elbow"
          translate={translate}
          zoom={zoom}
          zoomable
          draggable
          scaleExtent={{ min: 0.3, max: 2 }}
          nodeSize={{ x: 220, y: 100 }}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
        />
      </div>

      {/* 🔥 MODAL GRAPH */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            background: "var(--bg)",
          }}
        >
          {/* Controls */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 50,
              zIndex: 10,
              display: "flex",
              gap: "0.6rem",
            }}
          >
            <button className="graph-btn" onClick={() => setModalZoom((z) => z + 0.2)}>+</button>
            <button className="graph-btn" onClick={() => setModalZoom((z) => Math.max(0.3, z - 0.2))}>-</button>
            <button className="graph-btn" onClick={() => setModalZoom(0.5)}>Reset</button>
          </div>

          <Tree
            data={treeData}
            orientation="horizontal"
            pathFunc="elbow"
            translate={translate}
            zoom={modalZoom}
            zoomable
            draggable
            scaleExtent={{ min: 0.3, max: 2 }}
            nodeSize={{ x: 260, y: 120 }}
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"
          />
        </div>
      </Modal>
    </>
  );
}