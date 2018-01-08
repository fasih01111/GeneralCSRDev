using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using Newtonsoft.Json;
using Fasih;
using System.Data;
using Facebook;
using System.Web.Security;

namespace GeneralCSR.Controllers
{
    public class AccountController : Controller
    {
        BALUsers BALUser = new BALUsers();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Register(string q)
        {
            var Url = FCommon.Decrypt(HttpUtility.UrlDecode(q));

            string[] sUrl = Url.Split('~');

            
            BALUser.FirstName = sUrl[2].Split(':')[1];
            BALUser.LastName = sUrl[3].Split(':')[1];
            BALUser.Email = sUrl[1].Split(':')[1];

            return View(BALUser);
        }
        public ActionResult Privacy()
        {
            return View();
        }
        public ActionResult Login()
        {
            if (Session["CFSess"] == null)
            {
                return View();
            }
            else
            {
                Response.Redirect("/Home/Index");
            }
            return null;
        }

        [HttpPost]
        public string InsertUser(string FName, string LName, string UName, string Email, string Pass)
        {
            BALUser.FirstName = FName;
            BALUser.LastName = LName;
            BALUser.UserName = UName;
            BALUser.Email = Email;
            BALUser.Pass = Pass;
            BALUser.IsEmailConfirmed = false;
            BALUser.IsActive = true;
            return JsonConvert.SerializeObject(BALUser.InsertUpdateUser(BALUser));
        }

        [HttpPost]
        public string Login(string Email, string Password)
        {
            DataRow dr = BALUser.LoginAuthentication(Email, Password);
            if (dr["ID"].ToString().Equals("0"))
            {

            }
            else
            {
                if (dr["IsActive"].ToString().Equals("True"))
                {
                    CFSession Sess = new CFSession();
                    Sess.ID = dr["ID"].ToString();
                    Sess.FirstName = dr["FirstName"].ToString();
                    Sess.LastName = dr["LastName"].ToString();
                    Sess.ImageUrl = dr["ImageUrl"].ToString();
                    Session["CFSess"] = Sess;
                }
                else
                {

                }
            }
            return JsonConvert.SerializeObject(dr);
        }

        [HttpPost]
        public string Logout()
        {
            Session.Clear();
            Session.Abandon();
            return JsonConvert.SerializeObject(FCommon.ConvertReturn("Fasih"));
        }

        /*Facebook login code*/
        private Uri RediredtUri
        {
            get
            {
                var uriBuilder = new UriBuilder(Request.Url);
                uriBuilder.Query = null;
                uriBuilder.Fragment = null;
                uriBuilder.Path = Url.Action("FacebookCallback");
                return uriBuilder.Uri;
            }
        }


        [AllowAnonymous]
        public ActionResult Facebook()
        {
            var fb = new FacebookClient();
            var loginUrl = fb.GetLoginUrl(new
            {


                client_id = "106780949869926",
                client_secret = "1a300e751bf0981f97ecb91a5a3f77d0",
                redirect_uri = RediredtUri.AbsoluteUri,
                response_type = "code",
                scope = "email"

            });
            return Redirect(loginUrl.AbsoluteUri);
        }


        public ActionResult FacebookCallback(string code)
        {
            var fb = new FacebookClient();
            dynamic result = fb.Post("oauth/access_token", new
            {
                client_id = "106780949869926",
                client_secret = "1a300e751bf0981f97ecb91a5a3f77d0",
                redirect_uri = RediredtUri.AbsoluteUri,
                code = code


            });
            var accessToken = result.access_token;
            Session["AccessToken"] = accessToken;
            fb.AccessToken = accessToken;
            dynamic me = fb.Get("/me?fields=email,birthday,location,locale,age_range,first_name,last_name,name_format,gender");
             string email = me.email;
            TempData["email"] = me.email;
            TempData["first_name"] = me.first_name;
            TempData["lastname"] = me.last_name;
            TempData["picture"] = me.picture.data.url;
            FormsAuthentication.SetAuthCookie(email, false);
            return RedirectToAction("Index", "Home");
        }
    }
}
