<script>
  import { onMount } from "svelte";

  const api = "https://port-0-sveltekit-server-1093j2alg73daic.sel3.cloudtype.app";

  let data = [];

  const getPosts = async function () {
    try {

      const response = await fetch(`${api}/getboard`);
      data = await response.json();

    } catch (error) {
      console.log(error);
    }
  };

  onMount(() => {
    getPosts();
  });
</script>

<div class="container mt-4">
  <div class="main-text">
    <p>자유게시판</p>
  </div>
  <div class="write-link">
    <a href="/write" class="btn btn-light btn-write">글쓰기</a>
  </div>
    <div class="table-container">
    <table style="width: 100%">
      <colgroup>
        <col style="width: 10%" />
        <col style="width: 55%" />
        <col style="width: 10%" />
        <col style="width: 25%" />
      </colgroup>
      <thead class="thead-item">
        <tr class="col-colgroup">
          <th scope="col">번호</th>
          <th scope="col">글제목</th>
          <th scope="col">글쓴이</th>
          <th style="text-align: center;" scope="col">작성일</th>
        </tr>
      </thead>
      <tbody>
        {#each data as post}
          <tr class="post-list">
            <th>{post.postNumber}</th>
            <th><a href="/board/{post._id}" style="white-space: pre;" >{post.title}</a></th>
            <th>{post.writer.username}</th>
            <th style="text-align: center;" >{post.createdAt}</th>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  a {
    color: black;
  }
  .main-text {
    font-size: 25px;
  }
  .thead-item {
    height: 40px;
    border-bottom: 1px solid #29367c;
  }
  .table-container {
    width: 100%;
    margin-top: 10px;
    border-top: 2px solid #29367c;
    border-bottom: 2px solid #29367c;
  }
  .write-link {
    text-align: right;
  }
  .btn-write {
    border: 1px solid #29367c;
  }
  .post-list {
    height: 40px;
    border-bottom: 1px solid gray;
  }
  * {
    font-family: "nanumsquare";
  }
</style>
