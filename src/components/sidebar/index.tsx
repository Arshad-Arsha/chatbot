import { css } from "@emotion/react";
import { FC } from "react";
import { useOnSelectionChange } from "reactflow";
import NodeTypeRenderer, { NodeTypeProps } from "./nodes";
import { Nodes } from "../flow-zone/nodes/typings";
import { labelsMap } from "./nodes/constants";
import NodeDataEditor from "./editor";
import { ChevronLeft } from "lucide-react";
import useStore from "../flow-zone/store";

interface SidebarProps {
  nodes: NodeTypeProps[];
}

const Sidebar: FC<SidebarProps> = ({ nodes }) => {
  const { deselectNodes, selectedNodes, setSelectedNodes } =
    useStore((state) => ({
      selectedNodes: state.selectedNodes,
      deselectNodes: state.deselectNodes,
      setSelectedNodes: state.setSelectedNodes,
    }));

  useOnSelectionChange({
    onChange: (elements) => {
      console.log(elements);
      if (elements.nodes.length > 0) {
        setSelectedNodes(elements.nodes as Array<Nodes>);
      } else {
        setSelectedNodes([]);
      }
    },
  });

  const onDeselect = () => {
    deselectNodes();
  };

  const isSingleNodeSelected = selectedNodes.length === 1;

  // There can be multiple nodes selected, but no desc was given for this as of now
  const isMultipleNodesSelected = selectedNodes.length > 1;

  // Just show some dummy data for now
  if (isMultipleNodesSelected) {
    return (
      <div
        css={css`
          border-left: 2px solid lightblue;
        `}
      >
        <div
          css={css`
            padding: 16px 28px;
            border-bottom: 1px solid lightblue;
            font-weight: 500;
          `}
        >
          Multiple nodes selected
        </div>
        <div
          css={css`
            padding: 24px 28px;
          `}
        >
          Select your keyboard keys to do actions
        </div>
      </div>
    );
  }

  // If a single node selected, show the node editor, Editor is a self contained
  // component, it will handle the node type and show the appropriate editor
  if (isSingleNodeSelected) {
    const selectedNode = selectedNodes[0];

    return (
      <div
        css={css`
          border-left: 2px solid lightblue;
        `}
      >
        <div
          css={css`
            padding: 16px 28px;
            border-bottom: 1px solid lightblue;
            font-weight: 500;
            display: flex;
            align-items: center;
          `}
        >
          <ChevronLeft
            css={css`
              cursor: pointer;
              padding: 4px;
              border-radius: 4px;

              &:hover {
                background: lightblue;
              }
            `}
            size={24}
            onClick={onDeselect}
          />
          <p
            css={css`
              margin-left: 8px;
            `}
          >{labelsMap[selectedNode.type]} Message</p>
        </div>
        <NodeDataEditor node={selectedNode} />
      </div>
    );
  }

  // If none selected, then we can show the Nodes panel so user can use them
  return (
    <div
      css={css`
        border-left: 2px solid lightblue;
      `}
    >
      <div
        css={css`
          padding: 16px 28px;
          border-bottom: 1px solid lightblue;
          font-weight: 500;
        `}
      >
        Nodes
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          padding: 24px 28px;
        `}
      >
        {nodes.map((node) => (
          <NodeTypeRenderer key={node.id} {...node} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
