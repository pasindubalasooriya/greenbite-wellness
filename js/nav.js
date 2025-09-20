function openMenu() {
  var x = document.getElementById("nav-menu");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
