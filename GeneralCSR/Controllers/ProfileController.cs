using Fasih;
using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GeneralCSR.Controllers
{
    public class ProfileController : Controller
    {
        BALUsers BALUser = new BALUsers();
        //
        // GET: /Profile/
        [AuthorizeSession]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string Follow(string UserID)
        {
            CFSession CFSess = (CFSession)Session["CFSess"];
            return JsonConvert.SerializeObject(BALUser.InsertDeleteFollowers(CFSess.ID, UserID));
        }

        [HttpPost]
        public string InsertInterestedCategories(string Categories)
        {
            CFSession CFSess = (CFSession)Session["CFSess"];
            return JsonConvert.SerializeObject(BALUser.InsertUserInterestedCategories(CFSess.ID, Categories));
        }

    }
}
