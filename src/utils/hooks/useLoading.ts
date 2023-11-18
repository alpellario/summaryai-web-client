import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

interface WithLoadingHook {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  withLoading: (fn: () => Promise<any>) => Promise<void>;
  withLoadingDispatch: (
    fn: (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<any>
  ) => Promise<void>;
}

const useLoading = (): WithLoadingHook => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // async await
  const withLoading = useCallback(async (fn: any) => {
    setLoading(true);
    try {
      await fn();
    } catch (error) {
      console.error("withLoading error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // redux thunk
  const withLoadingDispatch = useCallback(
    async (fn: any) => {
      setLoading(true);
      try {
        await dispatch(fn);
      } catch (error) {
        console.error("withLoadingDispatch error", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return { loading, setLoading, withLoading, withLoadingDispatch };
};

export default useLoading;
