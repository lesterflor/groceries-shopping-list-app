import * as React from "react";
import { createContext, useCallback, useContext } from "react";
import {
  useShoppingListIds,
  useShoppingListsValues,
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
  const recentLists = useShoppingListsValues();
  const totalLists = useShoppingListIds().length;

  // Update widget state whenever recentLists changes
  React.useEffect(() => {
    if (totalLists === 0) {
      // Set values to null if no lists exist
      storage.set("widget_total_lists", null);
      storage.set("widget_recent_lists", null);
    } else {
      // Store total count
      storage.set("widget_total_lists", totalLists);

      // Store recent lists data
      storage.set(
        "widget_recent_lists",
        recentLists.map((list) => ({
          listId: list.listId,
          name: list.name,
          emoji: list.emoji,
        }))
      );
    }

    // Refresh widget
    ExtensionStorage.reloadWidget();
  }, [recentLists]);

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
