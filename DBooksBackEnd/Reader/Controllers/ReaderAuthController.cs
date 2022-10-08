using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Reader.Models;

namespace DigitalBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReaderAuthController : ControllerBase
    {
        DigitalBookContext db = new DigitalBookContext();
        private IConfiguration _configuration;
        public ReaderAuthController(IConfiguration conf)
        {
            _configuration = conf;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { status = "[ReaderAuth Api Working]" });
        }
        [HttpPost]
        [Route("Register-Reader")]
        public IActionResult RegisterReader(DigitalBookAuth d)
        {
            var data = (DigitalBookAuth)null;
            IActionResult res = Ok();
            if (db.DigitalBookAuths.Any(x => x.Password == d.Password))
                data = db.DigitalBookAuths.Where(y => y.Password==d.Password).FirstOrDefault();
            if (data != null)
            {
                var readerName = Convert.ToBase64String(Encoding.UTF8.GetBytes(data.UserName));
                res = Ok(new { r_token = GenerateToken(), readerId = data.Id , readerName = readerName });
                return res;
            }
            else
            {
                var rData = db.DigitalBookAuths.Add(d);
                db.SaveChanges();
                var readerName = Convert.ToBase64String(Encoding.UTF8.GetBytes(d.UserName));
                res = Ok(new { r_token = GenerateToken(), readerId = d.Id, readerName = readerName });
                return res;
            }
        }

        private string GenerateToken()
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["jwt:key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_configuration["jwt:issuer"],
                _configuration["jwt:audience"],
                null,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
