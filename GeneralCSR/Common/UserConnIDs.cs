using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fasih
{
    public class UserConnIDs
    {
        public static Dictionary<string, string> DConnIds = new Dictionary<string, string>();
        public static List<string> GetConnIDsByUserID(string ID)
        {
            
            List<string> list = DConnIds.Where(x => x.Value == ID).Select(a => a.Key.ToString()).ToList();
            return list;
        }
        public static List<string> GetConnIDsByUserID(List<string> IDs)
        {
            List<string> list = new List<string>();
            foreach (var item in IDs)
                list.AddRange(DConnIds.Where(x => x.Value == item).Select(a => a.Key.ToString()).ToList());
            return list;
        }
    }
}