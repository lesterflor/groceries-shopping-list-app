import * as UiReact from "tinybase/ui-react/with-schemas";
import { Store, OptionalSchemas, Content } from "tinybase/with-schemas";
import { Persister, Persists } from "tinybase/persisters/with-schemas";

export const useLocalPersisterAndStartImpl = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: Store<Schemas>,
  create: (
    storeId: string,
    store: Store<Schemas>
  ) => Persister<Schemas, Persists>,
  initialContentJson?: string,
  then?: () => void
) =>
  (UiReact as UiReact.WithSchemas<Schemas>).useCreatePersister(
    store,
    (store) => create(storeId, store),
    [create, storeId],
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
