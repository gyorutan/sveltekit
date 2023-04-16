<script>
  const api = "https://port-0-sveltekit-server-1093j2alg73daic.sel3.cloudtype.app";

  let date = new Date();

  let username = "";
  let loginId = "";
  let loginPw = "";
  let createdAt = new Intl.DateTimeFormat('kr', { dateStyle : 'full', timeStyle : 'medium' }).format(date);
  let checkedUsername = ""

  // console.log(createdAt)

  const checkUsername = async () => {
    if(username == "") {
      alert('닉네임을 입력해주세요')
      return
    }

    try {
      const response = await fetch(`${api}/checkusername`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ username }),
      });
      const duplication = await response.json();

      console.log(duplication.success)
      if (duplication.success) {
        alert('使用可能なハンドルネームです')
        checkedUsername = duplication.username
      } else {
        alert('既に存在するハンドルネームです')
        { username = "" }
      };
    } catch (error) {
      console.log(error);
    };
  };

  const handleSubmit = async () => {
    const registerData = {
      username: username,
      loginId: loginId,
      loginPw: loginPw,
      createdAt: createdAt
    };

    if(username == "") {
      alert('ハンドルネームを入力してください');
      return
    };

    if(loginId == "") {
      alert('ログインIDを入力してください');
      return
    };

    if(loginPw == "") {
      alert('Passwordを入力してください');
      return
    };

    if(username != checkedUsername){
      alert('重複確認をしてください');
      return
    };

    const response = await fetch(`${api}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    // console.log(registerData);
    const data = await response.json();
    // console.log(data.success);
    if (data.success) {
      alert("新規登録を完了しました");
      window.location.href = "/login";
    } else {
      alert("新規登録に失敗しました");
      {username = "", loginId = "", loginPw = ""}
    }
  };
</script>

<div class="container">
  <div class="card shadow" style="width: 400px">
    <div class="card-body">
      <h4 style="font-weight: bold">新規登録</h4>
      <hr />
      <form on:submit|preventDefault={handleSubmit}>
        <div style="text-align : center">
          <div class="form-group mt-1">
            <label
              for="nickname"
              style="font-size : 20px; font-weight: bold"
              class="mt-1">ハンドルネーム</label
            ><br />
            <input
              type="text"
              class="input mt-1"
              id="nickname"
              bind:value={username}
            /><br />
            <button on:click={checkUsername} type="button" class="btn btn-outline-danger mt-2">
              重複確認
            </button>
          </div>
          <div class="form-group mt-3">
            <label for="loginId" style="font-size : 20px; font-weight: bold"
              >Login ID</label
            ><br />
            <input
              type="text"
              class="input mt-1"
              id="loginId"
              bind:value={loginId}
            />
          </div>
          <div class="mt-3">
            <label for="loginPw" style="font-size : 20px; font-weight: bold"
              >Password</label
            ><br />
            <input type="password" class="input mt-1" bind:value={loginPw} />
          </div>
        </div>
        <hr />
        <div class="submitbtn">
          <button type="submit" class="btn btn-secondary"> OK </button>
        </div>
      </form>
      <div />
    </div>
  </div>
</div>

<style>
  * {
    font-family: 'Noto Sans JP', sans-serif;
  }
  .card {
    margin: auto;
    padding: 10px;
    margin-top: 30px;
  }
  .submitbtn {
    text-align: right;
  }
  .input {
    width: 200px;
    height: 33px;
    padding: 0 12px;
    line-height: 35px;
    border: 1px solid #cecdce;
    color: #333;
  }
</style>
