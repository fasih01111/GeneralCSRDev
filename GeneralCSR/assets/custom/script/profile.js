function follow(e) {
    var $me = $(e);
    var Data = { "UserID": $me.data("user-id") };
    runAjax("/Profile/Follow", Data, false, $(e), "button", afterFollow, $(e));
}

function afterFollow(data, e) {
    var $me = $(e);
    if (data.length > 0) {
        if (data[0].Action == "Add") {
            $me.text("Unfollow")
        } else if (data[0].Action == "Delete") {
            $me.text("Follow")
        }
    }
}

function showSetInterestedTopics() {
    var $bodyElem = '';
    var $footerElem = '';


    $bodyElem += '<div class="row" id="category">';
    for (var i = 0; i < catDetails.length; i++) {
        $bodyElem += '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-4 cat-info" onclick="selectCategory(this);" data-id="' + catDetails[i]["ID"] + '">';
        $bodyElem += '<img class="img-responsive" data-img-id="01" src="/assets/images/goals-images/' + catDetails[i]["ImgUrl"] + '" />';
        $bodyElem += '<div class="check-wrapper"><div class="check"></div></div>';
        $bodyElem += '</div>';
    }
    $bodyElem += '</div>';

    $footerElem += '<button type="button" class="btn btn-primary" onclick="insertInterestedCategories(this);">Submit</button>';

    showModal(true, true, true, "Select your interest", $bodyElem, $footerElem);
    setOverflowToLastModal();
}

function selectCategory(e) {
    var $me = $(e);
    $me.toggleClass("following");
}

function insertInterestedCategories(e) {
    var $me = $(e);
    var $sCat = "";
    $me.closest(".modal").find(".cat-info.following").each(function () {
        $sCat += $(this).attr("data-id") + "~";
    })
    if ($sCat != "") {
        var Data = { "Categories": $sCat.slice(0, -1) };
        runAjax("/Profile/InsertInterestedCategories", Data, false, $(e), "button", afterInsertInterestedCategories, $(e));
    }
}

function afterInsertInterestedCategories(data, e) {
    var $me = $(e);
    closeModal($me);
}