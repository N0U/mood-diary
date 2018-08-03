export default (type) => {
  const actionCreator = {};
  actionCreator.toString = () => type;
  actionCreator.start = (payload) => ({
    type,
    payload,
    meta: {
      fetching: true,
    }
  });
  actionCreator.error = (error) => ({
    type,
    payload: error,
    meta: {
      fetching: false,
      error: true,
    }
  });
  actionCreator.finish = (payload) => ({
    type,
    payload,
    meta: {
      fetching: false,
    }
  });

  return actionCreator;
}

export const isActionFetching = (action) => action.meta && action.meta.fetching;
export const isActionSuccessful = (action) => action.meta && (!action.meta.fetching && !action.meta.error);
export const isActionFailed = (action) => action.meta && action.meta.error;
