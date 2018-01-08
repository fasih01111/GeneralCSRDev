using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fasih
{
    public class CFSession
    {
        public CFSession() { }
        public string ID { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }

        public bool CheckSession()
        {
            if (HttpContext.Current.Session["CFSess"] != null) return true;
            else return false;
        }
    }
}