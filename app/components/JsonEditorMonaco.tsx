"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Braces, Copy, Download, Upload, Search, X, Plus, GripVertical } from "lucide-react";
import type * as monaco from "monaco-editor";

const Editor = dynamic(() => import("@monaco-editor/react"), {
    ssr: false,
});

type Tab = {
    id: string;
    name: string;
    json: string;
};

type Props = {
    json: string;
    handleJsonChange: (val: string) => void;
    size: number
};

export default function JsonEditorMonaco({ json, size, handleJsonChange }: Props) {
    const [theme, setTheme] = useState<"light" | "vs-dark">("vs-dark");
    const [toast, setToast] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const isResizing = useRef(false);

    const [width, setWidth] = useState(32);
    const [isDragging, setIsDragging] = useState(false);

    const SNAP_POINTS = [30, 40, 50, 64];

    const [tabs, setTabs] = useState<Tab[]>([
        { id: "1", name: "Tab 1", json: json || "" },
    ]);
    const [activeTab, setActiveTab] = useState("1");

    const activeTabData = tabs.find((t) => t.id === activeTab)!;
    const [isEmpty, setIsEmpty] = useState(!json || json.trim() === "");
    const [tabCounter, setTabCounter] = useState(1);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2000);
    };

    const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
    };

    const openSearch = () => {
        editorRef.current?.getAction("actions.find")?.run();
    };

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const current =
                document.documentElement.getAttribute("data-theme") || "dark";
            setTheme(current === "dark" ? "vs-dark" : "light");
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const current =
            document.documentElement.getAttribute("data-theme") || "dark";
        setTheme(current === "dark" ? "vs-dark" : "light");
    }, [json]);

    // ✅ GLOBAL RESIZE
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing.current || !containerRef.current) return;

            const parentWidth =
                containerRef.current.parentElement?.offsetWidth || 1;

            const newWidthPx =
                e.clientX - containerRef.current.getBoundingClientRect().left;

            let newPercent = (newWidthPx / parentWidth) * 100;

            // clamp
            newPercent = Math.max(30, Math.min(50, newPercent));

            setWidth(newPercent);
        };

        const handleMouseUp = () => {
            if (!isResizing.current) return;

            isResizing.current = false;
            setIsDragging(false);

            // snap to nearest
            const closest = SNAP_POINTS.reduce((prev, curr) =>
                Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev
            );
            setWidth(closest);

            document.body.style.cursor = "default";
            document.body.style.userSelect = "auto";
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [width]);

    const updateJson = (value: string) => {
        setTabs((prev) =>
            prev.map((tab) =>
                tab.id === activeTab ? { ...tab, json: value } : tab
            )
        );

        handleJsonChange(value);
        setIsEmpty(!value || value.trim() === "");
    };

    const switchTab = (tab: Tab) => {
        setActiveTab(tab.id);
        handleJsonChange(tab.json);
        setIsEmpty(!tab.json || tab.json.trim() === "");
    };

    const addTab = () => {
        const id = Date.now().toString();

        const nextNumber = tabCounter + 1;

        const newTab = {
            id,
            name: `Tab ${nextNumber}`,
            json: "",
        };

        setTabs((prev) => [...prev, newTab]);
        setActiveTab(id);
        setTabCounter(nextNumber);

        handleJsonChange("");
        setIsEmpty(true);
    };

    const closeTab = (id: string) => {
        if (tabs.length === 1) return;

        const newTabs = tabs.filter((t) => t.id !== id);
        setTabs(newTabs);

        if (id === activeTab) {
            const nextTab = newTabs[0];
            setActiveTab(nextTab.id);
            handleJsonChange(nextTab.json);
            setIsEmpty(!nextTab.json || nextTab.json.trim() === "");
        }
    };

    const handleClear = () => {
        updateJson("");
        showToast("Cleared ✅");
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            try {
                JSON.parse(text);
                updateJson(text);
                showToast("JSON Loaded ✅");
            } catch {
                showToast("Invalid JSON ❌");
            }
        };
        reader.readAsText(file);
    };

    const handleDownload = () => {
        const blob = new Blob([activeTabData.json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${activeTabData.name}.json`;
        a.click();

        URL.revokeObjectURL(url);
        showToast("Downloaded ✅");
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(activeTabData.json);
        showToast("Copied ✅");
    };

    const handleBeautify = () => {
        try {
            const parsed = JSON.parse(activeTabData.json);
            updateJson(JSON.stringify(parsed, null, 2));
            showToast("Beautified ✅");
        } catch {
            showToast("Invalid JSON ❌");
        }
    };

    const startResize = () => {
        isResizing.current = true;
        setIsDragging(true);
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    };
    const formatSize = (bytes: number) => {
        return (bytes / 1024).toFixed(2) + " KB";
      };


    return (
        <div
            ref={containerRef}
            style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "1.2rem",
                position: "relative",
                overflow: "hidden",
                minWidth: "30%",
                width: `${width}%`,
                transition: isDragging ? "none" : "width 0.2s ease",
            }}
            className="json-editor-container"
        >
            {/* RESIZER */}
            <div
                onMouseDown={startResize}
                style={{
                    position: "absolute",

                    right: 0,

                    top: 0,

                    width: "16px", // slightly bigger hit area

                    height: "100%",

                    cursor: "col-resize",

                    zIndex: 10,

                    background: isDragging ? "rgba(0,0,0,0.15)" : "transparent",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                    if (!isDragging)
                        e.currentTarget.style.background = "rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                    if (!isDragging)
                        e.currentTarget.style.background = "transparent";
                }}
            >
                <GripVertical
                    size={48}
                    style={{
                        opacity: isDragging ? 1 : 0.8,
                        pointerEvents: "none"
                    }}
                />
            </div>

            {/* Tabs */}
            <div className="tabs">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`tab ${tab.id === activeTab ? "active" : ""}`}
                        onClick={() => switchTab(tab)}
                    >
                        {tab.name}
                        <X
                            className="tab-close"
                            size={12}
                            onClick={(e) => {
                                e.stopPropagation();
                                closeTab(tab.id);
                            }}
                        />
                    </div>
                ))}
                <button className="add-tab" onClick={addTab}>
                    <Plus size={12} />
                </button>
            </div>

            {/* Editor */}
            <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
                <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    style={{ display: "none" }}
                />

                <div className="toolbar">
                    <button onClick={openSearch} className="toolbar-btn">
                        <Search size={16} />
                    </button>
                    <button onClick={handleBeautify} className="toolbar-btn">
                        <Braces size={16} />
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className="toolbar-btn">
                        <Upload size={16} />
                    </button>
                    <button onClick={handleDownload} className="toolbar-btn">
                        <Download size={16} />
                    </button>
                    <button onClick={handleCopy} className="toolbar-btn">
                        <Copy size={16} />
                    </button>
                    <button onClick={handleClear} className="toolbar-btn">
                        Clear
                    </button>
                </div>

                <Editor
                    defaultLanguage="json"
                    value={activeTabData.json}
                    theme={theme}
                    onMount={handleEditorMount}
                    onChange={(val) => updateJson(val || "")}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 12,
                        wordWrap: "on",
                        automaticLayout: true,
                        
                    }}
                    
                />
            </div>
            <div className="editor-info">
                <div className="editor-info-item">
                    {formatSize(size)}
                </div>
            </div>

            {toast && <div className="toast">{toast}</div>}
        </div>
    );
}