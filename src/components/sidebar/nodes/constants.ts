import { FileImage, FileText } from "lucide-react";
import { NodeTypes } from "../../flow-zone/nodes/typings";

export const labelsMap = {
  [NodeTypes.Text]: "Text",
  [NodeTypes.Image]: "Image",
};

export const iconsMap = {
  [NodeTypes.Text]: FileText,
  [NodeTypes.Image]: FileImage,
};

export const nodeDefaultStates = {
  [NodeTypes.Text]: {
    data: { text: "Hello World" },
  },
  [NodeTypes.Image]: {
    data: {
      url: "https://picsum.photos/200/300",
      caption: "Random image",
    },
  },
};
