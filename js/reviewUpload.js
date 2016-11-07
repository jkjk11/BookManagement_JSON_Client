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

                //도서정보 가져오기

                var bookInfoList = localStorage.getItem('lists');
                var binfo= JSON.parse(bookInfoList);

                $('#img').attr("src", binfo.img);
                $('#title').text(binfo.title);
                $('#author').text(binfo.author);
                $('#price').text(binfo.price);


                $.ajax({
                    url: "http://localhost:7070/book/reviewList",
                    type: "GET",
                    dataType: "jsonp",
                    jsonp:"callback",
                    data:{
                        isbn: binfo.isbn
                    },
                    success:function(result2){




                        for(var i=0; i<result2.length; i++ ) {

                            var tr = $("<tr></tr>").attr("review-no", result2[i].no);
                            var midTd=$("<td width='70'></td>").text(result2[i].mid);
                            var contentTd=$("<td></td>").text(result2[i].rcontent);
                            var deleteTd=$("<td width='20'></td>");

                            //var hTd=$("<h4 class='sub-header'>나의 서평 등록하기</h4>");


                            //본인이 작성한 경우 삭제버튼 생성
                            if(result2[i].mid==result[0].sessionID){
                                var deletebtn=$("<span class='glyphicon glyphicon-remove'></span>");
                                deletebtn.on("click", deleteMyReview);
                                deleteTd.append(deletebtn);
                            }


                            tr.append(midTd);
                            tr.append(contentTd);
                            tr.append(deleteTd);

                            //$("table:last").append(hTd);
                            $("table:last").append(tr);

                        }

                    },
                    //서버쪽 프로그램 호출하는데 실패하면 error 호출
                    error: function(){
                        alert("에러 발생")
                    }

                });





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


function saveReview() {

   alert(localStorage.myIsbn);

    $.ajax({
        url: "http://localhost:7070/book/saveReview",
        type: "GET",
        dataType: "jsonp",
        jsonp:"callback",
        data:{
            reviewContent: $("#reviewContent").val(),
            myIsbn: localStorage.myIsbn
        },
        success: function (result) {
            alert("회원님의 서평이 등록되었습니다.");
            $("#reviewContent").val(" ");
            location.reload();

        },
        error: function () {
            alert("error");
        }

    });

}

function deleteMyReview() {
    alert('나의 리뷰 지우기 함수 들어옴');

    $.ajax({
        url: "http://localhost:7070/book/deleteMyReview",
        type: "GET",
        dataType: "jsonp",
        jsonp:"callback",
        data:{

            myReviewNo: $(this).parent().parent().attr("review-no")

        },

        success: function (result) {
            alert("회원님의 서평이 삭제되었습니다.");
            location.reload();

        },
        error: function () {
            alert("error");
        }

    });

}