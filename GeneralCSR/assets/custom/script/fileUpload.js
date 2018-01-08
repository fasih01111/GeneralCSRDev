function uploadFiles(e) {
    var $me = $(e)[0];

    var formData = new FormData();
    var totalFiles = $me.files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = $me.files[i];

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
            $me.closest(".panel").find(".box-file .box-file-close").remove();
            $me.closest(".panel").find(".box-file").append('<div class="box-file-close"><i class="fa fa-spinner fa-spin"></i></div>');
        },
        success: function (response) {
            $me.closest(".panel").find(".box-file").remove();
            return response;
        },
        error: function (error) {
            return "";
        }
    });

    $($me.closest(".panel").find("input[type='file']")).replaceWith($me.closest(".panel").find("input[type='file']").clone(true));
}

function checkFile(e) {

    //imgData = jQuery.makeArray(e.files);
    var $me = $(e);
    var $obj = $me.closest(".modal").find(".modal-body .file-div");
    $obj.find(".box-file").remove();
    for (var i = 0; i < e.files.length; i++) {
        files = e.files[i];
        if (files) {
            var $elem = '';
            $elem += '<div class="box-file">';
            $elem += '<div class="box-file-name truncate" title="' + files.name + '">' + files.name + '</div>';
            $elem += '<div class="box-file-close" onclick="closeAttachment(this);">✖</div>';
            $elem += '</div>';
            $obj.append($elem);
        }
    }
    //var height = 0;
    //$obj.children().each(function () {
    //    height += $(this).height();
    //});
    //$obj.scrollTop(height);
    //$obj.closest(".box").find("[contenteditable]").focus();
    //if ($obj in allImgData) {
    //    allImgData[$obj] += jQuery.makeArray(e.files);
    //} else {
    //    allImgData[$obj] = jQuery.makeArray(e.files);
    //}

    //allImgData.push([$obj, jQuery.makeArray(e.files)]);
    //imgData = jQuery.makeArray(e.files);
    //if (files) {
    //    $(e).closest('.fileinput-button').addClass('file_uploaded');
    //    $(e).closest('.fileinput-button').prepend("<div>1</div>");
    //    $(e).closest('.fileinput-button').find("div").fadeIn();

    //} else {
    //    //$(e).closest('.fileinput-button').removeClass('file_uploaded');
    //    $(e).closest('.fileinput-button').find("div").fadeOut(function () {
    //        $(this).remove();
    //        $(e).closest('.fileinput-button').removeClass('file_uploaded');
    //    });
    //}
}