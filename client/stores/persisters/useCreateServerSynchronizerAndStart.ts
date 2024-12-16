import { createWsSynchronizer } from "tinybase/synchronizers/synchronizer-ws-client/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { MergeableStore, OptionalSchemas } from "tinybase/with-schemas";

const SYNC_SERVER_URL = process.env.EXPO_PUBLIC_SYNC_SERVER_URL;

export const useCreateServerSynchronizerAndStart = <
  Schemas extends OptionalSchemas
>(
  storeId: string,
  store: MergeableStore<Schemas>
) =>
  (UiReact as UiReact.WithSchemas<Schemas>).useCreateSynchronizer(
    store,
    async (store: MergeableStore<Schemas>) =>
      await (
        await createWsSynchronizer(
          store,
          new WebSocket(SYNC_SERVER_URL + storeId)
        )
      ).startSync(),
    [storeId]
  );
