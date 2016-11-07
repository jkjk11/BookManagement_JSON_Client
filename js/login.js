

function login() {
    alert("login 함수 들어옴");
    $.ajax({
        url: "http://localhost:7070/book/login",
        type: "GET",
        dataType: "jsonp",
        jsonp:"callback",
        data:{
            lid: $("#lid").val(),
            lpassword: $("#lpassword").val()
        },
        success:function(result){
            if(result==true){
             alert("로그인 성공!");

                //화면상 로그인 버튼 삭제
                $("#login").remove();
                $("#signup").remove();

                //로그아웃 버튼 생성
                var logoutli= $("<li><a href='#' onclick='logout()'>로그아웃</a></li>");
                $("#myNavBar").append(logoutli);

            }else{
                alert("ID/ PW가 불일치합니다.")
            }
        },
        error: function(){
            alert("로그인 실패!")
        }
    })
}

function logout() {
    $(location).attr("href", "http://localhost:7070/book/logout");
    alert('로그아웃');
}
