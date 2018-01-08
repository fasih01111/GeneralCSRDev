function Logout(e) {
    var Data = {}
    runAjax('/Account/Logout', Data, true, $(e), "button", afterLogout);
}

function afterLogout(data, e) {
    window.location.href = "/Account/Login";
}

function changeSearchLi(e) {
    var $listItems = $(".search-bar ul.comments li");
    var key = e.keyCode,
        $selected = $listItems.filter('.selected'), $current;

    if (key != 40 && key != 38) return;

    $listItems.removeClass('selected');

    if (key == 40) {
        if (!$selected.length || $selected.is(':last-child')) {
            $current = $listItems.eq(0);
        } else {
            $current = $selected.next();
        }
    }
    else if (key == 38) {
        if (!$selected.length || $selected.is(':first-child')) {
            $current = $listItems.last();
        } else {
            $current = $selected.prev();
        }
    }
    $current.addClass('selected');
    //$(".search-bar ul.comments").scrollTop($(".search-bar ul.comments li.selected").position()["top"] - 264);

}

function fullSearch(e) {
    var key = e.keyCode;

    if (key != 40 && key != 38) {
        clearTimeout(typingTimer);
        if ($("#pref-search").val()) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        } else {
            $(".search-content ul").empty();
            $(".search-content ul").append('<li><h4 class="text-center">No Search Found!</h4></li>');
        }
    }
}

var typingTimer;
var doneTypingInterval = 300;

//user is "finished typing," do something
function doneTyping() {
    var $me = $("#pref-search");
    if ($me.val().length > 0) {
        var Data = { "Body": $me.val() }
        $.ajax({
            type: "POST",
            url: "/Home/FullSearch",
            data: JSON.stringify(Data),
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $(".search-content ul").empty();
                $(".search-content ul").append('<li><h4 class="text-center">Searching...</h4></li>');
            },
            complete: function () { $(".search-loading").hide(); },
            dataType: "json",
            success: function (response) {
                if (response.length > 0) {
                    var $elem = '';
                    for (var i = 0; i < response.length; i++) {


                        $elem += '<li onclick="fasih(' + response[i]["ID"] + ')">';
                        $elem += '<div class="media-left">';
                        $elem += '<a href="/Profile/Index/' + response[i]["ID"] + '">';
                        $elem += '<img src="/assets/images/people/' + response[i]["ImgUrl"] + '" width="28" height="28" class="media-object img-circle">';
                        $elem += '</a>';
                        $elem += '</div>';
                        $elem += '<div class="media-body">';
                        $elem += '<a class="user-name" href="/Profile/Index/' + response[i]["ID"] + '">' + response[i]["Title"] + '</a>';

                        $elem += '<div class="user-details">Lorem ipsum dolor</div>';
                        $elem += '</div>';
                        $elem += '</li>';


                        //$elem += '<li onclick="fasih(' + response[i]["ID"] + ')">';
                        //$elem += '<div class="input-group">';
                        //$elem += '<span class="input-group-btn">';
                        //$elem += '<a href="/Profile/Index/' + response[i]["ID"] + '">';
                        //$elem += '<img src="/assets/images/people/' + response[i]["ImgUrl"] + '" alt="Bill" class=""></a>';
                        //$elem += '</span>';
                        //$elem += '<div class="form-control">';
                        //$elem += '<a href="/Profile/Index/' + response[i]["ID"] + '" class="comment-author">' + response[i]["FullName"] + '</a>';
                        //$elem += '<div class="comment">Fasih</div>';
                        //$elem += '</div>';
                        //$elem += '</div>';
                        //$elem += '</li>';
                    }
                    $(".search-content ul").empty();
                    $(".search-content ul").append($elem);
                } else {
                    $(".search-content ul").empty();
                    $(".search-content ul").append('<li><h4 class="text-center">No Search Found!</h4></li>');
                }
            },
            error: function (xhr) { console.log(xhr.responseText); }
        });
    } else {
        $(".search-content ul").empty();
        $(".search-content ul").append('<li><h4 class="text-center">No Search Found!</h4></li>');
    }
}

function fasih(id) {

    //location.href = "/" + location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + "Profile/Index/" + id;
    location.href = "/Profile/Index/" + id;
}

function showHide(e) {
    var $me = $(e);
    $me.toggleClass("fa-plus fa-minus");
    $me.closest(".panel").find(".show-hide").slideToggle("fast");
}

function showSearchBar(e) {
    var $me = $(e);

    var $elem = '';
    $elem += '<div class="searchbar-container container">';
    $elem += '<div class="row">';
    //  $elem += '<div class="row">';
    $elem += '<div class="col-md-6 col-sm-10 col-xs-12 col-md-offset-3">';
    $elem += '<input type="text" id="pref-search" class="form-control" placeholder="Search" onfocus="focusCalled(this)"  onkeyup="fullSearch(event)" />';//onblur="blurCalled(this)"
    $elem += '<i class="material-icons search-icon">search</i>';

    $elem += '<div class="search-content ">';

    //$elem += '<div class="text-right" style="padding: 4px 20px;border-bottom: 1px solid rgba(0,0,0,.15)">';
    //$elem += '<input type="checkbox">&nbsp;<label for="input-2" class="">People</label>&nbsp;&nbsp;&nbsp;&nbsp;';
    //$elem += '<input type="checkbox">&nbsp;<label for="input-2" class="">Issues</label>&nbsp;&nbsp;&nbsp;&nbsp;';
    //$elem += '<input type="checkbox">&nbsp;<label for="input-2" class="">Categories</label></div>';



    $elem += '<ul class="modal-group-list">';
    $elem += '<li><h4 class="text-center">No Recent Search!</h4></li>';
    $elem += '</ul></div>';

    $elem += '</div>';
    $elem += '<div class="col-md-3 pull-right">';
    $elem += '<button type="submit" class="btn btn-default" onclick="closeSearchBar(this)"> <span class="material-icons">close</span></button>';
    $elem += '</div>';
    $elem += '</div>';
    //   $elem += '</div>';
    $elem += '</div>';
    $me.closest(".navbar").append($elem);

   
    $me.closest(".navbar").css("zIndex", "2001");
    $("body").append('<div class="search-backdrop"></div>');


    $("input[type='checkbox']").iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
    $me.closest(".navbar").find(".searchbar-container").animate({ "top": "0%" }, 200, function () {
        $(this).find("#pref-search").focus();

    });
}

function closeSearchBar(e) {
    var $me = $(e);
    $me.closest(".searchbar-container").animate({ "top": "-100%" }, 200, function () {
        $(this).closest(".navbar").css("zIndex", "1030");
        $(this).remove();
        $("body").find('.search-backdrop').remove();

    });
}
function focusCalled(e) {
    var $me = $(e);
    $me.closest(".searchbar-container").find(".search-content").fadeIn("fast");
}

function blurCalled(e) {
    var $me = $(e);
    $me.closest(".searchbar-container").find(".search-content").fadeOut("fast");
}