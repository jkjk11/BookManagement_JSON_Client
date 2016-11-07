
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
function searchBook(){

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
            url: "http://localhost:7070/book/bookList",
            //type: 전송방식(get or post)
            type: "GET",
            //만약 서버쪽에서 보내주는 데이터가 JSON이면
            //그리고 JSONP방식으로 사용할 거면 jsonp라는 값을 이용
            dataType: "jsonp",
            //클라이언트가 서버쪽에 보내주는 데이터
            jsonp:"callback",
            //jsonp를 이용하기 위해 추가
            data:{
                keyword: $("#keyword").val()
            },
            //서버쪽 프로그램을 실행시키는 과정이 성공하면 success 호출
            success:function(result){
                //성공할 경우 일반적으로 서버쪽에서 결과데이터를 받아옴
                //서버가 보내주는 데이터는 사실 JSON 문자열인데,
                //이것을 jQuery가 javaScrip 객체로 변환시켜서 전달.
                //alert(result.bookTitle+ ","+ result.bookAuthor);

                //서버가 보내주는 데이터를 받아서 화면에 리스트를 찍어요
                /*
                 <tr>
                 <th>이미지</th>
                 <th>제목</th>
                 <th>저자</th>
                 <th>가격</th>
                 <th>삭제</th>
                 </tr>

                 * */
                alert(result.length);
                $("#bodyList").empty();

                for(var i=0; i<result.length; i++ ) {



                    var tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);
                    var img = $("<img width='170px' height='230px'>").attr("src", result[i].img);
                    var imgTd = $("<td width='240px'></td>").append(img);
                    var titleA=$("<a href='#' onclick='detailInfo(this)'></a>").text(result[i].title);
                    var titleTd = $("<td></td>").append(titleA);
                    var authorTd = $("<td></td>").text(result[i].author);
                    var priceTd = $("<td></td>").text(result[i].price);
                    var deleteTd=$("<td width='80px'><input type='button' value='삭제' class='btn-xs, btn-danger' onclick='deleteRow(this)'> </td>");
                    var updateTd=$("<td width='80px'><input type='button' value='수정' class='btn-xs, btn-primary' onclick='updateRow(this)'> </td>");
                    var reviewTd=$("<td width='80px'><input type='button' value='서평보기' class='btn-xs, btn-success' onclick='reviewLink(this)'> </td>");

                    //titleTd.on("click", detailInfo);

                    // var updatebtn=$("<input/>").attr("type", "button").attr("value", "수정");


               //     var updatebtnTd=$("<td></td>").append(updatebtn);


                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(deleteTd);
                    tr.append(updateTd);
                    tr.append(reviewTd);



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

function deleteRow(obj) {

    //console.log($(this) + " " + obj);
    $(obj).parent().parent().remove();

}

function updateRow(obj) {

    var title = $(obj).parent().parent().find("td:nth-child(2)");
    var title_=title.text();
    var author = $(obj).parent().parent().find("td:nth-child(3)").text();
    var price = $(obj).parent().parent().find("td:nth-child(4)").text();



    if($(obj).parent().find("[value]").val()=="수정") {
        alert("수정!!!");
        //수정버튼을 클릭하면
        //this: event source (버튼)

        console.log("if문 안으로 들어옴");

        console.log(title_ + author + price);

        var titleBox = $("<input />").attr("type", "text").val(title_);
        var authorBox = $("<input />").attr("type", "text").val(author);
        var priceBox = $("<input />").attr("type", "text").val(price);

        //수정완료 버튼으로 바꾸기
        $(obj).parent().find("[value]").val("수정완료");

    }


    else if($(obj).parent().find("[value]").val()=="수정완료"){

            alert("수정완료 버튼 클릭!!");

            var isbn=$(obj).parent().parent().attr("data-isbn");

            var title2=$(obj).parent().parent().find("td:nth-child(2) > input").val();
            var author2=$(obj).parent().parent().find("td:nth-child(3) > input").val();
            var price2=$(obj).parent().parent().find("td:nth-child(4) > input").val();



            $.ajax({
                url: "http://localhost:7070/book/bookUpdate",
                type:"GET",
                dataType:"jsonp",
                jsonp:"callback",
                data:{
                    isbn: isbn,
                    title: title2,
                    author: author2,
                    price: price2
                },
                success: function () {

                    alert("정상적으로 처리되었습니다.");
                    $(obj).parent().parent().find("td:nth-child(2)").empty();
                    $(obj).parent().parent().find("td:nth-child(2)").text(title2);
                    $(obj).parent().parent().find("td:nth-child(3)").empty();
                    $(obj).parent().parent().find("td:nth-child(3)").text(author2);
                    $(obj).parent().parent().find("td:nth-child(4)").empty();
                    $(obj).parent().parent().find("td:nth-child(4)").text(price2);
                },
                error: function () {
                    alert("업데이트 에러 발생");
                }
            })



    }





    $(obj).parent().parent().find("td:nth-child(2)").text("");
    $(obj).parent().parent().find("td:nth-child(2)").append(titleBox);
    $(obj).parent().parent().find("td:nth-child(3)").text("");
    $(obj).parent().parent().find("td:nth-child(3)").append(authorBox);
    $(obj).parent().parent().find("td:nth-child(4)").text("");
    $(obj).parent().parent().find("td:nth-child(4)").append(priceBox);


    //$(obj).parent().parent().find("td:nth-child(5)").attr("disabled");

}





    function mySort() {
        var rows = $("table").find("tbody > tr").get();
        rows.sort(function (a, b) {
            var keyA = $(a).children("td").eq(3).text();
            var keyB = $(b).children("td").eq(3).text();

            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;

            return 0;
        });

        $.each(rows, function (idx, row) {
            $("table").children("tbody").append(row);

        });
    }
    
    function detailInfo(obj) {




        var isbn=$(obj).parent().parent().attr("data-isbn"); //$(obj).parent().parent() => tr

        console.log(isbn);

        $.ajax({
            url: "http://localhost:7070/book/bookDetail",
            type: "GET",
            dataType: "jsonp",
            jsonp:"callback",
            data:{
                isbn: isbn
            },
            success: function (result) {
                if($(obj).parent().find('div').is("div")==false){
                    $(obj).parent().append($("<br><div id='detailInfo'></div>"));


                    $(obj).parent().find('div').append($("<h6></h6>"));
                    $(obj).parent().find('div').append($("<h6></h6>"));
                    $(obj).parent().find('div').append($("<h6></h6>"));
                    $(obj).parent().find('div').append($("<h6></h6>"));

                    var date=$(obj).parent().find('div').find("h6:first").text("발행날짜:"+ result.date);
                    var page=$(obj).parent().find('div').find("h6:nth-child(2)").text("페이지수:" +result.page);
                    var translator=$(obj).parent().find('div').find("h6:nth-child(3)").text("번역가:" +result.translator);
                    var publisher=$(obj).parent().find('div').find("h6:last").text("출판사:"+ result.publisher);

                    //상세보기 버튼 비활성화
                    //$(obj).parent().find('a').off();
                    alert($(obj).parent().find('a').html());
                    $(obj).parent().find('div').css("background-color", "#FFFFE9");
                }else{
                    $(obj).parent().find('div').clear();
                }
            },
            error: function () {
                alert("error");
            }

        });

    }

    function reviewLink(obj) {
        //해당 도서 정보를 localStorage에 저장
        alert("reviewLink함수 들어옴");
        //var obj=$(this).parent().parent(); // tr
        var isbn=$(obj).parent().parent().attr("data-isbn");
        var imgsrc=$(obj).parent().parent().find("td:first >img").attr("src");
        var titleText=$(obj).parent().parent().find("td:nth-child(2) >a").text();
        var authorText=$(obj).parent().parent().find("td:nth-child(3)").text();
        var priceText=$(obj).parent().parent().find("td:nth-child(4)").text();

        alert(isbn+ imgsrc + titleText+ authorText+ priceText );

        var bookInfoList= { "isbn" : isbn, "img" :imgsrc, "title" :titleText, "author" : authorText, "price" : priceText}

        localStorage.setItem('lists', JSON.stringify(bookInfoList));

        localStorage.myIsbn=isbn;


        $(location).attr('href', 'reviewUpload2.html');
    }
