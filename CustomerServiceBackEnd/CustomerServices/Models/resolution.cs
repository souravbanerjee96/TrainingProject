using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServices.Models
{
    public class resolution
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public string Status { get; set; }
        public int AdminID { get; set; }
    }
    public class userComment
    {
        public int Id { get; set; }
        public string UserComment { get; set; }
        public string Status { get; set; }
        public byte? IsUserAccepted { get; set; }
    }
}
