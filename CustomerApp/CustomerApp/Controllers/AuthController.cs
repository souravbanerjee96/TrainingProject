using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using CustomerApp.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace CustomerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class AuthController : ControllerBase
    {
        private IConfiguration _configuration;
        // Constructor for calling appsettings
        public AuthController(IConfiguration conf)
        {
            _configuration = conf;
        }

        CustomerDBContext db = new CustomerDBContext();
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { status= "[Authentication Api Working]" });
        }
        [HttpPost]
        [Route("Login")]
        public IActionResult LoginUser(CustomerAuth ca)
        {
            IActionResult res = Unauthorized();
            var data = AuthenticateUser(ca);
            if(data!=null)
            {
                res = Ok(new { token = GenerateToken() });
            }
            return res;
        }
        [Route("Register")]
        public IActionResult RegisterUser(CustomerAuth ca)
        {
            IActionResult res = Ok(new { status = "Success"});
            db.CustomerAuths.Add(ca);
            db.SaveChanges();
            return res;
        }
        private CustomerAuth AuthenticateUser(CustomerAuth cs)
        {
            if (db.CustomerAuths.Any(x => x.Username == cs.Username && x.Password == cs.Password))
            {
                return db.CustomerAuths.Where(x => x.Username == cs.Username && x.Password == cs.Password).FirstOrDefault();
            }
            else
                return null;
        }

        private string GenerateToken()
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["jwt:key"]));
            var credentials = new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_configuration["jwt:issuer"],
                _configuration["jwt:audience"],
                null,
                expires:DateTime.Now.AddMinutes(120),
                signingCredentials:credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
