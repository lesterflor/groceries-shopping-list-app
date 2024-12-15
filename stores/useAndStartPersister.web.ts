import { createLocalPersister } from "tinybase/persisters/persister-browser";
import { useCreatePersister } from "tinybase/ui-react";
import { Store } from "tinybase/store";

export const useAndStartPersister = (store: Store) =>
  // Persist store to Expo SQLite or local storage; load once, then auto-save.
  useCreatePersister(
    store,
    (store) => createLocalPersister(store, "todos"),
    [],
    // @ts-ignore
    (persister) => persister.load().then(persister.startAutoSave)
  );
