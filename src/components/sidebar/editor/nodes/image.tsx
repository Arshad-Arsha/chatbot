import { ChangeEvent, FC, useCallback } from "react";
import { ImageNode } from "../../../flow-zone/nodes/typings";
import { css } from "@emotion/react";
import useStore, { selector } from "../../../flow-zone/store";
import { shallow } from "zustand/shallow";

const ImageNodeDataEditor: FC<ImageNode> = ({ type, id }) => {
  const { getNode, changeNodeData } = useStore(selector, shallow);

  const state = getNode(id);

  // Text input change
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

  // Textarea change
  const onTextAreaChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!state) return;
      changeNodeData({
        ...state,
        type,
        data: { ...state.data, [e.target.name]: e.target.value },
      });
    },
    [changeNodeData, state, type]
  );

  // File upload change
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
      {/* URL input */}
      <div>
        <label htmlFor="text">Image URL</label>
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

      {/* Image file upload */}
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

      {/* Caption textarea */}
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
import React from 'react';
import { NodeProps, Handle, Position } from 'reactflow'; // Or similar library
import { ImageNode } from './typings'; // Assuming your ImageNode typings

const ImageNodeComponent: React.FC<NodeProps<ImageNode>> = ({ data }) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      {data.url && <img src={data.url} alt={data.caption || 'Uploaded Image'} style={{ maxWidth: '200px', maxHeight: '150px' }} />}
      {data.caption && <p>{data.caption}</p>}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ImageNodeDataEditor;
