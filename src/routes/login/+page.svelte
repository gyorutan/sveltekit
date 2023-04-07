<script>

  let loginId = "";
  let loginPw = "";

  const handleSubmit = async () => {
    const loginData = {
      loginId: loginId,
      loginPw: loginPw,
    };

    const api = "https://port-0-sveltekit-server-1093j2alg73daic.sel3.cloudtype.app";

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
      alert("로그인 성공!");
      window.location.href = "/";
    } else {
      alert("로그인에 실패했습니다. 다시 시도해 주세요");
    }
  };
</script>

<div class="container">
  <div class="card shadow" style="width: 400px; margin-top: 80px;">
    <div class="card-body">
      <h4 class="mb-2" style="font-weight: bold">로그인</h4>
      <hr />
      <form on:submit|preventDefault={handleSubmit}>
        <div style="text-align : center">
          <div class="form-group mt-3">
            <label
              style="font-size : 20px; font-weight: bold"
              for="loginId"
              class="mt-3">Login ID</label
            ><br />
            <input type="text" class="idinput mt-1" bind:value={loginId} />
          </div>
          <div class="form-group mt-3">
            <label style="font-size : 20px; font-weight: bold" for="loginPw"
              >Password</label
            ><br />
            <input
              type="password"
              class="pwinput mt-1 mb-4"
              bind:value={loginPw}
            />
          </div>
        </div>
        <hr />
        <div class="submitbtn">
          <button
            type="submit"
            class="btn btn-dark mt-3"
            style="font-weight: bold">로그인</button
          >
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  * {
    font-family: "nanumsquare";
  }
  .card {
    margin: auto;
  }
  .submitbtn {
    text-align: right;
  }
  .idinput {
    width: 200px;
    height: 33px;
    padding: 0 12px;
    line-height: 35px;
    border: 1px solid #cecdce;
    color: #333;
  }
  .pwinput {
    width: 200px;
    height: 33px;
    padding: 0 12px;
    line-height: 35px;
    border: 1px solid #cecdce;
    color: #333;
  }
</style>
