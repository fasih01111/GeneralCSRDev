function validate(e) {
    var $me = $(e);

    var $obj = $me.closest(".main-validate");
    $obj.find(".validation-summary").remove();
    $obj.find("input[data-validate]").removeAttr("style");
    var rValue = true;
    $obj.find("input[data-validate]").each(function (index) {
        if ($(this).data()["validate"] == "required") {
            if ($(this).val() == "") {
                if (rValue) rValue = false;
                $(this).css("borderColor", " #be4b49");
                $(this).closest(".form-group").append('<div class="validation-summary"><div class="validation-text">Field is required</div></div>');
            } else {
                $(this).removeAttr("style");
                $(this).closest(".form-group").find(".validation-summary").remove()
            }
        } else {
            if (rValue) rValue = false;
        }
    });
    return rValue;
}

function validateOn(e, evt) {
    var $me = $(e);
    var $obj = $me.closest(".form-group");
    console.log(evt.type);

    if (evt.type == "focus") {
        $obj.find("input[data-validate]").removeAttr("style");
        $obj.find(".validation-summary").remove()
    } else if (evt.type == "blur") {
        if ($me.val() == "") {
            $me.css("borderColor", " #be4b49");
            $me.closest(".form-group").append('<div class="validation-summary"><div class="validation-text">Field is required</div></div>');
        }
    }
}