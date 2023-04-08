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
        alert('사용가능한 닉네임 입니다')
        checkedUsername = duplication.username
      } else {
        alert('이미 사용중인 닉네임 입니다')
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
      alert('닉네임을 입력해주세요');
      return
    };

    if(loginId == "") {
      alert('아이디를 입력해주세요');
      return
    };

    if(loginPw == "") {
      alert('비밀번호를 입력해주세요');
      return
    };

    if(username != checkedUsername){
      alert('중복검사를 해주세요');
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
      alert("회원가입 성공!");
      window.location.href = "/";
    } else {
      alert("회원가입에 실패했습니다");
      {username = "", loginId = "", loginPw = ""}
    }
  };
</script>

<div class="container">
  <div class="card shadow" style="width: 400px">
    <div class="card-body">
      <h4 class="">회원가입</h4>
      <hr />
      <form on:submit|preventDefault={handleSubmit}>
        <div style="text-align : center">
          <div class="form-group mt-1">
            <label
              for="nickname"
              style="font-size : 20px; font-weight: bold"
              class="mt-1">닉네임</label
            ><br />
            <input
              type="text"
              class="input mt-1"
              id="nickname"
              bind:value={username}
            /><br />
            <button on:click={checkUsername} type="button" class="btn btn-outline-danger mt-2">
              중복확인
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
          <button type="submit" class="btn btn-primary"> 회원가입 </button>
        </div>
      </form>
      <div />
    </div>
  </div>
</div>

<style>
  * {
    font-family: "nanumsquare";
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
