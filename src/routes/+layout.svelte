<script>
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
    <div></div>
  </nav>
</div>
<div class="header">
  <div class="container">
    <div class="link-container">
      <div class="header-link">
        <a href="/">홈으로</a>
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
    margin-right: 200px;
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
