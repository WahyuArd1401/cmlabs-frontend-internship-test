<template>
  <div>
    <header>
      <h1 class="logo">mealapp</h1>
      <nav class="nav-list">
        <a href="#">Home</a>
        <a href="#">Foods</a>
        <a href="#">Ingredients</a>
        <a href="#">Local Culinary</a>
      </nav>
      <button class="btn-list"><i class="bi bi-list"></i></button>
    </header>
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 40px;
  height: 10vh;
  border-bottom: 1px solid rgba(0,0,0,0.3);
}

.nav-list {
  display: flex;
  gap: 30px;
}

.nav-list a {
  text-decoration: none;
  color: #000;
  font-size: 0.9rem;
  position: relative;
  padding: 24px 0;
}

.nav-list a::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background-color: #000;
  transition: width 0.3s ease;
}

.nav-list a:hover::before {
  width: 100%;
}

.nav-list a:active {
  color: #bfcfe7;
}

.logo {
  font-size: 1.5rem;
}

.btn-list {
  display: none;
  background-color: transparent;
  border: none;
}

@media screen and (max-width: 630px) {
  .nav-list {
    display: none;
  }

  .btn-list {
    display: block;
    font-size: 2rem;
  } 
  
}
</style>