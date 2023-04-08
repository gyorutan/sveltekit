<script>
    import jwtdecode from "jwt-decode";
  
    const api = "https://port-0-sveltekit-server-1093j2alg73daic.sel3.cloudtype.app";

    export let data
    console.log(data);

    let username = "";
    let title = data.post.title;
    let content = data.post.content;
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
  
    console.log(createdAt);
    console.log(title);
  
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("USER");
      if (!token) {
        window.location.href = "/login";
      }
      const decodedToken = jwtdecode(token);
      userId = decodedToken.userId;
      username = decodedToken.username;
    }
  
    const handleSubmit = async () => {
      const id = data.post._id;
      const postData = {
        title: title,
        content: content,
      };
      if(title == '' & content == ''){
        alert('빈칸을 채워주세요')
        return
      }
      const response = await fetch(`${api}/write/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      await response.json();
      alert('게시글이 수정되었습니다');
      window.location.href = "/board";
    };
  </script>
  
  <div class="container mt-4">
    <a href="/board"><h2 class="board">게시글 수정</h2></a>
    <div class="box-container">
      <div class="form-container">
        <form on:submit|preventDefault={handleSubmit} class="form">
          <div class="form-author">글쓴이 : {username}</div>
          <div class="form-title">
            <input
              bind:value={title}
              class="title"
              type="text"
              placeholder="제목을 입력해 주세요"
            />
          </div>
          <div class="form-content">
            <textarea
              bind:value={content}
              class="content"
              type="text"
              placeholder="내용을 입력해 주세요"
            />
          </div>
          <div class="button-group">
            <a href="/board" class="btn btn-danger btn-cancel">취소</a>
            <button type="submit" class="btn btn-primary btn-submit">등록</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  <style>
    * {
      font-family: "nanumsquare";
    }
    a {
      text-decoration: none;
      color: black;
    }
    .box-container {
      margin-top: 20px;
      border-top: 2px solid #29367c;
      border-left: 1px solid gray;
      border-right: 1px solid gray;
      border-bottom: 1px solid gray;
    }
    .form-container {
      margin: 40px;
    }
    .form-author {
      font-size: 17px;
      padding: 0 5px;
    }
    .form-title {
      margin-top: 20px;
    }
    .form-content {
      margin-top: 20px;
    }
    .title {
      width: 300px;
      height: 33px;
      padding: 0 12px;
      line-height: 35px;
      border: 1px solid #cecdce;
      color: #333;
    }
    .content {
      width: 600px;
      height: 300px;
      padding: 0 12px;
      line-height: 35px;
      border: 1px solid #cecdce;
      color: #333;
    }
    .button-group {
      margin-top: 20px;
      text-align: right;
    }
    .btn-submit {
      margin-left: 10px;
      color: #000;
    }
  
    @media only screen and (max-width: 540px) {
    }
  </style>
  