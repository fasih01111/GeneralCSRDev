using Fasih;
using Microsoft.AspNet.SignalR;
using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace GeneralCSR.Controllers
{
    public class PostController : Controller
    {
        //
        // GET: /Post/
        BALPosts BALPost = new BALPosts();

        public ActionResult Index(int id = 0)
        {

            string Fasih = id.ToString();

            return View();
        }


        [HttpPost]
        public string GetPostFollows(string RefID)
        {
            DataTable dt = BALPost.GetPostFollows(RefID);
            return JsonConvert.SerializeObject(dt);
        }

        [HttpPost]
        public string GetCommentEndorse(string RefID)
        {
            DataTable dt = BALPost.GetCommentEndorse(RefID);
            return JsonConvert.SerializeObject(dt);
        }

        [HttpPost]
        public string GetCommentSupport(string RefID)
        {
            DataTable dt = BALPost.GetCommentSupport(RefID);
            return JsonConvert.SerializeObject(dt);
        }

        [HttpPost]
        public string GetAttachments(string RefID, string RefType)
        {
            DataTable dt = BALPost.GetAttachments(RefID, RefType);
            return JsonConvert.SerializeObject(dt);
        }


        [HttpPost]
        public string GetPostAllAttachment(string RefID)
        {
            DataTable dt = BALPost.GetPostAllAttachments(RefID);
            return JsonConvert.SerializeObject(dt);
        }

        [HttpPost]
        public string ShowArchivePosts(string CatID)
        {
            DataTable dt = BALPost.GetAttachmentsPosts(CatID);
            return JsonConvert.SerializeObject(dt);
        }


    }
}
