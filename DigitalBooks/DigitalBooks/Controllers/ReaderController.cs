using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DigitalBooks.Models;
using System.Text.Json;

namespace DigitalBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReaderController : ControllerBase
    {
        DigitalBookContext db = new DigitalBookContext();
        [HttpGet]
        public IEnumerable<object> showBooks(string Title, string AuthorName, string Publisher, string ReleasedDate)
        {
            var data = db.Books.Where(x => (x.Title.Contains(Title) ||
         x.AuthorName.Contains(AuthorName) ||
         x.Publisher.Contains(Publisher) ||
         x.ReleasedDate.Contains(ReleasedDate)) && x.IsActive==1 ).Select(p=> new
         {
             p.Image,
             p.Id,
             p.Title,
             p.AuthorName,
             p.Publisher,
             p.ReleasedDate,
             p.Category,
             p.Price,
             p.BookContent
         });
            if (data != null)
                return data;
            else
                return null;
        }
    }
}
