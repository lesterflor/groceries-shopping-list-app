import { createLocalPersister } from "tinybase/persisters/persister-browser/with-schemas";
import { OptionalSchemas, Store } from "tinybase/with-schemas";
import { useLocalPersisterAndStartImpl } from "./common";

const create = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: Store<Schemas>
) => createLocalPersister(store, storeId);

export const useLocalPersisterAndStart = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: Store<Schemas>,
  initialContentJson?: string,
  then?: () => void
) =>
  useLocalPersisterAndStartImpl(
    storeId,
    store,
    create<Schemas>,
    initialContentJson,
    then
  );
