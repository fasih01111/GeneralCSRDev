
var startCommentCount = 3;
var afterCommentCount = 10;
/*Category*/
var catArray = [];
function getAllCategories() {
    runAjax("/Home/GetAllCategories", "", false, "", "", setCategories, "");
}

function setCategories(data, e) {
    var $elem = '';
    var $sElem = '';
    for (var i = 0; i < data.length; i++) {
        $elem += '<li class="list-group-item" data-cat-id="' + data[i].ID + '"><a href="/Post/Index">' + data[i].Name + '</a></li>';
        $sElem += '<option value="' + data[i].ID + '">' + data[i].Name + '</option>';
        catArray.push(data[i].ID + "~" + data[i].Name);
    }
    //$("#category ul").append($elem);
    $(".share select").append($sElem);

    $(".share select").selectpicker()
}

/*Post*/
function showCreatePostModal() {
    var $bodyElem = '';
    var $footerElem = '';
    $bodyElem += '<div class="row " >';
    $bodyElem += '<div class="col-md-6">';
    $bodyElem += '<div class="form-group">';
    $bodyElem += '<label for="title">Whats the issue</label>';
    $bodyElem += '<input type="text" class="form-control" id="title" data-validate="required" onfocus="validateOn(this, event)" onblur="validateOn(this, event)">';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '<div class="col-md-6">';
    $bodyElem += '<div class="form-group">';
    $bodyElem += '<label for="categories">What category does it fall in</label>';
    $bodyElem += '<select class="form-control selectpicker">';
    for (var i = 0; i < catArray.length; i++) {
        $bodyElem += '<option value="' + catArray[i].split("~")[0] + '">' + catArray[i].split("~")[1] + '</option>';
    }
    //$bodyElem += '<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>';
    $bodyElem += '</select>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '<div class="col-md-12">';
    $bodyElem += '<div class="form-group">';
    $bodyElem += '<label for="body">Give more details if you fell necessary</label>';


    $bodyElem += '<textarea id="body"></textarea>';
    //$bodyElem += '<div contenteditable="true" class="form-control post-description" id="body"><div></div></div>';
    //// $bodyElem += '<input id="body"></textarea>';
    //$bodyElem += '<div class="editable editable-boss-input" contenteditable="true">';
    //$bodyElem += '<p>Write something e.g. hashtag: #hashtag username: @user email: email@address.com</p>';
    //$bodyElem += '</div>';
    //$bodyElem += '<textarea class="editable-boss" id="editable-boss" name="editable-boss" type="hidden"></textarea>';

    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-12 file-div"></div>';
    $bodyElem += '</div>';

    $footerElem += '<a href="javascript:void(0)">';
    $footerElem += '<div class="fa fa-files-o fileinput-button share-attachment">';
    $footerElem += '<input type="file" onchange="checkFile(this);" multiple="multiple" title="Attach files"/>';
    $footerElem += '</div>';
    $footerElem += '</a>';
    $footerElem += '<button type="button" class="btn btn-primary" onclick="createPost(this);">Post</button>';



    showModal(true, true, true, "Lets solve an issue", $bodyElem, $footerElem);


    $("#body").closest(".modal-body").css("overflow", "visible");

    //setTimeout(function () {
    //    $(".selectpicker").selectpicker();
    //}, 500);

    $("#body").emojioneArea({
        pickerPosition: "bottom",
        tonesStyle: "bullet",
        saveEmojisAs: "shortname",
        events: {
            keyup: function (editor, event) {
                // console.log(editor.text());


                // //console.log(editor.getCaretPosition()); // Work Late On Position To Show Suggestions Dropdown
                //// editor.replaceText(/this|that/gi, "the other");
                // // /\B#(\w*[0-9a-zA-Z])/gi Hashtag Regular Expression
                // // editor.replaceText(///#(\w*[0-9a-zA-Z])/gi, "<b>$1</b>");
                // if ((event.keyCode > 65 && event.keyCode < 90) || event.keyCode == 51) {

                //     var afterReplace = editor.html();
                //     afterReplace = afterReplace.replace(new RegExp("<b>", "g"), "");
                //     afterReplace = afterReplace.replace(new RegExp("</b>", "g"), "");
                //     editor.html(afterReplace.replace(new RegExp(/#(\w*[0-9a-zA-Z])/, "g"), "<span style='color: blue'>$1</span>"));
                //     //$(this).html($(this).html().replace(/(#\S+)/, '<span style="color: blue">$1</span>'));
                //     // editor.html(afterReplace.replace(new RegExp("</b>", "g"), ""));
                //     //editor.replaceText(/#(\w*[0-9a-zA-Z])/gi, "<b>$1</b>");

                // }

            }
        }
    });
}

function createPost(e) {

    var $me = $(e);
    if (validate($me)) {
        if ($me.closest(".modal").find("input[type='file']")[0].files.length > 0) {
            var $obj = $me.closest(".modal").find("input[type='file']")[0];
            var formData = new FormData();
            var totalFiles = $obj.files.length;
            for (var i = 0; i < totalFiles; i++) {
                var file = $obj.files[i];
                formData.append("FileUpload", file);
            }
            $.ajax({
                type: "POST",
                url: '/Home/Upload',
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $me.closest(".modal").find(".box-file .box-file-close").remove();
                    $me.closest(".modal").find(".box-file").append('<div class="box-file-close"><i class="fa fa-spinner fa-spin"></i></div>');
                },
                success: function (response) {
                    if (response != "") {
                        $me.closest(".panel").find(".box-file").remove();
                        var Data = { "Title": $("#title").val(), "Category": $me.closest(".modal").find("select option:selected").val(), "Body": $("#body").val(), "FileName": response.split("|")[0], "FileGeneratedName": response.split("|")[1] };
                        runAjax("/Home/InsertPost", Data, true, $(e).closest(".panel"), "full", afterCreatePost, $(e));
                    }
                },
                error: function (error) {
                    alert("Ooops! Something went wrong while uploding");
                }
            });
            $($me.closest(".modal").find("input[type='file']")).replaceWith($me.closest(".modal").find("input[type='file']").clone(true));
        } else {
            var Data = { "Title": $("#title").val(), "Category": $me.closest(".modal").find("select option:selected").val(), "Body": $("#body").val(), "FileName": "", "FileGeneratedName": "" };
            runAjax("/Home/InsertPost", Data, true, $(e).closest(".modal"), "full", afterCreatePost, $(e));
        }
    }
}

function afterCreatePost(data, e) {
    var $me = $(e);
    $me.closest(".modal").find(".btn.btn-default").click();

    //$("#title").val("");
    //$("#body").val("");
    //$me.closest(".modal").find(".emojionearea-editor").empty();
}

function getPostsIFollow(ID, UserID) {
    var Data = { "ID": ID, "UserID": UserID };
    runAjax("/Home/GetPostsIFollow", Data, true, $("body"), "full", setPosts);
}

function getPosts(ID, UserID) {
    for (var i = 0; i < 3; i++) $(".post-div").prepend(getPostMockup());

    var Data = { "ID": ID, "UserID": UserID, "Offset": $(".post-div").attr("data-offset"), "Next": "5" };
    runAjax("/Home/GetPosts", Data, false, $("body"), "full", setPosts);
}
function setPosts(data, e) {
    if (data.length > 0) {
        $(".no-activity, .show-previous-post, .post-div .panel.timeline-item").remove();
        //$(".post-div").empty();

        $(".post-div").attr("data-offset", parseInt($(".post-div").attr("data-offset")) + data.length);



        for (var i = 0; i < data.length; i++) {
            $(".post-div").append(getPostElem(data[i]));
            var $obj = $(".post-div .panel:eq(" + ($(".post-div .panel").length - 1) + ")");
            $obj.find(".post-body").replaceText(/(^|\s)(#[a-z\d][\w-]*)/ig, '<span class="hashtag">$2</span>');

            if ($obj.find(".post-body").height() > 54) {
                $obj.find(".post-showmore").fadeIn();
            } else {
                $obj.find(".post-showmore").fadeOut();
            }
            $(".post-div .panel:eq(" + ($(".post-div .panel").length - 1) + ") .actions .btn-comment").click();

        }


        if ($(".post-div").attr("data-offset") >= data[0].PostCount) {
            // $(".post-div").append('<div class="panel show-previous-post color-hover">No More Posts</div>');
        } else {
            $(".post-div").append('<div class="panel show-previous-post color-hover" onclick="getPosts(' + "0" + ', ' + "0" + ')">Show Previous Posts</div>');
        }
        //$(".post-div").append('<li class="show-previous color-hover" onclick="getPosts(' + "0" + ', ' + "0" + ')">Show Previous Post</li>');
    } else {
        var $elem = '';
        $elem = '<div class="panel panel-default animated fadeIn no-activity">';
        $elem += '<div class="panel-body">';
        $elem += '<h4 class="text-center" style="margin-bottom:10px;">No Activity Found!</h4>';
        $elem += '</div>';
        $elem += '</div>';

        $(".post-div").empty();
        $(".post-div").append($elem);
        //$(".post-div").append('<li class="show-previous color-hover" onclick="getPosts(this);">Show Previous Post</li>');



    }




}

function getPostElem(data) {
    var $elem = '';
    var $dotSpace = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; //&#9679;
    $elem += '<div class="panel panel-default animated fadeIn loading-div" data-id="' + data["ID"] + '" data-type="P" data-user-id="' + data["UserID"] + '" data-offset="0">';
    $elem += '<div class="panel-heading">';
    $elem += '<div class="media">';
    $elem += '<div class="media-left">';
    $elem += '<a href="/Profile/Index/' + data["UserID"] + '">';
    $elem += '<img src="/assets/images/people/' + data["ImgUrl"] + '" class="media-object">';
    $elem += '</a>';
    $elem += '</div>';
    $elem += '<div class="media-body">';
    $elem += '<div class="dropdown">';
    $elem += '<a href="javascript:void(0)" class="pull-right text-muted" data-toggle="dropdown" class="toggle-button"><i class="material-icons" style=" font-size: 20px; ">keyboard_arrow_down</i></a>';
    $elem += '<ul class="dropdown-menu pull-right" role="menu"><li><a href="#">Edit</a></li><li><a href="javascript:void(0)" onclick="showDeletePost(this)">Delete</a></li><li><a href="javascript:void(0)" onclick="createAnAction(this)">Create an action</a></li><li><a href="javascript:void(0)" onclick="showPostInvite(this)">Invite User</a></li></ul>';
    $elem += '</div>';
    $elem += '<a class="color-hover " href="/Profile/Index/' + data["UserID"] + '">' + data["FullName"] + '</a><br />';
    //$elem += '<div class="samp" style="margin-top:2px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</div>';
    $elem += '<div class="samp">' + new Date(data["Date"]).toString("hh:mm tt dd/MMM/yyyy") + '</div>';
    $elem += '</div>';
    $elem += '</div>';
    $elem += '</div>';
    $elem += '<div class="panel-body">';
    $elem += '<div class="post-title"><span>' + data["Title"] + '</span></div>';
    //$elem += '<p>' + data["Body"] + '</p>';

    // $(".fas").text()
    $elem += '<div class="post-body-wrapper">';


    $elem += '<p class="post-body">' + emojione.shortnameToImage(data["Body"]) + '</p>';
    $elem += '</div>';
    $elem += '<a href="javascript:void(0)" class="post-showmore" onclick="seeMore(this);">...show more</a>';
    //post - showmore
    //$elem += '<p>' + emojione.toImage(data["Body"]) + '</p>';

    if (data["OrignalNames"] != "") {
        var splitOrignalNames = data["OrignalNames"].split(":");
        var splitGeneratedNames = data["GeneratedNames"].split(":");
        for (var i = 0; i < splitOrignalNames.length - 1; i++) {
            $elem += '<div class="file-preview-frame">';

            $elem += '<div class="file-content">';
            var $ext = getExtensionFromFileName(splitOrignalNames[i]);
            if ($ext.toLowerCase() == "jpg" || $ext.toLowerCase() == "png" || $ext.toLowerCase() == "jpeg") {
                $elem += '<img width="150" height="140" src="/uploads/files/' + splitGeneratedNames[i] + '" />';
            } else {
                $elem += '<i class="fa fa-file fa-5x"></i>';
            }
            $elem += '</div>';
            //$elem += '<div class="file-thumbnail-footer">';
            //$elem += '<div class="file-footer-caption" title="Help file.pdf">Help file.pdf</div>';
            $elem += '<div class="file-actions">';
            $elem += '<div class="file-footer-buttons">';
            $elem += '<button type="button" class="kv-file-zoom btn btn-xs btn-default" title="Download"><i class="fa fa-download" aria-hidden="true"></i></button></div>';
            //$elem += '<div class="clearfix"></div>';
            //$elem += '</div>';
            $elem += '</div>';

            $elem += '</div>';


            // $elem += '<a href="/uploads/files/' + splitGeneratedNames[i] + '">' + splitOrignalNames[i] + '</a>';
        }

        //console.log(splitOrignalNames);
        //console.log(splitGeneratedNames);
        //$elem += data["OrignalNames"];
        //$elem += data["GeneratedNames"];
    }
    //$elem += '<div class="timeline-added-images">';
    //$elem += '<img src="/assets/images/social/100/1.jpg" width="80" alt="photo" />';
    //$elem += '<img src="/assets/images/social/100/2.jpg" width="80" alt="photo" />';
    //$elem += '<img src="/assets/images/social/100/3.jpg" width="80" alt="photo" />';
    //$elem += '</div>';
    $elem += '</div>';



    $elem += '<div class="actions-count" >';

    $elem += '<span class="color-hover follow-count" onclick="showPostFollows(this)">';
    if (data["FollowCount"] > 0) {
        $elem += data["FollowCount"] + ' Follower';
        if (data["FollowCount"] > 1) $elem += 's';
    }
    $elem += '</span>';

    if ((data["FollowCount"] > 0 && data["CommentCount"] > 0) || (data["FollowCount"] > 0 && data["ArchiveCount"] > 0))
        $elem += '<span class="dot-space">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>';
    else $elem += '<span class="dot-space"></span>';

    $elem += '<span class="color-hover btn-comment comment-action comment-count" onclick="showHideComments(this);">';
    if (data["CommentCount"] > 0) {
        $elem += data["CommentCount"] + ' Comment';
        if (data["CommentCount"] > 1) $elem += 's';
    }
    $elem += '</span>';

    if (data["CommentCount"] > 0 && data["ArchiveCount"] > 0)
        $elem += '<span class="dot-space">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>';
    else $elem += '<span class="dot-space"></span>';

    $elem += '<span class="color-hover archive-count" onclick="showPostAllAttachments(this);">';
    if (data["ArchiveCount"] > 0) {
        $elem += data["ArchiveCount"] + ' Archive';
        if (data["ArchiveCount"] > 1) $elem += 's';
    }
    $elem += '</span>';



    /*temporary */
    if (data["ID"] == "28") {
        if (data["FollowCount"] > 0 && data["CommentCount"] > 0) $elem += '<span class="dot-space">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>';
        else $elem += '<span class="dot-space"></span>';
        $elem += '<span class="color-hover" onclick="showOrganization(this);">';

        $elem += '3 Organizations follow';
        $elem += '</span>';

    }

    //if (data["FollowCount"] > 0 || data["CommentCount"] > 0) {
    //    if (data["FollowCount"] > 0) {
    //        $elem += '<span class="color-hover follow-count" onclick="showPostFollows(this)">' + data["FollowCount"] + ' Follower';
    //        if (data["FollowCount"] > 1) $elem += 's';
    //        $elem += '</span>';
    //    }
    //    if (data["FollowCount"] > 0 && data["CommentCount"] > 0) $elem += '<span class="dot-space">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>';
    //    if (data["CommentCount"] > 0) {
    //        $elem += '<span class="color-hover btn-comment comment-action" onclick="showHideComments(this);">' + data["CommentCount"] + ' Comment';
    //        if (data["CommentCount"] > 1) $elem += 's';
    //        $elem += '</span>';
    //    }
    //}
    $elem += '</div>';

    $elem += '<div class="actions" > ';
    //var $countClass = "count";
    //var $isCountClass = "";
    //if (data["FollowCount"] > 0) $isCountClass = $countClass; else $isCountClass = "";

    if (data["IsMyFollow"] == 0) $elem += '<span onclick="insertPostFollow(this);" class="color-hover btn-follow"><i class="material-icons">favorite_border</i> Follow</span>';
    else $elem += '<span onclick="insertPostFollow(this);" class="color-hover btn-follow follow-action"><i class="material-icons">favorite</i> Unfollow</span>';

    $elem += $dotSpace;

    //if (data["CommentCount"] > 0) $isCountClass = $countClass; else $isCountClass = "";

    $elem += '<span onclick="showHideComments(this);" class="color-hover btn-comment comment-action"><i class="material-icons">forum</i> Comment</span>';
    $elem += $dotSpace;

    $elem += '<span onclick="showPostAllAttachments(this);" class="color-hover"><i class="material-icons">archive</i> Archive</span>';
    $elem += $dotSpace;


    //$elem += '<span class="dropup">';
    //$elem += '<span class="text-muted" data-toggle="dropdown" class="toggle-button"><i class="material-icons">more_horiz</i> More</span>';
    //$elem += '<ul class="dropdown-menu" role="menu">';
    //$elem += '<li><a href="javascript:void(0)" onclick="todo(this)">Write a comment</a></li>';
    //$elem += '<li><a href="javascript:void(0)" onclick="todo(this)">Attach a file</a></li>';
    //$elem += '<li><a href="javascript:void(0)" onclick="todo(this)">Take an action</a></li>';
    ////$elem += '<li><a href="javascript:void(0)" onclick="todo(this)">Share</a></li></ul>';
    //$elem += '</span>';

    //$elem += '<span onclick="todo(this);" class="color-hover"><i class="material-icons">accessibility</i> Take an action</span>';
    //$elem += $dotSpace;

    //$elem += '<span onclick="todo(this);" class="color-hover"><i class="material-icons">share</i> Share</span>';
    $elem += '</div>';

    $elem += '</div>';
    return $elem;
}

function seeMore(e) {
    var $me = $(e);
    var $obj = $me.closest(".panel").find(".post-body-wrapper");
    if ($obj.height() > 56) {
        $obj.css("max-height", "56px");
        $me.text("...show more");
    } else {

        $obj.css("max-height", $obj.find(".post-body").height() + "px");
        $me.text("...show less");
    }
}

function seeMoreComment(e) {
    var $me = $(e);
    var $obj = $me.closest(".media-body").find(".comment-body-wrapper");
    if ($obj.height() > 53) {
        $obj.css("max-height", "53px");
        $me.text("...show more");
    } else {
        $obj.css("max-height", $obj.closest(".media-body").find(".comment").height() + "px");
        $me.text("...show less");
    }
}




function todo(e) {
    showModal(true, true, true, "Alert", "<h4 class='text-center'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Sorry! This feature is not available yet. please check back in the future</h4>", "");
}
function showHideComments(e) {
    var $me = $(e);
    var $obj = $me.closest(".panel");
    var $elem = '';

    $elem += '<ul class="comments animated fadeIn">';


    $elem += '<li class="comment-form">';
    $elem += '<div class="fa fa-paperclip fileinput-button comment-attachment">';
    $elem += '<input onchange="checkCommentFile(this);" multiple="multiple" type="file">';
    $elem += ' </div>';

    $elem += '<a href="/Profile/Index/1">';
    $elem += '<img src="/assets/images/people/fasih.jpg" class="media-object pull-left">';
    $elem += '</a>';

    $elem += '<input type="text" class="form-control comment-body form-group"  onkeydown="if (event.keyCode==13){ event.preventDefault(); insertComment(this); }"/>';



    $elem += '<div class="row">';
    $elem += '<div class="col-md-12 file-div"></div></div>';
    $elem += '</li>';
    $elem += '</ul>';

    if ($obj.find(".comments").length > 0) {
        $obj.find(".comments").remove();
        $obj.find(".comment-filter").remove();

        $obj.attr("data-offset", "0");
    } else {
        $me.closest(".panel").append($elem);
    }

    getComment($me);
    // getCommentByCount($me);
    //$(".selectpicker").selectpicker();

    //$($me.closest(".panel").find(".comments .comment-body")).emojioneArea({

    //    pickerPosition: "top",
    //    tonesStyle: "bullet",
    //    saveEmojisAs: "shortname",
    //    events: {
    //        keyup: function (editor, event) {
    //            if (event.keyCode == 13) {
    //                //console.log("reviewing text: " + editor.text())
    //                insertComment(editor);
    //            }
    //            //do some stuff with editor.text()
    //        }
    //    }

    //});


}
function showCreateComment(e) {
    var $me = $(e);
    var $obj = $me.closest(".panel");
    var $bodyElem = '';
    var $footerElem = '';
    $bodyElem += '<div class="row" >';
    $bodyElem += '<div class="col-md-12">';
    $bodyElem += '<div class="form-group">';
    $bodyElem += '<label for="body">Comment</label>';


    $bodyElem += '<textarea class="txt-comment"></textarea>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';


    $footerElem += '<button type="button" class="btn btn-primary" onclick="insertComment(this);" data-id="'
        + $obj.data("id") + '" data-type="' + $obj.data("type") + '">Submit</button>';

    showModal(true, true, true, "Write A Comment", $bodyElem, $footerElem);

    $(".txt-comment").emojioneArea({
        pickerPosition: "bottom",
        tonesStyle: "bullet",
        saveEmojisAs: "shortname",
    });

    $(".emojionearea-editor").focus();

}

function showCreateShareFiles(e) {
    var $me = $(e);

    var $me = $(e);
    var $obj = $me.closest(".panel");
    var $bodyElem = '';
    var $footerElem = '';
    $bodyElem += '<div class="row" >';
    $bodyElem += '<div class="col-md-12">';
    $bodyElem += '<div class="form-group">';
    $bodyElem += '<label for="body">Description</label>';


    $bodyElem += '<input type="text" class="txt-comment form-control"></textarea>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="form-group">';
    $bodyElem += '<label for="body">Attachment</label>';
    $bodyElem += '<input id="file-5" class="file" type="file" multiple data-preview-file-type="any" data-upload-url="#">';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';


    $footerElem += '<button type="button" class="btn btn-primary" onclick="insertCommentAttachment(this);" data-id="'
        + $obj.data("id") + '" data-type="' + $obj.data("type") + '">Submit</button>';

    showModal(true, true, true, "Share Files", $bodyElem, $footerElem);
}

function checkCommentFile(e) {
    var $me = $(e);

    if (e.files.length > 0) {
        var $bodyElem = '';
        $bodyElem += '<div class="row">'; $bodyElem += '<div class="col-md-12">';
        $bodyElem += '<div class="form-group">';
        $bodyElem += '<label for="body">Description</label>';
        $bodyElem += '<textarea type="text" class="txt-description form-control"></textarea>';
        $bodyElem += '</div>';

        for (var i = 0; i < e.files.length; i++) {
            files = e.files[i];
            if (files) {

                $bodyElem += '<div class="file-preview-frame">';
                $bodyElem += '<div class="file-content">';
                $bodyElem += '<i class="fa fa-file fa-4x"></i>';
                $bodyElem += '</div>';
                $bodyElem += '</div>';

                //$elem += '<div class="box-file">';
                //$elem += '<div class="box-file-name truncate" title="' + files.name + '">' + files.name + '</div>';
                //// $elem += '<div class="box-file-close" onclick="closeAttachment(this);">✖</div>';
                //$elem += '</div>';
                //$obj.append($elem);
                //$me.closest(".panel").find(".comment-body").focus();
            }
        }
        $bodyElem += '</div></div>'
        var $footerElem = '<button type="button" class="btn btn-primary" onclick="insertCommentAttachment(this , ' + $me.closest(".panel").attr("data-id") + ');">Submit</button>';
        showModal(true, true, true, "Share Files", $bodyElem, $footerElem);
    }
}

function getComment(e) {
    var $me = $(e);
    var $obj = $me.closest(".panel");
    var Data = { "ID": "", "RefID": $obj.data("id"), "RefType": $obj.data("type") };
    runAjax("/Home/GetComment", Data, false, $obj, "full", setComment, $me);
}

function getCommentByCount(e) {
    var $me = $(e);
    var $obj = $me.closest(".panel");
    var Data = { "ID": "", "RefID": $obj.data("id"), "RefType": $obj.data("type"), "Offset": $obj.attr("data-offset"), "Next": $obj.attr("data-offset") == "0" ? startCommentCount : afterCommentCount };
    runAjax("/Home/GetCommentsByCount", Data, false, $obj, "full", setComment, $me);
}

function insertComment(e) {
    var $me = $(e);
    var $obj = $me.closest(".panel");

    if ($obj.find(".comment-body").val().length > 0) {
        //if ($obj.find("input[type='file']")[0].files.length > 0) {
        //    var $fileObj = $obj.find("input[type='file']")[0];
        //    var formData = new FormData();
        //    var totalFiles = $fileObj.files.length;
        //    for (var i = 0; i < totalFiles; i++) {
        //        var file = $fileObj.files[i];
        //        formData.append("FileUpload", file);
        //    }
        //    $.ajax({
        //        type: "POST",
        //        url: '/Home/Upload',
        //        data: formData,
        //        dataType: 'json',
        //        contentType: false,
        //        processData: false,
        //        success: function (response) {
        //            if (response != "") {
        //                var Data = { "RefID": $obj.data("id"), "RefType": $obj.data("type"), "Body": $me.val(), "FileName": response.split("|")[0], "FileGeneratedName": response.split("|")[1] };
        //                //$obj.find("input[type='text']").val("");
        //                $me.val("");
        //                //$obj.find(".emojionearea-editor").text("");
        //                //$me.empty();
        //                runAjax("/Home/InsertComment", Data, true, $obj, "full", afterInsertComment, $me);
        //            }
        //            $($me.closest(".panel").find("input[type='file']")).replaceWith($me.closest(".panel").find("input[type='file']").clone(true));
        //        },
        //        error: function (error) {
        //            alert("Ooops! Something went wrong while uploding");
        //        }
        //    });
        //} else {
        var Data = { "RefID": $obj.data("id"), "RefType": $obj.data("type"), "Body": $me.val(), "FileName": "", "FileGeneratedName": "" };
        $me.val("");
        runAjax("/Home/InsertComment", Data, true, $obj, "full", afterInsertComment, $me);
        //}
    } else {
        shake($me, 3, 5, 35);
        //e, shakes, distance, duration
    }


}

function afterInsertComment(data, e) {
    var $me = $(e);
    $me.closest(".panel").find(".file-div").empty();
    //closeModal(e);
}

function setComment(data, e) {
    var $me = $(e);
    var $obj = $me.closest(".panel").find("ul.comments");
    $obj.find("li.text-center, li.show-previous").remove();
    var $obj2 = $me.closest(".panel").find(".comment-action");
    var $elemArray = [];

    if (data.length > 0) {
        $obj.closest(".panel").attr("data-offset", parseInt($obj.closest(".panel").attr("data-offset")) + data.length);
        if ($obj.closest(".panel").attr("data-offset") >= data[0].CommentCount) {
            $obj.prepend('<li class="show-previous no-padding"></li>');
        } else {
            $obj.prepend('<li class="show-previous color-hover" onclick="getCommentByCount(this);">Show Previous Comments</li>');
        }

        for (var i = 0; i < data.length; i++) {
            // $elemArray.push();
            $obj.find(".show-previous").after(getCommentsElem(data[i]));
            $obj.find(".media:last .comment").replaceText(/(^|\s)(#[a-z\d][\w-]*)/ig, '<span class="hashtag">$2</span>');



            if ($obj.find(".media:eq(0) .comment").height() > 53) {
                $obj.find(".media:eq(0) .post-showmore").fadeIn();
            } else {
                $obj.find(".media:eq(0) .post-showmore").fadeOut();
            }

            if (data[i].CommentCount > 0) {
                if (!($obj2.hasClass("count"))) $obj2.addClass("count");
            }
            else $obj2.removeClass("count");
            $obj2.attr("data-count", data[i].CommentCount);
        }
    } else {
        $obj.prepend('<li class="show-previous no-padding"></li>');
        $obj.find(".show-previous").after('<li class="text-center"><h4>No Comments Yet!</h4></li>');
        $obj2.removeClass("count");
    }

    $(".comment-date").timeago();


    //$('.tooltip-name').tooltipster({
    //    content: 'Loading...',
    //    contentAsHTML: true,
    //    theme: 'tooltipster-noir',
    //    interactive: true,
    //    side: ["top", "bottom"],
    //    functionBefore: function (instance, helper) {
    //        var $origin = $(helper.origin);
    //        if ($origin.data('loaded') !== true) {
    //            $.ajax({
    //                type: "POST",
    //                url: '/Home/GetUserProfileDetails',
    //                data: { UserID: "1" },
    //                dataType: "json",
    //                success: function (response) {


    //                    var $elem = '';

    //                    $elem += '<img src="/assets/images/people/' + response.Table[0].ImageUrl + '" width="100"/>';
    //                    $elem += '<strong style="padding: 10px;">' + response.Table[0].FirstName + " " + response.Table[0].LastName + '</strong>';



    //                    instance.content($elem);
    //                    /*$origin.data('loaded', true);*/
    //                },
    //                error: function (xhr) { console.log(xhr.responseText); }
    //            });
    //        }
    //    }
    //});

}

function getCommentsElem(data) {
    var $elem = '';

    var $dotSpace = '&nbsp;&nbsp;&nbsp;&nbsp;'; //&#9679;

    $elem += '<li class="media" data-id="' + data["CommentID"] + '" onmouseover="showSettingIcon(this)" onmouseout="hideSettingIcon(this)">';
    $elem += '<div class="media-left">';
    $elem += '<a href="/Profile/Index/' + data["UserID"] + '">';
    $elem += '<img src="/assets/images/people/' + data["ImgUrl"] + '" class="media-object">';
    $elem += '</a>';
    $elem += '</div>';
    $elem += '<div class="media-body">';

    if (data["UserID"] != "") {
        $elem += '<div class="pull-right dropdown comment-setting hidden" data-show-hover="li">';
        $elem += '<a href="#" data-toggle="dropdown" class="toggle-button">';
        $elem += '<i class="fa fa-pencil"></i>';
        $elem += '</a>';
        $elem += '<ul class="dropdown-menu pull-right" role="menu">';

        $elem += '<li><a href="javascript:void(0)" onclick="showCommentEditPopup(this);">Edit</a></li>';
        $elem += '<li><a href="javascript:void(0)" onclick="showCommentDeletePopup(this);">Delete</a></li>';


        $elem += '</ul>';
        $elem += '</div>';
    }


    $elem += '<div class="comment-body-wrapper">';
    $elem += '<a data-id="' + data["UserID"] + '" href="/Profile/Index/' + data["UserID"] + '" class="color-hover comment-author pull-left tooltip-name" >' + data["FullName"] + '</a>';

    $elem += '<span class="comment">' + emojione.toImage(data["Comment"]) + '</span>';
    if (data["OrignalNames"]) {
        if (data["OrignalNames"] != "") {
            var splitOrignalNames = data["OrignalNames"].split(":");
            $elem += '<div class="pull-right" >';
            $elem += '<a href="javascript:void(0)" class="toggle-button" onclick="showCommentAttachments(this)">';
            $elem += splitOrignalNames.length - 1 + ' <i class="fa fa-paperclip fa-lg"></i>';
            $elem += '</a>';
            $elem += '</div>';
        }
    }



    $elem += '</div>';


    $elem += '<a href="javascript:void(0)" class="post-showmore" onclick="seeMoreComment(this);">...show more</a>';
    $elem += '<div class="comment-action">';


    var $activeClass = "active";
    var $countClass = "count";
    var $isActiveClass = "";
    var $isCountClass = "";

    $elem += '<span class="comment-date" title="' + data["CommentDate"] + '">' + data["CommentDate"] + '</span>';
    $elem += $dotSpace;

    if (data["IsMyEndorse"] > 0) $isActiveClass = $activeClass; else $isActiveClass = "";
    $elem += '<span class="color-hover ' + $isActiveClass + '" onclick="insertCommentEndorse(this);">Endorse</span>';
    $elem += $dotSpace;

    if (data["IsMySupport"] > 0) $isActiveClass = $activeClass; else $isActiveClass = "";
    $elem += '<span class="color-hover btn-support ' + $isActiveClass + '" onclick="insertCommentSupport(this);">Support</span>';
    $elem += $dotSpace

    var $isFullStar = "";
    if (data["IsMyStar"] > 0) { $isActiveClass = $activeClass; $isFullStar = "star" } else { $isActiveClass = ""; $isFullStar = "star_border" }
    $elem += '<span class="color-hover btn-star ' + $isActiveClass + ' " onclick="insertCommentFlagged(this);" title="Highlight Message"><i class="material-icons">' + $isFullStar + '</i></span>';

    if (data["EndorseCount"] > 0 || data["SupportCount"] > 0) { $elem += '<span class="line-separator now"></span>'; }
    else { $elem += '<span class="line-separator"></span>'; }


    $elem += '<span class="comment-actions-count" >';
    $elem += '<span class="color-hover endorse-count" onclick="showCommentEndorse(this)">';
    if (data["EndorseCount"] > 0) {
        $elem += data["EndorseCount"] + ' Endose';
        if (data["EndorseCount"] > 1) $elem += 's';
    }
    $elem += '</span>';

    if (data["EndorseCount"] > 0 && data["SupportCount"] > 0) $elem += '<span class="dot-space">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>';
    else $elem += '<span class="dot-space"></span>';
    $elem += '<span class="color-hover support-count" onclick="showCommentSupport(this)">';
    if (data["SupportCount"] > 0) {
        $elem += data["SupportCount"] + ' Support';
        if (data["SupportCount"] > 1) $elem += 's';
    }
    $elem += '</span>';
    $elem += '</span>';
    $elem += '</div>';
    $elem += '</div>';
    $elem += '</li>';
    return $elem;
}

/*Post Follow*/
function insertPostFollow(e) {
    var $me = $(e);
    var $obj = $me.closest(".panel");

    var Data = { "RefID": $obj.data("id") };
    runAjax("/Home/InsertPostFollow", Data, false, $obj, "full", setPostFollow, $me);
}

function setPostFollow(data, e) {
    var $me = $(e);
    if (data.length > 0) {

        //if (data[0].FollowCount > 0) {
        //    if (!($me.hasClass("count"))) $me.addClass("count");
        //}
        //else $me.removeClass("count");
        //$me.attr("data-count", data[0].FollowCount);

        if (data[0].Action == "Delete") {
            $me.empty();
            $me.append('<i class="material-icons">favorite_border</i> Follow');


        } else if (data[0].Action == "Add") {
            $me.empty();
            $me.append('<i class="material-icons">favorite</i> Unfollow');
        }
    }
}

function insertCommentFlagged(e) {
    var $me = $(e);
    var $obj = $me.closest("li.media");

    var Data = { "RefID": $obj.data("id") };
    runAjax("/Home/InsertCommentFlag", Data, true, $obj, "full", setCommentFlagged, $me);
}

function setCommentFlagged(data, e) {
    var $me = $(e);
    if (data.length > 0) {

        //if (data[0].FlaggedCount > 0) {
        //    if (!($me.hasClass("count"))) $me.addClass("count");
        //}
        //else $me.removeClass("count");
        //$me.attr("data-count", data[0].FlaggedCount);

        if (data[0].Action == "Delete") {
            $me.removeClass("active");
            $me.find("i.material-icons").text("star_border")
        } else if (data[0].Action == "Add") {
            $me.addClass("active");
            $me.find("i.material-icons").text("star")
        }
    }
}

function insertCommentSupport(e) {
    var $me = $(e);
    var $obj = $me.closest("li.media");

    var Data = { "RefID": $obj.data("id") };
    runAjax("/Home/InsertCommentSupport", Data, true, $obj, "full", setCommentSupport, $me);
}
function setCommentSupport(data, e) {
    var $me = $(e);
    if (data.length > 0) {
        //if (data[0].SupportCount > 0) {
        //    if (!($me.hasClass("count"))) $me.addClass("count");
        //}
        //else $me.removeClass("count");
        //$me.attr("data-count", data[0].SupportCount);
        if (data[0].Action == "Delete") {
            $me.removeClass("active");
        } else if (data[0].Action == "Add") {
            $me.addClass("active");
        }
    }
}
function insertCommentEndorse(e) {
    var $me = $(e);
    var $obj = $me.closest("li.media");

    var Data = { "RefID": $obj.data("id") };
    runAjax("/Home/InsertCommentEndorse", Data, true, $obj, "full", setCommentEndose, $me);
}
function setCommentEndose(data, e) {
    var $me = $(e);
    if (data.length > 0) {
        //if (data[0].SupportCount > 0) {
        //    if (!($me.hasClass("count"))) $me.addClass("count");
        //}
        //else $me.removeClass("count");
        //$me.attr("data-count", data[0].SupportCount);
        if (data[0].Action == "Delete") {
            $me.removeClass("active");
        } else if (data[0].Action == "Add") {
            $me.addClass("active");
        }
    }
}

function changeOnImage(e) {
    var $me = $(e);
    $me.attr("src", "/assets/images/goals-images/" + $me.data("img-id") + ".png");
}
function changeOutImage(e) {
    var $me = $(e);
    $me.attr("src", "/assets/images/goals-images/I" + $me.data("img-id") + ".png");
}

function showPostFollows(e) {
    var $me = $(e);
    var $obj = $me.closest(".panel");
    var Data = { "RefID": $obj.data("id") };
    runAjax("/Post/GetPostFollows", Data, true, $obj, "full", showPostFollowers, $me);

}
function getModalListLi(data) {
    $bodyElem = '';
    $bodyElem += '<li>';
    $bodyElem += '<div class="media-left"><a href="/Profile/Index/' + data["ID"] + '"><img src="/assets/images/people/' + data["ImgUrl"] + '" width="40" height="40" class="media-object img-circle"></a></div>';
    $bodyElem += '<div class="media-body">';
    //$bodyElem += '<div class="pull-right">Fasih</div>';
    $bodyElem += '<a class="user-name" href="/Profile/Index/' + data["ID"] + '">' + data["FirstName"] + "  " + data["LastName"] + '</a>';
    // $bodyElem += '<div class="user-details">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</div>';
    $bodyElem += '</div>';
    $bodyElem += '</li>';

    return $bodyElem;
}
function showPostFollowers(data, e) {
    var $me = $(e);

    if (data.length > 0) {
        var $bodyElem = '';
        $bodyElem += '<ul class="modal-group-list">';
        for (var i = 0; i < data.length; i++) {
            $bodyElem += getModalListLi(data[i]);
        }
        $bodyElem += '</ul>';
        showModal(true, true, true, "Post Followers", $bodyElem, "");
    } else
        console.log("No Followers");
}

function showCommentSupport(e) {
    var $me = $(e);
    var $obj = $me.closest("li.media");
    var Data = { "RefID": $obj.data("id") };
    runAjax("/Post/GetCommentSupport", Data, true, $obj, "full", showCommentSupporters, $me);
}

function showCommentSupporters(data, e) {
    var $me = $(e);
    if (data.length > 0) {
        var $bodyElem = '';
        $bodyElem += '<ul class="modal-group-list">';
        for (var i = 0; i < data.length; i++) {
            $bodyElem += getModalListLi(data[i]);
        }
        $bodyElem += '</ul>';
        showModal(true, true, true, "Comment Support", $bodyElem, "");
    } else {
        console.log("No Support");
    }
}

function showCommentEndorse(e) {
    var $me = $(e);
    var $obj = $me.closest("li.media");
    var Data = { "RefID": $obj.data("id") };
    runAjax("/Post/GetCommentEndorse", Data, true, $obj, "full", showCommentEndorsers, $me);

}

function showCommentEndorsers(data, e) {
    var $me = $(e);

    if (data.length > 0) {
        var $bodyElem = '';
        $bodyElem += '<ul class="modal-group-list">';
        for (var i = 0; i < data.length; i++) {
            $bodyElem += getModalListLi(data[i]);
        }
        $bodyElem += '</ul>';
        showModal(true, true, true, "Comment Endorse", $bodyElem, "");
    } else {
        console.log("No Endorse");
    }
}

function showDeletePost(e) {
    var $me = $(e);

    var $obj = $me.closest(".panel");
    $obj.attr("data-height", $obj.outerHeight());
    var $elem = '';
    $elem += '<div class="overlay-full">';
    $elem += '<div class="modal-content">';
    $elem += '<div class="modal-header">';
    $elem += '<h4 class="modal-title">Delete Post</h4>';
    $elem += '</div>';
    $elem += '<div class="modal-body">';
    $elem += 'This post will be deleted and you\'ll no longer be able to find it. You can also edit this post if you just want to change something.';
    $elem += '</div>';
    $elem += '<div class="modal-footer">';
    $elem += '<button type="button" class="btn btn-default pull-left" onclick="closePostModal(this)">Close</button>';
    $elem += '<button type="button" class="btn btn-default pull-right" onclick="closeModal(this)">Delete Post</button>';
    $elem += '<button type="button" class="btn btn-primary pull-right" onclick="closeModal(this)">Edit Post</button>';
    $elem += '</div>';
    $elem += '</div>';
    $elem += '</div>';
    $obj.append($elem);
    $obj.find(".overlay-full").fadeIn("fast");

    $obj.animate({ height: $obj.find(".overlay-full .modal-content").outerHeight() + parseInt($(".overlay-full .modal-content").css("margin-top").split('p')[0]) * 2 }, "fast");
}

function closePostModal(e) {
    var $me = $(e);
    $me.closest(".panel").animate({ height: $me.closest(".panel").attr("data-height") }, "fast", function () {
        $(this).removeAttr("style");
    });
    $me.closest(".overlay-full").fadeOut("fast", function () {
        $(this).remove();
    });
}

function showCommentAttachments(e) {
    var $me = $(e);
    var Data = { "RefID": $me.closest(".media").data("id"), "RefType": "C" };
    runAjax("/Post/GetAttachments", Data, false, "", "", setCommentAttachments, $me);
}

function setCommentAttachments(data, e) {
    var $me = $(e);

    if (data.length > 0) {
        if (data[0]["OrignalNames"] != "") {
            var $elem = '';
            var splitOrignalNames = data[0]["OrignalNames"].split(":");
            var splitGeneratedNames = data[0]["GeneratedNames"].split(":");
            $elem += '<div class="row">'; $elem += '<div class="col-md-12">';
            for (var i = 0; i < splitOrignalNames.length - 1; i++) {
                $elem += '<div class="file-preview-frame">';
                $elem += '<div class="file-content">';
                var $ext = getExtensionFromFileName(splitOrignalNames[i]);
                if ($ext.toLowerCase() == "jpg" || $ext.toLowerCase() == "png" || $ext.toLowerCase() == "jpeg")
                    $elem += '<img width="150" height="140" src="/uploads/files/' + splitGeneratedNames[i] + '" />';
                else
                    $elem += '<i class="fa fa-file fa-5x"></i>';
                $elem += '</div>';
                $elem += '<div class="file-actions">';
                $elem += '<div class="file-footer-buttons">';
                $elem += '<button type="button" class="kv-file-zoom btn btn-xs btn-default" title="Download"><i class="fa fa-download" aria-hidden="true"></i></button></div>';
                $elem += '</div>';
                $elem += '</div>';
            }
            $elem += '</div>';
            $elem += '</div>';
            showModal(true, true, true, "Attachments", $elem, "");
        }
    }
}

function showPostAllAttachments(e) {
    var $me = $(e);
    var Data = { "RefID": $me.closest(".panel").data("id") };
    runAjax("/Post/GetPostAllAttachment", Data, false, "", "", setArchiveAttachment, $me);
}

function setArchiveAttachment(data, e) {
    var $me = $(e);

    if (data.length > 0) {
        var $elem = '';
        $elem += '<table class="table">';
        $elem += '<thead>';
        $elem += '<tr>';
        $elem += '<th style="width:20%">Name</th>';
        $elem += '<th style="width:20%">Date</th>';
        $elem += '<th style="width:20%">Description</th>';
        $elem += '<th style="width:40%">Preview</th>';
        $elem += '</tr>';
        $elem += '</thead>';
        $elem += '<tbody>';
        for (var i = 0; i < data.length; i++) {
            if (data[i]["OrignalNames"] != "") {

                var splitOrignalNames = data[i]["OrignalNames"].split(":");
                var splitGeneratedNames = data[i]["GeneratedNames"].split(":");
                $elem += '<tr>';
                $elem += '<td>' + data[i]["FullName"] + '</td>';
                $elem += '<td>' + new Date(data[i]["Date"]).toString("hh:mm tt dd/MMM/yyyy") + '</td>';
                $elem += '<td>' + data[i]["Description"] + '</td>';
                $elem += '<td style="display: table;">';

                for (var j = 0; j < splitOrignalNames.length - 1; j++) {


                    $elem += '<div class="file-preview-frame">';
                    $elem += '<div class="file-content">';
                    var $ext = getExtensionFromFileName(splitOrignalNames[j]);
                    if ($ext.toLowerCase() == "jpg" || $ext.toLowerCase() == "png" || $ext.toLowerCase() == "jpeg")
                        $elem += '<img width="150" height="140" src="/uploads/files/' + splitGeneratedNames[j] + '" />';
                    else
                        $elem += '<i class="fa fa-file fa-5x"></i>';
                    $elem += '</div>';
                    //$elem += '<div class="file-actions">';
                    //$elem += '<div class="file-footer-buttons">';
                    //$elem += '<button type="button" class="kv-file-zoom btn btn-xs btn-default" title="Download"><i class="fa fa-download" aria-hidden="true"></i></button></div>';
                    //$elem += '</div>';
                    $elem += '</div>';
                }
                $elem += '</td>';
                $elem += '</tr>';
            }
        }
        $elem += '</tbody>';
        $elem += '</table>';
        showModal(true, true, true, "Attachments", $elem, "");

        setOverflowToLastModal();
    } else
        showModal(true, true, true, "Attachments", "<h3 class='text-center'>No Attachment found</h3>", "");
}

function showOrganization(e) {
    var $bodyElem = '';
    $bodyElem += '<ul class="modal-group-list">';
    $bodyElem += '<li>';
    $bodyElem += '<div class="media-left"><a href="#"><img src="/assets/images/people/P.png" width="40" height="40" class="media-object img-circle"></a></div>';
    $bodyElem += '<div class="media-body">';
    $bodyElem += '<a class="user-name" href="#">Unilever (CSR)</a>';
    $bodyElem += '</div>';
    $bodyElem += '</li>';

    $bodyElem += '<li>';
    $bodyElem += '<div class="media-left"><a href="#"><img src="/assets/images/people/P.png" width="40" height="40" class="media-object img-circle"></a></div>';
    $bodyElem += '<div class="media-body">';
    $bodyElem += '<a class="user-name" href="#">Pakistan citizen foundation (NGO)</a>';
    $bodyElem += '</div>';
    $bodyElem += '</li>';

    $bodyElem += '<li>';
    $bodyElem += '<div class="media-left"><a href="#"><img src="/assets/images/people/P.png" width="40" height="40" class="media-object img-circle"></a></div>';
    $bodyElem += '<div class="media-body">';
    $bodyElem += '<a class="user-name" href="#">Abbot (CSR)</a>';
    $bodyElem += '</div>';
    $bodyElem += '</li>';
    $bodyElem += '</ul>';
    showModal(true, true, true, "Organization", $bodyElem, "");
}

function showInviteModal(e) {
    var $me = $(e);

    var $bodyElem = '';

    $bodyElem += '<div class="form-group">';
    $bodyElem += '<label for="email">Email address:</label>';
    $bodyElem += '<input type="email" class="form-control" id="email">';
    $bodyElem += '</div>';

    $bodyElem += '<div class="text-right"><span class="color-hover" onclick="addMoreInviteEmail(this)">Add More</span></div>';
    showModal(true, true, true, "Invitation", $bodyElem, "");
}

function addMoreInviteEmail(e) {
    var $me = $(e);
    $elem = "";

    $elem += '<div class="form-group">';
    $elem += '<label for="email">Email address:</label>';
    $elem += '<input type="email" class="form-control" id="email">';
    $elem += '</div>';
    $me.closest("div").before($elem);

    if ($me.closest(".modal-body").find(".form-group").length > 4) {
        $me.fadeOut("fast", function () {
            $(this).remove();
        })
    }
}

function showSettingIcon(e) {
    var $me = $(e);

    $me.closest("ul").find(".comment-setting").removeClass("hidden");
    $me.closest("ul").find(".comment-setting").addClass("hidden");
    $me.find(".comment-setting").removeClass("hidden");
}

function hideSettingIcon(e) {
    var $me = $(e);
    $me.closest("ul").find(".comment-setting").removeClass("hidden");
    $me.closest("ul").find(".comment-setting").addClass("hidden");
}

function insertCommentAttachment(e, id) {
    var $me = $(e);
    var $obj = $(".post-div .panel[data-id='" + id + "']");

    if ($me.closest(".modal").find(".txt-description").val().length > 0) {
        if ($obj.find("input[type='file']")[0].files.length > 0) {
            var $fileObj = $obj.find("input[type='file']")[0];
            var formData = new FormData();
            var totalFiles = $fileObj.files.length;
            for (var i = 0; i < totalFiles; i++) {
                var file = $fileObj.files[i];
                formData.append("FileUpload", file);
            }
            $.ajax({
                type: "POST",
                url: '/Home/Upload',
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response != "") {
                        var Data = { "RefID": $obj.data("id"), "Description": $me.closest(".modal").find(".txt-description").val(), "FileName": response.split("|")[0], "FileGeneratedName": response.split("|")[1] };
                        $me.val("");
                        runAjax("/Home/InsertCommentAttachment", Data, true, $obj, "full", afterInsertCommentAttachemnt, $me);
                    }
                },
                error: function (error) {
                    alert("Ooops! Something went wrong while uploding");
                }
            });
        }
    } else {
        shake($me, 3, 5, 35);
    }
}

function afterInsertCommentAttachemnt(data, e) {
    closeModal(e);
    console.log(data);
    //  $(".post-div .panel[data-id=" + data[0].RefID + "] input[type='file']")
}

function setOverflowToLastModal() {
    $(".modal-div .modal:last .modal-body").addClass("overflow-auto");
}
function showCommentEditPopup(e) {
    var $me = $(e);

    var $obj = $me.closest('li.media');
    var $objMain = $me.closest(".panel");
    var $comm = $obj.find(".comment").text();
    var $bodyElem = '';

    $bodyElem += '<div class="form-group">';
    $bodyElem += '<label for="email">Comment:</label>';
    $bodyElem += '<textarea class="form-control" rows="4">' + $comm + '</textarea>';
    $bodyElem += '</div>';
    var $footerElem = '<button type="button" class="btn btn-primary" onclick="editComment(this);" data-id="' + $obj.attr("data-id") + '"  data-post-id="' + $objMain.attr("data-id") + '" data-type="' + $objMain.attr("data-type") + '">Edit</button>';
    showModal(true, true, true, "Edit Comment", $bodyElem, $footerElem);
}

function editComment(e) {
    var $me = $(e);
    var Data = { "ID": $me.data("id"), "RefID": $me.data("post-id"), "RefType": $me.data("type"), "Body": $me.closest(".modal").find("textarea").val() };
    runAjax("/Home/UpdateComment", Data, true, $me, "button", afterUpdateComment, $me);
}

function afterUpdateComment(data, e) {
    closeModal(e);
}

function showCommentDeletePopup(e) {
    var $me = $(e);

    var $obj = $me.closest('li.media');
    var $bodyElem = '<strong>Note:</strong> This comment will be deleted and you\'ll no longer be able to find it';
    var $footerElem = '<button type="button" class="btn btn-primary" onclick="deleteComment(this);" data-id="' + $obj.attr("data-id") + '">Delete</button>';
    showModal(true, true, true, "Confirmation", $bodyElem, $footerElem);
}

function deleteComment(e) {
    var $me = $(e);
    var Data = { "ID": $me.data("id") };
    runAjax("/Home/DeleteComment", Data, true, $me, "button", afterDeleteComment, $me);
}

function afterDeleteComment(data, e) {
    closeModal(e);
}

function showPostInvite(e) {
    var $me = $(e);

    $bodyElem = '';
   



    var $footerElem = '<a class="btn btn-link" href="javascript:void(0)" onclick="closeModal(this);">No thanks, maybe later</a>';
    $footerElem += '<input type="button" class="btn btn-primary" value="Send Invitation" onclick="sendInvitation(this);" />';


    showModal(true, true, false, "Who do you want to invite?", $bodyElem, $footerElem);




}