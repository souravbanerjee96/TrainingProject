using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DigitalBooks.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace DigitalBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        DigitalBookContext db = new DigitalBookContext();
        private IConfiguration _configuration;
        public AuthenticationController(IConfiguration conf)
        {
            _configuration = conf;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { status = "[Authentication Api Working]" });
        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Register(DigitalBookAuth d)
        {
            IActionResult res = Ok(new { status = "Success" });
            db.DigitalBookAuths.Add(d);
            db.SaveChanges();
            return res;
        }
        [Route("Validate")]
        public IActionResult Auth(DigitalBookAuth d)
        {
            IActionResult result = Unauthorized();
            var data = validateUser(d.UserName, d.Password);
            if (data != null)
            {
                var userId = Convert.ToBase64String(Encoding.UTF8.GetBytes(d.UserName));
                result = Ok(new { token = GenerateToken(), userId = userId , AuthorId = data.Id });
            }
            return result;
        }

        private DigitalBookAuth validateUser(string user, string password)
        {
            if (db.DigitalBookAuths.Any(x => x.UserName == user && x.Password == password))
            {
                return db.DigitalBookAuths.Where(x => x.UserName == user && x.Password == password).FirstOrDefault();
            }
            else
                return null;
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
