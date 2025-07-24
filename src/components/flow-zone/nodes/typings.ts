import { Node } from "reactflow";

export enum NodeTypes {
  Text = "text",
  Image = "image",
}

export interface TextNodeData {
  text: string;
}

export interface ImageNodeData {
  caption: string;
  url: string;
}

export interface TextNode extends Node<TextNodeData, NodeTypes.Text> {
  type: NodeTypes.Text;
}

export interface ImageNode extends Node<ImageNodeData, NodeTypes.Image> {
  type: NodeTypes.Image;
}

export type Nodes = TextNode | ImageNode;

export type NodeData = TextNodeData | ImageNodeData;
