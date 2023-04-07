export const load = ({ fetch, params }) => {

    const getPost = async (id) => {
    const api = 'http://localhost:3000';
    const response = await fetch(`${api}/board/${id}`);
    const data = await response.json();
    return data
    }
    
    return {
        post : getPost(params.boardId)
    }
}