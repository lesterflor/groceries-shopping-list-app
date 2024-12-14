import * as SQLite from "expo-sqlite";
import { useCreatePersister } from "tinybase/ui-react";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import { Store } from "tinybase/store";

export const useAndStartPersister = (store: Store) =>
  // Persist store to Expo SQLite or local storage; load once, then auto-save.
  useCreatePersister(
    store,
    (store) =>
      createExpoSqlitePersister(store, SQLite.openDatabaseSync("app.db")),
    [],
    // @ts-ignore
    (persister) => persister.load().then(persister.startAutoSave)
  );
