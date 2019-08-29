$(function() {

  function appendProduct(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
      $('.user_search_list').append(html);
  }
  
  $("#user-search-field").on("input", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $(".listview.js-lazy-load-images").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendProduct(user);
        });
      }
    })
    .fail(function(user){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  });
  
  function addUser(name, id){
    var html =`<div class="chat-group-user clearfix js-chat-member"data-user-id="${id}">
    <input name="group[user_ids][]" type="hidden" value="${id}">
    <p class="chat-group-user__name">
    ${name}
    </p>
    <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
    </div>`

    $(".chat-group-users").append(html);
  }    
  $(".user_search_list").on('click','.user-search-add', function(){
    $(this).parent().remove()
    $("#user-search-field").val();
    var name = $(this).data('user-name') ;
    var id = $(this).data('user-id') ;
    addUser(name, id);
  });
  
  $(".chat-group-form__field--right").on('click', '.user-search-remove', function(){
    $(this).parent().remove()
  });

});