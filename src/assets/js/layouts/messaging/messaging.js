/*! messaging.js | Huro | Css Ninja. 2020-2021 */

/* ==========================================================================
Messaging page functions
========================================================================== */

"use strict";

$(document).ready(function () {
  //Hide chat side
  $("#hide-chat-side").on("click", function () {
    $(".chat-body-wrap, .message-field-wrapper").addClass("side-collapsed");
    $(".chat-side-fab").addClass("is-active").removeClass("is-mobile-active");
    $(".chat-side").removeClass("is-mobile-active");
  });

  //Show chat side
  $(".chat-side-fab").on("click", function () {
    $(this).removeClass("is-active").addClass("is-mobile-active");
    $(".chat-body-wrap, .message-field-wrapper").removeClass("side-collapsed");
    $(".chat-side").addClass("is-mobile-active");
  });

  //Highlight selected sidebar link and get the right conversation
  $(
    "#messages-sidebar li, .collapsed-messaging li, #mobile-conversations-list li"
  ).on("click", function () {
    //Hide new conversation autocomplete if relevant
    $(".chat-header .is-autocomplete").addClass("is-hidden");

    //Variables declaration
    var $this = $(this);
    var conversationRef = $(this).attr("data-conversation-menu");
    var userPic = $(this).find(".is-user").attr("src");
    var userBadge = $(this).find(".is-badge").attr("src");
    var userName =
      $(this).find(".recipient-meta span:first-child").html() ||
      $(this).attr("data-username");
    var userPosition = $(this).attr("data-position");

    $(
      "#messages-sidebar li, .collapsed-messaging li, #mobile-conversations-list li"
    ).removeClass("is-active");
    //$(this).addClass('is-active');

    $('li[data-conversation-menu="' + conversationRef + '"]').addClass(
      "is-active"
    );

    //Check if main chat window is hidden and display it
    if ($(".is-chat").hasClass("is-hidden")) {
      $(".is-chat, .is-chat-placeholder").toggleClass("is-hidden");
    }

    //Activate chat loader
    $(".chat-loader").addClass("is-active");

    //Remove current conversation
    $("#chat-body li:not(.no-messages):not(.chat-loader)").remove();

    //Load Conversation
    setTimeout(function () {
      $.ajax({
        url: "assets/data/" + conversationRef + ".json",
        dataType: "json",
        success: function (data) {
          var html = "";
          var linkIcon = feather.icons.link.toSvg();
          var maximizeIcon = feather.icons.maximize.toSvg();
          var downloadIcon = feather.icons["download-cloud"].toSvg();

          for (var i in data.messages) {
            var obj = data.messages[i];

            for (var prop in obj) {
              if (obj[prop].type == "msg") {
                html = `
                                    <li class="${obj[prop].sender}">
                                        <div class="avatar">
                                            <img src="${obj[prop].avatar}" draggable="false"/>
                                        </div>
                                        <div class="msg">
                                        <div class="msg-inner">
                                            <p>${obj[prop].content.text}</p>
                                        </div>
                                        <time>
                                            ${obj[prop].content.time}
                                        </time>
                                    </div>
                                    </li>
                                `;
              } else if (obj[prop].type == "system") {
                html = `
                                    <li class="divider-container">
                                        <div class="divider">
                                            <span>${obj[prop].content.text}</span>
                                        </div>
                                    </li>
                                `;
              } else if (obj[prop].type == "imagelink") {
                html = `
                                    <li class="${obj[prop].sender}">
                                        <div class="avatar">
                                            <img src="${obj[prop].avatar}" draggable="false"/>
                                        </div>
                                        <div class="msg is-link-image">
                                            <figure class="image">
                                                <img src="${obj[prop].content.link_image}">
                                                <div class="link-badge">
                                                    <img src="${obj[prop].content.link_badge}">
                                                </div>
                                            </figure>
                                            <div class="link-body">
                                                <span class="link-title">${obj[prop].content.text}</span>
                                                <small>${obj[prop].content.subtext}</small>
                                            </div>
                                        </div>
                                    </li>
                                `;
              } else if (obj[prop].type == "image") {
                html = `
                                    <li class="${obj[prop].sender}">
                                        <div class="avatar is-online">
                                            <img src="${obj[prop].avatar}" draggable="false"/>
                                        </div>
                                        <div class="msg is-image">
                                            <div class="image-container">
                                                <img src="${obj[prop].content.image_url}">
                                                <div class="image-overlay"></div>
                                                <div class="image-actions">
                                                    <div class="actions-inner">
                                                        <div class="action">
                                                            ${downloadIcon}
                                                        </div>
                                                        <a href="${obj[prop].content.image_url}" class="action messaging-popup">
                                                            ${maximizeIcon}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                `;
              } else if (obj[prop].type == "link") {
                html = `
                                    <li class="${obj[prop].sender}">
                                        <div class="avatar is-online">
                                            <img src="${obj[prop].avatar}" draggable="false"/>
                                        </div>
                                        <div class="msg is-link">
                                            <div class="icon-wrapper">
                                                ${linkIcon}
                                            </div>
                                            <p class="link-meta">
                                                <span>${obj[prop].content.text}</span>
                                                <a href="#">${obj[prop].content.subtext}</a>
                                            </p>
                                        </div>
                                    </li>
                                `;
              } else {
              }
              //Render conversation markup
              $("#chat-body").append(html);

              //Update user details (chat body right side)
              $("#user-details-image").attr("src", userPic);
              $("#user-details-name").html(userName);
              $("#user-details-title").html(userPosition);

              //Scroll chat to bottom on load
              var scrollChat = $(".chat-body");

              scrollChat.scrollTop(scrollChat.prop("scrollHeight"));
              //$().getUserPopovers();

              var liCount = $(".chat-body li").length;

              if (liCount == 0) {
                $(".no-messages").removeClass("is-hidden");
              } else {
                $(".no-messages").addClass("is-hidden");
              }

              //Inject the right conversation ref for the hide function
              $("#chat-body").attr("data-conversation-body", conversationRef);

              //Disable chat loader
              setTimeout(function () {
                $(".chat-loader").removeClass("is-active");
              }, 500);
            }
          }
        },
      });
    }, 1000);
  });

  //Sidebar user autocomplete
  if ($("#users-autocpl").length) {
    var usersOptions = {
      url: "assets/data/user.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function (value, item) {
          return (
            "<div class=" +
            "template-wrapper" +
            "><div class=" +
            "avatar-wrapper" +
            ">" +
            "<img class=" +
            "autocpl-avatar" +
            " src='" +
            item.pic +
            "' /><img class=" +
            "avatar-badge" +
            " src='" +
            item.badge +
            "' /></div><div class=" +
            "entry-text" +
            ">" +
            value +
            "<br><span>" +
            item.location +
            "</span></div></div> "
          );
        },
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 5,
        showAnimation: {
          type: "fade", //normal|slide|fade
          time: 400,
          callback: function () {},
        },
        match: {
          enabled: true,
        },
        onChooseEvent: function () {
          //Get the user name from the autocomplete
          var newRecipient = $("#users-autocpl").val();
          //empty the input for next use
          $("#users-autocpl").val("");
          console.log(newRecipient);

          //Check if main chat window is hidden and display it
          if ($(".is-chat").hasClass("is-hidden")) {
            $(".is-chat, .is-chat-placeholder").toggleClass("is-hidden");
          }
          //Remove messages from chat body
          $("#chat-body li:not(.no-messages):not(.chat-loader)").remove();

          //Close autocomplete
          $(".chat-header .is-autocomplete").addClass("is-hidden");
        },
      },
    };

    $("#users-autocpl").easyAutocomplete(usersOptions);
  }

  //Enable the message button when the autocomplete has a value
  $("#users-autocpl").on("change", function () {
    $(".start-conversation").removeClass("is-disabled");
  });

  //Start new conversation
  $("#start-conversation").on("click", function () {
    $(".chat-header .is-autocomplete").removeClass("is-hidden");
    $("#users-autocpl").focus();
    $(".chat-body li:not(.no-messages):not(.chat-loader)").remove();
    $(".chat-body .no-messages").removeClass("is-hidden");
    $("#messages-sidebar ul li").removeClass("is-active");
    if (env == "development") {
      $(".chat-side #user-details-image").attr(
        "src",
        "assets/img/avatars/placeholder.jpg"
      );
    } else {
      $(".chat-side #user-details-image").attr(
        "src",
        "https://via.placeholder.com/150x150"
      );
    }
    $(".chat-side")
      .find(".user-name, .info, .user-skills, .user-job-title")
      .empty();
  });

  //Cancel new conversation
  $(".chat-header .hide").on("click", function () {
    $(".chat-header .is-autocomplete input").val("");
    $(".chat-header .is-autocomplete").addClass("is-hidden");
  });

  //Ajax request to load first conversation on page load
  $.ajax({
    url: "assets/data/conversation1.json",
    dataType: "json",
    success: function (data) {
      var html = "";
      var timeIcon = feather.icons.clock.toSvg();
      var linkIcon = feather.icons.link.toSvg();
      var maximizeIcon = feather.icons.maximize.toSvg();
      var downloadIcon = feather.icons["download-cloud"].toSvg();

      for (var i in data.messages) {
        var obj = data.messages[i];

        for (var prop in obj) {
          if (obj[prop].type == "msg") {
            html = `
                            <li class="${obj[prop].sender}">
                                <div class="avatar">
                                    <img src="${obj[prop].avatar}" draggable="false"/>
                                </div>
                                <div class="msg">
                                    <div class="msg-inner">
                                        <p>${obj[prop].content.text}</p>
                                    </div>
                                    
                                    <time>
                                        ${obj[prop].content.time}
                                    </time>
                                </div>
                            </li>
                        `;
          } else if (obj[prop].type == "system") {
            html = `
                            <li class="divider-container">
                                <div class="divider">
                                    <span>${obj[prop].content.text}</span>
                                </div>
                            </li>
                        `;
          } else if (obj[prop].type == "imagelink") {
            html = `
                            <li class="${obj[prop].sender}">
                                <div class="avatar">
                                    <img src="${obj[prop].avatar}" draggable="false"/>
                                </div>
                                <div class="msg is-link-image">
                                    <figure class="image">
                                        <img src="${obj[prop].content.link_image}">
                                        <div class="link-badge">
                                            <img src="${obj[prop].content.link_badge}">
                                        </div>
                                    </figure>
                                    <div class="link-body">
                                        <span class="link-title">${obj[prop].content.text}</span>
                                        <small>${obj[prop].content.subtext}</small>
                                    </div>
                                </div>
                            </li>
                        `;
          } else if (obj[prop].type == "image") {
            html = `
                                <li class="${obj[prop].sender}">
                                    <div class="avatar is-online">
                                        <img src="${obj[prop].avatar}" draggable="false"/>
                                    </div>
                                    <div class="msg is-image">
                                        <div class="image-container">
                                            <img src="${obj[prop].content.image_url}">
                                            <div class="image-overlay"></div>
                                            <div class="image-actions">
                                                <div class="actions-inner">
                                                    <div class="action">
                                                        ${downloadIcon}
                                                    </div>
                                                    <a href="${obj[prop].content.image_url}" class="action messaging-popup">
                                                        ${maximizeIcon}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            `;
          } else if (obj[prop].type == "link") {
            html = `
                            <li class="${obj[prop].sender}">
                                <div class="avatar is-online">
                                    <img src="${obj[prop].avatar}" draggable="false"/>
                                </div>
                                <div class="msg is-link">
                                    <div class="icon-wrapper">
                                        ${linkIcon}
                                    </div>
                                    <p class="link-meta">
                                        <span>${obj[prop].content.text}</span>
                                        <a href="#">${obj[prop].content.subtext}</a>
                                    </p>
                                </div>
                            </li>
                        `;
          } else {
          }
          $("#chat-body").append(html);

          //Scroll chat to bottom on load
          var scrollChat = $(".chat-body");
          scrollChat.scrollTop(scrollChat.prop("scrollHeight"));
        }
      }
    },
  });
});
