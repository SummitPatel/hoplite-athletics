/* Simple jQuery Equal Heights @version 1.5.1. Copyright (c) 2013 Matt Banks. Dual licensed under the MIT and GPL licenses. */
!function(a){a.fn.equalHeights=function(){var b=0,c=a(this);return c.each(function(){var c=a(this).innerHeight();c>b&&(b=c)}),c.css("height",b)},a("[data-equal]").each(function(){var b=a(this),c=b.data("equal");b.find(c).equalHeights()})}(jQuery);

/* Run function after window resize */
var afterResize=(function(){var t={};return function(callback,ms,uniqueId){if(!uniqueId){uniqueId='Don\'t call this twice without a uniqueId';}if(t[uniqueId]){clearTimeout(t[uniqueId]);}t[uniqueId]=setTimeout(callback,ms);};})();

window.theme = window.theme || {};

theme.cacheSelectors = function () {
  theme.cache = {
    // General
    $w: $(window),
    $body: $('body'),

    // Mobile Nav
    $mobileNavTrigger: $('.mobile-nav-trigger'),
    $mobileNav: $('#MobileNav'),
    $mobileSublistTrigger: $('.mobile-nav__sublist-trigger'),

    // Equal height elements
    $productGridImages: $('.grid-link__image--product'),
    $featuredGridImages: $('.grid-link__image--collection'),

    // Product page
    $productImage: $('#ProductPhotoImg'),
    $productImageGallery: $('.gallery__item'),
    $measuringTapeCover: $('.measuring-tape-cover'),
    $compressionCover: $('.compression-101 blood-flow'),
    $dropDownChevron: $('.dropdown-chevron'),
    $heroDropDownWrapper: $('.hero-dropdown-wrapper'),
    $ShopNowHeroBtn: $('.shop-now-hero-btn'),
    $swatchesContainer: $('.swatches-container'),
    $swatchElement: $('.swatch-element'),
    $selectedSwatchColor: $('.selected-swatch-color'),

    // Cart Page
    cartNoteAdd: '.cart__note-add',
    cartNote: '.cart__note',

    //Navigation
    $hasDropdownItem: $('.site-nav--has-dropdown'),
    $siteHeader: $('.site-header')
  };
};

timber.cacheVariables = function () {
  timber.vars = {
    isTouch: timber.cache.$html.hasClass('supports-touch')
  };
};

theme.init = function () {
  theme.cacheSelectors();
  timber.cacheVariables();
  theme.mobileNav();
  theme.equalHeights();
  theme.cartPage();
  theme.toggleMenu();
  theme.fixedHeader();
  theme.slideCover();
  theme.slideCompressionCover();
  theme.heroScroll();
  theme.displaySwatchColor();

  
  theme.productImageGallery();
  
};

theme.displaySwatchColor = function () {
  theme.cache.$swatchElement.on('click', function () {
    var el = $(this);
    if(el.hasClass('soldout')) {
      return;
    }
    else {
      var color = el.attr('class').split(' ')[2];
      color = color.split('-').join(' ');

      theme.cache.$selectedSwatchColor.text(color);
    }
  });
};

theme.heroScroll = function () {
  theme.cache.$heroDropDownWrapper.on('click', function () {
    var el = $(this).parents('.grid__item').siblings('.grid__item');
    theme.cache.$body.animate({
      scrollTop: el.offset().top
    }, 2000);
  });

  theme.cache.$ShopNowHeroBtn.on('click', function () {
    theme.cache.$body.animate({
      scrollTop: $('.product-single').offset().top
    }, 2000);
  });
};

theme.slideCover = function () {
  $('.measuring-tape-cover-btn').on('click', function (e) {
    e.preventDefault();
    theme.cache.$measuringTapeCover.animate({ 
      left: -2*theme.cache.$measuringTapeCover.outerWidth()
    }, 800);
  });

  $('.measuring-tape-back-btn').on('click', function (e) {
    e.preventDefault();
    theme.cache.$measuringTapeCover.animate({ left: 0 }, 600);
  });
};

theme.slideCompressionCover = function () {
  $('.dropdown-chevron').on('click', function (e) {
    e.preventDefault();
    theme.cache.$measuringTapeCover.animate({ 
      left: -2*theme.cache.$measuringTapeCover.outerWidth()
    }, 800);
  });

  $('.dropdown-chevron').on('click', function (e) {
    e.preventDefault();
    theme.cache.$measuringTapeCover.animate({ left: 0 }, 600);
  });
};

theme.fixedHeader = function () {
  // check if the user is already scrolled down on page refresh
  if(theme.cache.$w.scrollTop() >= 36) {
    theme.cache.$siteHeader.addClass('fixed-header');
  } else {
    theme.cache.$siteHeader.removeClass('fixed-header');
  };
  
  // call on scroll
  theme.cache.$w.scroll(function() {
    if(theme.cache.$w.scrollTop() >= 36) {
      theme.cache.$siteHeader.addClass('fixed-header');
    } else {
      theme.cache.$siteHeader.removeClass('fixed-header');
    }
  });
};

theme.mobileNav = function () {
  theme.cache.$mobileNavTrigger.on('click', function() {
    theme.cache.$mobileNav.slideToggle(220);
    $('#MobileNavTriggerHamburgerIcon').toggleClass('small--hide');
  });

  theme.cache.$mobileSublistTrigger.on('click', function(evt) {
    var $el = $(this);

    // Enable commented out if statement to allow direct clicking on trigger link
    // if (!$el.hasClass('is-active')) {
    evt.preventDefault();
    $el.toggleClass('is-active').next('.mobile-nav__sublist').slideToggle(200);
    // }
  });
};

theme.equalHeights = function () {
  theme.cache.$w.on('load', resizeElements());

  theme.cache.$w.on('resize',
    afterResize(function() {
      resizeElements();
    }, 250, 'equal-heights')
  );

  function resizeElements() {
    theme.cache.$productGridImages.css('height', 'auto').equalHeights();
    theme.cache.$featuredGridImages.css('height', 'auto').equalHeights();
  }
};

theme.productImageGallery = function() {

  if (!theme.cache.$productImageGallery.length) {
    return;
  };

  theme.cache.$productImageGallery.magnificPopup({
    type: 'image',
    mainClass: 'mfp-fade',
    closeOnBgClick: true,
    closeBtnInside: false,
    closeOnContentClick: true,
    tClose: 'Close (Esc)',
    removalDelay: 500,
    callbacks: {
      open: function(){
        $('html').css('overflow-y','hidden');
      },
      close: function(){
        $('html').css('overflow-y','');
      }
    },
    gallery: {
      enabled: true,
      navigateByImgClick: false,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><span class="mfp-chevron mfp-chevron-%dir%"></span></button>',
      tPrev: 'Previous (Left arrow key)',
      tNext: 'Next (Right arrow key)'
    }
  });

  theme.cache.$productImage.bind('click', function() {
    var imageId = $(this).attr('data-image-id');
    theme.cache.$productImageGallery.filter('[data-image-id="' + imageId + '"]').trigger('click');
  });
};

theme.cartPage = function () {
  

  theme.cache.$body.on('click', theme.cache.cartNoteAdd, function () {
    $(this).addClass('is-hidden');
    $(theme.cache.cartNote).addClass('is-active');
    ajaxifyShopify.sizeDrawer();
  });
};

theme.toggleMenu = function () {
  var $doc = $(document);
  var showDropdownClass = 'show-dropdown';

  // Open sub navs on small screens
  theme.cache.$hasDropdownItem.on('click', function(evt) {
    var $el = $(this);

    if (!$el.hasClass(showDropdownClass) && timber.vars.isTouch) {
      evt.preventDefault();
      $el.addClass(showDropdownClass);
      $doc.on('click', handleClickOutsideDropdown);
    }

    function handleClickOutsideDropdown (evt) {
      var $target = $(evt.target);

      if (!$target.is($el) && !$.contains($el[0], $target[0])) {
        $el.removeClass(showDropdownClass);
        $doc.off('click', handleClickOutsideDropdown);
      }
    }
  });
};

// Initialize theme's JS on docready
$(theme.init);
