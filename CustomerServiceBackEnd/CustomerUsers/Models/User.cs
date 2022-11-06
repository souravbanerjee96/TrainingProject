using System;
using System.Collections.Generic;

#nullable disable

namespace CustomerUsers.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string Password { get; set; }
        public string DOB { get; set; }
        public string ContactPref { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public string PanNo { get; set; }
    }
}
