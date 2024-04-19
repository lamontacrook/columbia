/*
Copyright 2020 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import { useState, useEffect, useContext } from 'react';
import { AppContext } from './context';

const { AEMHeadless } = require('@adobe/aem-headless-client-js');

/**
 * Custom React Hook to perform a GraphQL query
 * @param path - Persistent query path
 */
export function useGraphQL(path, params = {}) {
  const context = useContext(AppContext);

  let [data, setData] = useState(null);
  let [errorMessage, setErrors] = useState(null);
  useEffect(() => {
    function makeRequest() {
      const sdk = new AEMHeadless({
        serviceURL: context.serviceURL,
        endpoint: '/content/_cq_graphql/headless/endpoint.json'
      });
      const request = sdk.runPersistedQuery.bind(sdk);
      params['ts'] = new Date().getTime();
      request(`headless/${path}`, params, { credentials: 'include' })
        .then(({ data, errors }) => {
          //If there are errors in the response set the error message
          if (errors) {
            setErrors(mapErrors(errors));
          }
          //If data in the response set the data as the results
          if (data) {
            setData(data);
          }
        })
        .catch((error) => {
          setErrors(error);
        });
    }
    
    if (Object.prototype.hasOwnProperty.call(context, path) && Object.keys(context[path]).length > 0) {
      setData(context[path]);
    } else
      makeRequest();

  }, [path, context]);


  return { data, errorMessage };
}

/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
function mapErrors(errors) {
  return errors.map((error) => error.message).join(',');
}
