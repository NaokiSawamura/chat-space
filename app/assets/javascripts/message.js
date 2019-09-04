$(document).on("turbolinks:load", function() {
  function buildHTML(message){
    var image = message.image ? `<img class="lower-message__image" src ="${message.image}"></img>` : "";
    var html = `<div class="message" data-message-number="${message.id}">
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data("message-number");
      console.log(last_message_id)
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        console.log('error');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});