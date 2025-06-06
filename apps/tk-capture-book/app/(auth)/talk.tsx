import { View } from "react-native";

import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { SelectedBookHeader } from "@/features/book/components/selected-book-header";
import { BookTalk } from "@/features/book/components/talk/book-talk";
import { BookTalkGuide } from "@/features/book/components/talk/book-talk-guide";
import { selectedBookAtom } from "@/features/book/states/book";

export default function TalkScreen() {
  const { t } = useTranslation();

  const selectedBook = useAtomValue(selectedBookAtom);

  return (
    <View className="flex-1 bg-background">
      <SelectedBookHeader screen={t("talk.screen")} />
      {selectedBook ? <BookTalk /> : <BookTalkGuide />}
    </View>
  );
}
