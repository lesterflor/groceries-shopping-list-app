import { createLocalPersister as createLocalBrowserPersister } from "tinybase/persisters/persister-browser/with-schemas";
import { OptionalSchemas, Store } from "tinybase/with-schemas";

export const createLocalPersister = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: Store<Schemas>
) => createLocalBrowserPersister(store, storeId);
