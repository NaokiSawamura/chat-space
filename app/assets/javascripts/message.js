$(function(){
  function buildHTML(message){
    var image = message.image ? `<img class="lower-message__image" src ="${message.image}"></img>` : "";
    var html = `<div class="message">
                  <div class="upper-message">
                  <div class="upper-message__talker">
                  ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                  ${message.date}
                  </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                    ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = (window.location.href);
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.new_message')[0].reset()
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast')
    })
    .fail(function(message){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(message){
      $('.submit-btn').prop('disabled', false);
    })
  })
});