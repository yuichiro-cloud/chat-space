$(function(){ 
  var buildHTML = function buildHTML(message){
   if ( message.image ) {
     var html =
  `<div class="main-chat__message-list__message" data-message-id=${message.id}>
    <div class="main-chat__message-list__message__upper-message">
      <div class="main-chat__message-list__message__upper-message__user-name">
        ${message.user_name}
      </div>
      <div class="main-chat__message-list__message__upper-message__date">
        ${message.created_at}
      </div>
    </div>
    <div class="main-chat__message-list__message__lower-message">
      <p class="main-chat__message-list__message__lower-message__content">
        ${message.content}
      </p>
      <img src="${message.image}"class="main-chat__message-list__message__lower-message__image"></img>
    </div>`
      return html;
   } else {
     var html =
  `<div class="main-chat__message-list__message" data-message-id=${message.id}>
    <div class="main-chat__message-list__message__upper-message">
      <div class="main-chat__message-list__message__upper-message__user-name">
        ${message.user_name}
      </div>
      <div class="main-chat__message-list__message__upper-message__date">
        ${message.created_at}
      </div>
    </div>
    <div class="main-chat__message-list__message__lower-message">
      <p class="main-chat__message-list__message__lower-message__content">
        ${message.content}
      </p>
  </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action');
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
  })
  .done(function(formData){
    var html = buildHTML(formData);
    $('.main-chat__message-list').append(html);   
    $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});   
    $('form')[0].reset();
    $('.main-chat__message-form-padding__form__send').prop('disabled', false);
    
    })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.main-chat__message-list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
       var insertHTML = '';
       $.each(messages, function(i, message) {
         insertHTML += buildHTML(message)
       });
       $('.main-chat__message-list').append(insertHTML);
       $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".main-chat__message-form-padding__form__send").prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});