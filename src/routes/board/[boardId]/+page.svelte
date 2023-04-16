<script>
  const api = "https://port-0-sveltekit-server-1093j2alg73daic.sel3.cloudtype.app";
  import jwtdecode from "jwt-decode";
  export let data;

  let comments = data.post.comments;

  let isYourPost = false;
  let comment = "";
  let commentBy = "";
  let commentCount = "";
  let date = new Date();
  let options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  };
  let commentAt = date.toLocaleString("ko-KR", options);

  commentCount = data.post.comments.length;

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("USER");
    if (!token) {
      alert("ログインが必要です");
      window.location.href = "/login";
    }
    const decodedToken = jwtdecode(token);
    commentBy = decodedToken.username;
  }

  if (data.post.writer.username == commentBy) {
    isYourPost = true;
  }

  const handleSubmit = async () => {
    const id = data.post._id;
    const commentData = {
      comment: comment,
      commentBy: commentBy,
      commentAt: commentAt,
    };
    if (comment == "") {
      alert("コメントを入力してください");
      return;
    }
    const response = await fetch(`${api}/writeComment/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    await response.json();
    window.location.reload();
  };

  async function deletePost() {
    try {
      const id = data.post._id;
      await fetch(`${api}/board/${id}`, {
        method: "DELETE",
      });
      window.location.href = "/board";
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteComment(commentId) {
    try {
      const id = commentId;
      const postId = data.post._id;
      await fetch(`${api}/comment/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  console.log(data.post.postNumber);
</script>

<div class="container mt-4 mb-4">
  <div class="post-bg">
    <div class="main-text">
      <h2>掲示板</h2>
    </div>
    <hr />
    <div class="post-item">
      <div class="post-title mb-3 d-flex" style="justify-content: space-between;">
        <h3>{data.post.title}</h3>
        {#if isYourPost}
        <div class="button-group">
          <a href="/write/{data.post._id}" class="btn-fix"
            >✏️</a
          >　|　
          <button
            on:click={() => {
              if (confirm("本当に削除してよろしいですか？")) {
                deletePost();
              }
            }}
            class="btn-remove">🗑️</button
          >
        </div>
    {/if}
      </div>
      <p>
        No. {data.post.postNumber}　|　{data.post.writer.username}　|　{data
          .post.createdAt}
      </p>
      <hr />
      <div class="post-content mb-2">
        <h5 style="white-space: pre;">{data.post.content}</h5>
      </div>
      <hr />
      <div class="comment-bg">
        <p class="mb-2">コメント {commentCount} 個</p>
        <form class="mb-2" on:submit|preventDefault={handleSubmit}>
          <div class="d-flex mb-2">
            <p class="commentBy mb-3">{commentBy}</p>
            <input
              bind:value={comment}
              class="comment-input mb-2"
              type="text"
              placeholder="コメントを追加 . . ."
            />
          </div>
          <div class="btngroup">
            <button type="submit" class="btn btn-secondary">登録</button>
          </div>
        </form>
        {#each comments.reverse() as comment}
          <div class="comment-item mt-3">
            <div class="d-flex mb-2" style="justify-content: space-between;">
              <p>
                {comment.commentBy}　|　{comment.commentAt}
              </p>
              {#if comment.commentBy == commentBy}
                <button class="deletebtn"
                  on:click={() => {
                    if (confirm("本当に削除してよろしいですか？")) {
                      deleteComment(comment._id);
                    }
                  }}
                >
                  <img src="../delete.png" alt="" />
                </button>
              {/if}
            </div>
            <p class="mb-2" style="white-space: pre;">{comment.comment}</p>
            <div class="like">👍 0</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .deletebtn {
    border: none;
    background: none;
    margin: 0;
    padding: 0;
  }
  .btngroup {
    text-align: right;
  }
  .commentBy {
    text-align: center;
    width: 10%;
  }
  .comment-input {
    width: 90%;
    border: none;
    outline: none;
    font-size: 16px;
    border-bottom: 2px solid black;
  }
  .main-text {
    font-size: 25px;
  }
  .post-bg {
    background: rgb(255, 255, 255);
  }
  .post-item {
    background: white;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: rgb(112, 112, 112) 0px 2px 4px 0px;
  }
  .post-item p {
    color: rgb(0, 0, 0);
    margin: 5px 0px;
  }
  .post-content {
    height: 150px;
  }
  .comment-bg {
    background: rgb(255, 255, 255);
  }
  .comment-item {
    background: rgb(240, 240, 240);
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 0px;
    box-shadow: rgb(112, 112, 112) 0px 2px 4px 0px;
  }
  .comment-item p {
    color: rgb(0, 0, 0);
    margin: 5px 0px;
  }
  .like {
    cursor: pointer;
  }

  * {
    font-family: "Noto Sans JP", sans-serif;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  a {
    text-decoration: none;
    color: black;
  }
  .button-group {
    text-align: right;
    margin-top: 10px;
  }
  .btn-fix {
    margin-right: 5px;
  }
  .btn-remove {
    margin-left: 10px;
    border: none;
    background: none;
    margin: 0;
    padding: 0;
    color: red;
  }
  /* @media only screen and (max-width: 1000px) {

  } */
</style>
