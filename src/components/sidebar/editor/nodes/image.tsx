import { ChangeEvent, FC, useCallback } from "react";
import { css } from "@emotion/react";
import useStore, { selector } from "../../../flow-zone/store";
import { shallow } from "zustand/shallow";
import { NodeTypes } from "../../../flow-zone/nodes/typings";

const ImageNodeDataEditor: FC<{ id: string }> = ({ id }) => {
  const { getNode, changeNodeData } = useStore(selector, shallow);
  const state = getNode(id);
  const type = NodeTypes.Image;

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!state) return;
      changeNodeData({
        ...state,
        type,
        data: { ...state.data, [e.target.name]: e.target.value },
      });
    },
    [state, type, changeNodeData]
  );

  const onTextAreaChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!state) return;
      changeNodeData({
        ...state,
        type,
        data: { ...state.data, [e.target.name]: e.target.value },
      });
    },
    [state, type, changeNodeData]
  );

  const onImageUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !state) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        changeNodeData({
          ...state,
          type,
          data: { ...state.data, url: base64 },
        });
      };
      reader.readAsDataURL(file);
    },
    [state, type, changeNodeData]
  );

  return (
    <div
      css={css`
        padding: 16px 28px;
        border-bottom: 1px solid lightblue;
        font-weight: 500;
      `}
    >
      <div>
        <label htmlFor="url">Image URL</label>
        <input
          name="url"
          value={state?.data?.url || ""}
          onChange={onInputChange}
          css={css`
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid lightblue;
            margin-top: 8px;
            width: 100%;
          `}
        />
      </div>

      <div
        css={css`
          margin-top: 16px;
        `}
      >
        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          css={css`
            margin-top: 8px;
            width: 100%;
          `}
        />
      </div>

      <div
        css={css`
          margin-top: 16px;
        `}
      >
        <label htmlFor="caption">Caption</label>
        <textarea
          name="caption"
          value={state?.data?.caption || ""}
          onChange={onTextAreaChange}
          css={css`
            margin-top: 8px;
            padding: 8px 12px;
            border: 1px solid lightblue;
            border-radius: 4px;
            width: 100%;
            height: 100px;
          `}
        />
      </div>
    </div>
  );
};

export default ImageNodeDataEditor;
