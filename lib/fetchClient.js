export const GET = async (endpoint) => fetch(endpoint);

export const POST = async (endpoint, body) =>
  fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const PUT = async (endpoint, body) =>
  fetch(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const DELETE = async (endpoint, body) =>
  fetch(endpoint, {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
