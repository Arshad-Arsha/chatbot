import { css } from "@emotion/react";
import Button from "../../shared/components/button";
import { useCallback, useEffect, useState } from "react";
import useStore from "../flow-zone/store";
import { NodeTypes } from "../flow-zone/nodes/typings"; // make sure this import is correct
import { nanoid } from "nanoid"; // install with: npm install nanoid

const Header = () => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { nodes, edges, addNode } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    addNode: state.addNode,
  }));

  const onSave = useCallback(() => {
    setSaving(true);

    const nodesWithNoTarget = nodes.filter((node) => {
      const nodeEdges = edges.filter((edge) => edge.source === node.id);
      return nodeEdges.length === 0;
    });

    if (nodesWithNoTarget.length > 1) {
      alert("There are more than one node with no target");
      setSaving(false);
      return;
    }

    window.localStorage.setItem("nodes", JSON.stringify(nodes));
    window.localStorage.setItem("edges", JSON.stringify(edges));
    setSaving(false);
    setSaved(true);
  }, [nodes, edges]);

  useEffect(() => {
    if (saved) {
      setTimeout(() => setSaved(false), 1000);
    }
  }, [saved]);

  // 👇 Add Message Node
  const handleAddMessageNode = () => {
    const id = nanoid();
    addNode({
      id,
      type: NodeTypes.Text,
      position: { x: Math.random() * 400, y: Math.random() * 300 },
      data: { text: "New message..." },
    });
  };

  // 👇 Add Image Node
  const handleAddImageNode = () => {
    const id = nanoid();
    addNode({
      id,
      type: NodeTypes.Image,
      position: { x: Math.random() * 400, y: Math.random() * 300 },
      data: {
        url: "https://via.placeholder.com/150",
        caption: "New image caption",
      },
    });
  };

  return (
    <div
      css={css`
        padding: 16px 28px;
        background: aliceblue;
        display: flex;
        align-items: center;
        font-weight: 500;
        justify-content: space-between;
        border-bottom: 2px solid lightblue;
      `}
    >
      <p>ChatBot Demo</p>
      <div style={{ display: "flex", gap: "12px" }}>
      <Button loading={false} onClick={handleAddMessageNode}>+ Add Message</Button>
      <Button loading={false} onClick={handleAddImageNode}>+ Add Image</Button>
        <Button loading={saving} onClick={onSave}>
          {saved ? "Saved" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
