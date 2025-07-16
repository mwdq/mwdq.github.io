fetch("/header.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("header-placeholder").innerHTML = html;
    initNavbarFeatures();
  });

function initNavbarFeatures() {
  // 自动折叠导航栏（移动端）
  window.addEventListener("scroll", function () {
    if (window.innerWidth < 992) {
      var navbarCollapse = document.querySelector(".navbar-collapse");
      var navbarToggler = document.querySelector(".navbar-toggler");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
        navbarToggler.setAttribute("aria-expanded", "false");
      }
    }
  });

  // 滚动时控制导航栏显示/隐藏
  var lastScrollTop = 0;
  var navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    var currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    if (!navbar) return;

    if (currentScroll > lastScrollTop) {
      navbar.classList.add("hide");
      navbar.classList.remove("scrolled");
    } else {
      navbar.classList.remove("hide");
      navbar.classList.add("scrolled");
    }

    if (currentScroll > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScrollTop = currentScroll;
  });

  // 菜单点击折叠处理
  var navbarCollapse = document.querySelector(".navbar-collapse");
  var navbarToggler = document.querySelector(".navbar-toggler");
  var navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");

  if (navbarCollapse && navbarToggler) {
    navbarLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
          navbarToggler.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("click", function (event) {
      var isClickInsideNavbar =
        navbarCollapse.contains(event.target) ||
        navbarToggler.contains(event.target);

      if (!isClickInsideNavbar && navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
        navbarToggler.setAttribute("aria-expanded", "false");
      }
    });
  }
}

// 在文档加载完毕后执行
$(document).ready(function () {
  $(".zoom-effect").zoom({
    on: "mouseover",
    magnify: 2,
    lens: true,
  });

  // 获取所有缩略图元素
  var thumbnails = $(".product-thumbnails .img-thumbnail");
  // 获取主图元素
  var mainImage = $(".zoom-effect img");

  // 定义当前显示的缩略图索引
  var currentIndex = 0;

  // 自动轮播间隔时间（单位：毫秒）
  var interval = 3000;
  var autoSlideTimer; // 用于存储自动轮播的定时器

  // 自动轮播函数
  function autoSlide() {
    thumbnails.removeClass("active"); // 移除所有缩略图的 active 类
    thumbnails.eq(currentIndex).addClass("active"); // 添加当前缩略图的 active 类
    mainImage.attr("src", thumbnails.eq(currentIndex).attr("src")); // 更新主图
    // 重新初始化放大镜效果
    $(".zoom-effect").zoom({
      on: "mouseover",
      magnify: 2,
      lens: true,
    });
    currentIndex = (currentIndex + 1) % thumbnails.length; // 更新索引，循环播放
    autoSlideTimer = setTimeout(autoSlide, interval); // 设置下一个自动轮播
  }

  // 开始自动轮播
  autoSlide();

  // 鼠标悬停在主图上时，暂停自动轮播
  $(".zoom-effect").on("mouseenter", function () {
    clearTimeout(autoSlideTimer); // 清除自动轮播定时器
  });

  // 鼠标离开主图时，恢复自动轮播
  $(".zoom-effect").on("mouseleave", function () {
    autoSlide(); // 重新开始自动轮播
  });

  // 手动切换函数
  thumbnails.on("click", function () {
    thumbnails.removeClass("active"); // 移除所有缩略图的 active 类
    $(this).addClass("active"); // 添加当前缩略图的 active 类
    mainImage.attr("src", $(this).attr("src")); // 更新主图为点击的缩略图
    // 重新初始化放大镜效果
    $(".zoom-effect").zoom({
      on: "mouseover",
      magnify: 2,
      lens: true,
    });
    currentIndex = thumbnails.index(this); // 更新索引为当前点击的缩略图索引
  });
});

fetch("/footer.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("footer-placeholder").innerHTML = html;
    initFooterParticles();

    // Scroll to top functionality
    document
      .getElementById("back-to-top")
      .addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    // Show/hide back-to-top button
    $(window).scroll(function () {
      if ($(this).scrollTop() > 1500) {
        $(".back-to-top").fadeIn();
      } else {
        $(".back-to-top").fadeOut();
      }
    });
  });

function initFooterParticles() {
  const canvas = document.getElementById("footer-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];

  canvas.width = window.innerWidth;
  canvas.height = document.querySelector(".footer").offsetHeight;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".footer").offsetHeight;
    init();
  });
}
