// ---->   HOURS OF HAPPINESS
// ---->   INITIALIZE APP WHEN DOCUTMENT IS READY
// ---->    created by: Caleb Bodtorf :: 6/18/16

$('document').ready(function(){
  app.init();
  initLocalClocks();
  moveSecondHands();
})

// ---->    OBJECT MODEL app

var app = {

  // ---->    urls from database

  url: {
    login: "/login",
    review: "/get-reviews",
    bars: "/get-bars",
    logout: "/log-out",
    createbar: "/create-bar",
    createreview: "/create-review",
    editreview: "/edit-review",
    deletebar: "/delete-bar/:id",
    deletereview: "/delete-review"
  },

  // ---->     stores username to reduce calls to server

  user: '',
  id: '',
  init: function(){
    app.events();
    app.styling();
  },

  // ---->    login function to be used on click and enter events.

  loginSubmit: function(){
    event.preventDefault();
    app.user = $('input[name=username]').val();
    var $password = $('input[type=password]').val();
    console.log("shit submit", app.user);
    if($password === 'poop') {
      var objToSend = {username: app.user};
      app.createUser(JSON.stringify(objToSend));
      $('.login').fadeOut();
      $('.hoh-main').removeClass("hidden").hide().fadeIn(2000);
    } else {
      $('input[type=password]').val('').attr('placeholder','wrong password!');
    }
  },

  // ---->    form submit for creating new bar from plus buttom.

  barSubmit: function(){
    event.preventDefault();
    var objToSend =
      {barName: $('input[name=barName]').val(),
      barLocation: $('input[name=location]').val(),
      imageUrl: $('input[name=imageUrl]').val(),
      author: app.user
    };
    console.log("bar", objToSend);
    app.createBar(JSON.stringify(objToSend));
  },

  reviewSubmit: function(){
    event.preventDefault();
    var objToSend =
      {rating: $('select').val(),
      review: $('textarea').val(),
      author: app.user
    };
    console.log("review", objToSend);
    // app.createReview(JSON.stringify(objToSend));
  },

  // ---->    STYLING
  // ---->    replaces default w/ username

  styling: function(){
    $('.welcome').text(`${app.user}, Welcome to The Secret Society of Happiness`);

  },
  events: function(){
    //  ---->    LOGIN
    // ---->    SUBMIT on CLICK
    $('button[name=button]').on('click', function(event){
      app.loginSubmit();
      app.styling();
    })

    // ---->    SUBMIT on ENTER
    $('.login').on('keypress click', function(event){
    var keyCode = event.keyCode || event.which;
      if (keyCode === 13) {
        app.loginSubmit();
        app.styling();
        return false;
      }
    })

    //  ---->    REVIEWPAGE
    // ----> CLICK IMG to REVIEWPAGE
        $('.bars').on('click','.summary', function(event){
          app.id = this.getAttribute("data-id");
          console.log("bar id", app.id)
          $(".addReview").fadeIn().css({"display": "flex"});
          app.readBarFull();
          // app.readReview(app.id);
        })

    // ----> CLICK CLIPBOARD to REVIEWPAGE FORM
        $('.reviewIcon').on('click', function (){
          $('.reviewInput').slideToggle("slow", function(event){
          })
        })
    // ---->    SUBMIT ADD REVIEW_ on CLICK
    $('button[name=reviewSubmit]').on('click', function(event){
      $('.reviewInput').slideToggle("slow", function(event){
      })
      app.reviewSubmit();
      $('textarea').val('');
    })


    //  ---->    ADD BAR
    // ----> CLICK PLUS to SHOW BAR FORM
        $('.plus').on('click', function (){
          $('.barInput').slideToggle("slow", function(event){
          })
        })

    // ---->    SUBMIT ADD BAR on CLICK
    $('button[name=barSubmit]').on('click', function(event){
      $('.barInput').slideToggle("slow", function(event){
      })
      app.barSubmit();
      $('input').val('');
    })

    // ----> CLICK ABOUT to SHOW ABOUT PAGE
        // $('.aboutPage').on('click', function (){
        //   $('.barInput')
        //   })
        // })

  },






  // ---->    AJAX REQUESTS
  // ---->


  createUser: function(stuff){
    $.ajax({
      url: app.url.login,
      data: stuff,
      method: "POST",
      success: function(data){
        console.log("X gonna give it to ya::creatingUser", data);
        app.readBar();
      },
      error: function(err) {
        console.log('dang son',err)
      }
    })
  },

  createBar: function(stuff){
    $.ajax({
      url: app.url.createbar,
      data: stuff,
      method: "POST",
      success: function(data){
        console.log("X gonna give it to ya::creatingBar", data);
        app.readBar();
      },
      error: function(err) {
        console.log('dang son',err)
      }
    })
  },

  createReview: function(stuff){
    $.ajax({
      url: app.url.createreview,
      data: stuff,
      method: "POST",
      success: function(data){
        console.log("X gonna give it to ya::creatingBar", data);
        app.readReview();
      },
      error: function(err) {
        console.log('dang son',err)
      }
    })
  },

  readBar: function(){
    $.ajax({
      url: app.url.bars,
      method: "GET",
      success: function(data){
        console.log("X gonna give it to ya::reading", data);
        data = JSON.parse(data);
        $('.bars').html('');
        data.forEach(function(element,idx){
          var barString = app.htmlGen(templates.barSummary, element)
          $('.bars').append(barString);
        })
      },
      error: function(err) {
        console.log('dang son',err)
      }
    })
  },

  readBarFull: function(){
    $.ajax({
      url: app.url.bars,
      method: "GET",
      success: function(data){
        console.log("X gonna give it to ya::reading", data);
        data = JSON.parse(data);
        $('.bars').html('');
        var bar = data.filter(function(element,idx){
          return element.barId === Number(app.id);
        })
        console.log(bar)
        var barString = app.htmlGen(templates.barFullView, bar[0]);
        $('.bars').append(barString);
      },
      error: function(err) {
        console.log('dang son',err)
      }
    })
  },

  readReview: function(id){
    $.ajax({
      url: app.url.review + "/" + id,
      method: "GET",
      success: function(data){
        console.log("X gonna give it to ya::reading", data);
        data = JSON.parse(data);
        // $('.bars').html('');
          var barString = app.htmlGen(templates.review)
          $('.main-content').append(barString);
      },
      error: function(err) {
        console.log('dang son',err)
      }
    })
  },

  update: function(stuff){
    $.ajax({
      url: app.url + "/" + stuff._id,
      data: stuff,
      method: "PUT",
      success: function(data){
        console.log("update baby", data);
      },
      error: function(err){
        console.error("dang son!", err)
      }
    })
  },

  delete: function(stuffId){
    var deleteUrl = app.url + "/" + stuffId;
    $.ajax({
      url: deleteUrl,
      method: "DELETE",
      success: function(data){
        console.log("WE DELETED SOMETHING", data);
        app.read();
      },
      error: function(err){
        console.error("dang son!",err);
      }
    })
  },

  // ---->    MERGES TEMPLATES.JS W/ DATA
  // ---->    arguement example: templates.summary

  templater: function(template){
    return _.template(template);
  },
  htmlGen: function (template, data){
    var tmpl = app.templater(template);
    return tmpl(data);
  }
}
