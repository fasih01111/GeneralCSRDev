using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Fasih;
using Models;

namespace GeneralCSR
{
    public class GeneralHub : Hub
    {
        BALUsers BALUser = new BALUsers();

        [HubMethodName("hello")]
        public void Hello()
        {
            Clients.All.hello();
        }
        public override System.Threading.Tasks.Task OnConnected()
        {
            return base.OnConnected();
        }
        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            if (UserConnIDs.DConnIds.ContainsKey(Context.ConnectionId))
            {
                string UserID = UserConnIDs.DConnIds[Context.ConnectionId];
                UserConnIDs.DConnIds.Remove(Context.ConnectionId);
                if (!UserConnIDs.DConnIds.ContainsValue(UserID))
                {
                    //BALUser.OnlineOfflineUser(UserID, false);
                    Clients.Others.SetUserOnlineOffline(UserID, "Offline");
                }
            }

            return base.OnDisconnected(stopCalled);
        }
        public override System.Threading.Tasks.Task OnReconnected()
        {
            return base.OnReconnected();
        }
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
        [HubMethodName("userOnConnect")]
        public void UserOnConnect(string ConnectionID)
        {
            ////string UserID = GeneralCSR.Controllers.HomeController.g;
            //if (!UserConnIDs.DConnIds.ContainsValue(UserID))
            //{
            //    //BALUser.OnlineOfflineUser(UserID, true);
            //    Clients.Others.setUserOnlineOffline(UserID, "Online");
            //}
            //UserConnIDs.DConnIds.Add(ConnectionID, UserID);
            //SetUserReceiveOrSeenDate(UserID, null, false);
        }

        [HubMethodName("showPostToOthers")]
        public void ShowPostToOthers(string UserID)
        {
            
            //if (!UserConnIDs.DConnIds.ContainsValue(UserID))
            //{
            //    //BALUser.OnlineOfflineUser(UserID, true);
            //    Clients.Others.setUserOnlineOffline(UserID, "Online");
            //}
            //UserConnIDs.DConnIds.Add(Context.ConnectionId, UserID);
            ////SetUserReceiveOrSeenDate(UserID, null, false);
        }
    }
}