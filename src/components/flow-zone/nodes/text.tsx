import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { css } from "@emotion/react";
import { MessageCircle } from "lucide-react";
import { TextNodeData } from "./typings";
import useStore from "../store";

const TextNode: FC<NodeProps<TextNodeData>> = ({ id }) => {
  const { getSourceConnectionAllowed, getNode } = useStore(
    (state) => ({ getSourceConnectionAllowed: state.allowSourceConnection, getNode: state.getNode })
  );

  const { data, selected } = getNode(id);

  const allowSourceConnection = getSourceConnectionAllowed(id);

  return (
    <>
      <Handle type="target" position={Position.Left} id="target" />
      <div
        css={css(
          css`
            border-radius: 8px;
            min-width: 240px;
            border: 1px solid lightblue;
          `,
          selected &&
          css`
              border: 1px solid coral;
            `
        )}
      >
        <div
          css={css`
            padding: 12px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid lightblue;
            background: aliceblue;
            border-radius: 8px 8px 0 0;
          `}
        >
          <p>Send Message</p>
          <MessageCircle height={18} width={18} />
        </div>
        <div
          css={css`
            background: white;
            padding: 12px 16px;
            border-radius: 0 0 8px 8px;
          `}
        >
          {data.text}
        </div>
      </div>
      <Handle
        type="source"
        isConnectable={allowSourceConnection}
        isConnectableStart={allowSourceConnection}
        position={Position.Right}
        id="source"
      />
    </>
  );
};

export default TextNode;
