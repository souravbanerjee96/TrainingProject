﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using DigitalBooks.Models;
using System.IO;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace DigitalBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthorController : ControllerBase
    {
        DigitalBookContext db = new DigitalBookContext();

        [HttpPost,DisableRequestSizeLimit]

        [Route("getallmyBooks")]
        public IEnumerable<Book> getallBooks(Book d)
        {
            return db.Books.Where(x => x.AuthorId == d.AuthorId);
        }
        public IActionResult BookUpload([FromForm] string BookData, [FromForm] IFormFile BookImg)
        {
            string lnError = "0";
            try
            {
                var model = JsonConvert.DeserializeObject<Book>(BookData);

                var originalImagePath = "";
                var File = BookImg;
                var folderName = "Images";
                var pathtoUse = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                lnError = "1";

                if (File!=null && File.Length > 0)
                {
                    var filename = ContentDispositionHeaderValue.Parse(File.ContentDisposition).FileName.Trim('"');
                    var newFileName = "Img_" + DateTime.Now.ToString("yyyyMMddHHmmssfff");
                    filename = newFileName.Trim() + Path.GetExtension(filename);

                    var fullPath = Path.Combine(pathtoUse, filename);
                    originalImagePath = Path.Combine(folderName, filename);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        File.CopyTo(stream);
                    }
                }
                lnError = "2";
                model.Image = originalImagePath;
                lnError = "3";
                db.Books.Add(model);
                lnError = "4";
                db.SaveChanges();
                return Ok(new { Status = "Success" });
            }
            catch(Exception ex)
            {
                return BadRequest(new { Error = ex.InnerException +" Error Coming From Author Book Add "+lnError});
            }

        }
        

    }
}
