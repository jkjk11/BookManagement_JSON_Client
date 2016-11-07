
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
function bookShare(){

    //enter key가 입력됐을 때 사용자가 입력한 내용을 가지고
    //서버 프로그램을 AJAX 방식으로 호출
    if(event.keyCode==13){
        //AJAX 호출
        $.ajax({
            //url: 서버프로그램에 대한 url
            //http: 우리가 사용하는 protocol
            //localhost: 찾아가야할 서버쪽 컴퓨터의 IP
            //7070: Tomcat Web Server
            //book:우리 프로젝트에 대한 context root (맨처음 프로젝트 만들때 설정하는 것)
            //bookList: 프로젝트 안에 잇는 Servlet
            url: "http://localhost:7070/book/bookShare",
            //type: 전송방식(get or post)
            type: "GET",
            //만약 서버쪽에서 보내주는 데이터가 JSON이면
            //그리고 JSONP방식으로 사용할 거면 jsonp라는 값을 이용
            dataType: "jsonp",
            //클라이언트가 서버쪽에 보내주는 데이터
            jsonp:"callback",
            //jsonp를 이용하기 위해 추가
            data:{
                shareKeyword: $("#shareKeyword").val()
            },
            //서버쪽 프로그램을 실행시키는 과정이 성공하면 success 호출
            success:function(result){

                alert(result.length);
                $("#bodyList").empty();

                for(var i=0; i<result.length; i++ ) {

                    var tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);
                    var img = $("<img width='170px' height='230px'>").attr("src", result[i].img);
                    var imgTd = $("<td width='240px'></td>").append(img);
                    var titleTd = $("<td></td>").text(result[i].title);
                    var authorTd = $("<td></td>").text(result[i].author);
                    var rstatusTd = $("<td width='80px'><input type='button' value='대여가능' class='btn-success' onclick='shareStatus()'></td>");
                    var midTd = $("<td></td>").text(result[i].mid);

                    //var deleteTd=$("<td width='80px'><input type='button' value='삭제' class='btn-xs, btn-danger' onclick='deleteRow(this)'> </td>");
                    //var updateTd=$("<td width='80px'><input type='button' value='수정' class='btn-xs, btn-primary' onclick='updateRow(this)'> </td>");
                    //var reviewTd=$("<td width='80px'><input type='button' value='서평보기' class='btn-xs, btn-success' onclick='reviewLink(this)'> </td>");

                    //titleTd.on("click", detailInfo);

                    // var updatebtn=$("<input/>").attr("type", "button").attr("value", "수정");


               //     var updatebtnTd=$("<td></td>").append(updatebtn);


                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(midTd);
                    tr.append(rstatusTd);

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

function shareStatus() {
    alert('대여상태 함수 들어옴');
    $.ajax({
        url: "http://localhost:7070/book/shareStatus",
        type: "GET",
        dataType: "jsonp",
        jsonp:"callback",
        data:{
            isbn: $(this).parent().parent().attr("data-isbn")
        },
        success: function (result) {
            alert("회원님의 서평이 등록되었습니다.");


        },
        error: function () {
            alert("error");
        }

    });

}