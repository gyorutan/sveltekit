<script>
  import jwtdecode from "jwt-decode";

  const api = "https://port-0-sveltekit-server-1093j2alg73daic.sel3.cloudtype.app";

  export let data;

  // console.log(data);
  // console.log(data.post._id);

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
      alert('로그인이 필요합니다');
      window.location.href = "/";
    }
    const decodedToken = jwtdecode(token);
    commentBy = decodedToken.username;
  }

  if(data.post.writer.username == commentBy) {
    isYourPost = true;
  }

  const handleSubmit = async () => {
    const id = data.post._id;
    const commentData = {
      comment: comment,
      commentBy: commentBy,
      commentAt: commentAt,
    };
    if(comment == ''){
        alert('댓글이 빈칸입니다')
        return
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
                method : "DELETE", 
            });
            window.location.href = '/board';
        } catch (error) {
          console.log(error);
        };
    };

  async function deleteComment(commentId) {
        try {
            const id = commentId;
            const postId = data.post._id
            await fetch(`${api}/comment/${id}`, {
                method : "DELETE", 
                headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ postId }),
            });
            window.location.reload();
        } catch (error) {
          console.log(error);
        };
    };

</script>

<div class="container mt-4">
  <div class="post-top">
    <a href="/board"><h2>게시판</h2></a>
    <a href="/board" type="button" class="btn btn-light btn-write">목록으로</a>
  </div>
  <div class="post-container">
    <div class="post-header mt-3">
      <h3 class="post-title">{data.post.title}</h3>
      <h6 class="writer-date mt-2">
        {data.post.writer.username}&nbsp;&nbsp;|&nbsp;&nbsp;{data.post
          .createdAt}
      </h6>
      <hr />
    </div>
    <div class="content" style="font-size: 20px; white-space: pre;">{data.post.content}</div>
    <div class="comment-counter mb-2">전체 댓글 {commentCount}개</div>
  </div>
  <div class="comment-container">
    <table class="comment-table" style="width: 100%">
      <colgroup>
        <col style="width: 15%" />
        <col style="width: 50%" />
        <col style="width: 15%" />
        <col style="width: 8%" />
      </colgroup>
      <tbody>
        {#each comments as comment}
          <tr class="comment-list">
            <th>{comment.commentBy}</th>
            <th style="white-space: pre;">{comment.comment}</th>
            <th>{comment.commentAt}</th>
            {#if comment.commentBy == commentBy}
            <th on:click={() => {
                if(confirm('정말 삭제하시겠습니까?')) {
                    deleteComment(comment._id)
                }
            }} style="text-align : right">
                <img src="../delete.png" alt="">
            </th>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="comment-form mt-3 mb-5">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="comment-box">
        <div class="comment-writer">{commentBy}</div>
        <div class="comment-right">
          <div class="input-wrap">
            <textarea bind:value={comment} class="comment-input" type="text" />
          </div>
          <div style="text-align: right;">
            <button type="submit" class="btn btn-light btn-comment">등록</button
            >
          </div>
        </div>
      </div>
    </form>
  </div>
  {#if isYourPost}
  <div class="tools-container mb-5">
    <div class="button-group">
      <a href="/write/{data.post._id}" class="btn btn-warning btn-fix">글수정</a>
      <button on:click={() => {
        if (confirm('정말 삭제하시겠습니까?')) {
            deletePost()
        }
      }} class="btn btn-danger btn-remove">글삭제</button>
    </div>
  </div>
  {/if}
</div>

<style>
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  a {
    text-decoration: none;
    color: black;
  }
  .post-container {
    width: 100%;
    margin-top: 10px;
    border-top: 2px solid #29367c;
    border-bottom: 2px solid #29367c;
  }
  .comment-container {
    border-bottom: 2px solid #29367c;
  }
  .post-top {
    display: flex;
    justify-content: space-between;
  }
  .btn-write {
    border: 2px solid black;
    margin-bottom: 5px;
  }
  .content {
    margin-bottom: 100px;
  }
  .btn-comment {
    border: 2px solid black;
    background: #5160b9;
    color: white;
    margin-top: 5px;
    margin-bottom: 15px;
  }
  .tools-container{
    margin-top: -30px;
  }
  .comment-box {
    display: flex;
  }
  .comment-writer {
    width: 200px;
  }
  .comment-input {
    width: 800px;
    height: 100px;
    padding: 0 12px;
    line-height: 35px;
    border: 1px solid #cecdce;
    color: #333;
  }
  .comment-list {
    height: 40px;
    border-bottom: 1px solid gray;
  }
  .comment-form {
    border-bottom: 2px solid #29367c;
  }
  .button-group {
    text-align: right;
    margin-top: 10px;
  }
  .btn-fix {
    margin-right: 10px;

  }
  .btn-remove {
    margin-left: 10px;

  }
  * {
    font-family: "nanumsquare";
  }
  @media only screen and (max-width: 1000px) {
    .post-container {
      width: 750px;
    }
    .comment-container {
      width: 750px;
    }
    .comment-form {
      width: 750px;
    }
    .comment-input {
    width: 600px;
    height: 100px;
    padding: 0 12px;
    line-height: 35px;
    border: 1px solid #cecdce;
    color: #333;
  }
  }
</style>
