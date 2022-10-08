using System;
using System.Collections.Generic;

#nullable disable

namespace Reader.Models
{
    public partial class BookPurchase
    {
        public int Id { get; set; }
        public string Bookid { get; set; }
        public string Userid { get; set; }
        public string InvoiceNo { get; set; }
        public string PaymentId { get; set; }
        public DateTime? PurchaseTime { get; set; }
        public int? IsRefunded { get; set; }
    }
}
