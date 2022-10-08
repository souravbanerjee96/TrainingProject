using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reader.Models;
using Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IBus bus;
        DigitalBookContext db;
        public OrderController(IBus _bus, DigitalBookContext _db)
        {
            bus = _bus;
            db = _db;
        }

        [HttpPost]
        [Route("CreateOrder")]
        public async Task<IActionResult> CreateOrder(BookPurchase bp)
        {
            try
            {
                Guid myuuid = Guid.NewGuid();
                bp.InvoiceNo = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                bp.PaymentId = myuuid.ToString();
                var data = db.BookPurchases.Any(x => x.Bookid == bp.Bookid && x.Userid == bp.Userid && x.IsRefunded == 0);
                if (!data)
                {
                    Uri uri = new Uri("rabbitmq:localhost/orderQueue");
                    var endpoint = await bus.GetSendEndpoint(uri);
                    Order o = new Order();
                    o.Bookid = bp.Bookid;
                    o.Userid = bp.Userid;
                    o.InvoiceNo = bp.InvoiceNo;
                    o.PaymentId = bp.PaymentId;
                    await endpoint.Send(o);
                    //db.BookPurchases.Add(bp);
                    //db.SaveChanges();
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
