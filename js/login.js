

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
            }else{
                alert("ID/ PW가 불일치합니다.")
            }
        },
        error: function(){
            alert("로그인 실패!")
        }
    })
}

