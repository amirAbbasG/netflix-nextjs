export const hasuraQuery = async (
  operationDocs,
  operationName,
  variables,
  token
) => {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "Post",
    headers: {
      //   "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET_KEY,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: operationDocs,
      variables,
      operationName,
    }),
  });

  return await result.json();
};

export const isNewUser = async (token, issuer) => {
  const operationsDoc = `
  query MyQuery {
    users(where: {isuuer: {_eq: ""}}) {
      id
      isuuer
      email
    }
  }
`;

  const respons = await hasuraQuery(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );

  return respons?.users?.lenght === 0;
};
