import { createLocalPersister as createLocalBrowserPersister } from "tinybase/persisters/persister-browser/with-schemas";
import { MergeableStore, OptionalSchemas } from "tinybase/with-schemas";

export const createLocalPersister = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: MergeableStore<Schemas>
) => createLocalBrowserPersister(store, storeId);
