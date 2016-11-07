
//session 설정

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

                $.ajax({
                    url: "http://localhost:7070/book/myShare",
                    type: "GET",
                    dataType: "jsonp",
                    jsonp:"callback",
                    data:{
                        lid: myid
                    },
                    success:function (result2) {

                        //나의 대여리스트
                        if(result2.length){
                            for(var i=0; i<result2.length; i++){
                                var tr = $("<tr></tr>").attr("data-isbn", result2[i].isbn);
                                var titleTd = $("<td></td>").text(result2[i].title);
                                var authorTd = $("<td></td>").text(result2[i].author);
                                var rstatusTd = $("<td width='80px'><input type='button' value='반납' class='btn-danger' onclick='returnMyBook(this)'></td>");

                                tr.append(titleTd);
                                tr.append(authorTd);
                                tr.append(rstatusTd);

                                $("tbody").append(tr);
                            }
                        }else{
                            $("#myStatus").append($("<tr><td colspan='3'>현재 대여 중인 책이 없습니다. </td></tr>"));
                        }

                    },
                    error:function () {
                        alert("에러발생1")
                    }
                })





            }else if(result[0].sessionLogin!="ok"){
                alert("로그인 상태가 아닙니다. 로그인을 해주세요!")
                location.href="main.html";
                //$("#loginmodal").modal('show');
                //location.href("#loginmodal");
            }
        },
        error: function(){
            alert("에러 발생2")
        }
    })
}

function returnMyBook(obj) {
    alert('책 반납 함수 들어옴');

    $.ajax({
        url: "http://localhost:7070/book/returnMyBook",
        type: "GET",
        dataType: "jsonp",
        jsonp:"callback",
        data:{
            isbn: $(obj).parent().parent().attr("data-isbn")
        },
        success:function(result){
            if(result==true){
                alert("선택한 책을 반납합니다.");
                $(obj).parent().parent().remove();
            }
        },
        error: function(){
            alert("에러 발생")
        }
    })

}