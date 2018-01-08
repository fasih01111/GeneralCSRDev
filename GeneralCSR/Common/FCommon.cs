using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Net.Mail;
using System.Net;
using System.IO;
using System.Text.RegularExpressions;
using System.Data.SqlClient;
using System.Text;
using System.Security.Cryptography;
using System.Reflection;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;

namespace Fasih
{
    public class FCommon
    {
        public FCommon()
        {

        }

        public static string SendStatus;

        public static string ConStr
        {
            get
            {
                if (ConfigurationManager.ConnectionStrings["CS"] == null)
                {
                    return null;
                }
                string myCon = ConfigurationManager.ConnectionStrings["CS"].ToString();
                return myCon;
            }
        }

        public static byte[] getKey
        {
            get
            {
                return ASCIIEncoding.ASCII.GetBytes(ConfigurationManager.AppSettings["EncryptKey"].ToString());

            }
        }

        public static string GenerateGuid()
        {
            long i = 1;
            foreach (byte b in Guid.NewGuid().ToByteArray())
            {
                i *= ((int)b + 1);
            }
            return string.Format("{0:x}", i - DateTime.Now.Ticks);
        }


        public static string GenerateFileName(string context)
        {
            return DateTime.Now.ToString("yyyyMMddHHmmssfff") + "_" + Guid.NewGuid().ToString("N") + "_" + context;
        }
        public static string RemoveHTML(string StringWithHTML)
        {
            if (string.IsNullOrEmpty(StringWithHTML)) return string.Empty;
            return Regex.Replace(StringWithHTML, @"<(.|\n)*?>", string.Empty);
        }

        public static string Find(string input, string StartStr, string LastStr)
        {
            int Start = input.IndexOf(StartStr);
            int length = (input.LastIndexOf(LastStr) - Start) + LastStr.Length;
            return input.Substring(Start, length);
        }
        public static byte[] GetBytes(string str)
        {
            byte[] bytes = new byte[str.Length * sizeof(char)];
            System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }
        public static string UppercaseFirst(string s, char separator)
        {
            s = s.ToLower().Trim();
            if (string.IsNullOrEmpty(s))
            {
                return string.Empty;
            }
            string[] word = s.Split(separator);
            string NewStr = "";
            for (int i = 0; i < word.Length; i++)
            {
                char[] a = word[i].ToCharArray();
                if (a.Length > 0)
                {
                    a[0] = char.ToUpper(a[0]);
                    if (i == word.Length - 1)
                        NewStr += new string(a);
                    else
                        NewStr += new string(a) + separator;
                }
            }
            return NewStr;
        }

        public static string getVisitorsIP()
        {
            string VisitorsIPAddr = string.Empty;
            //Users IP Address.                
            if (HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
                //To get the IP address of the machine and not the proxy
                VisitorsIPAddr = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
            else if (HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"] != null)
                VisitorsIPAddr = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"].ToString();
            else if (HttpContext.Current.Request.UserHostAddress.Length != 0)
                VisitorsIPAddr = HttpContext.Current.Request.UserHostAddress;

            return VisitorsIPAddr;
        }

        public static string GetEmailTemplateBody(string FilePath)
        {
            string content = "";
            try
            {
                string emailBody = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Common/EmailTemplates/" + FilePath);
                using (StreamReader reader = new StreamReader(emailBody))
                {
                    content = reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
            }
            return content;
        }

        public static bool SendEmail(string from, string to, string subject, string body)
        {
            MailMessage msg = new MailMessage();
           
            msg.From = new MailAddress(from, "Rikyas");
            msg.To.Add(to);
           
            msg.Subject = subject;
            msg.Body = body;
            msg.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Credentials = new NetworkCredential("fasih01111@gmail.com", "bRuce1000");
            smtp.Port = 587;
            smtp.EnableSsl = true;

            try
            {
                smtp.Send(msg);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public static bool SendEmail(string from, string to, string bcc, string subject, string body)
        {
            MailMessage msg = new MailMessage();
            //Sender email and displayName
            msg.From = new MailAddress(from, "Viftech Solutions");
            msg.To.Add(to);
            //if (cc != null && cc != "")
            //{
            //    msg.CC.Add(cc);
            //}
            msg.Bcc.Add(new MailAddress(bcc));
            msg.Subject = subject;
            msg.Body = body;
            msg.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "";
            smtp.Credentials = new NetworkCredential("", "");
            smtp.Port = 25;
            smtp.EnableSsl = false;

            try
            {
                smtp.Send(msg);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public static bool SendEmail(string to, string subject, string body)
        {
            MailMessage msg = new MailMessage();
            //Sender email and displayName
            //msg.From = new MailAddress(from, "Viftech Solutions");
            msg.To.Add(to);
            //if (cc != null && cc != "")
            //{
            //    msg.CC.Add(cc);
            //}
            //msg.Bcc.Add(new MailAddress(bcc));
            msg.Subject = subject;
            msg.Body = body;
            msg.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "";
            smtp.Credentials = new NetworkCredential("", "");
            smtp.Port = 25;
            smtp.EnableSsl = false;

            try
            {
                smtp.Send(msg);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }


        public static bool SendEmail(string from, string to, string cc, string bcc, string subject, string body)
        {
            MailMessage msg = new MailMessage();

            msg.From = new MailAddress(from, "Landmark Investment");
            msg.To.Add(to);
            if (cc != null && cc != "")
            {
                msg.CC.Add(cc);
            }
            msg.Subject = subject;
            msg.Body = body;
            msg.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient();
            //smtp.Host = "";
            smtp.Host = "smtp.gmail.com";

            smtp.Credentials = new NetworkCredential("fasih01111@gmail.com", "bRuce1000");
            smtp.Port = 587;
            smtp.EnableSsl = true;

            try
            {
                smtp.Send(msg);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
            finally
            {
                msg.Dispose();
            }
        }

        public static bool SendEmail(string from, string to, string cc, string FilePath, string subject, string body, int dummy)
        {
            MailMessage msg = new MailMessage();

            msg.From = new MailAddress(from, "Landmark Investment");
            msg.To.Add(to);
            foreach (var address in cc.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries))
            {
                msg.To.Add(address);
            }

            msg.Subject = subject;
            msg.Body = body;
            msg.IsBodyHtml = true;

            msg.Attachments.Add(new Attachment(HttpContext.Current.Server.MapPath(FilePath)));

            SmtpClient smtp = new SmtpClient();
            //smtp.Host = "";
            smtp.Host = "smtp.gmail.com";

            smtp.Credentials = new NetworkCredential("fasih01111@gmail.com", "bRuce1000");
            smtp.Port = 587;
            smtp.EnableSsl = true;

            try
            {
                smtp.Send(msg);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
            finally
            {
                msg.Dispose();

            }
        }


        public static string getVisitorsBrowserInfo()
        {
            string VisitorsBrowserInfo = string.Empty;
            HttpBrowserCapabilities browser = HttpContext.Current.Request.Browser;
            string UserAgent = HttpContext.Current.Request.UserAgent;
            VisitorsBrowserInfo = "{Browser-Capabilities "
                     + "(Type = '" + browser.Type + "' "
                     + "Name = '" + browser.Browser + "' "
                     + "Version = '" + browser.Version + "' "
                     + "Major Version = '" + browser.MajorVersion + "' "
                     + "Minor Version = '" + browser.MinorVersion + "' "
                     + "Platform = '" + browser.Platform + "' "
                     + "Is Win32 = '" + browser.Win32 + "' "
                     + "Is Beta = '" + browser.Beta + "' "
                     + "Supports Cookies = '" + browser.Cookies + "' "
                     + "Supports ECMAScript = '" + browser.EcmaScriptVersion.ToString() + "' "
                     + "Supports JavaScript Version = '" + browser.JScriptVersion + "' "
                     + "UserAgent = '" + UserAgent + "')}";
            return VisitorsBrowserInfo;
        }

        public static string SubStr(string str, int length)
        {
            if (string.IsNullOrEmpty(str)) return string.Empty;
            if (str.Length > length)
                return str.Substring(0, length) + "...";
            else
                return str;
        }

        public static string SubStrSimple(string str, int length)
        {
            if (string.IsNullOrEmpty(str)) return string.Empty;
            if (str.Length > length)
                return str.Substring(0, length);
            else
                return str;
        }

        public static object ValidateValue(int intValue)
        {
            if (intValue == 0)
            {
                return DBNull.Value;
            }
            else
            {
                return intValue;
            }
        }

        public static object ValidateValue(string strValue)
        {
            if (strValue == null)
            {
                return DBNull.Value;
            }
            else
            {
                return strValue;
            }
        }

        public static object ValidateValue(DateTime dtValue)
        {
            if ((dtValue == null) || (dtValue == DateTime.MinValue))
            {
                return DBNull.Value;
            }
            else
            {
                return dtValue;
            }
        }

        //public static object ValidateValue(double dblValue)
        //{
        //    if ((dblValue == null))
        //    {
        //        return DBNull.Value;
        //    }
        //    else
        //    {
        //        return dblValue;
        //    }
        //}

        public static int CheckInt(object value)
        {
            int parseVal;
            return ((value == null) || (value == DBNull.Value)) ? 0 : int.TryParse(value.ToString(), out parseVal) ? parseVal : 0;
        }

        public static double CheckDouble(object value)
        {
            double parseVal;
            return ((value == null) || (value == DBNull.Value)) ? 0 : double.TryParse(value.ToString(), out parseVal) ? parseVal : 0;
        }

        public static DateTime CheckDateTime(object value)
        {
            DateTime parseVal;
            return ((value == null) || (value == DBNull.Value)) ? GetDefaultDate() : DateTime.TryParse(value.ToString(), out parseVal) ? parseVal : GetDefaultDate();
        }

        public static string CheckString(object value)
        {
            return ((value == null) || (value == DBNull.Value)) ? GetDefaultString() : value.ToString();
        }

        public static bool CheckBoolean(object value)
        {
            bool parseVal;
            return ((value == null) || (value == DBNull.Value)) ? GetDefaultBoolean() : bool.TryParse(value.ToString(), out parseVal) ? parseVal : GetDefaultBoolean();
        }

        public static DateTime GetDefaultDate()
        {
            return new DateTime(1900, 1, 1);
        }

        public static bool GetDefaultBoolean()
        {
            return false;
        }

        public static string GetDefaultString()
        {
            return string.Empty;
        }

        public static string GetUniqueID()
        {
            int maxSize = 30;
            char[] chars = new char[62];
            string a;
            a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            chars = a.ToCharArray();
            int size = maxSize;
            byte[] data = new byte[1];
            System.Security.Cryptography.RNGCryptoServiceProvider crypto = new System.Security.Cryptography.RNGCryptoServiceProvider();
            //crypto.GetNonZeroBytes(data);

            data = new byte[size];
            crypto.GetNonZeroBytes(data);
            System.Text.StringBuilder result = new System.Text.StringBuilder(size);
            foreach (byte b in data)
            {
                result.Append(chars[b % (chars.Length - 1)]);
            }
            return result.ToString();
        }

        public static bool WriteErrorFile(string contents, string strPath)
        {
            StreamWriter writer = new StreamWriter(strPath, true);
            writer.Write(contents);
            writer.Flush();
            writer.Close();
            writer.Dispose();
            writer = null;
            return true;
        }

        /// <summary>
        /// Reloads current page
        /// </summary>
        /// <param name="UseSSL">Use SSL</param>
        public static void ReloadCurrentPage(bool UseSSL)
        {
            string result = string.Empty;
            if (HttpContext.Current.Request.ServerVariables["HTTP_HOST"] != null)
            {
                result = HttpContext.Current.Request.ServerVariables["HTTP_HOST"].ToString();
            }
            result = "http://" + result;
            if (!result.EndsWith("/"))
            {
                result += "/";
            }

            if (UseSSL)
            {
                result = result.Replace("http:/", "https:/");
                result = result.Replace("www.www", "www");
            }



            if (result.EndsWith("/"))
            {
                result = result.Substring(0, result.Length - 1);
            }
            string URL = result + HttpContext.Current.Request.RawUrl;
            HttpContext.Current.Response.Redirect(URL);
        }

        /// <summary>
        /// Ensures that requested page is secured (https://)
        /// </summary>
        public static void EnsureSSL()
        {
            if (!HttpContext.Current.Request.IsSecureConnection)
            {
                if (!HttpContext.Current.Request.Url.IsLoopback)
                {
                    ReloadCurrentPage(true);
                }
            }
        }

        /// <summary>
        /// Ensures that requested page is not secured (http://)
        /// </summary>
        public static void EnsureNonSSL()
        {
            if (HttpContext.Current.Request.IsSecureConnection)
            {
                ReloadCurrentPage(false);
            }
        }

        public static string ConvertCurrency(string To, string Amount, HttpRequest Request)
        {
            string Expression = Amount + "USD" + "=?" + To;
            string url = "http://www.google.com/ig/calculator?hl=en&q=" + Expression;

            string response = "";
            string responseMsg = Request.Params.ToString();
            string post = responseMsg;

            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
            req.Method = "POST";
            req.ContentType = "application/x-www-form-urlencoded";
            req.ContentLength = post.Length;

            StreamWriter writer = new StreamWriter(req.GetRequestStream(), System.Text.Encoding.ASCII);
            writer.Write(post);
            writer.Close();

            StreamReader reader = new StreamReader(req.GetResponse().GetResponseStream());
            response = reader.ReadToEnd();
            reader.Close();

            char[] cChar = new char[3];
            string[] _params = new string[100];

            cChar[0] = ',';
            _params = response.Split(cChar[0]);

            string ConvertedAmount = "";

            ConvertedAmount = _params[1];
            ConvertedAmount = ConvertedAmount.Replace("\"", "");
            ConvertedAmount = ConvertedAmount.Replace("rhs", "");
            ConvertedAmount = ConvertedAmount.Replace(":", "");
            ConvertedAmount = ConvertedAmount.Trim();
            ConvertedAmount = ConvertedAmount.Remove(ConvertedAmount.IndexOf(' '), ConvertedAmount.Length - ConvertedAmount.IndexOf(' '));

            return ConvertedAmount;

        }

        // Detact Bots And Crawlers
        public static bool IsBot
        {
            get
            {
                // If this method can't access the current context that means the executing thread doesn't have access
                // to the current request's properties ... since we can't pull any agent information we have to assume
                // this is not a bot.
                if (HttpContext.Current == null)
                    return false;

                string HTTP_USER_AGENT = "";
                if (HttpContext.Current.Request.ServerVariables["HTTP_USER_AGENT"] != null)
                    HTTP_USER_AGENT = HttpContext.Current.Request.ServerVariables["HTTP_USER_AGENT"].ToLower();

                // Check to see if the user agent field contains any of the terms in the botRegex set in the web.config
                string expression = ConfigurationManager.AppSettings["botRegex"];
                Regex botRegex = new Regex(expression);
                return botRegex.IsMatch(HTTP_USER_AGENT);
            }
        }

        public static void ReloadJS(Page page, string Function)
        {
            ScriptManager.RegisterStartupScript(page, typeof(string), Guid.NewGuid().ToString(), Function, true);
        }

        //public static string Encrypt(string originalString, byte[] bytes)
        //{
        //    try
        //    {
        //        if (String.IsNullOrEmpty(originalString))
        //        {
        //            throw new ArgumentNullException("The string which needs to be encrypted can not be null.");
        //        }

        //        DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();
        //        MemoryStream memoryStream = new MemoryStream();
        //        CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateEncryptor(bytes, bytes), CryptoStreamMode.Write);

        //        StreamWriter writer = new StreamWriter(cryptoStream);
        //        writer.Write(originalString);
        //        writer.Flush();
        //        cryptoStream.FlushFinalBlock();
        //        writer.Flush();

        //        return Convert.ToBase64String(memoryStream.GetBuffer(), 0, (int)memoryStream.Length);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public static string Decrypt(string cryptedString, byte[] bytes)
        //{
        //    try
        //    {
        //        if (String.IsNullOrEmpty(cryptedString))
        //        {
        //            throw new ArgumentNullException("The string which needs to be decrypted can not be null.");
        //        }

        //        cryptedString = Regex.Replace(cryptedString, "[ ]", "+");

        //        DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();
        //        MemoryStream memoryStream = new MemoryStream(Convert.FromBase64String(cryptedString));
        //        CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateDecryptor(bytes, bytes), CryptoStreamMode.Read);
        //        StreamReader reader = new StreamReader(cryptoStream);

        //        return reader.ReadToEnd();
        //    }
        //    catch (Exception)
        //    {
        //        return "";
        //    }
        //}

        static string EncryptionKey = "TRADEANDTREASURYDEMON";
        public static string Encrypt(string clearText)
        {
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }
        public static string Decrypt(string cipherText)
        {
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }

        public static void Clear(ControlCollection controls)
        {
            foreach (Control ctrl in controls)
            {
                if (ctrl.HasControls())
                {
                    Clear(ctrl.Controls);
                }

                if (ctrl is TextBox)
                {
                    ((TextBox)ctrl).Text = string.Empty;
                }
                if (ctrl is CheckBox)
                {
                    ((CheckBox)ctrl).Checked = false;
                }
                if (ctrl is RadioButton)
                {
                    ((RadioButton)ctrl).Checked = false;
                }
                else if (ctrl is DropDownList)
                {
                    ((DropDownList)ctrl).SelectedIndex = -1;   // -1 is the value to use for none selected in a drop down list
                }
                else if (ctrl is CheckBoxList)
                {
                    ((CheckBoxList)ctrl).SelectedIndex = 0;
                }
                else if (ctrl is ListBox)
                {
                    ((ListBox)ctrl).SelectedIndex = -1;     // -1 is the value to use for none selected in a list box
                }
                else if (ctrl is RadioButtonList)
                {
                    ((RadioButtonList)ctrl).SelectedIndex = 0;
                }
                else if (ctrl is HtmlInputRadioButton)
                {
                    ((HtmlInputRadioButton)ctrl).Checked = false;
                }
                else if (ctrl is HtmlTextArea)
                {
                    ((HtmlTextArea)ctrl).Value = "";
                }
            }
        }
        public static bool IsBase64String(string s)
        {
            s = s.Trim();
            return (s.Length % 4 == 0) && Regex.IsMatch(s, @"^[a-zA-Z0-9\+/]*={0,3}$", RegexOptions.None);
        }
        public static bool IsValidEmail(string email)
        {
            string validEmailPattern = @"^(?!\.)(""([^""\r\\]|\\[""\r\\])*""|"
                + @"([-a-z0-9!#$%&'*+/=?^_`{|}~]|(?<!\.)\.)*)(?<!\.)"
                + @"@[a-z0-9][\w\.-]*[a-z0-9]\.[a-z][a-z\.]*[a-z]$";
            return new Regex(validEmailPattern, RegexOptions.IgnoreCase).IsMatch(email);
        }

        public static void ChangeControlStatus(bool status, ControlCollection Controls)
        {
            foreach (Control c in Controls)
            {
                if (c is TextBox)
                    ((TextBox)c).Enabled = status;
                else if (c is CheckBox)
                    ((CheckBox)c).Enabled = status;
                else if (c is RadioButton)
                    ((RadioButton)c).Enabled = status;
                else if (c is Button)
                    ((Button)c).Enabled = status;
                else if (c is DropDownList)
                    ((DropDownList)c).Enabled = status;
                else if (c is HtmlInputRadioButton)
                    ((HtmlInputRadioButton)c).Disabled = !status;
                else if (c is HtmlTextArea)
                    ((HtmlTextArea)c).Disabled = !status;
            }
        }

        public static DataTable getDataBasesByServerName(string ServerName)
        {
            return getDataBasesByServerName(ServerName, null, null);
        }

        public static DataTable getDataBasesByServerName(string ServerName, string UserName, string UserPassword)
        {
            try
            {
                string UserID = UserName != null ? "User ID=" + UserName + ";" : "";
                string UserPwd = UserPassword != null ? "Password=" + UserPassword + ";" : "";
                string Security = UserName != null ? "Persist Security Info=True;" : "Integrated Security=True;";
                string ConStr = "Data Source=" + ServerName + ";Initial Catalog=master;" + UserID + UserPwd + Security;
                return SqlHelper.ExecuteDataTable(ConStr, CommandType.Text, "SELECT name FROM SYS.Databases");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void Success_Message(Page page)
        {
            FCommon.ReloadJS(page, "$('#Notification_Success').fadeIn('slow').delay('4000').fadeOut('slow');");
        }

        public static void Log(string logMessage)
        {
            using (StreamWriter w = File.AppendText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ErrorLog/Log.txt")))
            {

                w.Write("\r\nLog Entry : ");
                w.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(),
                    DateTime.Now.ToLongDateString());
                w.WriteLine("  :");
                w.WriteLine("  :{0}", logMessage);
                w.WriteLine("-------------------------------");
            }
        }

        public static bool CheckSession()
        {
            if (HttpContext.Current.Session["CFSess"] != null) return true;
            else return false;
        }
        public static void CheckSession(string URL)
        {
            if (HttpContext.Current.Session["CFSess"] == null)
            {
                HttpContext.Current.Response.Redirect("/Account/Login");
            }
        }


        private string ReturnText { get; set; }
        public static List<FCommon> ConvertReturn(string Text)
        {
            return new List<FCommon>() { new FCommon() { ReturnText = "Sylvester" } };
        }

        public static void VaryQualityLevel(string Path)
        {
            Bitmap bmp1 = new Bitmap(@"" + Path + "");
            // Create parameters
            EncoderParameters paramss = new EncoderParameters(1);

            // Set quality (100)
            paramss.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 100);

            // Create encoder info
            ImageCodecInfo codec = null;
            foreach (ImageCodecInfo codectemp in ImageCodecInfo.GetImageDecoders())
            {
                if (codectemp.MimeType == "image/jpeg")
                {
                    codec = codectemp;
                    break;
                }
            }

            // Check
            if (codec == null)
                throw new Exception("Codec not found for image/jpeg");

            // Save
            try
            {
                bmp1.Save(Path, codec, paramss);
            }
            catch(Exception e)
            {

            }
            

            //// Get a bitmap. The using statement ensures objects  
            //// are automatically disposed from memory after use.  
            //using (Bitmap bmp1 = new Bitmap(@""+ Path + ""))
            //{
            //    ImageCodecInfo jpgEncoder = GetEncoder(ImageFormat.Jpeg);

            //    // Create an Encoder object based on the GUID  
            //    // for the Quality parameter category.  
            //    System.Drawing.Imaging.Encoder myEncoder =
            //        System.Drawing.Imaging.Encoder.Quality;

            //    // Create an EncoderParameters object.  
            //    // An EncoderParameters object has an array of EncoderParameter  
            //    // objects. In this case, there is only one  
            //    // EncoderParameter object in the array.  
            //    EncoderParameters myEncoderParameters = new EncoderParameters(1);

            //    EncoderParameter myEncoderParameter = new EncoderParameter(myEncoder, 50L);
            //    myEncoderParameters.Param[0] = myEncoderParameter;
            //    bmp1.Save(@"" + Path + "", jpgEncoder, myEncoderParameters);

            //    //myEncoderParameter = new EncoderParameter(myEncoder, 100L);
            //    //myEncoderParameters.Param[0] = myEncoderParameter;
            //    //bmp1.Save(@"" + Path + "", jpgEncoder, myEncoderParameters);

            //    // Save the bitmap as a JPG file with zero quality level compression.  
            //    //myEncoderParameter = new EncoderParameter(myEncoder, 0L);
            //    //myEncoderParameters.Param[0] = myEncoderParameter;
            //    //bmp1.Save(@"" + Path + "", jpgEncoder, myEncoderParameters);
            //}
        }

        private static ImageCodecInfo GetEncoder(ImageFormat format)
        {
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();
            foreach (ImageCodecInfo codec in codecs)
            {
                if (codec.FormatID == format.Guid)
                {
                    return codec;
                }
            }
            return null;
        }

    }
}