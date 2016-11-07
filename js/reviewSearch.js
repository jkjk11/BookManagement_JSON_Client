
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




//입력상자에 어떤 key던 입력이 되면 무조건 호출
function reviewSearch(){

    //enter key가 입력됐을 때 사용자가 입력한 내용을 가지고
    //서버 프로그램을 AJAX 방식으로 호출
    if(event.keyCode==13){
        //AJAX 호출
        alert('reviewSearch함수 들어옴');
        $.ajax({
            url: "http://localhost:7070/book/reviewSearch",
            type: "GET",
            dataType: "jsonp",
            jsonp:"callback",
            data:{
                reviewKeyword: $("#reviewKeyword").val()
            },
            //서버쪽 프로그램을 실행시키는 과정이 성공하면 success 호출
            success:function(result){
                alert(result.length);
                $("#bodyList").empty();

                for(var i=0; i<result.length; i++ ) {

                    var tr = $("<tr></tr>");
                    var titleTd = $("<td></td>").text(result[i].title);
                    var rcontentTd=$("<td></td>").text(result[i].rcontent);
                    var midTd=$("<td></td>").text(result[i].mid);

                    //titleTd.on("click", detailInfo);

                    // var updatebtn=$("<input/>").attr("type", "button").attr("value", "수정");


               //     var updatebtnTd=$("<td></td>").append(updatebtn);


                    tr.append(titleTd);
                    tr.append(rcontentTd);
                    tr.append(midTd);

                    $("tbody").append(tr);
                }

            },
            //서버쪽 프로그램 호출하는데 실패하면 error 호출
            error: function(){
                alert("에러 발생")
            }

        });
    }

}
