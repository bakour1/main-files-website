// =========================loader=========================
( () => {
  loader = document.getElementById( "loader" );
  document.onreadystatechange = function () {
    if ( document.readyState == "interactive" ) {
setTimeout(() => {
        loader.classList.remove( 'active' );
}, 3000);    } else if ( document.readyState == "complete" ) {
setTimeout(() => {
        loader.classList.remove( 'active' );
}, 3000);    } else {
      loader.classList.add( 'active' );
    }
  };
} )();
// =================== Sticky Header ===================
( () => {
  window.onload = function () {
    window.onscroll = function () { scrollFunction(); };
  };

  function scrollFunction () {
    const header = document.getElementById( "header" );
    if ( window.scrollTop > 150 || document.documentElement.scrollTop > 150 ) {
      header.classList.add( "sticky" );
    } else {
      header.classList.remove( "sticky" );

    }
  }
} )();
// ==================== active section and header on click ====================
( () => {
  const linkSections = document.querySelectorAll( ".link-section" );
  linkSections.forEach( link => {
    link.addEventListener( "click", function ( e ) {
      linkSections.forEach( link => {
        link.classList.remove( "active" );
      } );
      this.classList.add( "active" );
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
        if ( link.getAttribute( "href" ) === `#${ header.getAttribute( 'data-nav' ) }` ) {
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

  const activeHome = new ActiveSection( home );
  const activeAbout = new ActiveSection( about );
  const activeServices = new ActiveSection( services );
  const activePortfolio = new ActiveSection( portfolio );
  const activeSkills = new ActiveSection( skills );
  const activeContact = new ActiveSection( contact );

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
    filterTypes = document.querySelectorAll( '.filter-item>li' ),
    popup = document.querySelector( '.popup' ),
    loader = document.getElementById( 'loader' ),
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
        album: [ '/imgs/web-1.png' ],
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
        album: [ '/imgs/web-2.png' ],
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
        album: [ '/imgs/web-3.png' ],
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
        album: [ '/imgs/web-4.png' ],
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
        album: [ '/imgs/web-5.png' ],
      },
      web_6: {
        title: 'Restaurant',
        category: 'website',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "none",
        tools: [ "HTML", "CSS", "sass" ],
        src: "https://github.com/bakour1/training-with-sass",
        web: "https://bakour1.github.io/training-with-sass/",
        album: [ '/imgs/web-6.png' ],
      },
      web_7: {
        title: 'ENYO',
        category: 'website',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "none",
        tools: [ "HTML", "CSS", "sass" ],
        src: "https://github.com/bakour1/Template-ENYO-sami",
        web: "https://bakour1.github.io/Template-ENYO-sami/",
        album: [ '/imgs/web-7.png' ],
      },
    },
    webApp: {
      web_8: {
        title: 'messenger',
        category: 'webApp',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2022",
        client: "none",
        tools: [ "HTML", "CSS", "JS" ],
        src: "https://github.com/bakour1/challenge-messenger-sami",
        web: "https://bakour1.github.io/challenge-messenger-sami/",
        album: [ '/imgs/web-8.png' ],
      },
    },
    challenges: {
      web_9: {
        title: 'Team Skills',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/NWgKevX",
        web: "https://bakour1.github.io/Team-Skills-And-Stats/",
        album: [ '/imgs/web-9.png' ],
      },
      web_10: {
        title: 'Splitted Frame',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/KKqPGPE",
        web: "https://codepen.io/bakour/pen/KKqPGPE",
        album: [ '/imgs/web-10.png' ],
      },
      web_11: {
        title: 'Gaming Profile Sections',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/ExmBpLJ",
        web: "https://bakour1.github.io/Gaming-Profile-Sections/",
        album: [ '/imgs/web-11.png' ],
      },
      web_12: {
        title: 'Pricing Plans',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/yLXaXjK",
        web: "https://bakour1.github.io/Pricing-Plans-With-Ribbons1/",
        album: [ '/imgs/web-12.png' ],
      },
      web_13: {
        title: 'Circle Features',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/oNwLeRp",
        web: "https://bakour1.github.io/CircleFeatures1/",
        album: [ '/imgs/web-13.png' ],
      },
      web_14: {
        title: 'Blue Signup Form',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/oNwxMdx",
        web: "https://bakour1.github.io/Blue-Signup-Form1/",
        album: [ '/imgs/web-14.png' ],
      },
      web_15: {
        title: 'Bitcoin Dashboard',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/powgrXe",
        web: "https://bakour1.github.io/Bitcoin-Dashboard1/",
        album: [ '/imgs/web-15.png' ],
      },
      web_16: {
        title: 'Email Template',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/mdwJRrL",
        web: "https://bakour1.github.io/Responsive-Email-Template/",
        album: [ '/imgs/web-16.png' ],
      },
      web_17: {
        title: 'Company Team Grid',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://bakour1.github.io/CompanyTeam-With-Grid/",
        web: "https://bakour1.github.io/CompanyTeam-With-Grid/",
        album: [ '/imgs/web-17.png' ],
      },
      web_18: {
        title: 'EL Animations',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/WNOvpmO",
        web: "https://bakour1.github.io/EL-Letters-Animations/",
        album: [ '/imgs/web-18.png' ],
      },
      web_19: {
        title: 'Course Offer',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/BaZadBz",
        web: "https://bakour1.github.io/Course-Offer-Box/",
        album: [ '/imgs/web-19.png' ],
      },
      web_20: {
        title: 'Advanced User card',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/eYRENRj",
        web: "https://bakour1.github.io/AdvancedUser-Card/",
        album: [ '/imgs/web-20.png' ],
      },
      web_21: {
        title: 'Restaurant Orders List',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/bGRRpPK",
        web: "https://codepen.io/bakour/pen/bGRRpPK",
        album: [ '/imgs/web-21.png' ],
      },
      web_22: {
        title: 'Joystick And Sidebar',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/RwgVqVM",
        web: "https://bakour1.github.io/JoystickAndSidebar/",
        album: [ '/imgs/web-22.png' ],
      },
      web_23: {
        title: 'Circle Animated',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/KKqWerY",
        web: "https://bakour1.github.io/CircleAnimated-Progress/",
        album: [ '/imgs/web-23.png' ],
      },
      web_24: {
        title: 'Black Footer',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/RwgKOPw",
        web: "https://bakour1.github.io/Ultimate-Black-Footer/",
        album: [ '/imgs/web-24.png' ],
      },
      web_25: {
        title: 'Jobs List',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/dyROzNY",
        web: "https://bakour1.github.io/Simple-JobsList-elzero/",
        album: [ '/imgs/web-25.png' ],
      },
      web_26: {
        title: 'Circle And Boxes',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/ExXgdBQ",
        web: "https://bakour1.github.io/Circle-And-Boxes/",
        album: [ '/imgs/web-26.png' ],
      },
      web_27: {
        title: 'Dark Pricing',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/KKqgXMw",
        web: "https://bakour1.github.io/Dark-Pricing-Table1/",
        album: [ '/imgs/web-27.png' ],
      },
      web_28: {
        title: 'Real Estate',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/KKqgXMw",
        web: "https://bakour1.github.io/Real-Estate-Cards1/",
        album: [ '/imgs/web-28.png' ],
      },
      web_29: {
        title: 'Shapes',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/wveYKXX",
        web: "https://bakour1.github.io/Advanced-Card-With-Shapes1/",
        album: [ '/imgs/web-29.png' ],
      },
      web_30: {
        title: 'Draw Retro-PC',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/gORQbmK",
        web: "https://bakour1.github.io/Draw-Retro-PC-sam/",
        album: [ '/imgs/web-30.png' ],
      },
      web_31: {
        title: 'Boxed-Footer',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/ZEyMMBW",
        web: "https://bakour1.github.io/Boxed-Footer1/",
        album: [ '/imgs/web-31.png' ],
      },
      web_32: {
        title: 'Awesome Contact',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/rNwZNmN",
        web: "https://bakour1.github.io/AwesomeContact-Section1/",
        album: [ '/imgs/web-32.png' ],
      },
      web_33: {
        title: 'Awesome Contact',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/vYZjJYq",
        web: "https://bakour1.github.io/CanvasSmiley-Facesam/",
        album: [ '/imgs/web-33.png' ],
      },
      web_34: {
        title: 'Kids Education',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/oNwqPjR",
        web: "https://bakour1.github.io/KidsEducation-Section-sam/",
        album: [ '/imgs/web-34.png' ],
      },
      web_35: {
        title: 'Find RealEstate',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/mdwxpNw",
        web: "https://bakour1.github.io/Find-RealEstate-sam/",
        album: [ '/imgs/web-35.png' ],
      },
      web_36: {
        title: 'Hosting Plans',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/rNwdVEj",
        web: "https://bakour1.github.io/HostingPlans-Table/",
        album: [ '/imgs/web-36.png' ],
      },
      web_37: {
        title: 'Products card',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/NWjmLoq",
        web: "https://bakour1.github.io/ProductsWith-Separator/",
        album: [ '/imgs/web-37.png' ],
      },
      web_38: {
        title: 'Colored Boxes',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/MWoQOOE",
        web: "https://bakour1.github.io/ColoredBoxes-sami/",
        album: [ '/imgs/web-38.png' ],
      },
      web_39: {
        title: 'Pricing Plans Two',
        category: 'challenges',
        brief: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.",
        date: "2021",
        client: "training",
        tools: [ "HTML", "CSS" ],
        src: "https://codepen.io/bakour/pen/BaZJOOP",
        web: "https://bakour1.github.io/PricingPlansTwo-Colors/",
        album: [ '/imgs/web-39.png' ],
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
    if ( window.scrollY > posSkills - window.innerHeight / 1.5 ) {
      skills.classList.add( 'open' );
    }
  } );
} )();
//  =======================  contact ======================= -
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
// =================== Scroll Bar ===================
( () => {
  let progress = document.getElementById( "progressBar" );
  let totalHeight = document.body.scrollHeight - window.innerHeight;
  window.addEventListener( "scroll", () => {
    let progressHeight = ( window.pageYOffset / totalHeight ) * 100;
    progress.style.height = `${ progressHeight }%`;
  } );
} )();
