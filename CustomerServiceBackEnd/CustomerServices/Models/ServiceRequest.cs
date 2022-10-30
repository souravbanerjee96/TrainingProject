using System;
using System.Collections.Generic;

#nullable disable

namespace CustomerServices.Models
{
    public partial class ServiceRequest
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public DateTime? AddedDate { get; set; }
        public string RequiredDate { get; set; }
        public string ServiceType { get; set; }
        public string ServiceDetails { get; set; }
        public int? UserId { get; set; }
        public byte? IsDeleted { get; set; }
    }
}
