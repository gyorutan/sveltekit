<script>
  import jwtdecode from "jwt-decode";
  import { onMount } from "svelte";

  let username = "";
  let userId = "";
  let isLoggedIn = false;

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

  async function logout() {
    localStorage.removeItem("USER");
    isLoggedIn = false;
    window.location.href = "/login";
  }

  onMount(() => {
    loginCheck();
  });
</script>

<div class="container">
  <nav class="navbar navbar-light bg-white">
    <a class="navbar-brand" href="/" style="color: black; font-size : 40px">
      Kasinoki</a
    >
    <!-- Dropleft Menu -->
    <div class="btn-group dropleft">
      {#if !isLoggedIn}
        <button
          type="button"
          class="btn btn-outline-dark dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <img class="userx-img" src="../userx.png" alt="" />
        </button>
        <div class="dropdown-menu">
          <a
            style="color: black; text-decoration: none;"
            href="/login"
            class="dropdown-item"
          >
            ログイン
          </a>
          <a
            style="color: black; text-decoration: none;"
            href="/register"
            class="dropdown-item"
          >
            新規登録
          </a>
        </div>
      {:else}
        <button
          style="color:black; font-weight: bold;"
          type="button"
          class="btn btn-outline-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <img class="user-img" src="../user.png" alt="" />
          {username}
        </button>
        <div class="dropdown-menu">
          <a
            style="color: black; text-decoration: none;"
            href="/user/{userId}"
            class="dropdown-item"
          >
            プロフィール
          </a>
          <button on:click={logout} class="dropdown-item"> ログアウト </button>
        </div>
      {/if}
    </div>
  </nav>
</div>
<div class="container header">
  <div class="container">
    <div class="link-container">
      <div class="header-link">
        <a href="/">Main</a>
      </div>
      <div class="header-link">
        <a href="/board">掲示板</a>
      </div>
      <div class="header-link">
        <a href="/board/bandoren">バンド練習</a>
      </div>
      <div class="header-link">
        <a href="/board/live">ライブ日程</a>
      </div>
    </div>
  </div>
</div>

<slot />

<style>
  .userx-img {
    width: 30px;
    height: 30px;
  }
  .user-img {
    width: 30px;
    height: 30px;
  }
  * {
    font-family: "Noto Sans JP", sans-serif;
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
    background: gray;
    height: 50px;
  }
  .link-container {
    font-size: 18px;
    height: 50px;
    margin: auto;
    display: flex;
    align-items: center;
    gap: 30px;
  }

  /* @media only screen and (max-width: 1000px) {

  } */
</style>
