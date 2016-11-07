
var myid=null;

window.onload=function () {
    $.ajax({
        url: "http://localhost:7070/book/session",
        type: "GET",
        dataType: "jsonp",
        jsonp:"callback",
        data:{
        },
        //sessionServlet에 저장된 배열 result[]를 불러와
        success:function(result){
            if(result[0].sessionLogin=="ok") {
                myid = result[0].sessionID;
                alert(myid + "님 로그인되었습니다.");
            }else if(result[0].sessionLogin!="ok"){
                alert("로그인 상태가 아닙니다. 로그인을 해주세요!")
                location.href="main.html";
                //$("#loginmodal").modal('show');
                //location.href("#loginmodal");
            }
        },
        error: function(){
            alert("에러 발생")
        }
    })
}

$(function () {

    //image file load
    var imageLoader=document.getElementById('filePhoto');
    imageLoader.addEventListener('change', handleImage, false);

    function  handleImage(e) {
        var reader=new FileReader();
        reader.onload=function (event) {
            $('.uploader img').attr('src', event.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
});



function insert() {
    $.ajax({
        url: "http://localhost:7070/book/bookInsert",
        type: "GET",
        dataType: "jsonp",
        jsonp:"callback",
        data:{
            img:$("#img").attr("src"),
            isbn: $("#isbn").val(),
            title: $("#title").val(),
            author: $("#author").val(),
            price: $("#price").val()
        },
        success:function(result){
            alert("입력 성공!");
        },
        error: function(){
            alert("에러 발생")
        }
    })
}

