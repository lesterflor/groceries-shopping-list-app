import * as SQLite from "expo-sqlite";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite/with-schemas";
import { OptionalSchemas, Store } from "tinybase/with-schemas";

export const createLocalPersister = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: Store<Schemas>
) =>
  createExpoSqlitePersister(store, SQLite.openDatabaseSync("app.db"), storeId);
