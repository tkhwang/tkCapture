import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Database } from "@/types/types_db";

// Define Message type
type Message = {
  _id: string | number;
  text: string;
  createdAt: Date;
  user: {
    _id: string | number;
    name: string;
    avatar?: string;
  };
};

type BookChatProps = {
  book: Database["public"]["Tables"]["books"]["Row"];
  user: { id: string } | null;
};

export function BookChat({ book, user }: BookChatProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      _id: 1,
      text: `Welcome to ${book.title} capture space. You can add your thoughts and captured sentences here.`,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Book Assistant",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
  ]);

  // Group messages by date
  const groupMessagesByDate = (msgs: Message[]) => {
    const grouped: Record<string, Message[]> = {};

    msgs.forEach((msg) => {
      const date = new Date(msg.createdAt).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(msg);
    });

    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      _id: Date.now(),
      text: inputMessage,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: user?.id || "User",
      },
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");
    Keyboard.dismiss();
  };

  // Format timestamp for messages
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View className="flex-1 bg-card">
        {/* Chat Header */}
        <View className="flex-row items-center justify-between p-4 bg-secondary">
          <View className="flex-row items-center">
            {/* Book-shaped thumbnail */}
            <View className="w-10 mr-3 overflow-hidden border rounded-sm shadow-sm h-14 border-border">
              {book.thumbnail ? (
                <Image
                  source={{ uri: book.thumbnail }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center justify-center w-full h-full bg-primary/10">
                  <Text className="text-xs font-medium">
                    {book.title.substring(0, 2).toUpperCase()}
                  </Text>
                </View>
              )}
              {/* Book spine effect */}
              <View className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/30" />
            </View>
            <View className="flex-1 gap-1 mr-3">
              <Text className="font-medium">{book.title}</Text>
              <Text className="text-xs text-muted-foreground">
                {book.author} | {book.publisher}
              </Text>
            </View>
          </View>
          {/* Empty View for balance */}
          <View className="w-10" />
        </View>

        {/* Chat Messages */}
        <FlatList
          className="flex-1 px-4"
          data={Object.keys(groupedMessages)}
          inverted
          keyExtractor={(date) => date}
          renderItem={({ item: date }) => (
            <View>
              <Text className="my-2 text-xs text-center">{date}</Text>
              {groupedMessages[date].map((msg) => (
                <View
                  key={msg._id.toString()}
                  className={cn(
                    "mb-4 p-3 max-w-3/4 rounded-2xl",
                    msg.user._id === 1
                      ? "self-end bg-primary ml-auto rounded-tr-none"
                      : "self-start bg-secondary mr-auto rounded-tl-none",
                  )}
                >
                  <Text
                    className={cn(
                      msg.user._id === 1 ? "text-primary-foreground" : "text-foreground",
                    )}
                  >
                    {msg.text}
                  </Text>
                  <Text
                    className={cn(
                      "text-xs italic",
                      msg.user._id === 1
                        ? "text-right text-primary-foreground/70"
                        : "text-muted-foreground",
                    )}
                  >
                    {formatTime(msg.createdAt)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        />

        {/* Message Input */}
        <View className="p-4 border-t border-border">
          <View className="flex-row items-center p-2 border rounded-md border-input">
            <View className="flex-row mr-2">
              <Button size="icon" variant="ghost">
                <Ionicons name="add" size={20} color="hsl(var(--muted-foreground))" />
              </Button>
              <Button size="icon" variant="ghost">
                <Ionicons name="image-outline" size={20} color="hsl(var(--muted-foreground))" />
              </Button>
              <Button size="icon" variant="ghost">
                <Ionicons name="attach-outline" size={20} color="hsl(var(--muted-foreground))" />
              </Button>
            </View>
            <TextInput
              className="flex-1 text-foreground"
              placeholder="Type your thoughts..."
              value={inputMessage}
              onChangeText={setInputMessage}
            />
            <Button size="icon" variant="ghost" onPress={handleSendMessage}>
              <Ionicons name="send" size={20} color="hsl(var(--primary))" />
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
