import * as SQLite from "expo-sqlite";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite/with-schemas";
import { MergeableStore, OptionalSchemas } from "tinybase/with-schemas";

export const createLocalPersister = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: MergeableStore<Schemas>
) => createExpoSqlitePersister(store, SQLite.openDatabaseSync(storeId + ".db"));
