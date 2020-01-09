$(function(){ 
  function buildHTML(message){
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
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-chat__message-list').append(html);   
    $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});   
    $('form')[0].reset();
    $('.main-chat__message-form-padding__form__send').prop('disabled', false);
    
    })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
    });
  })
});