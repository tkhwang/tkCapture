import { View } from "react-native";

import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { SelectedBookHeader } from "@/features/book/components/selected-book-header";
import { BookSentence } from "@/features/book/components/setence/book-sentence";
import { BookSentenceGuide } from "@/features/book/components/setence/book-sentence-guide";
import { selectedBookAtom } from "@/features/book/states/book";

export default function SentenceScreen() {
  const { t } = useTranslation();

  const selectedBook = useAtomValue(selectedBookAtom);

  return (
    <View className="flex-1 bg-background">
      <SelectedBookHeader screen={t("sentence.screen")} />
      {selectedBook ? <BookSentence /> : <BookSentenceGuide />}
    </View>
  );
}
