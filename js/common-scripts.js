
(function($){
	$(function(){



        // Phone nav click function
        $('.hamburger').click(function () {
            $("body").toggleClass("navShown");
            $(".nav-wrap").fadeToggle()
        });

        if ($(window).width() < 767) {
            $('.brand-item-wrap').marquee({
                direction: 'left',
                speed: 60,
                gap: 50,
                delayBeforeStart: 0,
                duplicated: true,
                startVisible: true
            });
        }
		

          $(".accordion-item").each(function () {
            var $this = $(this);
            $this.find(" > h5").on("click touch", function () {
                $(".accordion-item").removeClass("active")
                $(".accordion-item .accordion-content").slideUp();
                if ($this.find(".accordion-content:visible").length) {
                    $(".accordion-item").removeClass("active")
                    $(".accordion-item.accordion-content").slideUp();
                } else {
                    $this.addClass("active")
                    $(".accordion-item .accordion-content").slideUp();
                    $this.find(" > .accordion-content").slideDown();
                }
            })
          })



if ($('.slider-logo').length) {
    $('.slider-logo').slick({
        speed: 5000,
        autoplay: true,
        autoplaySpeed: 0,
        centerMode: false,
        swipe: false,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: true,
        initialSlide: 1,
        arrows: false,
        buttons: false,
        pauseOnHover: false,
    });
}



var vikingShip = document.getElementById('viking-ship');
var alreadyAnimated = false;

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;
  var windowHeight = window.innerHeight;
  var vikingShipPosition = vikingShip.getBoundingClientRect().top;

  // Calculate the distance of the viking ship from the bottom of the viewport
  var distanceFromBottom = windowHeight - vikingShipPosition;

  // Check if the viking ship is in the viewport and the animation has not already been applied
  if (distanceFromBottom > 0 && distanceFromBottom < windowHeight && !alreadyAnimated) {
    alreadyAnimated = true; // Set the flag to indicate that the animation has been applied

    // Apply the pop-up effect
    vikingShip.style.opacity = 1;
    vikingShip.style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';

    // Remove the scroll event listener to prevent further animations
    window.removeEventListener('scroll', scrollHandler);
  }
});








$('.video-container').mouseenter(function(){
    $('.play-button').fadeIn();
})
$('.video-container').mouseleave(function(){
    $('.play-button').fadeOut();
})


gsap.set(".play-button", {
    xPercent: -50,
    yPercent: -50
});

const ball = document.querySelector(".play-button");
const pos = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};
const mouse = {
    x: pos.x,
    y: pos.y
};

const speed = 0.35;
var active = false;

const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

gsap.ticker.add(cursor)

function cursor() {
    if (!active) {
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSet(pos.x);
        ySet(pos.y);
    }
}


$('.video-container').mouseenter(function(){
    $('.play-button').fadeIn();
    // Hide default mouse cursor
    document.body.style.cursor = 'none';
});

$('.video-container').mouseleave(function(){
    $('.play-button').fadeOut();
    // Show default mouse cursor
    document.body.style.cursor = 'auto';
});


// Show the first tab by default
$('.stage-items').hide();
$('.stage-items:first').show();
$('.button-nav li:first').addClass('tab-active');

// Change tab class and display content
$('.button-nav a').on('click', function(event){
  event.preventDefault();
  $('.button-nav li').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.stage-items').hide();
  $($(this).attr('href')).show();
});



if ($('.customer-slider').length) {
    $('.customer-slider').slick({
        autoplay: false,
        slidesToShow:4, 
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: true,
        centerMode: false, 
       
        responsive: [
            {
                breakpoint: 991, 
                settings: {
                    slidesToShow: 1, 
                    centerMode: false,
                    dots: true,
                  
                }
            }
        ]
    });
    $(window).on('resize', function () {
        $('.customer-slider').slick('resize');
    });
}





	})// End ready function.

	
// Function to check if an element is in the viewport
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll animation
function handleScrollAnimation() {
    var splittingElements = document.querySelectorAll('.spliting');
    splittingElements.forEach(function (element) {
        if (isInViewport(element)) {
            element.classList.add('active');
        }
    });
}

// Initial check on page load
handleScrollAnimation();

// Listen for scroll events
window.addEventListener('scroll', function () {
    handleScrollAnimation();
});




// Function to handle the animation when an element comes into view
function animateOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const headingElement = entry.target;
            const text = headingElement.textContent.trim();
            headingElement.textContent = '';
            const words = text.split(/\s+/); // Split by whitespace
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + ' '; // Add space to separate words
                span.classList.add('current-word');
                headingElement.appendChild(span);
                setTimeout(() => {
                    span.classList.add('animate');
                }, index * 300);
            });
            observer.unobserve(entry.target); // Stop observing once animation is applied to the element
        }
    });
}

// Create a new IntersectionObserver
const observer = new IntersectionObserver(animateOnScroll, {
    root: null, // Use the viewport as the root
    threshold: 0.5 // Trigger the animation when 50% of the element is visible
});

// Get all elements with the class 'text-anim' and observe each one
const headingElements = document.querySelectorAll('.text-anim');
headingElements.forEach(element => {
    observer.observe(element);
});




document.addEventListener("DOMContentLoaded", function() {
    var menuItem = document.querySelector(".menu-item");
    var dropMenu = document.querySelector(".drop-menu");

    menuItem.addEventListener("click", function() {
        dropMenu.classList.toggle("open");
    });
});








// drag


window.onscroll = function () {
    var header = document.querySelector("header");
    if (window.pageYOffset > 0) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };









})(jQuery)

