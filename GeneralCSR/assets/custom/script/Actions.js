function showDonatePopup(e) {
    var $me = $(e);
    var $bodyElem = '<div class="row">';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Donation for fire snorkels</li>';
    $bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="/Post/Index">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Donate</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Need donation for water in summer</li>';
    $bodyElem += '<li><strong>Started By:</strong> Yaqoob Abubakar</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="/Post/Index">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Donate</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Donate to educate</li>';
    $bodyElem += '<li><strong>Started By:</strong> Fasih</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="/Post/Index">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Donate</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';


    $bodyElem += '</div>';
    showModal(true, true, true, "Donation", $bodyElem, "");
}

function showVolunteerPopup(e) {
    var $me = $(e);
    var $bodyElem = '<div class="row">';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Find volunteers for my organization</li>';
    $bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="/Post/Index">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Volunteer</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Volunteers required for small work</li>';
    $bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="/Post/Index">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Volunteer</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Need 3 volunteers for work</li>';
    $bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="/Post/Index">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Volunteer</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';


    $bodyElem += '</div>';
    showModal(true, true, true, "Volunteer", $bodyElem, "");
}

function showPetitionPopup(e) {
    var $me = $(e);
    var $bodyElem = '<div class="row">';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Review Panama Papers Scandal and implications for Pakistani Democracy</li>';
    $bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Sign Petition</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Clean up Pakistan</li>';
    $bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Sign Petition</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Lower School Fees</li>';
    $bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Sign Petition</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';


    $bodyElem += '</div>';
    showModal(true, true, true, "Petition", $bodyElem, "");
}

function showSkillVolunteerPopup(e) {
    var $me = $(e);
    var $bodyElem = '<div class="row">';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>We need help... PROTOTYPING A MOBILE SITE</li>';
    $bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Volunteer</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>DEVELOPING A BUSINESS PLAN</li>';
    $bodyElem += '<li><strong>Started By:</strong> Yaqoob Abubakar</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Volunteer</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>WEBSITE CONSTRUCTION (CMS-BASED)</li>';
    $bodyElem += '<li><strong>Started By:</strong> Fasih</li>';
    $bodyElem += '<li><strong>Comments:</strong> 2000</li>';
    $bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
    $bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Volunteer</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';


    $bodyElem += '</div>';
    showModal(true, true, true, "Skill Based Volunteer", $bodyElem, "");
}

function showWhitePaperPopup(e) {
    var $me = $(e);
    var $bodyElem = '<div class="row">';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Combating water scarcity in Thar</li>';
    $bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Download</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Increasing Exports: Piece by piece guide</li>';
    $bodyElem += '<li><strong>Started By:</strong> Fareed Uddin</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Download</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Protecting ethnic cultures across Pakistan</li>';
    $bodyElem += '<li><strong>Started By:</strong> Ali Motiwala</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Download</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Why Urdu should survive</li>';
    $bodyElem += '<li><strong>Started By:</strong> Yaqoob Abubakar</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Download</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>What are we taking away from our children</li>';
    $bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Download</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li>Rescue operations after a major earthquake: how one country got it right</li>';
    $bodyElem += '<li><strong>Started By:</strong> Muhammad Fasih</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Download</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';


    $bodyElem += '</div>';
    showModal(true, true, true, "White Paper", $bodyElem, "");
}

function showArchivePopup(e) {
    var $me = $(e);
    var Data = { "RefID": "" };
    runAjax("/Post/GetPostAllAttachment", Data, false, "", "", setArchiveAttachment, $me);
}


function showEventsPopup(e) {
    var $me = $(e);

    var $bodyElem = '<div class="row">';
    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li><div style="height: 100px; overflow:hidden;"><img src="/assets/images/hospital-management-system-software.jpg" height="100"></div></li>';
    $bodyElem += '<li>Health Safety & Security Expo 2017</li>';
    $bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Interested</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li><div style="height: 100px; overflow:hidden;"><img src="/assets/images/w330_h230_ac__1484107093_Medical_Camp_Kalavoor.jpg" height="100"></div></li>';
    $bodyElem += '<li>Free Medical Camp</li>';
    $bodyElem += '<li><strong>Started By:</strong> Fareed Uddin</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Interested</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';

    $bodyElem += '<div class="col-md-4">';
    $bodyElem += '<div class="panel">';
    $bodyElem += '<ul class="links">';
    $bodyElem += '<li><div style="height: 100px; overflow:hidden;"><img src="/assets/images/220px-SoftwareHouse-ChangePyramid.jpg" height="100"></div></li>';
    $bodyElem += '<li>Idea Of Softwarehouse</li>';
    $bodyElem += '<li><strong>Started By:</strong> Yaqoob Abubakar</li>';
    $bodyElem += '</ul>';
    $bodyElem += '<div class="row no-margin ">';
    $bodyElem += '<div class="col-md-6 panel-body"><a class="form-control btn btn-default" href="#" onclick="todo(this)">View</a></div>';
    $bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Interested</button></div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';
    $bodyElem += '</div>';


    $bodyElem += '</div>';
    showModal(true, true, true, "Events", $bodyElem, "");
}

function createAnAction(e) {
    var $me = $(e);
    var $me = $(e);

    var $actionArr = [
        { "name": "Volunteer", "imgUrl": "collaboration.png" },
        { "name": "Petition", "imgUrl": "file.png" },
        { "name": "Donate", "imgUrl": "donation.png" },
        { "name": "Skill board volunteer", "imgUrl": "employee.png" },
        { "name": "White Paper", "imgUrl": "contract.png" }
    ];

    // ["Volunteer", "Petition", "Donate", "SKill board volunteer", "White Paper"]
    var $bodyElem = '<div class="row">';
    for (var i = 0; i < $actionArr.length; i++) {
        $bodyElem += '<div class="col-md-4">';
        $bodyElem += '<div class="panel panel-body text-center">';
        $bodyElem += '<img src="/assets/images/' + $actionArr[i].imgUrl + '" />';

        $bodyElem += '<div  class="action-title">' + $actionArr[i].name + '</div>';
        //$bodyElem += '<div  class="action-title">Petition</div>';
        //$bodyElem += '<div  class="action-title">Donate</div>';
        //$bodyElem += '<div  class="action-title">Skill board volunteering</div>';
        //$bodyElem += '<div  class="action-title">White Paper</div>';
        //$bodyElem += '<ul class="links">';
        //$bodyElem += '<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, <strong>...more</strong></li>';
        //$bodyElem += '<li><strong>Started By:</strong> Faisal Mamsa</li>';
        //$bodyElem += '<li><strong>Comments:</strong> 2000</li>';
        //$bodyElem += '<li><strong>Endorse:</strong> 1000</li>';
        //$bodyElem += '<li><strong>Raised On:</strong> 22/Dec/2017</li>';
        //$bodyElem += '</ul>';
        //$bodyElem += '<div class="row no-margin ">';
        //$bodyElem += '<div class="col-md-12 panel-body"><a class="form-control btn btn-default" href="/Post/Index">View</a></div>';
        //$bodyElem += '<div class="col-md-6 panel-body"><button class="form-control btn-primary" type="button" onclick="todo(this)">Donate</button></div>';
        // $bodyElem += '</div>';
        $bodyElem += '</div>';
        $bodyElem += '</div>';
    }

    $bodyElem += '</div>';
    showModal(true, true, true, "Actions", $bodyElem, "");
}