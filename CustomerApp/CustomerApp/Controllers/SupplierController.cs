using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerApp.Models;

namespace CustomerApp.Controllers
{
    [Route("api/CustomerApp/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        CustomerDBContext db = new CustomerDBContext();

        [HttpGet]
        public IEnumerable<Supplier> Get()
        {
            return db.Suppliers;
        }
        [HttpPost]
        public IActionResult Post(Supplier sup)
        {
            var successmessage = new { Status = "Success" };
            try
            {
                db.Suppliers.Add(sup);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                successmessage = new { Status = "Failed ! " + ex.Message };
            }
            return Ok(successmessage);
        }
        [HttpPut("{id:int}")]
        public IActionResult Put(int id,Supplier sup)
        {
            var successmessage = new { Status = "Failed ! " };
            var data = db.Suppliers.Where(x => x.Id == id).FirstOrDefault();
            if (data != null)
            {
                data.SupplierCode = sup.SupplierCode;
                data.SupplierName = sup.SupplierName;
                data.SupplierSalary = sup.SupplierSalary;
                db.SaveChanges();
                successmessage = new { Status = "Success" };
            }
            return Ok(successmessage);
        }
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var successmessage = new { Status = "Success" };
            var data = db.Suppliers.Where(x => x.Id == id).FirstOrDefault();
            db.Suppliers.Remove(data);
            db.SaveChanges();
            return Ok(successmessage);
        }
    }
}
