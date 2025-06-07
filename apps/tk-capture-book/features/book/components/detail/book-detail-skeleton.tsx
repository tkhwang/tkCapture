import { View, ScrollView } from "react-native";

import { Card, CardContent, CardHeader } from "@/components/ui";

export function BookDetailSkeleton() {
  return (
    <ScrollView className="flex-1 bg-background">
      {/* BookDetailHeader Skeleton */}
      <View className="bg-card p-6">
        <View className="flex-row gap-4">
          {/* Book Cover Skeleton */}
          <View className="h-48 w-32 animate-pulse rounded-lg bg-muted" />

          {/* Book Info Skeleton */}
          <View className="flex-1 justify-between">
            {/* Title */}
            <View className="space-y-2">
              <View className="h-6 w-full animate-pulse rounded bg-muted" />
              <View className="h-5 w-4/5 animate-pulse rounded bg-muted" />
            </View>

            {/* Author & Publisher */}
            <View className="mt-4 space-y-2">
              <View className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              <View className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            </View>

            {/* Description preview */}
            <View className="mt-4 space-y-1">
              <View className="h-3 w-full animate-pulse rounded bg-muted" />
              <View className="h-3 w-full animate-pulse rounded bg-muted" />
              <View className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            </View>
          </View>
        </View>

        {/* Expand/Collapse button skeleton */}
        <View className="mt-4 items-center">
          <View className="h-6 w-20 animate-pulse rounded bg-muted" />
        </View>
      </View>

      {/* BookDetailEdit Skeleton */}
      <Card className="mx-4 mb-4 mt-2">
        <CardHeader>
          <View className="h-5 w-16 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Status Buttons Skeleton */}
          <View className="flex flex-row justify-between gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <View key={index} className="h-9 flex-1 animate-pulse rounded-md bg-muted" />
            ))}
          </View>

          {/* Progress Label Skeleton */}
          <View className="h-5 w-20 animate-pulse rounded bg-muted" />

          {/* Progress Bar Skeleton */}
          <View className="flex flex-row items-center justify-between gap-4">
            <View className="h-2 flex-1 animate-pulse rounded-full bg-muted" />
            <View className="h-4 w-8 animate-pulse rounded bg-muted" />
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
