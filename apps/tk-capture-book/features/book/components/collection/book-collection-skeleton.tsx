import { FlatList, View } from "react-native";

import { Card, CardContent } from "@/components/ui";

export function BookCollectionSkeleton() {
  const skeletonData = Array.from({ length: 4 }, (_, index) => ({ id: index.toString() }));

  const renderSkeletonItem = () => (
    <View className="pb-2 pt-1">
      <Card className="mb-1 overflow-hidden border border-border/90 shadow-lg">
        <CardContent className="flex-row bg-card p-4">
          {/* Image Skeleton */}
          <View className="h-28 w-20 animate-pulse rounded-md bg-muted" />

          {/* Content Skeleton */}
          <View className="ml-4 flex flex-1 flex-col justify-between">
            <View className="flex flex-col">
              {/* Title Skeleton */}
              <View className="mb-2 h-5 w-full animate-pulse rounded bg-muted" />
              <View className="mb-3 h-4 w-3/4 animate-pulse rounded bg-muted" />

              {/* Author/Publisher Skeleton */}
              <View className="mb-1 flex-row items-center gap-2">
                <View className="h-3 w-16 animate-pulse rounded bg-muted" />
                <View className="h-3 w-1 animate-pulse rounded bg-muted" />
                <View className="h-3 w-20 animate-pulse rounded bg-muted" />
              </View>
            </View>

            {/* Progress Section Skeleton */}
            <View className="flex flex-row items-center justify-between gap-4">
              <View className="flex-1">
                <View className="h-2 w-full animate-pulse rounded-full bg-muted" />
              </View>
              <View className="h-4 w-8 animate-pulse rounded bg-muted" />
            </View>
          </View>

          <View className="ml-3 flex items-center justify-center">
            <View className="h-5 w-3 animate-pulse rounded bg-muted" />
          </View>
        </CardContent>
      </Card>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={skeletonData}
        renderItem={renderSkeletonItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Disable scrolling for skeleton
      />
    </View>
  );
}
