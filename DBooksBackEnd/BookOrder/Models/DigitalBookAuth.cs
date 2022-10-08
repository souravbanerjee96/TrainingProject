using System;
using System.Collections.Generic;

#nullable disable

namespace BookOrder.Models
{
    public partial class DigitalBookAuth
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string UserType { get; set; }
        public string PaymentId { get; set; }
    }
}
