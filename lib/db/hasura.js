export const hasuraQuery = async (
  operationDocs,
  operationName,
  variables,
  token
) => {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      //   "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET_KEY,
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
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
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      issuer
      email
    }
  }
`;

  const response = await hasuraQuery(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );

  return response?.data?.users?.length === 0;
};

export const createNewUser = async (token, data) => {
  const operationsDoc = `
  mutation createNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress:  $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;
  const { issuer, email, publicAddress } = data;
  const response = await hasuraQuery(
    operationsDoc,
    "createNewUser",
    {
      issuer,
      email,
      publicAddress,
    },
    token
  );

  return response;
};
