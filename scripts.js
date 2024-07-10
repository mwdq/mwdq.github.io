// Automatically close navbar collapse when scrolling down on mobile
window.addEventListener("scroll", function () {
  if (window.innerWidth < 992) {
    var navbarCollapse = document.querySelector(".navbar-collapse");
    var navbarToggler = document.querySelector(".navbar-toggler");
    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
      navbarToggler.setAttribute("aria-expanded", "false");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var lastScrollTop = 0;
  var navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    var currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Scroll down
      navbar.classList.add("hide");
      navbar.classList.remove("scrolled");
    } else {
      // Scroll up
      navbar.classList.remove("hide");
      navbar.classList.add("scrolled");
    }
    // Add class to change background color when scrolled
    if (currentScroll <= 0) {
      navbar.classList.remove("scrolled");
    }
    lastScrollTop = currentScroll;
  });
});

// Show/hide back-to-top button
$(window).scroll(function () {
  if ($(this).scrollTop() > 1500) {
    $(".back-to-top").fadeIn();
  } else {
    $(".back-to-top").fadeOut();
  }
});

// Smooth scroll to top
function scrollToTop() {
  $("html, body").animate({ scrollTop: 0 }, 600);
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