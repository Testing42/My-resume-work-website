//inserts header and bottom html

$(function loadTopPages() {
    $("header").load("/views/top.html");
});

$(function loadbottomPages() {
    $("footer").load("/views/bottom.html");
});

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
            content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
        }
    }

// Copy button
function copyToClipboard(element) {
    var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
      }
      