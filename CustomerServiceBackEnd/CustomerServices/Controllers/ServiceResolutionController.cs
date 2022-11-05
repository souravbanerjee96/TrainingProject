using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerServices.Models;
using Microsoft.AspNetCore.Authorization;

namespace CustomerServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class ServiceResolutionController : ControllerBase
    {
        CustomerServiceRequestsContext db = new CustomerServiceRequestsContext();

        [HttpGet]
        public IEnumerable<Object> GetRequests()
        {
            var data = from srq in db.ServiceRequests
                       join sr in db.ServiceResolutions
                       on srq.Id equals sr.RequestId into res_table
                       from r in res_table.DefaultIfEmpty()
                       select new
                       {
                           Id = srq.Id,
                           ServiceName = srq.ServiceName,
                           RequiredDate = srq.RequiredDate,
                           ServiceType = srq.ServiceType,
                           ServiceDetails = srq.ServiceDetails,
                           Status = r.Status == null ? "O" : r.Status,
                           Comment = r.Comment == null ? "No Comment" : r.Comment
                       };
            return data;
        }
        [HttpPost]
        public IActionResult UpdateRequest(resolution rs)
        {
            ServiceResolution sr = new ServiceResolution();
            var successmessage = new { Status = "Success" };
            try
            {
                var updateService = db.ServiceResolutions.Where(x => x.RequestId == rs.Id).FirstOrDefault();
                if (updateService == null)
                {
                    sr.Comment = rs.Comment;
                    sr.RequestId = rs.Id;
                    sr.AdminId = rs.AdminID;
                    sr.Status = rs.Status;

                    db.ServiceResolutions.Add(sr);
                    db.SaveChanges();
                }
                else
                {
                    updateService.Comment = rs.Comment;
                    updateService.RequestId = rs.Id;
                    updateService.AdminId = rs.AdminID;
                    updateService.Status = rs.Status;
                    db.SaveChanges();
                }
                
            }
            catch (Exception ex)
            {
                successmessage = new { Status = "Failed ! " + ex.Message };
            }
            return Ok(successmessage);
        }

    }
}
