export const load = ({ fetch, params }) => {
  const getPost = async (id) => {
    const api =
      "https://port-0-sveltekit-server-1093j2alg73daic.sel3.cloudtype.app";
    const response = await fetch(`${api}/board/${id}`);
    const data = await response.json();
    return data;
  };

  return {
    post: getPost(params.boardId),
  };
};
