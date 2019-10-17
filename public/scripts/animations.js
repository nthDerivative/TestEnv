function validate() {
    var missinginputs = "";

    if ($('#contactname').val().length == 0) {
        missinginputs = "Your Name, ";
    }

    if ($('#contactcompany').val().length == 0) {
        missinginputs = missinginputs + "Your Company, ";
    }

    if ($('#contactemail').val().length == 0) {
        missinginputs = missinginputs + "Your E-mail, ";
    }

    if ($('#messagearea').val().length == 0) {
        missinginputs = missinginputs + "Your Message.";
    }

    if (missinginputs.length > 0) {
        $('#messagetext').text("Please fill in the following: " + missinginputs);
        $('#messagebox').fadeIn("slow");
        return false;
    }
        
}

function autosize() {
    var messagearea = this;
    setTimeout(function () {
        if (messagearea.scrollHeight > 120) {
            messagearea.style.cssText = 'height:auto; padding:0';
            messagearea.style.cssText = 'height:' + (messagearea.scrollHeight + 20) + 'px';
        }
        if (messagearea.scrollHeight < 120) {
            messagearea.style.cssText = 'height:auto; padding:0';
            messagearea.style.cssText = 'height:' + 120 + 'px';
        }
    }, 0);
}

function projdetails(description, github, title, background) {

    $('#messagecontenttitle').text(title);

    $("#messagetext").css("background", "url('/images/" + background + "') no-repeat center"); 
    $("#messagetext").css("background-size", "contain");
    $("#messagetext").css("background-color", "rgba(255, 255, 255, 0.7)");
    $("#messagetext").css("background-blend-mode", "lighten");

    $('#messagetext').text(description);
    if (github.length > 0) {
        $("#messagelink").attr("href", github)
        $('#messagelink').text('Follow on GitHub');
        $('#messagelink').fadeIn("slow");
    }
    
    $('#messagebox').fadeIn("slow");
    $('#messagecontenttitle').fadeIn("slow");
}


$(document).ready(function () {
    var messagecontentclicked = false;

    var $containerWidth = $(window).width();
    
    $('#menubutton').click(function () {
        var currentimg = $("button img").attr("src");
        if (currentimg == "/images/menu.png") {
            $("li").slideToggle("fast");
            $("button img").attr("src", "/images/close.png");
        } else {
            $("li").slideToggle("fast");
            $("button img").attr("src", "/images/menu.png");
        }
    });

    $('a').mouseover(function () {
        var $containerWidth = $(window).width();

        if ($containerWidth > 1000) {
            $(this).animate({
                borderBottomColor: '#8f8f8f',
                borderBottomWidth: '1px',
                paddingBottom: "3px",
            }, 100);
        }
    }); 

    $('a').mouseout(function () {
        $(this).animate({
            borderBottomColor: '#8f8f8f',
            borderBottomWidth: '0px',
            paddingBottom: "0px",
        }, 100);
    }); 

    $('#close').click(function () {
        $('#messagebox').fadeOut("slow");
    });

    $('#li').click(function () {
        if ($containerWidth < 1000) {
            $("li").slideToggle("fast");
        }
    });

    $(window).resize(function () {
        var currentimg = $("button img").attr("src");
        var $containerWidth = $(window).width();
        var MenuisHidden = $("li").is(":hidden");

        waitForFinalEvent(function () {

            if ($containerWidth <= 1000) {
                if (MenuisHidden == false) {
                    $("li").fadeIn("fast");
                    $("button img").attr("src", "/images/menu.png");
                }
            } else {
                
                if ($containerWidth > 800) {
                    if (currentimg == "/images/close.png") {
                        $("button img").attr("src", "/images/menu.png");
                    }
                }
                if (MenuisHidden == true) {
                    $("li").fadeIn("fast");
                }
            }

        }, 500, "test");
    });

var textarea = document.querySelector('#messagearea');
textarea.addEventListener('keydown', autosize);
});

var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();