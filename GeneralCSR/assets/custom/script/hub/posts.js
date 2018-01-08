generalHub.client.setPost = function (data) {
    if (data.Table.length > 0) {
        $(".no-activity").remove();
        $(".post-div").prepend(getPostElem(data.Table[0]));
        var $obj = $(".post-div .panel:eq(0)");
        $obj.find(".post-body").replaceText(/(^|\s)(#[a-z\d][\w-]*)/ig, '<span class="hashtag">$2</span>');
    }
}

generalHub.client.setFollow = function (data) {
    if (data.length > 0) {
        var $me = $(".panel[data-type='P'][data-id='" + data[0].PostID + "']");

        var $obj = $me.find(".follow-count");
        if (data[0].FollowCount > 0) {
            var $text = data[0].FollowCount + ' Follower';
            if (data[0].FollowCount > 1) $text += 's';
            $obj.text($text);

            if ($me.find(".comment-count").text().length > 0 || $me.find(".archive-count").text().length > 0) {
                $me.find(".actions-count .dot-space").html("&nbsp;&nbsp;&#8226;&nbsp;&nbsp;");
            }

        } else {
            $obj.empty();
            $me.find(".actions-count .dot-space:first").empty();
        }


        //if (data[0].FollowCount > 0) {
        //    if (!($obj.hasClass("count"))) $obj.addClass("count");
        //}
        //else $obj.removeClass("count");
        //$obj.attr("data-count", data[0].FollowCount);
    }
}

generalHub.client.setComment = function (data) {
    var $me = $(".panel[data-type='P'][data-id='" + data[0].RefID + "']");
    var $obj = $me.find("ul.comments");

    $obj.find("li.text-center").remove();
    var $elemArray = [];
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            $elemArray.push(getCommentsElem(data[i]));
        }
        $obj.find(".comment-form").before($elemArray);
        $obj.find(".media:last .comment").replaceText(/(^|\s)(#[a-z\d][\w-]*)/ig, '<span class="hashtag">$2</span>');
    } else {
        $obj.find(".comment-form").before('<li class="text-center"><h4>No Comments Yet!</h4></li>');

        //$obj2.removeClass("count");
    }

    var $obj2 = $me.find(".comment-count");
    if (data[0].CommentCount > 0) {
        var $text = data[0].CommentCount + ' Comment';
        if (data[0].CommentCount > 1) $text += 's';
        $obj2.text($text);

        if ($me.find(".follow-count").text().length > 0 || $me.find(".archive-count").text().length > 0) {
            $me.find(".actions-count .dot-space").html("&nbsp;&nbsp;&#8226;&nbsp;&nbsp;");
        }

    } else {
        $obj2.empty();
        $me.find(".actions-count .dot-space:last").empty();
    }

    $(".comment-date").timeago();
}
generalHub.client.editComment = function (data) {
    var $me = $(".panel[data-type='P'][data-id='" + data[0].RefID + "'] ul.comments li.media[data-id='" + data[0].CommentID + "']");
    $me.find(".comment").html(emojione.toImage(data[0].Comment));
    $me.find(".comment").replaceText(/(^|\s)(#[a-z\d][\w-]*)/ig, '<span class="hashtag">$2</span>');
}

generalHub.client.deleteComments = function (data) {
    $(".panel ul.comments li.media[data-id='" + data[0].ID + "']").fadeOut(function () {
        $(this).remove();
    });
}


generalHub.client.setCommentFlagged = function (data) {
    var $me = $(".panel[data-type='P'][data-id='" + data[0].PostID + "']");
    var $obj = $me.find("ul.comments > li[data-id='" + data[0].RefID + "'] .btn-star");
    if (data.length > 0) {

        //if (data[0].FlaggedCount > 0) {
        //    if (!($obj.hasClass("count"))) $obj.addClass("count");
        //}
        //else $obj.removeClass("count");
        //$obj.attr("data-count", data[0].FlaggedCount);
    }
}
generalHub.client.setCommentSupport = function (data) {
    var $me = $(".panel[data-type='P'][data-id='" + data[0].PostID + "']");
    var $objMain = $me.find("ul.comments > li[data-id='" + data[0].RefID + "']");
    var $obj = $me.find("ul.comments > li[data-id='" + data[0].RefID + "'] .support-count");
    if (data.length > 0) {


        //var $obj = $me.find(".support-count");
        if (data[0].SupportCount > 0) {
            var $text = data[0].SupportCount + ' Support';
            if (data[0].SupportCount > 1) $text += 's';
            $obj.text($text);

            if ($objMain.find(".endorse-count").text().length > 0) {
                $objMain.find(".dot-space").html("&nbsp;&nbsp;&#8226;&nbsp;&nbsp;");
            }


            $objMain.find(".line-separator").addClass("now");
        } else {
            $obj.empty();
            $objMain.find(".dot-space").empty();
            if ($objMain.find(".endorse-count").text().length < 1) {
                $objMain.find(".line-separator").removeClass("now");
            }
        }


        //if (data[0].SupportCount > 0) {
        //    if (!($obj.hasClass("count"))) $obj.addClass("count");
        //}
        //else $obj.removeClass("count");
        //$obj.attr("data-count", data[0].SupportCount);
    }
}

generalHub.client.setCommentEndorse = function (data) {
    var $me = $(".panel[data-type='P'][data-id='" + data[0].PostID + "']");
    var $objMain = $me.find("ul.comments > li[data-id='" + data[0].RefID + "']");
    var $obj = $me.find("ul.comments > li[data-id='" + data[0].RefID + "'] .endorse-count");
    if (data.length > 0) {


        //var $obj = $me.find(".support-count");
        if (data[0].EndorseCount > 0) {
            var $text = data[0].EndorseCount + ' Endorse';
            if (data[0].EndorseCount > 1) $text += 's';
            $obj.text($text);

            if ($objMain.find(".support-count").text().length > 0) {
                $objMain.find(".dot-space").html("&nbsp;&nbsp;&#8226;&nbsp;&nbsp;");
            }


            $objMain.find(".line-separator").addClass("now");
        } else {
            $obj.empty();
            $objMain.find(".dot-space").empty();
            if ($objMain.find(".support-count").text().length < 1) {
                $objMain.find(".line-separator").removeClass("now");
            }
        }


        //if (data[0].SupportCount > 0) {
        //    if (!($obj.hasClass("count"))) $obj.addClass("count");
        //}
        //else $obj.removeClass("count");
        //$obj.attr("data-count", data[0].SupportCount);
    }
}