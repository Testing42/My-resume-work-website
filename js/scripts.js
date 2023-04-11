//inserts header and bottom html
function insertElements(){
    $(function loadTopPages() {
        $("header").load("/views/top.html");
    });

    $(function loadbottomPages() {
        $("footer").load("/views/bottom.html");
    });
}
// image slider


var imgDuration = 8000;
var fadeSpeed = 2000;
var container = $('#slideshow-container');
var curIndex = -1;

    function slideShow() {
        container + $('img.slides').eq(curIndex).fadeOut(fadeSpeed);
            container + $('img.slides').eq(curIndex  = curIndex < container.children().length - 1 ? curIndex + 1 : 0).fadeIn(fadeSpeed);
            setTimeout("slideShow()", imgDuration);
    }

    slideShow();


//  Collapsible sections

function collapse() {
    var coll = document.getElementsByClassName("collapsible");
    var i;
  
    function animate(opening, content, start, duration) {
      var now = performance.now();
      var progress = Math.min((now - start) / duration, 1);
  
      if (opening) {
        content.style.maxHeight = progress * content.scrollHeight + "200px";
      } else {
        content.style.maxHeight = (1 - progress) * content.scrollHeight + "px";
      }
  
      if (progress < 1) {
        requestAnimationFrame(() => animate(opening, content, start, duration));
      }
    }
  
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        var opening = !content.style.maxHeight || content.style.maxHeight === "0px";
        animate(opening, content, performance.now(), 500);
      });
    }
  }
  
  
/*
function collapse(){
    var coll = document.getElementsByClassName("collapsible");
    var i;

    
        for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
            content.style.maxHeight = null;
            } else {
            content.style.maxHeight = content.scrollHeight + "200px";
            } 
        });
        }
    }

    */
// Copy button
function copyToClipboard(element) {
    var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
      }


//display github users
      function getProfile(e){
        e.preventDefault();
        

        var username = document.getElementById('username').value;
        if(!username || username == ''){
            username = 'testing42';
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState == 4 && xhttp.status == 200){
                var user = JSON.parse(xhttp.responseText);
                document.getElementById('profile').innerHTML = `<div class="panel 		panel-default">
                              <div class="panel-heading">
                            <h3 class="panel-title">${user.name}</h3>
                              </div>
                              <div class="panel-body">
                                <div class="row">
                                <div class="col-md-3">
                                <img src="${user.avatar_url}">
                                </div>
                                <div class="col-md-9">
                                    <span class="label label-primary">Public Repos ${user.public_repos}</span>
                                    <span class="label label-danger">Public Gists ${user.public_gists}</span>
                                    <br><br>
                                    <ul class="list-group">
                                        <li class="list-group-item">Website: ${user.blog}</li>
                                        <li class="list-group-item">Email: ${user.email}</li>
                                    </ul>
                                    <a class="btn btn-light" target="_blank" href="${user.html_url}">Visit Github</a>
                                </div>
                                </div>
                              </div>
                        </div>`;
            }
        }
        xhttp.open('GET', 'https://api.github.com/users/'+username, true);
        xhttp.send();
    }

    document.getElementById('userForm').addEventListener('submit', getProfile, false);

    