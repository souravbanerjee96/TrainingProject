using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerServices.Models;
using Microsoft.AspNetCore.Authorization;

namespace CustomerServiceReq.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class ServiceReqController : ControllerBase
    {
        CustomerServiceRequestsContext db = new CustomerServiceRequestsContext();

        [HttpGet("{id:int}")]
        public Object[] Get(int id)
        {
            //return db.ServiceRequests.Where(x=>x.UserId==id && x.IsDeleted==0).OrderByDescending(x=>x.AddedDate);
            var data = from srq in db.ServiceRequests
                       join sr in db.ServiceResolutions
                       on srq.Id equals sr.RequestId
                       into res_table
                       from r in res_table.DefaultIfEmpty()
                       where (srq.UserId == id && srq.IsDeleted == 0)
                       orderby srq.AddedDate descending
                       select new
                       {
                           Id = srq.Id,
                           ServiceName = srq.ServiceName,
                           AddedDate = srq.AddedDate,
                           RequiredDate = srq.RequiredDate,
                           ServiceType = srq.ServiceType,
                           ServiceDetails = srq.ServiceDetails,
                           UserId = srq.UserId,
                           IsDeleted = srq.IsDeleted,
                           Status = r.Status == null ? "O" : r.Status,
                           StatusState = r.Status == null ? 1 : r.Status == "C" ? 2 : r.Status == "R" ? 3 : r.Status == "I" ? 4 : 99, //StatusState for Mutipurpose
                           Comment = r.Comment == null ? "No Comment" : r.Comment,
                           IsUserAccepted = r.IsUserAccepted == null ? 0 : r.IsUserAccepted,
                           UserComment = r.UserComment == null ? "No User Comment" : r.UserComment
                       };
            return data.ToArray();
        }

        [HttpPost]
        public IActionResult Post(ServiceRequest sr)
        {
            var successmessage = new { Status = "Success" };
            try
            {
                db.ServiceRequests.Add(sr);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                successmessage = new { Status = "Failed ! " + ex.Message };
            }
            return Ok(successmessage);
        }
        [HttpPut("{id:int}")]
        public IActionResult UpdateReq(int id, ServiceRequest sr)
        {
            var successmessage = new { Status = "Success" };
            try
            {
                var data = db.ServiceRequests.Where(x => x.Id == id).FirstOrDefault();
                if (data != null)
                {
                    data.ServiceName = sr.ServiceName;
                    data.RequiredDate = sr.RequiredDate;
                    data.ServiceType = sr.ServiceType;
                    data.ServiceDetails = sr.ServiceDetails;
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                successmessage = new { Status = "Failed ! " + ex.Message };
            }
            return Ok(successmessage);
        }
        [HttpDelete("{id:int}")]
        public IActionResult DeleteReq(int id)
        {
            var successmessage = new { Status = "Success" };
            try
            {
                var data = db.ServiceRequests.Where(x => x.Id == id).FirstOrDefault();
                data.IsDeleted = 1;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                successmessage = new { Status = "Failed ! " + ex.Message };
            }
            return Ok(successmessage);
        }

    }
}
