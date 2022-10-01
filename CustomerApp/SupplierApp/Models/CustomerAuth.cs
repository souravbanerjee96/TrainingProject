using System;
using System.Collections.Generic;

#nullable disable

namespace SupplierApp.Models
{
    public partial class CustomerAuth
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
