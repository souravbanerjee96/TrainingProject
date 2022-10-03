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
            if (Title == null && AuthorName == null && Publisher == null && ReleasedDate == null)
                return db.Books;
            else
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
        }
        [HttpGet]
        [Route("orderhist")]
        public IQueryable<Object> getOrderhistory(string readerID)
        {
            try
            {
                var data = (from bp in db.BookPurchases
                            join bd in db.Books on bp.Bookid equals Convert.ToString(bd.Id)
                            where bp.Userid == readerID
                            orderby bp.PurchaseTime descending
                            select new
                            {
                                bp.Id,
                                bd.Title,
                                bd.Category,
                                bd.Image,
                                bd.Price,
                                bp.InvoiceNo,
                                bp.PaymentId,
                                bp.PurchaseTime,
                                bp.IsRefunded,
                            });

                return data;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("refund")]
        public IActionResult refundBook(int purchaseId)
        {
            var data = db.BookPurchases.Where(x => x.Id == purchaseId).FirstOrDefault();
            if (data != null)
            {
                data.IsRefunded = 1;
                db.SaveChanges();
                return Ok(new { message = "Order Refunded" });
            }
            else
            {
                return NotFound(new { message = "Order Not found" });
            }

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
                var data = db.BookPurchases.Any(x => x.Bookid == bp.Bookid && x.Userid == bp.Userid && x.IsRefunded == 0);
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
