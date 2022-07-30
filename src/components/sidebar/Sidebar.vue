<template>
  <nav class="d-none d-md-block bg-light sidebar">
    <div class="d-flex justify-content-center logo mt-4" @click="$router.push('/')">
      <img src="@/components/library/getting-started/catly-logo.png" width="140" height="39" alt="Catly logo" />
    </div>
    <div class="sidebar-sticky px-4">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/" exact exact-active-class="active" class="nav-link">Reporting</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/search" class="nav-link">Search</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/events" class="nav-link">Events</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/deployments" class="nav-link">Deployments</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
$logo-height: 70px;

.sidebar {
  box-shadow: inset -1px 0 0 rgba($nav-color, 0.1);
  font-size: 1.05rem;
}

.logo {
  height: $logo-height;
  cursor: pointer;
}

.sidebar-sticky {
  position: relative;
  width: 17rem;
  height: calc(100vh - #{$logo-height});
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: $nav-color;
}

.sidebar .nav-link.active {
  color: $primary;
  background-color: $gray-200;
  border-radius: $border-radius-lg;
}
</style>
