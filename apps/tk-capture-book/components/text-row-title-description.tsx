import { View } from "react-native";

import { Text } from "@/components/ui/text";

interface Props {
  title?: string;
  description?: string;
}

export function TextRowTitleDescription({ title, description }: Props) {
  return (
    <View className="flex flex-row flex-wrap items-center gap-2">
      {title && <Text className="font-semibold">{title}</Text>}
      {description && <Text>{description}</Text>}
    </View>
  );
}
