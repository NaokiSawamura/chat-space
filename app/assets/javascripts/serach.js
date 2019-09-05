$(document).on("turbolinks:load", function() {

  function appendProduct(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</div>
                </div>`
      $('.user_search_list').append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>`
      $('.user_search_list').append(html);
  }
  
  $("#user-search-field").on("input", function() {
    var input = $("#user-search-field").val();
    if (input.length === 0){
      $(".user_search_list").empty();
      preventDefault();
    }

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $(".user_search_list").empty();
        if (users.length !== 0) {
        users.forEach (function (user){
        var html = appendProduct(user);
        $('.user_search_list').append(html);
        });
      }
      else {
        appendNoUser("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました。');
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
    var name = $(this).data('user-name') ;
    var id = $(this).data('user-id') ;
    $(this).parent().remove()
    $("#user-search-field").val();
    addUser(name, id);
  });
  
  $(".chat-group-form__field--right").on('click', '.user-search-remove', function(){
    $(this).parent().remove()
  });

});