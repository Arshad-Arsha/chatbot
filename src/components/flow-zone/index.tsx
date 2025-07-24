import { css } from "@emotion/react";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  NodeTypes as FlowNodeTypes,
  ReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDrop } from "react-dnd";

import { ImageNode, TextNode } from "./nodes";
import useStore, { selector } from "./store";
import { shallow } from "zustand/shallow";
import { NodeTypes } from "./nodes/typings";

const nodeTypes: FlowNodeTypes = {
  text: TextNode,
  image: ImageNode,
};

const FlowZone = () => {
  const {
    nodes,
    onNodesChange,
    onEdgesChange,
    defaultEdgeOptions,
    onDrop,
    edges,
    onConnect,
    setSelectedNodes,
  } = useStore(selector, shallow);

  // drop ref for dropping nodes from node panel
  const [, dropRef] = useDrop({
    accept: "node",
    drop: (item: { id: string; type: NodeTypes }, monitor) =>
      onDrop(item, monitor),
  });

  return (
    <div css={css``}>
      <ReactFlow
        ref={dropRef}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={() => {
          setSelectedNodes([]);
        }}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Controls />
        <MiniMap nodeColor={"lightblue"} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowZone;
