<script>
  const api = "https://port-0-sveltekit-server-1093j2alg73daic.sel3.cloudtype.app";

  let loginId = "";
  let loginPw = "";

  const login = async () => {
    const loginData = {
      loginId: loginId,
      loginPw: loginPw,
    };

    if (loginId == "") {
      alert("LoginIDを入力してください");
      return;
    }

    if (loginPw == "") {
      alert("Passwordを入力してください");
      return;
    }

    const response = await fetch(`${api}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    // console.log(loginData);
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("USER", data.token);
      alert("ログインに成功しました");
      loginId = "";
      loginPw = "";
      window.location.href = "/";
    } else {
      alert("ログインに失敗しました");
      loginId = "";
      loginPw = "";
    }
  };
</script>

<div class="container">
  <div class="card shadow" style="width: 400px">
    <div class="card-body">
      <h4 style="font-weight: bold">ログイン</h4>
      <hr />
      <form on:submit|preventDefault={login}>
        <div style="text-align : center">
          <div class="form-group mt-3">
            <label for="loginId" style="font-size : 20px; font-weight: bold;"
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
    font-family: "Noto Sans JP", sans-serif;
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
