import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PixelatedVideo } from "./PixelatedVideo";

export default {
  title: "Component/PixelatedVideo",
  component: PixelatedVideo,
} as ComponentMeta<typeof PixelatedVideo>;

export const Primary: ComponentStory<typeof PixelatedVideo> = () => (
  <PixelatedVideo pixelDimension={12} />
);
