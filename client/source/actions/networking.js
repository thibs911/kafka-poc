import fetch from 'isomorphic-fetch';

import cst from '../constants/networking';

export const start = () => ({ type: cst.START });
export const stop = () => ({ type: cst.STOP });

const getRequestOptions = options => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  };

  return requestOptions;
};

export function request(url, options) {
  return () => {
    const requestOptions = getRequestOptions(options);
    let status;
    return fetch(url, requestOptions)
      .then(response => {
        status = response.status;
        return status === 204 ? null : response.json();
      })
      .then(response => {
        const result = {
          status,
          data: response,
        };
        if (status >= 200 && status < 300) {
          return result;
        }
        throw new Error(
          response && response.error
            ? response.error.name
            : JSON.stringify(response),
        );
      });
  };
}
