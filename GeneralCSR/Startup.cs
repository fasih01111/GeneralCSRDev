using Microsoft.Owin;
using Owin;
using GeneralCSR;


namespace GeneralCSR
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
            ConfigureAuth(app);
        }
    }
}