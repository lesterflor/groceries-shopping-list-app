import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";

export default function CreateListScreen() {
  const router = useRouter();

  const handleCreateList = () => {
    console.log("create list");
    router.push({
      pathname: "/(index)/list-item",
      params: {
        listId: "123",
      },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: "New list",
        }}
      />
      <BodyScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <TextInput label="List name" placeholder="Groceries List" />
        <TextInput
          label="List description (optional)"
          placeholder="Groceries for the week"
        />
        <Button onPress={handleCreateList}>Create list</Button>
      </BodyScrollView>
    </>
  );
}
