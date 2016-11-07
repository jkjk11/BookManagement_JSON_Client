

function signup() {
    alert("signup 들어옴");
    $.ajax({
        url: "http://localhost:7070/book/signup",
        type: "GET",
        dataType: "jsonp",
        jsonp:"callback",
        data:{
            mid: $("#mid").val(),
            memail: $("#memail").val(),
            mpassword: $("#mpassword").val()
        },
        success:function(result){
            if(result==true){
             alert("회원가입 성공!");
            }else{
                alert("ID가 이미 존재합니다.")
            }
        },
        error: function(){
            alert("회원가입 실패!")
        }
    })
}

