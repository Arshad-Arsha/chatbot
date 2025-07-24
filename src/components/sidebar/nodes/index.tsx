import { FC } from "react";
import { useDrag } from "react-dnd";
import { css } from "@emotion/react";
import { NodeTypes } from "../../flow-zone/nodes/typings";
import { iconsMap } from "./constants";

export interface NodeTypeProps {
  id: string;
  label: string;
  type: NodeTypes;
}

const NodeTypeRenderer: FC<NodeTypeProps> = ({ id, type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "node",
    item: { id, type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const Icon = iconsMap[type];

  return (
    <div
      id={id}
      ref={drag}
      css={css(
        css`
          padding: 32px 24px;
          text-align: center;
          border-radius: 4px;
          border: 1px solid lightblue;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          &:hover {
            cursor: pointer;
            background: repeating-linear-gradient(
              135deg,
              #add8e610,
              #add8e630 5px,
              white 5px,
              white 10px
            );
          }
        `,
        isDragging &&
          css`
            opacity: 0.5;
            cursor: grabbing;
          `
      )}
    >
      <Icon />
      <p
        css={css`
          margin-top: 20px;
        `}
      >
        {label}
      </p>
    </div>
  );
};

export default NodeTypeRenderer;
