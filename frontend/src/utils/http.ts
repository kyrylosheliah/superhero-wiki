const server = "http://localhost:3001"

export const emitHttp = (method: string, path: string, body: any = undefined) =>
  fetch(server + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body && JSON.stringify(body),
  });