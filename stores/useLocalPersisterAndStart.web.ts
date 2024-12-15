import { Store, OptionalSchemas } from "tinybase/with-schemas";
import { createLocalPersister } from "tinybase/persisters/persister-browser/with-schemas";
import { useLocalPersisterAndStartImpl } from "./common";
import { useCallback } from "react";

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
