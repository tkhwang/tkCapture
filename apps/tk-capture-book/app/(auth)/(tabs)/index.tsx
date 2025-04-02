import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";
import { Database } from "@/types/types_db";

type Book = Database["public"]["Tables"]["books"]["Row"];

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const userId = user.id;

    async function fetchBooks() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("ownerId", userId)
          .order("created_at", { ascending: false });

        if (error) {
          console.error(`[-][HomeScreen] Error fetching books: ${JSON.stringify(error)}`);
          return;
        }

        setBooks(data || []);
        console.log(`[+][HomeScreen] Fetched ${data?.length} books`);
      } catch (error) {
        console.error(`[-][HomeScreen] Unexpected error: ${JSON.stringify(error)}`);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [user]);

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity className="flex-row p-4 mb-4 bg-white rounded-lg shadow-sm">
      {item.thumbnail && (
        <Image
          source={{ uri: item.thumbnail }}
          className="w-20 rounded-md h-28"
          resizeMode="cover"
        />
      )}
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold" numberOfLines={2}>
          {item.title}
        </Text>
        <Text className="mt-1 text-gray-600" numberOfLines={1}>
          {item.author}
        </Text>
        <Text className="mt-1 text-gray-500" numberOfLines={1}>
          {item.publisher}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {loading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#0284c7" />
        </View>
      ) : books.length > 0 ? (
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <View className="absolute inset-0 flex items-center justify-center px-4">
          <View className="items-center">
            <Image
              source={require("../../../assets/images/woman-book-reading-green.png")}
              className="mb-8 w-72 h-72"
              resizeMode="contain"
            />
            <Text className="mb-3 text-xl font-medium text-gray-800">
              {t("search.search-no-result.title")}
            </Text>
            <Text className="text-base text-center text-gray-500">
              {t("search.search-no-result.description")}
            </Text>
          </View>
        </View>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
