using System;
using System.Collections.Generic;

#nullable disable

namespace DigitalBooks.Models
{
    public partial class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
        public string Publisher { get; set; }
        public string ReleasedDate { get; set; }
        public string Category { get; set; }
        public string Image { get; set; }
        public string Price { get; set; }
        public string BookContent { get; set; }
        public string AuthorId { get; set; }
        public byte? IsActive { get; set; }
    }
}
