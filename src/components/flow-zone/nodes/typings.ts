// src/components/flow-zone/nodes/typings.ts

export enum NodeTypes {
  Text = "textNode",
  Image = "imageNode",
}

export interface TextNode {
  id: string;
  type: NodeTypes.Text;
  position: { x: number; y: number };
  data: {
    text: string;
  };
}

export interface ImageNode {
  id: string;
  type: NodeTypes.Image;
  position: { x: number; y: number };
  data: {
    url: string;
    caption: string;
  };
}

export type CustomNode = TextNode | ImageNode;
