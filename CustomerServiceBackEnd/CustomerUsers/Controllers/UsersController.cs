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
using Microsoft.AspNetCore.Authorization;

namespace CustomerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class UsersController : ControllerBase
    {
        private IConfiguration _configuration;
        // Constructor for calling appsettings
        public UsersController(IConfiguration conf)
        {
            _configuration = conf;
        }


        CustomerServiceUsersContext db = new CustomerServiceUsersContext();

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { status = "[Authentication Api Working]" });
        }

        [AllowAnonymous]
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

        [AllowAnonymous]
        [HttpPost]
        [Route("AdminLogin")]
        public IActionResult LoginAdmin(Admin adm)
        {
            IActionResult res = Unauthorized();
            var data = db.Admins.Where(x => x.UserName == adm.UserName && x.Password == adm.Password).FirstOrDefault();
            if (data != null)
            {
                var userName = Convert.ToBase64String(Encoding.UTF8.GetBytes("Admin " + data.AdminName));
                res = Ok(new { a_token = GenerateToken(), userName = userName, adminId = data.Id });
            }
            return res;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Register")]
        public IActionResult RegisterUser(User u)
        {
            IActionResult res = Ok(new { status = "Success" });
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

        [HttpGet("getUser/{id:int}")]
        public User GetUser(int id)
        {
            var data = db.Users.Where(x => x.Id == id).FirstOrDefault();
            if (data != null)
                return data;
            else
                return null;
        }

        [HttpPut("updateUser/{id:int}")]
        public IActionResult UpdateUser(int id, User sr)
        {
            var successmessage = new { Status = "Success" };
            try
            {
                var data = db.Users.Where(x => x.Id == id).FirstOrDefault();
                if (data != null)
                {
                    data.FirstName = sr.FirstName;
                    data.LastName = sr.LastName;
                    data.Email = sr.Email;
                    data.PhoneNo = sr.PhoneNo;
                    data.Password = sr.Password;
                    //data.DOB = sr.DOB;
                    data.ContactPref = sr.ContactPref;
                    data.Country = sr.Country;
                    data.State = sr.State;
                    data.Address = sr.Address;
                    //data.PanNo = sr.PanNo;
                    db.SaveChanges();
                }
                else
                    return NotFound();
            }
            catch (Exception ex)
            {
                successmessage = new { Status = "Failed ! " + ex.Message };
            }
            return Ok(successmessage);
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
