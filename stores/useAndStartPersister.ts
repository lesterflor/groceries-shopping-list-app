import * as SQLite from "expo-sqlite";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite/with-schemas";
import { Store, OptionalSchemas, Content } from "tinybase/with-schemas";

export const useAndStartPersister = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: Store<Schemas>,
  initialContentJson?: string,
  then?: () => void
) => {
  // Persist store to Expo SQLite or local storage; load once, then auto-save.
  return (UiReact as UiReact.WithSchemas<Schemas>).useCreatePersister(
    store,
    (store) =>
      createExpoSqlitePersister(
        store,
        SQLite.openDatabaseSync(storeId + ".db")
      ),
    [storeId],
    async (persister) => {
      let initialContent: Content<Schemas> | undefined = undefined;
      try {
        initialContent = JSON.parse(initialContentJson);
      } catch {}
      await persister.load(initialContent);
      await persister.startAutoSave();
      then?.();
    },
    [initialContentJson, then]
  );
};
