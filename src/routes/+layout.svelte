<script>
  import jwtdecode from "jwt-decode";
  import { onMount } from "svelte";

  let username = "";
  let isLoggedIn = false;

  async function loginCheck() {
    const token = localStorage.getItem("USER");
    if (!token) {
      isLoggedIn = false;
    }
    if (token) {
      const decodedToken = jwtdecode(token);
      username = decodedToken.username;
      isLoggedIn = true;
      console.log(username);
    }
  }

  const logout = () => {
    localStorage.removeItem("USER");
    isLoggedIn = false;
    window.location.href = '/login';
  };

  onMount(() => {
    loginCheck();
  });
</script>

<div class="container">
  <nav class="navbar navbar-light bg-white">
    <a class="navbar-brand" href="/" style="color: black; font-size : 40px">
      <img class="logo-img" src="../logo.png" alt=""> 카시노키</a>
    <div class="search-container">
      <div class="input-container">
        <input class="search-input"><button class="btn btn-light search-btn">검색</button>
      </div>
    </div>
    <!--User dropdown button start-->
    {#if isLoggedIn}
      <div class="btn-group dropleft">
        <button
          type="button"
          class="btn btn-info dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          {username}
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="/mypage" style="color: black;"
            >마이페이지</a
          >
          <button on:click={logout} class="dropdown-item">로그아웃</button>
        </div>
      </div>
      <!-- User dropdown button End -->
    {:else}
      <!-- Visitor dropdown button start -->
      <div class="btn-group dropleft">
        <button
          type="button"
          class="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          누구세요
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="/login" style="color: black;">로그인</a
          >
          <a class="dropdown-item" href="/register" style="color: black;"
            >회원가입</a
          >
        </div>
      </div>
      <!-- Visitor dropdown button end -->
    {/if}
  </nav>
</div>
<div class="header">
  <div class="container">
    <div class="link-container">
      <div class="header-link">
        <a href="/">HOME</a>
      </div>
      <div class="header-link">
        <a href="/board">자유게시판</a>
      </div>
      <!-- <div class="header-link">
        <a href="/#">게시판2</a>
      </div>
      <div class="header-link">
        <a href="/#">게시판3</a>
      </div> -->
    </div>
  </div>
</div>

<slot />

<style>
  .logo-img {
    margin-bottom: 5px;
  }
  * {
    font-family: "nanumsquare";
  }
  a:not(.no-style) {
    text-decoration: none;
    color: white;
  }
  a:not(.no-style):hover {
    text-decoration: underline white;
  }
  .navbar {
    height: 100px;
    display: flex;
  }
  .navbar-brand {
    font-size: 30px;
    font-weight: bold;
  }
  .header {
    background: #3b4890;
    height: 50px;
  }
  .link-container {
    font-size: 18px;
    height: 50px;
    margin: auto;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .header-link {
    margin-left: 20px;
  }
  .search-container {
    width: 400px;
  }
  .search-input {
    width: 300px;
    height: 40px;
    padding: 0 12px;
    line-height: 35px;
    border: 4px solid #3b4890;
    color: #333;
    outline: none;
  }
  .search-btn {
    border: 2px solid #3b4890;
    margin-left: 10px;
  }
</style>
