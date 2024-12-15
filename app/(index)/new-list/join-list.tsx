import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import React from "react";

export default function JoinListScreen() {
  return (
    <>
      <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <ThemedText>Join List</ThemedText>
      </BodyScrollView>
    </>
  );
}
