self.onmessage = (e: MessageEvent) => {
    const { json } = e.data;
  
    try {
      const parsed = JSON.parse(json);
  
      const size = new TextEncoder().encode(json).length;
  
      // 🌲 TREE (lightweight, no React logic)
      const buildTree = (obj: any): any => {
        if (typeof obj !== "object" || obj === null) return obj;
  
        if (Array.isArray(obj)) {
          return obj.map(buildTree);
        }
  
        const result: any = {};
        for (const key in obj) {
          result[key] = buildTree(obj[key]);
        }
        return result;
      };
  
      // 🔗 GRAPH (simple structure)
      // let id = 0;
      // const nodes: any[] = [];
      // const edges: any[] = [];
  
      // const traverse = (obj: any, parentId: string | null = null) => {
      //   const currentId = String(id++);
  
      //   nodes.push({
      //     id: currentId,
      //     data: { label: parentId ? "" : "root" },
      //     position: { x: 0, y: 0 },
      //   });
  
      //   if (parentId !== null) {
      //     edges.push({
      //       id: `${parentId}-${currentId}`,
      //       source: parentId,
      //       target: currentId,
      //     });
      //   }
  
      //   if (typeof obj === "object" && obj !== null) {
      //     for (const key in obj) {
      //       const childId = String(id++);
  
      //       nodes.push({
      //         id: childId,
      //         data: { label: key },
      //         position: { x: 0, y: 0 },
      //       });
  
      //       edges.push({
      //         id: `${currentId}-${childId}`,
      //         source: currentId,
      //         target: childId,
      //       });
  
      //       traverse(obj[key], childId);
      //     }
      //   }
      // };
  
      // traverse(parsed);
  
      self.postMessage({
        success: true,
        parsed, // optional if needed
        tree: parsed, // already usable for tree
        graph: parsed,
        size,
      });
    } catch (err) {
      const size = new TextEncoder().encode(json).length;
  
      self.postMessage({
        success: false,
        size,
      });
    }
  };