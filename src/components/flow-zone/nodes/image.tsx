import React from "react";
import { NodeProps, Handle, Position } from "reactflow";
import { ImageNodeData } from "./typings";

const ImageNode: React.FC<NodeProps<ImageNodeData>> = ({ data }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, borderRadius: 8 }}>
      {data.url && (
        <img
          src={data.url}
          alt={data.caption || "Uploaded image"}
          style={{ maxWidth: 200, maxHeight: 150 }}
        />
      )}
      {data.caption && <p>{data.caption}</p>}

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ImageNode;
