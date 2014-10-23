using Microsoft.AspNet.Builder;

namespace Test
{
  public class Startup
  {
    public void Configure(IApplicationBuilder app)
    {
      app.UseStaticFiles();
    }
  }
}
