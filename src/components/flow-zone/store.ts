import { create } from "zustand";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  DefaultEdgeOptions,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";

import { DropTargetMonitor } from "react-dnd";
import { NodeData, Nodes, NodeTypes } from "./nodes/typings";

const initialDummyNodes: Node<NodeData, NodeTypes>[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { text: "text message" },
    type: NodeTypes.Text,
  },
  {
    id: "2",
    position: { x: 420, y: 220 },
    data: {
      url: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/paris-jaco-marx.jpg",
      caption: "Wanna get a free trip to Paris?",
    },
    type: NodeTypes.Image,
  },
];

export const dummyNode = {
  [NodeTypes.Text]: {
    data: {
      text: "Hi! I want to go to Paris!",
    },
  },
  [NodeTypes.Image]: {
    data: {
      url: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/paris-jaco-marx.jpg",
      caption: "Wanna get a free trip to Paris?",
    },
  },
};

const initialDummyEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

type RFState = {
  nodes: Node<NodeData, NodeTypes>[];
  edges: Edge[];
  selectedNodes: Array<Nodes>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  allowTargetConnection: (id: string) => boolean;
  allowSourceConnection: (id: string) => boolean;
  addNode: (node: Node<NodeData, NodeTypes>) => void;
  addEdge: (edge: Edge) => void;
  onDrop: (
    item: { id: string; type: NodeTypes },
    monitor: DropTargetMonitor<unknown, unknown>
  ) => void;
  getNode: (id: string) => Node | undefined;
  changeNodeData: (args: {
    id: string;
    type?: NodeTypes;
    data?: NodeData;
    selected?: boolean;
  }) => void;
  setSelectedNodes: (nodes: Array<Nodes>) => void;
  deselectNodes: (id?: string) => void;
  defaultEdgeOptions: DefaultEdgeOptions;
};

const storedNodes = window.localStorage.getItem("nodes");
const storedEdges = window.localStorage.getItem("edges");

const initialNodes = storedNodes ? JSON.parse(storedNodes) : initialDummyNodes;
const initialEdges = storedEdges ? JSON.parse(storedEdges) : initialDummyEdges;

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get, store) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodes: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as Node<
        NodeData,
        NodeTypes
      >[],
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  allowSourceConnection: (id: string) => {
    const edges = get().edges;

    // check if there are edges with this node's id as source and have a target
    const isAlreadyConnected = edges.some((e) => {
      const { source, target } = e;

      if (source === id && target) {
        return true;
      }

      return false;
    });

    return !isAlreadyConnected;
  },
  allowTargetConnection: (id: string) => {
    const edges = get().edges;

    const isAlreadyConnected = edges.some((e) => {
      const { source, target } = e;

      if (target === id && source) {
        return true;
      }

      return false;
    });

    return !isAlreadyConnected;
  },
  onDrop: (item, monitor) => {
    const { id, type } = item;
    const offset = monitor.getClientOffset();
    const state = store.getState();
    const nodes = state.nodes;

    const lastNode = nodes[nodes.length - 1];

    // If we can get position from offset better, if not just use the last node's position
    // to calculate the new node's position to a good enough degree
    const x = offset?.x || lastNode.position.x + 300;
    const y = offset?.y || lastNode.position.y + 400;

    const newNode = {
      id: `${id}-${Date.now()}`,
      position: { x: x, y: y },
      data: dummyNode[type].data,
      type,
    };

    state.addNode(newNode);
  },
  getNode: (id) => {
    return get().nodes.find((node) => node.id === id);
  },
  changeNodeData: (args) => {
    const { id, data, selected } = args;

    const state = store.getState();
    const node = state.getNode(id);

    if (!node) return;

    const newNode = {
      ...node,
      selected,
      data: {
        ...node.data,
        ...data,
      },
    };

    const nodes = state.nodes.map((node) => {
      if (node.id === id) {
        return newNode;
      }

      return node;
    });

    set({
      nodes: nodes as Array<Node<NodeData, NodeTypes>>,
    });
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  addEdge: (edge) => {
    set({
      edges: [...get().edges, edge],
    });
  },
  setSelectedNodes: (nodes) => {
    set({
      selectedNodes: nodes,
    });
  },
  deselectNodes: (id) => {
    const state = store.getState();

    // if none selected, return
    if (state.selectedNodes.length === 0) return;

    let finalId = id;

    // if no id passed, use the first selected node's id
    if (!finalId) {
      const node = state.selectedNodes[0];
      finalId = node.id;
    }

    // deselect the node
    const nodes = state.nodes.map((node) => {
      if (node.id === finalId) {
        return {
          ...node,
          selected: false,
        };
      }

      return node;
    });

    set({
      nodes: nodes as Array<Node<NodeData, NodeTypes>>,
      selectedNodes: state.selectedNodes.filter((node) => node.id !== finalId),
    });
  },
  defaultEdgeOptions,
}));

export const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  onDrop: state.onDrop,
  addEdge: state.addEdge,
  defaultEdgeOptions: state.defaultEdgeOptions,
  getNode: state.getNode,
  changeNodeData: state.changeNodeData,
  allowTargetConnection: state.allowTargetConnection,
  allowSourceConnection: state.allowSourceConnection,
  selectedNodes: state.selectedNodes,
  setSelectedNodes: state.setSelectedNodes,
  deselectNodes: state.deselectNodes,
});

export default useStore;
