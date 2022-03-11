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

export const findVideoByUserId = async (token, userId, videoId) => {
  const operationsDoc = `
  query findVideoByUserId($userId: String!, $videoId: String!) {
    stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId }}) {
      id
      userId
      videoId
      favourited
      watched
    }
  }
`;
  const response = await hasuraQuery(
    operationsDoc,
    "findVideoByUserId",
    {
      userId,
      videoId,
    },
    token
  );

  return response?.data?.stats;
};

export const createStats = async (
  token,
  { userId, videoId, favourited, watched }
) => {
  const operationsDoc = `
  mutation createStats($favourited: Int!, $userId: String!, $videoId: String!, $watched: Boolean!) {
    insert_stats_one(object: {favourited: $favourited, userId: $userId, videoId: $videoId, watched: $watched}) {
      favourited
      userId
      id
      videoId
    }
  }
`;
  const response = await hasuraQuery(
    operationsDoc,
    "createStats",
    {
      userId,
      videoId,
      favourited,
      watched,
    },
    token
  );

  return response;
};

export const updateStats = async (
  token,
  { userId, videoId, favourited, watched }
) => {
  const operationsDoc = `
  mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    update_stats(
      _set: {watched: $watched, favourited: $favourited}, 
      where: {
        userId: {_eq: $userId}, 
        videoId: {_eq: $videoId}
      }) {
      returning {
        favourited,
        userId,
        watched,
        videoId
      }
    }
  }
  `;
  const response = await hasuraQuery(
    operationsDoc,
    "updateStats",
    {
      userId,
      videoId,
      favourited,
      watched,
    },
    token
  );

  return response;
};

export const getWatchedVideos = async (token, userId) => {
  const operationsDoc = `
  query getWatchedVideos($userId: String!) {
    stats(where: {userId: {_eq: $userId}, watched: {_eq: true}}) {
      videoId
    }
  }
`;

  const response = await hasuraQuery(
    operationsDoc,
    "getWatchedVideos",
    { userId },
    token
  );

  return response?.data?.stats;
};

export const getFavouritedVideos = async (token, userId) => {
  const operationsDoc = `
  query getFavouritedVideos($userId: String!) {
    stats(where: {userId: {_eq: $userId}, favourited: {_eq: 1}}) {
      videoId
    }
  }
`;

  const response = await hasuraQuery(
    operationsDoc,
    "getFavouritedVideos",
    { userId },
    token
  );

  return response?.data?.stats;
};
