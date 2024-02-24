export function createResponse(data, status="error") {
  if (status === "success") {
    return new Response(
      JSON.stringify({
        status: "success",
        result: data,
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        status: "error",
        result: data,
      })
    );
  }
}