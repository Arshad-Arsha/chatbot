import { FC, MouseEventHandler, ReactNode } from "react";
import { css } from "@emotion/react";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      css={css`
        padding: 6px 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1.2;

        &:hover {
          background: #eee;
        }
      `}
      disabled={props.loading}
      onClick={props.onClick}
    >
      {props.loading ? (
        <Loader2
          size={18}
          css={css`
            color: black;
            animation: spin 1s linear infinite;

            @keyframes spin {
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        />
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
