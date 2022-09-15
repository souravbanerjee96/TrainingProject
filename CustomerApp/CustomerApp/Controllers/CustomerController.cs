using CustomerApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerApp.Controllers
{
    [Route("api/CustomerApp/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        CustomerDBContext db = new CustomerDBContext();
        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            return db.Customers;
        }

        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            db.Customers.Add(customer);
            db.SaveChanges();
            var successmessage = new { Status = "Success" };
            return Ok(successmessage);
        }
        [HttpPut("{id:int}")]
        public IActionResult Put(int id , Customer customer)
        {
            var successmessage=new { Status = "Failed !!"};
            var data = db.Customers.Where(x => x.Id == id).SingleOrDefault();
            if (data != null)
            {
                data.CustomerCode = customer.CustomerCode;
                data.CustomerName = customer.CustomerName;
                data.CustomerSalary = customer.CustomerSalary;
                db.SaveChanges();
                successmessage = new { Status = "Success" };
            }
            else { }
            
            return Ok(successmessage);
        }
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var successmessage = new { Status = "Failed !!" };
            var data = db.Customers.Where(x => x.Id == id).SingleOrDefault();
            if (data != null)
            {
                db.Customers.Remove(data);
                db.SaveChanges();
                successmessage = new { Status = "Success" };
            }
            return Ok(successmessage);
        }

    }
}
