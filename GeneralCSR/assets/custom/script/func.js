function runAjax(actionName, data, loading, loadingDestination, loadingType, afterCallMethod, requestBy) {
    var $me = $(requestBy);
    $.ajax({
        type: "POST",
        url: actionName,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () { if (loading) showHideLoading(loadingDestination, true, loadingType); },
        complete: function () { if (loading) showHideLoading(loadingDestination, false, loadingType); },
        dataType: "json",
        success: function (response) { if (afterCallMethod != "") afterCallMethod(response, $me); },
        error: function (xhr) { console.log(xhr.responseText); }
    });
}
function showHideLoading(e, action, type) {
    var $me = $(e);
    if ((action) && ($me.find(".modal-backdrop.in.load").length > 0)) return;
    if (type == "button") {
        if (action) $me.button("loading");
        else $me.button("reset");
    } else if (type == "full") {
        if (action) {
            //$me.append('<div class="modal-backdrop in load" style="display:none;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>');
            $me.append('<div class="modal-backdrop in load" style="display:none;"><img src="/assets/images/loading.gif" /></div>');
            $me.find(".modal-backdrop.in.load").fadeIn(100);
            //$me.find("div:first").addClass("blurry");
        } else {
            //$me.find("div:first").removeClass("blurry");
            $me.find(".modal-backdrop.in.load").fadeOut(100, function () { $(this).remove(); });
        }
    } else return;
}

function showAlert(type, text, destination, isPrepend) {
    var $me = $(destination);
    if (text != "") {
        var $actionClass = "";
        if (type == "s") $actionClass = "alert-success";
        else if (type == "i") $actionClass = "alert-info";
        else if (type == "w") $actionClass = "alert-warning";
        else if (type == "d") $actionClass = "alert-danger";
        else return;
        var $elem = '<div class="alert ' + $actionClass + '" role="alert">' + text + '</div>';
        if ($me.find(".alert").length > 0) { $me.find(".alert").remove(); }
        if (isPrepend) $me.prepend($elem); else $me.append($elem);
        setTimeout(function () { $me.find(".alert").slideUp("fast", function () { $(this).remove(); }); }, 5000);
    }
}


function showModal(isHeader, isFooter, isCloseButton, title, body, footer) {
    var $elem = '';
    var $randId = Math.random();
    var $animationClass = "";
    //if ((Math.floor(Math.random() * 2) + 1) == 1) $animationClass = "bounceInDown"; else $animationClass = "flipInX";
    $elem += '<div class="modal main-validate" id="' + $randId + '">';
    //$elem += '<div class="modal-dialog animated ' + $animationClass + '">';
    $elem += '<div class="modal-dialog ">';
    $elem += '<div class="modal-content">';
    if (isHeader) {
        $elem += '<div class="modal-header">';
        $elem += '<h4 class="modal-title">' + title + '</h4>';
        $elem += '</div>';
    }
    $elem += '<div class="modal-body">';
    $elem += body;
    $elem += '</div>';
    if (isFooter) {
        $elem += '<div class="modal-footer">';
        $elem += footer;
        if (isCloseButton) $elem += '<button type="button" class="btn btn-default" onclick="closeModal(this)">Close</button>';
        $elem += '</div>';
    }
    $elem += '</div>';
    $elem += '</div>';
    $elem += '</div>';

    $(".modal-div").append($elem);
    $("body").append('<div class="modal-backdrop in p-fixed" id="' + $randId + '"></div>');
    $(".modal-div .modal:last, body modal-backdrop.in:last").fadeIn("fast");
    $(".st-container").addClass("blurry");
}
function closeModal(e) {
    var $me = $(e);

    $me.closest(".modal").fadeOut("fast", function () {
        $(".modal-backdrop.in[id='" + $me.closest(".modal").attr("id") + "']").fadeOut("fast", function () { $(this).remove(); });
        $(this).remove();
        $(".st-container").removeClass("blurry");
    });

    //$me.closest(".modal").animate({ top: '-' + $me.closest(".modal").height() + 'px' }, function () {
    //    $(".modal-backdrop.in[id='" + $me.closest(".modal").attr("id") + "']").fadeout("fast", function () { $(this).remove(); });
    //    $(this).remove();
    //    $(".st-container").removeclass("blurry");
    //});
}

function randNumberUsingTime() {
    var d = new Date();
    console.log(d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate() + '' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds() + '' + d.getMilliseconds());
}
function shake(e, shakes, distance, duration) {
    $(e).css('position', 'relative');
    for (var iter = 0; iter < (shakes + 1) ; iter++) {
        $(e).animate({ left: ((iter % 2 == 0 ? distance : distance * -1)) }, duration);
    }
    $(e).animate({ left: 0 }, duration);
}
function getURLParameter() {
    var sPageURL = window.location.href;
    var indexOfLastSlash = sPageURL.lastIndexOf("/");
    if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash)
        return sPageURL.substring(indexOfLastSlash + 1);
    else return "0";
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getExtensionFromFileName(fileName) {
    var $nameArray = fileName.split(".");
    return $nameArray[$nameArray.length - 1];
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}