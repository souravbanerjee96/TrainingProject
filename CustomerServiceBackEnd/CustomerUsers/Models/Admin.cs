﻿using System;
using System.Collections.Generic;

#nullable disable

namespace CustomerUsers.Models
{
    public partial class Admin
    {
        public int Id { get; set; }
        public string AdminName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime? AddedDate { get; set; }
    }
}
