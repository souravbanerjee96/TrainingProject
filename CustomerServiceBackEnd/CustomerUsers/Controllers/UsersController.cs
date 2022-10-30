using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using CustomerUsers.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace CustomerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IConfiguration _configuration;
        // Constructor for calling appsettings
        public UsersController(IConfiguration conf)
        {
            _configuration = conf;
        }

        CustomerServiceUsersContext db = new CustomerServiceUsersContext();
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { status= "[Authentication Api Working]" });
        }
        [HttpPost]
        [Route("Login")]
        public IActionResult LoginUser(User ca)
        {
            IActionResult res = Unauthorized();
            var data = AuthenticateUser(ca);
            if (data != null)
            {
                var userName = Convert.ToBase64String(Encoding.UTF8.GetBytes(data.FirstName));
                res = Ok(new { token = GenerateToken(), userName = userName, CustomerId = data.Id });
            }
            return res;
        }
        [HttpPost]
        [Route("Register")]
        public IActionResult RegisterUser(User u)
        {
            IActionResult res = Ok(new { status = "Success"});
            var data = db.Users.Any(x => x.Email == u.Email || x.PhoneNo == u.PhoneNo);
            if (data == false)
            {
                db.Users.Add(u);
                db.SaveChanges();
                return res;
            }
            else
            {
                return Conflict(new { message = $"An existing record with the id '{u.Email}' was already found." });
            }
        }
        private User AuthenticateUser(User cs)
        {
            if (db.Users.Any(x => x.Email == cs.Email && x.Password == cs.Password))
            {
                return db.Users.Where(x => x.Email == cs.Email && x.Password == cs.Password).FirstOrDefault();
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
