"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Braces, Copy, Download, Upload, Search, X, Plus } from "lucide-react";
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
};

export default function JsonEditorMonaco({ json, handleJsonChange }: Props) {
    const [theme, setTheme] = useState<"light" | "vs-dark">("vs-dark");
    const [toast, setToast] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const [tabs, setTabs] = useState<Tab[]>([
        { id: "1", name: "Tab 1", json: json || "" },
    ]);
    const [activeTab, setActiveTab] = useState("1");

    const activeTabData = tabs.find((t) => t.id === activeTab)!;

    const [isEmpty, setIsEmpty] = useState(!json || json.trim() === "");


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

        const newTab = {
            id,
            name: `Tab ${tabs.length + 1}`,
            json: "",
        };

        setTabs((prev) => [...prev, newTab]);
        setActiveTab(id);

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

    /* 🧹 Clear current tab */
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

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "1.2rem",
                position: "relative",
                overflow: "hidden",
                width: "32%",
            }}
            className="json-editor-container"
        >
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
                            size={14}
                            onClick={(e) => {
                                e.stopPropagation();
                                closeTab(tab.id);
                            }}
                        />
                    </div>
                ))}
                <button className="add-tab" onClick={addTab}>
                    <Plus size={16} />
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

                    {/* 🧹 Clear Button */}
                    <button onClick={handleClear} className="toolbar-btn" title="Clear">
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

            {toast && <div className="toast">{toast}</div>}
        </div>
    );
}