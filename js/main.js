
  var responseObj;
    
  function printRepos() {
  $(".inputForm").hide();
  $("#table").show();
  var table = $('#table').DataTable();
  responseObj = JSON.parse(this.responseText);
  repos = responseObj;  
        for (let a of responseObj){
            console.log(a);
            
        var rowNode=table.row.add( [
            a.commit.committer.date,
            a.commit.committer.name,
            '<a href="'+a.commit.url+'">' + a.commit.url + '</a>',
            '<input id="cmtBtn" class="cmtBtn" type="submit" commit='+a.sha + ' value="Посмотреть">'
        ] ).draw( false ).node();
          $( rowNode )
    .attr( 'commit', a.sha);
            $( rowNode )
    .attr( 'class', 'clickable');  
           
        }

  }
       
    
  function makeRequest(login, repo){
   var request = new XMLHttpRequest();

      request.open('get', 'https://api.github.com/repos/'+login +'/'+repo +'/commits', true)

       
        request.onreadystatechange = function () {  
            if (request.readyState === 4) {  
                if (request.status === 200) {  
                  request.onload = printRepos;
                } else {  
                   console.log("Error", request.statusText);
                     $(".text").html('Произошла ошибка: ' + request.statusText);
                     $("#myModal").show();
                     $(".inputForm").show();
                }  
            }  
        }; 
        request.send()
  
  }
    
  function showCommit(commit){
    for (let a of responseObj){
        if (a.sha==commit){
            console.log(a.sha);
            $(".text").html('Автор: <b>' + a.commit.author.name + '</b><br>' + 'Коммит сделал: <b>' + a.commit.committer.name + '</b><br>' + 'Подробнее: ' + a.commit.message + '<br>' + 'Хеш коммита: ' + a.sha + '<br>' + 'Ссылка на коммит: <a href="' + a.url + '">' + a.url + '</a>');
            
            $(".text4").text('Хеш коммита: ' + a.sha);
            $(".text5").text('Ссылка на коммит: ' + a.url);
            $("#myModal").show();
            
        }
    } 
  }
    

  $("table").on("click", "#cmtBtn", function(){
        showCommit($(this).attr('commit'));
    });
    
    
  $("#btn").click(function() {
  var login = $( "#login" ).val();
  var repo = $( "#repo" ).val();
      console.log(login);
      console.log(repo);
       makeRequest(login, repo);
      //var table = $('#table').DataTable();
      $(".inputForm .content").hide();
      $(".inputForm .spinner").show();
      //$(".")
  });
    
    
  $(".close").click(function() {
    $("#myModal").hide();
  });

