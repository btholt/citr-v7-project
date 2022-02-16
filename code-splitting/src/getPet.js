export default function getPet(id) {
  let apiResult;
  let status = "pending";
  const suspensePromise = fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`)
    .then((res) => res.json())
    .then((res) => {
      apiResult = res.pets[0];
      status = "success";
    })
    .catch((err) => {
      apiResult = err;
      status = "error";
    });
  return {
    readData() {
      if (status === "pending") {
        // data isn't ready, throw promise
        throw suspensePromise;
      } else if (status === "success") {
        // data is ready, return it synchronously
        return apiResult;
      } else if (status === "error") {
        // data had an errow, throw the error from the API
        throw apiResult;
      }
    },
  };
}
