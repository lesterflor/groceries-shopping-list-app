import * as SQLite from "expo-sqlite";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite/with-schemas";
import { Store, OptionalSchemas } from "tinybase/with-schemas";
import { useLocalPersisterAndStartImpl } from "./common";

const create = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: Store<Schemas>
) =>
  createExpoSqlitePersister(store, SQLite.openDatabaseSync("app.db"), storeId);

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
