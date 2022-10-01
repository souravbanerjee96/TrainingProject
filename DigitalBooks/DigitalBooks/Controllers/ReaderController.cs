using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DigitalBooks.Models;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;

namespace DigitalBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReaderController : ControllerBase
    {
        DigitalBookContext db = new DigitalBookContext();

        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<object> showBooks(string Title, string AuthorName, string Publisher, string ReleasedDate)
        {
            var data = db.Books.Where(x => (x.Title.Contains(Title) ||
         x.AuthorName.Contains(AuthorName) ||
         x.Publisher.Contains(Publisher) ||
         x.ReleasedDate.Contains(ReleasedDate)) && x.IsActive == 1).Select(p => new
         {
             p.Image,
             p.Id,
             p.Title,
             p.AuthorName,
             p.Publisher,
             p.ReleasedDate,
             p.Category,
             p.Price,
             p.BookContent
         });
            if (data != null)
                return data;
            else
                return null;
        }

        [HttpPost]
        [Route("CreateOrder")]
        public IActionResult CreateOrder(BookPurchase bp)
        {
            try
            {
                Guid myuuid = Guid.NewGuid();
                bp.InvoiceNo = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                bp.PaymentId = myuuid.ToString();
                var data = db.BookPurchases.Any(x => x.Bookid == bp.Bookid && x.Userid == bp.Userid);
                if (!data)
                {
                    db.BookPurchases.Add(bp);
                    db.SaveChanges();
                    return Ok(new { message = "Order Placed", InvoiceNo = bp.InvoiceNo, PaymentId = bp.PaymentId });
                }
                else
                    return Conflict(new { message = "Book already Purchased" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException });
            }

        }
    }
}
