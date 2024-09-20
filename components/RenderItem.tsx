import React from "react";

type RenderItemProps<T> = {
  item: T;
  index: number;
  RenderComponent: React.ComponentType<{ item: T; index: number }>;
};

const RenderItem = <T,>({
  item,
  index,
  RenderComponent,
}: RenderItemProps<T>) => {
  return <RenderComponent item={item} index={index} />;
};

export default RenderItem;
