using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

public class AuthorizeSessionAttribute : AuthorizeAttribute
{
    protected override bool AuthorizeCore(HttpContextBase httpContext)
    {
        var CFSess = httpContext.Session["CFSess"];
        if (CFSess == null)
        {
            httpContext.Response.Redirect("/Account/Login?ref=" + httpContext.Request.Path); return false;
        }
        else { return true; }
    }
}
