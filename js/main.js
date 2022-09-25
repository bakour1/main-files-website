// =========================loader=========================
( () => {
  loader = document.getElementById( "loader" );
  document.onreadystatechange = function () {
    if ( document.readyState == "interactive" || document.readyState == "complete" ) {
      setTimeout( () => {
        loader.classList.remove( 'active' );
      }, 1500 );
    } else {
      loader.classList.add( 'active' );
    }
  };
} )();
// =================== Sticky Header ===================
( () => {
  window.onload = function () {
    window.onscroll = function () { scrollFunction(); };
  };
  window.onresize = function () { scrollFunction(); };
  function scrollFunction () {
    const header = document.getElementById( "header" );
    const landing = document.getElementById( "landing" );
    if ( window.scrollTop > 150 || document.documentElement.scrollTop > 150 ) {
      header.classList.add( "sticky" );
      landing.style.paddingTop = header.getBoundingClientRect().height + "px";
    } else {
      header.classList.remove( "sticky" );
      landing.style.paddingTop = 0 + "px";
    }
  }
} )();

// ===================== Switcher theme color=====================
( () => {
  const parentColorsCircle = document.querySelector( '.effect-color' ),
    styleSwitchToggle = document.querySelector( '.style-switcher-toggler' ),
    containColors = document.querySelector( '.colors' ),
    colors = document.querySelectorAll( '.colors>.bow' ),
    r = document.querySelector( ':root' );
  let targetColor,
    colorCircles = `<span class="color-circle"></span>`;


  // hide and show toggler Switcher color
  styleSwitchToggle.addEventListener( 'click', () => {
    containColors.classList.toggle( "open" );
  } );

  window.addEventListener( 'scroll', () => {
    if ( containColors.classList.contains( 'open' ) ) {
      containColors.classList.remove( 'open' );
    }
  } );

  // Switcher colors
  for ( let i = 0; i <= 80; i++ ) {
    parentColorsCircle.insertAdjacentHTML( 'beforeend', colorCircles );
  }

  localStorage.getItem( 'colorTheme' )
    && r.style.setProperty( '--skin-color', localStorage.getItem( 'colorTheme' ) );

  colors.forEach( gearColor => {
    gearColor.addEventListener( 'click', function ( e ) {

      // ------------------edit variable root------------------
      targetColor = e.target.dataset.color;
      r.style.setProperty( '--skin-color', targetColor );
      localStorage.setItem( 'colorTheme', targetColor );

      // -------------------runner-ball-------------------
      document.querySelector( '.effect-color' ).classList.add( 'runner-ball' );
      containColors.style.pointerEvents = 'none';

      setTimeout( () => {
        document.querySelector( '.effect-color' ).classList.remove( 'runner-ball' );
        containColors.style.pointerEvents = 'all';
      }, 5000 );
    } );
  } );
} )();

// =================== Theme light and dark ===================
( () => {
  let dayNight = document.querySelector( ".day-night" );
  dayNight.addEventListener( "click", () => {
    document.body.classList.toggle( "dark" );
    document.getElementById( "icon-theme" ).classList.toggle( "fa-moon" );
    document.getElementById( "icon-theme" ).classList.toggle( "fa-sun" );
    if ( document.body.classList.contains( "dark" ) ) {
      localStorage.setItem( "themeMode", 'dark' );
    } else {
      localStorage.setItem( "themeMode", 'light' );
    }
  } );

  window.addEventListener( "load", () => {
    if ( localStorage.getItem( "themeMode" ) === "dark" ) {
      document.body.classList.add( "dark" );
      document.getElementById( "icon-theme" ).classList.add( "fa-moon" );
      document.getElementById( "icon-theme" ).classList.remove( "fa-sun" );
    } else {
      document.body.classList.remove( "dark" );
      document.getElementById( "icon-theme" ).classList.remove( "fa-moon" );
      document.getElementById( "icon-theme" ).classList.add( "fa-sun" );
    }
    if ( document.body.classList.contains( "dark" ) ) {
      document.getElementById( "icon-theme" ).classList.add( "fa-moon" );
    } else {
      document.getElementById( "icon-theme" ).classList.add( "fa-sun" );
    }
  } );
} )();

// ===================== circle Img Landing =====================
( () => {
  const textContain = document.querySelector( '.circle .text-contain' );
  let transformRot = 10.5;

  textContain.innerHTML =
    textContain.innerText
      .split( "" )
      .map( ( char, i ) => `<span style= "transform: rotate(${ i * transformRot }deg)">${ char.toUpperCase() }</span>` )
      .join( "" );

} )();

// ========================= Button landing =========================
( () => {

  const btn = document.querySelector( '.circle__hover .btn' );
  let rect = btn.getBoundingClientRect();

  window.addEventListener( 'resize', () => {
    rect = btn.getBoundingClientRect();
  } );
  window.addEventListener( 'scroll', () => {
    rect = btn.getBoundingClientRect();
  } );

  btn.onmousemove = function ( event ) {
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    btn.style.setProperty( '--x', x + 'px' );
    btn.style.setProperty( '--y', y + 'px' );
  };

} )();

// =====================  Services  =====================
( () => {
  class ParallaxTiltEffect {
    constructor ( { element, tiltEffect } ) {
      this.element = element;
      this.container = this.element.querySelector( ".card " );
      this.size = [ this.element.offsetWidth, this.element.offsetHeight ];
      [ this.w, this.h ] = this.size;
      this.tiltEffect = tiltEffect;
      this.mouseOnComponent = false;
      this.handleMouseMove = this.handleMouseMove.bind( this );
      this.handleMouseEnter = this.handleMouseEnter.bind( this );
      this.handleMouseLeave = this.handleMouseLeave.bind( this );
      this.defaultStates = this.defaultStates.bind( this );
      this.setProperty = this.setProperty.bind( this );
      this.init = this.init.bind( this );
      this.init();
    }
    handleMouseMove ( event ) {
      const { offsetX, offsetY } = event;
      let X;
      let Y;

      if ( this.tiltEffect == "normal" ) {
        X = ( -( offsetX - ( this.w / 2 ) ) / 3 ) / 3;
        Y = ( ( offsetY - ( this.h / 2 ) ) / 3 ) / 3;
      }

      else if ( this.tiltEffect == "reverse" ) {
        X = ( ( offsetX - ( this.w / 2 ) ) / 3 ) / 3;
        Y = ( -( offsetY - ( this.h / 2 ) ) / 3 ) / 3;
      }

      this.setProperty( '--rY', X.toFixed( 2 ) );
      this.setProperty( '--rX', Y.toFixed( 2 ) );

    }
    handleMouseEnter () {
      this.mouseOnComponent = true;
      this.container.classList.add( "card--active" );
    }
    handleMouseLeave () {
      this.mouseOnComponent = false;
      this.defaultStates();
    }
    defaultStates () {
      this.container.classList.remove( "card--active" );
      this.setProperty( '--rY', 0 );
      this.setProperty( '--rX', 0 );
    }

    setProperty ( p, v ) {
      return this.container.style.setProperty( p, v );
    }

    init () {
      this.element.addEventListener( 'mousemove', this.handleMouseMove );
      this.element.addEventListener( 'mouseenter', this.handleMouseEnter );
      this.element.addEventListener( 'mouseleave', this.handleMouseLeave );
    }
  }
  const $ = e => document.querySelector( e );

  const wrap1 = new ParallaxTiltEffect( {
    element: $( '.wrap-card-1' ),
    tiltEffect: 'normal'
  } );
  const wrap2 = new ParallaxTiltEffect( {
    element: $( '.wrap-card-2' ),
    tiltEffect: 'normal'
  } );
  const wrap3 = new ParallaxTiltEffect( {
    element: $( '.wrap-card-3' ),
    tiltEffect: 'normal'
  } );


} )();

// =====================  Portfolio  =====================
( () => {
  // ------------------  filter items gallery ------------------
  const
    containItem = document.querySelector( '.contain-items' ),
    filterContainer = document.querySelector( '.filter-item' ),
    popup = document.querySelector( '.popup' ),
    popupClose = document.querySelector( '.popup-close' ),
    switchPopup = document.querySelectorAll( '.switch-popup' ),
    popupLeft = document.querySelector( '.popup-left' ),
    popupRight = document.querySelector( '.popup-right' ),
    btnMore = document.querySelector( '.title-info i' ),
    parentPageNum = document.querySelector( '.parent-page-num' ),
    lisNextAndPrev = document.querySelectorAll( '.parent-page-num>li' ),
    containPageNum = document.querySelector( '.contain-page-num' ),
    descTitle = document.querySelector( '.desc-title' ),
    parentInfo = document.querySelector( '.parent-info' ),
    lineSkin = document.querySelector( '.line-skin' );
  let
    items,
    lisPageNum,
    pageNum,
    lengthImgs,
    target,
    targetIndex,
    dataArrayFilter,
    nameFilter = 'all',
    lengthPages;

  const data = {
    website: {
      web_1: {
        title: 'Website Elzero',
        category: 'website',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "none",
        tools: [ "HTML", "CSS", " SCSS", "JS" ],
        src: "https://github.com/bakour1/sami-elzero-template3",
        web: "https://bakour1.github.io/sami-elzero-template3/",
        album: [ '/imgs/web_1.webp' ],
      },
      web_2: {
        title: 'leon',
        category: 'website',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "none",
        tools: [ "HTML", "CSS" ],
        src: "https://github.com/bakour1/template1-leon-sami",
        web: "https://bakour1.github.io/template1-leon-sami/",
        album: [ '/imgs/web_2.webp' ],
      },
      web_3: {
        title: 'leon',
        category: 'website',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "none",
        tools: [ "HTML", "CSS" ],
        src: "https://github.com/bakour1/template-one-html-and-css",
        web: "https://bakour1.github.io/template-one-html-and-css/",
        album: [ '/imgs/web_3.webp' ],
      },
      web_4: {
        title: 'kasper',
        category: 'website',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "none",
        tools: [ "HTML", "CSS" ],
        src: "https://github.com/bakour1/template-Kasper-sami",
        web: "https://bakour1.github.io/template-Kasper-sami/",
        album: [ '/imgs/web_4.webp' ],
      },
      web_5: {
        title: 'composition',
        category: 'website',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "none",
        tools: [ "HTML", "CSS", "sass" ],
        src: "https://github.com/bakour1/learn-sass-with-elzero",
        web: "https://bakour1.github.io/learn-sass-with-elzero/",
        album: [ '/imgs/web_5.webp' ],
      },
      web_6: {
        title: 'Restaurant',
        category: 'website',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "none",
        tools: [ "HTML", "CSS" ],
        src: "https://github.com/bakour1/training-with-sass",
        web: "https://bakour1.github.io/training-with-sass/",
        album: [ '/imgs/web_6.webp' ],
      },
      web_7: {
        title: 'ENYO',
        category: 'website',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "none",
        tools: [ "HTML", "CSS" ],
        src: "https://github.com/bakour1/Template-ENYO-sami",
        web: "https://bakour1.github.io/Template-ENYO-sami/",
        album: [ '/imgs/web_7.webp' ],
      },
      web_8: {
        title: 'Bondi',
        category: 'website',
        brief: "first website by bootstrap with elzero web school",
        date: "2022",
        client: "trining",
        tools: [ "HTML", "CSS", "bootstrap" ],
        src: "https://github.com/bakour1/bondi-bootstrap",
        web: "https://bakour1.github.io/bondi-bootstrap/",
        album: [ '/imgs/web_8.webp' ],
      },
      web_9: {
        title: 'AppLab',
        category: 'website',
        brief: "second website by bootstrap for training",
        date: "2022",
        client: "trining",
        tools: [ "HTML", "CSS", "bootstrap" ],
        src: "https://github.com/bakour1/applab-bootsrap",
        web: "https://bakour1.github.io/applab-bootsrap-sami/",
        album: [ '/imgs/web_9.webp' ],
      },
      web_10: {
        title: 'manage',
        category: 'website',
        brief: "first website by tailwindcss for training",
        date: "2022",
        client: "trining",
        tools: [ "HTML", "CSS", "tailwindcss" ],
        src: "https://github.com/bakour1/manage-website-tailwindcss",
        web: "https://bakour1.github.io/manage-website-tailwindcss/",
        album: [ '/imgs/web_10.webp' ],
      },
    },
    webApp: {
      webApp_1: {
        title: 'messenger',
        category: 'webApp',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2022",
        client: "none",
        tools: [ "HTML", "CSS", "JS" ],
        src: "https://github.com/bakour1/challenge-messenger-sami",
        web: "https://bakour1.github.io/challenge-messenger-sami/",
        album: [ '/imgs/webApp_1.webp' ],
      },
      webApp_2: {
        title: 'quizapp',
        category: 'webApp',
        brief: "training app with typescript and bootstrap",
        date: "2022",
        client: "none",
        tools: [ "HTML", "CSS", "Ts", "bootstrap" ],
        src: "#",
        web: "samibakkour.com/apps/quizapp",
        album: [ '/imgs/webApp_2-1.webp', '/imgs/webApp_2-2.webp', '/imgs/webApp_2-3.webp' ],
      },
      webApp_3: {
        title: 'Twitter Clone',
        category: 'webApp',
        brief: "training app with tailwindcss",
        date: "2022",
        client: "none",
        tools: [ "HTML", "Tailwindcss" ],
        src: "https://github.com/bakour1/twitter-clone-sami",
        web: "https://bakour1.github.io/twitter-clone-demo/",
        album: [ '/imgs/webApp_3.webp' ],
      },
    },
    challenges: {
      challenge_1: {
        title: 'Team Skills',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/NWgKevX",
        web: "https://bakour1.github.io/Team-Skills-And-Stats/",
        album: [ '/imgs/challenge_1.webp' ],
      },
      challenge_2: {
        title: 'Splitted Frame',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/KKqPGPE",
        web: "https://codepen.io/bakour/pen/KKqPGPE",
        album: [ '/imgs/challenge_2.webp' ],
      },
      challenge_3: {
        title: 'Gaming Profile Sections',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/ExmBpLJ",
        web: "https://bakour1.github.io/Gaming-Profile-Sections/",
        album: [ '/imgs/challenge_3.webp' ],
      },
      challenge_4: {
        title: 'Pricing Plans',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/yLXaXjK",
        web: "https://bakour1.github.io/Pricing-Plans-With-Ribbons1/",
        album: [ '/imgs/challenge_4.webp' ],
      },
      challenge_5: {
        title: 'Circle Features',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/oNwLeRp",
        web: "https://bakour1.github.io/CircleFeatures1/",
        album: [ '/imgs/challenge_5.webp' ],
      },
      challenge_6: {
        title: 'Blue Signup Form',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/oNwxMdx",
        web: "https://bakour1.github.io/Blue-Signup-Form1/",
        album: [ '/imgs/challenge_6.webp' ],
      },
      challenge_7: {
        title: 'Bitcoin Dashboard',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/powgrXe",
        web: "https://bakour1.github.io/Bitcoin-Dashboard1/",
        album: [ '/imgs/challenge_7.webp' ],
      },
      challenge_8: {
        title: 'Email Template',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/mdwJRrL",
        web: "https://bakour1.github.io/Responsive-Email-Template/",
        album: [ '/imgs/challenge_8.webp' ],
      },
      challenge_9: {
        title: 'Company Team Grid',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://bakour1.github.io/CompanyTeam-With-Grid/",
        web: "https://bakour1.github.io/CompanyTeam-With-Grid/",
        album: [ '/imgs/challenge_9.webp' ],
      },
      challenge_10: {
        title: 'EL Animations',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/WNOvpmO",
        web: "https://bakour1.github.io/EL-Letters-Animations/",
        album: [ '/imgs/challenge_10.webp' ],
      },
      challenge_11: {
        title: 'Course Offer',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/BaZadBz",
        web: "https://bakour1.github.io/Course-Offer-Box/",
        album: [ '/imgs/challenge_11.webp' ],
      },
      challenge_12: {
        title: 'Advanced User card',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/eYRENRj",
        web: "https://bakour1.github.io/AdvancedUser-Card/",
        album: [ '/imgs/challenge_12.webp' ],
      },
      challenge_13: {
        title: 'Restaurant Orders List',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/bGRRpPK",
        web: "https://codepen.io/bakour/pen/bGRRpPK",
        album: [ '/imgs/challenge_13.webp' ],
      },
      challenge_14: {
        title: 'Joystick And Sidebar',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/RwgVqVM",
        web: "https://bakour1.github.io/JoystickAndSidebar/",
        album: [ '/imgs/challenge_14.webp' ],
      },
      challenge_15: {
        title: 'Circle Animated',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/KKqWerY",
        web: "https://bakour1.github.io/CircleAnimated-Progress/",
        album: [ '/imgs/challenge_15.webp' ],
      },
      challenge_16: {
        title: 'Black Footer',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/RwgKOPw",
        web: "https://bakour1.github.io/Ultimate-Black-Footer/",
        album: [ '/imgs/challenge_16.webp' ],
      },
      challenge_17: {
        title: 'Jobs List',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/dyROzNY",
        web: "https://bakour1.github.io/Simple-JobsList-elzero/",
        album: [ '/imgs/challenge_17.webp' ],
      },
      challenge_18: {
        title: 'Circle And Boxes',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/ExXgdBQ",
        web: "https://bakour1.github.io/Circle-And-Boxes/",
        album: [ '/imgs/challenge_18.webp' ],
      },
      challenge_19: {
        title: 'Dark Pricing',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/KKqgXMw",
        web: "https://bakour1.github.io/Dark-Pricing-Table1/",
        album: [ '/imgs/challenge_19.webp' ],
      },
      challenge_20: {
        title: 'Real Estate',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/KKqgXMw",
        web: "https://bakour1.github.io/Real-Estate-Cards1/",
        album: [ '/imgs/challenge_20.webp' ],
      },
      challenge_21: {
        title: 'Shapes',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/wveYKXX",
        web: "https://bakour1.github.io/Advanced-Card-With-Shapes1/",
        album: [ '/imgs/challenge_21.webp' ],
      },
      challenge_22: {
        title: 'Draw Retro-PC',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/gORQbmK",
        web: "https://bakour1.github.io/Draw-Retro-PC-sam/",
        album: [ '/imgs/challenge_22.webp' ],
      },
      challenge_23: {
        title: 'Boxed-Footer',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/ZEyMMBW",
        web: "https://bakour1.github.io/Boxed-Footer1/",
        album: [ '/imgs/challenge_23.webp' ],
      },
      challenge_24: {
        title: 'Awesome Contact',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/rNwZNmN",
        web: "https://bakour1.github.io/AwesomeContact-Section1/",
        album: [ '/imgs/challenge_24.webp' ],
      },
      challenge_25: {
        title: 'Awesome Contact',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/vYZjJYq",
        web: "https://bakour1.github.io/CanvasSmiley-Facesam/",
        album: [ '/imgs/challenge_25.webp' ],
      },
      challenge_26: {
        title: 'Kids Education',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/oNwqPjR",
        web: "https://bakour1.github.io/KidsEducation-Section-sam/",
        album: [ '/imgs/challenge_26.webp' ],
      },
      challenge_27: {
        title: 'Find RealEstate',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/mdwxpNw",
        web: "https://bakour1.github.io/Find-RealEstate-sam/",
        album: [ '/imgs/challenge_27.webp' ],
      },
      challenge_28: {
        title: 'Hosting Plans',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/rNwdVEj",
        web: "https://bakour1.github.io/HostingPlans-Table/",
        album: [ '/imgs/challenge_28.webp' ],
      },
      challenge_29: {
        title: 'Products card',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/NWjmLoq",
        web: "https://bakour1.github.io/ProductsWith-Separator/",
        album: [ '/imgs/challenge_29.webp' ],
      },
      challenge_30: {
        title: 'Colored Boxes',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/MWoQOOE",
        web: "https://bakour1.github.io/ColoredBoxes-sami/",
        album: [ '/imgs/challenge_30.webp' ],
      },
      challenge_31: {
        title: 'Pricing Plans Two',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/BaZJOOP",
        web: "https://bakour1.github.io/PricingPlansTwo-Colors/",
        album: [ '/imgs/challenge_31.webp' ],
      },

    }
  };
  // -------------------- convert  dataObj to dataArr;--------------------
  let all = { ...data[ 'website' ], ...data[ 'webApp' ], ...data[ 'challenges' ] };
  let dataArray = Object.values( all );
  // ------------------default mode print data-------------------------
  shuffleArray( dataArray );
  printData( dataArray );
  chickLenArray( dataArray );
  switcherPages( dataArray );
  // ------------------default mode animate lis page num-------------------------
  lisPageNum.forEach( el => {
    el.dataset.scroll = 'fadeIn';
  } );
  itemsSwitcherPages( dataArray );
  NextAndPrev();
  nextAndPrevProj();

  //  ------------------------ shuffle data Array------------------------
  function shuffleArray ( array ) {
    let current = array.length, temp;
    while ( current !== 0 ) {
      temp = Math.floor( Math.random() * current );
      current--;
      [ array[ current ], array[ temp ] ] = [ array[ temp ], array[ current ] ];
    }
    return array;
  }

  // ---------------  chick Len Array  ---------------
  function chickLenArray ( arr ) {
    if ( arr.length <= 6 ) {
      parentPageNum.style.display = 'none';
    } else {
      parentPageNum.style.display = 'flex';
    }
  }

  // -------------------toggle active for filter items-------------------
  filterContainer.addEventListener( 'click', ( event ) => {
    let filterToggle = event.target.closest( '.title-group' );
    if ( filterToggle && !event.target.closest( '.active' ) ) {
      filterContainer.querySelector( '.active' ).classList.remove( 'active' );
      filterToggle.classList.add( 'active' );

      // -----------------filtration new items-----------------
      nameFilter = filterToggle.getAttribute( 'data-filter' );
      dataArrayFilter = dataArray.filter( ( item ) => item.category === nameFilter || nameFilter === 'all' );
      containItem.innerHTML = '';
      printData( dataArrayFilter );
      chickLenArray( dataArrayFilter );
      switcherPages( dataArrayFilter );
      itemsSwitcherPages( dataArrayFilter );
    }
  } );

  // -----------------------events  pages switcher-----------------------
  function itemsSwitcherPages ( arr ) {
    lisPageNum.forEach( li => {
      li.addEventListener( 'click', ( event ) => {
        pageNum = event.target.innerHTML;
        let start = ( pageNum - 1 ) * 6;
        let end = start + 6;

        for ( let i = 0; i < items.length; i++ ) {
          if ( i >= start && i < end ) {
            items[ i ].classList.remove( 'hide' );
            items[ i ].classList.add( 'show' );
          } else {
            items[ i ].classList.remove( 'show' );
            items[ i ].classList.add( 'hide' );
          }

          //  --------------- active target page num  ---------------
          lisPageNum.forEach( li => {
            li.classList.remove( 'active' );
          } );
        };

        li.classList.add( 'active' );
      } );
    } );
  };

  // --------------- switch next and prev lis ---------------
  function NextAndPrev () {
    lisNextAndPrev.forEach( li => {
      li.addEventListener( 'click', ( event ) => {
        let curLiActive;
        lisPageNum.forEach( li => {
          if ( li.classList.contains( 'active' ) ) {
            pageNum = li.innerHTML;
            curLiActive = li;
          }
        } );

        let start = ( pageNum - 1 ) * 6;
        if ( event.target.closest( '.next' ) && pageNum < lengthPages ) {
          curLiActive.classList.remove( 'active' );
          curLiActive.nextElementSibling.classList.add( 'active' );
          start += 6;
        } else if ( event.target.closest( '.prev' ) && pageNum > 1 ) {
          curLiActive.classList.remove( 'active' );
          curLiActive.previousElementSibling.classList.add( 'active' );
          start -= 6;
        }
        let end = start + 6;

        for ( let i = 0; i < items.length; i++ ) {
          if ( i >= start && i < end ) {
            items[ i ].classList.remove( 'hide' );
            items[ i ].classList.add( 'show' );
          } else {
            items[ i ].classList.remove( 'show' );
            items[ i ].classList.add( 'hide' );
          }

          //  --------------- active target page num  ---------------

        };

      } );
    } );
  }

  // -------------------print switcher pages num-------------------
  function switcherPages ( arr ) {
    containPageNum.innerHTML = '';
    lengthPages = Math.ceil( arr.length / 6 );
    for ( let i = 0; i < lengthPages; i++ ) {
      let li = document.createElement( 'li' );
      li.innerHTML = i + 1;
      li.classList.add( 'bg-blur' );
      i === 0 ? li.classList.add( 'active' ) : '';
      containPageNum.appendChild( li );

    }
    lisPageNum = document.querySelectorAll( '.contain-page-num>li' );
  }

  // ------------printData( dataArray ) in items container ;------------
  function printData ( arr ) {
    containItem.innerHTML = '';
    let typeClass = 'show';
    for ( let i = 0; i < arr.length; i++ ) {
      if ( i < 6 ) {
        typeClass = 'show';
      } else {
        typeClass = 'hide';
      }

      let element = `
  <figure data-id='${ i }' data-category="${ arr[ i ].category }" class=" ${ typeClass } website item shadow-dark">
    <div class="contain-imgs">
      <img src="${ arr[ i ].album[ 0 ] }" alt="Oops images not show!">
    </div>
    <figcaption class="bg-blur">${ arr[ i ].title }</figcaption>
  </figure>`;
      containItem.insertAdjacentHTML( 'beforeend', element );
    }
    // assign the items
    items = document.querySelectorAll( 'figure.item' );
  }

  // -----------------------open popup and control -----------------------
  containItem.addEventListener( 'click', ( event ) => {
    if ( event.target.closest( 'figure.item' ) ) {
      // -------------------------stop scrolling-------------------------
      document.body.classList.add( 'stop-scrolling' );

      //  -------------------------Active Popup-------------------------
      popup.classList.remove( 'hide' );
      popup.classList.add( 'fadeIn' );

      // ---------------  get data from item and set ---------------

      target = event.target.closest( 'figure.item' );
      targetIndex = target.getAttribute( 'data-id' );
      if ( document.getElementById( 'allCategory' ).classList.contains( 'active' ) ) {
        dataArrayFilter = dataArray;
      } else {
        dataArrayFilter = dataArray.filter( ( item ) => item.category === nameFilter );
      }
      lengthItems = dataArrayFilter.length;
      setCurrentAllInfo( dataArrayFilter[ targetIndex ] );


    }
  } );

  // -------------------control next slide and prev slide-------------------
  function nextAndPrevProj () {
    switchPopup.forEach( btn => {
      btn.addEventListener( 'click', ( event ) => {
        let cur = event.target.closest( '.switch-popup' );
        if ( cur.classList.contains( 'popup-right' ) && targetIndex < lengthItems - 1 ) {
          targetIndex++;

          setCurrentAllInfo( dataArrayFilter[ targetIndex ] );
          popupRight.style.opacity = '1';
        }
        if ( cur.classList.contains( 'popup-left' ) && targetIndex > 0 ) {
          targetIndex--;

          setCurrentAllInfo( dataArrayFilter[ targetIndex ] );
          popupLeft.style.opacity = '1';
        }
      } );
    } );
  }

  // ------------  set current all info in popup elements ----------------
  function setCurrentAllInfo ( dataItem ) {
    popup.querySelector( '.title-info h2.title' ).childNodes[ 0 ].textContent = dataItem.title;
    popup.querySelector( '.title-info .desc-title span' ).textContent = dataItem.category;
    popup.querySelector( '.info .brief p' ).textContent = dataItem.brief;
    popup.querySelector( '.info .date span' ).textContent = `- ${ dataItem.date }`;
    popup.querySelector( '.info .client span' ).textContent = `- ${ dataItem.client }`;
    popup.querySelector( '.info .tools span' ).textContent = `- ${ dataItem.tools.join( ` | ` ) }`;
    popup.querySelector( '.info .source  a' ).setAttribute( 'href', `${ dataItem.src }` );
    popup.querySelector( '.info .source  a' ).setAttribute( 'target', '_blank' );
    popup.querySelector( '.info .web  a' ).setAttribute( 'href', `${ dataItem.web }` );
    popup.querySelector( '.info .web  a' ).setAttribute( 'target', '_blank' );
    popup.querySelector( '.popup-counter' ).innerHTML = `${ +targetIndex + 1 } of ${ lengthItems }`;
    // ---------------  add imgs from album to contain-imgs popup ---------------
    setAlbumImgs( dataItem.album, popup.querySelector( '.contain-imgs' ) );
  }

  // ---------------  create imgs inside container images  ---------------
  function setAlbumImgs ( album, popupContainImgs ) {
    let i = 1;
    lengthImgs = album.length;
    popupContainImgs.innerHTML = '';
    album.forEach( img => {
      let imgEl = `<div class ='box-img '> <img src="${ img }" alt="Oops images not show!"> <span span class="counter-img  btn-toggle" > ${ i++ } / ${ lengthImgs }</span > </div > `;
      popupContainImgs.innerHTML += imgEl;
    } );
  };

  // ------------- open and close info project inside popup -------------
  let elsAccordion = document.querySelectorAll( '.accordion' );
  btnMore.onclick = () => closeAndOpenInfo();

  function closeAndOpenInfo () {
    if ( descTitle.classList.contains( 'open' ) && parentInfo.classList.contains( 'open' ) ) {
      closeInfo();
      descTitle.classList.remove( 'open' );
      parentInfo.classList.remove( 'open' );
      btnMore.style.transform = 'rotate(0deg)';
    } else {
      openInfo();
      descTitle.classList.add( 'open' );
      parentInfo.classList.add( 'open' );
      btnMore.style.transform = 'rotate(225deg)';
    }
  };
  // --------------- open Info ---------------
  function openInfo () {
    elsAccordion.forEach( element => {
      element.style.height = `${ element.scrollHeight + 15 }px`;
    } );
    lineSkin.style.width = '100%';
  }

  // --------------- close Info ---------------
  function closeInfo () {
    elsAccordion.forEach( element => {
      element.style.height = `0px`;
    } );
    lineSkin.style.width = '0';
  }

  // ---------------  close the popup  ---------------
  popupClose.onclick = () => {
    targetIndex = 0;
    // popup.classList.remove( 'fadeIn' );
    popup.classList.add( 'hide' );
    //-------------- active scrolling---------------
    document.body.classList.remove( 'stop-scrolling' );
  };
} )();

//  =======================  Skills ======================= -
( () => {
  const skills = document.querySelector( 'section#skills' );
  let posSkills = skills.getBoundingClientRect().top;
  window.addEventListener( 'scroll', () => {
    if ( window.scrollY > posSkills - window.innerHeight / 3 ) {
      skills.classList.add( 'open' );
    }
  } );
} )();

//  =======================  contact ======================= -
( function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init( 'RP2pB6OITQZT_buOu' );
} )();
( () => {
  const inputs = document.querySelectorAll( ".input" ),
    btnSubmit = document.querySelector( "button" ),
    runClass = "btn--running",
    submitDuration = 10000,
    reEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    scriptURL = 'https://script.google.com/macros/s/AKfycbyy8MZIh4si27bppbiQKoaG2q1vsXtqm_Tv4dw08V7GYZ6hAtLJH0rIC_PW34Pi9qfI/exec',
    form = document.forms[ 'submit-to-google-sheet' ];
  let doneTimeOut = null, re;

  let objOfForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };
  window.addEventListener( 'load', () => {
    if ( sessionStorage.getItem( 'inputs' ) !== null ) {
      objOfForm = JSON.parse( sessionStorage.getItem( 'inputs' ) );

      inputs.forEach( input => {
        for ( const key in objOfForm ) {
          if ( input.id === key ) {
            input.parentElement.classList.add( "focus--done" );
            input.parentElement.classList.add( "valid--done" );
            input.value = objOfForm[ key ];
          }
        }
      } );
    }
  } );

  inputs.forEach( input => {
    input.addEventListener( "focus", function () {
      this.parentElement.classList.add( "focus--done" );
    } );

    input.addEventListener( "blur", function () {
      if ( this.value.trim() !== "" ) {
        this.parentElement.classList.add( "focus--done" );
        objOfForm[ this.id ] = this.value;
        sessionStorage.setItem( 'inputs', JSON.stringify( objOfForm ) );
      } else {
        this.parentElement.classList.remove( "focus--done" );
      }

    } );

    input.addEventListener( "input", () => {
      input.name === "Email" ?
        re = reEmail :
        input.name === "Name" ?
          re = /^[a-zA-Z]{3,}$/ :
          re = /^[a-zA-Z0-9]{2,}$/;

      re.test( input.value ) ?
        input.parentElement.classList.add( "valid--done" ) :
        input.parentElement.classList.remove( "valid--done" );
    } );
  } );


  btnSubmit.addEventListener( "click", function ( e ) {
    e.preventDefault();
    if ( !checkForm() ) {
      return;
    } else {
      SendMail();
      // fake The submission of the form
      this.disabled = true;
      this.classList.add( runClass );

      clearTimeout( doneTimeOut );

      doneTimeOut = setTimeout( () => {
        this.classList.remove( runClass );
        // this.classList.add( doneClass );
        // this.classList.remove( doneClass );
        this.disabled = false;
        inputs.forEach( input => {
          input.value = "";
          input.parentElement.classList.remove( "focus--done" );
          input.parentElement.classList.remove( "valid--done" );
        } );
        form.reset();
      }, submitDuration );

      fetch( scriptURL, { method: 'POST', body: new FormData( form ) } )
        .then( response => console.log( 'Success!', response ) )
        .catch( error => console.error( 'Error!', error.message ) );
    }
  } );

  function checkForm () {
    let isValid = true;
    inputs.forEach( input => {
      if ( !input.parentElement.classList.contains( 'valid--done' ) ) {
        isValid = false;
      }
    } );
    return isValid;
  }
  function SendMail () {
    var params = {
      name: document.getElementById( "name" ).value,
      email: document.getElementById( "email" ).value,
      subject: document.getElementById( "subject" ).value,
      message: document.getElementById( "message" ).value,
    };
    emailjs.send( "service_mwnbhpa", "template_1jmgnvk", params ).then( function ( res ) {
    } );

  }
}
)();

// ======================== Animation Slideshow ========================
( () => {
  const sections = document.querySelectorAll( '.section' );

  class FadeAnimate {
    constructor ( element, delay ) {
      this.element = element;
      this.posElementTop = this.element.getBoundingClientRect().top;
      this.posElementBottom = this.element.getBoundingClientRect().bottom;
      window.addEventListener( 'resize', () => {
        this.posElementTop = this.element.getBoundingClientRect().top;
        this.posElementBottom = this.element.getBoundingClientRect().bottom;
      } );
      this.delay = delay;
      this.activeElement = this.activeElement.bind( this );
      this.init = this.init.bind( this );
      this.init();

    }
    activeElement () {
      if ( scrollY > this.posElementTop - window.innerHeight ) {
        setTimeout( () => {
          this.element.classList.add( 'appear' );
        }, this.delay );
      }
    }

    init () {
      this.posElementTop = this.element.getBoundingClientRect().top;
      this.posElementBottom = this.element.getBoundingClientRect().bottom;
      window.addEventListener( 'scroll', this.activeElement );

    }
  }

  sections.forEach( section => {
    const fadeIn = section.querySelectorAll( "[data-scroll='fadeIn'] " ),
      fadeInSlide_top = section.querySelectorAll( "[data-scroll='fadeInSlide_top'] " ),
      fadeISlide_left = section.querySelectorAll( "[data-scroll='fadeISlide_left'] " ),
      fadeISlide_right = section.querySelectorAll( "[data-scroll='fadeISlide_right'] " ),
      fadeInSlide_btm = section.querySelectorAll( "[data-scroll='fadeInSlide_btm'] " );

    let count = 0,
      delay = 100;

    fadeIn.forEach( ele => {
      count += delay;
      const fadeInAnimat = new FadeAnimate( ele, count );
    } );
    fadeInSlide_top.forEach( ele => {
      count += delay;
      const fadeInSlide_topAnimat = new FadeAnimate( ele, count );
    } );
    fadeISlide_left.forEach( ele => {
      count += delay;
      const fadeInSlide_leftAnimat = new FadeAnimate( ele, count );
    } );
    fadeISlide_right.forEach( ele => {
      count += delay;
      const fadeInSlide_rightAnimat = new FadeAnimate( ele, count );
    } );
    fadeInSlide_btm.forEach( ele => {
      count += delay;
      const fadeInSlide_btmAnimat = new FadeAnimate( ele, count );
    } );
  } );
} )();

// ==================== active section and header on scroll ====================
( () => {
  const header = document.querySelector( "header" );
  const linkSections = document.querySelectorAll( ".link-section" );
  const home = document.querySelector( '#home' );
  const about = document.querySelector( '#about' );
  const services = document.querySelector( '#services' );
  const portfolio = document.querySelector( '#portfolio' );
  const skills = document.querySelector( '#skills' );
  const contact = document.querySelector( '#contact' );
  var screenMobile = window.matchMedia( "(min-width: 768px)" );
  class ActiveSection {
    constructor ( section ) {
      this.section = section;
      this.posElementTop = this.section.getBoundingClientRect().top;
      this.posElementBottom = this.section.getBoundingClientRect().bottom;
      window.addEventListener( 'resize', () => {
        this.posElementTop = this.section.getBoundingClientRect().top;
        this.posElementBottom = this.section.getBoundingClientRect().bottom;
      } );
      this.activeSection = this.activeSection.bind( this );
      this.activeLinkHeader = this.activeLinkHeader.bind( this );
      this.init = this.init.bind( this );
      this.init();
    }
    activeSection () {
      if ( scrollY > this.posElementTop - window.innerHeight / 1.5
        && scrollY < this.posElementBottom - window.innerHeight / 1.5 ) {
        this.section.classList.add( 'appear--run-border' );
        header.dataset.nav = this.section.id;

      } else {
        this.section.classList.remove( 'appear--run-border' );
      }
    }
    activeLinkHeader () {
      linkSections.forEach( link => {
        if ( link.getAttribute( "href" ) === `#${ header.getAttribute( 'data-nav' ) }`
          || link.getAttribute( "href" ) === "#landing" ) {
          linkSections.forEach( link => {
            link.classList.remove( "active" );
          } );
          link.classList.add( "active" );
        }
      } );
    }
    init () {
      this.posElementTop = this.section.getBoundingClientRect().top;
      this.posElementBottom = this.section.getBoundingClientRect().bottom;
      window.addEventListener( 'scroll', this.activeSection );
      window.addEventListener( 'scroll', this.activeLinkHeader );
    }
  }

  if ( screenMobile.matches ) {
    const activeHome = new ActiveSection( home );
    const activeAbout = new ActiveSection( about );
    const activeServices = new ActiveSection( services );
    const activePortfolio = new ActiveSection( portfolio );
    const activeSkills = new ActiveSection( skills );
    const activeContact = new ActiveSection( contact );
  }
} )();

// =================== Scroll Bar ===================
( () => {

  let progress = document.getElementById( "progressBar" );
  let totalHeight = document.body.scrollHeight - window.innerHeight;
  var screenMobile = window.matchMedia( "(min-width: 768px)" );
  if ( screenMobile.matches ) {
    window.addEventListener( "scroll", () => {
      let progressHeight = ( window.pageYOffset / totalHeight ) * 100;
      progress.style.height = `${ progressHeight }%`;
    } );
  }
} )();

