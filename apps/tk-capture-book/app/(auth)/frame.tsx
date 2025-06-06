import { View } from "react-native";

import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { BookFrame } from "@/features/book/components/frame/book-frame";
import { BookFrameGuide } from "@/features/book/components/frame/book-frame-guide";
import { SelectedBookHeader } from "@/features/book/components/selected-book-header";
import { selectedBookAtom } from "@/features/book/states/book";

export default function FrameScreen() {
  const { t } = useTranslation();

  const selectedBook = useAtomValue(selectedBookAtom);

  return (
    <View className="flex-1 bg-background">
      <SelectedBookHeader screen={t("frame.screen")} />
      {selectedBook ? <BookFrame /> : <BookFrameGuide />}
    </View>
  );
}
