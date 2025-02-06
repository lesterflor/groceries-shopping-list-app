import * as React from "react";
import { createContext, useCallback, useContext } from "react";
import {
  useRecentShoppingLists,
  useShoppingListIds,
} from "@/stores/ShoppingListsStore";
import { ExtensionStorage } from "@bacons/apple-targets";

// Initialize storage with your group ID
const storage = new ExtensionStorage(
  "group.com.betoatexpo.groceries-shopping-list"
);

type WidgetContextType = {
  refreshWidget: () => void;
};

const WidgetContext = createContext<WidgetContextType | null>(null);

export function WidgetProvider({ children }: { children: React.ReactNode }) {
  const recentLists = useRecentShoppingLists();
  const shoppingListIds = useShoppingListIds();
  // console.log("recentLists", recentLists.length);
  console.log("recentLists", recentLists);

  // Update widget state whenever recentLists changes
  React.useEffect(() => {
    // Store total count
    storage.set("widget_total_lists", shoppingListIds.length);

    // Store recent lists data
    storage.set(
      "widget_recent_lists",
      recentLists.map((list) => ({
        listId: list.listId,
        name: list.name,
        emoji: list.emoji,
      }))
    );

    // Refresh widget
    ExtensionStorage.reloadWidget();
  }, [recentLists]);

  // storage.set("numberOfLists", shoppingListIds.length);
  // storage.set("recentLists", recentLists);

  const refreshWidget = useCallback(() => {
    ExtensionStorage.reloadWidget();
  }, []);

  return (
    <WidgetContext.Provider value={{ refreshWidget }}>
      {children}
    </WidgetContext.Provider>
  );
}

export const useWidget = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useWidget must be used within a WidgetProvider");
  }
  return context;
};
