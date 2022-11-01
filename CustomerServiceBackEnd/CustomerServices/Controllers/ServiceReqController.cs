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
        public IEnumerable<ServiceRequest> Get(int id)
        {
            return db.ServiceRequests.Where(x=>x.UserId==id && x.IsDeleted==0).OrderByDescending(x=>x.AddedDate);
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
