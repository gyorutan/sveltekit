<script>
  const api = "https://port-0-sveltekit-server-1093j2alg73daic.sel3.cloudtype.app";
  import jwtdecode from "jwt-decode";

  let username = "";
  let title = "";
  let content = "";
  let userId = "";
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
  let createdAt = date.toLocaleString("ko-KR", options);

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("USER");
    if (!token) {
      alert("ログインが必要です");
      window.location.href = "/";
    }
    const decodedToken = jwtdecode(token);
    userId = decodedToken.userId;
    username = decodedToken.username;
  }

  const handleSubmit = async () => {
    const postData = {
      title: title,
      content: content,
      userId: userId,
      createdAt: createdAt,
    };
    if ((title == "") & (content == "")) {
      alert("空欄があります");
      return;
    }
    const response = await fetch(`${api}/write`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    await response.json();
    window.location.href = "/board";
  };
</script>

<div class="container mt-4 mb-4">
  <div class="main-text">
    <h2>新しい投稿</h2>
  </div>
  <hr />
  <div class="write-bg">
    <div class="write-item">
      <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-3">投稿者　:　{username}</div>
        <input
          bind:value={title}
          class="write-input mt-3"
          type="text"
          placeholder="タイトル"
        />
        <input
          bind:value={content}
          class="write-input mt-4"
          type="text"
          placeholder="内容"
        />
        <div class="mt-5" style="text-align: center;">
          <button type="submit" class="btn btn-secondary">提出</button>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  * {
    font-family: "Noto Sans JP", sans-serif;
  }
  .main-text {
    font-size: 25px;
  }
  .write-bg {
    background: rgb(255, 255, 255);
    padding: 10px;
  }
  .write-item {
    background: white;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    box-shadow: rgb(112, 112, 112) 0px 2px 4px 0px;
  }
  .write-input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    border-bottom: 2px solid black;
  }
  /* @media only screen and (max-width: 540px) {
  } */
</style>
