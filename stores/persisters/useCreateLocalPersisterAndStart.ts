import * as UiReact from "tinybase/ui-react/with-schemas";
import {
  Content,
  MergeableStore,
  OptionalSchemas,
} from "tinybase/with-schemas";
import { createLocalPersister } from "./createLocalPersister";

export const useCreateLocalPersisterAndStart = <
  Schemas extends OptionalSchemas
>(
  storeId: string,
  store: MergeableStore<Schemas>,
  initialContentJson?: string
) =>
  (UiReact as UiReact.WithSchemas<Schemas>).useCreatePersister(
    store,
    (store: MergeableStore<Schemas>) => createLocalPersister(storeId, store),
    [storeId],
    async (persister) => {
      let initialContent: Content<Schemas> | undefined = undefined;
      try {
        initialContent = JSON.parse(initialContentJson);
      } catch {}
      await persister.load(initialContent);
      await persister.startAutoSave();
    },
    [initialContentJson]
  );
