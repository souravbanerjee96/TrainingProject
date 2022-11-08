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
                       where (srq.IsDeleted == 0)
                       orderby srq.AddedDate descending
                       select new
                       {
                           Id = srq.Id,
                           ServiceName = srq.ServiceName,
                           RequiredDate = srq.RequiredDate,
                           ServiceType = srq.ServiceType,
                           ServiceDetails = srq.ServiceDetails,
                           Status = r.Status == null ? "O" : r.Status,
                           StatusState = r.Status == null ? 1 : r.Status == "C" ? 2 : r.Status == "R" ? 3 : r.Status == "I" ? 4 : 99, //StatusState for Mutipurpose
                           Comment = r.Comment == null ? "No Comment" : r.Comment,
                           IsUserAccepted = r.IsUserAccepted == null ? 0 : r.IsUserAccepted,
                           UserComment = r.UserComment == null ? "No User Comment" : r.UserComment
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

        [HttpPut]
        public IActionResult UpdateUserComment(userComment uc)
        {
            var successmessage = new { Status = "Success" };
            try
            {
                ServiceResolution sr = new ServiceResolution();
                var updateService = db.ServiceResolutions.Where(x => x.RequestId == uc.Id).FirstOrDefault();
                if (updateService != null)
                {
                    updateService.UserComment = uc.UserComment;
                    updateService.IsUserAccepted = uc.IsUserAccepted == null ? 0 : uc.IsUserAccepted;
                    updateService.Status = uc.Status;
                    db.SaveChanges();
                }
                else
                {
                    sr.UserComment = uc.UserComment;
                    sr.IsUserAccepted = uc.IsUserAccepted == null ? 0 : uc.IsUserAccepted;
                    sr.Status = uc.Status;
                    sr.RequestId = uc.Id;
                    db.ServiceResolutions.Add(sr);
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
