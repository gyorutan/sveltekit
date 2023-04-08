<script>
  import jwtdecode from "jwt-decode";
  import { onMount } from "svelte";

  const api = "https://port-0-sveltekit-server-1093j2alg73daic.sel3.cloudtype.app";

  let username = "";
  let userId = "";
  let isLoggedIn = false;

  let loginId = "";
  let loginPw = "";


  async function loginCheck() {
    const token = localStorage.getItem("USER");
    if (!token) {
      isLoggedIn = false;
    }
    if (token) {
      const decodedToken = jwtdecode(token);
      username = decodedToken.username;
      userId = decodedToken.userId;
      isLoggedIn = true;
      console.log(username);
      console.log(userId);
    }
  }

  const login = async () => {
    const loginData = {
      loginId: loginId,
      loginPw: loginPw,
    };

    if(loginId == "") {
      alert('아이디를 입력해주세요');
      return
    };

    if(loginPw == "") {
      alert('비밀번호를 입력해주세요');
      return
    };

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
      loginId = ""
      loginPw = ""
      loginCheck();
    } else {
      alert("로그인에 실패했습니다. 다시 시도해 주세요");
      loginId = ""
      loginPw = ""
    }
  };


  const logout = () => {
    localStorage.removeItem("USER");
    isLoggedIn = false;
  };

  onMount(() => {
    loginCheck();
  });
</script>


<div class="container">
  <div class="home-container">
    <div class="container-left">
      
      <div class="jumbotron jumbotron-fluid">
        <div class="main-text">
          <h3 class="ml-3">카시노키 홈페이지</h3>
          <p class="lead ml-3">우리들의 추억 저장소 카시노키</p>
        </div>
      </div>
      <div class="home-content">
        <h4>
          인기글
        </h4>
        <p>개발중</p>
      </div>
    </div>
    <div class="container-right">
      {#if !isLoggedIn}
      <div class="login-wrap">
        <div class="login-inr">
          <form on:submit|preventDefault={login}>
            <input bind:value={loginId} class="input-box-id" type="text" placeholder="아이디"/>
            <input bind:value={loginPw} class="input-box-pw" type="password" placeholder="비밀번호"/>
            <button type="submit" class="btn btn-light login-btn"
              >로그인</button
            >
          </form>
          <hr />
          <div>아직 회원이 아니에요 ▶<a href="/register" class="btn signup-btn">회원가입</a></div>
        </div>
      </div>
      {:else}
      <div class="login-wrap">
        <div class="login-inr">
          <div>
            <p>환영합니다 { username }님!</p>
            <a href="/mypost" class="btn btn-light btn-mypost">내 글</a>
            <a href="/user/1" class="btn btn-light btn-user">내 정보</a>
          </div>
          <hr />
          <div class="logout"><button on:click={logout} class="btn btn-light logout-btn">로그아웃</button></div>
        </div>
      </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .jumbotron {
    height: 180px;
  }
  .home-container {
    display: flex;
    /* width: 100%;
    margin-top: 10px;
    border-top: 2px solid #29367c;
    border-bottom: 2px solid #29367c; */
  }
  .container-left {
    margin-top: 15px;
    width: 70%;
  }
  .container-right {
    width: 30%;
  }
  .login-wrap {
    margin: 15px 15px 15px 15px;
    width: 300px;
    height: 180px;
    border: 1px solid #29367c;
    color: #333;
  }
  .login-inr {
    margin: 20px 20px 20px 20px;
  }
  .login-btn {
    margin-left: 15px;
    border: 1px solid #29367c;
  }
  .signup-btn {
    text-align: right;
    color: blue;
  }
  .input-box-id {
    width: 140px;
    height: 37px;
    background: rgb(232, 232, 232);
    border: none;
  }
  .input-box-pw {
    width: 140px;
    height: 37px;
    margin-top: 5px;
    background: rgb(232, 232, 232);
    border: none;
  }
  .btn-mypost {
    border: 1px solid #29367c;
  }
  .btn-user {
    border: 1px solid #29367c;
    margin-left: 10px;
  }
  .logout-btn {
    border: 1px solid #29367c;
  }
  .logout {
    text-align: right;
  }
  * {
    font-family: "nanumsquare";
  }
</style>
