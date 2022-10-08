using BookOrder.Models;
using MassTransit;
using Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SupplierApp.Consumers
{
    public class OrderConsumer : IConsumer<Order>
    {
        DigitalBookContext db = new DigitalBookContext();
        public Task Consume(ConsumeContext<Order> context)
        {
            var data = context.Message;
            BookPurchase newdata = new BookPurchase();
            newdata.Bookid = data.Bookid;
            newdata.Userid = data.Userid;
            newdata.InvoiceNo = data.InvoiceNo;
            newdata.PaymentId = data.PaymentId;
            db.BookPurchases.Add(newdata);
            db.SaveChanges();
            return Task.CompletedTask;
        }
    }
}