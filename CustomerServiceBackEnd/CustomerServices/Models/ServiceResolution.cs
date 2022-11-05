using System;
using System.Collections.Generic;

#nullable disable

namespace CustomerServices.Models
{
    public partial class ServiceResolution
    {
        public int Id { get; set; }
        public DateTime? ResolutionDate { get; set; }
        public string Comment { get; set; }
        public int? RequestId { get; set; }
        public int? AdminId { get; set; }
        public string Status { get; set; }
        public byte? IsUserAccepted { get; set; }
        public string UserComment { get; set; }
    }
}
