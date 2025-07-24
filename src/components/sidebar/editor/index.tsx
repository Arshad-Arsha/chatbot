import ImageNodeDataEditor from "./nodes/image";
import TextNodeDataEditor from "./nodes/text";
import { Nodes, NodeTypes } from "../../flow-zone/nodes/typings";
import { FC } from "react";

// A component which renders the specific editor for the selected node
const NodeDataEditor: FC<{ node: Nodes }> = ({ node }) => {

  // Individual node data editors handle their own state and save it as needed
  switch (node.type) {
    case NodeTypes.Image:
      return <ImageNodeDataEditor {...node} />;
    case NodeTypes.Text:
      return <TextNodeDataEditor {...node} />;
    default:
      return null;
  }
};

export default NodeDataEditor;
