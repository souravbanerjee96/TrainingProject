﻿using System;
using System.Collections.Generic;

#nullable disable

namespace CustomerApp.Models
{
    public partial class Supplier
    {
        public int Id { get; set; }
        public string SupplierCode { get; set; }
        public string SupplierName { get; set; }
        public int? SupplierSalary { get; set; }
    }
}
